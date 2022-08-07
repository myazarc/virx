import { define, factory } from 'typeorm-seeding';
import { Faker } from '@faker-js/faker';
import { BoatEntity } from 'src/boat/infrastructure/entity/boat.entity';
import { UserEntity } from 'src/user/infrastructure/entity/user.entity';
import { LocationEntity } from 'src/location/infrastructure/entity/location.entity';
import { BoatTypeEntity } from 'src/boat/infrastructure/entity/boattype.entity';

define(BoatEntity, (faker: any) => {
  const entity = new BoatEntity();
  entity.title = faker.lorem.sentence();
  entity.description = faker.lorem.paragraph();
  entity.isCrewed = faker.random.boolean();
  entity.personCapacity = parseInt(faker.random.number(28));
  entity.prePaymentRate = parseInt(faker.random.number(50));
  entity.price = parseFloat(faker.finance.amount(75, 1000, 2, ''));
  return entity;
});
