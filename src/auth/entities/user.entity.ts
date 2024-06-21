import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MoodTracker } from '../../mood-tracker/entities/mood-tracker.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('users')
export class User {
  @ApiProperty({
    example: 'cd533345-f1f3-48c9-a62e-7dc2da50c8f8',
    description: 'User ID',
    uniqueItems: true,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    required: true,
    example: '[email protected]',
    description: 'User Email',
  })
  @Column('text', {
    unique: true,
  })
  email: string;

  @ApiProperty({
    required: true,
    example: 'password',
    description: 'User Password',
  })
  @Column('text', {
    select: false,
  })
  password: string;

  @ApiProperty({
    example: 'John Doe',
    description: 'User Full Name',
  })
  @Column('text')
  fullName: string;

  @ApiProperty()
  @Column('bool', {
    default: true,
  })
  isActive: boolean;

  @ApiProperty()
  @Column('text', {
    array: true,
    default: ['user'],
  })
  roles: string[];

  @ApiProperty()
  @OneToMany(() => MoodTracker, (moodTracker) => moodTracker.user)
  moodTrackers?: MoodTracker[];

  @BeforeInsert()
  checkFieldsBeforeInsert() {
    this.email = this.email.toLowerCase().trim();
  }

  @BeforeUpdate()
  checkFieldsBeforeUpdate() {
    this.checkFieldsBeforeInsert();
  }
}
