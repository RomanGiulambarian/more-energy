import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateExerciseDto {
  @IsNotEmpty()
  title: string;

  @IsOptional()
  description?: string;

  @IsNotEmpty()
  tip?: string;

  @IsNotEmpty()
  videoLink: string;
}
