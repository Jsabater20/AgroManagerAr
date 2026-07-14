import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreatePermisoTemporalDto } from './dto/create-permiso-temporal.dto';

@Controller('permisos')
@UseGuards(JwtAuthGuard)
export class PermissionsController {
  constructor(private permissionsService: PermissionsService) {}

  @Get('miembros/:usuarioOrganizacionId/activos')
  async listarPermisosActivos(
    @Param('usuarioOrganizacionId') usuarioOrganizacionId: string,
  ) {
    return this.permissionsService.listarPermisosActivos(
      parseInt(usuarioOrganizacionId),
    );
  }

  @Post('temporales')
  async crearPermisoTemporal(@Body() dto: CreatePermisoTemporalDto) {
    return this.permissionsService.crearPermisoTemporal(
      dto.usuarioOrganizacionId,
      dto.rolPersonalizadoId,
      new Date(dto.fechaInicio),
      new Date(dto.fechaVencimiento),
      dto.recursoTipo,
      dto.recursoId,
      dto.notas,
    );
  }

  @Patch(':permisoId/desactivar')
  async desactivarPermiso(@Param('permisoId') permisoId: string) {
    return this.permissionsService.desactivarPermiso(parseInt(permisoId));
  }
}
