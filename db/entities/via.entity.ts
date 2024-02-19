import { Entity, Column, ManyToOne } from 'typeorm';
import { CommonEntity } from './common.entity';
import { User } from './user.entity';

@Entity()
export class Evaluation extends CommonEntity {
  @ManyToOne(() => User, (user) => user.id)
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
