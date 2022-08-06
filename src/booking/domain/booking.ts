import { IGeneric } from 'src/common/generic/IGeneric';

export interface IBooking extends IGeneric {
  bookingNo: string;
  bookingDate: Date;
  boat: number;
  user: number;
  startDate: Date;
  endDate: Date;
  totalPrice: number;
  paidPrice: number;
  balance: number;
}
