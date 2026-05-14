import { CultivosService } from './cultivos.service';
import { CreateTipoCultivoDto, UpdateTipoCultivoDto } from './dto/cultivos.dto';
export declare class CultivosController {
    private cultivosService;
    constructor(cultivosService: CultivosService);
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
