import { TareasService } from './tareas.service';
import { CreateTareaDto, UpdateTareaDto, UpdateTareaEstadoDto } from './dto/tareas.dto';
interface AuthRequest {
    user: {
        id: number;
    };
}
export declare class TareasController {
    private tareasService;
    constructor(tareasService: TareasService);
    findAll(req: AuthRequest): import(".prisma/client").Prisma.PrismaPromise<({
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
        descripcion: string | null;
        observaciones: string | null;
        estado: import(".prisma/client").$Enums.EstadoTarea;
        tipo: import(".prisma/client").$Enums.TipoTarea;
        titulo: string;
        prioridad: import(".prisma/client").$Enums.Prioridad;
        fechaProgramada: Date;
        fechaCompletada: Date | null;
    })[]>;
    findOne(id: number, req: AuthRequest): Promise<{
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
        descripcion: string | null;
        observaciones: string | null;
        estado: import(".prisma/client").$Enums.EstadoTarea;
        tipo: import(".prisma/client").$Enums.TipoTarea;
        titulo: string;
        prioridad: import(".prisma/client").$Enums.Prioridad;
        fechaProgramada: Date;
        fechaCompletada: Date | null;
    }>;
    create(dto: CreateTareaDto, req: AuthRequest): import(".prisma/client").Prisma.Prisma__TareaRuralClient<{
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
        descripcion: string | null;
        observaciones: string | null;
        estado: import(".prisma/client").$Enums.EstadoTarea;
        tipo: import(".prisma/client").$Enums.TipoTarea;
        titulo: string;
        prioridad: import(".prisma/client").$Enums.Prioridad;
        fechaProgramada: Date;
        fechaCompletada: Date | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    update(id: number, dto: UpdateTareaDto, req: AuthRequest): Promise<{
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
        descripcion: string | null;
        observaciones: string | null;
        estado: import(".prisma/client").$Enums.EstadoTarea;
        tipo: import(".prisma/client").$Enums.TipoTarea;
        titulo: string;
        prioridad: import(".prisma/client").$Enums.Prioridad;
        fechaProgramada: Date;
        fechaCompletada: Date | null;
    }>;
    updateEstado(id: number, dto: UpdateTareaEstadoDto, req: AuthRequest): Promise<{
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
        descripcion: string | null;
        observaciones: string | null;
        estado: import(".prisma/client").$Enums.EstadoTarea;
        tipo: import(".prisma/client").$Enums.TipoTarea;
        titulo: string;
        prioridad: import(".prisma/client").$Enums.Prioridad;
        fechaProgramada: Date;
        fechaCompletada: Date | null;
    }>;
    remove(id: number, req: AuthRequest): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        usuarioId: number;
        campoId: number | null;
        descripcion: string | null;
        observaciones: string | null;
        estado: import(".prisma/client").$Enums.EstadoTarea;
        tipo: import(".prisma/client").$Enums.TipoTarea;
        titulo: string;
        prioridad: import(".prisma/client").$Enums.Prioridad;
        fechaProgramada: Date;
        fechaCompletada: Date | null;
    }>;
}
export {};
