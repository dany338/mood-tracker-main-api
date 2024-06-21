import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { MoodTrackerService } from './../mood-tracker/mood-trackers.service';
import { initialData } from './data/seed-data';
import { User } from '../auth/entities/user.entity';

@Injectable()
export class SeedService {
  constructor(
    private readonly moodTrackerService: MoodTrackerService,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async runSeed() {
    await this.deleteTables();
    const adminUser = await this.insertUsers();

    await this.insertNewMoodTrackers(adminUser);

    return 'SEED EXECUTED';
  }

  private async deleteTables() {
    await this.moodTrackerService.deleteAllMoodTrackers();

    const queryBuilder = this.userRepository.createQueryBuilder();
    await queryBuilder.delete().where({}).execute();
  }

  private async insertUsers() {
    const seedUsers = initialData.users;

    const users: User[] = [];

    seedUsers.forEach((user) => {
      users.push(this.userRepository.create(user));
    });

    const dbUsers = await this.userRepository.save(seedUsers);

    return dbUsers[0];
  }

  private async insertNewMoodTrackers(user: User) {
    await this.moodTrackerService.deleteAllMoodTrackers();

    const moodTrackers = initialData.moodTrackers;

    const insertPromises = [];

    moodTrackers.forEach((moodTracker) => {
      insertPromises.push(this.moodTrackerService.create(moodTracker, user));
    });

    await Promise.all(insertPromises);

    return true;
  }
}
