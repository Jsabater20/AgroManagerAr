import { PrismaService } from '../prisma/prisma.service';
import { CreateSiembraDto, UpdateSiembraDto, CreateCosechaDto, CreateAplicacionDto } from './dto/siembras.dto';
export declare class SiembrasService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(usuarioId: number): Promise<({
        tipoCultivo: {
            nombre: string;
            createdAt: Date;
            id: number;
            descripcion: string | null;
        };
        lote: {
            campo: {
                nombre: string;
                createdAt: Date;
                updatedAt: Date;
                id: number;
                hectareas: number;
                ubicacion: string | null;
                propietario: string | null;
                usuarioId: number;
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
    })[]>;
    findOne(id: number, usuarioId: number): Promise<{
        tipoCultivo: {
            nombre: string;
            createdAt: Date;
            id: number;
            descripcion: string | null;
        };
        aplicaciones: ({
            insumo: {
                nombre: string;
                createdAt: Date;
                updatedAt: Date;
                id: number;
                descripcion: string | null;
                tipo: import(".prisma/client").$Enums.TipoInsumo;
                unidad: string;
            };
        } & {
            createdAt: Date;
            updatedAt: Date;
            id: number;
            unidad: string;
            observaciones: string | null;
            siembraId: number;
            insumoId: number;
            fecha: Date;
            cantidad: number;
        })[];
        lote: {
            campo: {
                nombre: string;
                createdAt: Date;
                updatedAt: Date;
                id: number;
                hectareas: number;
                ubicacion: string | null;
                propietario: string | null;
                usuarioId: number;
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
    }>;
    create(dto: CreateSiembraDto, usuarioId: number): Promise<{
        tipoCultivo: {
            nombre: string;
            createdAt: Date;
            id: number;
            descripcion: string | null;
        };
        lote: {
            nombre: string;
            createdAt: Date;
            updatedAt: Date;
            id: number;
            hectareas: number;
            campoId: number;
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
    }>;
    update(id: number, dto: UpdateSiembraDto, usuarioId: number): Promise<{
        tipoCultivo: {
            nombre: string;
            createdAt: Date;
            id: number;
            descripcion: string | null;
        };
        lote: {
            nombre: string;
            createdAt: Date;
            updatedAt: Date;
            id: number;
            hectareas: number;
            campoId: number;
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
    }>;
    addCosecha(siembraId: number, dto: CreateCosechaDto, usuarioId: number): Promise<{
        createdAt: Date;
        updatedAt: Date;
        id: number;
        observaciones: string | null;
        fechaCosecha: Date;
        rendimientoKgHa: number;
        totalKg: number;
        humedad: number | null;
        siembraId: number;
    }>;
    addAplicacion(siembraId: number, dto: CreateAplicacionDto, usuarioId: number): Promise<{
        insumo: {
            nombre: string;
            createdAt: Date;
            updatedAt: Date;
            id: number;
            descripcion: string | null;
            tipo: import(".prisma/client").$Enums.TipoInsumo;
            unidad: string;
        };
    } & {
        createdAt: Date;
        updatedAt: Date;
        id: number;
        unidad: string;
        observaciones: string | null;
        siembraId: number;
        insumoId: number;
        fecha: Date;
        cantidad: number;
    }>;
}
