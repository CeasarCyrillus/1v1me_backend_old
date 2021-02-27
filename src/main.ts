import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {createDb, migrate} from "postgres-migrations"
import * as config from "./config/database.dev.json"

const PORT = 3001;
const bootstrap = async () => {
  const dbConfig = {
    database: config.database,
    user: config.user,
    password: config.user,
    host: config.host,
    port: config.port,
  }

  await createDb(dbConfig.database, {
    ...dbConfig,
    defaultDatabase: "postgres",
  });

  await migrate(dbConfig, "src/migrations")


  const app = await NestFactory.create(AppModule);
  await app.enableCors();
  await app.listen(PORT);
};

bootstrap().then(() => {
  console.log(`server running on http://localhost:${PORT}`);
});
