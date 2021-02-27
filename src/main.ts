import { NestFactory } from '@nestjs/core';
import { MainModule } from './main.module';
import {createDb, migrate} from "postgres-migrations"
import * as config from "./config/database.dev.json"

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

const PORT = 3001;
const bootstrap = async () => {
  await setupDatabase("dev");
  const app = await NestFactory.create(MainModule);
  await app.enableCors();
  await app.listen(PORT);
};

bootstrap();
