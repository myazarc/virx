import { define } from 'typeorm-seeding';
import { Faker } from '@faker-js/faker';
import { BoatTypeEntity } from 'src/boat/infrastructure/entity/boattype.entity';
define(BoatTypeEntity, (faker: any) => {
  const entity = new BoatTypeEntity();
  entity.name = faker.random.arrayElement([
    'Sailboat',
    'Kayak',
    'Canoe',
    'Other',
  ]);
  return entity;
});
