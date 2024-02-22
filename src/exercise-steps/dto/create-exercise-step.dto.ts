import { IsNotEmpty } from 'class-validator';
import { Entity } from 'typeorm';

@Entity()
export class CreateExerciseStepDto {
  @IsNotEmpty()
  text: string;

  @IsNotEmpty()
  position: number;

  @IsNotEmpty()
  exerciseId: string;
}
