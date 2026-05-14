import { CamposService } from './campos.service';
import { CreateCampoDto, UpdateCampoDto, CreateLoteDto } from './dto/campos.dto';
interface AuthRequest {
    user: {
        id: number;
        email: string;
        nombre: string;
        rol: string;
    };
}
export declare class CamposController {
    private camposService;
    constructor(camposService: CamposService);
    findAll(req: AuthRequest): Promise<({
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
    findOne(id: number, req: AuthRequest): Promise<{
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
    create(dto: CreateCampoDto, req: AuthRequest): Promise<{
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
    update(id: number, dto: UpdateCampoDto, req: AuthRequest): Promise<{
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
    remove(id: number, req: AuthRequest): Promise<{
        id: number;
        nombre: string;
        createdAt: Date;
        updatedAt: Date;
        hectareas: number;
        ubicacion: string | null;
        propietario: string | null;
        usuarioId: number;
    }>;
    addLote(campoId: number, dto: CreateLoteDto, req: AuthRequest): Promise<{
        id: number;
        nombre: string;
        createdAt: Date;
        updatedAt: Date;
        hectareas: number;
        campoId: number;
    }>;
}
export {};
