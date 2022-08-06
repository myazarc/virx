import { InjectDataSource } from '@nestjs/typeorm';
import { GenericRepository } from 'src/common/infrastructure/repository/generic.repository';
import { LocationRepository } from 'src/location/domain/location.repository';
import { DataSource } from 'typeorm';
import { LocationEntity } from '../entity/location.entity';

export class LocationRepositoryImplement
  extends GenericRepository<LocationEntity>
  implements LocationRepository
{
  constructor(@InjectDataSource() readonly dataSource: DataSource) {
    const locationRepository = dataSource.getRepository(LocationEntity);
    super(locationRepository);
  }
}
