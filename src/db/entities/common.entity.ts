import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  BaseEntity,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity()
export class CommonEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}
