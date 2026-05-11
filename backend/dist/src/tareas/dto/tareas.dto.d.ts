declare enum TipoTarea {
    SIEMBRA = "SIEMBRA",
    COSECHA = "COSECHA",
    FUMIGACION = "FUMIGACION",
    FERTILIZACION = "FERTILIZACION",
    RIEGO = "RIEGO",
    MANTENIMIENTO = "MANTENIMIENTO",
    VETERINARIA = "VETERINARIA",
    OTRO = "OTRO"
}
declare enum EstadoTarea {
    PENDIENTE = "PENDIENTE",
    EN_CURSO = "EN_CURSO",
    COMPLETADA = "COMPLETADA",
    CANCELADA = "CANCELADA"
}
declare enum Prioridad {
    BAJA = "BAJA",
    MEDIA = "MEDIA",
    ALTA = "ALTA",
    URGENTE = "URGENTE"
}
export declare class CreateTareaDto {
    titulo: string;
    descripcion?: string;
    tipo: TipoTarea;
    prioridad?: Prioridad;
    fechaProgramada: string;
    campoId?: number;
    observaciones?: string;
}
export declare class UpdateTareaDto {
    titulo?: string;
    descripcion?: string;
    tipo?: TipoTarea;
    prioridad?: Prioridad;
    fechaProgramada?: string;
    campoId?: number;
    observaciones?: string;
}
export declare class UpdateTareaEstadoDto {
    estado: EstadoTarea;
}
export {};
