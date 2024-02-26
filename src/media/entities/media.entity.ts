import { Entity, ManyToOne } from 'typeorm';
import { Exercise } from 'src/exercise/entities/exercise.entity';
import { CommonEntity } from 'src/db/entities/common.entity';

@Entity()
export class Media extends CommonEntity {
  @ManyToOne(() => Exercise, (exercise) => exercise.media)
  exercise: Exercise;
}
