declare enum Especie {
    BOVINO = "BOVINO",
    PORCINO = "PORCINO",
    EQUINO = "EQUINO",
    OVINO = "OVINO",
    CAPRINO = "CAPRINO",
    AVIAR = "AVIAR"
}
declare enum Sexo {
    MACHO = "MACHO",
    HEMBRA = "HEMBRA"
}
declare enum CategoriaAnimal {
    VACA = "VACA",
    VAQUILLONA = "VAQUILLONA",
    TERNERA = "TERNERA",
    TORO = "TORO",
    NOVILLO = "NOVILLO",
    TERNERO = "TERNERO",
    CERDA = "CERDA",
    VERRACO = "VERRACO",
    LECHON = "LECHON",
    YEGUA = "YEGUA",
    POTRANCA = "POTRANCA",
    PADRILLO = "PADRILLO",
    POTRO = "POTRO",
    OVEJA = "OVEJA",
    BORREGA = "BORREGA",
    CARNERO = "CARNERO",
    CORDERO = "CORDERO",
    CABRA = "CABRA",
    CABRIO = "CABRIO",
    CABRITO = "CABRITO",
    GALLINA = "GALLINA",
    GALLO = "GALLO",
    POLLO = "POLLO",
    POLLA = "POLLA"
}
declare enum EstadoPrenez {
    EN_CURSO = "EN_CURSO",
    COMPLETADA = "COMPLETADA",
    PERDIDA = "PERDIDA"
}
export declare class CreateAnimalDto {
    nombre: string;
    especie: Especie;
    sexo: Sexo;
    categoria: CategoriaAnimal;
    peso?: number;
    fechaNacimiento?: string;
    observaciones?: string;
}
export declare class UpdateAnimalDto {
    nombre?: string;
    categoria?: CategoriaAnimal;
    peso?: number;
    fechaNacimiento?: string;
    observaciones?: string;
}
export declare class CreatePrenezDto {
    fechaInicio: string;
    observaciones?: string;
}
export declare class UpdatePrenezEstadoDto {
    estado: EstadoPrenez;
}
export declare class CreateRegistroPesoDto {
    peso: number;
    fecha: string;
    observaciones?: string;
}
export {};
