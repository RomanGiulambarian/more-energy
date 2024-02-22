import { Module } from '@nestjs/common';
import { ExerciseService } from './exercise.service';
import { ExerciseController } from './exercise.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Exercise } from './entities/exercise.entity';
import { MediaModule } from 'src/media/media.module';
import { ExerciseStepsService } from 'src/exercise-steps/exercise-steps.service';
import { ExerciseSteps } from 'src/exercise-steps/entities/exercise-steps.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Exercise, ExerciseSteps]), MediaModule],
  controllers: [ExerciseController],
  providers: [ExerciseService, ExerciseStepsService],
})
export class ExerciseModule {}
