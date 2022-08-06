import { hash } from 'src/common/bcyrpt';
import { IUser } from 'src/user/domain/user';
import { Entity, Column, Index, BeforeInsert } from 'typeorm';
import { BaseEntityImpl } from 'src/common/infrastructure/entity/base_entity';

@Entity('users')
export class UserEntity extends BaseEntityImpl implements IUser {
  @Column('text')
  name: string;
  @Index()
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

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password);
  }
}
