import { Module } from '@nestjs/common';
import { ExerciseStepsService } from './exercise-steps.service';
import { ExerciseStepsController } from './exercise-steps.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExerciseSteps } from './entities/exercise-steps.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ExerciseSteps])],
  controllers: [ExerciseStepsController],
  providers: [ExerciseStepsService],
})
export class ExerciseStepsModule {}
