export default {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '12345',
  database: 'test',
  entities: ['src/**/*.entity{.ts,.js}'],
  synchronize: true,
  logging: true,
  seeds: ['src/database/seeds/**/*{.ts,.js}'],
  factories: ['src/database/factories/**/*{.ts,.js}'],
};
