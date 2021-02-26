import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const PORT = 3001;
const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  await app.enableCors();
  await app.listen(PORT);
};

bootstrap().then(() => {
  console.log(`server running on http://localhost:${PORT}`);
});
