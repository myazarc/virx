import { define } from 'typeorm-seeding';
import { Faker } from '@faker-js/faker';
import { LocationEntity } from 'src/location/infrastructure/entity/location.entity';
define(LocationEntity, (faker: Faker) => {
  const entity = new LocationEntity();
  entity.name = faker.address.country();
  return entity;
});
