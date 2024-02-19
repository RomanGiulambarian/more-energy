import { Entity, Column, OneToMany, JoinColumn } from 'typeorm';
import { CommonEntity } from './common.entity';
import { СoachToUser } from './coach-to-user.entity';
import { Evaluation } from './evaluation.entity';
import { UserRole } from 'src/users/enums';
import { HealthVision } from './health-vision.entyty';
import { Via } from './via.entity';

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

  @OneToMany(() => HealthVision, (healthVision) => healthVision.user)
  healthVision: HealthVision[];

  @OneToMany(() => Via, (via) => via.user)
  via: Via[];
}
