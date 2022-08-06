import { IGenericRepository } from 'src/common/generic/IGenericRepository';
import { IBooking } from './booking';

export interface BookingRepository extends IGenericRepository<IBooking> {
  isAvailable(boat: number, startDate: Date, endDate: Date): Promise<boolean>;
}
