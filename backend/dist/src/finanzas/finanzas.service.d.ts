import { PrismaService } from '../prisma/prisma.service';
import { CreateMovimientoDto, UpdateMovimientoDto } from './dto/finanzas.dto';
export declare class FinanzasService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(usuarioId: number): import(".prisma/client").Prisma.PrismaPromise<({
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
    findOne(id: number, usuarioId: number): Promise<{
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
    create(usuarioId: number, dto: CreateMovimientoDto): import(".prisma/client").Prisma.Prisma__MovimientoFinancieroClient<{
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
    update(id: number, usuarioId: number, dto: UpdateMovimientoDto): Promise<{
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
    remove(id: number, usuarioId: number): Promise<{
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
    resumen(usuarioId: number): Promise<{
        ingresos: number;
        egresos: number;
        saldo: number;
    }>;
}
