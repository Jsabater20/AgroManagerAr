import { PrismaService } from '../prisma/prisma.service';
import { CreateTareaDto, UpdateTareaDto, UpdateTareaEstadoDto } from './dto/tareas.dto';
export declare class TareasService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(usuarioId: number): import(".prisma/client").Prisma.PrismaPromise<({
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
    findOne(id: number, usuarioId: number): Promise<{
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
    create(dto: CreateTareaDto, usuarioId: number): import(".prisma/client").Prisma.Prisma__TareaRuralClient<{
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
    update(id: number, dto: UpdateTareaDto, usuarioId: number): Promise<{
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
    updateEstado(id: number, dto: UpdateTareaEstadoDto, usuarioId: number): Promise<{
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
    remove(id: number, usuarioId: number): Promise<{
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
