import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateMoodTrackerDto {
  // @ApiProperty({
  //   required: true,
  //   type: String,
  //   description: 'User ID',
  // })
  // @IsUUID()
  // user_id: string;

  @ApiProperty({
    required: true,
    type: String,
    description: 'Type Mood Tracker',
  })
  @IsString()
  type: string;
}
