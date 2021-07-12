import { NestFactory } from "@nestjs/core";
import { MainModule } from "./main.module";
import { generateWallet, setupDatabase } from './utils';
import { ValidationPipe } from "@nestjs/common";
import { WebSocketServer } from './websocket/WebSocketServer';

const PORT = 3001;
const bootstrap = async () => {
  await setupDatabase("dev");
  const app = await NestFactory.create(MainModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  new WebSocketServer(app.getHttpServer());

  await app.listen(PORT);
};

bootstrap();
generateWallet();