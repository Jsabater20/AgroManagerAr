"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.NullsOrder = exports.QueryMode = exports.SortOrder = exports.AplicacionInsumoScalarFieldEnum = exports.InsumoScalarFieldEnum = exports.CosechaScalarFieldEnum = exports.SiembraScalarFieldEnum = exports.TipoCultivoScalarFieldEnum = exports.LoteScalarFieldEnum = exports.CampoScalarFieldEnum = exports.UsuarioScalarFieldEnum = exports.TransactionIsolationLevel = exports.ModelName = exports.AnyNull = exports.JsonNull = exports.DbNull = exports.NullTypes = exports.Decimal = void 0;
const runtime = __importStar(require("@prisma/client/runtime/index-browser"));
exports.Decimal = runtime.Decimal;
exports.NullTypes = {
    DbNull: runtime.NullTypes.DbNull,
    JsonNull: runtime.NullTypes.JsonNull,
    AnyNull: runtime.NullTypes.AnyNull,
};
exports.DbNull = runtime.DbNull;
exports.JsonNull = runtime.JsonNull;
exports.AnyNull = runtime.AnyNull;
exports.ModelName = {
    Usuario: 'Usuario',
    Campo: 'Campo',
    Lote: 'Lote',
    TipoCultivo: 'TipoCultivo',
    Siembra: 'Siembra',
    Cosecha: 'Cosecha',
    Insumo: 'Insumo',
    AplicacionInsumo: 'AplicacionInsumo'
};
exports.TransactionIsolationLevel = runtime.makeStrictEnum({
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
});
exports.UsuarioScalarFieldEnum = {
    id: 'id',
    email: 'email',
    nombre: 'nombre',
    password: 'password',
    rol: 'rol',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.CampoScalarFieldEnum = {
    id: 'id',
    nombre: 'nombre',
    hectareas: 'hectareas',
    ubicacion: 'ubicacion',
    propietario: 'propietario',
    usuarioId: 'usuarioId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.LoteScalarFieldEnum = {
    id: 'id',
    nombre: 'nombre',
    hectareas: 'hectareas',
    campoId: 'campoId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.TipoCultivoScalarFieldEnum = {
    id: 'id',
    nombre: 'nombre',
    descripcion: 'descripcion',
    createdAt: 'createdAt'
};
exports.SiembraScalarFieldEnum = {
    id: 'id',
    loteId: 'loteId',
    tipoCultivoId: 'tipoCultivoId',
    fechaSiembra: 'fechaSiembra',
    densidad: 'densidad',
    observaciones: 'observaciones',
    estado: 'estado',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.CosechaScalarFieldEnum = {
    id: 'id',
    siembraId: 'siembraId',
    fechaCosecha: 'fechaCosecha',
    rendimientoKgHa: 'rendimientoKgHa',
    totalKg: 'totalKg',
    humedad: 'humedad',
    observaciones: 'observaciones',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.InsumoScalarFieldEnum = {
    id: 'id',
    nombre: 'nombre',
    tipo: 'tipo',
    unidad: 'unidad',
    descripcion: 'descripcion',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.AplicacionInsumoScalarFieldEnum = {
    id: 'id',
    siembraId: 'siembraId',
    insumoId: 'insumoId',
    fecha: 'fecha',
    cantidad: 'cantidad',
    unidad: 'unidad',
    observaciones: 'observaciones',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.SortOrder = {
    asc: 'asc',
    desc: 'desc'
};
exports.QueryMode = {
    default: 'default',
    insensitive: 'insensitive'
};
exports.NullsOrder = {
    first: 'first',
    last: 'last'
};
//# sourceMappingURL=prismaNamespaceBrowser.js.map