import { Entity, Column, OneToMany, ManyToOne } from 'typeorm';
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

  @OneToMany(() => СoachToUser, (coach) => coach.id)
  coache: СoachToUser;

  @ManyToOne(() => Evaluation, (evaluation) => evaluation.id)
  evaluation: Evaluation;

  @ManyToOne(() => HealthVision, (healthVision) => healthVision.id)
  healthVision: HealthVision;

  @ManyToOne(() => Via, (via) => via.id)
  via: Via;
}
