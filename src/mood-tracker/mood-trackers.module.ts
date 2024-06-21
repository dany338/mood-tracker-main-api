import { Module } from '@nestjs/common';
import { MoodTrackerService } from './mood-trackers.service';
import { MoodTrackerController } from './mood-trackers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MoodTracker } from './entities/mood-tracker.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [MoodTrackerController],
  providers: [MoodTrackerService],
  imports: [
    TypeOrmModule.forFeature([ MoodTracker ]),
    AuthModule,
  ],
  exports: [
    MoodTrackerService,
    TypeOrmModule,
  ]
})
export class MoodTrackerModule {}
