import { define, factory } from 'typeorm-seeding';
import { BookingEntity } from 'src/booking/infrastructure/entity/booking.entity';
import * as dayjs from 'dayjs';

define(BookingEntity, (faker: any) => {
  const entity = new BookingEntity();

  const date = faker.date.between('2023-01-01', '2023-12-31');
  entity.startDate = date;
  entity.endDate = dayjs(date).add(faker.random.number(10), 'day').toDate();

  entity.bookingDate = faker.date.past();
  entity.bookingNo = faker.random.uuid();

  return entity;
});
