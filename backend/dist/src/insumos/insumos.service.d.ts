import { PrismaService } from '../prisma/prisma.service';
import { CreateInsumoDto, UpdateInsumoDto } from './dto/insumos.dto';
export declare class InsumosService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        nombre: string;
        createdAt: Date;
        updatedAt: Date;
        descripcion: string | null;
        tipo: import(".prisma/client").$Enums.TipoInsumo;
        unidad: string;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        nombre: string;
        createdAt: Date;
        updatedAt: Date;
        descripcion: string | null;
        tipo: import(".prisma/client").$Enums.TipoInsumo;
        unidad: string;
    }>;
    create(dto: CreateInsumoDto): import(".prisma/client").Prisma.Prisma__InsumoClient<{
        id: number;
        nombre: string;
        createdAt: Date;
        updatedAt: Date;
        descripcion: string | null;
        tipo: import(".prisma/client").$Enums.TipoInsumo;
        unidad: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    update(id: number, dto: UpdateInsumoDto): Promise<{
        id: number;
        nombre: string;
        createdAt: Date;
        updatedAt: Date;
        descripcion: string | null;
        tipo: import(".prisma/client").$Enums.TipoInsumo;
        unidad: string;
    }>;
    remove(id: number): Promise<{
        id: number;
        nombre: string;
        createdAt: Date;
        updatedAt: Date;
        descripcion: string | null;
        tipo: import(".prisma/client").$Enums.TipoInsumo;
        unidad: string;
    }>;
}
