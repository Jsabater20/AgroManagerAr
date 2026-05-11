import { PrismaService } from '../prisma/prisma.service';
import { CreateCampoDto, UpdateCampoDto, CreateLoteDto } from './dto/campos.dto';
export declare class CamposService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(usuarioId: number): Promise<({
        lotes: {
            nombre: string;
            createdAt: Date;
            updatedAt: Date;
            id: number;
            hectareas: number;
            campoId: number;
        }[];
    } & {
        nombre: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        hectareas: number;
        ubicacion: string | null;
        propietario: string | null;
        usuarioId: number;
    })[]>;
    findOne(id: number, usuarioId: number): Promise<{
        lotes: ({
            siembras: ({
                tipoCultivo: {
                    nombre: string;
                    createdAt: Date;
                    id: number;
                    descripcion: string | null;
                };
            } & {
                createdAt: Date;
                updatedAt: Date;
                id: number;
                fechaSiembra: Date;
                densidad: number | null;
                observaciones: string | null;
                estado: import(".prisma/client").$Enums.EstadoSiembra;
                loteId: number;
                tipoCultivoId: number;
                campaniaId: number | null;
            })[];
        } & {
            nombre: string;
            createdAt: Date;
            updatedAt: Date;
            id: number;
            hectareas: number;
            campoId: number;
        })[];
    } & {
        nombre: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        hectareas: number;
        ubicacion: string | null;
        propietario: string | null;
        usuarioId: number;
    }>;
    create(dto: CreateCampoDto, usuarioId: number): Promise<{
        lotes: {
            nombre: string;
            createdAt: Date;
            updatedAt: Date;
            id: number;
            hectareas: number;
            campoId: number;
        }[];
    } & {
        nombre: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        hectareas: number;
        ubicacion: string | null;
        propietario: string | null;
        usuarioId: number;
    }>;
    update(id: number, dto: UpdateCampoDto, usuarioId: number): Promise<{
        lotes: {
            nombre: string;
            createdAt: Date;
            updatedAt: Date;
            id: number;
            hectareas: number;
            campoId: number;
        }[];
    } & {
        nombre: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        hectareas: number;
        ubicacion: string | null;
        propietario: string | null;
        usuarioId: number;
    }>;
    remove(id: number, usuarioId: number): Promise<{
        nombre: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        hectareas: number;
        ubicacion: string | null;
        propietario: string | null;
        usuarioId: number;
    }>;
    addLote(campoId: number, dto: CreateLoteDto, usuarioId: number): Promise<{
        nombre: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        hectareas: number;
        campoId: number;
    }>;
}
