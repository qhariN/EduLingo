/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { SwaggerModule, DocumentBuilder, SwaggerCustomOptions } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3333;

  //* Swagger
  const config = new DocumentBuilder()
    .setTitle('Edulingo')
    .setDescription('Edulingo API description')
    .setVersion('1.0')
    .build();
  const customOptions: SwaggerCustomOptions = {
    explorer: true,
    swaggerOptions: {
      persistAuthorization: true,
    },
    customSiteTitle: 'Edulingo API Docs',
  };
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('', app, document, customOptions);
  
  await app.listen(port, () => {
    Logger.log('Listening at http://localhost:' + port + '/' + globalPrefix);
  });
}

bootstrap();
