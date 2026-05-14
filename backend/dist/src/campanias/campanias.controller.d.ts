import { CampaniasService } from './campanias.service';
import { CreateCampaniaDto, UpdateCampaniaDto } from './dto/campanias.dto';
type AuthRequest = {
    user: {
        id: number;
    };
};
export declare class CampaniasController {
    private campaniasService;
    constructor(campaniasService: CampaniasService);
    findAll(req: AuthRequest): import(".prisma/client").Prisma.PrismaPromise<({
        siembras: ({
            lote: {
                campo: {
                    nombre: string;
                };
            } & {
                id: number;
                nombre: string;
                createdAt: Date;
                updatedAt: Date;
                hectareas: number;
                campoId: number;
            };
            tipoCultivo: {
                nombre: string;
            };
            cosechas: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                observaciones: string | null;
                siembraId: number;
                fechaCosecha: Date;
                rendimientoKgHa: number;
                totalKg: number;
                humedad: number | null;
            }[];
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
        usuarioId: number;
        descripcion: string | null;
        fechaInicio: Date;
        fechaFin: Date | null;
    })[]>;
    findOne(id: number, req: AuthRequest): Promise<{
        siembras: ({
            lote: {
                campo: {
                    nombre: string;
                };
            } & {
                id: number;
                nombre: string;
                createdAt: Date;
                updatedAt: Date;
                hectareas: number;
                campoId: number;
            };
            tipoCultivo: {
                nombre: string;
            };
            cosechas: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                observaciones: string | null;
                siembraId: number;
                fechaCosecha: Date;
                rendimientoKgHa: number;
                totalKg: number;
                humedad: number | null;
            }[];
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
        usuarioId: number;
        descripcion: string | null;
        fechaInicio: Date;
        fechaFin: Date | null;
    }>;
    create(dto: CreateCampaniaDto, req: AuthRequest): import(".prisma/client").Prisma.Prisma__CampaniaClient<{
        id: number;
        nombre: string;
        createdAt: Date;
        updatedAt: Date;
        usuarioId: number;
        descripcion: string | null;
        fechaInicio: Date;
        fechaFin: Date | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    update(id: number, dto: UpdateCampaniaDto, req: AuthRequest): Promise<{
        id: number;
        nombre: string;
        createdAt: Date;
        updatedAt: Date;
        usuarioId: number;
        descripcion: string | null;
        fechaInicio: Date;
        fechaFin: Date | null;
    }>;
    remove(id: number, req: AuthRequest): Promise<{
        id: number;
        nombre: string;
        createdAt: Date;
        updatedAt: Date;
        usuarioId: number;
        descripcion: string | null;
        fechaInicio: Date;
        fechaFin: Date | null;
    }>;
    asignarSiembras(id: number, siembraIds: number[], req: AuthRequest): Promise<{
        siembras: ({
            lote: {
                campo: {
                    nombre: string;
                };
            } & {
                id: number;
                nombre: string;
                createdAt: Date;
                updatedAt: Date;
                hectareas: number;
                campoId: number;
            };
            tipoCultivo: {
                nombre: string;
            };
            cosechas: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                observaciones: string | null;
                siembraId: number;
                fechaCosecha: Date;
                rendimientoKgHa: number;
                totalKg: number;
                humedad: number | null;
            }[];
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
        usuarioId: number;
        descripcion: string | null;
        fechaInicio: Date;
        fechaFin: Date | null;
    }>;
}
export {};
