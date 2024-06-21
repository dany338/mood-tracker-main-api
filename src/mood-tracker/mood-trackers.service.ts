import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateMoodTrackerDto } from './dto/create-mood-tracker.dto';
import { UpdateMoodTrackerDto } from './dto/update-mood-tracker.dto';
import { DataSource, Repository } from 'typeorm';
import { MoodTracker } from './entities/mood-tracker.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { validate as isUUID } from 'uuid';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class MoodTrackerService {
  private readonly logger = new Logger('MoodTrackerService');

  constructor(
    @InjectRepository(MoodTracker)
    private readonly moodTrackerRepository: Repository<MoodTracker>,
    private readonly dataSource: DataSource,
  ) {}

  async create(createMoodTrackerDto: CreateMoodTrackerDto, user: User) {
    try {
      const { ...moodTrackerDetails } = createMoodTrackerDto;

      const moodTracker = this.moodTrackerRepository.create({
        ...moodTrackerDetails,
        user
      });

      await this.moodTrackerRepository.save(moodTracker);

      return { ...moodTracker };
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll(paginationDto: PaginationDto, user: User) {
    try {
      const {
        limit = 10,
        offset = 0,
        id = null,
        order,
        orderField = 'id',
      } = paginationDto;

      const queryBuilder =
        this.moodTrackerRepository.createQueryBuilder('moodTracker');

      queryBuilder
        .addSelect(['user.id', 'user.email', 'user.fullName'])
        .leftJoin('moodTracker.user', 'user');

      if (id) {
        queryBuilder.andWhere('moodTracker.id = :id', { id });
      }

      if(user.roles.includes('user')) {
        queryBuilder.andWhere('user.id = :userId', { userId: user.id });
      }

      queryBuilder
        .take(limit)
        .skip(offset)
        .orderBy(`moodTracker.${orderField}`, order);

      const moodTrackers = (await queryBuilder.getMany()) ?? [];

      return moodTrackers;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findOne(term: string) {
    let moodTracker: MoodTracker;

    if (isUUID(term)) {
      moodTracker = await this.moodTrackerRepository.findOneBy({ id: term });
    }

    if (!moodTracker)
      throw new NotFoundException(`Mood Tracker with ${term} not found`);

    return moodTracker;
  }

  async findOnePlain(term: string) {
    const { ...rest } = await this.findOne(term);
    return {
      ...rest,
    };
  }

  async update(id: string, updateMoodTrackerDto: UpdateMoodTrackerDto) {
    const { ...toUpdate } = updateMoodTrackerDto;

    const moodTracker = await this.moodTrackerRepository.preload({
      id,
      ...toUpdate,
    });

    if (!moodTracker)
      throw new NotFoundException(`Mood Tracker with id: ${id} not found`);

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.save(moodTracker);

      await queryRunner.commitTransaction();
      await queryRunner.release();

      return this.findOnePlain(id);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      this.handleDBExceptions(error);
    }
  }

  async remove(id: string) {
    const moodTracker = await this.findOne(id);
    await this.moodTrackerRepository.remove(moodTracker);
  }

  private handleDBExceptions(error: any) {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    this.logger.error(error);
    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }

  async deleteAllMoodTrackers() {
    const query = this.moodTrackerRepository.createQueryBuilder('moodTracker');

    try {
      return await query.delete().where({}).execute();
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }
}
