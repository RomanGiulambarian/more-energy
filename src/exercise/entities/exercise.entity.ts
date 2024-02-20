import { Entity, Column, OneToMany, ManyToOne } from 'typeorm';
import { CommonEntity } from 'src/db/entities/common.entity';
import { ExerciseSteps } from 'src/exercise-steps/entities/exercise-steps.entity';
import { Favorites } from 'src/favorites/entities/favorites.entity';

@Entity()
export class Exercise extends CommonEntity {
  @OneToMany(() => Favorites, (favorite) => favorite.content)
  favorites: Favorites[];

  @ManyToOne(() => ExerciseSteps, (exerciseSteps) => exerciseSteps.exercise)
  exerciseSteps: ExerciseSteps[];

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  thumbPath: string;

  @Column()
  postDate: Date;

  @Column()
  tip: string;

  @Column()
  videoLink: string;
}
