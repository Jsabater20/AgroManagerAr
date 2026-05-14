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
    findOne(id: number, req: AuthRequest): Promise<{
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
    create(dto: CreateSiembraDto, req: AuthRequest): Promise<{
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
    update(id: number, dto: UpdateSiembraDto, req: AuthRequest): Promise<{
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
    addCosecha(siembraId: number, dto: CreateCosechaDto, req: AuthRequest): Promise<{
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
    addAplicacion(siembraId: number, dto: CreateAplicacionDto, req: AuthRequest): Promise<{
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
export {};
