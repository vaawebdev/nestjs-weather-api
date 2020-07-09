import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn'],
  });
  const config = app.get<ConfigService>(ConfigService);
  await app.listen(config.get<number>('APP_PORT'));
}

bootstrap();
