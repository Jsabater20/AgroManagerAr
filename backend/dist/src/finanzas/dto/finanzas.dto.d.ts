export declare enum TipoMovimiento {
    INGRESO = "INGRESO",
    EGRESO = "EGRESO"
}
export declare enum CategoriaMovimiento {
    COSECHA = "COSECHA",
    VENTA_ANIMAL = "VENTA_ANIMAL",
    INSUMO = "INSUMO",
    SERVICIO = "SERVICIO",
    MANTENIMIENTO = "MANTENIMIENTO",
    VETERINARIA = "VETERINARIA",
    COMBUSTIBLE = "COMBUSTIBLE",
    MANO_DE_OBRA = "MANO_DE_OBRA",
    OTRO = "OTRO"
}
export declare class CreateMovimientoDto {
    tipo: TipoMovimiento;
    concepto: string;
    monto: number;
    fecha: string;
    categoria: CategoriaMovimiento;
    campoId?: number;
    siembraId?: number;
    observaciones?: string;
}
declare const UpdateMovimientoDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateMovimientoDto>>;
export declare class UpdateMovimientoDto extends UpdateMovimientoDto_base {
}
export {};
