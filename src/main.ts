import { NestFactory } from '@nestjs/core';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { ValidationPipe } from '@nestjs/common/pipes';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new FastifyAdapter(), {
    logger: ['log', 'error', 'warn', 'verbose'],
  });
  app.useGlobalPipes(new ValidationPipe());
  // By default, Fastify listens only on the localhost 127.0.0.1 interface
  // If you want to accept connections on other hosts, you should specify '0.0.0.0' in the listen() call
  // This is required for containerization of the application else this will not run in Docker
  await app.listen(3000, '0.0.0.0');
}
bootstrap();
