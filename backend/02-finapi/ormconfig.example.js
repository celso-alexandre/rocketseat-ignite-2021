const { SnakeNamingStrategy } = require('typeorm-naming-strategies');

module.exports = {
  type: 'postgres',
  namingStrategy: new SnakeNamingStrategy(),
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'docker1234',
  database: 'finapi',
  synchronize: true,
  logging: false,
  entities: [
    'src/entity/**/*.ts',
  ],
  migrations: [
    'src/migration/**/*.ts',
  ],
  subscribers: [
    'src/subscriber/**/*.ts',
  ],
};
