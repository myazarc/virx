import { IBoat } from 'src/boat/domain/boat';
import { BaseEntityImpl } from 'src/common/infrastructure/entity/base_entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { BoatTypeEntity } from './boattype.entity';

@Entity('boats')
export class BoatEntity extends BaseEntityImpl implements IBoat {
  @ManyToOne('users', 'id', {
    onDelete: 'NO ACTION',
    onUpdate: 'CASCADE',
    nullable: false,
  })
  user: number;

  @ManyToOne('locations', 'id', {
    onDelete: 'NO ACTION',
    onUpdate: 'CASCADE',
    nullable: false,
  })
  location: number;

  @ManyToOne(() => BoatTypeEntity, (boatType) => boatType.boats, {
    onDelete: 'NO ACTION',
    onUpdate: 'CASCADE',
    nullable: false,
  })
  type: BoatTypeEntity;

  @Column('text', { nullable: false })
  title: string;

  @Column('text', { nullable: true })
  description?: string;

  @Column('decimal', { nullable: false, precision: 10, scale: 2 })
  price: number;

  @Index()
  @Column('boolean', { default: true })
  isActive?: boolean;

  @Column('int', { nullable: false })
  prePaymentRate: number;

  @Column('int', { nullable: false })
  personCapacity: number;

  @Column('boolean', { nullable: false, default: false })
  isCrewed: boolean;
}
