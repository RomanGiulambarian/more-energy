import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { СoachToUser } from 'src/db/entities/coach-to-user.entity';
import { Evaluation } from 'src/users/entities/evaluation.entity';
import { Via } from 'src/users/entities/via.entity';
import { User } from './entities/user.entity';
import { HealthVision } from './entities/health-vision.entyty';

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
