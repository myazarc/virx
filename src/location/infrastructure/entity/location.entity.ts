import { BaseEntityImpl } from 'src/common/infrastructure/entity/base_entity';
import { ILocation } from 'src/location/domain/location';
import { Column, Entity } from 'typeorm';

@Entity('locations')
export class LocationEntity extends BaseEntityImpl implements ILocation {
  @Column('text')
  name: string;

  @Column('boolean', { default: true })
  isActive?: boolean;
}
