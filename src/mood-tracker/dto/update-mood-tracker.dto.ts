import { PartialType } from '@nestjs/swagger';
import { CreateMoodTrackerDto } from './create-mood-tracker.dto';

export class UpdateMoodTrackerDto extends PartialType(CreateMoodTrackerDto) {}
