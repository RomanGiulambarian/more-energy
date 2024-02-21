import { Entity, Column, JoinColumn, OneToOne } from 'typeorm';
import { CommonEntity } from '../../db/entities/common.entity';
import { User } from './user.entity';

@Entity()
export class HealthVision extends CommonEntity {
  @OneToOne(() => User)
  @JoinColumn()
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
