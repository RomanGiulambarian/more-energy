import { PartialType } from '@nestjs/swagger';
import { CreateExerciseStepDto } from './create-exercise-step.dto';

export class UpdateExerciseStepDto extends PartialType(CreateExerciseStepDto) {}
