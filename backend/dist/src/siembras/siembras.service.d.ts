import { PrismaService } from '../prisma/prisma.service';
import { PlanService } from '../plan/plan.service';
import { CreateSiembraDto, UpdateSiembraDto, CreateCosechaDto, CreateAplicacionDto } from './dto/siembras.dto';
export declare class SiembrasService {
    private prisma;
    private planService;
    constructor(prisma: PrismaService, planService: PlanService);
    findAll(usuarioId: number): Promise<({
        lote: {
            campo: {
                id: number;
                nombre: string;
                createdAt: Date;
                updatedAt: Date;
                hectareas: number;
                ubicacion: string | null;
                propietario: string | null;
                usuarioId: number;
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
            id: number;
            nombre: string;
            createdAt: Date;
            descripcion: string | null;
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
    })[]>;
    findOne(id: number, usuarioId: number): Promise<{
        lote: {
            campo: {
                id: number;
                nombre: string;
                createdAt: Date;
                updatedAt: Date;
                hectareas: number;
                ubicacion: string | null;
                propietario: string | null;
                usuarioId: number;
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
            id: number;
            nombre: string;
            createdAt: Date;
            descripcion: string | null;
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
        aplicaciones: ({
            insumo: {
                id: number;
                nombre: string;
                createdAt: Date;
                updatedAt: Date;
                descripcion: string | null;
                tipo: import(".prisma/client").$Enums.TipoInsumo;
                unidad: string;
            };
        } & {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            observaciones: string | null;
            siembraId: number;
            unidad: string;
            insumoId: number;
            fecha: Date;
            cantidad: number;
        })[];
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
    }>;
    create(dto: CreateSiembraDto, usuarioId: number): Promise<{
        lote: {
            id: number;
            nombre: string;
            createdAt: Date;
            updatedAt: Date;
            hectareas: number;
            campoId: number;
        };
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
    }>;
    update(id: number, dto: UpdateSiembraDto, usuarioId: number): Promise<{
        lote: {
            id: number;
            nombre: string;
            createdAt: Date;
            updatedAt: Date;
            hectareas: number;
            campoId: number;
        };
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
    }>;
    addCosecha(siembraId: number, dto: CreateCosechaDto, usuarioId: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        observaciones: string | null;
        siembraId: number;
        fechaCosecha: Date;
        rendimientoKgHa: number;
        totalKg: number;
        humedad: number | null;
    }>;
    addAplicacion(siembraId: number, dto: CreateAplicacionDto, usuarioId: number): Promise<{
        insumo: {
            id: number;
            nombre: string;
            createdAt: Date;
            updatedAt: Date;
            descripcion: string | null;
            tipo: import(".prisma/client").$Enums.TipoInsumo;
            unidad: string;
        };
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        observaciones: string | null;
        siembraId: number;
        unidad: string;
        insumoId: number;
        fecha: Date;
        cantidad: number;
    }>;
}
