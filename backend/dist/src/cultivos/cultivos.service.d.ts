import { PrismaService } from '../prisma/prisma.service';
import { CreateTipoCultivoDto, UpdateTipoCultivoDto } from './dto/cultivos.dto';
export declare class CultivosService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        nombre: string;
        createdAt: Date;
        id: number;
        descripcion: string | null;
    }[]>;
    findOne(id: number): Promise<{
        nombre: string;
        createdAt: Date;
        id: number;
        descripcion: string | null;
    }>;
    create(dto: CreateTipoCultivoDto): Promise<{
        nombre: string;
        createdAt: Date;
        id: number;
        descripcion: string | null;
    }>;
    update(id: number, dto: UpdateTipoCultivoDto): Promise<{
        nombre: string;
        createdAt: Date;
        id: number;
        descripcion: string | null;
    }>;
    remove(id: number): Promise<{
        nombre: string;
        createdAt: Date;
        id: number;
        descripcion: string | null;
    }>;
}
