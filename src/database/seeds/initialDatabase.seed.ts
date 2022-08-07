import { BoatEntity } from 'src/boat/infrastructure/entity/boat.entity';
import { BoatTypeEntity } from 'src/boat/infrastructure/entity/boattype.entity';
import { BookingEntity } from 'src/booking/infrastructure/entity/booking.entity';
import { LocationEntity } from 'src/location/infrastructure/entity/location.entity';
import { UserEntity } from 'src/user/infrastructure/entity/user.entity';
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';

export default class InitialDatabase implements Seeder {
  async run(factory: Factory, connection: Connection): Promise<void> {
    const oneUser = await factory(UserEntity)().create({
      name: 'Admin',
      email: 'mail@example.ext',
      password: 'password',
    });
    const userList = await factory(UserEntity)().createMany(50);

    const users = [oneUser, ...userList];

    const type0 = await factory(BoatTypeEntity)().create({
      name: 'Sailboat',
    });
    const type1 = await factory(BoatTypeEntity)().create({
      name: 'Kayak',
    });
    const type2 = await factory(BoatTypeEntity)().create({
      name: 'Canoe',
    });
    const type3 = await factory(BoatTypeEntity)().create({
      name: 'Other',
    });

    const types = [type0, type1, type2, type3];

    const locations = await factory(LocationEntity)().createMany(20);

    const boats = await factory(BoatEntity)()
      .map(async (boat) => {
        boat.location = locations[
          Math.floor(Math.random() * locations.length)
        ] as any;
        boat.type = types[Math.floor(Math.random() * types.length)];
        boat.user = users[Math.floor(Math.random() * users.length)] as any;
        return boat;
      })
      .createMany(100);

    await factory(BookingEntity)()
      .map(async (booking) => {
        booking.user = users[Math.floor(Math.random() * users.length)] as any;
        const b = boats[Math.floor(Math.random() * boats.length)] as any;
        booking.boat = b;

        booking.totalPrice =
          (b.price *
            (booking.endDate.getTime() - booking.startDate.getTime())) /
          (1000 * 60 * 60 * 24);
        booking.paidPrice =
          booking.totalPrice - (booking.totalPrice * b.prePaymentRate) / 100;
        booking.balance = booking.totalPrice - booking.paidPrice;

        return booking;
      })
      .createMany(10000);
  }
}
