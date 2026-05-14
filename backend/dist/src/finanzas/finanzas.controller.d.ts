import { FinanzasService } from './finanzas.service';
import { CreateMovimientoDto, UpdateMovimientoDto } from './dto/finanzas.dto';
type AuthRequest = {
    user: {
        id: number;
    };
};
export declare class FinanzasController {
    private finanzasService;
    constructor(finanzasService: FinanzasService);
    findAll(req: AuthRequest): import(".prisma/client").Prisma.PrismaPromise<({
        campo: {
            id: number;
            nombre: string;
        } | null;
        siembra: {
            id: number;
            tipoCultivo: {
                nombre: string;
            };
        } | null;
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        usuarioId: number;
        campoId: number | null;
        observaciones: string | null;
        siembraId: number | null;
        tipo: import(".prisma/client").$Enums.TipoMovimiento;
        fecha: Date;
        categoria: import(".prisma/client").$Enums.CategoriaMovimiento;
        concepto: string;
        monto: number;
    })[]>;
    resumen(req: AuthRequest): Promise<{
        ingresos: number;
        egresos: number;
        saldo: number;
    }>;
    findOne(id: number, req: AuthRequest): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        usuarioId: number;
        campoId: number | null;
        observaciones: string | null;
        siembraId: number | null;
        tipo: import(".prisma/client").$Enums.TipoMovimiento;
        fecha: Date;
        categoria: import(".prisma/client").$Enums.CategoriaMovimiento;
        concepto: string;
        monto: number;
    }>;
    create(dto: CreateMovimientoDto, req: AuthRequest): import(".prisma/client").Prisma.Prisma__MovimientoFinancieroClient<{
        campo: {
            id: number;
            nombre: string;
        } | null;
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        usuarioId: number;
        campoId: number | null;
        observaciones: string | null;
        siembraId: number | null;
        tipo: import(".prisma/client").$Enums.TipoMovimiento;
        fecha: Date;
        categoria: import(".prisma/client").$Enums.CategoriaMovimiento;
        concepto: string;
        monto: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    update(id: number, dto: UpdateMovimientoDto, req: AuthRequest): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        usuarioId: number;
        campoId: number | null;
        observaciones: string | null;
        siembraId: number | null;
        tipo: import(".prisma/client").$Enums.TipoMovimiento;
        fecha: Date;
        categoria: import(".prisma/client").$Enums.CategoriaMovimiento;
        concepto: string;
        monto: number;
    }>;
    remove(id: number, req: AuthRequest): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        usuarioId: number;
        campoId: number | null;
        observaciones: string | null;
        siembraId: number | null;
        tipo: import(".prisma/client").$Enums.TipoMovimiento;
        fecha: Date;
        categoria: import(".prisma/client").$Enums.CategoriaMovimiento;
        concepto: string;
        monto: number;
    }>;
}
export {};
