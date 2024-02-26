import { Entity, Column, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { CommonEntity } from '../../db/entities/common.entity';
import { User } from './user.entity';

@Entity()
export class Evaluation extends CommonEntity {
  @OneToOne(() => User)
  @JoinColumn()
  user: User;

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
