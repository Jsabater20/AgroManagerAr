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

// Configuración de CORS desde variable de entorno
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',').map((origin) => origin.trim())
  : [];

if (!process.env.ALLOWED_ORIGINS) {
  console.warn('[CORS] ALLOWED_ORIGINS environment variable is not set. Only no-origin requests will be allowed.');
}

async function bootstrap() {
  console.log('[BOOT] Creating NestJS app...');
  console.log(`[CORS] Allowed origins: ${allowedOrigins.length > 0 ? allowedOrigins.join(', ') : 'NONE'}`);

  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: function (origin, callback) {
        // Permitir peticiones sin origin (curl, Postman, Railway health checks)
        if (!origin) {
          callback(null, true);
        } else if (allowedOrigins.includes(origin)) {
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