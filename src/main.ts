import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({}));
  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector), {
      // hide all response DTO fields by default
      // excludeExtraneousValues: true,
    }),
  );

  await app.listen(3000);
}

void bootstrap();
