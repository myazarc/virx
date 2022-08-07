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

  search(params: any): Promise<any> {
    const { bookings, ...param } = params;
    return this.getQueryBuilder()
      .where(param)
      .andWhere(
        (qb) =>
          `"boats"."id" NOT IN (SELECT "boatId" FROM "bookings" WHERE "startDate" BETWEEN '${bookings.startDate}' AND '${bookings.endDate}' OR "endDate" BETWEEN '${bookings.startDate}' AND '${bookings.endDate}')`,
      )
      .getMany();
  }
}
