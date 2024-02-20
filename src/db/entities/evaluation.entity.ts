import { Entity, Column, OneToMany } from 'typeorm';
import { CommonEntity } from './common.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Evaluation extends CommonEntity {
  @OneToMany(() => User, (user) => user.evaluation)
  users: User[];

  @Column()
  weight: number;

  @Column()
  bodyFat: number;

  @Column()
  visceralFat: number;

  @Column()
  skeletalMuscleMass: number;

  @Column()
  bloodUp: number;

  @Column()
  bloodDown: number;

  @Column()
  hearRate: number;

  @Column()
  waistCircum: number;

  @Column()
  hipCircum: number;

  @Column()
  agRatio: number;

  @Column()
  cholesterol: number;

  @Column()
  bloodSugar: number;
}
