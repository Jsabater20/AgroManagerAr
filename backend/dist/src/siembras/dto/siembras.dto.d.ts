declare enum EstadoSiembra {
    EN_CURSO = "EN_CURSO",
    COSECHADA = "COSECHADA",
    PERDIDA = "PERDIDA"
}
export declare class CreateSiembraDto {
    loteId: number;
    tipoCultivoId: number;
    fechaSiembra: string;
    densidad?: number;
    observaciones?: string;
}
export declare class UpdateSiembraDto {
    fechaSiembra?: string;
    densidad?: number;
    observaciones?: string;
    estado?: EstadoSiembra;
}
export declare class CreateCosechaDto {
    fechaCosecha: string;
    rendimientoKgHa: number;
    totalKg: number;
    humedad?: number;
    observaciones?: string;
}
export declare class CreateAplicacionDto {
    insumoId: number;
    fecha: string;
    cantidad: number;
    unidad: string;
    observaciones?: string;
}
export {};
