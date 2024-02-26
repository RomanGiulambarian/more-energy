import { Entity, OneToMany } from 'typeorm';
import { CommonEntity } from './common.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
export class СoachToUser extends CommonEntity {
  @OneToMany(() => User, (user) => user.coache)
  users: User[];
}
