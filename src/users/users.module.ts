import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/db/entities/user.entity';
import { СoachToUser } from 'src/db/entities/coach-to-user.entity';
import { Evaluation } from 'src/db/entities/evaluation.entity';
import { Via } from 'src/db/entities/via.entity';
import { HealthVision } from 'src/db/entities/health-vision.entyty';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      СoachToUser,
      Evaluation,
      Via,
      HealthVision,
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
