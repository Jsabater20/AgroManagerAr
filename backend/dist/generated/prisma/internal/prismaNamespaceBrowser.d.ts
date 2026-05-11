import * as runtime from "@prisma/client/runtime/index-browser";
export type * from '../models.js';
export type * from './prismaNamespace.js';
export declare const Decimal: any;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.AnyNull);
};
export declare const DbNull: any;
export declare const JsonNull: any;
export declare const AnyNull: any;
export declare const ModelName: {
    readonly Usuario: "Usuario";
    readonly Campo: "Campo";
    readonly Lote: "Lote";
    readonly TipoCultivo: "TipoCultivo";
    readonly Siembra: "Siembra";
    readonly Cosecha: "Cosecha";
    readonly Insumo: "Insumo";
    readonly AplicacionInsumo: "AplicacionInsumo";
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export declare const TransactionIsolationLevel: any;
export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
export declare const UsuarioScalarFieldEnum: {
    readonly id: "id";
    readonly email: "email";
    readonly nombre: "nombre";
    readonly password: "password";
    readonly rol: "rol";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type UsuarioScalarFieldEnum = (typeof UsuarioScalarFieldEnum)[keyof typeof UsuarioScalarFieldEnum];
export declare const CampoScalarFieldEnum: {
    readonly id: "id";
    readonly nombre: "nombre";
    readonly hectareas: "hectareas";
    readonly ubicacion: "ubicacion";
    readonly propietario: "propietario";
    readonly usuarioId: "usuarioId";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type CampoScalarFieldEnum = (typeof CampoScalarFieldEnum)[keyof typeof CampoScalarFieldEnum];
export declare const LoteScalarFieldEnum: {
    readonly id: "id";
    readonly nombre: "nombre";
    readonly hectareas: "hectareas";
    readonly campoId: "campoId";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type LoteScalarFieldEnum = (typeof LoteScalarFieldEnum)[keyof typeof LoteScalarFieldEnum];
export declare const TipoCultivoScalarFieldEnum: {
    readonly id: "id";
    readonly nombre: "nombre";
    readonly descripcion: "descripcion";
    readonly createdAt: "createdAt";
};
export type TipoCultivoScalarFieldEnum = (typeof TipoCultivoScalarFieldEnum)[keyof typeof TipoCultivoScalarFieldEnum];
export declare const SiembraScalarFieldEnum: {
    readonly id: "id";
    readonly loteId: "loteId";
    readonly tipoCultivoId: "tipoCultivoId";
    readonly fechaSiembra: "fechaSiembra";
    readonly densidad: "densidad";
    readonly observaciones: "observaciones";
    readonly estado: "estado";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type SiembraScalarFieldEnum = (typeof SiembraScalarFieldEnum)[keyof typeof SiembraScalarFieldEnum];
export declare const CosechaScalarFieldEnum: {
    readonly id: "id";
    readonly siembraId: "siembraId";
    readonly fechaCosecha: "fechaCosecha";
    readonly rendimientoKgHa: "rendimientoKgHa";
    readonly totalKg: "totalKg";
    readonly humedad: "humedad";
    readonly observaciones: "observaciones";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type CosechaScalarFieldEnum = (typeof CosechaScalarFieldEnum)[keyof typeof CosechaScalarFieldEnum];
export declare const InsumoScalarFieldEnum: {
    readonly id: "id";
    readonly nombre: "nombre";
    readonly tipo: "tipo";
    readonly unidad: "unidad";
    readonly descripcion: "descripcion";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type InsumoScalarFieldEnum = (typeof InsumoScalarFieldEnum)[keyof typeof InsumoScalarFieldEnum];
export declare const AplicacionInsumoScalarFieldEnum: {
    readonly id: "id";
    readonly siembraId: "siembraId";
    readonly insumoId: "insumoId";
    readonly fecha: "fecha";
    readonly cantidad: "cantidad";
    readonly unidad: "unidad";
    readonly observaciones: "observaciones";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type AplicacionInsumoScalarFieldEnum = (typeof AplicacionInsumoScalarFieldEnum)[keyof typeof AplicacionInsumoScalarFieldEnum];
export declare const SortOrder: {
    readonly asc: "asc";
    readonly desc: "desc";
};
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
export declare const QueryMode: {
    readonly default: "default";
    readonly insensitive: "insensitive";
};
export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];
export declare const NullsOrder: {
    readonly first: "first";
    readonly last: "last";
};
export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];
