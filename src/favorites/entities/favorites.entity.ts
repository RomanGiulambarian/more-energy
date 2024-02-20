import { Entity, Column, OneToMany, ManyToOne } from 'typeorm';
import { CommonEntity } from '../../db/entities/common.entity';
import { User } from '../../users/entities/user.entity';
import { Exercise } from 'src/exercise/entities/exercise.entity';

enum ContentType {
  ARTICLE = 'article',
  RECIPE = 'recipe',
  EXERCISE = 'exercise',
}

@Entity()
export class Favorites extends CommonEntity {
  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @ManyToOne(() => Exercise, (content) => content.id)
  content: Exercise;

  @Column({
    type: 'enum',
    enum: ContentType,
  })
  contentType: ContentType;
}
