import "reflect-metadata";
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import './database/connect';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3333, () => console.log('Server started in http://localhost:3333'));
}
bootstrap();
