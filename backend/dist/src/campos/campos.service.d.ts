import { PrismaService } from '../prisma/prisma.service';
import { PlanService } from '../plan/plan.service';
import { CreateCampoDto, UpdateCampoDto, CreateLoteDto } from './dto/campos.dto';
export declare class CamposService {
    private prisma;
    private planService;
    constructor(prisma: PrismaService, planService: PlanService);
    findAll(usuarioId: number): Promise<({
        lotes: {
            id: number;
            nombre: string;
            createdAt: Date;
            updatedAt: Date;
            hectareas: number;
            campoId: number;
        }[];
    } & {
        id: number;
        nombre: string;
        createdAt: Date;
        updatedAt: Date;
        hectareas: number;
        ubicacion: string | null;
        propietario: string | null;
        usuarioId: number;
    })[]>;
    findOne(id: number, usuarioId: number): Promise<{
        lotes: ({
            siembras: ({
                tipoCultivo: {
                    id: number;
                    nombre: string;
                    createdAt: Date;
                    descripcion: string | null;
                };
            } & {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                loteId: number;
                tipoCultivoId: number;
                fechaSiembra: Date;
                densidad: number | null;
                observaciones: string | null;
                estado: import(".prisma/client").$Enums.EstadoSiembra;
                campaniaId: number | null;
            })[];
        } & {
            id: number;
            nombre: string;
            createdAt: Date;
            updatedAt: Date;
            hectareas: number;
            campoId: number;
        })[];
    } & {
        id: number;
        nombre: string;
        createdAt: Date;
        updatedAt: Date;
        hectareas: number;
        ubicacion: string | null;
        propietario: string | null;
        usuarioId: number;
    }>;
    create(dto: CreateCampoDto, usuarioId: number): Promise<{
        lotes: {
            id: number;
            nombre: string;
            createdAt: Date;
            updatedAt: Date;
            hectareas: number;
            campoId: number;
        }[];
    } & {
        id: number;
        nombre: string;
        createdAt: Date;
        updatedAt: Date;
        hectareas: number;
        ubicacion: string | null;
        propietario: string | null;
        usuarioId: number;
    }>;
    update(id: number, dto: UpdateCampoDto, usuarioId: number): Promise<{
        lotes: {
            id: number;
            nombre: string;
            createdAt: Date;
            updatedAt: Date;
            hectareas: number;
            campoId: number;
        }[];
    } & {
        id: number;
        nombre: string;
        createdAt: Date;
        updatedAt: Date;
        hectareas: number;
        ubicacion: string | null;
        propietario: string | null;
        usuarioId: number;
    }>;
    remove(id: number, usuarioId: number): Promise<{
        id: number;
        nombre: string;
        createdAt: Date;
        updatedAt: Date;
        hectareas: number;
        ubicacion: string | null;
        propietario: string | null;
        usuarioId: number;
    }>;
    addLote(campoId: number, dto: CreateLoteDto, usuarioId: number): Promise<{
        id: number;
        nombre: string;
        createdAt: Date;
        updatedAt: Date;
        hectareas: number;
        campoId: number;
    }>;
}
