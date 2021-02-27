import * as config from '../config/config.json';
import { createDb, migrate } from 'postgres-migrations';

export const setupDatabase = async (env: "dev" | "test") => {
  const dbConfig = {
    database: config.database[env].database,
    user: config.database[env].user,
    password: config.database[env].user,
    host: config.database[env].host,
    port: config.database[env].port,
  }

  await createDb(dbConfig.database, {
    ...dbConfig,
    defaultDatabase: "postgres",
  });

  await migrate(dbConfig, "src/migrations")
}
