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
    findOne(id: number, req: AuthRequest): Promise<{
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
    create(dto: CreateAnimalDto, req: AuthRequest): import(".prisma/client").Prisma.Prisma__AnimalClient<{
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
    update(id: number, dto: UpdateAnimalDto, req: AuthRequest): Promise<{
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
    remove(id: number, req: AuthRequest): Promise<{
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
    addPrenez(animalId: number, dto: CreatePrenezDto, req: AuthRequest): Promise<{
        createdAt: Date;
        updatedAt: Date;
        id: number;
        fechaInicio: Date;
        observaciones: string | null;
        estado: import(".prisma/client").$Enums.EstadoPrenez;
        fechaEstimadaParto: Date;
        animalId: number;
    }>;
    updatePrenezEstado(prenezId: number, dto: UpdatePrenezEstadoDto, req: AuthRequest): Promise<{
        createdAt: Date;
        updatedAt: Date;
        id: number;
        fechaInicio: Date;
        observaciones: string | null;
        estado: import(".prisma/client").$Enums.EstadoPrenez;
        fechaEstimadaParto: Date;
        animalId: number;
    }>;
    getPesos(id: number, req: AuthRequest): Promise<{
        createdAt: Date;
        id: number;
        observaciones: string | null;
        peso: number;
        fecha: Date;
        animalId: number;
    }[]>;
    addPeso(animalId: number, dto: CreateRegistroPesoDto, req: AuthRequest): Promise<{
        createdAt: Date;
        id: number;
        observaciones: string | null;
        peso: number;
        fecha: Date;
        animalId: number;
    }>;
    removePeso(pesoId: number, req: AuthRequest): Promise<{
        createdAt: Date;
        id: number;
        observaciones: string | null;
        peso: number;
        fecha: Date;
        animalId: number;
    }>;
}
export {};
