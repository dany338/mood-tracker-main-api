import { Module } from '@nestjs/common';

import { AuthModule } from './../auth/auth.module';
import { MoodTrackerModule } from './../mood-tracker/mood-trackers.module';

import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [
    MoodTrackerModule,
    AuthModule,
  ]
})
export class SeedModule {}