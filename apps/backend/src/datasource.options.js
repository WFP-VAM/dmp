// We define this const in a separate file from the datasource to avoid importing the datasource
// in the app because it's creating open handles in Jest
/**
 * @type {import("typeorm/driver/postgres/PostgresConnectionOptions").PostgresConnectionOptions}
 **/
const dataSourceOptions = {
  type: 'postgres',
  url: `postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DATABASE}`,
  entities: process.env.TYPEORM_ENTITIES.split(','),
  migrations: process.env.TYPEORM_MIGRATIONS.split(','),
  synchronize: process.env.TYPEORM_SYNCHRONIZE === 'true',
  entityPrefix: process.env.TYPEORM_ENTITY_PREFIX,
};

module.exports = {
  dataSourceOptions,
};
