import { GanadoService } from './ganado.service';
import { CreateAnimalDto, UpdateAnimalDto, CreatePrenezDto, UpdatePrenezEstadoDto, CreateRegistroPesoDto } from './dto/ganado.dto';
interface AuthRequest {
    user: {
        id: number;
    };
}
export declare class GanadoController {
    private ganadoService;
    constructor(ganadoService: GanadoService);
    findAll(req: AuthRequest): import(".prisma/client").Prisma.PrismaPromise<({
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
    findOne(id: number, req: AuthRequest): Promise<{
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
    create(dto: CreateAnimalDto, req: AuthRequest): Promise<{
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
    update(id: number, dto: UpdateAnimalDto, req: AuthRequest): Promise<{
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
    remove(id: number, req: AuthRequest): Promise<{
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
    addPrenez(animalId: number, dto: CreatePrenezDto, req: AuthRequest): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        observaciones: string | null;
        estado: import(".prisma/client").$Enums.EstadoPrenez;
        fechaInicio: Date;
        fechaEstimadaParto: Date;
        animalId: number;
    }>;
    updatePrenezEstado(prenezId: number, dto: UpdatePrenezEstadoDto, req: AuthRequest): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        observaciones: string | null;
        estado: import(".prisma/client").$Enums.EstadoPrenez;
        fechaInicio: Date;
        fechaEstimadaParto: Date;
        animalId: number;
    }>;
    getPesos(id: number, req: AuthRequest): Promise<{
        id: number;
        createdAt: Date;
        observaciones: string | null;
        fecha: Date;
        peso: number;
        animalId: number;
    }[]>;
    addPeso(animalId: number, dto: CreateRegistroPesoDto, req: AuthRequest): Promise<{
        id: number;
        createdAt: Date;
        observaciones: string | null;
        fecha: Date;
        peso: number;
        animalId: number;
    }>;
    removePeso(pesoId: number, req: AuthRequest): Promise<{
        id: number;
        createdAt: Date;
        observaciones: string | null;
        fecha: Date;
        peso: number;
        animalId: number;
    }>;
}
export {};
