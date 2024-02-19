import { Entity, JoinColumn, ManyToOne } from 'typeorm';
import { CommonEntity } from './common.entity';
import { User } from './user.entity';

@Entity()
export class СoachToUser extends CommonEntity {
  @ManyToOne(() => User, (user) => user.coaches)
  user: User;
}
