import { Entity, Column, OneToMany } from 'typeorm';
import { CommonEntity } from 'src/db/entities/common.entity';
import { ExerciseSteps } from 'src/exercise-steps/entities/exercise-steps.entity';
import { Favorites } from 'src/favorites/entities/favorites.entity';
import { Media } from 'src/media/entities/media.entity';

@Entity()
export class Exercise extends CommonEntity {
  @OneToMany(() => Favorites, (favorite) => favorite.content)
  favorites: Favorites[];

  @OneToMany(() => Media, (media) => media.exercise)
  media: Media[];

  @OneToMany(() => ExerciseSteps, (exerciseSteps) => exerciseSteps.exercise)
  exerciseSteps: ExerciseSteps[];

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  tip: string;

  @Column()
  videoLink: string;
}
