import { PrismaService } from '../prisma/prisma.service';
import { CreateTipoCultivoDto, UpdateTipoCultivoDto } from './dto/cultivos.dto';
export declare class CultivosService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        nombre: string;
        createdAt: Date;
        descripcion: string | null;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        nombre: string;
        createdAt: Date;
        descripcion: string | null;
    }>;
    create(dto: CreateTipoCultivoDto): Promise<{
        id: number;
        nombre: string;
        createdAt: Date;
        descripcion: string | null;
    }>;
    update(id: number, dto: UpdateTipoCultivoDto): Promise<{
        id: number;
        nombre: string;
        createdAt: Date;
        descripcion: string | null;
    }>;
    remove(id: number): Promise<{
        id: number;
        nombre: string;
        createdAt: Date;
        descripcion: string | null;
    }>;
}
