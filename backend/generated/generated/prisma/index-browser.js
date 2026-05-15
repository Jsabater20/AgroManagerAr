
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 5.22.0
 * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
 */
Prisma.prismaVersion = {
  client: "5.22.0",
  engine: "605197351a3c8bdd595af2d2a9bc3025bca48ea2"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.NotFoundError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`NotFoundError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.UsuarioScalarFieldEnum = {
  id: 'id',
  email: 'email',
  nombre: 'nombre',
  password: 'password',
  rol: 'rol',
  plan: 'plan',
  planExpira: 'planExpira',
  mpSuscripcionId: 'mpSuscripcionId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  resetToken: 'resetToken',
  resetTokenExpiry: 'resetTokenExpiry'
};

exports.Prisma.CampoScalarFieldEnum = {
  id: 'id',
  nombre: 'nombre',
  hectareas: 'hectareas',
  ubicacion: 'ubicacion',
  propietario: 'propietario',
  usuarioId: 'usuarioId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.LoteScalarFieldEnum = {
  id: 'id',
  nombre: 'nombre',
  hectareas: 'hectareas',
  campoId: 'campoId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.TipoCultivoScalarFieldEnum = {
  id: 'id',
  nombre: 'nombre',
  descripcion: 'descripcion',
  createdAt: 'createdAt'
};

exports.Prisma.SiembraScalarFieldEnum = {
  id: 'id',
  loteId: 'loteId',
  tipoCultivoId: 'tipoCultivoId',
  fechaSiembra: 'fechaSiembra',
  densidad: 'densidad',
  observaciones: 'observaciones',
  estado: 'estado',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  campaniaId: 'campaniaId'
};

exports.Prisma.CosechaScalarFieldEnum = {
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

exports.Prisma.InsumoScalarFieldEnum = {
  id: 'id',
  nombre: 'nombre',
  tipo: 'tipo',
  unidad: 'unidad',
  descripcion: 'descripcion',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.AplicacionInsumoScalarFieldEnum = {
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

exports.Prisma.AnimalScalarFieldEnum = {
  id: 'id',
  usuarioId: 'usuarioId',
  nombre: 'nombre',
  especie: 'especie',
  sexo: 'sexo',
  categoria: 'categoria',
  peso: 'peso',
  fechaNacimiento: 'fechaNacimiento',
  observaciones: 'observaciones',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.PrenezScalarFieldEnum = {
  id: 'id',
  animalId: 'animalId',
  fechaInicio: 'fechaInicio',
  fechaEstimadaParto: 'fechaEstimadaParto',
  estado: 'estado',
  observaciones: 'observaciones',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.TareaRuralScalarFieldEnum = {
  id: 'id',
  usuarioId: 'usuarioId',
  titulo: 'titulo',
  descripcion: 'descripcion',
  tipo: 'tipo',
  estado: 'estado',
  prioridad: 'prioridad',
  fechaProgramada: 'fechaProgramada',
  fechaCompletada: 'fechaCompletada',
  campoId: 'campoId',
  observaciones: 'observaciones',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.MovimientoFinancieroScalarFieldEnum = {
  id: 'id',
  usuarioId: 'usuarioId',
  tipo: 'tipo',
  concepto: 'concepto',
  monto: 'monto',
  fecha: 'fecha',
  categoria: 'categoria',
  campoId: 'campoId',
  siembraId: 'siembraId',
  observaciones: 'observaciones',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.CampaniaScalarFieldEnum = {
  id: 'id',
  usuarioId: 'usuarioId',
  nombre: 'nombre',
  fechaInicio: 'fechaInicio',
  fechaFin: 'fechaFin',
  descripcion: 'descripcion',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.RegistroPesoScalarFieldEnum = {
  id: 'id',
  animalId: 'animalId',
  peso: 'peso',
  fecha: 'fecha',
  observaciones: 'observaciones',
  createdAt: 'createdAt'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};
exports.Rol = exports.$Enums.Rol = {
  ADMIN: 'ADMIN',
  OPERADOR: 'OPERADOR'
};

exports.PlanTipo = exports.$Enums.PlanTipo = {
  FREE: 'FREE',
  PRO: 'PRO'
};

exports.EstadoSiembra = exports.$Enums.EstadoSiembra = {
  EN_CURSO: 'EN_CURSO',
  COSECHADA: 'COSECHADA',
  PERDIDA: 'PERDIDA'
};

exports.TipoInsumo = exports.$Enums.TipoInsumo = {
  FERTILIZANTE: 'FERTILIZANTE',
  HERBICIDA: 'HERBICIDA',
  FUNGICIDA: 'FUNGICIDA',
  INSECTICIDA: 'INSECTICIDA',
  SEMILLA: 'SEMILLA',
  OTRO: 'OTRO'
};

exports.Especie = exports.$Enums.Especie = {
  BOVINO: 'BOVINO',
  PORCINO: 'PORCINO',
  EQUINO: 'EQUINO',
  OVINO: 'OVINO',
  CAPRINO: 'CAPRINO',
  AVIAR: 'AVIAR'
};

exports.Sexo = exports.$Enums.Sexo = {
  MACHO: 'MACHO',
  HEMBRA: 'HEMBRA'
};

exports.CategoriaAnimal = exports.$Enums.CategoriaAnimal = {
  VACA: 'VACA',
  VAQUILLONA: 'VAQUILLONA',
  TERNERA: 'TERNERA',
  TORO: 'TORO',
  NOVILLO: 'NOVILLO',
  TERNERO: 'TERNERO',
  CERDA: 'CERDA',
  VERRACO: 'VERRACO',
  LECHON: 'LECHON',
  YEGUA: 'YEGUA',
  POTRANCA: 'POTRANCA',
  PADRILLO: 'PADRILLO',
  POTRO: 'POTRO',
  OVEJA: 'OVEJA',
  BORREGA: 'BORREGA',
  CARNERO: 'CARNERO',
  CORDERO: 'CORDERO',
  CABRA: 'CABRA',
  CABRIO: 'CABRIO',
  CABRITO: 'CABRITO',
  GALLINA: 'GALLINA',
  GALLO: 'GALLO',
  POLLO: 'POLLO',
  POLLA: 'POLLA'
};

exports.EstadoPrenez = exports.$Enums.EstadoPrenez = {
  EN_CURSO: 'EN_CURSO',
  COMPLETADA: 'COMPLETADA',
  PERDIDA: 'PERDIDA'
};

exports.TipoTarea = exports.$Enums.TipoTarea = {
  SIEMBRA: 'SIEMBRA',
  COSECHA: 'COSECHA',
  FUMIGACION: 'FUMIGACION',
  FERTILIZACION: 'FERTILIZACION',
  RIEGO: 'RIEGO',
  MANTENIMIENTO: 'MANTENIMIENTO',
  VETERINARIA: 'VETERINARIA',
  OTRO: 'OTRO'
};

exports.EstadoTarea = exports.$Enums.EstadoTarea = {
  PENDIENTE: 'PENDIENTE',
  EN_CURSO: 'EN_CURSO',
  COMPLETADA: 'COMPLETADA',
  CANCELADA: 'CANCELADA'
};

exports.Prioridad = exports.$Enums.Prioridad = {
  BAJA: 'BAJA',
  MEDIA: 'MEDIA',
  ALTA: 'ALTA',
  URGENTE: 'URGENTE'
};

exports.TipoMovimiento = exports.$Enums.TipoMovimiento = {
  INGRESO: 'INGRESO',
  EGRESO: 'EGRESO'
};

exports.CategoriaMovimiento = exports.$Enums.CategoriaMovimiento = {
  COSECHA: 'COSECHA',
  VENTA_ANIMAL: 'VENTA_ANIMAL',
  INSUMO: 'INSUMO',
  SERVICIO: 'SERVICIO',
  MANTENIMIENTO: 'MANTENIMIENTO',
  VETERINARIA: 'VETERINARIA',
  COMBUSTIBLE: 'COMBUSTIBLE',
  MANO_DE_OBRA: 'MANO_DE_OBRA',
  OTRO: 'OTRO'
};

exports.Prisma.ModelName = {
  Usuario: 'Usuario',
  Campo: 'Campo',
  Lote: 'Lote',
  TipoCultivo: 'TipoCultivo',
  Siembra: 'Siembra',
  Cosecha: 'Cosecha',
  Insumo: 'Insumo',
  AplicacionInsumo: 'AplicacionInsumo',
  Animal: 'Animal',
  Prenez: 'Prenez',
  TareaRural: 'TareaRural',
  MovimientoFinanciero: 'MovimientoFinanciero',
  Campania: 'Campania',
  RegistroPeso: 'RegistroPeso'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }
        
        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
