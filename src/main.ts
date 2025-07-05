import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { CORS } from './constants';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.enableCors(CORS);
  app.useGlobalPipes(new ValidationPipe())

  const reflector = app.get(Reflector)
  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector))

  const config = new DocumentBuilder()
    .setTitle('Flow FEM API')
    .setDescription('The Flow FEM API description')
    .setVersion('1.0')   
    .build();
    
    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, documentFactory);

  const port = configService.get('PORT')
  await app.listen(port);
  console.log(`listen by port: ${port}`)
}
bootstrap();
