export declare const Rol: {
    readonly ADMIN: "ADMIN";
    readonly OPERADOR: "OPERADOR";
};
export type Rol = (typeof Rol)[keyof typeof Rol];
export declare const EstadoSiembra: {
    readonly EN_CURSO: "EN_CURSO";
    readonly COSECHADA: "COSECHADA";
    readonly PERDIDA: "PERDIDA";
};
export type EstadoSiembra = (typeof EstadoSiembra)[keyof typeof EstadoSiembra];
export declare const TipoInsumo: {
    readonly FERTILIZANTE: "FERTILIZANTE";
    readonly HERBICIDA: "HERBICIDA";
    readonly FUNGICIDA: "FUNGICIDA";
    readonly INSECTICIDA: "INSECTICIDA";
    readonly SEMILLA: "SEMILLA";
    readonly OTRO: "OTRO";
};
export type TipoInsumo = (typeof TipoInsumo)[keyof typeof TipoInsumo];
