import { Entity, Column, ManyToOne } from 'typeorm';

import { CommonEntity } from 'src/db/entities/common.entity';
import { Exercise } from 'src/exercise/entities/exercise.entity';

@Entity()
export class ExerciseSteps extends CommonEntity {
  @ManyToOne(() => Exercise, (exercise) => exercise.id)
  exercise: Exercise;

  @Column()
  text: string;

  @Column()
  position: number;
}
