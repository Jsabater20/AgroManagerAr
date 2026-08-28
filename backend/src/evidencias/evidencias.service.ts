import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { EstadoEvidencia, OrigenEvidencia, TipoRecursoEvidencia } from '@prisma/client';
import { randomUUID } from 'crypto';
import { MemberAccessService } from '../organizations/member-access.service';
import { PrismaService } from '../prisma/prisma.service';
import {
  ArchivoEvidenciaDto,
  PrepararEvidenciaDto,
} from './dto/preparar-evidencia.dto';
import { R2StorageService } from './r2-storage.service';

const PARES_RECURSO_VALIDOS: Record<
  OrigenEvidencia,
  TipoRecursoEvidencia[]
> = {
  ACTIVIDADES: [TipoRecursoEvidencia.ACTIVIDAD],
  GANADERIA: [TipoRecursoEvidencia.ANIMAL],
  MAQUINARIAS: [TipoRecursoEvidencia.MAQUINARIA],
  INSUMOS: [TipoRecursoEvidencia.INSUMO],
  CAMPOS: [TipoRecursoEvidencia.CAMPO, TipoRecursoEvidencia.LOTE],
  SIEMBRAS: [TipoRecursoEvidencia.SIEMBRA],
};

@Injectable()
export class EvidenciasService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly memberAccessService: MemberAccessService,
    private readonly r2StorageService: R2StorageService,
  ) {}

  async prepararCarga(
    organizacionId: number,
    usuarioId: number,
    dto: PrepararEvidenciaDto,
  ) {
    await this.validarAccesoAlRecurso(
      organizacionId,
      usuarioId,
      dto.origen,
      dto.tipoRecurso,
      dto.recursoId,
    );
    this.r2StorageService.verificarConfiguracion();

    const evidenciaId = randomUUID();
    const archivos = dto.archivos.map((archivo) => ({
      id: randomUUID(),
      storageKey: this.r2StorageService.crearStorageKey(
        organizacionId,
        evidenciaId,
        archivo.mimeType,
      ),
      ...archivo,
    }));

    const evidencia = await this.prisma.evidencia.create({
      data: {
        id: evidenciaId,
        organizacionId,
        usuarioId,
        origen: dto.origen,
        tipoRecurso: dto.tipoRecurso,
        recursoId: dto.recursoId,
        comentario: dto.comentario?.trim() || null,
        archivos: {
          create: archivos.map((archivo) => ({
            id: archivo.id,
            storageKey: archivo.storageKey,
            nombre: archivo.nombre,
            mimeType: archivo.mimeType,
            tamanoBytes: archivo.tamanoBytes,
            ancho: archivo.ancho,
            alto: archivo.alto,
          })),
        },
      },
      include: { archivos: true },
    });

    return {
      evidenciaId: evidencia.id,
      archivos: await Promise.all(
        evidencia.archivos.map(async (archivo) => ({
          id: archivo.id,
          storageKey: archivo.storageKey,
          uploadUrl: await this.r2StorageService.crearUrlDeSubida(
            archivo.storageKey,
            archivo.mimeType,
          ),
        })),
      ),
    };
  }

  async confirmar(
    organizacionId: number,
    evidenciaId: string,
    usuarioId: number,
  ) {
    const evidencia = await this.obtenerEvidenciaParaGestionar(
      organizacionId,
      evidenciaId,
      usuarioId,
    );

    await Promise.all(
      evidencia.archivos.map((archivo) =>
        this.r2StorageService.verificarArchivo(archivo.storageKey),
      ),
    );

    return this.prisma.evidencia.update({
      where: { id: evidenciaId },
      data: { estado: EstadoEvidencia.CONFIRMADA },
      include: { archivos: true },
    });
  }

  async listar(
    organizacionId: number,
    usuarioId: number,
    tipoRecurso: TipoRecursoEvidencia,
    recursoId: number,
  ) {
    const evidenciaDeReferencia = await this.prisma.evidencia.findFirst({
      where: {
        organizacionId,
        tipoRecurso,
        recursoId,
        estado: EstadoEvidencia.CONFIRMADA,
      },
      select: { origen: true },
      orderBy: { createdAt: 'desc' },
    });

    if (evidenciaDeReferencia) {
      await this.validarAccesoAlRecurso(
        organizacionId,
        usuarioId,
        evidenciaDeReferencia.origen,
        tipoRecurso,
        recursoId,
      );
    } else {
      await this.validarAccesoAlRecursoPorTipo(
        organizacionId,
        usuarioId,
        tipoRecurso,
        recursoId,
      );
    }

    const evidencias = await this.prisma.evidencia.findMany({
      where: {
        organizacionId,
        tipoRecurso,
        recursoId,
        estado: EstadoEvidencia.CONFIRMADA,
      },
      include: {
        usuario: { select: { id: true, nombre: true, apellido: true } },
        archivos: true,
      },
      orderBy: { fechaHora: 'desc' },
    });

    return Promise.all(
      evidencias.map(async (evidencia) => ({
        ...evidencia,
        archivos: await Promise.all(
          evidencia.archivos.map(async (archivo) => ({
            ...archivo,
            url: await this.r2StorageService.crearUrlDeLectura(
              archivo.storageKey,
            ),
          })),
        ),
      })),
    );
  }

  async obtenerUrlArchivo(
    organizacionId: number,
    evidenciaId: string,
    archivoId: string,
    usuarioId: number,
  ) {
    const evidencia = await this.obtenerEvidenciaConAcceso(
      organizacionId,
      evidenciaId,
      usuarioId,
    );
    const archivo = evidencia.archivos.find((item) => item.id === archivoId);

    if (!archivo) {
      throw new NotFoundException('Archivo de evidencia no encontrado');
    }

    return {
      url: await this.r2StorageService.crearUrlDeLectura(archivo.storageKey),
      expiresIn: 900,
    };
  }

  async eliminar(
    organizacionId: number,
    evidenciaId: string,
    usuarioId: number,
  ) {
    const evidencia = await this.obtenerEvidenciaParaGestionar(
      organizacionId,
      evidenciaId,
      usuarioId,
    );

    await this.r2StorageService.eliminarArchivos(
      evidencia.archivos.map((archivo) => archivo.storageKey),
    );

    await this.prisma.evidencia.delete({ where: { id: evidenciaId } });
    return { eliminado: true };
  }

  private async obtenerEvidenciaConAcceso(
    organizacionId: number,
    evidenciaId: string,
    usuarioId: number,
  ) {
    const evidencia = await this.prisma.evidencia.findFirst({
      where: { id: evidenciaId, organizacionId, estado: EstadoEvidencia.CONFIRMADA },
      include: { archivos: true },
    });

    if (!evidencia) {
      throw new NotFoundException('Evidencia no encontrada');
    }

    await this.validarAccesoAlRecurso(
      organizacionId,
      usuarioId,
      evidencia.origen,
      evidencia.tipoRecurso,
      evidencia.recursoId,
    );

    return evidencia;
  }

  private async obtenerEvidenciaParaGestionar(
    organizacionId: number,
    evidenciaId: string,
    usuarioId: number,
  ) {
    const evidencia = await this.prisma.evidencia.findFirst({
      where: { id: evidenciaId, organizacionId },
      include: { archivos: true },
    });

    if (!evidencia) {
      throw new NotFoundException('Evidencia no encontrada');
    }

    const organizacion = await this.prisma.organizacion.findUnique({
      where: { id: organizacionId },
      select: { propietarioId: true },
    });

    if (!organizacion || (evidencia.usuarioId !== usuarioId && organizacion.propietarioId !== usuarioId)) {
      throw new ForbiddenException('No tenés permiso para gestionar esta evidencia');
    }

    await this.validarAccesoAlRecurso(
      organizacionId,
      usuarioId,
      evidencia.origen,
      evidencia.tipoRecurso,
      evidencia.recursoId,
    );

    return evidencia;
  }

  private async validarAccesoAlRecurso(
    organizacionId: number,
    usuarioId: number,
    origen: OrigenEvidencia,
    tipoRecurso: TipoRecursoEvidencia,
    recursoId: number,
  ): Promise<void> {
    if (!PARES_RECURSO_VALIDOS[origen].includes(tipoRecurso)) {
      throw new BadRequestException('El origen no coincide con el tipo de recurso');
    }

    await this.validarAccesoAlRecursoPorTipo(
      organizacionId,
      usuarioId,
      tipoRecurso,
      recursoId,
    );
  }

  private async validarAccesoAlRecursoPorTipo(
    organizacionId: number,
    usuarioId: number,
    tipoRecurso: TipoRecursoEvidencia,
    recursoId: number,
  ): Promise<void> {
    switch (tipoRecurso) {
      case TipoRecursoEvidencia.ACTIVIDAD:
        await this.validarAccesoActividad(organizacionId, usuarioId, recursoId);
        return;
      case TipoRecursoEvidencia.CAMPO:
        await this.validarCampo(organizacionId, usuarioId, recursoId);
        return;
      case TipoRecursoEvidencia.LOTE:
        await this.validarLote(organizacionId, usuarioId, recursoId);
        return;
      case TipoRecursoEvidencia.SIEMBRA:
        await this.validarSiembra(organizacionId, usuarioId, recursoId);
        return;
      case TipoRecursoEvidencia.ANIMAL:
        await this.validarRecursoDeModulo(
          organizacionId,
          usuarioId,
          recursoId,
          'Ganadería',
          'animal',
        );
        return;
      case TipoRecursoEvidencia.MAQUINARIA:
        await this.validarRecursoDeModulo(
          organizacionId,
          usuarioId,
          recursoId,
          'Maquinarias',
          'maquinaria',
        );
        return;
      case TipoRecursoEvidencia.INSUMO:
        await this.validarInsumo(organizacionId, usuarioId, recursoId);
        return;
    }
  }

  private async validarAccesoActividad(
    organizacionId: number,
    usuarioId: number,
    actividadId: number,
  ): Promise<void> {
    const actividad = await this.prisma.actividadMiembro.findFirst({
      where: { id: actividadId, organizacionId },
      select: { usuarioOrganizacionId: true },
    });

    if (!actividad) {
      throw new NotFoundException('Actividad no encontrada');
    }

    const organizacion = await this.prisma.organizacion.findUnique({
      where: { id: organizacionId },
      select: { propietarioId: true },
    });

    if (organizacion?.propietarioId === usuarioId) {
      return;
    }

    const miembro = await this.prisma.usuarioOrganizacion.findUnique({
      where: { usuarioId_organizacionId: { usuarioId, organizacionId } },
      select: { id: true, activo: true },
    });

    if (!miembro?.activo || miembro.id !== actividad.usuarioOrganizacionId) {
      throw new ForbiddenException('No tenés acceso a esta actividad');
    }
  }

  private async validarCampo(
    organizacionId: number,
    usuarioId: number,
    campoId: number,
  ): Promise<void> {
    const campo = await this.prisma.campo.findFirst({
      where: { id: campoId, organizacionId },
      select: { id: true },
    });
    if (!campo) {
      throw new NotFoundException('Campo no encontrado');
    }
    await this.memberAccessService.requireCampo(usuarioId, organizacionId, campoId);
  }

  private async validarLote(
    organizacionId: number,
    usuarioId: number,
    loteId: number,
  ): Promise<void> {
    const lote = await this.prisma.lote.findFirst({
      where: { id: loteId, campo: { organizacionId } },
      select: { campoId: true },
    });
    if (!lote) {
      throw new NotFoundException('Lote no encontrado');
    }
    await this.memberAccessService.requireCampo(usuarioId, organizacionId, lote.campoId);
  }

  private async validarSiembra(
    organizacionId: number,
    usuarioId: number,
    siembraId: number,
  ): Promise<void> {
    const siembra = await this.prisma.siembra.findFirst({
      where: { id: siembraId, lote: { campo: { organizacionId } } },
      select: { lote: { select: { campoId: true } } },
    });
    if (!siembra) {
      throw new NotFoundException('Siembra no encontrada');
    }
    await this.memberAccessService.requireModule(usuarioId, organizacionId, 'Siembras');
    await this.memberAccessService.requireCampo(
      usuarioId,
      organizacionId,
      siembra.lote.campoId,
    );
  }

  private async validarRecursoDeModulo(
    organizacionId: number,
    usuarioId: number,
    recursoId: number,
    modulo: string,
    entidad: 'animal' | 'maquinaria',
  ): Promise<void> {
    const recurso =
      entidad === 'animal'
        ? await this.prisma.animal.findFirst({
            where: { id: recursoId, organizacionId },
            select: { id: true },
          })
        : await this.prisma.maquinaria.findFirst({
            where: { id: recursoId, organizacionId },
            select: { id: true },
          });

    if (!recurso) {
      throw new NotFoundException('Recurso no encontrado');
    }
    await this.memberAccessService.requireModule(usuarioId, organizacionId, modulo);
  }

  private async validarInsumo(
    organizacionId: number,
    usuarioId: number,
    insumoId: number,
  ): Promise<void> {
    const insumo = await this.prisma.insumo.findUnique({
      where: { id: insumoId },
      select: { id: true },
    });

    if (!insumo) {
      throw new NotFoundException('Insumo no encontrado');
    }
    await this.memberAccessService.requireModule(usuarioId, organizacionId, 'Insumos');
  }
}
