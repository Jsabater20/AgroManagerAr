import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateAnimalDto,
  UpdateAnimalDto,
  CreatePrenezDto,
  UpdatePrenezEstadoDto,
  CreateRegistroPesoDto,
} from './dto/ganado.dto';

const GESTATION_DAYS: Record<string, number> = {
  BOVINO: 283,
  PORCINO: 114,
  EQUINO: 340,
  OVINO: 147,
  CAPRINO: 150,
  AVIAR: 21,
};

@Injectable()
export class GanadoService {
  constructor(private prisma: PrismaService) {}

  findAll(usuarioId: number) {
    return this.prisma.animal.findMany({
      where: { usuarioId },
      include: { preneces: { orderBy: { createdAt: 'desc' } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number, usuarioId: number) {
    const animal = await this.prisma.animal.findUnique({
      where: { id },
      include: { preneces: { orderBy: { createdAt: 'desc' } } },
    });
    if (!animal) throw new NotFoundException('Animal no encontrado');
    if (animal.usuarioId !== usuarioId) throw new ForbiddenException();
    return animal;
  }

  create(dto: CreateAnimalDto, usuarioId: number) {
    return this.prisma.animal.create({
      data: {
        nombre: dto.nombre,
        especie: dto.especie,
        sexo: dto.sexo,
        categoria: dto.categoria,
        peso: dto.peso,
        fechaNacimiento: dto.fechaNacimiento
          ? new Date(dto.fechaNacimiento)
          : undefined,
        observaciones: dto.observaciones,
        usuarioId,
      },
      include: { preneces: true },
    });
  }

  async update(id: number, dto: UpdateAnimalDto, usuarioId: number) {
    await this.findOne(id, usuarioId);
    return this.prisma.animal.update({
      where: { id },
      data: {
        nombre: dto.nombre,
        categoria: dto.categoria,
        peso: dto.peso,
        fechaNacimiento: dto.fechaNacimiento
          ? new Date(dto.fechaNacimiento)
          : undefined,
        observaciones: dto.observaciones,
      },
      include: { preneces: true },
    });
  }

  async remove(id: number, usuarioId: number) {
    await this.findOne(id, usuarioId);
    return this.prisma.animal.delete({ where: { id } });
  }

  async addPrenez(animalId: number, dto: CreatePrenezDto, usuarioId: number) {
    const animal = await this.findOne(animalId, usuarioId);
    const fechaInicio = new Date(dto.fechaInicio);
    const days = GESTATION_DAYS[animal.especie] ?? 283;
    const fechaEstimadaParto = new Date(fechaInicio);
    fechaEstimadaParto.setDate(fechaEstimadaParto.getDate() + days);

    return this.prisma.prenez.create({
      data: {
        animalId,
        fechaInicio,
        fechaEstimadaParto,
        observaciones: dto.observaciones,
      },
    });
  }

  async updatePrenezEstado(
    prenezId: number,
    dto: UpdatePrenezEstadoDto,
    usuarioId: number,
  ) {
    const prenez = await this.prisma.prenez.findUnique({
      where: { id: prenezId },
      include: { animal: true },
    });
    if (!prenez) throw new NotFoundException('Preñez no encontrada');
    if (prenez.animal.usuarioId !== usuarioId) throw new ForbiddenException();

    return this.prisma.prenez.update({
      where: { id: prenezId },
      data: { estado: dto.estado },
    });
  }

  // ─── Historial de pesos ──────────────────────────────────────────────────────

  async getPesos(animalId: number, usuarioId: number) {
    await this.findOne(animalId, usuarioId);
    return this.prisma.registroPeso.findMany({
      where: { animalId },
      orderBy: { fecha: 'asc' },
    });
  }

  async addPeso(
    animalId: number,
    dto: CreateRegistroPesoDto,
    usuarioId: number,
  ) {
    await this.findOne(animalId, usuarioId);
    const registro = await this.prisma.registroPeso.create({
      data: {
        animalId,
        peso: dto.peso,
        fecha: new Date(dto.fecha),
        observaciones: dto.observaciones,
      },
    });
    // Actualizar peso actual del animal
    await this.prisma.animal.update({
      where: { id: animalId },
      data: { peso: dto.peso },
    });
    return registro;
  }

  async removePeso(pesoId: number, usuarioId: number) {
    const registro = await this.prisma.registroPeso.findUnique({
      where: { id: pesoId },
      include: { animal: true },
    });
    if (!registro)
      throw new NotFoundException('Registro de peso no encontrado');

    if (registro.animal.usuarioId !== usuarioId) throw new ForbiddenException();
    return this.prisma.registroPeso.delete({ where: { id: pesoId } });
  }
}
