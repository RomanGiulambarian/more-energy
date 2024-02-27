import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Entity } from 'typeorm';

@Entity()
export class CreateExerciseStepDto {
  @IsString()
  @IsNotEmpty()
  text: string;

  @IsNumber()
  @IsNotEmpty()
  position: number;

  @IsString()
  @IsNotEmpty()
  exerciseId: string;
}
