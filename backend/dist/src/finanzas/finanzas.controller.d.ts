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
            nombre: string;
            id: number;
        } | null;
        siembra: {
            id: number;
            tipoCultivo: {
                nombre: string;
            };
        } | null;
    } & {
        createdAt: Date;
        updatedAt: Date;
        id: number;
        tipo: import(".prisma/client").$Enums.TipoMovimiento;
        usuarioId: number;
        campoId: number | null;
        observaciones: string | null;
        siembraId: number | null;
        categoria: import(".prisma/client").$Enums.CategoriaMovimiento;
        fecha: Date;
        concepto: string;
        monto: number;
    })[]>;
    resumen(req: AuthRequest): Promise<{
        ingresos: number;
        egresos: number;
        saldo: number;
    }>;
    findOne(id: number, req: AuthRequest): Promise<{
        createdAt: Date;
        updatedAt: Date;
        id: number;
        tipo: import(".prisma/client").$Enums.TipoMovimiento;
        usuarioId: number;
        campoId: number | null;
        observaciones: string | null;
        siembraId: number | null;
        categoria: import(".prisma/client").$Enums.CategoriaMovimiento;
        fecha: Date;
        concepto: string;
        monto: number;
    }>;
    create(dto: CreateMovimientoDto, req: AuthRequest): import(".prisma/client").Prisma.Prisma__MovimientoFinancieroClient<{
        campo: {
            nombre: string;
            id: number;
        } | null;
    } & {
        createdAt: Date;
        updatedAt: Date;
        id: number;
        tipo: import(".prisma/client").$Enums.TipoMovimiento;
        usuarioId: number;
        campoId: number | null;
        observaciones: string | null;
        siembraId: number | null;
        categoria: import(".prisma/client").$Enums.CategoriaMovimiento;
        fecha: Date;
        concepto: string;
        monto: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    update(id: number, dto: UpdateMovimientoDto, req: AuthRequest): Promise<{
        createdAt: Date;
        updatedAt: Date;
        id: number;
        tipo: import(".prisma/client").$Enums.TipoMovimiento;
        usuarioId: number;
        campoId: number | null;
        observaciones: string | null;
        siembraId: number | null;
        categoria: import(".prisma/client").$Enums.CategoriaMovimiento;
        fecha: Date;
        concepto: string;
        monto: number;
    }>;
    remove(id: number, req: AuthRequest): Promise<{
        createdAt: Date;
        updatedAt: Date;
        id: number;
        tipo: import(".prisma/client").$Enums.TipoMovimiento;
        usuarioId: number;
        campoId: number | null;
        observaciones: string | null;
        siembraId: number | null;
        categoria: import(".prisma/client").$Enums.CategoriaMovimiento;
        fecha: Date;
        concepto: string;
        monto: number;
    }>;
}
export {};
