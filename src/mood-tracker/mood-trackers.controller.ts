import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { MoodTrackerService } from './mood-trackers.service';
import { CreateMoodTrackerDto } from './dto/create-mood-tracker.dto';
import { UpdateMoodTrackerDto } from './dto/update-mood-tracker.dto';
import { Auth, GetUser } from 'src/auth/decorators';
import { MoodTracker } from './entities/mood-tracker.entity';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { ValidRoles } from 'src/auth/interfaces';
import { User } from 'src/auth/entities/user.entity';

@ApiTags('Mood Trackers')
@Controller('mood-trackers')
export class MoodTrackerController {
  constructor(private readonly moodTrackerService: MoodTrackerService) {}

  @Post()
  @Auth()
  @ApiResponse({
    status: 201,
    description: 'Mood Tracker was created',
    type: MoodTracker,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 403, description: 'Forbidden. Token related.' })
  create(
    @Body() createMoodTrackerDto: CreateMoodTrackerDto,
    @GetUser() user: User,
  ) {
    return this.moodTrackerService.create(createMoodTrackerDto, user);
  }

  @Get()
  @Auth()
  @ApiResponse({ status: 200, description: 'Mood Trackers found.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 403, description: 'Forbidden. Token related.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  findAll(@Query() paginationDto: PaginationDto, @GetUser() user: User) {
    return this.moodTrackerService.findAll(paginationDto, user);
  }

  @Get(':term')
  @ApiResponse({ status: 200, description: 'Mood Tracker found.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 403, description: 'Forbidden. Token related.' })
  @ApiResponse({ status: 404, description: 'Mood Tracker not found.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  findOne(@Param('term') term: string) {
    return this.moodTrackerService.findOne(term);
  }

  @Patch(':id')
  @Auth(ValidRoles.admin)
  @ApiResponse({ status: 200, description: 'Mood Tracker updated.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 403, description: 'Forbidden. Token related.' })
  @ApiResponse({ status: 404, description: 'Mood Tracker not found.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateMoodTrackerDto: UpdateMoodTrackerDto,
  ) {
    return this.moodTrackerService.update(id, updateMoodTrackerDto);
  }

  @Delete(':id')
  @Auth(ValidRoles.admin)
  @ApiResponse({ status: 200, description: 'Mood Tracker deleted.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 403, description: 'Forbidden. Token related.' })
  @ApiResponse({ status: 404, description: 'Mood Tracker not found.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.moodTrackerService.remove(id);
  }
}
