import { Entity, Column, OneToMany } from 'typeorm';
import { CommonEntity } from '../../db/entities/common.entity';
import { СoachToUser } from '../../db/entities/coach-to-user.entity';
import { UserRole } from 'src/users/enums';

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

  @OneToMany(() => СoachToUser, (coach) => coach.coach)
  coaches: User[];

  @OneToMany(() => СoachToUser, (coach) => coach.user)
  clients: User[];
}
