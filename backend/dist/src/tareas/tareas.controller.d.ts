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
            nombre: string;
            id: number;
        } | null;
    } & {
        createdAt: Date;
        updatedAt: Date;
        id: number;
        descripcion: string | null;
        tipo: import(".prisma/client").$Enums.TipoTarea;
        usuarioId: number;
        campoId: number | null;
        observaciones: string | null;
        estado: import(".prisma/client").$Enums.EstadoTarea;
        fechaCompletada: Date | null;
        titulo: string;
        prioridad: import(".prisma/client").$Enums.Prioridad;
        fechaProgramada: Date;
    })[]>;
    findOne(id: number, req: AuthRequest): Promise<{
        campo: {
            nombre: string;
            id: number;
        } | null;
    } & {
        createdAt: Date;
        updatedAt: Date;
        id: number;
        descripcion: string | null;
        tipo: import(".prisma/client").$Enums.TipoTarea;
        usuarioId: number;
        campoId: number | null;
        observaciones: string | null;
        estado: import(".prisma/client").$Enums.EstadoTarea;
        fechaCompletada: Date | null;
        titulo: string;
        prioridad: import(".prisma/client").$Enums.Prioridad;
        fechaProgramada: Date;
    }>;
    create(dto: CreateTareaDto, req: AuthRequest): import(".prisma/client").Prisma.Prisma__TareaRuralClient<{
        campo: {
            nombre: string;
            id: number;
        } | null;
    } & {
        createdAt: Date;
        updatedAt: Date;
        id: number;
        descripcion: string | null;
        tipo: import(".prisma/client").$Enums.TipoTarea;
        usuarioId: number;
        campoId: number | null;
        observaciones: string | null;
        estado: import(".prisma/client").$Enums.EstadoTarea;
        fechaCompletada: Date | null;
        titulo: string;
        prioridad: import(".prisma/client").$Enums.Prioridad;
        fechaProgramada: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    update(id: number, dto: UpdateTareaDto, req: AuthRequest): Promise<{
        campo: {
            nombre: string;
            id: number;
        } | null;
    } & {
        createdAt: Date;
        updatedAt: Date;
        id: number;
        descripcion: string | null;
        tipo: import(".prisma/client").$Enums.TipoTarea;
        usuarioId: number;
        campoId: number | null;
        observaciones: string | null;
        estado: import(".prisma/client").$Enums.EstadoTarea;
        fechaCompletada: Date | null;
        titulo: string;
        prioridad: import(".prisma/client").$Enums.Prioridad;
        fechaProgramada: Date;
    }>;
    updateEstado(id: number, dto: UpdateTareaEstadoDto, req: AuthRequest): Promise<{
        campo: {
            nombre: string;
            id: number;
        } | null;
    } & {
        createdAt: Date;
        updatedAt: Date;
        id: number;
        descripcion: string | null;
        tipo: import(".prisma/client").$Enums.TipoTarea;
        usuarioId: number;
        campoId: number | null;
        observaciones: string | null;
        estado: import(".prisma/client").$Enums.EstadoTarea;
        fechaCompletada: Date | null;
        titulo: string;
        prioridad: import(".prisma/client").$Enums.Prioridad;
        fechaProgramada: Date;
    }>;
    remove(id: number, req: AuthRequest): Promise<{
        createdAt: Date;
        updatedAt: Date;
        id: number;
        descripcion: string | null;
        tipo: import(".prisma/client").$Enums.TipoTarea;
        usuarioId: number;
        campoId: number | null;
        observaciones: string | null;
        estado: import(".prisma/client").$Enums.EstadoTarea;
        fechaCompletada: Date | null;
        titulo: string;
        prioridad: import(".prisma/client").$Enums.Prioridad;
        fechaProgramada: Date;
    }>;
}
export {};
