import { IBoatType } from 'src/boat/domain/boattype';
import { BaseEntityImpl } from 'src/common/infrastructure/entity/base_entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { BoatEntity } from './boat.entity';

@Entity('boattypes')
export class BoatTypeEntity extends BaseEntityImpl implements IBoatType {
  @Column('text', { nullable: false })
  name: string;

  @OneToMany(() => BoatEntity, (boatType) => boatType.type)
  boats: BoatEntity[];
}
