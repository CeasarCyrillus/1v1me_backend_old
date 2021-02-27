import { NestFactory } from "@nestjs/core";
import { MainModule } from "./main.module";
import { setupDatabase } from "./utils";

const PORT = 3001;
const bootstrap = async () => {
  await setupDatabase("dev");
  const app = await NestFactory.create(MainModule);
  await app.enableCors();
  await app.listen(PORT);
};

bootstrap();
