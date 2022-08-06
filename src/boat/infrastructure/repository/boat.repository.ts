import { InjectDataSource } from '@nestjs/typeorm';
import { BoatRepository } from 'src/boat/domain/boat.repository';
import { GenericRepository } from 'src/common/infrastructure/repository/generic.repository';
import { DataSource } from 'typeorm';
import { BoatEntity } from '../entity/boat.entity';

export class BoatRepositoryImplement
  extends GenericRepository<BoatEntity>
  implements BoatRepository
{
  constructor(@InjectDataSource() readonly dataSource: DataSource) {
    const boatRepository = dataSource.getRepository(BoatEntity);
    super(boatRepository);
  }
}
