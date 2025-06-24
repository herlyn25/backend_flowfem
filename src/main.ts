import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { CORS } from './constants';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.enableCors(CORS);
  app.useGlobalPipes(new ValidationPipe())
  const port = configService.get('PORT')
  await app.listen(port);
  console.log(`listen by port: ${port}`)
}
bootstrap();
