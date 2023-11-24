import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { PrismaExceptionFilter } from './common/filters/prisma-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // enable cors
  app.enableCors();

  // useContainer(app.select(AppModule));
  /**
   * Setup global pipes.
   *
   * Read: https://docs.nestjs.com/pipes#global-scoped-pipes
   */
  app.useGlobalPipes(
    new ValidationPipe({
      /**
       * If set to true, validator will strip validated (returned) object of any
       * properties that do not use any validation decorators.
       *
       * Read: https://docs.nestjs.com/techniques/validation#stripping-properties
       */
      whitelist: true,
      /**
       * If set to true, instead of stripping non-whitelisted properties
       * validator will throw an exception.
       */
      forbidNonWhitelisted: true,
      /**
       * Automatically transform payloads to be objects typed according to their DTO classes.
       *
       * Read: https://docs.nestjs.com/techniques/validation#transform-payload-objects
       */
      transform: true,
    }),
  );

  app.useGlobalFilters(new PrismaExceptionFilter(), new HttpExceptionFilter());

  const config = new DocumentBuilder()
    .setTitle('Literate Octo Chainsaw API')
    .setDescription('The API for the Literate Octo Chainsaw application')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  app.enableShutdownHooks();
  await app.listen(4000);
}
bootstrap();
