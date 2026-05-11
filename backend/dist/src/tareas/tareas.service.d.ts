import { PrismaService } from '../prisma/prisma.service';
import { CreateTareaDto, UpdateTareaDto, UpdateTareaEstadoDto } from './dto/tareas.dto';
export declare class TareasService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(usuarioId: number): import(".prisma/client").Prisma.PrismaPromise<({
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
    findOne(id: number, usuarioId: number): Promise<{
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
    create(dto: CreateTareaDto, usuarioId: number): import(".prisma/client").Prisma.Prisma__TareaRuralClient<{
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
    update(id: number, dto: UpdateTareaDto, usuarioId: number): Promise<{
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
    updateEstado(id: number, dto: UpdateTareaEstadoDto, usuarioId: number): Promise<{
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
    remove(id: number, usuarioId: number): Promise<{
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
