import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  BaseEntity,
} from 'typeorm';

@Entity()
export class CommonEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;
}
