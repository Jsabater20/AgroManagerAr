import { PrismaService } from '../prisma/prisma.service';
import { PlanService } from '../plan/plan.service';
import { CreateAnimalDto, UpdateAnimalDto, CreatePrenezDto, UpdatePrenezEstadoDto, CreateRegistroPesoDto } from './dto/ganado.dto';
export declare class GanadoService {
    private prisma;
    private planService;
    constructor(prisma: PrismaService, planService: PlanService);
    findAll(usuarioId: number): import(".prisma/client").Prisma.PrismaPromise<({
        preneces: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            observaciones: string | null;
            estado: import(".prisma/client").$Enums.EstadoPrenez;
            fechaInicio: Date;
            fechaEstimadaParto: Date;
            animalId: number;
        }[];
    } & {
        id: number;
        nombre: string;
        createdAt: Date;
        updatedAt: Date;
        usuarioId: number;
        observaciones: string | null;
        especie: import(".prisma/client").$Enums.Especie;
        sexo: import(".prisma/client").$Enums.Sexo;
        categoria: import(".prisma/client").$Enums.CategoriaAnimal;
        peso: number | null;
        fechaNacimiento: Date | null;
    })[]>;
    findOne(id: number, usuarioId: number): Promise<{
        preneces: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            observaciones: string | null;
            estado: import(".prisma/client").$Enums.EstadoPrenez;
            fechaInicio: Date;
            fechaEstimadaParto: Date;
            animalId: number;
        }[];
    } & {
        id: number;
        nombre: string;
        createdAt: Date;
        updatedAt: Date;
        usuarioId: number;
        observaciones: string | null;
        especie: import(".prisma/client").$Enums.Especie;
        sexo: import(".prisma/client").$Enums.Sexo;
        categoria: import(".prisma/client").$Enums.CategoriaAnimal;
        peso: number | null;
        fechaNacimiento: Date | null;
    }>;
    create(dto: CreateAnimalDto, usuarioId: number): Promise<{
        preneces: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            observaciones: string | null;
            estado: import(".prisma/client").$Enums.EstadoPrenez;
            fechaInicio: Date;
            fechaEstimadaParto: Date;
            animalId: number;
        }[];
    } & {
        id: number;
        nombre: string;
        createdAt: Date;
        updatedAt: Date;
        usuarioId: number;
        observaciones: string | null;
        especie: import(".prisma/client").$Enums.Especie;
        sexo: import(".prisma/client").$Enums.Sexo;
        categoria: import(".prisma/client").$Enums.CategoriaAnimal;
        peso: number | null;
        fechaNacimiento: Date | null;
    }>;
    update(id: number, dto: UpdateAnimalDto, usuarioId: number): Promise<{
        preneces: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            observaciones: string | null;
            estado: import(".prisma/client").$Enums.EstadoPrenez;
            fechaInicio: Date;
            fechaEstimadaParto: Date;
            animalId: number;
        }[];
    } & {
        id: number;
        nombre: string;
        createdAt: Date;
        updatedAt: Date;
        usuarioId: number;
        observaciones: string | null;
        especie: import(".prisma/client").$Enums.Especie;
        sexo: import(".prisma/client").$Enums.Sexo;
        categoria: import(".prisma/client").$Enums.CategoriaAnimal;
        peso: number | null;
        fechaNacimiento: Date | null;
    }>;
    remove(id: number, usuarioId: number): Promise<{
        id: number;
        nombre: string;
        createdAt: Date;
        updatedAt: Date;
        usuarioId: number;
        observaciones: string | null;
        especie: import(".prisma/client").$Enums.Especie;
        sexo: import(".prisma/client").$Enums.Sexo;
        categoria: import(".prisma/client").$Enums.CategoriaAnimal;
        peso: number | null;
        fechaNacimiento: Date | null;
    }>;
    addPrenez(animalId: number, dto: CreatePrenezDto, usuarioId: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        observaciones: string | null;
        estado: import(".prisma/client").$Enums.EstadoPrenez;
        fechaInicio: Date;
        fechaEstimadaParto: Date;
        animalId: number;
    }>;
    updatePrenezEstado(prenezId: number, dto: UpdatePrenezEstadoDto, usuarioId: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        observaciones: string | null;
        estado: import(".prisma/client").$Enums.EstadoPrenez;
        fechaInicio: Date;
        fechaEstimadaParto: Date;
        animalId: number;
    }>;
    getPesos(animalId: number, usuarioId: number): Promise<{
        id: number;
        createdAt: Date;
        observaciones: string | null;
        fecha: Date;
        peso: number;
        animalId: number;
    }[]>;
    addPeso(animalId: number, dto: CreateRegistroPesoDto, usuarioId: number): Promise<{
        id: number;
        createdAt: Date;
        observaciones: string | null;
        fecha: Date;
        peso: number;
        animalId: number;
    }>;
    removePeso(pesoId: number, usuarioId: number): Promise<{
        id: number;
        createdAt: Date;
        observaciones: string | null;
        fecha: Date;
        peso: number;
        animalId: number;
    }>;
}
