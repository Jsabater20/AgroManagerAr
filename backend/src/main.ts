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
    cors: {
      origin: function (origin, callback) {
        const allowedOrigins = [
          'https://www.agromanagerar.com',
          'https://agromanagerar.com',
          'http://localhost:5173',
          'http://localhost:3000',
          'http://127.0.0.1:5173',
        ];
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          console.warn(`[CORS] Blocked origin: ${origin}`);
          callback(new Error('Not allowed by CORS'));
        }
      },
      methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
      credentials: true,
      preflightContinue: false,
      optionsSuccessStatus: 200,
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
