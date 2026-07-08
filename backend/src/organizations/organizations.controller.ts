import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
  ParseIntPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { OrganizationsService } from './organizations.service';
import {
  CreateOrganizacionDto,
  UpdateOrganizacionDto,
  InvitarMiembroDto,
} from './organizations.dto';

@Controller('organizaciones')
@UseGuards(JwtAuthGuard)
export class OrganizationsController {
  constructor(private organizationsService: OrganizationsService) {}

  @Post()
  async crearOrganizacion(
    @Request() req: { user: { id: number } },
    @Body() dto: CreateOrganizacionDto,
  ) {
    return this.organizationsService.crearOrganizacion(req.user.id, dto);
  }

  @Get()
  async obtenerOrganizaciones(
    @Request() req: { user: { id: number } },
  ) {
    return this.organizationsService.obtenerOrganizacionesDelUsuario(
      req.user.id,
    );
  }

  @Get(':id')
  async obtenerOrganizacion(
    @Param('id', ParseIntPipe) id: number,
    @Request() req: { user: { id: number } },
  ) {
    return this.organizationsService.obtenerOrganizacion(id, req.user.id);
  }

  @Patch(':id')
  async actualizarOrganizacion(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateOrganizacionDto,
    @Request() req: { user: { id: number } },
  ) {
    return this.organizationsService.actualizarOrganizacion(
      id,
      req.user.id,
      dto,
    );
  }

  @Post(':id/invitar')
  async invitarMiembro(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: InvitarMiembroDto,
    @Request() req: { user: { id: number } },
  ) {
    return this.organizationsService.invitarMiembro(id, req.user.id, dto);
  }

  @Post('invitaciones/:token/aceptar')
  async aceptarInvitacion(
    @Param('token') token: string,
    @Request() req: { user: { id: number } },
  ) {
    return this.organizationsService.aceptarInvitacion(token, req.user.id);
  }

  @Get(':id/miembros')
  async obtenerMiembros(
    @Param('id', ParseIntPipe) id: number,
    @Request() req: { user: { id: number } },
  ) {
    return this.organizationsService.obtenerMiembros(id, req.user.id);
  }

  @Delete(':id/miembros/:miembroId')
  async eliminarMiembro(
    @Param('id', ParseIntPipe) id: number,
    @Param('miembroId', ParseIntPipe) miembroId: number,
    @Request() req: { user: { id: number } },
  ) {
    return this.organizationsService.eliminarMiembro(
      id,
      req.user.id,
      miembroId,
    );
  }
}
