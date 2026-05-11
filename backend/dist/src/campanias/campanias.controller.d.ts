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
            tipoCultivo: {
                nombre: string;
            };
            lote: {
                campo: {
                    nombre: string;
                };
            } & {
                nombre: string;
                createdAt: Date;
                updatedAt: Date;
                id: number;
                hectareas: number;
                campoId: number;
            };
            cosechas: {
                createdAt: Date;
                updatedAt: Date;
                id: number;
                observaciones: string | null;
                fechaCosecha: Date;
                rendimientoKgHa: number;
                totalKg: number;
                humedad: number | null;
                siembraId: number;
            }[];
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
        descripcion: string | null;
        usuarioId: number;
        fechaInicio: Date;
        fechaFin: Date | null;
    })[]>;
    findOne(id: number, req: AuthRequest): Promise<{
        siembras: ({
            tipoCultivo: {
                nombre: string;
            };
            lote: {
                campo: {
                    nombre: string;
                };
            } & {
                nombre: string;
                createdAt: Date;
                updatedAt: Date;
                id: number;
                hectareas: number;
                campoId: number;
            };
            cosechas: {
                createdAt: Date;
                updatedAt: Date;
                id: number;
                observaciones: string | null;
                fechaCosecha: Date;
                rendimientoKgHa: number;
                totalKg: number;
                humedad: number | null;
                siembraId: number;
            }[];
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
        descripcion: string | null;
        usuarioId: number;
        fechaInicio: Date;
        fechaFin: Date | null;
    }>;
    create(dto: CreateCampaniaDto, req: AuthRequest): import(".prisma/client").Prisma.Prisma__CampaniaClient<{
        nombre: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        descripcion: string | null;
        usuarioId: number;
        fechaInicio: Date;
        fechaFin: Date | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    update(id: number, dto: UpdateCampaniaDto, req: AuthRequest): Promise<{
        nombre: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        descripcion: string | null;
        usuarioId: number;
        fechaInicio: Date;
        fechaFin: Date | null;
    }>;
    remove(id: number, req: AuthRequest): Promise<{
        nombre: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        descripcion: string | null;
        usuarioId: number;
        fechaInicio: Date;
        fechaFin: Date | null;
    }>;
    asignarSiembras(id: number, siembraIds: number[], req: AuthRequest): Promise<{
        siembras: ({
            tipoCultivo: {
                nombre: string;
            };
            lote: {
                campo: {
                    nombre: string;
                };
            } & {
                nombre: string;
                createdAt: Date;
                updatedAt: Date;
                id: number;
                hectareas: number;
                campoId: number;
            };
            cosechas: {
                createdAt: Date;
                updatedAt: Date;
                id: number;
                observaciones: string | null;
                fechaCosecha: Date;
                rendimientoKgHa: number;
                totalKg: number;
                humedad: number | null;
                siembraId: number;
            }[];
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
        descripcion: string | null;
        usuarioId: number;
        fechaInicio: Date;
        fechaFin: Date | null;
    }>;
}
export {};
