import { PrismaService } from '../prisma/prisma.service';
import { CreateCampaniaDto, UpdateCampaniaDto } from './dto/campanias.dto';
export declare class CampaniasService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(usuarioId: number): import(".prisma/client").Prisma.PrismaPromise<({
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
    findOne(id: number, usuarioId: number): Promise<{
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
    create(usuarioId: number, dto: CreateCampaniaDto): import(".prisma/client").Prisma.Prisma__CampaniaClient<{
        nombre: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        descripcion: string | null;
        usuarioId: number;
        fechaInicio: Date;
        fechaFin: Date | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    update(id: number, usuarioId: number, dto: UpdateCampaniaDto): Promise<{
        nombre: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        descripcion: string | null;
        usuarioId: number;
        fechaInicio: Date;
        fechaFin: Date | null;
    }>;
    remove(id: number, usuarioId: number): Promise<{
        nombre: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        descripcion: string | null;
        usuarioId: number;
        fechaInicio: Date;
        fechaFin: Date | null;
    }>;
    asignarSiembras(id: number, usuarioId: number, siembraIds: number[]): Promise<{
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
