import { IBooking } from 'src/booking/domain/booking';
import { BaseEntityImpl } from 'src/common/infrastructure/entity/base_entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity('bookings')
export class BookingEntity extends BaseEntityImpl implements IBooking {
  @Column('text', { nullable: false, unique: true })
  bookingNo: string;
  @Column('date', { nullable: false })
  bookingDate: Date;
  @ManyToOne('boats', 'id')
  boat: number;
  @ManyToOne('users', 'id')
  user: number;
  @Column('date', { nullable: false })
  startDate: Date;
  @Column('date', { nullable: false })
  endDate: Date;
  @Column('decimal', { nullable: false, precision: 10, scale: 2 })
  totalPrice: number;
  @Column('decimal', { nullable: false, precision: 10, scale: 2 })
  paidPrice: number;
  @Column('decimal', { nullable: false, precision: 10, scale: 2 })
  balance: number;
}
