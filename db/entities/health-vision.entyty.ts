import { Entity, Column, ManyToOne } from 'typeorm';
import { CommonEntity } from './common.entity';
import { User } from './user.entity';

@Entity()
export class HealthVision extends CommonEntity {
  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @Column()
  topValues: string;

  @Column()
  forgiveness: number;

  @Column()
  creativity: string;

  @Column()
  love: string;

  @Column()
  spirituality: string;
}
