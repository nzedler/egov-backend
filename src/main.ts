import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as fs from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Create Swagger documentation that can be provided to RESTler fuzzer
  const config = new DocumentBuilder()
    .setTitle('OpenAPI Specification')
    .setDescription('The egovernment API description')
    .setVersion('1.0')
    .addTag('register')
    .addServer('http://192.168.178.107:3000')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  // Only show and generate the Swagger documentation if the dev environment variable is set
  if (true || process.env.NODE_ENV === 'development') {
    fs.writeFileSync('./swagger-spec.json', JSON.stringify(document));
    SwaggerModule.setup('api', app, document);
  }

  // Binding ValidationPipe at the application level, thus ensuring all endpoints are protected
  // from receiving incorrect data. The validation happens in the dto-files with e.g. @IsEmail().
  // Error messages are disabled to minimize attack surface
  app.useGlobalPipes(new ValidationPipe({ disableErrorMessages: false }));
  await app.listen(3000);
}
bootstrap();
