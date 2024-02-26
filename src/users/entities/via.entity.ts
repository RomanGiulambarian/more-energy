import { Entity, Column, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { CommonEntity } from '../../db/entities/common.entity';
import { User } from './user.entity';

@Entity()
export class Via extends CommonEntity {
  @OneToOne(() => User)
  @JoinColumn()
  user: User;

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
