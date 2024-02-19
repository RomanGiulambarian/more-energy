import { Entity, Column, OneToMany, ManyToOne } from 'typeorm';
import { CommonEntity } from './common.entity';
import { User } from './user.entity';

@Entity()
export class Evaluation extends CommonEntity {
  @ManyToOne(() => User, (user) => user.id)
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
