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
  iWant: number;

  @Column()
  whyWant: string;

  @Column()
  willing: string;

  @Column()
  visionStatement: string;
}
