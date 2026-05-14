import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'agromanager_secret_dev_2026',
    });
  }

  async validate(payload: { sub: number; email: string }) {
    const usuario = await this.prisma.usuario.findUnique({
      where: { id: payload.sub },
      select: { id: true, email: true, nombre: true, rol: true, plan: true },
    });
    if (!usuario) {
      throw new UnauthorizedException('Usuario no encontrado');
    }
    return usuario;
  }
}
