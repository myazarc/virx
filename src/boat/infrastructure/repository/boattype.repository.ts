import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { BoatTypeRepository } from 'src/boat/domain/boattype.repository';
import { GenericRepository } from 'src/common/infrastructure/repository/generic.repository';
import { BoatTypeEntity } from '../entity/boattype.entity';

export class BoatTypeRepositoryImplement
  extends GenericRepository<BoatTypeEntity>
  implements BoatTypeRepository
{
  constructor(@InjectDataSource() readonly dataSource: DataSource) {
    const boatTypeRepository = dataSource.getRepository(BoatTypeEntity);
    super(boatTypeRepository);
  }
}
