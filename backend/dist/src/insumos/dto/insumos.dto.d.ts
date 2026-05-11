declare enum TipoInsumo {
    FERTILIZANTE = "FERTILIZANTE",
    HERBICIDA = "HERBICIDA",
    FUNGICIDA = "FUNGICIDA",
    INSECTICIDA = "INSECTICIDA",
    SEMILLA = "SEMILLA",
    OTRO = "OTRO"
}
export declare class CreateInsumoDto {
    nombre: string;
    tipo: TipoInsumo;
    unidad: string;
    descripcion?: string;
}
export declare class UpdateInsumoDto {
    nombre?: string;
    tipo?: TipoInsumo;
    unidad?: string;
    descripcion?: string;
}
export {};
