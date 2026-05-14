import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD, APP_FILTER } from '@nestjs/core';
import { SentryModule, SentryGlobalFilter } from '@sentry/nestjs/setup';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { CamposModule } from './campos/campos.module';
import { CultivosModule } from './cultivos/cultivos.module';
import { SiembrasModule } from './siembras/siembras.module';
import { InsumosModule } from './insumos/insumos.module';
import { GanadoModule } from './ganado/ganado.module';
import { TareasModule } from './tareas/tareas.module';
import { FinanzasModule } from './finanzas/finanzas.module';
import { CampaniasModule } from './campanias/campanias.module';
import { AiModule } from './ai/ai.module';
import { PlanModule } from './plan/plan.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    SentryModule.forRoot(),
    ConfigModule.forRoot({ isGlobal: true }),
    ThrottlerModule.forRoot([
      {
        name: 'global',
        ttl: 60000,
        limit: 100,
      },
    ]),
    PrismaModule,
    AuthModule,
    PlanModule,
    UsersModule,
    CamposModule,
    CultivosModule,
    SiembrasModule,
    InsumosModule,
    GanadoModule,
    TareasModule,
    FinanzasModule,
    CampaniasModule,
    AiModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_FILTER,
      useClass: SentryGlobalFilter,
    },
  ],
})
export class AppModule {}
