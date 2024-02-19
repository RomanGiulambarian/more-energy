import { Entity, Column, OneToMany, JoinColumn } from 'typeorm';
import { CommonEntity } from '../../db/entities/common.entity';
import { СoachToUser } from '../../db/entities/coach-to-user.entity';
import { Evaluation } from '../../db/entities/evaluation.entity';
import { UserRole } from 'src/users/enums';
import { HealthVision } from '../../db/entities/health-vision.entyty';
import { Via } from '../../db/entities/via.entity';

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
