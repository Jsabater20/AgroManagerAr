import { PrismaService } from '../prisma/prisma.service';
import { CreateInsumoDto, UpdateInsumoDto } from './dto/insumos.dto';
export declare class InsumosService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        nombre: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        descripcion: string | null;
        tipo: import(".prisma/client").$Enums.TipoInsumo;
        unidad: string;
    }[]>;
    findOne(id: number): Promise<{
        nombre: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        descripcion: string | null;
        tipo: import(".prisma/client").$Enums.TipoInsumo;
        unidad: string;
    }>;
    create(dto: CreateInsumoDto): import(".prisma/client").Prisma.Prisma__InsumoClient<{
        nombre: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        descripcion: string | null;
        tipo: import(".prisma/client").$Enums.TipoInsumo;
        unidad: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    update(id: number, dto: UpdateInsumoDto): Promise<{
        nombre: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        descripcion: string | null;
        tipo: import(".prisma/client").$Enums.TipoInsumo;
        unidad: string;
    }>;
    remove(id: number): Promise<{
        nombre: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        descripcion: string | null;
        tipo: import(".prisma/client").$Enums.TipoInsumo;
        unidad: string;
    }>;
}
