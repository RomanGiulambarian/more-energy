import { PartialType } from '@nestjs/swagger';
import { CreateExerciseDto } from './create-exercise.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateExerciseDto extends PartialType(CreateExerciseDto) {
  @IsOptional()
  @IsString()
  imageToDelete?: string;
}
