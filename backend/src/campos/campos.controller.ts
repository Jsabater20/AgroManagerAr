import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import { CamposService } from './campos.service';
import {
  CreateCampoDto,
  UpdateCampoDto,
  CreateLoteDto,
  UpdatePerfilRiesgoHidricoDto,
} from './dto/campos.dto';
import {
  CreateChecklistPreventivoHidricoDto,
  UpdateChecklistPreventivoHidricoDto,
  UpdateEstadoChecklistPreventivoHidricoDto,
} from './dto/checklist-hidrico.dto';
import { UpdateUmbralAlertaHidricaCampoDto } from './dto/umbrales-alerta-hidrica.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { DemoGuard } from '../auth/demo.guard';
import { OrganizationGuard } from '../organizations/organization.guard';
import { Auditar } from '../audit/decorators/audit.decorator';

interface AuthRequest {
  user: {
    id: number;
    email: string;
    nombre: string;
    rol: string;
    usuarioOrganizacionId?: number;
  };
  organizacionId: number;
}

@UseGuards(JwtAuthGuard, DemoGuard, OrganizationGuard)
@Controller('campos')
export class CamposController {
  constructor(private camposService: CamposService) {}

  @Get()
  findAll(@Request() req: AuthRequest, @Query('campoId') campoId?: string) {
    // Si viene un campoId específico, retornar solo ese
    if (campoId) {
      return this.camposService.findOne(parseInt(campoId), req.user.id, req.organizacionId);
    }

    // Si no, retornar con filtro automático si tiene usuarioOrganizacionId
    return this.camposService.findAll(
      req.user.id,
      req.organizacionId,
      req.user.usuarioOrganizacionId,
    );
  }

  @Get('resumen-hidrico')
  obtenerResumenHidricoDashboard(@Request() req: AuthRequest) {
    return this.camposService.obtenerResumenHidricoDashboard(
      req.user.id,
      req.organizacionId,
    );
  }

  @Get(':id/riesgo-hidrico')
  obtenerPerfilRiesgoHidrico(@Param('id', ParseIntPipe) id: number, @Request() req: AuthRequest) {
    return this.camposService.obtenerPerfilRiesgoHidrico(id, req.user.id, req.organizacionId);
  }

  @Get(':id/checklist-hidrico')
  listarChecklistPreventivoHidrico(
    @Param('id', ParseIntPipe) id: number,
    @Request() req: AuthRequest,
  ) {
    return this.camposService.listarChecklistPreventivoHidrico(
      id,
      req.user.id,
      req.organizacionId,
    );
  }

  @Get(':id/umbrales-alerta-hidrica')
  obtenerUmbralAlertaHidrica(
    @Param('id', ParseIntPipe) id: number,
    @Request() req: AuthRequest,
  ) {
    return this.camposService.obtenerUmbralAlertaHidrica(
      id,
      req.user.id,
      req.organizacionId,
    );
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number, @Request() req: AuthRequest) {
    return this.camposService.findOne(id, req.user.id, req.organizacionId);
  }

  @Post()
  @UseGuards(DemoGuard)
  @Auditar('crear_campo', 'Campo')
  create(@Body() dto: CreateCampoDto, @Request() req: AuthRequest) {
    return this.camposService.create(dto, req.user.id, req.organizacionId);
  }

  @Patch(':id')
  @UseGuards(DemoGuard)
  @Auditar('modificar_campo', 'Campo')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCampoDto,
    @Request() req: AuthRequest,
  ) {
    return this.camposService.update(id, dto, req.user.id, req.organizacionId);
  }

  @Patch(':id/riesgo-hidrico')
  @UseGuards(DemoGuard)
  @Auditar('actualizar_perfil_riesgo_hidrico', 'PerfilRiesgoHidricoCampo')
  actualizarPerfilRiesgoHidrico(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdatePerfilRiesgoHidricoDto,
    @Request() req: AuthRequest,
  ) {
    return this.camposService.actualizarPerfilRiesgoHidrico(
      id,
      dto,
      req.user.id,
      req.organizacionId,
    );
  }

  @Patch(':id/umbrales-alerta-hidrica')
  @UseGuards(DemoGuard)
  @Auditar('actualizar_umbrales_alerta_hidrica', 'UmbralAlertaHidricaCampo')
  actualizarUmbralAlertaHidrica(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateUmbralAlertaHidricaCampoDto,
    @Request() req: AuthRequest,
  ) {
    return this.camposService.actualizarUmbralAlertaHidrica(
      id,
      dto,
      req.user.id,
      req.organizacionId,
    );
  }

  @Post(':id/checklist-hidrico')
  @UseGuards(DemoGuard)
  @Auditar('crear_accion_preventiva_hidrica', 'ChecklistPreventivoHidrico')
  crearChecklistPreventivoHidrico(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CreateChecklistPreventivoHidricoDto,
    @Request() req: AuthRequest,
  ) {
    return this.camposService.crearChecklistPreventivoHidrico(
      id,
      dto,
      req.user.id,
      req.organizacionId,
    );
  }

  @Post(':id/checklist-hidrico/plantilla')
  @UseGuards(DemoGuard)
  @Auditar('crear_plantilla_preventiva_hidrica', 'ChecklistPreventivoHidrico')
  crearPlantillaChecklistPreventivoHidrico(
    @Param('id', ParseIntPipe) id: number,
    @Request() req: AuthRequest,
  ) {
    return this.camposService.crearPlantillaChecklistPreventivoHidrico(
      id,
      req.user.id,
      req.organizacionId,
    );
  }

  @Patch(':id/checklist-hidrico/:itemId/estado')
  @UseGuards(DemoGuard)
  @Auditar('actualizar_estado_accion_preventiva_hidrica', 'ChecklistPreventivoHidrico')
  actualizarEstadoChecklistPreventivoHidrico(
    @Param('id', ParseIntPipe) id: number,
    @Param('itemId', ParseIntPipe) itemId: number,
    @Body() dto: UpdateEstadoChecklistPreventivoHidricoDto,
    @Request() req: AuthRequest,
  ) {
    return this.camposService.actualizarEstadoChecklistPreventivoHidrico(
      id,
      itemId,
      dto.estado,
      req.user.id,
      req.organizacionId,
    );
  }

  @Patch(':id/checklist-hidrico/:itemId')
  @UseGuards(DemoGuard)
  @Auditar('editar_accion_preventiva_hidrica', 'ChecklistPreventivoHidrico')
  actualizarChecklistPreventivoHidrico(
    @Param('id', ParseIntPipe) id: number,
    @Param('itemId', ParseIntPipe) itemId: number,
    @Body() dto: UpdateChecklistPreventivoHidricoDto,
    @Request() req: AuthRequest,
  ) {
    return this.camposService.actualizarChecklistPreventivoHidrico(
      id,
      itemId,
      dto,
      req.user.id,
      req.organizacionId,
    );
  }

  @Delete(':id/checklist-hidrico/:itemId')
  @UseGuards(DemoGuard)
  @Auditar('eliminar_accion_preventiva_hidrica', 'ChecklistPreventivoHidrico')
  eliminarChecklistPreventivoHidrico(
    @Param('id', ParseIntPipe) id: number,
    @Param('itemId', ParseIntPipe) itemId: number,
    @Request() req: AuthRequest,
  ) {
    return this.camposService.eliminarChecklistPreventivoHidrico(
      id,
      itemId,
      req.user.id,
      req.organizacionId,
    );
  }

  @Delete(':id')
  @UseGuards(DemoGuard)
  @Auditar('eliminar_campo', 'Campo')
  remove(@Param('id', ParseIntPipe) id: number, @Request() req: AuthRequest) {
    return this.camposService.remove(id, req.user.id, req.organizacionId);
  }

  @Post(':id/lotes')
  @UseGuards(DemoGuard)
  @Auditar('crear_lote', 'Lote')
  addLote(
    @Param('id', ParseIntPipe) campoId: number,
    @Body() dto: CreateLoteDto,
    @Request() req: AuthRequest,
  ) {
    return this.camposService.addLote(
      campoId,
      dto,
      req.user.id,
      req.organizacionId,
    );
  }
}
