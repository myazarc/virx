import { UserEntity } from 'src/user/infrastructure/entity/user.entity';
import { define } from 'typeorm-seeding';
import { Faker, GenderType } from '@faker-js/faker';
define(UserEntity, (faker: Faker) => {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();

  const email = faker.internet.email(firstName, lastName);

  const user = new UserEntity();
  user.name = `${firstName} ${lastName}`;
  user.email = email;
  user.password = faker.internet.password();
  return user;
});
