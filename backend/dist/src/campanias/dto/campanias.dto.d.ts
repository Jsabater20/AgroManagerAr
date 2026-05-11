export declare class CreateCampaniaDto {
    nombre: string;
    fechaInicio: string;
    fechaFin?: string;
    descripcion?: string;
}
declare const UpdateCampaniaDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateCampaniaDto>>;
export declare class UpdateCampaniaDto extends UpdateCampaniaDto_base {
}
export {};
