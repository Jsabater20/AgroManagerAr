import { PrismaService } from '../prisma/prisma.service';
import { CreateAnimalDto, UpdateAnimalDto, CreatePrenezDto, UpdatePrenezEstadoDto, CreateRegistroPesoDto } from './dto/ganado.dto';
export declare class GanadoService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(usuarioId: number): import(".prisma/client").Prisma.PrismaPromise<({
        preneces: {
            createdAt: Date;
            updatedAt: Date;
            id: number;
            fechaInicio: Date;
            observaciones: string | null;
            estado: import(".prisma/client").$Enums.EstadoPrenez;
            fechaEstimadaParto: Date;
            animalId: number;
        }[];
    } & {
        nombre: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
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
            createdAt: Date;
            updatedAt: Date;
            id: number;
            fechaInicio: Date;
            observaciones: string | null;
            estado: import(".prisma/client").$Enums.EstadoPrenez;
            fechaEstimadaParto: Date;
            animalId: number;
        }[];
    } & {
        nombre: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        usuarioId: number;
        observaciones: string | null;
        especie: import(".prisma/client").$Enums.Especie;
        sexo: import(".prisma/client").$Enums.Sexo;
        categoria: import(".prisma/client").$Enums.CategoriaAnimal;
        peso: number | null;
        fechaNacimiento: Date | null;
    }>;
    create(dto: CreateAnimalDto, usuarioId: number): import(".prisma/client").Prisma.Prisma__AnimalClient<{
        preneces: {
            createdAt: Date;
            updatedAt: Date;
            id: number;
            fechaInicio: Date;
            observaciones: string | null;
            estado: import(".prisma/client").$Enums.EstadoPrenez;
            fechaEstimadaParto: Date;
            animalId: number;
        }[];
    } & {
        nombre: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        usuarioId: number;
        observaciones: string | null;
        especie: import(".prisma/client").$Enums.Especie;
        sexo: import(".prisma/client").$Enums.Sexo;
        categoria: import(".prisma/client").$Enums.CategoriaAnimal;
        peso: number | null;
        fechaNacimiento: Date | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    update(id: number, dto: UpdateAnimalDto, usuarioId: number): Promise<{
        preneces: {
            createdAt: Date;
            updatedAt: Date;
            id: number;
            fechaInicio: Date;
            observaciones: string | null;
            estado: import(".prisma/client").$Enums.EstadoPrenez;
            fechaEstimadaParto: Date;
            animalId: number;
        }[];
    } & {
        nombre: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        usuarioId: number;
        observaciones: string | null;
        especie: import(".prisma/client").$Enums.Especie;
        sexo: import(".prisma/client").$Enums.Sexo;
        categoria: import(".prisma/client").$Enums.CategoriaAnimal;
        peso: number | null;
        fechaNacimiento: Date | null;
    }>;
    remove(id: number, usuarioId: number): Promise<{
        nombre: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        usuarioId: number;
        observaciones: string | null;
        especie: import(".prisma/client").$Enums.Especie;
        sexo: import(".prisma/client").$Enums.Sexo;
        categoria: import(".prisma/client").$Enums.CategoriaAnimal;
        peso: number | null;
        fechaNacimiento: Date | null;
    }>;
    addPrenez(animalId: number, dto: CreatePrenezDto, usuarioId: number): Promise<{
        createdAt: Date;
        updatedAt: Date;
        id: number;
        fechaInicio: Date;
        observaciones: string | null;
        estado: import(".prisma/client").$Enums.EstadoPrenez;
        fechaEstimadaParto: Date;
        animalId: number;
    }>;
    updatePrenezEstado(prenezId: number, dto: UpdatePrenezEstadoDto, usuarioId: number): Promise<{
        createdAt: Date;
        updatedAt: Date;
        id: number;
        fechaInicio: Date;
        observaciones: string | null;
        estado: import(".prisma/client").$Enums.EstadoPrenez;
        fechaEstimadaParto: Date;
        animalId: number;
    }>;
    getPesos(animalId: number, usuarioId: number): Promise<{
        createdAt: Date;
        id: number;
        observaciones: string | null;
        peso: number;
        fecha: Date;
        animalId: number;
    }[]>;
    addPeso(animalId: number, dto: CreateRegistroPesoDto, usuarioId: number): Promise<{
        createdAt: Date;
        id: number;
        observaciones: string | null;
        peso: number;
        fecha: Date;
        animalId: number;
    }>;
    removePeso(pesoId: number, usuarioId: number): Promise<{
        createdAt: Date;
        id: number;
        observaciones: string | null;
        peso: number;
        fecha: Date;
        animalId: number;
    }>;
}
