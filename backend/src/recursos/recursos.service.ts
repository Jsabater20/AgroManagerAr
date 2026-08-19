import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RecursoResponse } from './dto/recurso-response.dto';

@Injectable()
export class RecursosService {
  constructor(private prisma: PrismaService) {}

  async obtenerPorTipo(
    tipo: string,
    organizacionId: number,
  ): Promise<RecursoResponse[]> {
    switch (tipo) {
      case 'CAMPO': {
        const campos = await this.prisma.campo.findMany({
          where: { organizacionId },
          select: {
            id: true,
            nombre: true,
            hectareas: true,
            ubicacion: true,
          },
          orderBy: { nombre: 'asc' },
        });
        return campos.map((c) => ({
          id: c.id,
          nombre: c.nombre,
          descripcion: `${c.hectareas} hectáreas${c.ubicacion ? ` - ${c.ubicacion}` : ''}`,
        }));
      }

      case 'LOTE': {
        const lotes = await this.prisma.lote.findMany({
          where: { campo: { organizacionId } },
          select: {
            id: true,
            nombre: true,
            hectareas: true,
            campo: { select: { nombre: true } },
          },
          orderBy: { nombre: 'asc' },
        });
        return lotes.map((l) => ({
          id: l.id,
          nombre: l.nombre,
          descripcion: `${l.hectareas} hectáreas - ${l.campo.nombre}`,
        }));
      }

      case 'SIEMBRA': {
        const siembras = await this.prisma.siembra.findMany({
          where: { lote: { campo: { organizacionId } } },
          select: {
            id: true,
            estado: true,
            tipoCultivo: { select: { nombre: true } },
            lote: { select: { nombre: true, campo: { select: { nombre: true } } } },
          },
          orderBy: { fechaSiembra: 'desc' },
        });
        return siembras.map((s) => ({
          id: s.id,
          nombre: `${s.tipoCultivo.nombre} - ${s.lote.nombre}`,
          descripcion: `${s.lote.campo.nombre} - ${s.estado}`,
        }));
      }

      case 'TAREA': {
        const tareas = await this.prisma.tareaRural.findMany({
          where: { organizacionId },
          select: {
            id: true,
            titulo: true,
            descripcion: true,
            estado: true,
          },
          orderBy: { titulo: 'asc' },
        });
        return tareas.map((t) => ({
          id: t.id,
          nombre: t.titulo,
          descripcion: `${t.estado}${t.descripcion ? ` - ${t.descripcion}` : ''}`,
        }));
      }

      case 'CULTIVO': {
        // TipoCultivo es global, sin filtro por organizacionId
        const cultivos = await this.prisma.tipoCultivo.findMany({
          select: {
            id: true,
            nombre: true,
          },
          orderBy: { nombre: 'asc' },
        });
        return cultivos.map((c) => ({
          id: c.id,
          nombre: c.nombre,
        }));
      }

      case 'MAQUINARIA': {
        const maquinarias = await this.prisma.maquinaria.findMany({
          where: { organizacionId },
          select: {
            id: true,
            nombre: true,
            modelo: true,
            marca: true,
          },
          orderBy: { nombre: 'asc' },
        });
        return maquinarias.map((m) => ({
          id: m.id,
          nombre: m.nombre,
          descripcion: `${m.marca || ''} ${m.modelo || ''}`.trim(),
        }));
      }

      case 'ANIMAL':
      case 'GANADO': {
        const animales = await this.prisma.animal.findMany({
          where: { organizacionId },
          select: {
            id: true,
            nombre: true,
            especie: true,
            categoria: true,
          },
          orderBy: { nombre: 'asc' },
        });
        return animales.map((a) => ({
          id: a.id,
          nombre: a.nombre,
          descripcion: `${a.especie} - ${a.categoria}`,
        }));
      }

      case 'CAMPANIA': {
        const campanias = await this.prisma.campania.findMany({
          where: { organizacionId },
          select: { id: true, nombre: true, descripcion: true },
          orderBy: { nombre: 'asc' },
        });
        return campanias.map((c) => ({
          id: c.id,
          nombre: c.nombre,
          descripcion: c.descripcion ?? undefined,
        }));
      }

      default:
        return [];
    }
  }
}
