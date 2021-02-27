import { SequelizeModule } from '@nestjs/sequelize';
import * as config from '../../config/config.json';
import { Match } from '../match/match.model';

export const testDatabaseModule = SequelizeModule.forRoot({
  dialect: "postgres",
  host: config.database.test.host,
  port: config.database.test.port,
  username: config.database.test.user,
  password: config.database.test.password,
  database: config.database.test.database,
  models: [Match],
  quoteIdentifiers: false,
  logging: false,
});