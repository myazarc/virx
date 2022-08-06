import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class BaseEntityImpl {
  @PrimaryGeneratedColumn()
  id: number;
  @DeleteDateColumn({ nullable: true })
  deletedAt?: Date;
  @CreateDateColumn({ nullable: true })
  createdAt?: Date;
}
