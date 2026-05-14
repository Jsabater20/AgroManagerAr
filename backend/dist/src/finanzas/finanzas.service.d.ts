import { PrismaService } from '../prisma/prisma.service';
import { CreateMovimientoDto, UpdateMovimientoDto } from './dto/finanzas.dto';
export declare class FinanzasService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(usuarioId: number): import(".prisma/client").Prisma.PrismaPromise<({
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
    findOne(id: number, usuarioId: number): Promise<{
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
    create(usuarioId: number, dto: CreateMovimientoDto): import(".prisma/client").Prisma.Prisma__MovimientoFinancieroClient<{
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
    update(id: number, usuarioId: number, dto: UpdateMovimientoDto): Promise<{
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
    remove(id: number, usuarioId: number): Promise<{
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
    resumen(usuarioId: number): Promise<{
        ingresos: number;
        egresos: number;
        saldo: number;
    }>;
}
