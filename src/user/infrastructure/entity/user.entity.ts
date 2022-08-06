import { IUser } from 'src/user/domain/user';
import { Entity, Column, Index } from 'typeorm';
import { BaseEntityImpl } from '../common/base_entity';

@Entity('users')
export class UserEntity extends BaseEntityImpl implements IUser {
  @Column('text')
  name: string;
  @Column({ unique: true })
  email: string;
  @Column('text')
  password: string;

  @Index()
  @Column('boolean', { default: true })
  isActive?: boolean;

  @Index()
  @Column('boolean', { default: true })
  emailConfirmed?: boolean;
}
