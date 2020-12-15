import "reflect-metadata";
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import './database/connect';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const port = process.env.PORT || 3333;
  await app.listen(3333, () => console.log('Server started in http://localhost' + port));
}
bootstrap();
