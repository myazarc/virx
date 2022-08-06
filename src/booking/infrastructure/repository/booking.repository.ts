import { InjectDataSource } from '@nestjs/typeorm';
import { BookingRepository } from 'src/booking/domain/booking.repository';
import { GenericRepository } from 'src/common/infrastructure/repository/generic.repository';
import { Between, DataSource } from 'typeorm';
import { BookingEntity } from '../entity/booking.entity';

export class BookingRepositoryImplement
  extends GenericRepository<BookingEntity>
  implements BookingRepository
{
  constructor(@InjectDataSource() readonly dataSource: DataSource) {
    const bookingRepository = dataSource.getRepository(BookingEntity);
    super(bookingRepository);
  }
  async isAvailable(
    boat: number,
    startDate: Date,
    endDate: Date,
  ): Promise<boolean> {
    const t = await this.findByAll({
      where: {
        boat,
        startDate: Between(startDate, endDate),
        endDate: Between(startDate, endDate),
      },
    } as any);

    if (t.length > 0) {
      return false;
    }

    return true;
  }
}
