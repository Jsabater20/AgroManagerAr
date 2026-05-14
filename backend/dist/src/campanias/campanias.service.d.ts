import { PrismaService } from '../prisma/prisma.service';
import { CreateCampaniaDto, UpdateCampaniaDto } from './dto/campanias.dto';
export declare class CampaniasService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(usuarioId: number): import(".prisma/client").Prisma.PrismaPromise<({
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
    findOne(id: number, usuarioId: number): Promise<{
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
    create(usuarioId: number, dto: CreateCampaniaDto): import(".prisma/client").Prisma.Prisma__CampaniaClient<{
        id: number;
        nombre: string;
        createdAt: Date;
        updatedAt: Date;
        usuarioId: number;
        descripcion: string | null;
        fechaInicio: Date;
        fechaFin: Date | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    update(id: number, usuarioId: number, dto: UpdateCampaniaDto): Promise<{
        id: number;
        nombre: string;
        createdAt: Date;
        updatedAt: Date;
        usuarioId: number;
        descripcion: string | null;
        fechaInicio: Date;
        fechaFin: Date | null;
    }>;
    remove(id: number, usuarioId: number): Promise<{
        id: number;
        nombre: string;
        createdAt: Date;
        updatedAt: Date;
        usuarioId: number;
        descripcion: string | null;
        fechaInicio: Date;
        fechaFin: Date | null;
    }>;
    asignarSiembras(id: number, usuarioId: number, siembraIds: number[]): Promise<{
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
