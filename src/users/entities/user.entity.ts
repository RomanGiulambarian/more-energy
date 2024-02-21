import {
  Entity,
  Column,
  OneToMany,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { CommonEntity } from '../../db/entities/common.entity';
import { СoachToUser } from '../../db/entities/coach-to-user.entity';
import { UserRole } from 'src/users/enums';
import { HealthVision } from './health-vision.entyty';
import { Via } from './via.entity';
import { Favorites } from 'src/favorites/entities/favorites.entity';
import { Evaluation } from './evaluation.entity';

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

  @OneToMany(() => СoachToUser, (coach) => coach.coachId)
  coaches: User[];

  @OneToMany(() => СoachToUser, (coach) => coach.userId)
  clients: User[];
}
