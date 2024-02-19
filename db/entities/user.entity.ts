import { Entity, Column, OneToMany } from 'typeorm';
import { CommonEntity } from './common.entity';
import { СoachToUser } from './coach-to-user.entity';
import { Evaluation } from './evaluation.entity';

export enum UserRole {
  ADMIN = 'admin',
  COACH = 'coach',
  USER = 'user',
}

@Entity()
export class User extends CommonEntity {
  @Column()
  photoPath: string;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  login: string;

  @Column({ select: false })
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @Column()
  isActive: string;

  @OneToMany(() => СoachToUser, (coach) => coach.user)
  coaches: СoachToUser[];

  @OneToMany(() => Evaluation, (evaluation) => evaluation.user)
  evaluations: Evaluation[];
}
