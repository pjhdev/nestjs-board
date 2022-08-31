import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './shared/exceptions/all-excption.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  const document = SwaggerModule.createDocument(
    app,
    new DocumentBuilder()
      .setTitle('WantedLab API')
      .setDescription('The WantedLab API description')
      .setVersion('1.0')
      .build(),
    {},
  );
  SwaggerModule.setup('api-docs', app, document);

  // global filters
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter({ httpAdapter }));

  // global pipes
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        // enable query param transform
        enableImplicitConversion: true,
      },
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen(3000, '0.0.0.0');
}
bootstrap();
