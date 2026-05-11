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
    findOne(id: number, req: AuthRequest): Promise<{
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
    create(dto: CreateCampoDto, req: AuthRequest): Promise<{
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
    update(id: number, dto: UpdateCampoDto, req: AuthRequest): Promise<{
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
    remove(id: number, req: AuthRequest): Promise<{
        nombre: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        hectareas: number;
        ubicacion: string | null;
        propietario: string | null;
        usuarioId: number;
    }>;
    addLote(campoId: number, dto: CreateLoteDto, req: AuthRequest): Promise<{
        nombre: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        hectareas: number;
        campoId: number;
    }>;
}
export {};
