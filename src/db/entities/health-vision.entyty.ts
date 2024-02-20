import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { CommonEntity } from './common.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
export class HealthVision extends CommonEntity {
  @OneToMany(() => User, (user) => user.healthVision)
  users: User[];

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
