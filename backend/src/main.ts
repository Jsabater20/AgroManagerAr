// import './instrument'; // Sentry disabled temporarily for diagnostics
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

process.on('uncaughtException', (err) => {
  console.error('[FATAL] uncaughtException:', err);
  process.exit(1);
});
process.on('unhandledRejection', (reason) => {
  console.error('[FATAL] unhandledRejection:', reason);
  process.exit(1);
});

async function bootstrap() {
  console.log('[BOOT] Creating NestJS app...');
  const app = await NestFactory.create(AppModule, {
    rawBody: true,
    cors: {
      origin: '*',
      methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      preflightContinue: false,
      optionsSuccessStatus: 204,
    },
  });
  console.log('[BOOT] App created, configuring...');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.setGlobalPrefix('api');

  const port = parseInt(process.env.PORT || '3001', 10);
  console.log(`[BOOT] Listening on port ${port} (0.0.0.0)...`);
  await app.listen(port, '0.0.0.0');
  console.log(`🚀 AgroManager API corriendo en http://0.0.0.0:${port}/api`);
}
void bootstrap().catch((err) => {
  console.error('[FATAL] Bootstrap crashed:', err);
  process.exit(1);
});
