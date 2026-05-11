import { CultivosService } from './cultivos.service';
import { CreateTipoCultivoDto, UpdateTipoCultivoDto } from './dto/cultivos.dto';
export declare class CultivosController {
    private cultivosService;
    constructor(cultivosService: CultivosService);
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
