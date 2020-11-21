import "reflect-metadata";
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import './database/connect';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const port: number = parseInt(`${process.env.PORT}`) || 3000;
  await app.listen(port, () => console.log('Server started in http://localhost:3333'));
}
bootstrap();
