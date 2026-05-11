import { SiembrasService } from './siembras.service';
import { CreateSiembraDto, UpdateSiembraDto, CreateCosechaDto, CreateAplicacionDto } from './dto/siembras.dto';
interface AuthRequest {
    user: {
        id: number;
    };
}
export declare class SiembrasController {
    private siembrasService;
    constructor(siembrasService: SiembrasService);
    findAll(req: AuthRequest): Promise<({
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
    findOne(id: number, req: AuthRequest): Promise<{
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
    create(dto: CreateSiembraDto, req: AuthRequest): Promise<{
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
    update(id: number, dto: UpdateSiembraDto, req: AuthRequest): Promise<{
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
    addCosecha(siembraId: number, dto: CreateCosechaDto, req: AuthRequest): Promise<{
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
    addAplicacion(siembraId: number, dto: CreateAplicacionDto, req: AuthRequest): Promise<{
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
export {};
