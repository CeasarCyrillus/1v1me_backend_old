import { NestFactory } from "@nestjs/core";
import { MainModule } from "./main.module";
import { setupDatabase } from "./utils";
import { ValidationPipe } from "@nestjs/common";

const PORT = 3001;
const bootstrap = async () => {
  await setupDatabase("dev");
  const app = await NestFactory.create(MainModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(PORT);
};

bootstrap();
