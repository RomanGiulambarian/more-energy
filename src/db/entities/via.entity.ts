import { Entity, Column, OneToMany } from 'typeorm';
import { CommonEntity } from './common.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Via extends CommonEntity {
  @OneToMany(() => User, (user) => user.via)
  users: User[];

  @Column()
  courage: number;

  @Column()
  forgiveness: number;

  @Column()
  creativity: string;

  @Column()
  love: string;

  @Column()
  spirituality: string;
}
