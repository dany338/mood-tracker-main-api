import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { User } from '../../auth/entities/user.entity';

@Entity({ name: 'mood-trackers' })
export class MoodTracker {
  @ApiProperty({
    example: 'cd533345-f1f3-48c9-a62e-7dc2da50c8f8',
    description: 'Mood Tracker ID',
    uniqueItems: true,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    required: true,
    example: 'cd533345-f1f3-48c9-a62e-7dc2da50c8f8',
    description: 'USER ID',
  })
  @Column('uuid', { nullable: false })
  user_id: string;

  @ApiProperty({
    required: true,
    example: 'Type Mood',
    description: 'Type Mood Tracker',
  })
  @Column('text', { nullable: false })
  type: string;

  @ApiProperty({
    example: '2024-06-20T05:34:51.349Z',
    description: 'Mood Creation Date',
  })
  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @ManyToOne(() => User, (user) => user.moodTrackers, { eager: true })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;
}
