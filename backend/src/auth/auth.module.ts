import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { ReferidosModule } from '../referidos/referidos.module';
import { NotificacionesModule } from '../notificaciones/notificaciones.module';
import { PromocionesModule } from '../promociones/promociones.module';

@Module({
  imports: [
    PassportModule,
    ReferidosModule,
    NotificacionesModule,
    PromocionesModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'agromanager_secret_dev_2026',
      signOptions: { expiresIn: '7d' },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
