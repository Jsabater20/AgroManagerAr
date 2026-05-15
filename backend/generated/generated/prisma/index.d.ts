
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Usuario
 * 
 */
export type Usuario = $Result.DefaultSelection<Prisma.$UsuarioPayload>
/**
 * Model Campo
 * 
 */
export type Campo = $Result.DefaultSelection<Prisma.$CampoPayload>
/**
 * Model Lote
 * 
 */
export type Lote = $Result.DefaultSelection<Prisma.$LotePayload>
/**
 * Model TipoCultivo
 * 
 */
export type TipoCultivo = $Result.DefaultSelection<Prisma.$TipoCultivoPayload>
/**
 * Model Siembra
 * 
 */
export type Siembra = $Result.DefaultSelection<Prisma.$SiembraPayload>
/**
 * Model Cosecha
 * 
 */
export type Cosecha = $Result.DefaultSelection<Prisma.$CosechaPayload>
/**
 * Model Insumo
 * 
 */
export type Insumo = $Result.DefaultSelection<Prisma.$InsumoPayload>
/**
 * Model AplicacionInsumo
 * 
 */
export type AplicacionInsumo = $Result.DefaultSelection<Prisma.$AplicacionInsumoPayload>
/**
 * Model Animal
 * 
 */
export type Animal = $Result.DefaultSelection<Prisma.$AnimalPayload>
/**
 * Model Prenez
 * 
 */
export type Prenez = $Result.DefaultSelection<Prisma.$PrenezPayload>
/**
 * Model TareaRural
 * 
 */
export type TareaRural = $Result.DefaultSelection<Prisma.$TareaRuralPayload>
/**
 * Model MovimientoFinanciero
 * 
 */
export type MovimientoFinanciero = $Result.DefaultSelection<Prisma.$MovimientoFinancieroPayload>
/**
 * Model Campania
 * 
 */
export type Campania = $Result.DefaultSelection<Prisma.$CampaniaPayload>
/**
 * Model RegistroPeso
 * 
 */
export type RegistroPeso = $Result.DefaultSelection<Prisma.$RegistroPesoPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Rol: {
  ADMIN: 'ADMIN',
  OPERADOR: 'OPERADOR'
};

export type Rol = (typeof Rol)[keyof typeof Rol]


export const PlanTipo: {
  FREE: 'FREE',
  PRO: 'PRO'
};

export type PlanTipo = (typeof PlanTipo)[keyof typeof PlanTipo]


export const EstadoSiembra: {
  EN_CURSO: 'EN_CURSO',
  COSECHADA: 'COSECHADA',
  PERDIDA: 'PERDIDA'
};

export type EstadoSiembra = (typeof EstadoSiembra)[keyof typeof EstadoSiembra]


export const TipoInsumo: {
  FERTILIZANTE: 'FERTILIZANTE',
  HERBICIDA: 'HERBICIDA',
  FUNGICIDA: 'FUNGICIDA',
  INSECTICIDA: 'INSECTICIDA',
  SEMILLA: 'SEMILLA',
  OTRO: 'OTRO'
};

export type TipoInsumo = (typeof TipoInsumo)[keyof typeof TipoInsumo]


export const Especie: {
  BOVINO: 'BOVINO',
  PORCINO: 'PORCINO',
  EQUINO: 'EQUINO',
  OVINO: 'OVINO',
  CAPRINO: 'CAPRINO',
  AVIAR: 'AVIAR'
};

export type Especie = (typeof Especie)[keyof typeof Especie]


export const Sexo: {
  MACHO: 'MACHO',
  HEMBRA: 'HEMBRA'
};

export type Sexo = (typeof Sexo)[keyof typeof Sexo]


export const CategoriaAnimal: {
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

export type CategoriaAnimal = (typeof CategoriaAnimal)[keyof typeof CategoriaAnimal]


export const EstadoPrenez: {
  EN_CURSO: 'EN_CURSO',
  COMPLETADA: 'COMPLETADA',
  PERDIDA: 'PERDIDA'
};

export type EstadoPrenez = (typeof EstadoPrenez)[keyof typeof EstadoPrenez]


export const TipoTarea: {
  SIEMBRA: 'SIEMBRA',
  COSECHA: 'COSECHA',
  FUMIGACION: 'FUMIGACION',
  FERTILIZACION: 'FERTILIZACION',
  RIEGO: 'RIEGO',
  MANTENIMIENTO: 'MANTENIMIENTO',
  VETERINARIA: 'VETERINARIA',
  OTRO: 'OTRO'
};

export type TipoTarea = (typeof TipoTarea)[keyof typeof TipoTarea]


export const EstadoTarea: {
  PENDIENTE: 'PENDIENTE',
  EN_CURSO: 'EN_CURSO',
  COMPLETADA: 'COMPLETADA',
  CANCELADA: 'CANCELADA'
};

export type EstadoTarea = (typeof EstadoTarea)[keyof typeof EstadoTarea]


export const Prioridad: {
  BAJA: 'BAJA',
  MEDIA: 'MEDIA',
  ALTA: 'ALTA',
  URGENTE: 'URGENTE'
};

export type Prioridad = (typeof Prioridad)[keyof typeof Prioridad]


export const TipoMovimiento: {
  INGRESO: 'INGRESO',
  EGRESO: 'EGRESO'
};

export type TipoMovimiento = (typeof TipoMovimiento)[keyof typeof TipoMovimiento]


export const CategoriaMovimiento: {
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

export type CategoriaMovimiento = (typeof CategoriaMovimiento)[keyof typeof CategoriaMovimiento]

}

export type Rol = $Enums.Rol

export const Rol: typeof $Enums.Rol

export type PlanTipo = $Enums.PlanTipo

export const PlanTipo: typeof $Enums.PlanTipo

export type EstadoSiembra = $Enums.EstadoSiembra

export const EstadoSiembra: typeof $Enums.EstadoSiembra

export type TipoInsumo = $Enums.TipoInsumo

export const TipoInsumo: typeof $Enums.TipoInsumo

export type Especie = $Enums.Especie

export const Especie: typeof $Enums.Especie

export type Sexo = $Enums.Sexo

export const Sexo: typeof $Enums.Sexo

export type CategoriaAnimal = $Enums.CategoriaAnimal

export const CategoriaAnimal: typeof $Enums.CategoriaAnimal

export type EstadoPrenez = $Enums.EstadoPrenez

export const EstadoPrenez: typeof $Enums.EstadoPrenez

export type TipoTarea = $Enums.TipoTarea

export const TipoTarea: typeof $Enums.TipoTarea

export type EstadoTarea = $Enums.EstadoTarea

export const EstadoTarea: typeof $Enums.EstadoTarea

export type Prioridad = $Enums.Prioridad

export const Prioridad: typeof $Enums.Prioridad

export type TipoMovimiento = $Enums.TipoMovimiento

export const TipoMovimiento: typeof $Enums.TipoMovimiento

export type CategoriaMovimiento = $Enums.CategoriaMovimiento

export const CategoriaMovimiento: typeof $Enums.CategoriaMovimiento

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Usuarios
 * const usuarios = await prisma.usuario.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Usuarios
   * const usuarios = await prisma.usuario.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.usuario`: Exposes CRUD operations for the **Usuario** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Usuarios
    * const usuarios = await prisma.usuario.findMany()
    * ```
    */
  get usuario(): Prisma.UsuarioDelegate<ExtArgs>;

  /**
   * `prisma.campo`: Exposes CRUD operations for the **Campo** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Campos
    * const campos = await prisma.campo.findMany()
    * ```
    */
  get campo(): Prisma.CampoDelegate<ExtArgs>;

  /**
   * `prisma.lote`: Exposes CRUD operations for the **Lote** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Lotes
    * const lotes = await prisma.lote.findMany()
    * ```
    */
  get lote(): Prisma.LoteDelegate<ExtArgs>;

  /**
   * `prisma.tipoCultivo`: Exposes CRUD operations for the **TipoCultivo** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TipoCultivos
    * const tipoCultivos = await prisma.tipoCultivo.findMany()
    * ```
    */
  get tipoCultivo(): Prisma.TipoCultivoDelegate<ExtArgs>;

  /**
   * `prisma.siembra`: Exposes CRUD operations for the **Siembra** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Siembras
    * const siembras = await prisma.siembra.findMany()
    * ```
    */
  get siembra(): Prisma.SiembraDelegate<ExtArgs>;

  /**
   * `prisma.cosecha`: Exposes CRUD operations for the **Cosecha** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Cosechas
    * const cosechas = await prisma.cosecha.findMany()
    * ```
    */
  get cosecha(): Prisma.CosechaDelegate<ExtArgs>;

  /**
   * `prisma.insumo`: Exposes CRUD operations for the **Insumo** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Insumos
    * const insumos = await prisma.insumo.findMany()
    * ```
    */
  get insumo(): Prisma.InsumoDelegate<ExtArgs>;

  /**
   * `prisma.aplicacionInsumo`: Exposes CRUD operations for the **AplicacionInsumo** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AplicacionInsumos
    * const aplicacionInsumos = await prisma.aplicacionInsumo.findMany()
    * ```
    */
  get aplicacionInsumo(): Prisma.AplicacionInsumoDelegate<ExtArgs>;

  /**
   * `prisma.animal`: Exposes CRUD operations for the **Animal** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Animals
    * const animals = await prisma.animal.findMany()
    * ```
    */
  get animal(): Prisma.AnimalDelegate<ExtArgs>;

  /**
   * `prisma.prenez`: Exposes CRUD operations for the **Prenez** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Prenezs
    * const prenezs = await prisma.prenez.findMany()
    * ```
    */
  get prenez(): Prisma.PrenezDelegate<ExtArgs>;

  /**
   * `prisma.tareaRural`: Exposes CRUD operations for the **TareaRural** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TareaRurals
    * const tareaRurals = await prisma.tareaRural.findMany()
    * ```
    */
  get tareaRural(): Prisma.TareaRuralDelegate<ExtArgs>;

  /**
   * `prisma.movimientoFinanciero`: Exposes CRUD operations for the **MovimientoFinanciero** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MovimientoFinancieros
    * const movimientoFinancieros = await prisma.movimientoFinanciero.findMany()
    * ```
    */
  get movimientoFinanciero(): Prisma.MovimientoFinancieroDelegate<ExtArgs>;

  /**
   * `prisma.campania`: Exposes CRUD operations for the **Campania** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Campanias
    * const campanias = await prisma.campania.findMany()
    * ```
    */
  get campania(): Prisma.CampaniaDelegate<ExtArgs>;

  /**
   * `prisma.registroPeso`: Exposes CRUD operations for the **RegistroPeso** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RegistroPesos
    * const registroPesos = await prisma.registroPeso.findMany()
    * ```
    */
  get registroPeso(): Prisma.RegistroPesoDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
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

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "usuario" | "campo" | "lote" | "tipoCultivo" | "siembra" | "cosecha" | "insumo" | "aplicacionInsumo" | "animal" | "prenez" | "tareaRural" | "movimientoFinanciero" | "campania" | "registroPeso"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Usuario: {
        payload: Prisma.$UsuarioPayload<ExtArgs>
        fields: Prisma.UsuarioFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UsuarioFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UsuarioFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          findFirst: {
            args: Prisma.UsuarioFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UsuarioFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          findMany: {
            args: Prisma.UsuarioFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>[]
          }
          create: {
            args: Prisma.UsuarioCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          createMany: {
            args: Prisma.UsuarioCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UsuarioCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>[]
          }
          delete: {
            args: Prisma.UsuarioDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          update: {
            args: Prisma.UsuarioUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          deleteMany: {
            args: Prisma.UsuarioDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UsuarioUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UsuarioUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          aggregate: {
            args: Prisma.UsuarioAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUsuario>
          }
          groupBy: {
            args: Prisma.UsuarioGroupByArgs<ExtArgs>
            result: $Utils.Optional<UsuarioGroupByOutputType>[]
          }
          count: {
            args: Prisma.UsuarioCountArgs<ExtArgs>
            result: $Utils.Optional<UsuarioCountAggregateOutputType> | number
          }
        }
      }
      Campo: {
        payload: Prisma.$CampoPayload<ExtArgs>
        fields: Prisma.CampoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CampoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CampoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampoPayload>
          }
          findFirst: {
            args: Prisma.CampoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CampoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampoPayload>
          }
          findMany: {
            args: Prisma.CampoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampoPayload>[]
          }
          create: {
            args: Prisma.CampoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampoPayload>
          }
          createMany: {
            args: Prisma.CampoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CampoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampoPayload>[]
          }
          delete: {
            args: Prisma.CampoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampoPayload>
          }
          update: {
            args: Prisma.CampoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampoPayload>
          }
          deleteMany: {
            args: Prisma.CampoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CampoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CampoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampoPayload>
          }
          aggregate: {
            args: Prisma.CampoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCampo>
          }
          groupBy: {
            args: Prisma.CampoGroupByArgs<ExtArgs>
            result: $Utils.Optional<CampoGroupByOutputType>[]
          }
          count: {
            args: Prisma.CampoCountArgs<ExtArgs>
            result: $Utils.Optional<CampoCountAggregateOutputType> | number
          }
        }
      }
      Lote: {
        payload: Prisma.$LotePayload<ExtArgs>
        fields: Prisma.LoteFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LoteFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LotePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LoteFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LotePayload>
          }
          findFirst: {
            args: Prisma.LoteFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LotePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LoteFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LotePayload>
          }
          findMany: {
            args: Prisma.LoteFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LotePayload>[]
          }
          create: {
            args: Prisma.LoteCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LotePayload>
          }
          createMany: {
            args: Prisma.LoteCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LoteCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LotePayload>[]
          }
          delete: {
            args: Prisma.LoteDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LotePayload>
          }
          update: {
            args: Prisma.LoteUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LotePayload>
          }
          deleteMany: {
            args: Prisma.LoteDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LoteUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.LoteUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LotePayload>
          }
          aggregate: {
            args: Prisma.LoteAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLote>
          }
          groupBy: {
            args: Prisma.LoteGroupByArgs<ExtArgs>
            result: $Utils.Optional<LoteGroupByOutputType>[]
          }
          count: {
            args: Prisma.LoteCountArgs<ExtArgs>
            result: $Utils.Optional<LoteCountAggregateOutputType> | number
          }
        }
      }
      TipoCultivo: {
        payload: Prisma.$TipoCultivoPayload<ExtArgs>
        fields: Prisma.TipoCultivoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TipoCultivoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TipoCultivoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TipoCultivoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TipoCultivoPayload>
          }
          findFirst: {
            args: Prisma.TipoCultivoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TipoCultivoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TipoCultivoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TipoCultivoPayload>
          }
          findMany: {
            args: Prisma.TipoCultivoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TipoCultivoPayload>[]
          }
          create: {
            args: Prisma.TipoCultivoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TipoCultivoPayload>
          }
          createMany: {
            args: Prisma.TipoCultivoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TipoCultivoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TipoCultivoPayload>[]
          }
          delete: {
            args: Prisma.TipoCultivoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TipoCultivoPayload>
          }
          update: {
            args: Prisma.TipoCultivoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TipoCultivoPayload>
          }
          deleteMany: {
            args: Prisma.TipoCultivoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TipoCultivoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.TipoCultivoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TipoCultivoPayload>
          }
          aggregate: {
            args: Prisma.TipoCultivoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTipoCultivo>
          }
          groupBy: {
            args: Prisma.TipoCultivoGroupByArgs<ExtArgs>
            result: $Utils.Optional<TipoCultivoGroupByOutputType>[]
          }
          count: {
            args: Prisma.TipoCultivoCountArgs<ExtArgs>
            result: $Utils.Optional<TipoCultivoCountAggregateOutputType> | number
          }
        }
      }
      Siembra: {
        payload: Prisma.$SiembraPayload<ExtArgs>
        fields: Prisma.SiembraFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SiembraFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SiembraPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SiembraFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SiembraPayload>
          }
          findFirst: {
            args: Prisma.SiembraFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SiembraPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SiembraFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SiembraPayload>
          }
          findMany: {
            args: Prisma.SiembraFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SiembraPayload>[]
          }
          create: {
            args: Prisma.SiembraCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SiembraPayload>
          }
          createMany: {
            args: Prisma.SiembraCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SiembraCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SiembraPayload>[]
          }
          delete: {
            args: Prisma.SiembraDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SiembraPayload>
          }
          update: {
            args: Prisma.SiembraUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SiembraPayload>
          }
          deleteMany: {
            args: Prisma.SiembraDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SiembraUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SiembraUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SiembraPayload>
          }
          aggregate: {
            args: Prisma.SiembraAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSiembra>
          }
          groupBy: {
            args: Prisma.SiembraGroupByArgs<ExtArgs>
            result: $Utils.Optional<SiembraGroupByOutputType>[]
          }
          count: {
            args: Prisma.SiembraCountArgs<ExtArgs>
            result: $Utils.Optional<SiembraCountAggregateOutputType> | number
          }
        }
      }
      Cosecha: {
        payload: Prisma.$CosechaPayload<ExtArgs>
        fields: Prisma.CosechaFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CosechaFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CosechaPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CosechaFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CosechaPayload>
          }
          findFirst: {
            args: Prisma.CosechaFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CosechaPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CosechaFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CosechaPayload>
          }
          findMany: {
            args: Prisma.CosechaFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CosechaPayload>[]
          }
          create: {
            args: Prisma.CosechaCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CosechaPayload>
          }
          createMany: {
            args: Prisma.CosechaCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CosechaCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CosechaPayload>[]
          }
          delete: {
            args: Prisma.CosechaDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CosechaPayload>
          }
          update: {
            args: Prisma.CosechaUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CosechaPayload>
          }
          deleteMany: {
            args: Prisma.CosechaDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CosechaUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CosechaUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CosechaPayload>
          }
          aggregate: {
            args: Prisma.CosechaAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCosecha>
          }
          groupBy: {
            args: Prisma.CosechaGroupByArgs<ExtArgs>
            result: $Utils.Optional<CosechaGroupByOutputType>[]
          }
          count: {
            args: Prisma.CosechaCountArgs<ExtArgs>
            result: $Utils.Optional<CosechaCountAggregateOutputType> | number
          }
        }
      }
      Insumo: {
        payload: Prisma.$InsumoPayload<ExtArgs>
        fields: Prisma.InsumoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.InsumoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InsumoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.InsumoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InsumoPayload>
          }
          findFirst: {
            args: Prisma.InsumoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InsumoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.InsumoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InsumoPayload>
          }
          findMany: {
            args: Prisma.InsumoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InsumoPayload>[]
          }
          create: {
            args: Prisma.InsumoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InsumoPayload>
          }
          createMany: {
            args: Prisma.InsumoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.InsumoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InsumoPayload>[]
          }
          delete: {
            args: Prisma.InsumoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InsumoPayload>
          }
          update: {
            args: Prisma.InsumoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InsumoPayload>
          }
          deleteMany: {
            args: Prisma.InsumoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.InsumoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.InsumoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InsumoPayload>
          }
          aggregate: {
            args: Prisma.InsumoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateInsumo>
          }
          groupBy: {
            args: Prisma.InsumoGroupByArgs<ExtArgs>
            result: $Utils.Optional<InsumoGroupByOutputType>[]
          }
          count: {
            args: Prisma.InsumoCountArgs<ExtArgs>
            result: $Utils.Optional<InsumoCountAggregateOutputType> | number
          }
        }
      }
      AplicacionInsumo: {
        payload: Prisma.$AplicacionInsumoPayload<ExtArgs>
        fields: Prisma.AplicacionInsumoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AplicacionInsumoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AplicacionInsumoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AplicacionInsumoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AplicacionInsumoPayload>
          }
          findFirst: {
            args: Prisma.AplicacionInsumoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AplicacionInsumoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AplicacionInsumoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AplicacionInsumoPayload>
          }
          findMany: {
            args: Prisma.AplicacionInsumoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AplicacionInsumoPayload>[]
          }
          create: {
            args: Prisma.AplicacionInsumoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AplicacionInsumoPayload>
          }
          createMany: {
            args: Prisma.AplicacionInsumoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AplicacionInsumoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AplicacionInsumoPayload>[]
          }
          delete: {
            args: Prisma.AplicacionInsumoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AplicacionInsumoPayload>
          }
          update: {
            args: Prisma.AplicacionInsumoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AplicacionInsumoPayload>
          }
          deleteMany: {
            args: Prisma.AplicacionInsumoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AplicacionInsumoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AplicacionInsumoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AplicacionInsumoPayload>
          }
          aggregate: {
            args: Prisma.AplicacionInsumoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAplicacionInsumo>
          }
          groupBy: {
            args: Prisma.AplicacionInsumoGroupByArgs<ExtArgs>
            result: $Utils.Optional<AplicacionInsumoGroupByOutputType>[]
          }
          count: {
            args: Prisma.AplicacionInsumoCountArgs<ExtArgs>
            result: $Utils.Optional<AplicacionInsumoCountAggregateOutputType> | number
          }
        }
      }
      Animal: {
        payload: Prisma.$AnimalPayload<ExtArgs>
        fields: Prisma.AnimalFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AnimalFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnimalPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AnimalFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnimalPayload>
          }
          findFirst: {
            args: Prisma.AnimalFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnimalPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AnimalFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnimalPayload>
          }
          findMany: {
            args: Prisma.AnimalFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnimalPayload>[]
          }
          create: {
            args: Prisma.AnimalCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnimalPayload>
          }
          createMany: {
            args: Prisma.AnimalCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AnimalCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnimalPayload>[]
          }
          delete: {
            args: Prisma.AnimalDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnimalPayload>
          }
          update: {
            args: Prisma.AnimalUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnimalPayload>
          }
          deleteMany: {
            args: Prisma.AnimalDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AnimalUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AnimalUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnimalPayload>
          }
          aggregate: {
            args: Prisma.AnimalAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAnimal>
          }
          groupBy: {
            args: Prisma.AnimalGroupByArgs<ExtArgs>
            result: $Utils.Optional<AnimalGroupByOutputType>[]
          }
          count: {
            args: Prisma.AnimalCountArgs<ExtArgs>
            result: $Utils.Optional<AnimalCountAggregateOutputType> | number
          }
        }
      }
      Prenez: {
        payload: Prisma.$PrenezPayload<ExtArgs>
        fields: Prisma.PrenezFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PrenezFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrenezPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PrenezFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrenezPayload>
          }
          findFirst: {
            args: Prisma.PrenezFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrenezPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PrenezFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrenezPayload>
          }
          findMany: {
            args: Prisma.PrenezFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrenezPayload>[]
          }
          create: {
            args: Prisma.PrenezCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrenezPayload>
          }
          createMany: {
            args: Prisma.PrenezCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PrenezCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrenezPayload>[]
          }
          delete: {
            args: Prisma.PrenezDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrenezPayload>
          }
          update: {
            args: Prisma.PrenezUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrenezPayload>
          }
          deleteMany: {
            args: Prisma.PrenezDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PrenezUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PrenezUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrenezPayload>
          }
          aggregate: {
            args: Prisma.PrenezAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePrenez>
          }
          groupBy: {
            args: Prisma.PrenezGroupByArgs<ExtArgs>
            result: $Utils.Optional<PrenezGroupByOutputType>[]
          }
          count: {
            args: Prisma.PrenezCountArgs<ExtArgs>
            result: $Utils.Optional<PrenezCountAggregateOutputType> | number
          }
        }
      }
      TareaRural: {
        payload: Prisma.$TareaRuralPayload<ExtArgs>
        fields: Prisma.TareaRuralFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TareaRuralFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TareaRuralPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TareaRuralFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TareaRuralPayload>
          }
          findFirst: {
            args: Prisma.TareaRuralFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TareaRuralPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TareaRuralFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TareaRuralPayload>
          }
          findMany: {
            args: Prisma.TareaRuralFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TareaRuralPayload>[]
          }
          create: {
            args: Prisma.TareaRuralCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TareaRuralPayload>
          }
          createMany: {
            args: Prisma.TareaRuralCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TareaRuralCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TareaRuralPayload>[]
          }
          delete: {
            args: Prisma.TareaRuralDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TareaRuralPayload>
          }
          update: {
            args: Prisma.TareaRuralUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TareaRuralPayload>
          }
          deleteMany: {
            args: Prisma.TareaRuralDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TareaRuralUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.TareaRuralUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TareaRuralPayload>
          }
          aggregate: {
            args: Prisma.TareaRuralAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTareaRural>
          }
          groupBy: {
            args: Prisma.TareaRuralGroupByArgs<ExtArgs>
            result: $Utils.Optional<TareaRuralGroupByOutputType>[]
          }
          count: {
            args: Prisma.TareaRuralCountArgs<ExtArgs>
            result: $Utils.Optional<TareaRuralCountAggregateOutputType> | number
          }
        }
      }
      MovimientoFinanciero: {
        payload: Prisma.$MovimientoFinancieroPayload<ExtArgs>
        fields: Prisma.MovimientoFinancieroFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MovimientoFinancieroFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MovimientoFinancieroPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MovimientoFinancieroFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MovimientoFinancieroPayload>
          }
          findFirst: {
            args: Prisma.MovimientoFinancieroFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MovimientoFinancieroPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MovimientoFinancieroFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MovimientoFinancieroPayload>
          }
          findMany: {
            args: Prisma.MovimientoFinancieroFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MovimientoFinancieroPayload>[]
          }
          create: {
            args: Prisma.MovimientoFinancieroCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MovimientoFinancieroPayload>
          }
          createMany: {
            args: Prisma.MovimientoFinancieroCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MovimientoFinancieroCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MovimientoFinancieroPayload>[]
          }
          delete: {
            args: Prisma.MovimientoFinancieroDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MovimientoFinancieroPayload>
          }
          update: {
            args: Prisma.MovimientoFinancieroUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MovimientoFinancieroPayload>
          }
          deleteMany: {
            args: Prisma.MovimientoFinancieroDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MovimientoFinancieroUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.MovimientoFinancieroUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MovimientoFinancieroPayload>
          }
          aggregate: {
            args: Prisma.MovimientoFinancieroAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMovimientoFinanciero>
          }
          groupBy: {
            args: Prisma.MovimientoFinancieroGroupByArgs<ExtArgs>
            result: $Utils.Optional<MovimientoFinancieroGroupByOutputType>[]
          }
          count: {
            args: Prisma.MovimientoFinancieroCountArgs<ExtArgs>
            result: $Utils.Optional<MovimientoFinancieroCountAggregateOutputType> | number
          }
        }
      }
      Campania: {
        payload: Prisma.$CampaniaPayload<ExtArgs>
        fields: Prisma.CampaniaFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CampaniaFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaniaPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CampaniaFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaniaPayload>
          }
          findFirst: {
            args: Prisma.CampaniaFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaniaPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CampaniaFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaniaPayload>
          }
          findMany: {
            args: Prisma.CampaniaFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaniaPayload>[]
          }
          create: {
            args: Prisma.CampaniaCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaniaPayload>
          }
          createMany: {
            args: Prisma.CampaniaCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CampaniaCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaniaPayload>[]
          }
          delete: {
            args: Prisma.CampaniaDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaniaPayload>
          }
          update: {
            args: Prisma.CampaniaUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaniaPayload>
          }
          deleteMany: {
            args: Prisma.CampaniaDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CampaniaUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CampaniaUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaniaPayload>
          }
          aggregate: {
            args: Prisma.CampaniaAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCampania>
          }
          groupBy: {
            args: Prisma.CampaniaGroupByArgs<ExtArgs>
            result: $Utils.Optional<CampaniaGroupByOutputType>[]
          }
          count: {
            args: Prisma.CampaniaCountArgs<ExtArgs>
            result: $Utils.Optional<CampaniaCountAggregateOutputType> | number
          }
        }
      }
      RegistroPeso: {
        payload: Prisma.$RegistroPesoPayload<ExtArgs>
        fields: Prisma.RegistroPesoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RegistroPesoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegistroPesoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RegistroPesoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegistroPesoPayload>
          }
          findFirst: {
            args: Prisma.RegistroPesoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegistroPesoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RegistroPesoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegistroPesoPayload>
          }
          findMany: {
            args: Prisma.RegistroPesoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegistroPesoPayload>[]
          }
          create: {
            args: Prisma.RegistroPesoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegistroPesoPayload>
          }
          createMany: {
            args: Prisma.RegistroPesoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RegistroPesoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegistroPesoPayload>[]
          }
          delete: {
            args: Prisma.RegistroPesoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegistroPesoPayload>
          }
          update: {
            args: Prisma.RegistroPesoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegistroPesoPayload>
          }
          deleteMany: {
            args: Prisma.RegistroPesoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RegistroPesoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.RegistroPesoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegistroPesoPayload>
          }
          aggregate: {
            args: Prisma.RegistroPesoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRegistroPeso>
          }
          groupBy: {
            args: Prisma.RegistroPesoGroupByArgs<ExtArgs>
            result: $Utils.Optional<RegistroPesoGroupByOutputType>[]
          }
          count: {
            args: Prisma.RegistroPesoCountArgs<ExtArgs>
            result: $Utils.Optional<RegistroPesoCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UsuarioCountOutputType
   */

  export type UsuarioCountOutputType = {
    campos: number
    animales: number
    tareas: number
    movimientos: number
    campanias: number
  }

  export type UsuarioCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    campos?: boolean | UsuarioCountOutputTypeCountCamposArgs
    animales?: boolean | UsuarioCountOutputTypeCountAnimalesArgs
    tareas?: boolean | UsuarioCountOutputTypeCountTareasArgs
    movimientos?: boolean | UsuarioCountOutputTypeCountMovimientosArgs
    campanias?: boolean | UsuarioCountOutputTypeCountCampaniasArgs
  }

  // Custom InputTypes
  /**
   * UsuarioCountOutputType without action
   */
  export type UsuarioCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsuarioCountOutputType
     */
    select?: UsuarioCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UsuarioCountOutputType without action
   */
  export type UsuarioCountOutputTypeCountCamposArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CampoWhereInput
  }

  /**
   * UsuarioCountOutputType without action
   */
  export type UsuarioCountOutputTypeCountAnimalesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AnimalWhereInput
  }

  /**
   * UsuarioCountOutputType without action
   */
  export type UsuarioCountOutputTypeCountTareasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TareaRuralWhereInput
  }

  /**
   * UsuarioCountOutputType without action
   */
  export type UsuarioCountOutputTypeCountMovimientosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MovimientoFinancieroWhereInput
  }

  /**
   * UsuarioCountOutputType without action
   */
  export type UsuarioCountOutputTypeCountCampaniasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CampaniaWhereInput
  }


  /**
   * Count Type CampoCountOutputType
   */

  export type CampoCountOutputType = {
    lotes: number
    tareas: number
    movimentos: number
  }

  export type CampoCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    lotes?: boolean | CampoCountOutputTypeCountLotesArgs
    tareas?: boolean | CampoCountOutputTypeCountTareasArgs
    movimentos?: boolean | CampoCountOutputTypeCountMovimentosArgs
  }

  // Custom InputTypes
  /**
   * CampoCountOutputType without action
   */
  export type CampoCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampoCountOutputType
     */
    select?: CampoCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CampoCountOutputType without action
   */
  export type CampoCountOutputTypeCountLotesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LoteWhereInput
  }

  /**
   * CampoCountOutputType without action
   */
  export type CampoCountOutputTypeCountTareasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TareaRuralWhereInput
  }

  /**
   * CampoCountOutputType without action
   */
  export type CampoCountOutputTypeCountMovimentosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MovimientoFinancieroWhereInput
  }


  /**
   * Count Type LoteCountOutputType
   */

  export type LoteCountOutputType = {
    siembras: number
  }

  export type LoteCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    siembras?: boolean | LoteCountOutputTypeCountSiembrasArgs
  }

  // Custom InputTypes
  /**
   * LoteCountOutputType without action
   */
  export type LoteCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoteCountOutputType
     */
    select?: LoteCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * LoteCountOutputType without action
   */
  export type LoteCountOutputTypeCountSiembrasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SiembraWhereInput
  }


  /**
   * Count Type TipoCultivoCountOutputType
   */

  export type TipoCultivoCountOutputType = {
    siembras: number
  }

  export type TipoCultivoCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    siembras?: boolean | TipoCultivoCountOutputTypeCountSiembrasArgs
  }

  // Custom InputTypes
  /**
   * TipoCultivoCountOutputType without action
   */
  export type TipoCultivoCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TipoCultivoCountOutputType
     */
    select?: TipoCultivoCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TipoCultivoCountOutputType without action
   */
  export type TipoCultivoCountOutputTypeCountSiembrasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SiembraWhereInput
  }


  /**
   * Count Type SiembraCountOutputType
   */

  export type SiembraCountOutputType = {
    cosechas: number
    aplicaciones: number
    movimentos: number
  }

  export type SiembraCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    cosechas?: boolean | SiembraCountOutputTypeCountCosechasArgs
    aplicaciones?: boolean | SiembraCountOutputTypeCountAplicacionesArgs
    movimentos?: boolean | SiembraCountOutputTypeCountMovimentosArgs
  }

  // Custom InputTypes
  /**
   * SiembraCountOutputType without action
   */
  export type SiembraCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SiembraCountOutputType
     */
    select?: SiembraCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SiembraCountOutputType without action
   */
  export type SiembraCountOutputTypeCountCosechasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CosechaWhereInput
  }

  /**
   * SiembraCountOutputType without action
   */
  export type SiembraCountOutputTypeCountAplicacionesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AplicacionInsumoWhereInput
  }

  /**
   * SiembraCountOutputType without action
   */
  export type SiembraCountOutputTypeCountMovimentosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MovimientoFinancieroWhereInput
  }


  /**
   * Count Type InsumoCountOutputType
   */

  export type InsumoCountOutputType = {
    aplicaciones: number
  }

  export type InsumoCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    aplicaciones?: boolean | InsumoCountOutputTypeCountAplicacionesArgs
  }

  // Custom InputTypes
  /**
   * InsumoCountOutputType without action
   */
  export type InsumoCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InsumoCountOutputType
     */
    select?: InsumoCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * InsumoCountOutputType without action
   */
  export type InsumoCountOutputTypeCountAplicacionesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AplicacionInsumoWhereInput
  }


  /**
   * Count Type AnimalCountOutputType
   */

  export type AnimalCountOutputType = {
    preneces: number
    pesos: number
  }

  export type AnimalCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    preneces?: boolean | AnimalCountOutputTypeCountPrenecesArgs
    pesos?: boolean | AnimalCountOutputTypeCountPesosArgs
  }

  // Custom InputTypes
  /**
   * AnimalCountOutputType without action
   */
  export type AnimalCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnimalCountOutputType
     */
    select?: AnimalCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AnimalCountOutputType without action
   */
  export type AnimalCountOutputTypeCountPrenecesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PrenezWhereInput
  }

  /**
   * AnimalCountOutputType without action
   */
  export type AnimalCountOutputTypeCountPesosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RegistroPesoWhereInput
  }


  /**
   * Count Type CampaniaCountOutputType
   */

  export type CampaniaCountOutputType = {
    siembras: number
  }

  export type CampaniaCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    siembras?: boolean | CampaniaCountOutputTypeCountSiembrasArgs
  }

  // Custom InputTypes
  /**
   * CampaniaCountOutputType without action
   */
  export type CampaniaCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampaniaCountOutputType
     */
    select?: CampaniaCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CampaniaCountOutputType without action
   */
  export type CampaniaCountOutputTypeCountSiembrasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SiembraWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Usuario
   */

  export type AggregateUsuario = {
    _count: UsuarioCountAggregateOutputType | null
    _avg: UsuarioAvgAggregateOutputType | null
    _sum: UsuarioSumAggregateOutputType | null
    _min: UsuarioMinAggregateOutputType | null
    _max: UsuarioMaxAggregateOutputType | null
  }

  export type UsuarioAvgAggregateOutputType = {
    id: number | null
  }

  export type UsuarioSumAggregateOutputType = {
    id: number | null
  }

  export type UsuarioMinAggregateOutputType = {
    id: number | null
    email: string | null
    nombre: string | null
    password: string | null
    rol: $Enums.Rol | null
    plan: $Enums.PlanTipo | null
    planExpira: Date | null
    mpSuscripcionId: string | null
    createdAt: Date | null
    updatedAt: Date | null
    resetToken: string | null
    resetTokenExpiry: Date | null
  }

  export type UsuarioMaxAggregateOutputType = {
    id: number | null
    email: string | null
    nombre: string | null
    password: string | null
    rol: $Enums.Rol | null
    plan: $Enums.PlanTipo | null
    planExpira: Date | null
    mpSuscripcionId: string | null
    createdAt: Date | null
    updatedAt: Date | null
    resetToken: string | null
    resetTokenExpiry: Date | null
  }

  export type UsuarioCountAggregateOutputType = {
    id: number
    email: number
    nombre: number
    password: number
    rol: number
    plan: number
    planExpira: number
    mpSuscripcionId: number
    createdAt: number
    updatedAt: number
    resetToken: number
    resetTokenExpiry: number
    _all: number
  }


  export type UsuarioAvgAggregateInputType = {
    id?: true
  }

  export type UsuarioSumAggregateInputType = {
    id?: true
  }

  export type UsuarioMinAggregateInputType = {
    id?: true
    email?: true
    nombre?: true
    password?: true
    rol?: true
    plan?: true
    planExpira?: true
    mpSuscripcionId?: true
    createdAt?: true
    updatedAt?: true
    resetToken?: true
    resetTokenExpiry?: true
  }

  export type UsuarioMaxAggregateInputType = {
    id?: true
    email?: true
    nombre?: true
    password?: true
    rol?: true
    plan?: true
    planExpira?: true
    mpSuscripcionId?: true
    createdAt?: true
    updatedAt?: true
    resetToken?: true
    resetTokenExpiry?: true
  }

  export type UsuarioCountAggregateInputType = {
    id?: true
    email?: true
    nombre?: true
    password?: true
    rol?: true
    plan?: true
    planExpira?: true
    mpSuscripcionId?: true
    createdAt?: true
    updatedAt?: true
    resetToken?: true
    resetTokenExpiry?: true
    _all?: true
  }

  export type UsuarioAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Usuario to aggregate.
     */
    where?: UsuarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Usuarios to fetch.
     */
    orderBy?: UsuarioOrderByWithRelationInput | UsuarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UsuarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Usuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Usuarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Usuarios
    **/
    _count?: true | UsuarioCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UsuarioAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UsuarioSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UsuarioMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UsuarioMaxAggregateInputType
  }

  export type GetUsuarioAggregateType<T extends UsuarioAggregateArgs> = {
        [P in keyof T & keyof AggregateUsuario]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUsuario[P]>
      : GetScalarType<T[P], AggregateUsuario[P]>
  }




  export type UsuarioGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UsuarioWhereInput
    orderBy?: UsuarioOrderByWithAggregationInput | UsuarioOrderByWithAggregationInput[]
    by: UsuarioScalarFieldEnum[] | UsuarioScalarFieldEnum
    having?: UsuarioScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UsuarioCountAggregateInputType | true
    _avg?: UsuarioAvgAggregateInputType
    _sum?: UsuarioSumAggregateInputType
    _min?: UsuarioMinAggregateInputType
    _max?: UsuarioMaxAggregateInputType
  }

  export type UsuarioGroupByOutputType = {
    id: number
    email: string
    nombre: string
    password: string
    rol: $Enums.Rol
    plan: $Enums.PlanTipo
    planExpira: Date | null
    mpSuscripcionId: string | null
    createdAt: Date
    updatedAt: Date
    resetToken: string | null
    resetTokenExpiry: Date | null
    _count: UsuarioCountAggregateOutputType | null
    _avg: UsuarioAvgAggregateOutputType | null
    _sum: UsuarioSumAggregateOutputType | null
    _min: UsuarioMinAggregateOutputType | null
    _max: UsuarioMaxAggregateOutputType | null
  }

  type GetUsuarioGroupByPayload<T extends UsuarioGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UsuarioGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UsuarioGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UsuarioGroupByOutputType[P]>
            : GetScalarType<T[P], UsuarioGroupByOutputType[P]>
        }
      >
    >


  export type UsuarioSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    nombre?: boolean
    password?: boolean
    rol?: boolean
    plan?: boolean
    planExpira?: boolean
    mpSuscripcionId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    resetToken?: boolean
    resetTokenExpiry?: boolean
    campos?: boolean | Usuario$camposArgs<ExtArgs>
    animales?: boolean | Usuario$animalesArgs<ExtArgs>
    tareas?: boolean | Usuario$tareasArgs<ExtArgs>
    movimientos?: boolean | Usuario$movimientosArgs<ExtArgs>
    campanias?: boolean | Usuario$campaniasArgs<ExtArgs>
    _count?: boolean | UsuarioCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["usuario"]>

  export type UsuarioSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    nombre?: boolean
    password?: boolean
    rol?: boolean
    plan?: boolean
    planExpira?: boolean
    mpSuscripcionId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    resetToken?: boolean
    resetTokenExpiry?: boolean
  }, ExtArgs["result"]["usuario"]>

  export type UsuarioSelectScalar = {
    id?: boolean
    email?: boolean
    nombre?: boolean
    password?: boolean
    rol?: boolean
    plan?: boolean
    planExpira?: boolean
    mpSuscripcionId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    resetToken?: boolean
    resetTokenExpiry?: boolean
  }

  export type UsuarioInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    campos?: boolean | Usuario$camposArgs<ExtArgs>
    animales?: boolean | Usuario$animalesArgs<ExtArgs>
    tareas?: boolean | Usuario$tareasArgs<ExtArgs>
    movimientos?: boolean | Usuario$movimientosArgs<ExtArgs>
    campanias?: boolean | Usuario$campaniasArgs<ExtArgs>
    _count?: boolean | UsuarioCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UsuarioIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UsuarioPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Usuario"
    objects: {
      campos: Prisma.$CampoPayload<ExtArgs>[]
      animales: Prisma.$AnimalPayload<ExtArgs>[]
      tareas: Prisma.$TareaRuralPayload<ExtArgs>[]
      movimientos: Prisma.$MovimientoFinancieroPayload<ExtArgs>[]
      campanias: Prisma.$CampaniaPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      email: string
      nombre: string
      password: string
      rol: $Enums.Rol
      plan: $Enums.PlanTipo
      planExpira: Date | null
      mpSuscripcionId: string | null
      createdAt: Date
      updatedAt: Date
      resetToken: string | null
      resetTokenExpiry: Date | null
    }, ExtArgs["result"]["usuario"]>
    composites: {}
  }

  type UsuarioGetPayload<S extends boolean | null | undefined | UsuarioDefaultArgs> = $Result.GetResult<Prisma.$UsuarioPayload, S>

  type UsuarioCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<UsuarioFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: UsuarioCountAggregateInputType | true
    }

  export interface UsuarioDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Usuario'], meta: { name: 'Usuario' } }
    /**
     * Find zero or one Usuario that matches the filter.
     * @param {UsuarioFindUniqueArgs} args - Arguments to find a Usuario
     * @example
     * // Get one Usuario
     * const usuario = await prisma.usuario.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UsuarioFindUniqueArgs>(args: SelectSubset<T, UsuarioFindUniqueArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Usuario that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {UsuarioFindUniqueOrThrowArgs} args - Arguments to find a Usuario
     * @example
     * // Get one Usuario
     * const usuario = await prisma.usuario.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UsuarioFindUniqueOrThrowArgs>(args: SelectSubset<T, UsuarioFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Usuario that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioFindFirstArgs} args - Arguments to find a Usuario
     * @example
     * // Get one Usuario
     * const usuario = await prisma.usuario.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UsuarioFindFirstArgs>(args?: SelectSubset<T, UsuarioFindFirstArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Usuario that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioFindFirstOrThrowArgs} args - Arguments to find a Usuario
     * @example
     * // Get one Usuario
     * const usuario = await prisma.usuario.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UsuarioFindFirstOrThrowArgs>(args?: SelectSubset<T, UsuarioFindFirstOrThrowArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Usuarios that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Usuarios
     * const usuarios = await prisma.usuario.findMany()
     * 
     * // Get first 10 Usuarios
     * const usuarios = await prisma.usuario.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const usuarioWithIdOnly = await prisma.usuario.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UsuarioFindManyArgs>(args?: SelectSubset<T, UsuarioFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Usuario.
     * @param {UsuarioCreateArgs} args - Arguments to create a Usuario.
     * @example
     * // Create one Usuario
     * const Usuario = await prisma.usuario.create({
     *   data: {
     *     // ... data to create a Usuario
     *   }
     * })
     * 
     */
    create<T extends UsuarioCreateArgs>(args: SelectSubset<T, UsuarioCreateArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Usuarios.
     * @param {UsuarioCreateManyArgs} args - Arguments to create many Usuarios.
     * @example
     * // Create many Usuarios
     * const usuario = await prisma.usuario.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UsuarioCreateManyArgs>(args?: SelectSubset<T, UsuarioCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Usuarios and returns the data saved in the database.
     * @param {UsuarioCreateManyAndReturnArgs} args - Arguments to create many Usuarios.
     * @example
     * // Create many Usuarios
     * const usuario = await prisma.usuario.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Usuarios and only return the `id`
     * const usuarioWithIdOnly = await prisma.usuario.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UsuarioCreateManyAndReturnArgs>(args?: SelectSubset<T, UsuarioCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Usuario.
     * @param {UsuarioDeleteArgs} args - Arguments to delete one Usuario.
     * @example
     * // Delete one Usuario
     * const Usuario = await prisma.usuario.delete({
     *   where: {
     *     // ... filter to delete one Usuario
     *   }
     * })
     * 
     */
    delete<T extends UsuarioDeleteArgs>(args: SelectSubset<T, UsuarioDeleteArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Usuario.
     * @param {UsuarioUpdateArgs} args - Arguments to update one Usuario.
     * @example
     * // Update one Usuario
     * const usuario = await prisma.usuario.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UsuarioUpdateArgs>(args: SelectSubset<T, UsuarioUpdateArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Usuarios.
     * @param {UsuarioDeleteManyArgs} args - Arguments to filter Usuarios to delete.
     * @example
     * // Delete a few Usuarios
     * const { count } = await prisma.usuario.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UsuarioDeleteManyArgs>(args?: SelectSubset<T, UsuarioDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Usuarios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Usuarios
     * const usuario = await prisma.usuario.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UsuarioUpdateManyArgs>(args: SelectSubset<T, UsuarioUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Usuario.
     * @param {UsuarioUpsertArgs} args - Arguments to update or create a Usuario.
     * @example
     * // Update or create a Usuario
     * const usuario = await prisma.usuario.upsert({
     *   create: {
     *     // ... data to create a Usuario
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Usuario we want to update
     *   }
     * })
     */
    upsert<T extends UsuarioUpsertArgs>(args: SelectSubset<T, UsuarioUpsertArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Usuarios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioCountArgs} args - Arguments to filter Usuarios to count.
     * @example
     * // Count the number of Usuarios
     * const count = await prisma.usuario.count({
     *   where: {
     *     // ... the filter for the Usuarios we want to count
     *   }
     * })
    **/
    count<T extends UsuarioCountArgs>(
      args?: Subset<T, UsuarioCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UsuarioCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Usuario.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UsuarioAggregateArgs>(args: Subset<T, UsuarioAggregateArgs>): Prisma.PrismaPromise<GetUsuarioAggregateType<T>>

    /**
     * Group by Usuario.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UsuarioGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UsuarioGroupByArgs['orderBy'] }
        : { orderBy?: UsuarioGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UsuarioGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUsuarioGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Usuario model
   */
  readonly fields: UsuarioFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Usuario.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UsuarioClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    campos<T extends Usuario$camposArgs<ExtArgs> = {}>(args?: Subset<T, Usuario$camposArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CampoPayload<ExtArgs>, T, "findMany"> | Null>
    animales<T extends Usuario$animalesArgs<ExtArgs> = {}>(args?: Subset<T, Usuario$animalesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnimalPayload<ExtArgs>, T, "findMany"> | Null>
    tareas<T extends Usuario$tareasArgs<ExtArgs> = {}>(args?: Subset<T, Usuario$tareasArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TareaRuralPayload<ExtArgs>, T, "findMany"> | Null>
    movimientos<T extends Usuario$movimientosArgs<ExtArgs> = {}>(args?: Subset<T, Usuario$movimientosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MovimientoFinancieroPayload<ExtArgs>, T, "findMany"> | Null>
    campanias<T extends Usuario$campaniasArgs<ExtArgs> = {}>(args?: Subset<T, Usuario$campaniasArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CampaniaPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Usuario model
   */ 
  interface UsuarioFieldRefs {
    readonly id: FieldRef<"Usuario", 'Int'>
    readonly email: FieldRef<"Usuario", 'String'>
    readonly nombre: FieldRef<"Usuario", 'String'>
    readonly password: FieldRef<"Usuario", 'String'>
    readonly rol: FieldRef<"Usuario", 'Rol'>
    readonly plan: FieldRef<"Usuario", 'PlanTipo'>
    readonly planExpira: FieldRef<"Usuario", 'DateTime'>
    readonly mpSuscripcionId: FieldRef<"Usuario", 'String'>
    readonly createdAt: FieldRef<"Usuario", 'DateTime'>
    readonly updatedAt: FieldRef<"Usuario", 'DateTime'>
    readonly resetToken: FieldRef<"Usuario", 'String'>
    readonly resetTokenExpiry: FieldRef<"Usuario", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Usuario findUnique
   */
  export type UsuarioFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * Filter, which Usuario to fetch.
     */
    where: UsuarioWhereUniqueInput
  }

  /**
   * Usuario findUniqueOrThrow
   */
  export type UsuarioFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * Filter, which Usuario to fetch.
     */
    where: UsuarioWhereUniqueInput
  }

  /**
   * Usuario findFirst
   */
  export type UsuarioFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * Filter, which Usuario to fetch.
     */
    where?: UsuarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Usuarios to fetch.
     */
    orderBy?: UsuarioOrderByWithRelationInput | UsuarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Usuarios.
     */
    cursor?: UsuarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Usuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Usuarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Usuarios.
     */
    distinct?: UsuarioScalarFieldEnum | UsuarioScalarFieldEnum[]
  }

  /**
   * Usuario findFirstOrThrow
   */
  export type UsuarioFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * Filter, which Usuario to fetch.
     */
    where?: UsuarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Usuarios to fetch.
     */
    orderBy?: UsuarioOrderByWithRelationInput | UsuarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Usuarios.
     */
    cursor?: UsuarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Usuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Usuarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Usuarios.
     */
    distinct?: UsuarioScalarFieldEnum | UsuarioScalarFieldEnum[]
  }

  /**
   * Usuario findMany
   */
  export type UsuarioFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * Filter, which Usuarios to fetch.
     */
    where?: UsuarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Usuarios to fetch.
     */
    orderBy?: UsuarioOrderByWithRelationInput | UsuarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Usuarios.
     */
    cursor?: UsuarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Usuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Usuarios.
     */
    skip?: number
    distinct?: UsuarioScalarFieldEnum | UsuarioScalarFieldEnum[]
  }

  /**
   * Usuario create
   */
  export type UsuarioCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * The data needed to create a Usuario.
     */
    data: XOR<UsuarioCreateInput, UsuarioUncheckedCreateInput>
  }

  /**
   * Usuario createMany
   */
  export type UsuarioCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Usuarios.
     */
    data: UsuarioCreateManyInput | UsuarioCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Usuario createManyAndReturn
   */
  export type UsuarioCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Usuarios.
     */
    data: UsuarioCreateManyInput | UsuarioCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Usuario update
   */
  export type UsuarioUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * The data needed to update a Usuario.
     */
    data: XOR<UsuarioUpdateInput, UsuarioUncheckedUpdateInput>
    /**
     * Choose, which Usuario to update.
     */
    where: UsuarioWhereUniqueInput
  }

  /**
   * Usuario updateMany
   */
  export type UsuarioUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Usuarios.
     */
    data: XOR<UsuarioUpdateManyMutationInput, UsuarioUncheckedUpdateManyInput>
    /**
     * Filter which Usuarios to update
     */
    where?: UsuarioWhereInput
  }

  /**
   * Usuario upsert
   */
  export type UsuarioUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * The filter to search for the Usuario to update in case it exists.
     */
    where: UsuarioWhereUniqueInput
    /**
     * In case the Usuario found by the `where` argument doesn't exist, create a new Usuario with this data.
     */
    create: XOR<UsuarioCreateInput, UsuarioUncheckedCreateInput>
    /**
     * In case the Usuario was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UsuarioUpdateInput, UsuarioUncheckedUpdateInput>
  }

  /**
   * Usuario delete
   */
  export type UsuarioDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * Filter which Usuario to delete.
     */
    where: UsuarioWhereUniqueInput
  }

  /**
   * Usuario deleteMany
   */
  export type UsuarioDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Usuarios to delete
     */
    where?: UsuarioWhereInput
  }

  /**
   * Usuario.campos
   */
  export type Usuario$camposArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campo
     */
    select?: CampoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampoInclude<ExtArgs> | null
    where?: CampoWhereInput
    orderBy?: CampoOrderByWithRelationInput | CampoOrderByWithRelationInput[]
    cursor?: CampoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CampoScalarFieldEnum | CampoScalarFieldEnum[]
  }

  /**
   * Usuario.animales
   */
  export type Usuario$animalesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Animal
     */
    select?: AnimalSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnimalInclude<ExtArgs> | null
    where?: AnimalWhereInput
    orderBy?: AnimalOrderByWithRelationInput | AnimalOrderByWithRelationInput[]
    cursor?: AnimalWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AnimalScalarFieldEnum | AnimalScalarFieldEnum[]
  }

  /**
   * Usuario.tareas
   */
  export type Usuario$tareasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TareaRural
     */
    select?: TareaRuralSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TareaRuralInclude<ExtArgs> | null
    where?: TareaRuralWhereInput
    orderBy?: TareaRuralOrderByWithRelationInput | TareaRuralOrderByWithRelationInput[]
    cursor?: TareaRuralWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TareaRuralScalarFieldEnum | TareaRuralScalarFieldEnum[]
  }

  /**
   * Usuario.movimientos
   */
  export type Usuario$movimientosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MovimientoFinanciero
     */
    select?: MovimientoFinancieroSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovimientoFinancieroInclude<ExtArgs> | null
    where?: MovimientoFinancieroWhereInput
    orderBy?: MovimientoFinancieroOrderByWithRelationInput | MovimientoFinancieroOrderByWithRelationInput[]
    cursor?: MovimientoFinancieroWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MovimientoFinancieroScalarFieldEnum | MovimientoFinancieroScalarFieldEnum[]
  }

  /**
   * Usuario.campanias
   */
  export type Usuario$campaniasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campania
     */
    select?: CampaniaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaniaInclude<ExtArgs> | null
    where?: CampaniaWhereInput
    orderBy?: CampaniaOrderByWithRelationInput | CampaniaOrderByWithRelationInput[]
    cursor?: CampaniaWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CampaniaScalarFieldEnum | CampaniaScalarFieldEnum[]
  }

  /**
   * Usuario without action
   */
  export type UsuarioDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
  }


  /**
   * Model Campo
   */

  export type AggregateCampo = {
    _count: CampoCountAggregateOutputType | null
    _avg: CampoAvgAggregateOutputType | null
    _sum: CampoSumAggregateOutputType | null
    _min: CampoMinAggregateOutputType | null
    _max: CampoMaxAggregateOutputType | null
  }

  export type CampoAvgAggregateOutputType = {
    id: number | null
    hectareas: number | null
    usuarioId: number | null
  }

  export type CampoSumAggregateOutputType = {
    id: number | null
    hectareas: number | null
    usuarioId: number | null
  }

  export type CampoMinAggregateOutputType = {
    id: number | null
    nombre: string | null
    hectareas: number | null
    ubicacion: string | null
    propietario: string | null
    usuarioId: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CampoMaxAggregateOutputType = {
    id: number | null
    nombre: string | null
    hectareas: number | null
    ubicacion: string | null
    propietario: string | null
    usuarioId: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CampoCountAggregateOutputType = {
    id: number
    nombre: number
    hectareas: number
    ubicacion: number
    propietario: number
    usuarioId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CampoAvgAggregateInputType = {
    id?: true
    hectareas?: true
    usuarioId?: true
  }

  export type CampoSumAggregateInputType = {
    id?: true
    hectareas?: true
    usuarioId?: true
  }

  export type CampoMinAggregateInputType = {
    id?: true
    nombre?: true
    hectareas?: true
    ubicacion?: true
    propietario?: true
    usuarioId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CampoMaxAggregateInputType = {
    id?: true
    nombre?: true
    hectareas?: true
    ubicacion?: true
    propietario?: true
    usuarioId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CampoCountAggregateInputType = {
    id?: true
    nombre?: true
    hectareas?: true
    ubicacion?: true
    propietario?: true
    usuarioId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CampoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Campo to aggregate.
     */
    where?: CampoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Campos to fetch.
     */
    orderBy?: CampoOrderByWithRelationInput | CampoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CampoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Campos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Campos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Campos
    **/
    _count?: true | CampoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CampoAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CampoSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CampoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CampoMaxAggregateInputType
  }

  export type GetCampoAggregateType<T extends CampoAggregateArgs> = {
        [P in keyof T & keyof AggregateCampo]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCampo[P]>
      : GetScalarType<T[P], AggregateCampo[P]>
  }




  export type CampoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CampoWhereInput
    orderBy?: CampoOrderByWithAggregationInput | CampoOrderByWithAggregationInput[]
    by: CampoScalarFieldEnum[] | CampoScalarFieldEnum
    having?: CampoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CampoCountAggregateInputType | true
    _avg?: CampoAvgAggregateInputType
    _sum?: CampoSumAggregateInputType
    _min?: CampoMinAggregateInputType
    _max?: CampoMaxAggregateInputType
  }

  export type CampoGroupByOutputType = {
    id: number
    nombre: string
    hectareas: number
    ubicacion: string | null
    propietario: string | null
    usuarioId: number
    createdAt: Date
    updatedAt: Date
    _count: CampoCountAggregateOutputType | null
    _avg: CampoAvgAggregateOutputType | null
    _sum: CampoSumAggregateOutputType | null
    _min: CampoMinAggregateOutputType | null
    _max: CampoMaxAggregateOutputType | null
  }

  type GetCampoGroupByPayload<T extends CampoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CampoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CampoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CampoGroupByOutputType[P]>
            : GetScalarType<T[P], CampoGroupByOutputType[P]>
        }
      >
    >


  export type CampoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    hectareas?: boolean
    ubicacion?: boolean
    propietario?: boolean
    usuarioId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
    lotes?: boolean | Campo$lotesArgs<ExtArgs>
    tareas?: boolean | Campo$tareasArgs<ExtArgs>
    movimentos?: boolean | Campo$movimentosArgs<ExtArgs>
    _count?: boolean | CampoCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["campo"]>

  export type CampoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    hectareas?: boolean
    ubicacion?: boolean
    propietario?: boolean
    usuarioId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["campo"]>

  export type CampoSelectScalar = {
    id?: boolean
    nombre?: boolean
    hectareas?: boolean
    ubicacion?: boolean
    propietario?: boolean
    usuarioId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CampoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
    lotes?: boolean | Campo$lotesArgs<ExtArgs>
    tareas?: boolean | Campo$tareasArgs<ExtArgs>
    movimentos?: boolean | Campo$movimentosArgs<ExtArgs>
    _count?: boolean | CampoCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CampoIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
  }

  export type $CampoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Campo"
    objects: {
      usuario: Prisma.$UsuarioPayload<ExtArgs>
      lotes: Prisma.$LotePayload<ExtArgs>[]
      tareas: Prisma.$TareaRuralPayload<ExtArgs>[]
      movimentos: Prisma.$MovimientoFinancieroPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      nombre: string
      hectareas: number
      ubicacion: string | null
      propietario: string | null
      usuarioId: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["campo"]>
    composites: {}
  }

  type CampoGetPayload<S extends boolean | null | undefined | CampoDefaultArgs> = $Result.GetResult<Prisma.$CampoPayload, S>

  type CampoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<CampoFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: CampoCountAggregateInputType | true
    }

  export interface CampoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Campo'], meta: { name: 'Campo' } }
    /**
     * Find zero or one Campo that matches the filter.
     * @param {CampoFindUniqueArgs} args - Arguments to find a Campo
     * @example
     * // Get one Campo
     * const campo = await prisma.campo.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CampoFindUniqueArgs>(args: SelectSubset<T, CampoFindUniqueArgs<ExtArgs>>): Prisma__CampoClient<$Result.GetResult<Prisma.$CampoPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Campo that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {CampoFindUniqueOrThrowArgs} args - Arguments to find a Campo
     * @example
     * // Get one Campo
     * const campo = await prisma.campo.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CampoFindUniqueOrThrowArgs>(args: SelectSubset<T, CampoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CampoClient<$Result.GetResult<Prisma.$CampoPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Campo that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampoFindFirstArgs} args - Arguments to find a Campo
     * @example
     * // Get one Campo
     * const campo = await prisma.campo.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CampoFindFirstArgs>(args?: SelectSubset<T, CampoFindFirstArgs<ExtArgs>>): Prisma__CampoClient<$Result.GetResult<Prisma.$CampoPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Campo that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampoFindFirstOrThrowArgs} args - Arguments to find a Campo
     * @example
     * // Get one Campo
     * const campo = await prisma.campo.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CampoFindFirstOrThrowArgs>(args?: SelectSubset<T, CampoFindFirstOrThrowArgs<ExtArgs>>): Prisma__CampoClient<$Result.GetResult<Prisma.$CampoPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Campos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Campos
     * const campos = await prisma.campo.findMany()
     * 
     * // Get first 10 Campos
     * const campos = await prisma.campo.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const campoWithIdOnly = await prisma.campo.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CampoFindManyArgs>(args?: SelectSubset<T, CampoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CampoPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Campo.
     * @param {CampoCreateArgs} args - Arguments to create a Campo.
     * @example
     * // Create one Campo
     * const Campo = await prisma.campo.create({
     *   data: {
     *     // ... data to create a Campo
     *   }
     * })
     * 
     */
    create<T extends CampoCreateArgs>(args: SelectSubset<T, CampoCreateArgs<ExtArgs>>): Prisma__CampoClient<$Result.GetResult<Prisma.$CampoPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Campos.
     * @param {CampoCreateManyArgs} args - Arguments to create many Campos.
     * @example
     * // Create many Campos
     * const campo = await prisma.campo.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CampoCreateManyArgs>(args?: SelectSubset<T, CampoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Campos and returns the data saved in the database.
     * @param {CampoCreateManyAndReturnArgs} args - Arguments to create many Campos.
     * @example
     * // Create many Campos
     * const campo = await prisma.campo.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Campos and only return the `id`
     * const campoWithIdOnly = await prisma.campo.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CampoCreateManyAndReturnArgs>(args?: SelectSubset<T, CampoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CampoPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Campo.
     * @param {CampoDeleteArgs} args - Arguments to delete one Campo.
     * @example
     * // Delete one Campo
     * const Campo = await prisma.campo.delete({
     *   where: {
     *     // ... filter to delete one Campo
     *   }
     * })
     * 
     */
    delete<T extends CampoDeleteArgs>(args: SelectSubset<T, CampoDeleteArgs<ExtArgs>>): Prisma__CampoClient<$Result.GetResult<Prisma.$CampoPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Campo.
     * @param {CampoUpdateArgs} args - Arguments to update one Campo.
     * @example
     * // Update one Campo
     * const campo = await prisma.campo.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CampoUpdateArgs>(args: SelectSubset<T, CampoUpdateArgs<ExtArgs>>): Prisma__CampoClient<$Result.GetResult<Prisma.$CampoPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Campos.
     * @param {CampoDeleteManyArgs} args - Arguments to filter Campos to delete.
     * @example
     * // Delete a few Campos
     * const { count } = await prisma.campo.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CampoDeleteManyArgs>(args?: SelectSubset<T, CampoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Campos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Campos
     * const campo = await prisma.campo.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CampoUpdateManyArgs>(args: SelectSubset<T, CampoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Campo.
     * @param {CampoUpsertArgs} args - Arguments to update or create a Campo.
     * @example
     * // Update or create a Campo
     * const campo = await prisma.campo.upsert({
     *   create: {
     *     // ... data to create a Campo
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Campo we want to update
     *   }
     * })
     */
    upsert<T extends CampoUpsertArgs>(args: SelectSubset<T, CampoUpsertArgs<ExtArgs>>): Prisma__CampoClient<$Result.GetResult<Prisma.$CampoPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Campos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampoCountArgs} args - Arguments to filter Campos to count.
     * @example
     * // Count the number of Campos
     * const count = await prisma.campo.count({
     *   where: {
     *     // ... the filter for the Campos we want to count
     *   }
     * })
    **/
    count<T extends CampoCountArgs>(
      args?: Subset<T, CampoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CampoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Campo.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CampoAggregateArgs>(args: Subset<T, CampoAggregateArgs>): Prisma.PrismaPromise<GetCampoAggregateType<T>>

    /**
     * Group by Campo.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CampoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CampoGroupByArgs['orderBy'] }
        : { orderBy?: CampoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CampoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCampoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Campo model
   */
  readonly fields: CampoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Campo.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CampoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    usuario<T extends UsuarioDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UsuarioDefaultArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    lotes<T extends Campo$lotesArgs<ExtArgs> = {}>(args?: Subset<T, Campo$lotesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LotePayload<ExtArgs>, T, "findMany"> | Null>
    tareas<T extends Campo$tareasArgs<ExtArgs> = {}>(args?: Subset<T, Campo$tareasArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TareaRuralPayload<ExtArgs>, T, "findMany"> | Null>
    movimentos<T extends Campo$movimentosArgs<ExtArgs> = {}>(args?: Subset<T, Campo$movimentosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MovimientoFinancieroPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Campo model
   */ 
  interface CampoFieldRefs {
    readonly id: FieldRef<"Campo", 'Int'>
    readonly nombre: FieldRef<"Campo", 'String'>
    readonly hectareas: FieldRef<"Campo", 'Float'>
    readonly ubicacion: FieldRef<"Campo", 'String'>
    readonly propietario: FieldRef<"Campo", 'String'>
    readonly usuarioId: FieldRef<"Campo", 'Int'>
    readonly createdAt: FieldRef<"Campo", 'DateTime'>
    readonly updatedAt: FieldRef<"Campo", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Campo findUnique
   */
  export type CampoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campo
     */
    select?: CampoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampoInclude<ExtArgs> | null
    /**
     * Filter, which Campo to fetch.
     */
    where: CampoWhereUniqueInput
  }

  /**
   * Campo findUniqueOrThrow
   */
  export type CampoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campo
     */
    select?: CampoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampoInclude<ExtArgs> | null
    /**
     * Filter, which Campo to fetch.
     */
    where: CampoWhereUniqueInput
  }

  /**
   * Campo findFirst
   */
  export type CampoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campo
     */
    select?: CampoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampoInclude<ExtArgs> | null
    /**
     * Filter, which Campo to fetch.
     */
    where?: CampoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Campos to fetch.
     */
    orderBy?: CampoOrderByWithRelationInput | CampoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Campos.
     */
    cursor?: CampoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Campos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Campos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Campos.
     */
    distinct?: CampoScalarFieldEnum | CampoScalarFieldEnum[]
  }

  /**
   * Campo findFirstOrThrow
   */
  export type CampoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campo
     */
    select?: CampoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampoInclude<ExtArgs> | null
    /**
     * Filter, which Campo to fetch.
     */
    where?: CampoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Campos to fetch.
     */
    orderBy?: CampoOrderByWithRelationInput | CampoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Campos.
     */
    cursor?: CampoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Campos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Campos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Campos.
     */
    distinct?: CampoScalarFieldEnum | CampoScalarFieldEnum[]
  }

  /**
   * Campo findMany
   */
  export type CampoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campo
     */
    select?: CampoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampoInclude<ExtArgs> | null
    /**
     * Filter, which Campos to fetch.
     */
    where?: CampoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Campos to fetch.
     */
    orderBy?: CampoOrderByWithRelationInput | CampoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Campos.
     */
    cursor?: CampoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Campos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Campos.
     */
    skip?: number
    distinct?: CampoScalarFieldEnum | CampoScalarFieldEnum[]
  }

  /**
   * Campo create
   */
  export type CampoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campo
     */
    select?: CampoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampoInclude<ExtArgs> | null
    /**
     * The data needed to create a Campo.
     */
    data: XOR<CampoCreateInput, CampoUncheckedCreateInput>
  }

  /**
   * Campo createMany
   */
  export type CampoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Campos.
     */
    data: CampoCreateManyInput | CampoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Campo createManyAndReturn
   */
  export type CampoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campo
     */
    select?: CampoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Campos.
     */
    data: CampoCreateManyInput | CampoCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampoIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Campo update
   */
  export type CampoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campo
     */
    select?: CampoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampoInclude<ExtArgs> | null
    /**
     * The data needed to update a Campo.
     */
    data: XOR<CampoUpdateInput, CampoUncheckedUpdateInput>
    /**
     * Choose, which Campo to update.
     */
    where: CampoWhereUniqueInput
  }

  /**
   * Campo updateMany
   */
  export type CampoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Campos.
     */
    data: XOR<CampoUpdateManyMutationInput, CampoUncheckedUpdateManyInput>
    /**
     * Filter which Campos to update
     */
    where?: CampoWhereInput
  }

  /**
   * Campo upsert
   */
  export type CampoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campo
     */
    select?: CampoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampoInclude<ExtArgs> | null
    /**
     * The filter to search for the Campo to update in case it exists.
     */
    where: CampoWhereUniqueInput
    /**
     * In case the Campo found by the `where` argument doesn't exist, create a new Campo with this data.
     */
    create: XOR<CampoCreateInput, CampoUncheckedCreateInput>
    /**
     * In case the Campo was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CampoUpdateInput, CampoUncheckedUpdateInput>
  }

  /**
   * Campo delete
   */
  export type CampoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campo
     */
    select?: CampoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampoInclude<ExtArgs> | null
    /**
     * Filter which Campo to delete.
     */
    where: CampoWhereUniqueInput
  }

  /**
   * Campo deleteMany
   */
  export type CampoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Campos to delete
     */
    where?: CampoWhereInput
  }

  /**
   * Campo.lotes
   */
  export type Campo$lotesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lote
     */
    select?: LoteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoteInclude<ExtArgs> | null
    where?: LoteWhereInput
    orderBy?: LoteOrderByWithRelationInput | LoteOrderByWithRelationInput[]
    cursor?: LoteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LoteScalarFieldEnum | LoteScalarFieldEnum[]
  }

  /**
   * Campo.tareas
   */
  export type Campo$tareasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TareaRural
     */
    select?: TareaRuralSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TareaRuralInclude<ExtArgs> | null
    where?: TareaRuralWhereInput
    orderBy?: TareaRuralOrderByWithRelationInput | TareaRuralOrderByWithRelationInput[]
    cursor?: TareaRuralWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TareaRuralScalarFieldEnum | TareaRuralScalarFieldEnum[]
  }

  /**
   * Campo.movimentos
   */
  export type Campo$movimentosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MovimientoFinanciero
     */
    select?: MovimientoFinancieroSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovimientoFinancieroInclude<ExtArgs> | null
    where?: MovimientoFinancieroWhereInput
    orderBy?: MovimientoFinancieroOrderByWithRelationInput | MovimientoFinancieroOrderByWithRelationInput[]
    cursor?: MovimientoFinancieroWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MovimientoFinancieroScalarFieldEnum | MovimientoFinancieroScalarFieldEnum[]
  }

  /**
   * Campo without action
   */
  export type CampoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campo
     */
    select?: CampoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampoInclude<ExtArgs> | null
  }


  /**
   * Model Lote
   */

  export type AggregateLote = {
    _count: LoteCountAggregateOutputType | null
    _avg: LoteAvgAggregateOutputType | null
    _sum: LoteSumAggregateOutputType | null
    _min: LoteMinAggregateOutputType | null
    _max: LoteMaxAggregateOutputType | null
  }

  export type LoteAvgAggregateOutputType = {
    id: number | null
    hectareas: number | null
    campoId: number | null
  }

  export type LoteSumAggregateOutputType = {
    id: number | null
    hectareas: number | null
    campoId: number | null
  }

  export type LoteMinAggregateOutputType = {
    id: number | null
    nombre: string | null
    hectareas: number | null
    campoId: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type LoteMaxAggregateOutputType = {
    id: number | null
    nombre: string | null
    hectareas: number | null
    campoId: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type LoteCountAggregateOutputType = {
    id: number
    nombre: number
    hectareas: number
    campoId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type LoteAvgAggregateInputType = {
    id?: true
    hectareas?: true
    campoId?: true
  }

  export type LoteSumAggregateInputType = {
    id?: true
    hectareas?: true
    campoId?: true
  }

  export type LoteMinAggregateInputType = {
    id?: true
    nombre?: true
    hectareas?: true
    campoId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type LoteMaxAggregateInputType = {
    id?: true
    nombre?: true
    hectareas?: true
    campoId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type LoteCountAggregateInputType = {
    id?: true
    nombre?: true
    hectareas?: true
    campoId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type LoteAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Lote to aggregate.
     */
    where?: LoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Lotes to fetch.
     */
    orderBy?: LoteOrderByWithRelationInput | LoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Lotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Lotes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Lotes
    **/
    _count?: true | LoteCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LoteAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LoteSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LoteMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LoteMaxAggregateInputType
  }

  export type GetLoteAggregateType<T extends LoteAggregateArgs> = {
        [P in keyof T & keyof AggregateLote]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLote[P]>
      : GetScalarType<T[P], AggregateLote[P]>
  }




  export type LoteGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LoteWhereInput
    orderBy?: LoteOrderByWithAggregationInput | LoteOrderByWithAggregationInput[]
    by: LoteScalarFieldEnum[] | LoteScalarFieldEnum
    having?: LoteScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LoteCountAggregateInputType | true
    _avg?: LoteAvgAggregateInputType
    _sum?: LoteSumAggregateInputType
    _min?: LoteMinAggregateInputType
    _max?: LoteMaxAggregateInputType
  }

  export type LoteGroupByOutputType = {
    id: number
    nombre: string
    hectareas: number
    campoId: number
    createdAt: Date
    updatedAt: Date
    _count: LoteCountAggregateOutputType | null
    _avg: LoteAvgAggregateOutputType | null
    _sum: LoteSumAggregateOutputType | null
    _min: LoteMinAggregateOutputType | null
    _max: LoteMaxAggregateOutputType | null
  }

  type GetLoteGroupByPayload<T extends LoteGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LoteGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LoteGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LoteGroupByOutputType[P]>
            : GetScalarType<T[P], LoteGroupByOutputType[P]>
        }
      >
    >


  export type LoteSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    hectareas?: boolean
    campoId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    campo?: boolean | CampoDefaultArgs<ExtArgs>
    siembras?: boolean | Lote$siembrasArgs<ExtArgs>
    _count?: boolean | LoteCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["lote"]>

  export type LoteSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    hectareas?: boolean
    campoId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    campo?: boolean | CampoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["lote"]>

  export type LoteSelectScalar = {
    id?: boolean
    nombre?: boolean
    hectareas?: boolean
    campoId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type LoteInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    campo?: boolean | CampoDefaultArgs<ExtArgs>
    siembras?: boolean | Lote$siembrasArgs<ExtArgs>
    _count?: boolean | LoteCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type LoteIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    campo?: boolean | CampoDefaultArgs<ExtArgs>
  }

  export type $LotePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Lote"
    objects: {
      campo: Prisma.$CampoPayload<ExtArgs>
      siembras: Prisma.$SiembraPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      nombre: string
      hectareas: number
      campoId: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["lote"]>
    composites: {}
  }

  type LoteGetPayload<S extends boolean | null | undefined | LoteDefaultArgs> = $Result.GetResult<Prisma.$LotePayload, S>

  type LoteCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<LoteFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: LoteCountAggregateInputType | true
    }

  export interface LoteDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Lote'], meta: { name: 'Lote' } }
    /**
     * Find zero or one Lote that matches the filter.
     * @param {LoteFindUniqueArgs} args - Arguments to find a Lote
     * @example
     * // Get one Lote
     * const lote = await prisma.lote.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LoteFindUniqueArgs>(args: SelectSubset<T, LoteFindUniqueArgs<ExtArgs>>): Prisma__LoteClient<$Result.GetResult<Prisma.$LotePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Lote that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {LoteFindUniqueOrThrowArgs} args - Arguments to find a Lote
     * @example
     * // Get one Lote
     * const lote = await prisma.lote.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LoteFindUniqueOrThrowArgs>(args: SelectSubset<T, LoteFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LoteClient<$Result.GetResult<Prisma.$LotePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Lote that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoteFindFirstArgs} args - Arguments to find a Lote
     * @example
     * // Get one Lote
     * const lote = await prisma.lote.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LoteFindFirstArgs>(args?: SelectSubset<T, LoteFindFirstArgs<ExtArgs>>): Prisma__LoteClient<$Result.GetResult<Prisma.$LotePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Lote that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoteFindFirstOrThrowArgs} args - Arguments to find a Lote
     * @example
     * // Get one Lote
     * const lote = await prisma.lote.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LoteFindFirstOrThrowArgs>(args?: SelectSubset<T, LoteFindFirstOrThrowArgs<ExtArgs>>): Prisma__LoteClient<$Result.GetResult<Prisma.$LotePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Lotes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoteFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Lotes
     * const lotes = await prisma.lote.findMany()
     * 
     * // Get first 10 Lotes
     * const lotes = await prisma.lote.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const loteWithIdOnly = await prisma.lote.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LoteFindManyArgs>(args?: SelectSubset<T, LoteFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LotePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Lote.
     * @param {LoteCreateArgs} args - Arguments to create a Lote.
     * @example
     * // Create one Lote
     * const Lote = await prisma.lote.create({
     *   data: {
     *     // ... data to create a Lote
     *   }
     * })
     * 
     */
    create<T extends LoteCreateArgs>(args: SelectSubset<T, LoteCreateArgs<ExtArgs>>): Prisma__LoteClient<$Result.GetResult<Prisma.$LotePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Lotes.
     * @param {LoteCreateManyArgs} args - Arguments to create many Lotes.
     * @example
     * // Create many Lotes
     * const lote = await prisma.lote.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LoteCreateManyArgs>(args?: SelectSubset<T, LoteCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Lotes and returns the data saved in the database.
     * @param {LoteCreateManyAndReturnArgs} args - Arguments to create many Lotes.
     * @example
     * // Create many Lotes
     * const lote = await prisma.lote.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Lotes and only return the `id`
     * const loteWithIdOnly = await prisma.lote.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LoteCreateManyAndReturnArgs>(args?: SelectSubset<T, LoteCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LotePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Lote.
     * @param {LoteDeleteArgs} args - Arguments to delete one Lote.
     * @example
     * // Delete one Lote
     * const Lote = await prisma.lote.delete({
     *   where: {
     *     // ... filter to delete one Lote
     *   }
     * })
     * 
     */
    delete<T extends LoteDeleteArgs>(args: SelectSubset<T, LoteDeleteArgs<ExtArgs>>): Prisma__LoteClient<$Result.GetResult<Prisma.$LotePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Lote.
     * @param {LoteUpdateArgs} args - Arguments to update one Lote.
     * @example
     * // Update one Lote
     * const lote = await prisma.lote.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LoteUpdateArgs>(args: SelectSubset<T, LoteUpdateArgs<ExtArgs>>): Prisma__LoteClient<$Result.GetResult<Prisma.$LotePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Lotes.
     * @param {LoteDeleteManyArgs} args - Arguments to filter Lotes to delete.
     * @example
     * // Delete a few Lotes
     * const { count } = await prisma.lote.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LoteDeleteManyArgs>(args?: SelectSubset<T, LoteDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Lotes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoteUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Lotes
     * const lote = await prisma.lote.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LoteUpdateManyArgs>(args: SelectSubset<T, LoteUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Lote.
     * @param {LoteUpsertArgs} args - Arguments to update or create a Lote.
     * @example
     * // Update or create a Lote
     * const lote = await prisma.lote.upsert({
     *   create: {
     *     // ... data to create a Lote
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Lote we want to update
     *   }
     * })
     */
    upsert<T extends LoteUpsertArgs>(args: SelectSubset<T, LoteUpsertArgs<ExtArgs>>): Prisma__LoteClient<$Result.GetResult<Prisma.$LotePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Lotes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoteCountArgs} args - Arguments to filter Lotes to count.
     * @example
     * // Count the number of Lotes
     * const count = await prisma.lote.count({
     *   where: {
     *     // ... the filter for the Lotes we want to count
     *   }
     * })
    **/
    count<T extends LoteCountArgs>(
      args?: Subset<T, LoteCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LoteCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Lote.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoteAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LoteAggregateArgs>(args: Subset<T, LoteAggregateArgs>): Prisma.PrismaPromise<GetLoteAggregateType<T>>

    /**
     * Group by Lote.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoteGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LoteGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LoteGroupByArgs['orderBy'] }
        : { orderBy?: LoteGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LoteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLoteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Lote model
   */
  readonly fields: LoteFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Lote.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LoteClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    campo<T extends CampoDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CampoDefaultArgs<ExtArgs>>): Prisma__CampoClient<$Result.GetResult<Prisma.$CampoPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    siembras<T extends Lote$siembrasArgs<ExtArgs> = {}>(args?: Subset<T, Lote$siembrasArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SiembraPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Lote model
   */ 
  interface LoteFieldRefs {
    readonly id: FieldRef<"Lote", 'Int'>
    readonly nombre: FieldRef<"Lote", 'String'>
    readonly hectareas: FieldRef<"Lote", 'Float'>
    readonly campoId: FieldRef<"Lote", 'Int'>
    readonly createdAt: FieldRef<"Lote", 'DateTime'>
    readonly updatedAt: FieldRef<"Lote", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Lote findUnique
   */
  export type LoteFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lote
     */
    select?: LoteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoteInclude<ExtArgs> | null
    /**
     * Filter, which Lote to fetch.
     */
    where: LoteWhereUniqueInput
  }

  /**
   * Lote findUniqueOrThrow
   */
  export type LoteFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lote
     */
    select?: LoteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoteInclude<ExtArgs> | null
    /**
     * Filter, which Lote to fetch.
     */
    where: LoteWhereUniqueInput
  }

  /**
   * Lote findFirst
   */
  export type LoteFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lote
     */
    select?: LoteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoteInclude<ExtArgs> | null
    /**
     * Filter, which Lote to fetch.
     */
    where?: LoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Lotes to fetch.
     */
    orderBy?: LoteOrderByWithRelationInput | LoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Lotes.
     */
    cursor?: LoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Lotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Lotes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Lotes.
     */
    distinct?: LoteScalarFieldEnum | LoteScalarFieldEnum[]
  }

  /**
   * Lote findFirstOrThrow
   */
  export type LoteFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lote
     */
    select?: LoteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoteInclude<ExtArgs> | null
    /**
     * Filter, which Lote to fetch.
     */
    where?: LoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Lotes to fetch.
     */
    orderBy?: LoteOrderByWithRelationInput | LoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Lotes.
     */
    cursor?: LoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Lotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Lotes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Lotes.
     */
    distinct?: LoteScalarFieldEnum | LoteScalarFieldEnum[]
  }

  /**
   * Lote findMany
   */
  export type LoteFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lote
     */
    select?: LoteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoteInclude<ExtArgs> | null
    /**
     * Filter, which Lotes to fetch.
     */
    where?: LoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Lotes to fetch.
     */
    orderBy?: LoteOrderByWithRelationInput | LoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Lotes.
     */
    cursor?: LoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Lotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Lotes.
     */
    skip?: number
    distinct?: LoteScalarFieldEnum | LoteScalarFieldEnum[]
  }

  /**
   * Lote create
   */
  export type LoteCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lote
     */
    select?: LoteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoteInclude<ExtArgs> | null
    /**
     * The data needed to create a Lote.
     */
    data: XOR<LoteCreateInput, LoteUncheckedCreateInput>
  }

  /**
   * Lote createMany
   */
  export type LoteCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Lotes.
     */
    data: LoteCreateManyInput | LoteCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Lote createManyAndReturn
   */
  export type LoteCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lote
     */
    select?: LoteSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Lotes.
     */
    data: LoteCreateManyInput | LoteCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoteIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Lote update
   */
  export type LoteUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lote
     */
    select?: LoteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoteInclude<ExtArgs> | null
    /**
     * The data needed to update a Lote.
     */
    data: XOR<LoteUpdateInput, LoteUncheckedUpdateInput>
    /**
     * Choose, which Lote to update.
     */
    where: LoteWhereUniqueInput
  }

  /**
   * Lote updateMany
   */
  export type LoteUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Lotes.
     */
    data: XOR<LoteUpdateManyMutationInput, LoteUncheckedUpdateManyInput>
    /**
     * Filter which Lotes to update
     */
    where?: LoteWhereInput
  }

  /**
   * Lote upsert
   */
  export type LoteUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lote
     */
    select?: LoteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoteInclude<ExtArgs> | null
    /**
     * The filter to search for the Lote to update in case it exists.
     */
    where: LoteWhereUniqueInput
    /**
     * In case the Lote found by the `where` argument doesn't exist, create a new Lote with this data.
     */
    create: XOR<LoteCreateInput, LoteUncheckedCreateInput>
    /**
     * In case the Lote was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LoteUpdateInput, LoteUncheckedUpdateInput>
  }

  /**
   * Lote delete
   */
  export type LoteDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lote
     */
    select?: LoteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoteInclude<ExtArgs> | null
    /**
     * Filter which Lote to delete.
     */
    where: LoteWhereUniqueInput
  }

  /**
   * Lote deleteMany
   */
  export type LoteDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Lotes to delete
     */
    where?: LoteWhereInput
  }

  /**
   * Lote.siembras
   */
  export type Lote$siembrasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Siembra
     */
    select?: SiembraSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SiembraInclude<ExtArgs> | null
    where?: SiembraWhereInput
    orderBy?: SiembraOrderByWithRelationInput | SiembraOrderByWithRelationInput[]
    cursor?: SiembraWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SiembraScalarFieldEnum | SiembraScalarFieldEnum[]
  }

  /**
   * Lote without action
   */
  export type LoteDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lote
     */
    select?: LoteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoteInclude<ExtArgs> | null
  }


  /**
   * Model TipoCultivo
   */

  export type AggregateTipoCultivo = {
    _count: TipoCultivoCountAggregateOutputType | null
    _avg: TipoCultivoAvgAggregateOutputType | null
    _sum: TipoCultivoSumAggregateOutputType | null
    _min: TipoCultivoMinAggregateOutputType | null
    _max: TipoCultivoMaxAggregateOutputType | null
  }

  export type TipoCultivoAvgAggregateOutputType = {
    id: number | null
  }

  export type TipoCultivoSumAggregateOutputType = {
    id: number | null
  }

  export type TipoCultivoMinAggregateOutputType = {
    id: number | null
    nombre: string | null
    descripcion: string | null
    createdAt: Date | null
  }

  export type TipoCultivoMaxAggregateOutputType = {
    id: number | null
    nombre: string | null
    descripcion: string | null
    createdAt: Date | null
  }

  export type TipoCultivoCountAggregateOutputType = {
    id: number
    nombre: number
    descripcion: number
    createdAt: number
    _all: number
  }


  export type TipoCultivoAvgAggregateInputType = {
    id?: true
  }

  export type TipoCultivoSumAggregateInputType = {
    id?: true
  }

  export type TipoCultivoMinAggregateInputType = {
    id?: true
    nombre?: true
    descripcion?: true
    createdAt?: true
  }

  export type TipoCultivoMaxAggregateInputType = {
    id?: true
    nombre?: true
    descripcion?: true
    createdAt?: true
  }

  export type TipoCultivoCountAggregateInputType = {
    id?: true
    nombre?: true
    descripcion?: true
    createdAt?: true
    _all?: true
  }

  export type TipoCultivoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TipoCultivo to aggregate.
     */
    where?: TipoCultivoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TipoCultivos to fetch.
     */
    orderBy?: TipoCultivoOrderByWithRelationInput | TipoCultivoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TipoCultivoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TipoCultivos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TipoCultivos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TipoCultivos
    **/
    _count?: true | TipoCultivoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TipoCultivoAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TipoCultivoSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TipoCultivoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TipoCultivoMaxAggregateInputType
  }

  export type GetTipoCultivoAggregateType<T extends TipoCultivoAggregateArgs> = {
        [P in keyof T & keyof AggregateTipoCultivo]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTipoCultivo[P]>
      : GetScalarType<T[P], AggregateTipoCultivo[P]>
  }




  export type TipoCultivoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TipoCultivoWhereInput
    orderBy?: TipoCultivoOrderByWithAggregationInput | TipoCultivoOrderByWithAggregationInput[]
    by: TipoCultivoScalarFieldEnum[] | TipoCultivoScalarFieldEnum
    having?: TipoCultivoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TipoCultivoCountAggregateInputType | true
    _avg?: TipoCultivoAvgAggregateInputType
    _sum?: TipoCultivoSumAggregateInputType
    _min?: TipoCultivoMinAggregateInputType
    _max?: TipoCultivoMaxAggregateInputType
  }

  export type TipoCultivoGroupByOutputType = {
    id: number
    nombre: string
    descripcion: string | null
    createdAt: Date
    _count: TipoCultivoCountAggregateOutputType | null
    _avg: TipoCultivoAvgAggregateOutputType | null
    _sum: TipoCultivoSumAggregateOutputType | null
    _min: TipoCultivoMinAggregateOutputType | null
    _max: TipoCultivoMaxAggregateOutputType | null
  }

  type GetTipoCultivoGroupByPayload<T extends TipoCultivoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TipoCultivoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TipoCultivoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TipoCultivoGroupByOutputType[P]>
            : GetScalarType<T[P], TipoCultivoGroupByOutputType[P]>
        }
      >
    >


  export type TipoCultivoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    descripcion?: boolean
    createdAt?: boolean
    siembras?: boolean | TipoCultivo$siembrasArgs<ExtArgs>
    _count?: boolean | TipoCultivoCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tipoCultivo"]>

  export type TipoCultivoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    descripcion?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["tipoCultivo"]>

  export type TipoCultivoSelectScalar = {
    id?: boolean
    nombre?: boolean
    descripcion?: boolean
    createdAt?: boolean
  }

  export type TipoCultivoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    siembras?: boolean | TipoCultivo$siembrasArgs<ExtArgs>
    _count?: boolean | TipoCultivoCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TipoCultivoIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $TipoCultivoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TipoCultivo"
    objects: {
      siembras: Prisma.$SiembraPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      nombre: string
      descripcion: string | null
      createdAt: Date
    }, ExtArgs["result"]["tipoCultivo"]>
    composites: {}
  }

  type TipoCultivoGetPayload<S extends boolean | null | undefined | TipoCultivoDefaultArgs> = $Result.GetResult<Prisma.$TipoCultivoPayload, S>

  type TipoCultivoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<TipoCultivoFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: TipoCultivoCountAggregateInputType | true
    }

  export interface TipoCultivoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TipoCultivo'], meta: { name: 'TipoCultivo' } }
    /**
     * Find zero or one TipoCultivo that matches the filter.
     * @param {TipoCultivoFindUniqueArgs} args - Arguments to find a TipoCultivo
     * @example
     * // Get one TipoCultivo
     * const tipoCultivo = await prisma.tipoCultivo.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TipoCultivoFindUniqueArgs>(args: SelectSubset<T, TipoCultivoFindUniqueArgs<ExtArgs>>): Prisma__TipoCultivoClient<$Result.GetResult<Prisma.$TipoCultivoPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one TipoCultivo that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {TipoCultivoFindUniqueOrThrowArgs} args - Arguments to find a TipoCultivo
     * @example
     * // Get one TipoCultivo
     * const tipoCultivo = await prisma.tipoCultivo.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TipoCultivoFindUniqueOrThrowArgs>(args: SelectSubset<T, TipoCultivoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TipoCultivoClient<$Result.GetResult<Prisma.$TipoCultivoPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first TipoCultivo that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TipoCultivoFindFirstArgs} args - Arguments to find a TipoCultivo
     * @example
     * // Get one TipoCultivo
     * const tipoCultivo = await prisma.tipoCultivo.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TipoCultivoFindFirstArgs>(args?: SelectSubset<T, TipoCultivoFindFirstArgs<ExtArgs>>): Prisma__TipoCultivoClient<$Result.GetResult<Prisma.$TipoCultivoPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first TipoCultivo that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TipoCultivoFindFirstOrThrowArgs} args - Arguments to find a TipoCultivo
     * @example
     * // Get one TipoCultivo
     * const tipoCultivo = await prisma.tipoCultivo.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TipoCultivoFindFirstOrThrowArgs>(args?: SelectSubset<T, TipoCultivoFindFirstOrThrowArgs<ExtArgs>>): Prisma__TipoCultivoClient<$Result.GetResult<Prisma.$TipoCultivoPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more TipoCultivos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TipoCultivoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TipoCultivos
     * const tipoCultivos = await prisma.tipoCultivo.findMany()
     * 
     * // Get first 10 TipoCultivos
     * const tipoCultivos = await prisma.tipoCultivo.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tipoCultivoWithIdOnly = await prisma.tipoCultivo.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TipoCultivoFindManyArgs>(args?: SelectSubset<T, TipoCultivoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TipoCultivoPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a TipoCultivo.
     * @param {TipoCultivoCreateArgs} args - Arguments to create a TipoCultivo.
     * @example
     * // Create one TipoCultivo
     * const TipoCultivo = await prisma.tipoCultivo.create({
     *   data: {
     *     // ... data to create a TipoCultivo
     *   }
     * })
     * 
     */
    create<T extends TipoCultivoCreateArgs>(args: SelectSubset<T, TipoCultivoCreateArgs<ExtArgs>>): Prisma__TipoCultivoClient<$Result.GetResult<Prisma.$TipoCultivoPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many TipoCultivos.
     * @param {TipoCultivoCreateManyArgs} args - Arguments to create many TipoCultivos.
     * @example
     * // Create many TipoCultivos
     * const tipoCultivo = await prisma.tipoCultivo.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TipoCultivoCreateManyArgs>(args?: SelectSubset<T, TipoCultivoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TipoCultivos and returns the data saved in the database.
     * @param {TipoCultivoCreateManyAndReturnArgs} args - Arguments to create many TipoCultivos.
     * @example
     * // Create many TipoCultivos
     * const tipoCultivo = await prisma.tipoCultivo.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TipoCultivos and only return the `id`
     * const tipoCultivoWithIdOnly = await prisma.tipoCultivo.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TipoCultivoCreateManyAndReturnArgs>(args?: SelectSubset<T, TipoCultivoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TipoCultivoPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a TipoCultivo.
     * @param {TipoCultivoDeleteArgs} args - Arguments to delete one TipoCultivo.
     * @example
     * // Delete one TipoCultivo
     * const TipoCultivo = await prisma.tipoCultivo.delete({
     *   where: {
     *     // ... filter to delete one TipoCultivo
     *   }
     * })
     * 
     */
    delete<T extends TipoCultivoDeleteArgs>(args: SelectSubset<T, TipoCultivoDeleteArgs<ExtArgs>>): Prisma__TipoCultivoClient<$Result.GetResult<Prisma.$TipoCultivoPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one TipoCultivo.
     * @param {TipoCultivoUpdateArgs} args - Arguments to update one TipoCultivo.
     * @example
     * // Update one TipoCultivo
     * const tipoCultivo = await prisma.tipoCultivo.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TipoCultivoUpdateArgs>(args: SelectSubset<T, TipoCultivoUpdateArgs<ExtArgs>>): Prisma__TipoCultivoClient<$Result.GetResult<Prisma.$TipoCultivoPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more TipoCultivos.
     * @param {TipoCultivoDeleteManyArgs} args - Arguments to filter TipoCultivos to delete.
     * @example
     * // Delete a few TipoCultivos
     * const { count } = await prisma.tipoCultivo.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TipoCultivoDeleteManyArgs>(args?: SelectSubset<T, TipoCultivoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TipoCultivos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TipoCultivoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TipoCultivos
     * const tipoCultivo = await prisma.tipoCultivo.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TipoCultivoUpdateManyArgs>(args: SelectSubset<T, TipoCultivoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one TipoCultivo.
     * @param {TipoCultivoUpsertArgs} args - Arguments to update or create a TipoCultivo.
     * @example
     * // Update or create a TipoCultivo
     * const tipoCultivo = await prisma.tipoCultivo.upsert({
     *   create: {
     *     // ... data to create a TipoCultivo
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TipoCultivo we want to update
     *   }
     * })
     */
    upsert<T extends TipoCultivoUpsertArgs>(args: SelectSubset<T, TipoCultivoUpsertArgs<ExtArgs>>): Prisma__TipoCultivoClient<$Result.GetResult<Prisma.$TipoCultivoPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of TipoCultivos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TipoCultivoCountArgs} args - Arguments to filter TipoCultivos to count.
     * @example
     * // Count the number of TipoCultivos
     * const count = await prisma.tipoCultivo.count({
     *   where: {
     *     // ... the filter for the TipoCultivos we want to count
     *   }
     * })
    **/
    count<T extends TipoCultivoCountArgs>(
      args?: Subset<T, TipoCultivoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TipoCultivoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TipoCultivo.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TipoCultivoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TipoCultivoAggregateArgs>(args: Subset<T, TipoCultivoAggregateArgs>): Prisma.PrismaPromise<GetTipoCultivoAggregateType<T>>

    /**
     * Group by TipoCultivo.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TipoCultivoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TipoCultivoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TipoCultivoGroupByArgs['orderBy'] }
        : { orderBy?: TipoCultivoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TipoCultivoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTipoCultivoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TipoCultivo model
   */
  readonly fields: TipoCultivoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TipoCultivo.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TipoCultivoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    siembras<T extends TipoCultivo$siembrasArgs<ExtArgs> = {}>(args?: Subset<T, TipoCultivo$siembrasArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SiembraPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TipoCultivo model
   */ 
  interface TipoCultivoFieldRefs {
    readonly id: FieldRef<"TipoCultivo", 'Int'>
    readonly nombre: FieldRef<"TipoCultivo", 'String'>
    readonly descripcion: FieldRef<"TipoCultivo", 'String'>
    readonly createdAt: FieldRef<"TipoCultivo", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * TipoCultivo findUnique
   */
  export type TipoCultivoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TipoCultivo
     */
    select?: TipoCultivoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TipoCultivoInclude<ExtArgs> | null
    /**
     * Filter, which TipoCultivo to fetch.
     */
    where: TipoCultivoWhereUniqueInput
  }

  /**
   * TipoCultivo findUniqueOrThrow
   */
  export type TipoCultivoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TipoCultivo
     */
    select?: TipoCultivoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TipoCultivoInclude<ExtArgs> | null
    /**
     * Filter, which TipoCultivo to fetch.
     */
    where: TipoCultivoWhereUniqueInput
  }

  /**
   * TipoCultivo findFirst
   */
  export type TipoCultivoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TipoCultivo
     */
    select?: TipoCultivoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TipoCultivoInclude<ExtArgs> | null
    /**
     * Filter, which TipoCultivo to fetch.
     */
    where?: TipoCultivoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TipoCultivos to fetch.
     */
    orderBy?: TipoCultivoOrderByWithRelationInput | TipoCultivoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TipoCultivos.
     */
    cursor?: TipoCultivoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TipoCultivos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TipoCultivos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TipoCultivos.
     */
    distinct?: TipoCultivoScalarFieldEnum | TipoCultivoScalarFieldEnum[]
  }

  /**
   * TipoCultivo findFirstOrThrow
   */
  export type TipoCultivoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TipoCultivo
     */
    select?: TipoCultivoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TipoCultivoInclude<ExtArgs> | null
    /**
     * Filter, which TipoCultivo to fetch.
     */
    where?: TipoCultivoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TipoCultivos to fetch.
     */
    orderBy?: TipoCultivoOrderByWithRelationInput | TipoCultivoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TipoCultivos.
     */
    cursor?: TipoCultivoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TipoCultivos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TipoCultivos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TipoCultivos.
     */
    distinct?: TipoCultivoScalarFieldEnum | TipoCultivoScalarFieldEnum[]
  }

  /**
   * TipoCultivo findMany
   */
  export type TipoCultivoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TipoCultivo
     */
    select?: TipoCultivoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TipoCultivoInclude<ExtArgs> | null
    /**
     * Filter, which TipoCultivos to fetch.
     */
    where?: TipoCultivoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TipoCultivos to fetch.
     */
    orderBy?: TipoCultivoOrderByWithRelationInput | TipoCultivoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TipoCultivos.
     */
    cursor?: TipoCultivoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TipoCultivos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TipoCultivos.
     */
    skip?: number
    distinct?: TipoCultivoScalarFieldEnum | TipoCultivoScalarFieldEnum[]
  }

  /**
   * TipoCultivo create
   */
  export type TipoCultivoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TipoCultivo
     */
    select?: TipoCultivoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TipoCultivoInclude<ExtArgs> | null
    /**
     * The data needed to create a TipoCultivo.
     */
    data: XOR<TipoCultivoCreateInput, TipoCultivoUncheckedCreateInput>
  }

  /**
   * TipoCultivo createMany
   */
  export type TipoCultivoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TipoCultivos.
     */
    data: TipoCultivoCreateManyInput | TipoCultivoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TipoCultivo createManyAndReturn
   */
  export type TipoCultivoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TipoCultivo
     */
    select?: TipoCultivoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many TipoCultivos.
     */
    data: TipoCultivoCreateManyInput | TipoCultivoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TipoCultivo update
   */
  export type TipoCultivoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TipoCultivo
     */
    select?: TipoCultivoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TipoCultivoInclude<ExtArgs> | null
    /**
     * The data needed to update a TipoCultivo.
     */
    data: XOR<TipoCultivoUpdateInput, TipoCultivoUncheckedUpdateInput>
    /**
     * Choose, which TipoCultivo to update.
     */
    where: TipoCultivoWhereUniqueInput
  }

  /**
   * TipoCultivo updateMany
   */
  export type TipoCultivoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TipoCultivos.
     */
    data: XOR<TipoCultivoUpdateManyMutationInput, TipoCultivoUncheckedUpdateManyInput>
    /**
     * Filter which TipoCultivos to update
     */
    where?: TipoCultivoWhereInput
  }

  /**
   * TipoCultivo upsert
   */
  export type TipoCultivoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TipoCultivo
     */
    select?: TipoCultivoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TipoCultivoInclude<ExtArgs> | null
    /**
     * The filter to search for the TipoCultivo to update in case it exists.
     */
    where: TipoCultivoWhereUniqueInput
    /**
     * In case the TipoCultivo found by the `where` argument doesn't exist, create a new TipoCultivo with this data.
     */
    create: XOR<TipoCultivoCreateInput, TipoCultivoUncheckedCreateInput>
    /**
     * In case the TipoCultivo was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TipoCultivoUpdateInput, TipoCultivoUncheckedUpdateInput>
  }

  /**
   * TipoCultivo delete
   */
  export type TipoCultivoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TipoCultivo
     */
    select?: TipoCultivoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TipoCultivoInclude<ExtArgs> | null
    /**
     * Filter which TipoCultivo to delete.
     */
    where: TipoCultivoWhereUniqueInput
  }

  /**
   * TipoCultivo deleteMany
   */
  export type TipoCultivoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TipoCultivos to delete
     */
    where?: TipoCultivoWhereInput
  }

  /**
   * TipoCultivo.siembras
   */
  export type TipoCultivo$siembrasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Siembra
     */
    select?: SiembraSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SiembraInclude<ExtArgs> | null
    where?: SiembraWhereInput
    orderBy?: SiembraOrderByWithRelationInput | SiembraOrderByWithRelationInput[]
    cursor?: SiembraWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SiembraScalarFieldEnum | SiembraScalarFieldEnum[]
  }

  /**
   * TipoCultivo without action
   */
  export type TipoCultivoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TipoCultivo
     */
    select?: TipoCultivoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TipoCultivoInclude<ExtArgs> | null
  }


  /**
   * Model Siembra
   */

  export type AggregateSiembra = {
    _count: SiembraCountAggregateOutputType | null
    _avg: SiembraAvgAggregateOutputType | null
    _sum: SiembraSumAggregateOutputType | null
    _min: SiembraMinAggregateOutputType | null
    _max: SiembraMaxAggregateOutputType | null
  }

  export type SiembraAvgAggregateOutputType = {
    id: number | null
    loteId: number | null
    tipoCultivoId: number | null
    densidad: number | null
    campaniaId: number | null
  }

  export type SiembraSumAggregateOutputType = {
    id: number | null
    loteId: number | null
    tipoCultivoId: number | null
    densidad: number | null
    campaniaId: number | null
  }

  export type SiembraMinAggregateOutputType = {
    id: number | null
    loteId: number | null
    tipoCultivoId: number | null
    fechaSiembra: Date | null
    densidad: number | null
    observaciones: string | null
    estado: $Enums.EstadoSiembra | null
    createdAt: Date | null
    updatedAt: Date | null
    campaniaId: number | null
  }

  export type SiembraMaxAggregateOutputType = {
    id: number | null
    loteId: number | null
    tipoCultivoId: number | null
    fechaSiembra: Date | null
    densidad: number | null
    observaciones: string | null
    estado: $Enums.EstadoSiembra | null
    createdAt: Date | null
    updatedAt: Date | null
    campaniaId: number | null
  }

  export type SiembraCountAggregateOutputType = {
    id: number
    loteId: number
    tipoCultivoId: number
    fechaSiembra: number
    densidad: number
    observaciones: number
    estado: number
    createdAt: number
    updatedAt: number
    campaniaId: number
    _all: number
  }


  export type SiembraAvgAggregateInputType = {
    id?: true
    loteId?: true
    tipoCultivoId?: true
    densidad?: true
    campaniaId?: true
  }

  export type SiembraSumAggregateInputType = {
    id?: true
    loteId?: true
    tipoCultivoId?: true
    densidad?: true
    campaniaId?: true
  }

  export type SiembraMinAggregateInputType = {
    id?: true
    loteId?: true
    tipoCultivoId?: true
    fechaSiembra?: true
    densidad?: true
    observaciones?: true
    estado?: true
    createdAt?: true
    updatedAt?: true
    campaniaId?: true
  }

  export type SiembraMaxAggregateInputType = {
    id?: true
    loteId?: true
    tipoCultivoId?: true
    fechaSiembra?: true
    densidad?: true
    observaciones?: true
    estado?: true
    createdAt?: true
    updatedAt?: true
    campaniaId?: true
  }

  export type SiembraCountAggregateInputType = {
    id?: true
    loteId?: true
    tipoCultivoId?: true
    fechaSiembra?: true
    densidad?: true
    observaciones?: true
    estado?: true
    createdAt?: true
    updatedAt?: true
    campaniaId?: true
    _all?: true
  }

  export type SiembraAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Siembra to aggregate.
     */
    where?: SiembraWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Siembras to fetch.
     */
    orderBy?: SiembraOrderByWithRelationInput | SiembraOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SiembraWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Siembras from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Siembras.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Siembras
    **/
    _count?: true | SiembraCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SiembraAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SiembraSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SiembraMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SiembraMaxAggregateInputType
  }

  export type GetSiembraAggregateType<T extends SiembraAggregateArgs> = {
        [P in keyof T & keyof AggregateSiembra]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSiembra[P]>
      : GetScalarType<T[P], AggregateSiembra[P]>
  }




  export type SiembraGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SiembraWhereInput
    orderBy?: SiembraOrderByWithAggregationInput | SiembraOrderByWithAggregationInput[]
    by: SiembraScalarFieldEnum[] | SiembraScalarFieldEnum
    having?: SiembraScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SiembraCountAggregateInputType | true
    _avg?: SiembraAvgAggregateInputType
    _sum?: SiembraSumAggregateInputType
    _min?: SiembraMinAggregateInputType
    _max?: SiembraMaxAggregateInputType
  }

  export type SiembraGroupByOutputType = {
    id: number
    loteId: number
    tipoCultivoId: number
    fechaSiembra: Date
    densidad: number | null
    observaciones: string | null
    estado: $Enums.EstadoSiembra
    createdAt: Date
    updatedAt: Date
    campaniaId: number | null
    _count: SiembraCountAggregateOutputType | null
    _avg: SiembraAvgAggregateOutputType | null
    _sum: SiembraSumAggregateOutputType | null
    _min: SiembraMinAggregateOutputType | null
    _max: SiembraMaxAggregateOutputType | null
  }

  type GetSiembraGroupByPayload<T extends SiembraGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SiembraGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SiembraGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SiembraGroupByOutputType[P]>
            : GetScalarType<T[P], SiembraGroupByOutputType[P]>
        }
      >
    >


  export type SiembraSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    loteId?: boolean
    tipoCultivoId?: boolean
    fechaSiembra?: boolean
    densidad?: boolean
    observaciones?: boolean
    estado?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    campaniaId?: boolean
    lote?: boolean | LoteDefaultArgs<ExtArgs>
    tipoCultivo?: boolean | TipoCultivoDefaultArgs<ExtArgs>
    cosechas?: boolean | Siembra$cosechasArgs<ExtArgs>
    aplicaciones?: boolean | Siembra$aplicacionesArgs<ExtArgs>
    movimentos?: boolean | Siembra$movimentosArgs<ExtArgs>
    campania?: boolean | Siembra$campaniaArgs<ExtArgs>
    _count?: boolean | SiembraCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["siembra"]>

  export type SiembraSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    loteId?: boolean
    tipoCultivoId?: boolean
    fechaSiembra?: boolean
    densidad?: boolean
    observaciones?: boolean
    estado?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    campaniaId?: boolean
    lote?: boolean | LoteDefaultArgs<ExtArgs>
    tipoCultivo?: boolean | TipoCultivoDefaultArgs<ExtArgs>
    campania?: boolean | Siembra$campaniaArgs<ExtArgs>
  }, ExtArgs["result"]["siembra"]>

  export type SiembraSelectScalar = {
    id?: boolean
    loteId?: boolean
    tipoCultivoId?: boolean
    fechaSiembra?: boolean
    densidad?: boolean
    observaciones?: boolean
    estado?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    campaniaId?: boolean
  }

  export type SiembraInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    lote?: boolean | LoteDefaultArgs<ExtArgs>
    tipoCultivo?: boolean | TipoCultivoDefaultArgs<ExtArgs>
    cosechas?: boolean | Siembra$cosechasArgs<ExtArgs>
    aplicaciones?: boolean | Siembra$aplicacionesArgs<ExtArgs>
    movimentos?: boolean | Siembra$movimentosArgs<ExtArgs>
    campania?: boolean | Siembra$campaniaArgs<ExtArgs>
    _count?: boolean | SiembraCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type SiembraIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    lote?: boolean | LoteDefaultArgs<ExtArgs>
    tipoCultivo?: boolean | TipoCultivoDefaultArgs<ExtArgs>
    campania?: boolean | Siembra$campaniaArgs<ExtArgs>
  }

  export type $SiembraPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Siembra"
    objects: {
      lote: Prisma.$LotePayload<ExtArgs>
      tipoCultivo: Prisma.$TipoCultivoPayload<ExtArgs>
      cosechas: Prisma.$CosechaPayload<ExtArgs>[]
      aplicaciones: Prisma.$AplicacionInsumoPayload<ExtArgs>[]
      movimentos: Prisma.$MovimientoFinancieroPayload<ExtArgs>[]
      campania: Prisma.$CampaniaPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      loteId: number
      tipoCultivoId: number
      fechaSiembra: Date
      densidad: number | null
      observaciones: string | null
      estado: $Enums.EstadoSiembra
      createdAt: Date
      updatedAt: Date
      campaniaId: number | null
    }, ExtArgs["result"]["siembra"]>
    composites: {}
  }

  type SiembraGetPayload<S extends boolean | null | undefined | SiembraDefaultArgs> = $Result.GetResult<Prisma.$SiembraPayload, S>

  type SiembraCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<SiembraFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: SiembraCountAggregateInputType | true
    }

  export interface SiembraDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Siembra'], meta: { name: 'Siembra' } }
    /**
     * Find zero or one Siembra that matches the filter.
     * @param {SiembraFindUniqueArgs} args - Arguments to find a Siembra
     * @example
     * // Get one Siembra
     * const siembra = await prisma.siembra.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SiembraFindUniqueArgs>(args: SelectSubset<T, SiembraFindUniqueArgs<ExtArgs>>): Prisma__SiembraClient<$Result.GetResult<Prisma.$SiembraPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Siembra that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {SiembraFindUniqueOrThrowArgs} args - Arguments to find a Siembra
     * @example
     * // Get one Siembra
     * const siembra = await prisma.siembra.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SiembraFindUniqueOrThrowArgs>(args: SelectSubset<T, SiembraFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SiembraClient<$Result.GetResult<Prisma.$SiembraPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Siembra that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SiembraFindFirstArgs} args - Arguments to find a Siembra
     * @example
     * // Get one Siembra
     * const siembra = await prisma.siembra.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SiembraFindFirstArgs>(args?: SelectSubset<T, SiembraFindFirstArgs<ExtArgs>>): Prisma__SiembraClient<$Result.GetResult<Prisma.$SiembraPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Siembra that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SiembraFindFirstOrThrowArgs} args - Arguments to find a Siembra
     * @example
     * // Get one Siembra
     * const siembra = await prisma.siembra.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SiembraFindFirstOrThrowArgs>(args?: SelectSubset<T, SiembraFindFirstOrThrowArgs<ExtArgs>>): Prisma__SiembraClient<$Result.GetResult<Prisma.$SiembraPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Siembras that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SiembraFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Siembras
     * const siembras = await prisma.siembra.findMany()
     * 
     * // Get first 10 Siembras
     * const siembras = await prisma.siembra.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const siembraWithIdOnly = await prisma.siembra.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SiembraFindManyArgs>(args?: SelectSubset<T, SiembraFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SiembraPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Siembra.
     * @param {SiembraCreateArgs} args - Arguments to create a Siembra.
     * @example
     * // Create one Siembra
     * const Siembra = await prisma.siembra.create({
     *   data: {
     *     // ... data to create a Siembra
     *   }
     * })
     * 
     */
    create<T extends SiembraCreateArgs>(args: SelectSubset<T, SiembraCreateArgs<ExtArgs>>): Prisma__SiembraClient<$Result.GetResult<Prisma.$SiembraPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Siembras.
     * @param {SiembraCreateManyArgs} args - Arguments to create many Siembras.
     * @example
     * // Create many Siembras
     * const siembra = await prisma.siembra.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SiembraCreateManyArgs>(args?: SelectSubset<T, SiembraCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Siembras and returns the data saved in the database.
     * @param {SiembraCreateManyAndReturnArgs} args - Arguments to create many Siembras.
     * @example
     * // Create many Siembras
     * const siembra = await prisma.siembra.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Siembras and only return the `id`
     * const siembraWithIdOnly = await prisma.siembra.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SiembraCreateManyAndReturnArgs>(args?: SelectSubset<T, SiembraCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SiembraPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Siembra.
     * @param {SiembraDeleteArgs} args - Arguments to delete one Siembra.
     * @example
     * // Delete one Siembra
     * const Siembra = await prisma.siembra.delete({
     *   where: {
     *     // ... filter to delete one Siembra
     *   }
     * })
     * 
     */
    delete<T extends SiembraDeleteArgs>(args: SelectSubset<T, SiembraDeleteArgs<ExtArgs>>): Prisma__SiembraClient<$Result.GetResult<Prisma.$SiembraPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Siembra.
     * @param {SiembraUpdateArgs} args - Arguments to update one Siembra.
     * @example
     * // Update one Siembra
     * const siembra = await prisma.siembra.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SiembraUpdateArgs>(args: SelectSubset<T, SiembraUpdateArgs<ExtArgs>>): Prisma__SiembraClient<$Result.GetResult<Prisma.$SiembraPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Siembras.
     * @param {SiembraDeleteManyArgs} args - Arguments to filter Siembras to delete.
     * @example
     * // Delete a few Siembras
     * const { count } = await prisma.siembra.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SiembraDeleteManyArgs>(args?: SelectSubset<T, SiembraDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Siembras.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SiembraUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Siembras
     * const siembra = await prisma.siembra.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SiembraUpdateManyArgs>(args: SelectSubset<T, SiembraUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Siembra.
     * @param {SiembraUpsertArgs} args - Arguments to update or create a Siembra.
     * @example
     * // Update or create a Siembra
     * const siembra = await prisma.siembra.upsert({
     *   create: {
     *     // ... data to create a Siembra
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Siembra we want to update
     *   }
     * })
     */
    upsert<T extends SiembraUpsertArgs>(args: SelectSubset<T, SiembraUpsertArgs<ExtArgs>>): Prisma__SiembraClient<$Result.GetResult<Prisma.$SiembraPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Siembras.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SiembraCountArgs} args - Arguments to filter Siembras to count.
     * @example
     * // Count the number of Siembras
     * const count = await prisma.siembra.count({
     *   where: {
     *     // ... the filter for the Siembras we want to count
     *   }
     * })
    **/
    count<T extends SiembraCountArgs>(
      args?: Subset<T, SiembraCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SiembraCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Siembra.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SiembraAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SiembraAggregateArgs>(args: Subset<T, SiembraAggregateArgs>): Prisma.PrismaPromise<GetSiembraAggregateType<T>>

    /**
     * Group by Siembra.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SiembraGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SiembraGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SiembraGroupByArgs['orderBy'] }
        : { orderBy?: SiembraGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SiembraGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSiembraGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Siembra model
   */
  readonly fields: SiembraFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Siembra.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SiembraClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    lote<T extends LoteDefaultArgs<ExtArgs> = {}>(args?: Subset<T, LoteDefaultArgs<ExtArgs>>): Prisma__LoteClient<$Result.GetResult<Prisma.$LotePayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    tipoCultivo<T extends TipoCultivoDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TipoCultivoDefaultArgs<ExtArgs>>): Prisma__TipoCultivoClient<$Result.GetResult<Prisma.$TipoCultivoPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    cosechas<T extends Siembra$cosechasArgs<ExtArgs> = {}>(args?: Subset<T, Siembra$cosechasArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CosechaPayload<ExtArgs>, T, "findMany"> | Null>
    aplicaciones<T extends Siembra$aplicacionesArgs<ExtArgs> = {}>(args?: Subset<T, Siembra$aplicacionesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AplicacionInsumoPayload<ExtArgs>, T, "findMany"> | Null>
    movimentos<T extends Siembra$movimentosArgs<ExtArgs> = {}>(args?: Subset<T, Siembra$movimentosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MovimientoFinancieroPayload<ExtArgs>, T, "findMany"> | Null>
    campania<T extends Siembra$campaniaArgs<ExtArgs> = {}>(args?: Subset<T, Siembra$campaniaArgs<ExtArgs>>): Prisma__CampaniaClient<$Result.GetResult<Prisma.$CampaniaPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Siembra model
   */ 
  interface SiembraFieldRefs {
    readonly id: FieldRef<"Siembra", 'Int'>
    readonly loteId: FieldRef<"Siembra", 'Int'>
    readonly tipoCultivoId: FieldRef<"Siembra", 'Int'>
    readonly fechaSiembra: FieldRef<"Siembra", 'DateTime'>
    readonly densidad: FieldRef<"Siembra", 'Float'>
    readonly observaciones: FieldRef<"Siembra", 'String'>
    readonly estado: FieldRef<"Siembra", 'EstadoSiembra'>
    readonly createdAt: FieldRef<"Siembra", 'DateTime'>
    readonly updatedAt: FieldRef<"Siembra", 'DateTime'>
    readonly campaniaId: FieldRef<"Siembra", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Siembra findUnique
   */
  export type SiembraFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Siembra
     */
    select?: SiembraSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SiembraInclude<ExtArgs> | null
    /**
     * Filter, which Siembra to fetch.
     */
    where: SiembraWhereUniqueInput
  }

  /**
   * Siembra findUniqueOrThrow
   */
  export type SiembraFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Siembra
     */
    select?: SiembraSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SiembraInclude<ExtArgs> | null
    /**
     * Filter, which Siembra to fetch.
     */
    where: SiembraWhereUniqueInput
  }

  /**
   * Siembra findFirst
   */
  export type SiembraFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Siembra
     */
    select?: SiembraSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SiembraInclude<ExtArgs> | null
    /**
     * Filter, which Siembra to fetch.
     */
    where?: SiembraWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Siembras to fetch.
     */
    orderBy?: SiembraOrderByWithRelationInput | SiembraOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Siembras.
     */
    cursor?: SiembraWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Siembras from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Siembras.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Siembras.
     */
    distinct?: SiembraScalarFieldEnum | SiembraScalarFieldEnum[]
  }

  /**
   * Siembra findFirstOrThrow
   */
  export type SiembraFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Siembra
     */
    select?: SiembraSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SiembraInclude<ExtArgs> | null
    /**
     * Filter, which Siembra to fetch.
     */
    where?: SiembraWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Siembras to fetch.
     */
    orderBy?: SiembraOrderByWithRelationInput | SiembraOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Siembras.
     */
    cursor?: SiembraWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Siembras from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Siembras.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Siembras.
     */
    distinct?: SiembraScalarFieldEnum | SiembraScalarFieldEnum[]
  }

  /**
   * Siembra findMany
   */
  export type SiembraFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Siembra
     */
    select?: SiembraSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SiembraInclude<ExtArgs> | null
    /**
     * Filter, which Siembras to fetch.
     */
    where?: SiembraWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Siembras to fetch.
     */
    orderBy?: SiembraOrderByWithRelationInput | SiembraOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Siembras.
     */
    cursor?: SiembraWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Siembras from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Siembras.
     */
    skip?: number
    distinct?: SiembraScalarFieldEnum | SiembraScalarFieldEnum[]
  }

  /**
   * Siembra create
   */
  export type SiembraCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Siembra
     */
    select?: SiembraSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SiembraInclude<ExtArgs> | null
    /**
     * The data needed to create a Siembra.
     */
    data: XOR<SiembraCreateInput, SiembraUncheckedCreateInput>
  }

  /**
   * Siembra createMany
   */
  export type SiembraCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Siembras.
     */
    data: SiembraCreateManyInput | SiembraCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Siembra createManyAndReturn
   */
  export type SiembraCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Siembra
     */
    select?: SiembraSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Siembras.
     */
    data: SiembraCreateManyInput | SiembraCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SiembraIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Siembra update
   */
  export type SiembraUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Siembra
     */
    select?: SiembraSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SiembraInclude<ExtArgs> | null
    /**
     * The data needed to update a Siembra.
     */
    data: XOR<SiembraUpdateInput, SiembraUncheckedUpdateInput>
    /**
     * Choose, which Siembra to update.
     */
    where: SiembraWhereUniqueInput
  }

  /**
   * Siembra updateMany
   */
  export type SiembraUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Siembras.
     */
    data: XOR<SiembraUpdateManyMutationInput, SiembraUncheckedUpdateManyInput>
    /**
     * Filter which Siembras to update
     */
    where?: SiembraWhereInput
  }

  /**
   * Siembra upsert
   */
  export type SiembraUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Siembra
     */
    select?: SiembraSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SiembraInclude<ExtArgs> | null
    /**
     * The filter to search for the Siembra to update in case it exists.
     */
    where: SiembraWhereUniqueInput
    /**
     * In case the Siembra found by the `where` argument doesn't exist, create a new Siembra with this data.
     */
    create: XOR<SiembraCreateInput, SiembraUncheckedCreateInput>
    /**
     * In case the Siembra was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SiembraUpdateInput, SiembraUncheckedUpdateInput>
  }

  /**
   * Siembra delete
   */
  export type SiembraDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Siembra
     */
    select?: SiembraSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SiembraInclude<ExtArgs> | null
    /**
     * Filter which Siembra to delete.
     */
    where: SiembraWhereUniqueInput
  }

  /**
   * Siembra deleteMany
   */
  export type SiembraDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Siembras to delete
     */
    where?: SiembraWhereInput
  }

  /**
   * Siembra.cosechas
   */
  export type Siembra$cosechasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cosecha
     */
    select?: CosechaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CosechaInclude<ExtArgs> | null
    where?: CosechaWhereInput
    orderBy?: CosechaOrderByWithRelationInput | CosechaOrderByWithRelationInput[]
    cursor?: CosechaWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CosechaScalarFieldEnum | CosechaScalarFieldEnum[]
  }

  /**
   * Siembra.aplicaciones
   */
  export type Siembra$aplicacionesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AplicacionInsumo
     */
    select?: AplicacionInsumoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AplicacionInsumoInclude<ExtArgs> | null
    where?: AplicacionInsumoWhereInput
    orderBy?: AplicacionInsumoOrderByWithRelationInput | AplicacionInsumoOrderByWithRelationInput[]
    cursor?: AplicacionInsumoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AplicacionInsumoScalarFieldEnum | AplicacionInsumoScalarFieldEnum[]
  }

  /**
   * Siembra.movimentos
   */
  export type Siembra$movimentosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MovimientoFinanciero
     */
    select?: MovimientoFinancieroSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovimientoFinancieroInclude<ExtArgs> | null
    where?: MovimientoFinancieroWhereInput
    orderBy?: MovimientoFinancieroOrderByWithRelationInput | MovimientoFinancieroOrderByWithRelationInput[]
    cursor?: MovimientoFinancieroWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MovimientoFinancieroScalarFieldEnum | MovimientoFinancieroScalarFieldEnum[]
  }

  /**
   * Siembra.campania
   */
  export type Siembra$campaniaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campania
     */
    select?: CampaniaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaniaInclude<ExtArgs> | null
    where?: CampaniaWhereInput
  }

  /**
   * Siembra without action
   */
  export type SiembraDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Siembra
     */
    select?: SiembraSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SiembraInclude<ExtArgs> | null
  }


  /**
   * Model Cosecha
   */

  export type AggregateCosecha = {
    _count: CosechaCountAggregateOutputType | null
    _avg: CosechaAvgAggregateOutputType | null
    _sum: CosechaSumAggregateOutputType | null
    _min: CosechaMinAggregateOutputType | null
    _max: CosechaMaxAggregateOutputType | null
  }

  export type CosechaAvgAggregateOutputType = {
    id: number | null
    siembraId: number | null
    rendimientoKgHa: number | null
    totalKg: number | null
    humedad: number | null
  }

  export type CosechaSumAggregateOutputType = {
    id: number | null
    siembraId: number | null
    rendimientoKgHa: number | null
    totalKg: number | null
    humedad: number | null
  }

  export type CosechaMinAggregateOutputType = {
    id: number | null
    siembraId: number | null
    fechaCosecha: Date | null
    rendimientoKgHa: number | null
    totalKg: number | null
    humedad: number | null
    observaciones: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CosechaMaxAggregateOutputType = {
    id: number | null
    siembraId: number | null
    fechaCosecha: Date | null
    rendimientoKgHa: number | null
    totalKg: number | null
    humedad: number | null
    observaciones: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CosechaCountAggregateOutputType = {
    id: number
    siembraId: number
    fechaCosecha: number
    rendimientoKgHa: number
    totalKg: number
    humedad: number
    observaciones: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CosechaAvgAggregateInputType = {
    id?: true
    siembraId?: true
    rendimientoKgHa?: true
    totalKg?: true
    humedad?: true
  }

  export type CosechaSumAggregateInputType = {
    id?: true
    siembraId?: true
    rendimientoKgHa?: true
    totalKg?: true
    humedad?: true
  }

  export type CosechaMinAggregateInputType = {
    id?: true
    siembraId?: true
    fechaCosecha?: true
    rendimientoKgHa?: true
    totalKg?: true
    humedad?: true
    observaciones?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CosechaMaxAggregateInputType = {
    id?: true
    siembraId?: true
    fechaCosecha?: true
    rendimientoKgHa?: true
    totalKg?: true
    humedad?: true
    observaciones?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CosechaCountAggregateInputType = {
    id?: true
    siembraId?: true
    fechaCosecha?: true
    rendimientoKgHa?: true
    totalKg?: true
    humedad?: true
    observaciones?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CosechaAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Cosecha to aggregate.
     */
    where?: CosechaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Cosechas to fetch.
     */
    orderBy?: CosechaOrderByWithRelationInput | CosechaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CosechaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Cosechas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Cosechas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Cosechas
    **/
    _count?: true | CosechaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CosechaAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CosechaSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CosechaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CosechaMaxAggregateInputType
  }

  export type GetCosechaAggregateType<T extends CosechaAggregateArgs> = {
        [P in keyof T & keyof AggregateCosecha]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCosecha[P]>
      : GetScalarType<T[P], AggregateCosecha[P]>
  }




  export type CosechaGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CosechaWhereInput
    orderBy?: CosechaOrderByWithAggregationInput | CosechaOrderByWithAggregationInput[]
    by: CosechaScalarFieldEnum[] | CosechaScalarFieldEnum
    having?: CosechaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CosechaCountAggregateInputType | true
    _avg?: CosechaAvgAggregateInputType
    _sum?: CosechaSumAggregateInputType
    _min?: CosechaMinAggregateInputType
    _max?: CosechaMaxAggregateInputType
  }

  export type CosechaGroupByOutputType = {
    id: number
    siembraId: number
    fechaCosecha: Date
    rendimientoKgHa: number
    totalKg: number
    humedad: number | null
    observaciones: string | null
    createdAt: Date
    updatedAt: Date
    _count: CosechaCountAggregateOutputType | null
    _avg: CosechaAvgAggregateOutputType | null
    _sum: CosechaSumAggregateOutputType | null
    _min: CosechaMinAggregateOutputType | null
    _max: CosechaMaxAggregateOutputType | null
  }

  type GetCosechaGroupByPayload<T extends CosechaGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CosechaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CosechaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CosechaGroupByOutputType[P]>
            : GetScalarType<T[P], CosechaGroupByOutputType[P]>
        }
      >
    >


  export type CosechaSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    siembraId?: boolean
    fechaCosecha?: boolean
    rendimientoKgHa?: boolean
    totalKg?: boolean
    humedad?: boolean
    observaciones?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    siembra?: boolean | SiembraDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cosecha"]>

  export type CosechaSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    siembraId?: boolean
    fechaCosecha?: boolean
    rendimientoKgHa?: boolean
    totalKg?: boolean
    humedad?: boolean
    observaciones?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    siembra?: boolean | SiembraDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cosecha"]>

  export type CosechaSelectScalar = {
    id?: boolean
    siembraId?: boolean
    fechaCosecha?: boolean
    rendimientoKgHa?: boolean
    totalKg?: boolean
    humedad?: boolean
    observaciones?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CosechaInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    siembra?: boolean | SiembraDefaultArgs<ExtArgs>
  }
  export type CosechaIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    siembra?: boolean | SiembraDefaultArgs<ExtArgs>
  }

  export type $CosechaPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Cosecha"
    objects: {
      siembra: Prisma.$SiembraPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      siembraId: number
      fechaCosecha: Date
      rendimientoKgHa: number
      totalKg: number
      humedad: number | null
      observaciones: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["cosecha"]>
    composites: {}
  }

  type CosechaGetPayload<S extends boolean | null | undefined | CosechaDefaultArgs> = $Result.GetResult<Prisma.$CosechaPayload, S>

  type CosechaCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<CosechaFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: CosechaCountAggregateInputType | true
    }

  export interface CosechaDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Cosecha'], meta: { name: 'Cosecha' } }
    /**
     * Find zero or one Cosecha that matches the filter.
     * @param {CosechaFindUniqueArgs} args - Arguments to find a Cosecha
     * @example
     * // Get one Cosecha
     * const cosecha = await prisma.cosecha.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CosechaFindUniqueArgs>(args: SelectSubset<T, CosechaFindUniqueArgs<ExtArgs>>): Prisma__CosechaClient<$Result.GetResult<Prisma.$CosechaPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Cosecha that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {CosechaFindUniqueOrThrowArgs} args - Arguments to find a Cosecha
     * @example
     * // Get one Cosecha
     * const cosecha = await prisma.cosecha.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CosechaFindUniqueOrThrowArgs>(args: SelectSubset<T, CosechaFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CosechaClient<$Result.GetResult<Prisma.$CosechaPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Cosecha that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CosechaFindFirstArgs} args - Arguments to find a Cosecha
     * @example
     * // Get one Cosecha
     * const cosecha = await prisma.cosecha.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CosechaFindFirstArgs>(args?: SelectSubset<T, CosechaFindFirstArgs<ExtArgs>>): Prisma__CosechaClient<$Result.GetResult<Prisma.$CosechaPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Cosecha that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CosechaFindFirstOrThrowArgs} args - Arguments to find a Cosecha
     * @example
     * // Get one Cosecha
     * const cosecha = await prisma.cosecha.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CosechaFindFirstOrThrowArgs>(args?: SelectSubset<T, CosechaFindFirstOrThrowArgs<ExtArgs>>): Prisma__CosechaClient<$Result.GetResult<Prisma.$CosechaPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Cosechas that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CosechaFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Cosechas
     * const cosechas = await prisma.cosecha.findMany()
     * 
     * // Get first 10 Cosechas
     * const cosechas = await prisma.cosecha.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const cosechaWithIdOnly = await prisma.cosecha.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CosechaFindManyArgs>(args?: SelectSubset<T, CosechaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CosechaPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Cosecha.
     * @param {CosechaCreateArgs} args - Arguments to create a Cosecha.
     * @example
     * // Create one Cosecha
     * const Cosecha = await prisma.cosecha.create({
     *   data: {
     *     // ... data to create a Cosecha
     *   }
     * })
     * 
     */
    create<T extends CosechaCreateArgs>(args: SelectSubset<T, CosechaCreateArgs<ExtArgs>>): Prisma__CosechaClient<$Result.GetResult<Prisma.$CosechaPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Cosechas.
     * @param {CosechaCreateManyArgs} args - Arguments to create many Cosechas.
     * @example
     * // Create many Cosechas
     * const cosecha = await prisma.cosecha.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CosechaCreateManyArgs>(args?: SelectSubset<T, CosechaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Cosechas and returns the data saved in the database.
     * @param {CosechaCreateManyAndReturnArgs} args - Arguments to create many Cosechas.
     * @example
     * // Create many Cosechas
     * const cosecha = await prisma.cosecha.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Cosechas and only return the `id`
     * const cosechaWithIdOnly = await prisma.cosecha.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CosechaCreateManyAndReturnArgs>(args?: SelectSubset<T, CosechaCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CosechaPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Cosecha.
     * @param {CosechaDeleteArgs} args - Arguments to delete one Cosecha.
     * @example
     * // Delete one Cosecha
     * const Cosecha = await prisma.cosecha.delete({
     *   where: {
     *     // ... filter to delete one Cosecha
     *   }
     * })
     * 
     */
    delete<T extends CosechaDeleteArgs>(args: SelectSubset<T, CosechaDeleteArgs<ExtArgs>>): Prisma__CosechaClient<$Result.GetResult<Prisma.$CosechaPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Cosecha.
     * @param {CosechaUpdateArgs} args - Arguments to update one Cosecha.
     * @example
     * // Update one Cosecha
     * const cosecha = await prisma.cosecha.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CosechaUpdateArgs>(args: SelectSubset<T, CosechaUpdateArgs<ExtArgs>>): Prisma__CosechaClient<$Result.GetResult<Prisma.$CosechaPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Cosechas.
     * @param {CosechaDeleteManyArgs} args - Arguments to filter Cosechas to delete.
     * @example
     * // Delete a few Cosechas
     * const { count } = await prisma.cosecha.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CosechaDeleteManyArgs>(args?: SelectSubset<T, CosechaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Cosechas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CosechaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Cosechas
     * const cosecha = await prisma.cosecha.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CosechaUpdateManyArgs>(args: SelectSubset<T, CosechaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Cosecha.
     * @param {CosechaUpsertArgs} args - Arguments to update or create a Cosecha.
     * @example
     * // Update or create a Cosecha
     * const cosecha = await prisma.cosecha.upsert({
     *   create: {
     *     // ... data to create a Cosecha
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Cosecha we want to update
     *   }
     * })
     */
    upsert<T extends CosechaUpsertArgs>(args: SelectSubset<T, CosechaUpsertArgs<ExtArgs>>): Prisma__CosechaClient<$Result.GetResult<Prisma.$CosechaPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Cosechas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CosechaCountArgs} args - Arguments to filter Cosechas to count.
     * @example
     * // Count the number of Cosechas
     * const count = await prisma.cosecha.count({
     *   where: {
     *     // ... the filter for the Cosechas we want to count
     *   }
     * })
    **/
    count<T extends CosechaCountArgs>(
      args?: Subset<T, CosechaCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CosechaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Cosecha.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CosechaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CosechaAggregateArgs>(args: Subset<T, CosechaAggregateArgs>): Prisma.PrismaPromise<GetCosechaAggregateType<T>>

    /**
     * Group by Cosecha.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CosechaGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CosechaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CosechaGroupByArgs['orderBy'] }
        : { orderBy?: CosechaGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CosechaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCosechaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Cosecha model
   */
  readonly fields: CosechaFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Cosecha.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CosechaClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    siembra<T extends SiembraDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SiembraDefaultArgs<ExtArgs>>): Prisma__SiembraClient<$Result.GetResult<Prisma.$SiembraPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Cosecha model
   */ 
  interface CosechaFieldRefs {
    readonly id: FieldRef<"Cosecha", 'Int'>
    readonly siembraId: FieldRef<"Cosecha", 'Int'>
    readonly fechaCosecha: FieldRef<"Cosecha", 'DateTime'>
    readonly rendimientoKgHa: FieldRef<"Cosecha", 'Float'>
    readonly totalKg: FieldRef<"Cosecha", 'Float'>
    readonly humedad: FieldRef<"Cosecha", 'Float'>
    readonly observaciones: FieldRef<"Cosecha", 'String'>
    readonly createdAt: FieldRef<"Cosecha", 'DateTime'>
    readonly updatedAt: FieldRef<"Cosecha", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Cosecha findUnique
   */
  export type CosechaFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cosecha
     */
    select?: CosechaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CosechaInclude<ExtArgs> | null
    /**
     * Filter, which Cosecha to fetch.
     */
    where: CosechaWhereUniqueInput
  }

  /**
   * Cosecha findUniqueOrThrow
   */
  export type CosechaFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cosecha
     */
    select?: CosechaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CosechaInclude<ExtArgs> | null
    /**
     * Filter, which Cosecha to fetch.
     */
    where: CosechaWhereUniqueInput
  }

  /**
   * Cosecha findFirst
   */
  export type CosechaFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cosecha
     */
    select?: CosechaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CosechaInclude<ExtArgs> | null
    /**
     * Filter, which Cosecha to fetch.
     */
    where?: CosechaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Cosechas to fetch.
     */
    orderBy?: CosechaOrderByWithRelationInput | CosechaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Cosechas.
     */
    cursor?: CosechaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Cosechas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Cosechas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Cosechas.
     */
    distinct?: CosechaScalarFieldEnum | CosechaScalarFieldEnum[]
  }

  /**
   * Cosecha findFirstOrThrow
   */
  export type CosechaFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cosecha
     */
    select?: CosechaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CosechaInclude<ExtArgs> | null
    /**
     * Filter, which Cosecha to fetch.
     */
    where?: CosechaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Cosechas to fetch.
     */
    orderBy?: CosechaOrderByWithRelationInput | CosechaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Cosechas.
     */
    cursor?: CosechaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Cosechas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Cosechas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Cosechas.
     */
    distinct?: CosechaScalarFieldEnum | CosechaScalarFieldEnum[]
  }

  /**
   * Cosecha findMany
   */
  export type CosechaFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cosecha
     */
    select?: CosechaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CosechaInclude<ExtArgs> | null
    /**
     * Filter, which Cosechas to fetch.
     */
    where?: CosechaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Cosechas to fetch.
     */
    orderBy?: CosechaOrderByWithRelationInput | CosechaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Cosechas.
     */
    cursor?: CosechaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Cosechas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Cosechas.
     */
    skip?: number
    distinct?: CosechaScalarFieldEnum | CosechaScalarFieldEnum[]
  }

  /**
   * Cosecha create
   */
  export type CosechaCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cosecha
     */
    select?: CosechaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CosechaInclude<ExtArgs> | null
    /**
     * The data needed to create a Cosecha.
     */
    data: XOR<CosechaCreateInput, CosechaUncheckedCreateInput>
  }

  /**
   * Cosecha createMany
   */
  export type CosechaCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Cosechas.
     */
    data: CosechaCreateManyInput | CosechaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Cosecha createManyAndReturn
   */
  export type CosechaCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cosecha
     */
    select?: CosechaSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Cosechas.
     */
    data: CosechaCreateManyInput | CosechaCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CosechaIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Cosecha update
   */
  export type CosechaUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cosecha
     */
    select?: CosechaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CosechaInclude<ExtArgs> | null
    /**
     * The data needed to update a Cosecha.
     */
    data: XOR<CosechaUpdateInput, CosechaUncheckedUpdateInput>
    /**
     * Choose, which Cosecha to update.
     */
    where: CosechaWhereUniqueInput
  }

  /**
   * Cosecha updateMany
   */
  export type CosechaUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Cosechas.
     */
    data: XOR<CosechaUpdateManyMutationInput, CosechaUncheckedUpdateManyInput>
    /**
     * Filter which Cosechas to update
     */
    where?: CosechaWhereInput
  }

  /**
   * Cosecha upsert
   */
  export type CosechaUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cosecha
     */
    select?: CosechaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CosechaInclude<ExtArgs> | null
    /**
     * The filter to search for the Cosecha to update in case it exists.
     */
    where: CosechaWhereUniqueInput
    /**
     * In case the Cosecha found by the `where` argument doesn't exist, create a new Cosecha with this data.
     */
    create: XOR<CosechaCreateInput, CosechaUncheckedCreateInput>
    /**
     * In case the Cosecha was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CosechaUpdateInput, CosechaUncheckedUpdateInput>
  }

  /**
   * Cosecha delete
   */
  export type CosechaDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cosecha
     */
    select?: CosechaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CosechaInclude<ExtArgs> | null
    /**
     * Filter which Cosecha to delete.
     */
    where: CosechaWhereUniqueInput
  }

  /**
   * Cosecha deleteMany
   */
  export type CosechaDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Cosechas to delete
     */
    where?: CosechaWhereInput
  }

  /**
   * Cosecha without action
   */
  export type CosechaDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cosecha
     */
    select?: CosechaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CosechaInclude<ExtArgs> | null
  }


  /**
   * Model Insumo
   */

  export type AggregateInsumo = {
    _count: InsumoCountAggregateOutputType | null
    _avg: InsumoAvgAggregateOutputType | null
    _sum: InsumoSumAggregateOutputType | null
    _min: InsumoMinAggregateOutputType | null
    _max: InsumoMaxAggregateOutputType | null
  }

  export type InsumoAvgAggregateOutputType = {
    id: number | null
  }

  export type InsumoSumAggregateOutputType = {
    id: number | null
  }

  export type InsumoMinAggregateOutputType = {
    id: number | null
    nombre: string | null
    tipo: $Enums.TipoInsumo | null
    unidad: string | null
    descripcion: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type InsumoMaxAggregateOutputType = {
    id: number | null
    nombre: string | null
    tipo: $Enums.TipoInsumo | null
    unidad: string | null
    descripcion: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type InsumoCountAggregateOutputType = {
    id: number
    nombre: number
    tipo: number
    unidad: number
    descripcion: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type InsumoAvgAggregateInputType = {
    id?: true
  }

  export type InsumoSumAggregateInputType = {
    id?: true
  }

  export type InsumoMinAggregateInputType = {
    id?: true
    nombre?: true
    tipo?: true
    unidad?: true
    descripcion?: true
    createdAt?: true
    updatedAt?: true
  }

  export type InsumoMaxAggregateInputType = {
    id?: true
    nombre?: true
    tipo?: true
    unidad?: true
    descripcion?: true
    createdAt?: true
    updatedAt?: true
  }

  export type InsumoCountAggregateInputType = {
    id?: true
    nombre?: true
    tipo?: true
    unidad?: true
    descripcion?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type InsumoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Insumo to aggregate.
     */
    where?: InsumoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Insumos to fetch.
     */
    orderBy?: InsumoOrderByWithRelationInput | InsumoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: InsumoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Insumos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Insumos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Insumos
    **/
    _count?: true | InsumoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: InsumoAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: InsumoSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: InsumoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: InsumoMaxAggregateInputType
  }

  export type GetInsumoAggregateType<T extends InsumoAggregateArgs> = {
        [P in keyof T & keyof AggregateInsumo]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateInsumo[P]>
      : GetScalarType<T[P], AggregateInsumo[P]>
  }




  export type InsumoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InsumoWhereInput
    orderBy?: InsumoOrderByWithAggregationInput | InsumoOrderByWithAggregationInput[]
    by: InsumoScalarFieldEnum[] | InsumoScalarFieldEnum
    having?: InsumoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: InsumoCountAggregateInputType | true
    _avg?: InsumoAvgAggregateInputType
    _sum?: InsumoSumAggregateInputType
    _min?: InsumoMinAggregateInputType
    _max?: InsumoMaxAggregateInputType
  }

  export type InsumoGroupByOutputType = {
    id: number
    nombre: string
    tipo: $Enums.TipoInsumo
    unidad: string
    descripcion: string | null
    createdAt: Date
    updatedAt: Date
    _count: InsumoCountAggregateOutputType | null
    _avg: InsumoAvgAggregateOutputType | null
    _sum: InsumoSumAggregateOutputType | null
    _min: InsumoMinAggregateOutputType | null
    _max: InsumoMaxAggregateOutputType | null
  }

  type GetInsumoGroupByPayload<T extends InsumoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<InsumoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof InsumoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], InsumoGroupByOutputType[P]>
            : GetScalarType<T[P], InsumoGroupByOutputType[P]>
        }
      >
    >


  export type InsumoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    tipo?: boolean
    unidad?: boolean
    descripcion?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    aplicaciones?: boolean | Insumo$aplicacionesArgs<ExtArgs>
    _count?: boolean | InsumoCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["insumo"]>

  export type InsumoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    tipo?: boolean
    unidad?: boolean
    descripcion?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["insumo"]>

  export type InsumoSelectScalar = {
    id?: boolean
    nombre?: boolean
    tipo?: boolean
    unidad?: boolean
    descripcion?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type InsumoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    aplicaciones?: boolean | Insumo$aplicacionesArgs<ExtArgs>
    _count?: boolean | InsumoCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type InsumoIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $InsumoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Insumo"
    objects: {
      aplicaciones: Prisma.$AplicacionInsumoPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      nombre: string
      tipo: $Enums.TipoInsumo
      unidad: string
      descripcion: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["insumo"]>
    composites: {}
  }

  type InsumoGetPayload<S extends boolean | null | undefined | InsumoDefaultArgs> = $Result.GetResult<Prisma.$InsumoPayload, S>

  type InsumoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<InsumoFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: InsumoCountAggregateInputType | true
    }

  export interface InsumoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Insumo'], meta: { name: 'Insumo' } }
    /**
     * Find zero or one Insumo that matches the filter.
     * @param {InsumoFindUniqueArgs} args - Arguments to find a Insumo
     * @example
     * // Get one Insumo
     * const insumo = await prisma.insumo.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends InsumoFindUniqueArgs>(args: SelectSubset<T, InsumoFindUniqueArgs<ExtArgs>>): Prisma__InsumoClient<$Result.GetResult<Prisma.$InsumoPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Insumo that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {InsumoFindUniqueOrThrowArgs} args - Arguments to find a Insumo
     * @example
     * // Get one Insumo
     * const insumo = await prisma.insumo.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends InsumoFindUniqueOrThrowArgs>(args: SelectSubset<T, InsumoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__InsumoClient<$Result.GetResult<Prisma.$InsumoPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Insumo that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InsumoFindFirstArgs} args - Arguments to find a Insumo
     * @example
     * // Get one Insumo
     * const insumo = await prisma.insumo.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends InsumoFindFirstArgs>(args?: SelectSubset<T, InsumoFindFirstArgs<ExtArgs>>): Prisma__InsumoClient<$Result.GetResult<Prisma.$InsumoPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Insumo that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InsumoFindFirstOrThrowArgs} args - Arguments to find a Insumo
     * @example
     * // Get one Insumo
     * const insumo = await prisma.insumo.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends InsumoFindFirstOrThrowArgs>(args?: SelectSubset<T, InsumoFindFirstOrThrowArgs<ExtArgs>>): Prisma__InsumoClient<$Result.GetResult<Prisma.$InsumoPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Insumos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InsumoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Insumos
     * const insumos = await prisma.insumo.findMany()
     * 
     * // Get first 10 Insumos
     * const insumos = await prisma.insumo.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const insumoWithIdOnly = await prisma.insumo.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends InsumoFindManyArgs>(args?: SelectSubset<T, InsumoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InsumoPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Insumo.
     * @param {InsumoCreateArgs} args - Arguments to create a Insumo.
     * @example
     * // Create one Insumo
     * const Insumo = await prisma.insumo.create({
     *   data: {
     *     // ... data to create a Insumo
     *   }
     * })
     * 
     */
    create<T extends InsumoCreateArgs>(args: SelectSubset<T, InsumoCreateArgs<ExtArgs>>): Prisma__InsumoClient<$Result.GetResult<Prisma.$InsumoPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Insumos.
     * @param {InsumoCreateManyArgs} args - Arguments to create many Insumos.
     * @example
     * // Create many Insumos
     * const insumo = await prisma.insumo.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends InsumoCreateManyArgs>(args?: SelectSubset<T, InsumoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Insumos and returns the data saved in the database.
     * @param {InsumoCreateManyAndReturnArgs} args - Arguments to create many Insumos.
     * @example
     * // Create many Insumos
     * const insumo = await prisma.insumo.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Insumos and only return the `id`
     * const insumoWithIdOnly = await prisma.insumo.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends InsumoCreateManyAndReturnArgs>(args?: SelectSubset<T, InsumoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InsumoPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Insumo.
     * @param {InsumoDeleteArgs} args - Arguments to delete one Insumo.
     * @example
     * // Delete one Insumo
     * const Insumo = await prisma.insumo.delete({
     *   where: {
     *     // ... filter to delete one Insumo
     *   }
     * })
     * 
     */
    delete<T extends InsumoDeleteArgs>(args: SelectSubset<T, InsumoDeleteArgs<ExtArgs>>): Prisma__InsumoClient<$Result.GetResult<Prisma.$InsumoPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Insumo.
     * @param {InsumoUpdateArgs} args - Arguments to update one Insumo.
     * @example
     * // Update one Insumo
     * const insumo = await prisma.insumo.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends InsumoUpdateArgs>(args: SelectSubset<T, InsumoUpdateArgs<ExtArgs>>): Prisma__InsumoClient<$Result.GetResult<Prisma.$InsumoPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Insumos.
     * @param {InsumoDeleteManyArgs} args - Arguments to filter Insumos to delete.
     * @example
     * // Delete a few Insumos
     * const { count } = await prisma.insumo.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends InsumoDeleteManyArgs>(args?: SelectSubset<T, InsumoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Insumos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InsumoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Insumos
     * const insumo = await prisma.insumo.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends InsumoUpdateManyArgs>(args: SelectSubset<T, InsumoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Insumo.
     * @param {InsumoUpsertArgs} args - Arguments to update or create a Insumo.
     * @example
     * // Update or create a Insumo
     * const insumo = await prisma.insumo.upsert({
     *   create: {
     *     // ... data to create a Insumo
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Insumo we want to update
     *   }
     * })
     */
    upsert<T extends InsumoUpsertArgs>(args: SelectSubset<T, InsumoUpsertArgs<ExtArgs>>): Prisma__InsumoClient<$Result.GetResult<Prisma.$InsumoPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Insumos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InsumoCountArgs} args - Arguments to filter Insumos to count.
     * @example
     * // Count the number of Insumos
     * const count = await prisma.insumo.count({
     *   where: {
     *     // ... the filter for the Insumos we want to count
     *   }
     * })
    **/
    count<T extends InsumoCountArgs>(
      args?: Subset<T, InsumoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], InsumoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Insumo.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InsumoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends InsumoAggregateArgs>(args: Subset<T, InsumoAggregateArgs>): Prisma.PrismaPromise<GetInsumoAggregateType<T>>

    /**
     * Group by Insumo.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InsumoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends InsumoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: InsumoGroupByArgs['orderBy'] }
        : { orderBy?: InsumoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, InsumoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInsumoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Insumo model
   */
  readonly fields: InsumoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Insumo.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__InsumoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    aplicaciones<T extends Insumo$aplicacionesArgs<ExtArgs> = {}>(args?: Subset<T, Insumo$aplicacionesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AplicacionInsumoPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Insumo model
   */ 
  interface InsumoFieldRefs {
    readonly id: FieldRef<"Insumo", 'Int'>
    readonly nombre: FieldRef<"Insumo", 'String'>
    readonly tipo: FieldRef<"Insumo", 'TipoInsumo'>
    readonly unidad: FieldRef<"Insumo", 'String'>
    readonly descripcion: FieldRef<"Insumo", 'String'>
    readonly createdAt: FieldRef<"Insumo", 'DateTime'>
    readonly updatedAt: FieldRef<"Insumo", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Insumo findUnique
   */
  export type InsumoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Insumo
     */
    select?: InsumoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InsumoInclude<ExtArgs> | null
    /**
     * Filter, which Insumo to fetch.
     */
    where: InsumoWhereUniqueInput
  }

  /**
   * Insumo findUniqueOrThrow
   */
  export type InsumoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Insumo
     */
    select?: InsumoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InsumoInclude<ExtArgs> | null
    /**
     * Filter, which Insumo to fetch.
     */
    where: InsumoWhereUniqueInput
  }

  /**
   * Insumo findFirst
   */
  export type InsumoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Insumo
     */
    select?: InsumoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InsumoInclude<ExtArgs> | null
    /**
     * Filter, which Insumo to fetch.
     */
    where?: InsumoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Insumos to fetch.
     */
    orderBy?: InsumoOrderByWithRelationInput | InsumoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Insumos.
     */
    cursor?: InsumoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Insumos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Insumos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Insumos.
     */
    distinct?: InsumoScalarFieldEnum | InsumoScalarFieldEnum[]
  }

  /**
   * Insumo findFirstOrThrow
   */
  export type InsumoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Insumo
     */
    select?: InsumoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InsumoInclude<ExtArgs> | null
    /**
     * Filter, which Insumo to fetch.
     */
    where?: InsumoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Insumos to fetch.
     */
    orderBy?: InsumoOrderByWithRelationInput | InsumoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Insumos.
     */
    cursor?: InsumoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Insumos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Insumos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Insumos.
     */
    distinct?: InsumoScalarFieldEnum | InsumoScalarFieldEnum[]
  }

  /**
   * Insumo findMany
   */
  export type InsumoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Insumo
     */
    select?: InsumoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InsumoInclude<ExtArgs> | null
    /**
     * Filter, which Insumos to fetch.
     */
    where?: InsumoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Insumos to fetch.
     */
    orderBy?: InsumoOrderByWithRelationInput | InsumoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Insumos.
     */
    cursor?: InsumoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Insumos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Insumos.
     */
    skip?: number
    distinct?: InsumoScalarFieldEnum | InsumoScalarFieldEnum[]
  }

  /**
   * Insumo create
   */
  export type InsumoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Insumo
     */
    select?: InsumoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InsumoInclude<ExtArgs> | null
    /**
     * The data needed to create a Insumo.
     */
    data: XOR<InsumoCreateInput, InsumoUncheckedCreateInput>
  }

  /**
   * Insumo createMany
   */
  export type InsumoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Insumos.
     */
    data: InsumoCreateManyInput | InsumoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Insumo createManyAndReturn
   */
  export type InsumoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Insumo
     */
    select?: InsumoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Insumos.
     */
    data: InsumoCreateManyInput | InsumoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Insumo update
   */
  export type InsumoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Insumo
     */
    select?: InsumoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InsumoInclude<ExtArgs> | null
    /**
     * The data needed to update a Insumo.
     */
    data: XOR<InsumoUpdateInput, InsumoUncheckedUpdateInput>
    /**
     * Choose, which Insumo to update.
     */
    where: InsumoWhereUniqueInput
  }

  /**
   * Insumo updateMany
   */
  export type InsumoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Insumos.
     */
    data: XOR<InsumoUpdateManyMutationInput, InsumoUncheckedUpdateManyInput>
    /**
     * Filter which Insumos to update
     */
    where?: InsumoWhereInput
  }

  /**
   * Insumo upsert
   */
  export type InsumoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Insumo
     */
    select?: InsumoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InsumoInclude<ExtArgs> | null
    /**
     * The filter to search for the Insumo to update in case it exists.
     */
    where: InsumoWhereUniqueInput
    /**
     * In case the Insumo found by the `where` argument doesn't exist, create a new Insumo with this data.
     */
    create: XOR<InsumoCreateInput, InsumoUncheckedCreateInput>
    /**
     * In case the Insumo was found with the provided `where` argument, update it with this data.
     */
    update: XOR<InsumoUpdateInput, InsumoUncheckedUpdateInput>
  }

  /**
   * Insumo delete
   */
  export type InsumoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Insumo
     */
    select?: InsumoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InsumoInclude<ExtArgs> | null
    /**
     * Filter which Insumo to delete.
     */
    where: InsumoWhereUniqueInput
  }

  /**
   * Insumo deleteMany
   */
  export type InsumoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Insumos to delete
     */
    where?: InsumoWhereInput
  }

  /**
   * Insumo.aplicaciones
   */
  export type Insumo$aplicacionesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AplicacionInsumo
     */
    select?: AplicacionInsumoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AplicacionInsumoInclude<ExtArgs> | null
    where?: AplicacionInsumoWhereInput
    orderBy?: AplicacionInsumoOrderByWithRelationInput | AplicacionInsumoOrderByWithRelationInput[]
    cursor?: AplicacionInsumoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AplicacionInsumoScalarFieldEnum | AplicacionInsumoScalarFieldEnum[]
  }

  /**
   * Insumo without action
   */
  export type InsumoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Insumo
     */
    select?: InsumoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InsumoInclude<ExtArgs> | null
  }


  /**
   * Model AplicacionInsumo
   */

  export type AggregateAplicacionInsumo = {
    _count: AplicacionInsumoCountAggregateOutputType | null
    _avg: AplicacionInsumoAvgAggregateOutputType | null
    _sum: AplicacionInsumoSumAggregateOutputType | null
    _min: AplicacionInsumoMinAggregateOutputType | null
    _max: AplicacionInsumoMaxAggregateOutputType | null
  }

  export type AplicacionInsumoAvgAggregateOutputType = {
    id: number | null
    siembraId: number | null
    insumoId: number | null
    cantidad: number | null
  }

  export type AplicacionInsumoSumAggregateOutputType = {
    id: number | null
    siembraId: number | null
    insumoId: number | null
    cantidad: number | null
  }

  export type AplicacionInsumoMinAggregateOutputType = {
    id: number | null
    siembraId: number | null
    insumoId: number | null
    fecha: Date | null
    cantidad: number | null
    unidad: string | null
    observaciones: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AplicacionInsumoMaxAggregateOutputType = {
    id: number | null
    siembraId: number | null
    insumoId: number | null
    fecha: Date | null
    cantidad: number | null
    unidad: string | null
    observaciones: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AplicacionInsumoCountAggregateOutputType = {
    id: number
    siembraId: number
    insumoId: number
    fecha: number
    cantidad: number
    unidad: number
    observaciones: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AplicacionInsumoAvgAggregateInputType = {
    id?: true
    siembraId?: true
    insumoId?: true
    cantidad?: true
  }

  export type AplicacionInsumoSumAggregateInputType = {
    id?: true
    siembraId?: true
    insumoId?: true
    cantidad?: true
  }

  export type AplicacionInsumoMinAggregateInputType = {
    id?: true
    siembraId?: true
    insumoId?: true
    fecha?: true
    cantidad?: true
    unidad?: true
    observaciones?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AplicacionInsumoMaxAggregateInputType = {
    id?: true
    siembraId?: true
    insumoId?: true
    fecha?: true
    cantidad?: true
    unidad?: true
    observaciones?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AplicacionInsumoCountAggregateInputType = {
    id?: true
    siembraId?: true
    insumoId?: true
    fecha?: true
    cantidad?: true
    unidad?: true
    observaciones?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AplicacionInsumoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AplicacionInsumo to aggregate.
     */
    where?: AplicacionInsumoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AplicacionInsumos to fetch.
     */
    orderBy?: AplicacionInsumoOrderByWithRelationInput | AplicacionInsumoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AplicacionInsumoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AplicacionInsumos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AplicacionInsumos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AplicacionInsumos
    **/
    _count?: true | AplicacionInsumoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AplicacionInsumoAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AplicacionInsumoSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AplicacionInsumoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AplicacionInsumoMaxAggregateInputType
  }

  export type GetAplicacionInsumoAggregateType<T extends AplicacionInsumoAggregateArgs> = {
        [P in keyof T & keyof AggregateAplicacionInsumo]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAplicacionInsumo[P]>
      : GetScalarType<T[P], AggregateAplicacionInsumo[P]>
  }




  export type AplicacionInsumoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AplicacionInsumoWhereInput
    orderBy?: AplicacionInsumoOrderByWithAggregationInput | AplicacionInsumoOrderByWithAggregationInput[]
    by: AplicacionInsumoScalarFieldEnum[] | AplicacionInsumoScalarFieldEnum
    having?: AplicacionInsumoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AplicacionInsumoCountAggregateInputType | true
    _avg?: AplicacionInsumoAvgAggregateInputType
    _sum?: AplicacionInsumoSumAggregateInputType
    _min?: AplicacionInsumoMinAggregateInputType
    _max?: AplicacionInsumoMaxAggregateInputType
  }

  export type AplicacionInsumoGroupByOutputType = {
    id: number
    siembraId: number
    insumoId: number
    fecha: Date
    cantidad: number
    unidad: string
    observaciones: string | null
    createdAt: Date
    updatedAt: Date
    _count: AplicacionInsumoCountAggregateOutputType | null
    _avg: AplicacionInsumoAvgAggregateOutputType | null
    _sum: AplicacionInsumoSumAggregateOutputType | null
    _min: AplicacionInsumoMinAggregateOutputType | null
    _max: AplicacionInsumoMaxAggregateOutputType | null
  }

  type GetAplicacionInsumoGroupByPayload<T extends AplicacionInsumoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AplicacionInsumoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AplicacionInsumoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AplicacionInsumoGroupByOutputType[P]>
            : GetScalarType<T[P], AplicacionInsumoGroupByOutputType[P]>
        }
      >
    >


  export type AplicacionInsumoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    siembraId?: boolean
    insumoId?: boolean
    fecha?: boolean
    cantidad?: boolean
    unidad?: boolean
    observaciones?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    siembra?: boolean | SiembraDefaultArgs<ExtArgs>
    insumo?: boolean | InsumoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["aplicacionInsumo"]>

  export type AplicacionInsumoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    siembraId?: boolean
    insumoId?: boolean
    fecha?: boolean
    cantidad?: boolean
    unidad?: boolean
    observaciones?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    siembra?: boolean | SiembraDefaultArgs<ExtArgs>
    insumo?: boolean | InsumoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["aplicacionInsumo"]>

  export type AplicacionInsumoSelectScalar = {
    id?: boolean
    siembraId?: boolean
    insumoId?: boolean
    fecha?: boolean
    cantidad?: boolean
    unidad?: boolean
    observaciones?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AplicacionInsumoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    siembra?: boolean | SiembraDefaultArgs<ExtArgs>
    insumo?: boolean | InsumoDefaultArgs<ExtArgs>
  }
  export type AplicacionInsumoIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    siembra?: boolean | SiembraDefaultArgs<ExtArgs>
    insumo?: boolean | InsumoDefaultArgs<ExtArgs>
  }

  export type $AplicacionInsumoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AplicacionInsumo"
    objects: {
      siembra: Prisma.$SiembraPayload<ExtArgs>
      insumo: Prisma.$InsumoPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      siembraId: number
      insumoId: number
      fecha: Date
      cantidad: number
      unidad: string
      observaciones: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["aplicacionInsumo"]>
    composites: {}
  }

  type AplicacionInsumoGetPayload<S extends boolean | null | undefined | AplicacionInsumoDefaultArgs> = $Result.GetResult<Prisma.$AplicacionInsumoPayload, S>

  type AplicacionInsumoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<AplicacionInsumoFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: AplicacionInsumoCountAggregateInputType | true
    }

  export interface AplicacionInsumoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AplicacionInsumo'], meta: { name: 'AplicacionInsumo' } }
    /**
     * Find zero or one AplicacionInsumo that matches the filter.
     * @param {AplicacionInsumoFindUniqueArgs} args - Arguments to find a AplicacionInsumo
     * @example
     * // Get one AplicacionInsumo
     * const aplicacionInsumo = await prisma.aplicacionInsumo.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AplicacionInsumoFindUniqueArgs>(args: SelectSubset<T, AplicacionInsumoFindUniqueArgs<ExtArgs>>): Prisma__AplicacionInsumoClient<$Result.GetResult<Prisma.$AplicacionInsumoPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one AplicacionInsumo that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {AplicacionInsumoFindUniqueOrThrowArgs} args - Arguments to find a AplicacionInsumo
     * @example
     * // Get one AplicacionInsumo
     * const aplicacionInsumo = await prisma.aplicacionInsumo.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AplicacionInsumoFindUniqueOrThrowArgs>(args: SelectSubset<T, AplicacionInsumoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AplicacionInsumoClient<$Result.GetResult<Prisma.$AplicacionInsumoPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first AplicacionInsumo that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AplicacionInsumoFindFirstArgs} args - Arguments to find a AplicacionInsumo
     * @example
     * // Get one AplicacionInsumo
     * const aplicacionInsumo = await prisma.aplicacionInsumo.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AplicacionInsumoFindFirstArgs>(args?: SelectSubset<T, AplicacionInsumoFindFirstArgs<ExtArgs>>): Prisma__AplicacionInsumoClient<$Result.GetResult<Prisma.$AplicacionInsumoPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first AplicacionInsumo that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AplicacionInsumoFindFirstOrThrowArgs} args - Arguments to find a AplicacionInsumo
     * @example
     * // Get one AplicacionInsumo
     * const aplicacionInsumo = await prisma.aplicacionInsumo.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AplicacionInsumoFindFirstOrThrowArgs>(args?: SelectSubset<T, AplicacionInsumoFindFirstOrThrowArgs<ExtArgs>>): Prisma__AplicacionInsumoClient<$Result.GetResult<Prisma.$AplicacionInsumoPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more AplicacionInsumos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AplicacionInsumoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AplicacionInsumos
     * const aplicacionInsumos = await prisma.aplicacionInsumo.findMany()
     * 
     * // Get first 10 AplicacionInsumos
     * const aplicacionInsumos = await prisma.aplicacionInsumo.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const aplicacionInsumoWithIdOnly = await prisma.aplicacionInsumo.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AplicacionInsumoFindManyArgs>(args?: SelectSubset<T, AplicacionInsumoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AplicacionInsumoPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a AplicacionInsumo.
     * @param {AplicacionInsumoCreateArgs} args - Arguments to create a AplicacionInsumo.
     * @example
     * // Create one AplicacionInsumo
     * const AplicacionInsumo = await prisma.aplicacionInsumo.create({
     *   data: {
     *     // ... data to create a AplicacionInsumo
     *   }
     * })
     * 
     */
    create<T extends AplicacionInsumoCreateArgs>(args: SelectSubset<T, AplicacionInsumoCreateArgs<ExtArgs>>): Prisma__AplicacionInsumoClient<$Result.GetResult<Prisma.$AplicacionInsumoPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many AplicacionInsumos.
     * @param {AplicacionInsumoCreateManyArgs} args - Arguments to create many AplicacionInsumos.
     * @example
     * // Create many AplicacionInsumos
     * const aplicacionInsumo = await prisma.aplicacionInsumo.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AplicacionInsumoCreateManyArgs>(args?: SelectSubset<T, AplicacionInsumoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AplicacionInsumos and returns the data saved in the database.
     * @param {AplicacionInsumoCreateManyAndReturnArgs} args - Arguments to create many AplicacionInsumos.
     * @example
     * // Create many AplicacionInsumos
     * const aplicacionInsumo = await prisma.aplicacionInsumo.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AplicacionInsumos and only return the `id`
     * const aplicacionInsumoWithIdOnly = await prisma.aplicacionInsumo.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AplicacionInsumoCreateManyAndReturnArgs>(args?: SelectSubset<T, AplicacionInsumoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AplicacionInsumoPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a AplicacionInsumo.
     * @param {AplicacionInsumoDeleteArgs} args - Arguments to delete one AplicacionInsumo.
     * @example
     * // Delete one AplicacionInsumo
     * const AplicacionInsumo = await prisma.aplicacionInsumo.delete({
     *   where: {
     *     // ... filter to delete one AplicacionInsumo
     *   }
     * })
     * 
     */
    delete<T extends AplicacionInsumoDeleteArgs>(args: SelectSubset<T, AplicacionInsumoDeleteArgs<ExtArgs>>): Prisma__AplicacionInsumoClient<$Result.GetResult<Prisma.$AplicacionInsumoPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one AplicacionInsumo.
     * @param {AplicacionInsumoUpdateArgs} args - Arguments to update one AplicacionInsumo.
     * @example
     * // Update one AplicacionInsumo
     * const aplicacionInsumo = await prisma.aplicacionInsumo.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AplicacionInsumoUpdateArgs>(args: SelectSubset<T, AplicacionInsumoUpdateArgs<ExtArgs>>): Prisma__AplicacionInsumoClient<$Result.GetResult<Prisma.$AplicacionInsumoPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more AplicacionInsumos.
     * @param {AplicacionInsumoDeleteManyArgs} args - Arguments to filter AplicacionInsumos to delete.
     * @example
     * // Delete a few AplicacionInsumos
     * const { count } = await prisma.aplicacionInsumo.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AplicacionInsumoDeleteManyArgs>(args?: SelectSubset<T, AplicacionInsumoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AplicacionInsumos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AplicacionInsumoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AplicacionInsumos
     * const aplicacionInsumo = await prisma.aplicacionInsumo.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AplicacionInsumoUpdateManyArgs>(args: SelectSubset<T, AplicacionInsumoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one AplicacionInsumo.
     * @param {AplicacionInsumoUpsertArgs} args - Arguments to update or create a AplicacionInsumo.
     * @example
     * // Update or create a AplicacionInsumo
     * const aplicacionInsumo = await prisma.aplicacionInsumo.upsert({
     *   create: {
     *     // ... data to create a AplicacionInsumo
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AplicacionInsumo we want to update
     *   }
     * })
     */
    upsert<T extends AplicacionInsumoUpsertArgs>(args: SelectSubset<T, AplicacionInsumoUpsertArgs<ExtArgs>>): Prisma__AplicacionInsumoClient<$Result.GetResult<Prisma.$AplicacionInsumoPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of AplicacionInsumos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AplicacionInsumoCountArgs} args - Arguments to filter AplicacionInsumos to count.
     * @example
     * // Count the number of AplicacionInsumos
     * const count = await prisma.aplicacionInsumo.count({
     *   where: {
     *     // ... the filter for the AplicacionInsumos we want to count
     *   }
     * })
    **/
    count<T extends AplicacionInsumoCountArgs>(
      args?: Subset<T, AplicacionInsumoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AplicacionInsumoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AplicacionInsumo.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AplicacionInsumoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AplicacionInsumoAggregateArgs>(args: Subset<T, AplicacionInsumoAggregateArgs>): Prisma.PrismaPromise<GetAplicacionInsumoAggregateType<T>>

    /**
     * Group by AplicacionInsumo.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AplicacionInsumoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AplicacionInsumoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AplicacionInsumoGroupByArgs['orderBy'] }
        : { orderBy?: AplicacionInsumoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AplicacionInsumoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAplicacionInsumoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AplicacionInsumo model
   */
  readonly fields: AplicacionInsumoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AplicacionInsumo.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AplicacionInsumoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    siembra<T extends SiembraDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SiembraDefaultArgs<ExtArgs>>): Prisma__SiembraClient<$Result.GetResult<Prisma.$SiembraPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    insumo<T extends InsumoDefaultArgs<ExtArgs> = {}>(args?: Subset<T, InsumoDefaultArgs<ExtArgs>>): Prisma__InsumoClient<$Result.GetResult<Prisma.$InsumoPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AplicacionInsumo model
   */ 
  interface AplicacionInsumoFieldRefs {
    readonly id: FieldRef<"AplicacionInsumo", 'Int'>
    readonly siembraId: FieldRef<"AplicacionInsumo", 'Int'>
    readonly insumoId: FieldRef<"AplicacionInsumo", 'Int'>
    readonly fecha: FieldRef<"AplicacionInsumo", 'DateTime'>
    readonly cantidad: FieldRef<"AplicacionInsumo", 'Float'>
    readonly unidad: FieldRef<"AplicacionInsumo", 'String'>
    readonly observaciones: FieldRef<"AplicacionInsumo", 'String'>
    readonly createdAt: FieldRef<"AplicacionInsumo", 'DateTime'>
    readonly updatedAt: FieldRef<"AplicacionInsumo", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AplicacionInsumo findUnique
   */
  export type AplicacionInsumoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AplicacionInsumo
     */
    select?: AplicacionInsumoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AplicacionInsumoInclude<ExtArgs> | null
    /**
     * Filter, which AplicacionInsumo to fetch.
     */
    where: AplicacionInsumoWhereUniqueInput
  }

  /**
   * AplicacionInsumo findUniqueOrThrow
   */
  export type AplicacionInsumoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AplicacionInsumo
     */
    select?: AplicacionInsumoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AplicacionInsumoInclude<ExtArgs> | null
    /**
     * Filter, which AplicacionInsumo to fetch.
     */
    where: AplicacionInsumoWhereUniqueInput
  }

  /**
   * AplicacionInsumo findFirst
   */
  export type AplicacionInsumoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AplicacionInsumo
     */
    select?: AplicacionInsumoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AplicacionInsumoInclude<ExtArgs> | null
    /**
     * Filter, which AplicacionInsumo to fetch.
     */
    where?: AplicacionInsumoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AplicacionInsumos to fetch.
     */
    orderBy?: AplicacionInsumoOrderByWithRelationInput | AplicacionInsumoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AplicacionInsumos.
     */
    cursor?: AplicacionInsumoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AplicacionInsumos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AplicacionInsumos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AplicacionInsumos.
     */
    distinct?: AplicacionInsumoScalarFieldEnum | AplicacionInsumoScalarFieldEnum[]
  }

  /**
   * AplicacionInsumo findFirstOrThrow
   */
  export type AplicacionInsumoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AplicacionInsumo
     */
    select?: AplicacionInsumoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AplicacionInsumoInclude<ExtArgs> | null
    /**
     * Filter, which AplicacionInsumo to fetch.
     */
    where?: AplicacionInsumoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AplicacionInsumos to fetch.
     */
    orderBy?: AplicacionInsumoOrderByWithRelationInput | AplicacionInsumoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AplicacionInsumos.
     */
    cursor?: AplicacionInsumoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AplicacionInsumos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AplicacionInsumos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AplicacionInsumos.
     */
    distinct?: AplicacionInsumoScalarFieldEnum | AplicacionInsumoScalarFieldEnum[]
  }

  /**
   * AplicacionInsumo findMany
   */
  export type AplicacionInsumoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AplicacionInsumo
     */
    select?: AplicacionInsumoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AplicacionInsumoInclude<ExtArgs> | null
    /**
     * Filter, which AplicacionInsumos to fetch.
     */
    where?: AplicacionInsumoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AplicacionInsumos to fetch.
     */
    orderBy?: AplicacionInsumoOrderByWithRelationInput | AplicacionInsumoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AplicacionInsumos.
     */
    cursor?: AplicacionInsumoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AplicacionInsumos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AplicacionInsumos.
     */
    skip?: number
    distinct?: AplicacionInsumoScalarFieldEnum | AplicacionInsumoScalarFieldEnum[]
  }

  /**
   * AplicacionInsumo create
   */
  export type AplicacionInsumoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AplicacionInsumo
     */
    select?: AplicacionInsumoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AplicacionInsumoInclude<ExtArgs> | null
    /**
     * The data needed to create a AplicacionInsumo.
     */
    data: XOR<AplicacionInsumoCreateInput, AplicacionInsumoUncheckedCreateInput>
  }

  /**
   * AplicacionInsumo createMany
   */
  export type AplicacionInsumoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AplicacionInsumos.
     */
    data: AplicacionInsumoCreateManyInput | AplicacionInsumoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AplicacionInsumo createManyAndReturn
   */
  export type AplicacionInsumoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AplicacionInsumo
     */
    select?: AplicacionInsumoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many AplicacionInsumos.
     */
    data: AplicacionInsumoCreateManyInput | AplicacionInsumoCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AplicacionInsumoIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AplicacionInsumo update
   */
  export type AplicacionInsumoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AplicacionInsumo
     */
    select?: AplicacionInsumoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AplicacionInsumoInclude<ExtArgs> | null
    /**
     * The data needed to update a AplicacionInsumo.
     */
    data: XOR<AplicacionInsumoUpdateInput, AplicacionInsumoUncheckedUpdateInput>
    /**
     * Choose, which AplicacionInsumo to update.
     */
    where: AplicacionInsumoWhereUniqueInput
  }

  /**
   * AplicacionInsumo updateMany
   */
  export type AplicacionInsumoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AplicacionInsumos.
     */
    data: XOR<AplicacionInsumoUpdateManyMutationInput, AplicacionInsumoUncheckedUpdateManyInput>
    /**
     * Filter which AplicacionInsumos to update
     */
    where?: AplicacionInsumoWhereInput
  }

  /**
   * AplicacionInsumo upsert
   */
  export type AplicacionInsumoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AplicacionInsumo
     */
    select?: AplicacionInsumoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AplicacionInsumoInclude<ExtArgs> | null
    /**
     * The filter to search for the AplicacionInsumo to update in case it exists.
     */
    where: AplicacionInsumoWhereUniqueInput
    /**
     * In case the AplicacionInsumo found by the `where` argument doesn't exist, create a new AplicacionInsumo with this data.
     */
    create: XOR<AplicacionInsumoCreateInput, AplicacionInsumoUncheckedCreateInput>
    /**
     * In case the AplicacionInsumo was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AplicacionInsumoUpdateInput, AplicacionInsumoUncheckedUpdateInput>
  }

  /**
   * AplicacionInsumo delete
   */
  export type AplicacionInsumoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AplicacionInsumo
     */
    select?: AplicacionInsumoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AplicacionInsumoInclude<ExtArgs> | null
    /**
     * Filter which AplicacionInsumo to delete.
     */
    where: AplicacionInsumoWhereUniqueInput
  }

  /**
   * AplicacionInsumo deleteMany
   */
  export type AplicacionInsumoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AplicacionInsumos to delete
     */
    where?: AplicacionInsumoWhereInput
  }

  /**
   * AplicacionInsumo without action
   */
  export type AplicacionInsumoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AplicacionInsumo
     */
    select?: AplicacionInsumoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AplicacionInsumoInclude<ExtArgs> | null
  }


  /**
   * Model Animal
   */

  export type AggregateAnimal = {
    _count: AnimalCountAggregateOutputType | null
    _avg: AnimalAvgAggregateOutputType | null
    _sum: AnimalSumAggregateOutputType | null
    _min: AnimalMinAggregateOutputType | null
    _max: AnimalMaxAggregateOutputType | null
  }

  export type AnimalAvgAggregateOutputType = {
    id: number | null
    usuarioId: number | null
    peso: number | null
  }

  export type AnimalSumAggregateOutputType = {
    id: number | null
    usuarioId: number | null
    peso: number | null
  }

  export type AnimalMinAggregateOutputType = {
    id: number | null
    usuarioId: number | null
    nombre: string | null
    especie: $Enums.Especie | null
    sexo: $Enums.Sexo | null
    categoria: $Enums.CategoriaAnimal | null
    peso: number | null
    fechaNacimiento: Date | null
    observaciones: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AnimalMaxAggregateOutputType = {
    id: number | null
    usuarioId: number | null
    nombre: string | null
    especie: $Enums.Especie | null
    sexo: $Enums.Sexo | null
    categoria: $Enums.CategoriaAnimal | null
    peso: number | null
    fechaNacimiento: Date | null
    observaciones: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AnimalCountAggregateOutputType = {
    id: number
    usuarioId: number
    nombre: number
    especie: number
    sexo: number
    categoria: number
    peso: number
    fechaNacimiento: number
    observaciones: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AnimalAvgAggregateInputType = {
    id?: true
    usuarioId?: true
    peso?: true
  }

  export type AnimalSumAggregateInputType = {
    id?: true
    usuarioId?: true
    peso?: true
  }

  export type AnimalMinAggregateInputType = {
    id?: true
    usuarioId?: true
    nombre?: true
    especie?: true
    sexo?: true
    categoria?: true
    peso?: true
    fechaNacimiento?: true
    observaciones?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AnimalMaxAggregateInputType = {
    id?: true
    usuarioId?: true
    nombre?: true
    especie?: true
    sexo?: true
    categoria?: true
    peso?: true
    fechaNacimiento?: true
    observaciones?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AnimalCountAggregateInputType = {
    id?: true
    usuarioId?: true
    nombre?: true
    especie?: true
    sexo?: true
    categoria?: true
    peso?: true
    fechaNacimiento?: true
    observaciones?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AnimalAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Animal to aggregate.
     */
    where?: AnimalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Animals to fetch.
     */
    orderBy?: AnimalOrderByWithRelationInput | AnimalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AnimalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Animals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Animals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Animals
    **/
    _count?: true | AnimalCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AnimalAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AnimalSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AnimalMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AnimalMaxAggregateInputType
  }

  export type GetAnimalAggregateType<T extends AnimalAggregateArgs> = {
        [P in keyof T & keyof AggregateAnimal]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAnimal[P]>
      : GetScalarType<T[P], AggregateAnimal[P]>
  }




  export type AnimalGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AnimalWhereInput
    orderBy?: AnimalOrderByWithAggregationInput | AnimalOrderByWithAggregationInput[]
    by: AnimalScalarFieldEnum[] | AnimalScalarFieldEnum
    having?: AnimalScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AnimalCountAggregateInputType | true
    _avg?: AnimalAvgAggregateInputType
    _sum?: AnimalSumAggregateInputType
    _min?: AnimalMinAggregateInputType
    _max?: AnimalMaxAggregateInputType
  }

  export type AnimalGroupByOutputType = {
    id: number
    usuarioId: number
    nombre: string
    especie: $Enums.Especie
    sexo: $Enums.Sexo
    categoria: $Enums.CategoriaAnimal
    peso: number | null
    fechaNacimiento: Date | null
    observaciones: string | null
    createdAt: Date
    updatedAt: Date
    _count: AnimalCountAggregateOutputType | null
    _avg: AnimalAvgAggregateOutputType | null
    _sum: AnimalSumAggregateOutputType | null
    _min: AnimalMinAggregateOutputType | null
    _max: AnimalMaxAggregateOutputType | null
  }

  type GetAnimalGroupByPayload<T extends AnimalGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AnimalGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AnimalGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AnimalGroupByOutputType[P]>
            : GetScalarType<T[P], AnimalGroupByOutputType[P]>
        }
      >
    >


  export type AnimalSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    usuarioId?: boolean
    nombre?: boolean
    especie?: boolean
    sexo?: boolean
    categoria?: boolean
    peso?: boolean
    fechaNacimiento?: boolean
    observaciones?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
    preneces?: boolean | Animal$prenecesArgs<ExtArgs>
    pesos?: boolean | Animal$pesosArgs<ExtArgs>
    _count?: boolean | AnimalCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["animal"]>

  export type AnimalSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    usuarioId?: boolean
    nombre?: boolean
    especie?: boolean
    sexo?: boolean
    categoria?: boolean
    peso?: boolean
    fechaNacimiento?: boolean
    observaciones?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["animal"]>

  export type AnimalSelectScalar = {
    id?: boolean
    usuarioId?: boolean
    nombre?: boolean
    especie?: boolean
    sexo?: boolean
    categoria?: boolean
    peso?: boolean
    fechaNacimiento?: boolean
    observaciones?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AnimalInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
    preneces?: boolean | Animal$prenecesArgs<ExtArgs>
    pesos?: boolean | Animal$pesosArgs<ExtArgs>
    _count?: boolean | AnimalCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type AnimalIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
  }

  export type $AnimalPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Animal"
    objects: {
      usuario: Prisma.$UsuarioPayload<ExtArgs>
      preneces: Prisma.$PrenezPayload<ExtArgs>[]
      pesos: Prisma.$RegistroPesoPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      usuarioId: number
      nombre: string
      especie: $Enums.Especie
      sexo: $Enums.Sexo
      categoria: $Enums.CategoriaAnimal
      peso: number | null
      fechaNacimiento: Date | null
      observaciones: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["animal"]>
    composites: {}
  }

  type AnimalGetPayload<S extends boolean | null | undefined | AnimalDefaultArgs> = $Result.GetResult<Prisma.$AnimalPayload, S>

  type AnimalCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<AnimalFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: AnimalCountAggregateInputType | true
    }

  export interface AnimalDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Animal'], meta: { name: 'Animal' } }
    /**
     * Find zero or one Animal that matches the filter.
     * @param {AnimalFindUniqueArgs} args - Arguments to find a Animal
     * @example
     * // Get one Animal
     * const animal = await prisma.animal.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AnimalFindUniqueArgs>(args: SelectSubset<T, AnimalFindUniqueArgs<ExtArgs>>): Prisma__AnimalClient<$Result.GetResult<Prisma.$AnimalPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Animal that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {AnimalFindUniqueOrThrowArgs} args - Arguments to find a Animal
     * @example
     * // Get one Animal
     * const animal = await prisma.animal.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AnimalFindUniqueOrThrowArgs>(args: SelectSubset<T, AnimalFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AnimalClient<$Result.GetResult<Prisma.$AnimalPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Animal that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnimalFindFirstArgs} args - Arguments to find a Animal
     * @example
     * // Get one Animal
     * const animal = await prisma.animal.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AnimalFindFirstArgs>(args?: SelectSubset<T, AnimalFindFirstArgs<ExtArgs>>): Prisma__AnimalClient<$Result.GetResult<Prisma.$AnimalPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Animal that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnimalFindFirstOrThrowArgs} args - Arguments to find a Animal
     * @example
     * // Get one Animal
     * const animal = await prisma.animal.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AnimalFindFirstOrThrowArgs>(args?: SelectSubset<T, AnimalFindFirstOrThrowArgs<ExtArgs>>): Prisma__AnimalClient<$Result.GetResult<Prisma.$AnimalPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Animals that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnimalFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Animals
     * const animals = await prisma.animal.findMany()
     * 
     * // Get first 10 Animals
     * const animals = await prisma.animal.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const animalWithIdOnly = await prisma.animal.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AnimalFindManyArgs>(args?: SelectSubset<T, AnimalFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnimalPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Animal.
     * @param {AnimalCreateArgs} args - Arguments to create a Animal.
     * @example
     * // Create one Animal
     * const Animal = await prisma.animal.create({
     *   data: {
     *     // ... data to create a Animal
     *   }
     * })
     * 
     */
    create<T extends AnimalCreateArgs>(args: SelectSubset<T, AnimalCreateArgs<ExtArgs>>): Prisma__AnimalClient<$Result.GetResult<Prisma.$AnimalPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Animals.
     * @param {AnimalCreateManyArgs} args - Arguments to create many Animals.
     * @example
     * // Create many Animals
     * const animal = await prisma.animal.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AnimalCreateManyArgs>(args?: SelectSubset<T, AnimalCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Animals and returns the data saved in the database.
     * @param {AnimalCreateManyAndReturnArgs} args - Arguments to create many Animals.
     * @example
     * // Create many Animals
     * const animal = await prisma.animal.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Animals and only return the `id`
     * const animalWithIdOnly = await prisma.animal.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AnimalCreateManyAndReturnArgs>(args?: SelectSubset<T, AnimalCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnimalPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Animal.
     * @param {AnimalDeleteArgs} args - Arguments to delete one Animal.
     * @example
     * // Delete one Animal
     * const Animal = await prisma.animal.delete({
     *   where: {
     *     // ... filter to delete one Animal
     *   }
     * })
     * 
     */
    delete<T extends AnimalDeleteArgs>(args: SelectSubset<T, AnimalDeleteArgs<ExtArgs>>): Prisma__AnimalClient<$Result.GetResult<Prisma.$AnimalPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Animal.
     * @param {AnimalUpdateArgs} args - Arguments to update one Animal.
     * @example
     * // Update one Animal
     * const animal = await prisma.animal.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AnimalUpdateArgs>(args: SelectSubset<T, AnimalUpdateArgs<ExtArgs>>): Prisma__AnimalClient<$Result.GetResult<Prisma.$AnimalPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Animals.
     * @param {AnimalDeleteManyArgs} args - Arguments to filter Animals to delete.
     * @example
     * // Delete a few Animals
     * const { count } = await prisma.animal.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AnimalDeleteManyArgs>(args?: SelectSubset<T, AnimalDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Animals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnimalUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Animals
     * const animal = await prisma.animal.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AnimalUpdateManyArgs>(args: SelectSubset<T, AnimalUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Animal.
     * @param {AnimalUpsertArgs} args - Arguments to update or create a Animal.
     * @example
     * // Update or create a Animal
     * const animal = await prisma.animal.upsert({
     *   create: {
     *     // ... data to create a Animal
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Animal we want to update
     *   }
     * })
     */
    upsert<T extends AnimalUpsertArgs>(args: SelectSubset<T, AnimalUpsertArgs<ExtArgs>>): Prisma__AnimalClient<$Result.GetResult<Prisma.$AnimalPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Animals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnimalCountArgs} args - Arguments to filter Animals to count.
     * @example
     * // Count the number of Animals
     * const count = await prisma.animal.count({
     *   where: {
     *     // ... the filter for the Animals we want to count
     *   }
     * })
    **/
    count<T extends AnimalCountArgs>(
      args?: Subset<T, AnimalCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AnimalCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Animal.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnimalAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AnimalAggregateArgs>(args: Subset<T, AnimalAggregateArgs>): Prisma.PrismaPromise<GetAnimalAggregateType<T>>

    /**
     * Group by Animal.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnimalGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AnimalGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AnimalGroupByArgs['orderBy'] }
        : { orderBy?: AnimalGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AnimalGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAnimalGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Animal model
   */
  readonly fields: AnimalFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Animal.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AnimalClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    usuario<T extends UsuarioDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UsuarioDefaultArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    preneces<T extends Animal$prenecesArgs<ExtArgs> = {}>(args?: Subset<T, Animal$prenecesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PrenezPayload<ExtArgs>, T, "findMany"> | Null>
    pesos<T extends Animal$pesosArgs<ExtArgs> = {}>(args?: Subset<T, Animal$pesosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RegistroPesoPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Animal model
   */ 
  interface AnimalFieldRefs {
    readonly id: FieldRef<"Animal", 'Int'>
    readonly usuarioId: FieldRef<"Animal", 'Int'>
    readonly nombre: FieldRef<"Animal", 'String'>
    readonly especie: FieldRef<"Animal", 'Especie'>
    readonly sexo: FieldRef<"Animal", 'Sexo'>
    readonly categoria: FieldRef<"Animal", 'CategoriaAnimal'>
    readonly peso: FieldRef<"Animal", 'Float'>
    readonly fechaNacimiento: FieldRef<"Animal", 'DateTime'>
    readonly observaciones: FieldRef<"Animal", 'String'>
    readonly createdAt: FieldRef<"Animal", 'DateTime'>
    readonly updatedAt: FieldRef<"Animal", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Animal findUnique
   */
  export type AnimalFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Animal
     */
    select?: AnimalSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnimalInclude<ExtArgs> | null
    /**
     * Filter, which Animal to fetch.
     */
    where: AnimalWhereUniqueInput
  }

  /**
   * Animal findUniqueOrThrow
   */
  export type AnimalFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Animal
     */
    select?: AnimalSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnimalInclude<ExtArgs> | null
    /**
     * Filter, which Animal to fetch.
     */
    where: AnimalWhereUniqueInput
  }

  /**
   * Animal findFirst
   */
  export type AnimalFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Animal
     */
    select?: AnimalSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnimalInclude<ExtArgs> | null
    /**
     * Filter, which Animal to fetch.
     */
    where?: AnimalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Animals to fetch.
     */
    orderBy?: AnimalOrderByWithRelationInput | AnimalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Animals.
     */
    cursor?: AnimalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Animals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Animals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Animals.
     */
    distinct?: AnimalScalarFieldEnum | AnimalScalarFieldEnum[]
  }

  /**
   * Animal findFirstOrThrow
   */
  export type AnimalFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Animal
     */
    select?: AnimalSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnimalInclude<ExtArgs> | null
    /**
     * Filter, which Animal to fetch.
     */
    where?: AnimalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Animals to fetch.
     */
    orderBy?: AnimalOrderByWithRelationInput | AnimalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Animals.
     */
    cursor?: AnimalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Animals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Animals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Animals.
     */
    distinct?: AnimalScalarFieldEnum | AnimalScalarFieldEnum[]
  }

  /**
   * Animal findMany
   */
  export type AnimalFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Animal
     */
    select?: AnimalSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnimalInclude<ExtArgs> | null
    /**
     * Filter, which Animals to fetch.
     */
    where?: AnimalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Animals to fetch.
     */
    orderBy?: AnimalOrderByWithRelationInput | AnimalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Animals.
     */
    cursor?: AnimalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Animals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Animals.
     */
    skip?: number
    distinct?: AnimalScalarFieldEnum | AnimalScalarFieldEnum[]
  }

  /**
   * Animal create
   */
  export type AnimalCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Animal
     */
    select?: AnimalSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnimalInclude<ExtArgs> | null
    /**
     * The data needed to create a Animal.
     */
    data: XOR<AnimalCreateInput, AnimalUncheckedCreateInput>
  }

  /**
   * Animal createMany
   */
  export type AnimalCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Animals.
     */
    data: AnimalCreateManyInput | AnimalCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Animal createManyAndReturn
   */
  export type AnimalCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Animal
     */
    select?: AnimalSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Animals.
     */
    data: AnimalCreateManyInput | AnimalCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnimalIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Animal update
   */
  export type AnimalUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Animal
     */
    select?: AnimalSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnimalInclude<ExtArgs> | null
    /**
     * The data needed to update a Animal.
     */
    data: XOR<AnimalUpdateInput, AnimalUncheckedUpdateInput>
    /**
     * Choose, which Animal to update.
     */
    where: AnimalWhereUniqueInput
  }

  /**
   * Animal updateMany
   */
  export type AnimalUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Animals.
     */
    data: XOR<AnimalUpdateManyMutationInput, AnimalUncheckedUpdateManyInput>
    /**
     * Filter which Animals to update
     */
    where?: AnimalWhereInput
  }

  /**
   * Animal upsert
   */
  export type AnimalUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Animal
     */
    select?: AnimalSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnimalInclude<ExtArgs> | null
    /**
     * The filter to search for the Animal to update in case it exists.
     */
    where: AnimalWhereUniqueInput
    /**
     * In case the Animal found by the `where` argument doesn't exist, create a new Animal with this data.
     */
    create: XOR<AnimalCreateInput, AnimalUncheckedCreateInput>
    /**
     * In case the Animal was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AnimalUpdateInput, AnimalUncheckedUpdateInput>
  }

  /**
   * Animal delete
   */
  export type AnimalDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Animal
     */
    select?: AnimalSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnimalInclude<ExtArgs> | null
    /**
     * Filter which Animal to delete.
     */
    where: AnimalWhereUniqueInput
  }

  /**
   * Animal deleteMany
   */
  export type AnimalDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Animals to delete
     */
    where?: AnimalWhereInput
  }

  /**
   * Animal.preneces
   */
  export type Animal$prenecesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prenez
     */
    select?: PrenezSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrenezInclude<ExtArgs> | null
    where?: PrenezWhereInput
    orderBy?: PrenezOrderByWithRelationInput | PrenezOrderByWithRelationInput[]
    cursor?: PrenezWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PrenezScalarFieldEnum | PrenezScalarFieldEnum[]
  }

  /**
   * Animal.pesos
   */
  export type Animal$pesosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RegistroPeso
     */
    select?: RegistroPesoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegistroPesoInclude<ExtArgs> | null
    where?: RegistroPesoWhereInput
    orderBy?: RegistroPesoOrderByWithRelationInput | RegistroPesoOrderByWithRelationInput[]
    cursor?: RegistroPesoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RegistroPesoScalarFieldEnum | RegistroPesoScalarFieldEnum[]
  }

  /**
   * Animal without action
   */
  export type AnimalDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Animal
     */
    select?: AnimalSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnimalInclude<ExtArgs> | null
  }


  /**
   * Model Prenez
   */

  export type AggregatePrenez = {
    _count: PrenezCountAggregateOutputType | null
    _avg: PrenezAvgAggregateOutputType | null
    _sum: PrenezSumAggregateOutputType | null
    _min: PrenezMinAggregateOutputType | null
    _max: PrenezMaxAggregateOutputType | null
  }

  export type PrenezAvgAggregateOutputType = {
    id: number | null
    animalId: number | null
  }

  export type PrenezSumAggregateOutputType = {
    id: number | null
    animalId: number | null
  }

  export type PrenezMinAggregateOutputType = {
    id: number | null
    animalId: number | null
    fechaInicio: Date | null
    fechaEstimadaParto: Date | null
    estado: $Enums.EstadoPrenez | null
    observaciones: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PrenezMaxAggregateOutputType = {
    id: number | null
    animalId: number | null
    fechaInicio: Date | null
    fechaEstimadaParto: Date | null
    estado: $Enums.EstadoPrenez | null
    observaciones: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PrenezCountAggregateOutputType = {
    id: number
    animalId: number
    fechaInicio: number
    fechaEstimadaParto: number
    estado: number
    observaciones: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PrenezAvgAggregateInputType = {
    id?: true
    animalId?: true
  }

  export type PrenezSumAggregateInputType = {
    id?: true
    animalId?: true
  }

  export type PrenezMinAggregateInputType = {
    id?: true
    animalId?: true
    fechaInicio?: true
    fechaEstimadaParto?: true
    estado?: true
    observaciones?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PrenezMaxAggregateInputType = {
    id?: true
    animalId?: true
    fechaInicio?: true
    fechaEstimadaParto?: true
    estado?: true
    observaciones?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PrenezCountAggregateInputType = {
    id?: true
    animalId?: true
    fechaInicio?: true
    fechaEstimadaParto?: true
    estado?: true
    observaciones?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PrenezAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Prenez to aggregate.
     */
    where?: PrenezWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Prenezs to fetch.
     */
    orderBy?: PrenezOrderByWithRelationInput | PrenezOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PrenezWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Prenezs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Prenezs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Prenezs
    **/
    _count?: true | PrenezCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PrenezAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PrenezSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PrenezMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PrenezMaxAggregateInputType
  }

  export type GetPrenezAggregateType<T extends PrenezAggregateArgs> = {
        [P in keyof T & keyof AggregatePrenez]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePrenez[P]>
      : GetScalarType<T[P], AggregatePrenez[P]>
  }




  export type PrenezGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PrenezWhereInput
    orderBy?: PrenezOrderByWithAggregationInput | PrenezOrderByWithAggregationInput[]
    by: PrenezScalarFieldEnum[] | PrenezScalarFieldEnum
    having?: PrenezScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PrenezCountAggregateInputType | true
    _avg?: PrenezAvgAggregateInputType
    _sum?: PrenezSumAggregateInputType
    _min?: PrenezMinAggregateInputType
    _max?: PrenezMaxAggregateInputType
  }

  export type PrenezGroupByOutputType = {
    id: number
    animalId: number
    fechaInicio: Date
    fechaEstimadaParto: Date
    estado: $Enums.EstadoPrenez
    observaciones: string | null
    createdAt: Date
    updatedAt: Date
    _count: PrenezCountAggregateOutputType | null
    _avg: PrenezAvgAggregateOutputType | null
    _sum: PrenezSumAggregateOutputType | null
    _min: PrenezMinAggregateOutputType | null
    _max: PrenezMaxAggregateOutputType | null
  }

  type GetPrenezGroupByPayload<T extends PrenezGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PrenezGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PrenezGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PrenezGroupByOutputType[P]>
            : GetScalarType<T[P], PrenezGroupByOutputType[P]>
        }
      >
    >


  export type PrenezSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    animalId?: boolean
    fechaInicio?: boolean
    fechaEstimadaParto?: boolean
    estado?: boolean
    observaciones?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    animal?: boolean | AnimalDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["prenez"]>

  export type PrenezSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    animalId?: boolean
    fechaInicio?: boolean
    fechaEstimadaParto?: boolean
    estado?: boolean
    observaciones?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    animal?: boolean | AnimalDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["prenez"]>

  export type PrenezSelectScalar = {
    id?: boolean
    animalId?: boolean
    fechaInicio?: boolean
    fechaEstimadaParto?: boolean
    estado?: boolean
    observaciones?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PrenezInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    animal?: boolean | AnimalDefaultArgs<ExtArgs>
  }
  export type PrenezIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    animal?: boolean | AnimalDefaultArgs<ExtArgs>
  }

  export type $PrenezPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Prenez"
    objects: {
      animal: Prisma.$AnimalPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      animalId: number
      fechaInicio: Date
      fechaEstimadaParto: Date
      estado: $Enums.EstadoPrenez
      observaciones: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["prenez"]>
    composites: {}
  }

  type PrenezGetPayload<S extends boolean | null | undefined | PrenezDefaultArgs> = $Result.GetResult<Prisma.$PrenezPayload, S>

  type PrenezCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<PrenezFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: PrenezCountAggregateInputType | true
    }

  export interface PrenezDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Prenez'], meta: { name: 'Prenez' } }
    /**
     * Find zero or one Prenez that matches the filter.
     * @param {PrenezFindUniqueArgs} args - Arguments to find a Prenez
     * @example
     * // Get one Prenez
     * const prenez = await prisma.prenez.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PrenezFindUniqueArgs>(args: SelectSubset<T, PrenezFindUniqueArgs<ExtArgs>>): Prisma__PrenezClient<$Result.GetResult<Prisma.$PrenezPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Prenez that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {PrenezFindUniqueOrThrowArgs} args - Arguments to find a Prenez
     * @example
     * // Get one Prenez
     * const prenez = await prisma.prenez.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PrenezFindUniqueOrThrowArgs>(args: SelectSubset<T, PrenezFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PrenezClient<$Result.GetResult<Prisma.$PrenezPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Prenez that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PrenezFindFirstArgs} args - Arguments to find a Prenez
     * @example
     * // Get one Prenez
     * const prenez = await prisma.prenez.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PrenezFindFirstArgs>(args?: SelectSubset<T, PrenezFindFirstArgs<ExtArgs>>): Prisma__PrenezClient<$Result.GetResult<Prisma.$PrenezPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Prenez that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PrenezFindFirstOrThrowArgs} args - Arguments to find a Prenez
     * @example
     * // Get one Prenez
     * const prenez = await prisma.prenez.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PrenezFindFirstOrThrowArgs>(args?: SelectSubset<T, PrenezFindFirstOrThrowArgs<ExtArgs>>): Prisma__PrenezClient<$Result.GetResult<Prisma.$PrenezPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Prenezs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PrenezFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Prenezs
     * const prenezs = await prisma.prenez.findMany()
     * 
     * // Get first 10 Prenezs
     * const prenezs = await prisma.prenez.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const prenezWithIdOnly = await prisma.prenez.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PrenezFindManyArgs>(args?: SelectSubset<T, PrenezFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PrenezPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Prenez.
     * @param {PrenezCreateArgs} args - Arguments to create a Prenez.
     * @example
     * // Create one Prenez
     * const Prenez = await prisma.prenez.create({
     *   data: {
     *     // ... data to create a Prenez
     *   }
     * })
     * 
     */
    create<T extends PrenezCreateArgs>(args: SelectSubset<T, PrenezCreateArgs<ExtArgs>>): Prisma__PrenezClient<$Result.GetResult<Prisma.$PrenezPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Prenezs.
     * @param {PrenezCreateManyArgs} args - Arguments to create many Prenezs.
     * @example
     * // Create many Prenezs
     * const prenez = await prisma.prenez.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PrenezCreateManyArgs>(args?: SelectSubset<T, PrenezCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Prenezs and returns the data saved in the database.
     * @param {PrenezCreateManyAndReturnArgs} args - Arguments to create many Prenezs.
     * @example
     * // Create many Prenezs
     * const prenez = await prisma.prenez.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Prenezs and only return the `id`
     * const prenezWithIdOnly = await prisma.prenez.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PrenezCreateManyAndReturnArgs>(args?: SelectSubset<T, PrenezCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PrenezPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Prenez.
     * @param {PrenezDeleteArgs} args - Arguments to delete one Prenez.
     * @example
     * // Delete one Prenez
     * const Prenez = await prisma.prenez.delete({
     *   where: {
     *     // ... filter to delete one Prenez
     *   }
     * })
     * 
     */
    delete<T extends PrenezDeleteArgs>(args: SelectSubset<T, PrenezDeleteArgs<ExtArgs>>): Prisma__PrenezClient<$Result.GetResult<Prisma.$PrenezPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Prenez.
     * @param {PrenezUpdateArgs} args - Arguments to update one Prenez.
     * @example
     * // Update one Prenez
     * const prenez = await prisma.prenez.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PrenezUpdateArgs>(args: SelectSubset<T, PrenezUpdateArgs<ExtArgs>>): Prisma__PrenezClient<$Result.GetResult<Prisma.$PrenezPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Prenezs.
     * @param {PrenezDeleteManyArgs} args - Arguments to filter Prenezs to delete.
     * @example
     * // Delete a few Prenezs
     * const { count } = await prisma.prenez.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PrenezDeleteManyArgs>(args?: SelectSubset<T, PrenezDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Prenezs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PrenezUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Prenezs
     * const prenez = await prisma.prenez.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PrenezUpdateManyArgs>(args: SelectSubset<T, PrenezUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Prenez.
     * @param {PrenezUpsertArgs} args - Arguments to update or create a Prenez.
     * @example
     * // Update or create a Prenez
     * const prenez = await prisma.prenez.upsert({
     *   create: {
     *     // ... data to create a Prenez
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Prenez we want to update
     *   }
     * })
     */
    upsert<T extends PrenezUpsertArgs>(args: SelectSubset<T, PrenezUpsertArgs<ExtArgs>>): Prisma__PrenezClient<$Result.GetResult<Prisma.$PrenezPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Prenezs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PrenezCountArgs} args - Arguments to filter Prenezs to count.
     * @example
     * // Count the number of Prenezs
     * const count = await prisma.prenez.count({
     *   where: {
     *     // ... the filter for the Prenezs we want to count
     *   }
     * })
    **/
    count<T extends PrenezCountArgs>(
      args?: Subset<T, PrenezCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PrenezCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Prenez.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PrenezAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PrenezAggregateArgs>(args: Subset<T, PrenezAggregateArgs>): Prisma.PrismaPromise<GetPrenezAggregateType<T>>

    /**
     * Group by Prenez.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PrenezGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PrenezGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PrenezGroupByArgs['orderBy'] }
        : { orderBy?: PrenezGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PrenezGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPrenezGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Prenez model
   */
  readonly fields: PrenezFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Prenez.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PrenezClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    animal<T extends AnimalDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AnimalDefaultArgs<ExtArgs>>): Prisma__AnimalClient<$Result.GetResult<Prisma.$AnimalPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Prenez model
   */ 
  interface PrenezFieldRefs {
    readonly id: FieldRef<"Prenez", 'Int'>
    readonly animalId: FieldRef<"Prenez", 'Int'>
    readonly fechaInicio: FieldRef<"Prenez", 'DateTime'>
    readonly fechaEstimadaParto: FieldRef<"Prenez", 'DateTime'>
    readonly estado: FieldRef<"Prenez", 'EstadoPrenez'>
    readonly observaciones: FieldRef<"Prenez", 'String'>
    readonly createdAt: FieldRef<"Prenez", 'DateTime'>
    readonly updatedAt: FieldRef<"Prenez", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Prenez findUnique
   */
  export type PrenezFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prenez
     */
    select?: PrenezSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrenezInclude<ExtArgs> | null
    /**
     * Filter, which Prenez to fetch.
     */
    where: PrenezWhereUniqueInput
  }

  /**
   * Prenez findUniqueOrThrow
   */
  export type PrenezFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prenez
     */
    select?: PrenezSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrenezInclude<ExtArgs> | null
    /**
     * Filter, which Prenez to fetch.
     */
    where: PrenezWhereUniqueInput
  }

  /**
   * Prenez findFirst
   */
  export type PrenezFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prenez
     */
    select?: PrenezSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrenezInclude<ExtArgs> | null
    /**
     * Filter, which Prenez to fetch.
     */
    where?: PrenezWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Prenezs to fetch.
     */
    orderBy?: PrenezOrderByWithRelationInput | PrenezOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Prenezs.
     */
    cursor?: PrenezWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Prenezs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Prenezs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Prenezs.
     */
    distinct?: PrenezScalarFieldEnum | PrenezScalarFieldEnum[]
  }

  /**
   * Prenez findFirstOrThrow
   */
  export type PrenezFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prenez
     */
    select?: PrenezSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrenezInclude<ExtArgs> | null
    /**
     * Filter, which Prenez to fetch.
     */
    where?: PrenezWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Prenezs to fetch.
     */
    orderBy?: PrenezOrderByWithRelationInput | PrenezOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Prenezs.
     */
    cursor?: PrenezWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Prenezs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Prenezs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Prenezs.
     */
    distinct?: PrenezScalarFieldEnum | PrenezScalarFieldEnum[]
  }

  /**
   * Prenez findMany
   */
  export type PrenezFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prenez
     */
    select?: PrenezSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrenezInclude<ExtArgs> | null
    /**
     * Filter, which Prenezs to fetch.
     */
    where?: PrenezWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Prenezs to fetch.
     */
    orderBy?: PrenezOrderByWithRelationInput | PrenezOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Prenezs.
     */
    cursor?: PrenezWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Prenezs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Prenezs.
     */
    skip?: number
    distinct?: PrenezScalarFieldEnum | PrenezScalarFieldEnum[]
  }

  /**
   * Prenez create
   */
  export type PrenezCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prenez
     */
    select?: PrenezSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrenezInclude<ExtArgs> | null
    /**
     * The data needed to create a Prenez.
     */
    data: XOR<PrenezCreateInput, PrenezUncheckedCreateInput>
  }

  /**
   * Prenez createMany
   */
  export type PrenezCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Prenezs.
     */
    data: PrenezCreateManyInput | PrenezCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Prenez createManyAndReturn
   */
  export type PrenezCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prenez
     */
    select?: PrenezSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Prenezs.
     */
    data: PrenezCreateManyInput | PrenezCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrenezIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Prenez update
   */
  export type PrenezUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prenez
     */
    select?: PrenezSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrenezInclude<ExtArgs> | null
    /**
     * The data needed to update a Prenez.
     */
    data: XOR<PrenezUpdateInput, PrenezUncheckedUpdateInput>
    /**
     * Choose, which Prenez to update.
     */
    where: PrenezWhereUniqueInput
  }

  /**
   * Prenez updateMany
   */
  export type PrenezUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Prenezs.
     */
    data: XOR<PrenezUpdateManyMutationInput, PrenezUncheckedUpdateManyInput>
    /**
     * Filter which Prenezs to update
     */
    where?: PrenezWhereInput
  }

  /**
   * Prenez upsert
   */
  export type PrenezUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prenez
     */
    select?: PrenezSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrenezInclude<ExtArgs> | null
    /**
     * The filter to search for the Prenez to update in case it exists.
     */
    where: PrenezWhereUniqueInput
    /**
     * In case the Prenez found by the `where` argument doesn't exist, create a new Prenez with this data.
     */
    create: XOR<PrenezCreateInput, PrenezUncheckedCreateInput>
    /**
     * In case the Prenez was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PrenezUpdateInput, PrenezUncheckedUpdateInput>
  }

  /**
   * Prenez delete
   */
  export type PrenezDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prenez
     */
    select?: PrenezSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrenezInclude<ExtArgs> | null
    /**
     * Filter which Prenez to delete.
     */
    where: PrenezWhereUniqueInput
  }

  /**
   * Prenez deleteMany
   */
  export type PrenezDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Prenezs to delete
     */
    where?: PrenezWhereInput
  }

  /**
   * Prenez without action
   */
  export type PrenezDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prenez
     */
    select?: PrenezSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrenezInclude<ExtArgs> | null
  }


  /**
   * Model TareaRural
   */

  export type AggregateTareaRural = {
    _count: TareaRuralCountAggregateOutputType | null
    _avg: TareaRuralAvgAggregateOutputType | null
    _sum: TareaRuralSumAggregateOutputType | null
    _min: TareaRuralMinAggregateOutputType | null
    _max: TareaRuralMaxAggregateOutputType | null
  }

  export type TareaRuralAvgAggregateOutputType = {
    id: number | null
    usuarioId: number | null
    campoId: number | null
  }

  export type TareaRuralSumAggregateOutputType = {
    id: number | null
    usuarioId: number | null
    campoId: number | null
  }

  export type TareaRuralMinAggregateOutputType = {
    id: number | null
    usuarioId: number | null
    titulo: string | null
    descripcion: string | null
    tipo: $Enums.TipoTarea | null
    estado: $Enums.EstadoTarea | null
    prioridad: $Enums.Prioridad | null
    fechaProgramada: Date | null
    fechaCompletada: Date | null
    campoId: number | null
    observaciones: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TareaRuralMaxAggregateOutputType = {
    id: number | null
    usuarioId: number | null
    titulo: string | null
    descripcion: string | null
    tipo: $Enums.TipoTarea | null
    estado: $Enums.EstadoTarea | null
    prioridad: $Enums.Prioridad | null
    fechaProgramada: Date | null
    fechaCompletada: Date | null
    campoId: number | null
    observaciones: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TareaRuralCountAggregateOutputType = {
    id: number
    usuarioId: number
    titulo: number
    descripcion: number
    tipo: number
    estado: number
    prioridad: number
    fechaProgramada: number
    fechaCompletada: number
    campoId: number
    observaciones: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type TareaRuralAvgAggregateInputType = {
    id?: true
    usuarioId?: true
    campoId?: true
  }

  export type TareaRuralSumAggregateInputType = {
    id?: true
    usuarioId?: true
    campoId?: true
  }

  export type TareaRuralMinAggregateInputType = {
    id?: true
    usuarioId?: true
    titulo?: true
    descripcion?: true
    tipo?: true
    estado?: true
    prioridad?: true
    fechaProgramada?: true
    fechaCompletada?: true
    campoId?: true
    observaciones?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TareaRuralMaxAggregateInputType = {
    id?: true
    usuarioId?: true
    titulo?: true
    descripcion?: true
    tipo?: true
    estado?: true
    prioridad?: true
    fechaProgramada?: true
    fechaCompletada?: true
    campoId?: true
    observaciones?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TareaRuralCountAggregateInputType = {
    id?: true
    usuarioId?: true
    titulo?: true
    descripcion?: true
    tipo?: true
    estado?: true
    prioridad?: true
    fechaProgramada?: true
    fechaCompletada?: true
    campoId?: true
    observaciones?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type TareaRuralAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TareaRural to aggregate.
     */
    where?: TareaRuralWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TareaRurals to fetch.
     */
    orderBy?: TareaRuralOrderByWithRelationInput | TareaRuralOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TareaRuralWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TareaRurals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TareaRurals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TareaRurals
    **/
    _count?: true | TareaRuralCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TareaRuralAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TareaRuralSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TareaRuralMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TareaRuralMaxAggregateInputType
  }

  export type GetTareaRuralAggregateType<T extends TareaRuralAggregateArgs> = {
        [P in keyof T & keyof AggregateTareaRural]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTareaRural[P]>
      : GetScalarType<T[P], AggregateTareaRural[P]>
  }




  export type TareaRuralGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TareaRuralWhereInput
    orderBy?: TareaRuralOrderByWithAggregationInput | TareaRuralOrderByWithAggregationInput[]
    by: TareaRuralScalarFieldEnum[] | TareaRuralScalarFieldEnum
    having?: TareaRuralScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TareaRuralCountAggregateInputType | true
    _avg?: TareaRuralAvgAggregateInputType
    _sum?: TareaRuralSumAggregateInputType
    _min?: TareaRuralMinAggregateInputType
    _max?: TareaRuralMaxAggregateInputType
  }

  export type TareaRuralGroupByOutputType = {
    id: number
    usuarioId: number
    titulo: string
    descripcion: string | null
    tipo: $Enums.TipoTarea
    estado: $Enums.EstadoTarea
    prioridad: $Enums.Prioridad
    fechaProgramada: Date
    fechaCompletada: Date | null
    campoId: number | null
    observaciones: string | null
    createdAt: Date
    updatedAt: Date
    _count: TareaRuralCountAggregateOutputType | null
    _avg: TareaRuralAvgAggregateOutputType | null
    _sum: TareaRuralSumAggregateOutputType | null
    _min: TareaRuralMinAggregateOutputType | null
    _max: TareaRuralMaxAggregateOutputType | null
  }

  type GetTareaRuralGroupByPayload<T extends TareaRuralGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TareaRuralGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TareaRuralGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TareaRuralGroupByOutputType[P]>
            : GetScalarType<T[P], TareaRuralGroupByOutputType[P]>
        }
      >
    >


  export type TareaRuralSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    usuarioId?: boolean
    titulo?: boolean
    descripcion?: boolean
    tipo?: boolean
    estado?: boolean
    prioridad?: boolean
    fechaProgramada?: boolean
    fechaCompletada?: boolean
    campoId?: boolean
    observaciones?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
    campo?: boolean | TareaRural$campoArgs<ExtArgs>
  }, ExtArgs["result"]["tareaRural"]>

  export type TareaRuralSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    usuarioId?: boolean
    titulo?: boolean
    descripcion?: boolean
    tipo?: boolean
    estado?: boolean
    prioridad?: boolean
    fechaProgramada?: boolean
    fechaCompletada?: boolean
    campoId?: boolean
    observaciones?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
    campo?: boolean | TareaRural$campoArgs<ExtArgs>
  }, ExtArgs["result"]["tareaRural"]>

  export type TareaRuralSelectScalar = {
    id?: boolean
    usuarioId?: boolean
    titulo?: boolean
    descripcion?: boolean
    tipo?: boolean
    estado?: boolean
    prioridad?: boolean
    fechaProgramada?: boolean
    fechaCompletada?: boolean
    campoId?: boolean
    observaciones?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type TareaRuralInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
    campo?: boolean | TareaRural$campoArgs<ExtArgs>
  }
  export type TareaRuralIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
    campo?: boolean | TareaRural$campoArgs<ExtArgs>
  }

  export type $TareaRuralPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TareaRural"
    objects: {
      usuario: Prisma.$UsuarioPayload<ExtArgs>
      campo: Prisma.$CampoPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      usuarioId: number
      titulo: string
      descripcion: string | null
      tipo: $Enums.TipoTarea
      estado: $Enums.EstadoTarea
      prioridad: $Enums.Prioridad
      fechaProgramada: Date
      fechaCompletada: Date | null
      campoId: number | null
      observaciones: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["tareaRural"]>
    composites: {}
  }

  type TareaRuralGetPayload<S extends boolean | null | undefined | TareaRuralDefaultArgs> = $Result.GetResult<Prisma.$TareaRuralPayload, S>

  type TareaRuralCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<TareaRuralFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: TareaRuralCountAggregateInputType | true
    }

  export interface TareaRuralDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TareaRural'], meta: { name: 'TareaRural' } }
    /**
     * Find zero or one TareaRural that matches the filter.
     * @param {TareaRuralFindUniqueArgs} args - Arguments to find a TareaRural
     * @example
     * // Get one TareaRural
     * const tareaRural = await prisma.tareaRural.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TareaRuralFindUniqueArgs>(args: SelectSubset<T, TareaRuralFindUniqueArgs<ExtArgs>>): Prisma__TareaRuralClient<$Result.GetResult<Prisma.$TareaRuralPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one TareaRural that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {TareaRuralFindUniqueOrThrowArgs} args - Arguments to find a TareaRural
     * @example
     * // Get one TareaRural
     * const tareaRural = await prisma.tareaRural.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TareaRuralFindUniqueOrThrowArgs>(args: SelectSubset<T, TareaRuralFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TareaRuralClient<$Result.GetResult<Prisma.$TareaRuralPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first TareaRural that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TareaRuralFindFirstArgs} args - Arguments to find a TareaRural
     * @example
     * // Get one TareaRural
     * const tareaRural = await prisma.tareaRural.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TareaRuralFindFirstArgs>(args?: SelectSubset<T, TareaRuralFindFirstArgs<ExtArgs>>): Prisma__TareaRuralClient<$Result.GetResult<Prisma.$TareaRuralPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first TareaRural that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TareaRuralFindFirstOrThrowArgs} args - Arguments to find a TareaRural
     * @example
     * // Get one TareaRural
     * const tareaRural = await prisma.tareaRural.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TareaRuralFindFirstOrThrowArgs>(args?: SelectSubset<T, TareaRuralFindFirstOrThrowArgs<ExtArgs>>): Prisma__TareaRuralClient<$Result.GetResult<Prisma.$TareaRuralPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more TareaRurals that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TareaRuralFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TareaRurals
     * const tareaRurals = await prisma.tareaRural.findMany()
     * 
     * // Get first 10 TareaRurals
     * const tareaRurals = await prisma.tareaRural.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tareaRuralWithIdOnly = await prisma.tareaRural.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TareaRuralFindManyArgs>(args?: SelectSubset<T, TareaRuralFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TareaRuralPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a TareaRural.
     * @param {TareaRuralCreateArgs} args - Arguments to create a TareaRural.
     * @example
     * // Create one TareaRural
     * const TareaRural = await prisma.tareaRural.create({
     *   data: {
     *     // ... data to create a TareaRural
     *   }
     * })
     * 
     */
    create<T extends TareaRuralCreateArgs>(args: SelectSubset<T, TareaRuralCreateArgs<ExtArgs>>): Prisma__TareaRuralClient<$Result.GetResult<Prisma.$TareaRuralPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many TareaRurals.
     * @param {TareaRuralCreateManyArgs} args - Arguments to create many TareaRurals.
     * @example
     * // Create many TareaRurals
     * const tareaRural = await prisma.tareaRural.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TareaRuralCreateManyArgs>(args?: SelectSubset<T, TareaRuralCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TareaRurals and returns the data saved in the database.
     * @param {TareaRuralCreateManyAndReturnArgs} args - Arguments to create many TareaRurals.
     * @example
     * // Create many TareaRurals
     * const tareaRural = await prisma.tareaRural.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TareaRurals and only return the `id`
     * const tareaRuralWithIdOnly = await prisma.tareaRural.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TareaRuralCreateManyAndReturnArgs>(args?: SelectSubset<T, TareaRuralCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TareaRuralPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a TareaRural.
     * @param {TareaRuralDeleteArgs} args - Arguments to delete one TareaRural.
     * @example
     * // Delete one TareaRural
     * const TareaRural = await prisma.tareaRural.delete({
     *   where: {
     *     // ... filter to delete one TareaRural
     *   }
     * })
     * 
     */
    delete<T extends TareaRuralDeleteArgs>(args: SelectSubset<T, TareaRuralDeleteArgs<ExtArgs>>): Prisma__TareaRuralClient<$Result.GetResult<Prisma.$TareaRuralPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one TareaRural.
     * @param {TareaRuralUpdateArgs} args - Arguments to update one TareaRural.
     * @example
     * // Update one TareaRural
     * const tareaRural = await prisma.tareaRural.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TareaRuralUpdateArgs>(args: SelectSubset<T, TareaRuralUpdateArgs<ExtArgs>>): Prisma__TareaRuralClient<$Result.GetResult<Prisma.$TareaRuralPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more TareaRurals.
     * @param {TareaRuralDeleteManyArgs} args - Arguments to filter TareaRurals to delete.
     * @example
     * // Delete a few TareaRurals
     * const { count } = await prisma.tareaRural.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TareaRuralDeleteManyArgs>(args?: SelectSubset<T, TareaRuralDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TareaRurals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TareaRuralUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TareaRurals
     * const tareaRural = await prisma.tareaRural.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TareaRuralUpdateManyArgs>(args: SelectSubset<T, TareaRuralUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one TareaRural.
     * @param {TareaRuralUpsertArgs} args - Arguments to update or create a TareaRural.
     * @example
     * // Update or create a TareaRural
     * const tareaRural = await prisma.tareaRural.upsert({
     *   create: {
     *     // ... data to create a TareaRural
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TareaRural we want to update
     *   }
     * })
     */
    upsert<T extends TareaRuralUpsertArgs>(args: SelectSubset<T, TareaRuralUpsertArgs<ExtArgs>>): Prisma__TareaRuralClient<$Result.GetResult<Prisma.$TareaRuralPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of TareaRurals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TareaRuralCountArgs} args - Arguments to filter TareaRurals to count.
     * @example
     * // Count the number of TareaRurals
     * const count = await prisma.tareaRural.count({
     *   where: {
     *     // ... the filter for the TareaRurals we want to count
     *   }
     * })
    **/
    count<T extends TareaRuralCountArgs>(
      args?: Subset<T, TareaRuralCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TareaRuralCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TareaRural.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TareaRuralAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TareaRuralAggregateArgs>(args: Subset<T, TareaRuralAggregateArgs>): Prisma.PrismaPromise<GetTareaRuralAggregateType<T>>

    /**
     * Group by TareaRural.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TareaRuralGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TareaRuralGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TareaRuralGroupByArgs['orderBy'] }
        : { orderBy?: TareaRuralGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TareaRuralGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTareaRuralGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TareaRural model
   */
  readonly fields: TareaRuralFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TareaRural.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TareaRuralClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    usuario<T extends UsuarioDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UsuarioDefaultArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    campo<T extends TareaRural$campoArgs<ExtArgs> = {}>(args?: Subset<T, TareaRural$campoArgs<ExtArgs>>): Prisma__CampoClient<$Result.GetResult<Prisma.$CampoPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TareaRural model
   */ 
  interface TareaRuralFieldRefs {
    readonly id: FieldRef<"TareaRural", 'Int'>
    readonly usuarioId: FieldRef<"TareaRural", 'Int'>
    readonly titulo: FieldRef<"TareaRural", 'String'>
    readonly descripcion: FieldRef<"TareaRural", 'String'>
    readonly tipo: FieldRef<"TareaRural", 'TipoTarea'>
    readonly estado: FieldRef<"TareaRural", 'EstadoTarea'>
    readonly prioridad: FieldRef<"TareaRural", 'Prioridad'>
    readonly fechaProgramada: FieldRef<"TareaRural", 'DateTime'>
    readonly fechaCompletada: FieldRef<"TareaRural", 'DateTime'>
    readonly campoId: FieldRef<"TareaRural", 'Int'>
    readonly observaciones: FieldRef<"TareaRural", 'String'>
    readonly createdAt: FieldRef<"TareaRural", 'DateTime'>
    readonly updatedAt: FieldRef<"TareaRural", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * TareaRural findUnique
   */
  export type TareaRuralFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TareaRural
     */
    select?: TareaRuralSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TareaRuralInclude<ExtArgs> | null
    /**
     * Filter, which TareaRural to fetch.
     */
    where: TareaRuralWhereUniqueInput
  }

  /**
   * TareaRural findUniqueOrThrow
   */
  export type TareaRuralFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TareaRural
     */
    select?: TareaRuralSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TareaRuralInclude<ExtArgs> | null
    /**
     * Filter, which TareaRural to fetch.
     */
    where: TareaRuralWhereUniqueInput
  }

  /**
   * TareaRural findFirst
   */
  export type TareaRuralFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TareaRural
     */
    select?: TareaRuralSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TareaRuralInclude<ExtArgs> | null
    /**
     * Filter, which TareaRural to fetch.
     */
    where?: TareaRuralWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TareaRurals to fetch.
     */
    orderBy?: TareaRuralOrderByWithRelationInput | TareaRuralOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TareaRurals.
     */
    cursor?: TareaRuralWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TareaRurals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TareaRurals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TareaRurals.
     */
    distinct?: TareaRuralScalarFieldEnum | TareaRuralScalarFieldEnum[]
  }

  /**
   * TareaRural findFirstOrThrow
   */
  export type TareaRuralFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TareaRural
     */
    select?: TareaRuralSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TareaRuralInclude<ExtArgs> | null
    /**
     * Filter, which TareaRural to fetch.
     */
    where?: TareaRuralWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TareaRurals to fetch.
     */
    orderBy?: TareaRuralOrderByWithRelationInput | TareaRuralOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TareaRurals.
     */
    cursor?: TareaRuralWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TareaRurals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TareaRurals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TareaRurals.
     */
    distinct?: TareaRuralScalarFieldEnum | TareaRuralScalarFieldEnum[]
  }

  /**
   * TareaRural findMany
   */
  export type TareaRuralFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TareaRural
     */
    select?: TareaRuralSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TareaRuralInclude<ExtArgs> | null
    /**
     * Filter, which TareaRurals to fetch.
     */
    where?: TareaRuralWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TareaRurals to fetch.
     */
    orderBy?: TareaRuralOrderByWithRelationInput | TareaRuralOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TareaRurals.
     */
    cursor?: TareaRuralWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TareaRurals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TareaRurals.
     */
    skip?: number
    distinct?: TareaRuralScalarFieldEnum | TareaRuralScalarFieldEnum[]
  }

  /**
   * TareaRural create
   */
  export type TareaRuralCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TareaRural
     */
    select?: TareaRuralSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TareaRuralInclude<ExtArgs> | null
    /**
     * The data needed to create a TareaRural.
     */
    data: XOR<TareaRuralCreateInput, TareaRuralUncheckedCreateInput>
  }

  /**
   * TareaRural createMany
   */
  export type TareaRuralCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TareaRurals.
     */
    data: TareaRuralCreateManyInput | TareaRuralCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TareaRural createManyAndReturn
   */
  export type TareaRuralCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TareaRural
     */
    select?: TareaRuralSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many TareaRurals.
     */
    data: TareaRuralCreateManyInput | TareaRuralCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TareaRuralIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TareaRural update
   */
  export type TareaRuralUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TareaRural
     */
    select?: TareaRuralSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TareaRuralInclude<ExtArgs> | null
    /**
     * The data needed to update a TareaRural.
     */
    data: XOR<TareaRuralUpdateInput, TareaRuralUncheckedUpdateInput>
    /**
     * Choose, which TareaRural to update.
     */
    where: TareaRuralWhereUniqueInput
  }

  /**
   * TareaRural updateMany
   */
  export type TareaRuralUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TareaRurals.
     */
    data: XOR<TareaRuralUpdateManyMutationInput, TareaRuralUncheckedUpdateManyInput>
    /**
     * Filter which TareaRurals to update
     */
    where?: TareaRuralWhereInput
  }

  /**
   * TareaRural upsert
   */
  export type TareaRuralUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TareaRural
     */
    select?: TareaRuralSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TareaRuralInclude<ExtArgs> | null
    /**
     * The filter to search for the TareaRural to update in case it exists.
     */
    where: TareaRuralWhereUniqueInput
    /**
     * In case the TareaRural found by the `where` argument doesn't exist, create a new TareaRural with this data.
     */
    create: XOR<TareaRuralCreateInput, TareaRuralUncheckedCreateInput>
    /**
     * In case the TareaRural was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TareaRuralUpdateInput, TareaRuralUncheckedUpdateInput>
  }

  /**
   * TareaRural delete
   */
  export type TareaRuralDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TareaRural
     */
    select?: TareaRuralSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TareaRuralInclude<ExtArgs> | null
    /**
     * Filter which TareaRural to delete.
     */
    where: TareaRuralWhereUniqueInput
  }

  /**
   * TareaRural deleteMany
   */
  export type TareaRuralDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TareaRurals to delete
     */
    where?: TareaRuralWhereInput
  }

  /**
   * TareaRural.campo
   */
  export type TareaRural$campoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campo
     */
    select?: CampoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampoInclude<ExtArgs> | null
    where?: CampoWhereInput
  }

  /**
   * TareaRural without action
   */
  export type TareaRuralDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TareaRural
     */
    select?: TareaRuralSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TareaRuralInclude<ExtArgs> | null
  }


  /**
   * Model MovimientoFinanciero
   */

  export type AggregateMovimientoFinanciero = {
    _count: MovimientoFinancieroCountAggregateOutputType | null
    _avg: MovimientoFinancieroAvgAggregateOutputType | null
    _sum: MovimientoFinancieroSumAggregateOutputType | null
    _min: MovimientoFinancieroMinAggregateOutputType | null
    _max: MovimientoFinancieroMaxAggregateOutputType | null
  }

  export type MovimientoFinancieroAvgAggregateOutputType = {
    id: number | null
    usuarioId: number | null
    monto: number | null
    campoId: number | null
    siembraId: number | null
  }

  export type MovimientoFinancieroSumAggregateOutputType = {
    id: number | null
    usuarioId: number | null
    monto: number | null
    campoId: number | null
    siembraId: number | null
  }

  export type MovimientoFinancieroMinAggregateOutputType = {
    id: number | null
    usuarioId: number | null
    tipo: $Enums.TipoMovimiento | null
    concepto: string | null
    monto: number | null
    fecha: Date | null
    categoria: $Enums.CategoriaMovimiento | null
    campoId: number | null
    siembraId: number | null
    observaciones: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MovimientoFinancieroMaxAggregateOutputType = {
    id: number | null
    usuarioId: number | null
    tipo: $Enums.TipoMovimiento | null
    concepto: string | null
    monto: number | null
    fecha: Date | null
    categoria: $Enums.CategoriaMovimiento | null
    campoId: number | null
    siembraId: number | null
    observaciones: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MovimientoFinancieroCountAggregateOutputType = {
    id: number
    usuarioId: number
    tipo: number
    concepto: number
    monto: number
    fecha: number
    categoria: number
    campoId: number
    siembraId: number
    observaciones: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type MovimientoFinancieroAvgAggregateInputType = {
    id?: true
    usuarioId?: true
    monto?: true
    campoId?: true
    siembraId?: true
  }

  export type MovimientoFinancieroSumAggregateInputType = {
    id?: true
    usuarioId?: true
    monto?: true
    campoId?: true
    siembraId?: true
  }

  export type MovimientoFinancieroMinAggregateInputType = {
    id?: true
    usuarioId?: true
    tipo?: true
    concepto?: true
    monto?: true
    fecha?: true
    categoria?: true
    campoId?: true
    siembraId?: true
    observaciones?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MovimientoFinancieroMaxAggregateInputType = {
    id?: true
    usuarioId?: true
    tipo?: true
    concepto?: true
    monto?: true
    fecha?: true
    categoria?: true
    campoId?: true
    siembraId?: true
    observaciones?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MovimientoFinancieroCountAggregateInputType = {
    id?: true
    usuarioId?: true
    tipo?: true
    concepto?: true
    monto?: true
    fecha?: true
    categoria?: true
    campoId?: true
    siembraId?: true
    observaciones?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type MovimientoFinancieroAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MovimientoFinanciero to aggregate.
     */
    where?: MovimientoFinancieroWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MovimientoFinancieros to fetch.
     */
    orderBy?: MovimientoFinancieroOrderByWithRelationInput | MovimientoFinancieroOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MovimientoFinancieroWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MovimientoFinancieros from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MovimientoFinancieros.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MovimientoFinancieros
    **/
    _count?: true | MovimientoFinancieroCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MovimientoFinancieroAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MovimientoFinancieroSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MovimientoFinancieroMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MovimientoFinancieroMaxAggregateInputType
  }

  export type GetMovimientoFinancieroAggregateType<T extends MovimientoFinancieroAggregateArgs> = {
        [P in keyof T & keyof AggregateMovimientoFinanciero]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMovimientoFinanciero[P]>
      : GetScalarType<T[P], AggregateMovimientoFinanciero[P]>
  }




  export type MovimientoFinancieroGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MovimientoFinancieroWhereInput
    orderBy?: MovimientoFinancieroOrderByWithAggregationInput | MovimientoFinancieroOrderByWithAggregationInput[]
    by: MovimientoFinancieroScalarFieldEnum[] | MovimientoFinancieroScalarFieldEnum
    having?: MovimientoFinancieroScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MovimientoFinancieroCountAggregateInputType | true
    _avg?: MovimientoFinancieroAvgAggregateInputType
    _sum?: MovimientoFinancieroSumAggregateInputType
    _min?: MovimientoFinancieroMinAggregateInputType
    _max?: MovimientoFinancieroMaxAggregateInputType
  }

  export type MovimientoFinancieroGroupByOutputType = {
    id: number
    usuarioId: number
    tipo: $Enums.TipoMovimiento
    concepto: string
    monto: number
    fecha: Date
    categoria: $Enums.CategoriaMovimiento
    campoId: number | null
    siembraId: number | null
    observaciones: string | null
    createdAt: Date
    updatedAt: Date
    _count: MovimientoFinancieroCountAggregateOutputType | null
    _avg: MovimientoFinancieroAvgAggregateOutputType | null
    _sum: MovimientoFinancieroSumAggregateOutputType | null
    _min: MovimientoFinancieroMinAggregateOutputType | null
    _max: MovimientoFinancieroMaxAggregateOutputType | null
  }

  type GetMovimientoFinancieroGroupByPayload<T extends MovimientoFinancieroGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MovimientoFinancieroGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MovimientoFinancieroGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MovimientoFinancieroGroupByOutputType[P]>
            : GetScalarType<T[P], MovimientoFinancieroGroupByOutputType[P]>
        }
      >
    >


  export type MovimientoFinancieroSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    usuarioId?: boolean
    tipo?: boolean
    concepto?: boolean
    monto?: boolean
    fecha?: boolean
    categoria?: boolean
    campoId?: boolean
    siembraId?: boolean
    observaciones?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
    campo?: boolean | MovimientoFinanciero$campoArgs<ExtArgs>
    siembra?: boolean | MovimientoFinanciero$siembraArgs<ExtArgs>
  }, ExtArgs["result"]["movimientoFinanciero"]>

  export type MovimientoFinancieroSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    usuarioId?: boolean
    tipo?: boolean
    concepto?: boolean
    monto?: boolean
    fecha?: boolean
    categoria?: boolean
    campoId?: boolean
    siembraId?: boolean
    observaciones?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
    campo?: boolean | MovimientoFinanciero$campoArgs<ExtArgs>
    siembra?: boolean | MovimientoFinanciero$siembraArgs<ExtArgs>
  }, ExtArgs["result"]["movimientoFinanciero"]>

  export type MovimientoFinancieroSelectScalar = {
    id?: boolean
    usuarioId?: boolean
    tipo?: boolean
    concepto?: boolean
    monto?: boolean
    fecha?: boolean
    categoria?: boolean
    campoId?: boolean
    siembraId?: boolean
    observaciones?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type MovimientoFinancieroInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
    campo?: boolean | MovimientoFinanciero$campoArgs<ExtArgs>
    siembra?: boolean | MovimientoFinanciero$siembraArgs<ExtArgs>
  }
  export type MovimientoFinancieroIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
    campo?: boolean | MovimientoFinanciero$campoArgs<ExtArgs>
    siembra?: boolean | MovimientoFinanciero$siembraArgs<ExtArgs>
  }

  export type $MovimientoFinancieroPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MovimientoFinanciero"
    objects: {
      usuario: Prisma.$UsuarioPayload<ExtArgs>
      campo: Prisma.$CampoPayload<ExtArgs> | null
      siembra: Prisma.$SiembraPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      usuarioId: number
      tipo: $Enums.TipoMovimiento
      concepto: string
      monto: number
      fecha: Date
      categoria: $Enums.CategoriaMovimiento
      campoId: number | null
      siembraId: number | null
      observaciones: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["movimientoFinanciero"]>
    composites: {}
  }

  type MovimientoFinancieroGetPayload<S extends boolean | null | undefined | MovimientoFinancieroDefaultArgs> = $Result.GetResult<Prisma.$MovimientoFinancieroPayload, S>

  type MovimientoFinancieroCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<MovimientoFinancieroFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: MovimientoFinancieroCountAggregateInputType | true
    }

  export interface MovimientoFinancieroDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MovimientoFinanciero'], meta: { name: 'MovimientoFinanciero' } }
    /**
     * Find zero or one MovimientoFinanciero that matches the filter.
     * @param {MovimientoFinancieroFindUniqueArgs} args - Arguments to find a MovimientoFinanciero
     * @example
     * // Get one MovimientoFinanciero
     * const movimientoFinanciero = await prisma.movimientoFinanciero.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MovimientoFinancieroFindUniqueArgs>(args: SelectSubset<T, MovimientoFinancieroFindUniqueArgs<ExtArgs>>): Prisma__MovimientoFinancieroClient<$Result.GetResult<Prisma.$MovimientoFinancieroPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one MovimientoFinanciero that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {MovimientoFinancieroFindUniqueOrThrowArgs} args - Arguments to find a MovimientoFinanciero
     * @example
     * // Get one MovimientoFinanciero
     * const movimientoFinanciero = await prisma.movimientoFinanciero.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MovimientoFinancieroFindUniqueOrThrowArgs>(args: SelectSubset<T, MovimientoFinancieroFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MovimientoFinancieroClient<$Result.GetResult<Prisma.$MovimientoFinancieroPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first MovimientoFinanciero that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MovimientoFinancieroFindFirstArgs} args - Arguments to find a MovimientoFinanciero
     * @example
     * // Get one MovimientoFinanciero
     * const movimientoFinanciero = await prisma.movimientoFinanciero.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MovimientoFinancieroFindFirstArgs>(args?: SelectSubset<T, MovimientoFinancieroFindFirstArgs<ExtArgs>>): Prisma__MovimientoFinancieroClient<$Result.GetResult<Prisma.$MovimientoFinancieroPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first MovimientoFinanciero that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MovimientoFinancieroFindFirstOrThrowArgs} args - Arguments to find a MovimientoFinanciero
     * @example
     * // Get one MovimientoFinanciero
     * const movimientoFinanciero = await prisma.movimientoFinanciero.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MovimientoFinancieroFindFirstOrThrowArgs>(args?: SelectSubset<T, MovimientoFinancieroFindFirstOrThrowArgs<ExtArgs>>): Prisma__MovimientoFinancieroClient<$Result.GetResult<Prisma.$MovimientoFinancieroPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more MovimientoFinancieros that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MovimientoFinancieroFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MovimientoFinancieros
     * const movimientoFinancieros = await prisma.movimientoFinanciero.findMany()
     * 
     * // Get first 10 MovimientoFinancieros
     * const movimientoFinancieros = await prisma.movimientoFinanciero.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const movimientoFinancieroWithIdOnly = await prisma.movimientoFinanciero.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MovimientoFinancieroFindManyArgs>(args?: SelectSubset<T, MovimientoFinancieroFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MovimientoFinancieroPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a MovimientoFinanciero.
     * @param {MovimientoFinancieroCreateArgs} args - Arguments to create a MovimientoFinanciero.
     * @example
     * // Create one MovimientoFinanciero
     * const MovimientoFinanciero = await prisma.movimientoFinanciero.create({
     *   data: {
     *     // ... data to create a MovimientoFinanciero
     *   }
     * })
     * 
     */
    create<T extends MovimientoFinancieroCreateArgs>(args: SelectSubset<T, MovimientoFinancieroCreateArgs<ExtArgs>>): Prisma__MovimientoFinancieroClient<$Result.GetResult<Prisma.$MovimientoFinancieroPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many MovimientoFinancieros.
     * @param {MovimientoFinancieroCreateManyArgs} args - Arguments to create many MovimientoFinancieros.
     * @example
     * // Create many MovimientoFinancieros
     * const movimientoFinanciero = await prisma.movimientoFinanciero.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MovimientoFinancieroCreateManyArgs>(args?: SelectSubset<T, MovimientoFinancieroCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MovimientoFinancieros and returns the data saved in the database.
     * @param {MovimientoFinancieroCreateManyAndReturnArgs} args - Arguments to create many MovimientoFinancieros.
     * @example
     * // Create many MovimientoFinancieros
     * const movimientoFinanciero = await prisma.movimientoFinanciero.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MovimientoFinancieros and only return the `id`
     * const movimientoFinancieroWithIdOnly = await prisma.movimientoFinanciero.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MovimientoFinancieroCreateManyAndReturnArgs>(args?: SelectSubset<T, MovimientoFinancieroCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MovimientoFinancieroPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a MovimientoFinanciero.
     * @param {MovimientoFinancieroDeleteArgs} args - Arguments to delete one MovimientoFinanciero.
     * @example
     * // Delete one MovimientoFinanciero
     * const MovimientoFinanciero = await prisma.movimientoFinanciero.delete({
     *   where: {
     *     // ... filter to delete one MovimientoFinanciero
     *   }
     * })
     * 
     */
    delete<T extends MovimientoFinancieroDeleteArgs>(args: SelectSubset<T, MovimientoFinancieroDeleteArgs<ExtArgs>>): Prisma__MovimientoFinancieroClient<$Result.GetResult<Prisma.$MovimientoFinancieroPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one MovimientoFinanciero.
     * @param {MovimientoFinancieroUpdateArgs} args - Arguments to update one MovimientoFinanciero.
     * @example
     * // Update one MovimientoFinanciero
     * const movimientoFinanciero = await prisma.movimientoFinanciero.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MovimientoFinancieroUpdateArgs>(args: SelectSubset<T, MovimientoFinancieroUpdateArgs<ExtArgs>>): Prisma__MovimientoFinancieroClient<$Result.GetResult<Prisma.$MovimientoFinancieroPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more MovimientoFinancieros.
     * @param {MovimientoFinancieroDeleteManyArgs} args - Arguments to filter MovimientoFinancieros to delete.
     * @example
     * // Delete a few MovimientoFinancieros
     * const { count } = await prisma.movimientoFinanciero.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MovimientoFinancieroDeleteManyArgs>(args?: SelectSubset<T, MovimientoFinancieroDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MovimientoFinancieros.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MovimientoFinancieroUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MovimientoFinancieros
     * const movimientoFinanciero = await prisma.movimientoFinanciero.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MovimientoFinancieroUpdateManyArgs>(args: SelectSubset<T, MovimientoFinancieroUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one MovimientoFinanciero.
     * @param {MovimientoFinancieroUpsertArgs} args - Arguments to update or create a MovimientoFinanciero.
     * @example
     * // Update or create a MovimientoFinanciero
     * const movimientoFinanciero = await prisma.movimientoFinanciero.upsert({
     *   create: {
     *     // ... data to create a MovimientoFinanciero
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MovimientoFinanciero we want to update
     *   }
     * })
     */
    upsert<T extends MovimientoFinancieroUpsertArgs>(args: SelectSubset<T, MovimientoFinancieroUpsertArgs<ExtArgs>>): Prisma__MovimientoFinancieroClient<$Result.GetResult<Prisma.$MovimientoFinancieroPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of MovimientoFinancieros.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MovimientoFinancieroCountArgs} args - Arguments to filter MovimientoFinancieros to count.
     * @example
     * // Count the number of MovimientoFinancieros
     * const count = await prisma.movimientoFinanciero.count({
     *   where: {
     *     // ... the filter for the MovimientoFinancieros we want to count
     *   }
     * })
    **/
    count<T extends MovimientoFinancieroCountArgs>(
      args?: Subset<T, MovimientoFinancieroCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MovimientoFinancieroCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MovimientoFinanciero.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MovimientoFinancieroAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MovimientoFinancieroAggregateArgs>(args: Subset<T, MovimientoFinancieroAggregateArgs>): Prisma.PrismaPromise<GetMovimientoFinancieroAggregateType<T>>

    /**
     * Group by MovimientoFinanciero.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MovimientoFinancieroGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MovimientoFinancieroGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MovimientoFinancieroGroupByArgs['orderBy'] }
        : { orderBy?: MovimientoFinancieroGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MovimientoFinancieroGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMovimientoFinancieroGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MovimientoFinanciero model
   */
  readonly fields: MovimientoFinancieroFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MovimientoFinanciero.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MovimientoFinancieroClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    usuario<T extends UsuarioDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UsuarioDefaultArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    campo<T extends MovimientoFinanciero$campoArgs<ExtArgs> = {}>(args?: Subset<T, MovimientoFinanciero$campoArgs<ExtArgs>>): Prisma__CampoClient<$Result.GetResult<Prisma.$CampoPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    siembra<T extends MovimientoFinanciero$siembraArgs<ExtArgs> = {}>(args?: Subset<T, MovimientoFinanciero$siembraArgs<ExtArgs>>): Prisma__SiembraClient<$Result.GetResult<Prisma.$SiembraPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the MovimientoFinanciero model
   */ 
  interface MovimientoFinancieroFieldRefs {
    readonly id: FieldRef<"MovimientoFinanciero", 'Int'>
    readonly usuarioId: FieldRef<"MovimientoFinanciero", 'Int'>
    readonly tipo: FieldRef<"MovimientoFinanciero", 'TipoMovimiento'>
    readonly concepto: FieldRef<"MovimientoFinanciero", 'String'>
    readonly monto: FieldRef<"MovimientoFinanciero", 'Float'>
    readonly fecha: FieldRef<"MovimientoFinanciero", 'DateTime'>
    readonly categoria: FieldRef<"MovimientoFinanciero", 'CategoriaMovimiento'>
    readonly campoId: FieldRef<"MovimientoFinanciero", 'Int'>
    readonly siembraId: FieldRef<"MovimientoFinanciero", 'Int'>
    readonly observaciones: FieldRef<"MovimientoFinanciero", 'String'>
    readonly createdAt: FieldRef<"MovimientoFinanciero", 'DateTime'>
    readonly updatedAt: FieldRef<"MovimientoFinanciero", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * MovimientoFinanciero findUnique
   */
  export type MovimientoFinancieroFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MovimientoFinanciero
     */
    select?: MovimientoFinancieroSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovimientoFinancieroInclude<ExtArgs> | null
    /**
     * Filter, which MovimientoFinanciero to fetch.
     */
    where: MovimientoFinancieroWhereUniqueInput
  }

  /**
   * MovimientoFinanciero findUniqueOrThrow
   */
  export type MovimientoFinancieroFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MovimientoFinanciero
     */
    select?: MovimientoFinancieroSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovimientoFinancieroInclude<ExtArgs> | null
    /**
     * Filter, which MovimientoFinanciero to fetch.
     */
    where: MovimientoFinancieroWhereUniqueInput
  }

  /**
   * MovimientoFinanciero findFirst
   */
  export type MovimientoFinancieroFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MovimientoFinanciero
     */
    select?: MovimientoFinancieroSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovimientoFinancieroInclude<ExtArgs> | null
    /**
     * Filter, which MovimientoFinanciero to fetch.
     */
    where?: MovimientoFinancieroWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MovimientoFinancieros to fetch.
     */
    orderBy?: MovimientoFinancieroOrderByWithRelationInput | MovimientoFinancieroOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MovimientoFinancieros.
     */
    cursor?: MovimientoFinancieroWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MovimientoFinancieros from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MovimientoFinancieros.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MovimientoFinancieros.
     */
    distinct?: MovimientoFinancieroScalarFieldEnum | MovimientoFinancieroScalarFieldEnum[]
  }

  /**
   * MovimientoFinanciero findFirstOrThrow
   */
  export type MovimientoFinancieroFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MovimientoFinanciero
     */
    select?: MovimientoFinancieroSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovimientoFinancieroInclude<ExtArgs> | null
    /**
     * Filter, which MovimientoFinanciero to fetch.
     */
    where?: MovimientoFinancieroWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MovimientoFinancieros to fetch.
     */
    orderBy?: MovimientoFinancieroOrderByWithRelationInput | MovimientoFinancieroOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MovimientoFinancieros.
     */
    cursor?: MovimientoFinancieroWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MovimientoFinancieros from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MovimientoFinancieros.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MovimientoFinancieros.
     */
    distinct?: MovimientoFinancieroScalarFieldEnum | MovimientoFinancieroScalarFieldEnum[]
  }

  /**
   * MovimientoFinanciero findMany
   */
  export type MovimientoFinancieroFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MovimientoFinanciero
     */
    select?: MovimientoFinancieroSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovimientoFinancieroInclude<ExtArgs> | null
    /**
     * Filter, which MovimientoFinancieros to fetch.
     */
    where?: MovimientoFinancieroWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MovimientoFinancieros to fetch.
     */
    orderBy?: MovimientoFinancieroOrderByWithRelationInput | MovimientoFinancieroOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MovimientoFinancieros.
     */
    cursor?: MovimientoFinancieroWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MovimientoFinancieros from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MovimientoFinancieros.
     */
    skip?: number
    distinct?: MovimientoFinancieroScalarFieldEnum | MovimientoFinancieroScalarFieldEnum[]
  }

  /**
   * MovimientoFinanciero create
   */
  export type MovimientoFinancieroCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MovimientoFinanciero
     */
    select?: MovimientoFinancieroSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovimientoFinancieroInclude<ExtArgs> | null
    /**
     * The data needed to create a MovimientoFinanciero.
     */
    data: XOR<MovimientoFinancieroCreateInput, MovimientoFinancieroUncheckedCreateInput>
  }

  /**
   * MovimientoFinanciero createMany
   */
  export type MovimientoFinancieroCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MovimientoFinancieros.
     */
    data: MovimientoFinancieroCreateManyInput | MovimientoFinancieroCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MovimientoFinanciero createManyAndReturn
   */
  export type MovimientoFinancieroCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MovimientoFinanciero
     */
    select?: MovimientoFinancieroSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many MovimientoFinancieros.
     */
    data: MovimientoFinancieroCreateManyInput | MovimientoFinancieroCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovimientoFinancieroIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * MovimientoFinanciero update
   */
  export type MovimientoFinancieroUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MovimientoFinanciero
     */
    select?: MovimientoFinancieroSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovimientoFinancieroInclude<ExtArgs> | null
    /**
     * The data needed to update a MovimientoFinanciero.
     */
    data: XOR<MovimientoFinancieroUpdateInput, MovimientoFinancieroUncheckedUpdateInput>
    /**
     * Choose, which MovimientoFinanciero to update.
     */
    where: MovimientoFinancieroWhereUniqueInput
  }

  /**
   * MovimientoFinanciero updateMany
   */
  export type MovimientoFinancieroUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MovimientoFinancieros.
     */
    data: XOR<MovimientoFinancieroUpdateManyMutationInput, MovimientoFinancieroUncheckedUpdateManyInput>
    /**
     * Filter which MovimientoFinancieros to update
     */
    where?: MovimientoFinancieroWhereInput
  }

  /**
   * MovimientoFinanciero upsert
   */
  export type MovimientoFinancieroUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MovimientoFinanciero
     */
    select?: MovimientoFinancieroSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovimientoFinancieroInclude<ExtArgs> | null
    /**
     * The filter to search for the MovimientoFinanciero to update in case it exists.
     */
    where: MovimientoFinancieroWhereUniqueInput
    /**
     * In case the MovimientoFinanciero found by the `where` argument doesn't exist, create a new MovimientoFinanciero with this data.
     */
    create: XOR<MovimientoFinancieroCreateInput, MovimientoFinancieroUncheckedCreateInput>
    /**
     * In case the MovimientoFinanciero was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MovimientoFinancieroUpdateInput, MovimientoFinancieroUncheckedUpdateInput>
  }

  /**
   * MovimientoFinanciero delete
   */
  export type MovimientoFinancieroDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MovimientoFinanciero
     */
    select?: MovimientoFinancieroSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovimientoFinancieroInclude<ExtArgs> | null
    /**
     * Filter which MovimientoFinanciero to delete.
     */
    where: MovimientoFinancieroWhereUniqueInput
  }

  /**
   * MovimientoFinanciero deleteMany
   */
  export type MovimientoFinancieroDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MovimientoFinancieros to delete
     */
    where?: MovimientoFinancieroWhereInput
  }

  /**
   * MovimientoFinanciero.campo
   */
  export type MovimientoFinanciero$campoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campo
     */
    select?: CampoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampoInclude<ExtArgs> | null
    where?: CampoWhereInput
  }

  /**
   * MovimientoFinanciero.siembra
   */
  export type MovimientoFinanciero$siembraArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Siembra
     */
    select?: SiembraSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SiembraInclude<ExtArgs> | null
    where?: SiembraWhereInput
  }

  /**
   * MovimientoFinanciero without action
   */
  export type MovimientoFinancieroDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MovimientoFinanciero
     */
    select?: MovimientoFinancieroSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovimientoFinancieroInclude<ExtArgs> | null
  }


  /**
   * Model Campania
   */

  export type AggregateCampania = {
    _count: CampaniaCountAggregateOutputType | null
    _avg: CampaniaAvgAggregateOutputType | null
    _sum: CampaniaSumAggregateOutputType | null
    _min: CampaniaMinAggregateOutputType | null
    _max: CampaniaMaxAggregateOutputType | null
  }

  export type CampaniaAvgAggregateOutputType = {
    id: number | null
    usuarioId: number | null
  }

  export type CampaniaSumAggregateOutputType = {
    id: number | null
    usuarioId: number | null
  }

  export type CampaniaMinAggregateOutputType = {
    id: number | null
    usuarioId: number | null
    nombre: string | null
    fechaInicio: Date | null
    fechaFin: Date | null
    descripcion: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CampaniaMaxAggregateOutputType = {
    id: number | null
    usuarioId: number | null
    nombre: string | null
    fechaInicio: Date | null
    fechaFin: Date | null
    descripcion: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CampaniaCountAggregateOutputType = {
    id: number
    usuarioId: number
    nombre: number
    fechaInicio: number
    fechaFin: number
    descripcion: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CampaniaAvgAggregateInputType = {
    id?: true
    usuarioId?: true
  }

  export type CampaniaSumAggregateInputType = {
    id?: true
    usuarioId?: true
  }

  export type CampaniaMinAggregateInputType = {
    id?: true
    usuarioId?: true
    nombre?: true
    fechaInicio?: true
    fechaFin?: true
    descripcion?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CampaniaMaxAggregateInputType = {
    id?: true
    usuarioId?: true
    nombre?: true
    fechaInicio?: true
    fechaFin?: true
    descripcion?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CampaniaCountAggregateInputType = {
    id?: true
    usuarioId?: true
    nombre?: true
    fechaInicio?: true
    fechaFin?: true
    descripcion?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CampaniaAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Campania to aggregate.
     */
    where?: CampaniaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Campanias to fetch.
     */
    orderBy?: CampaniaOrderByWithRelationInput | CampaniaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CampaniaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Campanias from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Campanias.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Campanias
    **/
    _count?: true | CampaniaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CampaniaAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CampaniaSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CampaniaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CampaniaMaxAggregateInputType
  }

  export type GetCampaniaAggregateType<T extends CampaniaAggregateArgs> = {
        [P in keyof T & keyof AggregateCampania]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCampania[P]>
      : GetScalarType<T[P], AggregateCampania[P]>
  }




  export type CampaniaGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CampaniaWhereInput
    orderBy?: CampaniaOrderByWithAggregationInput | CampaniaOrderByWithAggregationInput[]
    by: CampaniaScalarFieldEnum[] | CampaniaScalarFieldEnum
    having?: CampaniaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CampaniaCountAggregateInputType | true
    _avg?: CampaniaAvgAggregateInputType
    _sum?: CampaniaSumAggregateInputType
    _min?: CampaniaMinAggregateInputType
    _max?: CampaniaMaxAggregateInputType
  }

  export type CampaniaGroupByOutputType = {
    id: number
    usuarioId: number
    nombre: string
    fechaInicio: Date
    fechaFin: Date | null
    descripcion: string | null
    createdAt: Date
    updatedAt: Date
    _count: CampaniaCountAggregateOutputType | null
    _avg: CampaniaAvgAggregateOutputType | null
    _sum: CampaniaSumAggregateOutputType | null
    _min: CampaniaMinAggregateOutputType | null
    _max: CampaniaMaxAggregateOutputType | null
  }

  type GetCampaniaGroupByPayload<T extends CampaniaGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CampaniaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CampaniaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CampaniaGroupByOutputType[P]>
            : GetScalarType<T[P], CampaniaGroupByOutputType[P]>
        }
      >
    >


  export type CampaniaSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    usuarioId?: boolean
    nombre?: boolean
    fechaInicio?: boolean
    fechaFin?: boolean
    descripcion?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
    siembras?: boolean | Campania$siembrasArgs<ExtArgs>
    _count?: boolean | CampaniaCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["campania"]>

  export type CampaniaSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    usuarioId?: boolean
    nombre?: boolean
    fechaInicio?: boolean
    fechaFin?: boolean
    descripcion?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["campania"]>

  export type CampaniaSelectScalar = {
    id?: boolean
    usuarioId?: boolean
    nombre?: boolean
    fechaInicio?: boolean
    fechaFin?: boolean
    descripcion?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CampaniaInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
    siembras?: boolean | Campania$siembrasArgs<ExtArgs>
    _count?: boolean | CampaniaCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CampaniaIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
  }

  export type $CampaniaPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Campania"
    objects: {
      usuario: Prisma.$UsuarioPayload<ExtArgs>
      siembras: Prisma.$SiembraPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      usuarioId: number
      nombre: string
      fechaInicio: Date
      fechaFin: Date | null
      descripcion: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["campania"]>
    composites: {}
  }

  type CampaniaGetPayload<S extends boolean | null | undefined | CampaniaDefaultArgs> = $Result.GetResult<Prisma.$CampaniaPayload, S>

  type CampaniaCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<CampaniaFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: CampaniaCountAggregateInputType | true
    }

  export interface CampaniaDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Campania'], meta: { name: 'Campania' } }
    /**
     * Find zero or one Campania that matches the filter.
     * @param {CampaniaFindUniqueArgs} args - Arguments to find a Campania
     * @example
     * // Get one Campania
     * const campania = await prisma.campania.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CampaniaFindUniqueArgs>(args: SelectSubset<T, CampaniaFindUniqueArgs<ExtArgs>>): Prisma__CampaniaClient<$Result.GetResult<Prisma.$CampaniaPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Campania that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {CampaniaFindUniqueOrThrowArgs} args - Arguments to find a Campania
     * @example
     * // Get one Campania
     * const campania = await prisma.campania.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CampaniaFindUniqueOrThrowArgs>(args: SelectSubset<T, CampaniaFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CampaniaClient<$Result.GetResult<Prisma.$CampaniaPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Campania that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampaniaFindFirstArgs} args - Arguments to find a Campania
     * @example
     * // Get one Campania
     * const campania = await prisma.campania.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CampaniaFindFirstArgs>(args?: SelectSubset<T, CampaniaFindFirstArgs<ExtArgs>>): Prisma__CampaniaClient<$Result.GetResult<Prisma.$CampaniaPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Campania that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampaniaFindFirstOrThrowArgs} args - Arguments to find a Campania
     * @example
     * // Get one Campania
     * const campania = await prisma.campania.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CampaniaFindFirstOrThrowArgs>(args?: SelectSubset<T, CampaniaFindFirstOrThrowArgs<ExtArgs>>): Prisma__CampaniaClient<$Result.GetResult<Prisma.$CampaniaPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Campanias that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampaniaFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Campanias
     * const campanias = await prisma.campania.findMany()
     * 
     * // Get first 10 Campanias
     * const campanias = await prisma.campania.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const campaniaWithIdOnly = await prisma.campania.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CampaniaFindManyArgs>(args?: SelectSubset<T, CampaniaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CampaniaPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Campania.
     * @param {CampaniaCreateArgs} args - Arguments to create a Campania.
     * @example
     * // Create one Campania
     * const Campania = await prisma.campania.create({
     *   data: {
     *     // ... data to create a Campania
     *   }
     * })
     * 
     */
    create<T extends CampaniaCreateArgs>(args: SelectSubset<T, CampaniaCreateArgs<ExtArgs>>): Prisma__CampaniaClient<$Result.GetResult<Prisma.$CampaniaPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Campanias.
     * @param {CampaniaCreateManyArgs} args - Arguments to create many Campanias.
     * @example
     * // Create many Campanias
     * const campania = await prisma.campania.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CampaniaCreateManyArgs>(args?: SelectSubset<T, CampaniaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Campanias and returns the data saved in the database.
     * @param {CampaniaCreateManyAndReturnArgs} args - Arguments to create many Campanias.
     * @example
     * // Create many Campanias
     * const campania = await prisma.campania.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Campanias and only return the `id`
     * const campaniaWithIdOnly = await prisma.campania.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CampaniaCreateManyAndReturnArgs>(args?: SelectSubset<T, CampaniaCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CampaniaPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Campania.
     * @param {CampaniaDeleteArgs} args - Arguments to delete one Campania.
     * @example
     * // Delete one Campania
     * const Campania = await prisma.campania.delete({
     *   where: {
     *     // ... filter to delete one Campania
     *   }
     * })
     * 
     */
    delete<T extends CampaniaDeleteArgs>(args: SelectSubset<T, CampaniaDeleteArgs<ExtArgs>>): Prisma__CampaniaClient<$Result.GetResult<Prisma.$CampaniaPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Campania.
     * @param {CampaniaUpdateArgs} args - Arguments to update one Campania.
     * @example
     * // Update one Campania
     * const campania = await prisma.campania.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CampaniaUpdateArgs>(args: SelectSubset<T, CampaniaUpdateArgs<ExtArgs>>): Prisma__CampaniaClient<$Result.GetResult<Prisma.$CampaniaPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Campanias.
     * @param {CampaniaDeleteManyArgs} args - Arguments to filter Campanias to delete.
     * @example
     * // Delete a few Campanias
     * const { count } = await prisma.campania.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CampaniaDeleteManyArgs>(args?: SelectSubset<T, CampaniaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Campanias.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampaniaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Campanias
     * const campania = await prisma.campania.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CampaniaUpdateManyArgs>(args: SelectSubset<T, CampaniaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Campania.
     * @param {CampaniaUpsertArgs} args - Arguments to update or create a Campania.
     * @example
     * // Update or create a Campania
     * const campania = await prisma.campania.upsert({
     *   create: {
     *     // ... data to create a Campania
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Campania we want to update
     *   }
     * })
     */
    upsert<T extends CampaniaUpsertArgs>(args: SelectSubset<T, CampaniaUpsertArgs<ExtArgs>>): Prisma__CampaniaClient<$Result.GetResult<Prisma.$CampaniaPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Campanias.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampaniaCountArgs} args - Arguments to filter Campanias to count.
     * @example
     * // Count the number of Campanias
     * const count = await prisma.campania.count({
     *   where: {
     *     // ... the filter for the Campanias we want to count
     *   }
     * })
    **/
    count<T extends CampaniaCountArgs>(
      args?: Subset<T, CampaniaCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CampaniaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Campania.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampaniaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CampaniaAggregateArgs>(args: Subset<T, CampaniaAggregateArgs>): Prisma.PrismaPromise<GetCampaniaAggregateType<T>>

    /**
     * Group by Campania.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampaniaGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CampaniaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CampaniaGroupByArgs['orderBy'] }
        : { orderBy?: CampaniaGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CampaniaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCampaniaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Campania model
   */
  readonly fields: CampaniaFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Campania.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CampaniaClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    usuario<T extends UsuarioDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UsuarioDefaultArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    siembras<T extends Campania$siembrasArgs<ExtArgs> = {}>(args?: Subset<T, Campania$siembrasArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SiembraPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Campania model
   */ 
  interface CampaniaFieldRefs {
    readonly id: FieldRef<"Campania", 'Int'>
    readonly usuarioId: FieldRef<"Campania", 'Int'>
    readonly nombre: FieldRef<"Campania", 'String'>
    readonly fechaInicio: FieldRef<"Campania", 'DateTime'>
    readonly fechaFin: FieldRef<"Campania", 'DateTime'>
    readonly descripcion: FieldRef<"Campania", 'String'>
    readonly createdAt: FieldRef<"Campania", 'DateTime'>
    readonly updatedAt: FieldRef<"Campania", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Campania findUnique
   */
  export type CampaniaFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campania
     */
    select?: CampaniaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaniaInclude<ExtArgs> | null
    /**
     * Filter, which Campania to fetch.
     */
    where: CampaniaWhereUniqueInput
  }

  /**
   * Campania findUniqueOrThrow
   */
  export type CampaniaFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campania
     */
    select?: CampaniaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaniaInclude<ExtArgs> | null
    /**
     * Filter, which Campania to fetch.
     */
    where: CampaniaWhereUniqueInput
  }

  /**
   * Campania findFirst
   */
  export type CampaniaFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campania
     */
    select?: CampaniaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaniaInclude<ExtArgs> | null
    /**
     * Filter, which Campania to fetch.
     */
    where?: CampaniaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Campanias to fetch.
     */
    orderBy?: CampaniaOrderByWithRelationInput | CampaniaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Campanias.
     */
    cursor?: CampaniaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Campanias from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Campanias.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Campanias.
     */
    distinct?: CampaniaScalarFieldEnum | CampaniaScalarFieldEnum[]
  }

  /**
   * Campania findFirstOrThrow
   */
  export type CampaniaFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campania
     */
    select?: CampaniaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaniaInclude<ExtArgs> | null
    /**
     * Filter, which Campania to fetch.
     */
    where?: CampaniaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Campanias to fetch.
     */
    orderBy?: CampaniaOrderByWithRelationInput | CampaniaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Campanias.
     */
    cursor?: CampaniaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Campanias from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Campanias.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Campanias.
     */
    distinct?: CampaniaScalarFieldEnum | CampaniaScalarFieldEnum[]
  }

  /**
   * Campania findMany
   */
  export type CampaniaFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campania
     */
    select?: CampaniaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaniaInclude<ExtArgs> | null
    /**
     * Filter, which Campanias to fetch.
     */
    where?: CampaniaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Campanias to fetch.
     */
    orderBy?: CampaniaOrderByWithRelationInput | CampaniaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Campanias.
     */
    cursor?: CampaniaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Campanias from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Campanias.
     */
    skip?: number
    distinct?: CampaniaScalarFieldEnum | CampaniaScalarFieldEnum[]
  }

  /**
   * Campania create
   */
  export type CampaniaCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campania
     */
    select?: CampaniaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaniaInclude<ExtArgs> | null
    /**
     * The data needed to create a Campania.
     */
    data: XOR<CampaniaCreateInput, CampaniaUncheckedCreateInput>
  }

  /**
   * Campania createMany
   */
  export type CampaniaCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Campanias.
     */
    data: CampaniaCreateManyInput | CampaniaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Campania createManyAndReturn
   */
  export type CampaniaCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campania
     */
    select?: CampaniaSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Campanias.
     */
    data: CampaniaCreateManyInput | CampaniaCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaniaIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Campania update
   */
  export type CampaniaUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campania
     */
    select?: CampaniaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaniaInclude<ExtArgs> | null
    /**
     * The data needed to update a Campania.
     */
    data: XOR<CampaniaUpdateInput, CampaniaUncheckedUpdateInput>
    /**
     * Choose, which Campania to update.
     */
    where: CampaniaWhereUniqueInput
  }

  /**
   * Campania updateMany
   */
  export type CampaniaUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Campanias.
     */
    data: XOR<CampaniaUpdateManyMutationInput, CampaniaUncheckedUpdateManyInput>
    /**
     * Filter which Campanias to update
     */
    where?: CampaniaWhereInput
  }

  /**
   * Campania upsert
   */
  export type CampaniaUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campania
     */
    select?: CampaniaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaniaInclude<ExtArgs> | null
    /**
     * The filter to search for the Campania to update in case it exists.
     */
    where: CampaniaWhereUniqueInput
    /**
     * In case the Campania found by the `where` argument doesn't exist, create a new Campania with this data.
     */
    create: XOR<CampaniaCreateInput, CampaniaUncheckedCreateInput>
    /**
     * In case the Campania was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CampaniaUpdateInput, CampaniaUncheckedUpdateInput>
  }

  /**
   * Campania delete
   */
  export type CampaniaDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campania
     */
    select?: CampaniaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaniaInclude<ExtArgs> | null
    /**
     * Filter which Campania to delete.
     */
    where: CampaniaWhereUniqueInput
  }

  /**
   * Campania deleteMany
   */
  export type CampaniaDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Campanias to delete
     */
    where?: CampaniaWhereInput
  }

  /**
   * Campania.siembras
   */
  export type Campania$siembrasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Siembra
     */
    select?: SiembraSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SiembraInclude<ExtArgs> | null
    where?: SiembraWhereInput
    orderBy?: SiembraOrderByWithRelationInput | SiembraOrderByWithRelationInput[]
    cursor?: SiembraWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SiembraScalarFieldEnum | SiembraScalarFieldEnum[]
  }

  /**
   * Campania without action
   */
  export type CampaniaDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campania
     */
    select?: CampaniaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaniaInclude<ExtArgs> | null
  }


  /**
   * Model RegistroPeso
   */

  export type AggregateRegistroPeso = {
    _count: RegistroPesoCountAggregateOutputType | null
    _avg: RegistroPesoAvgAggregateOutputType | null
    _sum: RegistroPesoSumAggregateOutputType | null
    _min: RegistroPesoMinAggregateOutputType | null
    _max: RegistroPesoMaxAggregateOutputType | null
  }

  export type RegistroPesoAvgAggregateOutputType = {
    id: number | null
    animalId: number | null
    peso: number | null
  }

  export type RegistroPesoSumAggregateOutputType = {
    id: number | null
    animalId: number | null
    peso: number | null
  }

  export type RegistroPesoMinAggregateOutputType = {
    id: number | null
    animalId: number | null
    peso: number | null
    fecha: Date | null
    observaciones: string | null
    createdAt: Date | null
  }

  export type RegistroPesoMaxAggregateOutputType = {
    id: number | null
    animalId: number | null
    peso: number | null
    fecha: Date | null
    observaciones: string | null
    createdAt: Date | null
  }

  export type RegistroPesoCountAggregateOutputType = {
    id: number
    animalId: number
    peso: number
    fecha: number
    observaciones: number
    createdAt: number
    _all: number
  }


  export type RegistroPesoAvgAggregateInputType = {
    id?: true
    animalId?: true
    peso?: true
  }

  export type RegistroPesoSumAggregateInputType = {
    id?: true
    animalId?: true
    peso?: true
  }

  export type RegistroPesoMinAggregateInputType = {
    id?: true
    animalId?: true
    peso?: true
    fecha?: true
    observaciones?: true
    createdAt?: true
  }

  export type RegistroPesoMaxAggregateInputType = {
    id?: true
    animalId?: true
    peso?: true
    fecha?: true
    observaciones?: true
    createdAt?: true
  }

  export type RegistroPesoCountAggregateInputType = {
    id?: true
    animalId?: true
    peso?: true
    fecha?: true
    observaciones?: true
    createdAt?: true
    _all?: true
  }

  export type RegistroPesoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RegistroPeso to aggregate.
     */
    where?: RegistroPesoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RegistroPesos to fetch.
     */
    orderBy?: RegistroPesoOrderByWithRelationInput | RegistroPesoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RegistroPesoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RegistroPesos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RegistroPesos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RegistroPesos
    **/
    _count?: true | RegistroPesoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RegistroPesoAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RegistroPesoSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RegistroPesoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RegistroPesoMaxAggregateInputType
  }

  export type GetRegistroPesoAggregateType<T extends RegistroPesoAggregateArgs> = {
        [P in keyof T & keyof AggregateRegistroPeso]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRegistroPeso[P]>
      : GetScalarType<T[P], AggregateRegistroPeso[P]>
  }




  export type RegistroPesoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RegistroPesoWhereInput
    orderBy?: RegistroPesoOrderByWithAggregationInput | RegistroPesoOrderByWithAggregationInput[]
    by: RegistroPesoScalarFieldEnum[] | RegistroPesoScalarFieldEnum
    having?: RegistroPesoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RegistroPesoCountAggregateInputType | true
    _avg?: RegistroPesoAvgAggregateInputType
    _sum?: RegistroPesoSumAggregateInputType
    _min?: RegistroPesoMinAggregateInputType
    _max?: RegistroPesoMaxAggregateInputType
  }

  export type RegistroPesoGroupByOutputType = {
    id: number
    animalId: number
    peso: number
    fecha: Date
    observaciones: string | null
    createdAt: Date
    _count: RegistroPesoCountAggregateOutputType | null
    _avg: RegistroPesoAvgAggregateOutputType | null
    _sum: RegistroPesoSumAggregateOutputType | null
    _min: RegistroPesoMinAggregateOutputType | null
    _max: RegistroPesoMaxAggregateOutputType | null
  }

  type GetRegistroPesoGroupByPayload<T extends RegistroPesoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RegistroPesoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RegistroPesoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RegistroPesoGroupByOutputType[P]>
            : GetScalarType<T[P], RegistroPesoGroupByOutputType[P]>
        }
      >
    >


  export type RegistroPesoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    animalId?: boolean
    peso?: boolean
    fecha?: boolean
    observaciones?: boolean
    createdAt?: boolean
    animal?: boolean | AnimalDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["registroPeso"]>

  export type RegistroPesoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    animalId?: boolean
    peso?: boolean
    fecha?: boolean
    observaciones?: boolean
    createdAt?: boolean
    animal?: boolean | AnimalDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["registroPeso"]>

  export type RegistroPesoSelectScalar = {
    id?: boolean
    animalId?: boolean
    peso?: boolean
    fecha?: boolean
    observaciones?: boolean
    createdAt?: boolean
  }

  export type RegistroPesoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    animal?: boolean | AnimalDefaultArgs<ExtArgs>
  }
  export type RegistroPesoIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    animal?: boolean | AnimalDefaultArgs<ExtArgs>
  }

  export type $RegistroPesoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RegistroPeso"
    objects: {
      animal: Prisma.$AnimalPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      animalId: number
      peso: number
      fecha: Date
      observaciones: string | null
      createdAt: Date
    }, ExtArgs["result"]["registroPeso"]>
    composites: {}
  }

  type RegistroPesoGetPayload<S extends boolean | null | undefined | RegistroPesoDefaultArgs> = $Result.GetResult<Prisma.$RegistroPesoPayload, S>

  type RegistroPesoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<RegistroPesoFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: RegistroPesoCountAggregateInputType | true
    }

  export interface RegistroPesoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RegistroPeso'], meta: { name: 'RegistroPeso' } }
    /**
     * Find zero or one RegistroPeso that matches the filter.
     * @param {RegistroPesoFindUniqueArgs} args - Arguments to find a RegistroPeso
     * @example
     * // Get one RegistroPeso
     * const registroPeso = await prisma.registroPeso.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RegistroPesoFindUniqueArgs>(args: SelectSubset<T, RegistroPesoFindUniqueArgs<ExtArgs>>): Prisma__RegistroPesoClient<$Result.GetResult<Prisma.$RegistroPesoPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one RegistroPeso that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {RegistroPesoFindUniqueOrThrowArgs} args - Arguments to find a RegistroPeso
     * @example
     * // Get one RegistroPeso
     * const registroPeso = await prisma.registroPeso.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RegistroPesoFindUniqueOrThrowArgs>(args: SelectSubset<T, RegistroPesoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RegistroPesoClient<$Result.GetResult<Prisma.$RegistroPesoPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first RegistroPeso that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegistroPesoFindFirstArgs} args - Arguments to find a RegistroPeso
     * @example
     * // Get one RegistroPeso
     * const registroPeso = await prisma.registroPeso.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RegistroPesoFindFirstArgs>(args?: SelectSubset<T, RegistroPesoFindFirstArgs<ExtArgs>>): Prisma__RegistroPesoClient<$Result.GetResult<Prisma.$RegistroPesoPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first RegistroPeso that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegistroPesoFindFirstOrThrowArgs} args - Arguments to find a RegistroPeso
     * @example
     * // Get one RegistroPeso
     * const registroPeso = await prisma.registroPeso.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RegistroPesoFindFirstOrThrowArgs>(args?: SelectSubset<T, RegistroPesoFindFirstOrThrowArgs<ExtArgs>>): Prisma__RegistroPesoClient<$Result.GetResult<Prisma.$RegistroPesoPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more RegistroPesos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegistroPesoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RegistroPesos
     * const registroPesos = await prisma.registroPeso.findMany()
     * 
     * // Get first 10 RegistroPesos
     * const registroPesos = await prisma.registroPeso.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const registroPesoWithIdOnly = await prisma.registroPeso.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RegistroPesoFindManyArgs>(args?: SelectSubset<T, RegistroPesoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RegistroPesoPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a RegistroPeso.
     * @param {RegistroPesoCreateArgs} args - Arguments to create a RegistroPeso.
     * @example
     * // Create one RegistroPeso
     * const RegistroPeso = await prisma.registroPeso.create({
     *   data: {
     *     // ... data to create a RegistroPeso
     *   }
     * })
     * 
     */
    create<T extends RegistroPesoCreateArgs>(args: SelectSubset<T, RegistroPesoCreateArgs<ExtArgs>>): Prisma__RegistroPesoClient<$Result.GetResult<Prisma.$RegistroPesoPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many RegistroPesos.
     * @param {RegistroPesoCreateManyArgs} args - Arguments to create many RegistroPesos.
     * @example
     * // Create many RegistroPesos
     * const registroPeso = await prisma.registroPeso.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RegistroPesoCreateManyArgs>(args?: SelectSubset<T, RegistroPesoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RegistroPesos and returns the data saved in the database.
     * @param {RegistroPesoCreateManyAndReturnArgs} args - Arguments to create many RegistroPesos.
     * @example
     * // Create many RegistroPesos
     * const registroPeso = await prisma.registroPeso.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RegistroPesos and only return the `id`
     * const registroPesoWithIdOnly = await prisma.registroPeso.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RegistroPesoCreateManyAndReturnArgs>(args?: SelectSubset<T, RegistroPesoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RegistroPesoPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a RegistroPeso.
     * @param {RegistroPesoDeleteArgs} args - Arguments to delete one RegistroPeso.
     * @example
     * // Delete one RegistroPeso
     * const RegistroPeso = await prisma.registroPeso.delete({
     *   where: {
     *     // ... filter to delete one RegistroPeso
     *   }
     * })
     * 
     */
    delete<T extends RegistroPesoDeleteArgs>(args: SelectSubset<T, RegistroPesoDeleteArgs<ExtArgs>>): Prisma__RegistroPesoClient<$Result.GetResult<Prisma.$RegistroPesoPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one RegistroPeso.
     * @param {RegistroPesoUpdateArgs} args - Arguments to update one RegistroPeso.
     * @example
     * // Update one RegistroPeso
     * const registroPeso = await prisma.registroPeso.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RegistroPesoUpdateArgs>(args: SelectSubset<T, RegistroPesoUpdateArgs<ExtArgs>>): Prisma__RegistroPesoClient<$Result.GetResult<Prisma.$RegistroPesoPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more RegistroPesos.
     * @param {RegistroPesoDeleteManyArgs} args - Arguments to filter RegistroPesos to delete.
     * @example
     * // Delete a few RegistroPesos
     * const { count } = await prisma.registroPeso.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RegistroPesoDeleteManyArgs>(args?: SelectSubset<T, RegistroPesoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RegistroPesos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegistroPesoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RegistroPesos
     * const registroPeso = await prisma.registroPeso.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RegistroPesoUpdateManyArgs>(args: SelectSubset<T, RegistroPesoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one RegistroPeso.
     * @param {RegistroPesoUpsertArgs} args - Arguments to update or create a RegistroPeso.
     * @example
     * // Update or create a RegistroPeso
     * const registroPeso = await prisma.registroPeso.upsert({
     *   create: {
     *     // ... data to create a RegistroPeso
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RegistroPeso we want to update
     *   }
     * })
     */
    upsert<T extends RegistroPesoUpsertArgs>(args: SelectSubset<T, RegistroPesoUpsertArgs<ExtArgs>>): Prisma__RegistroPesoClient<$Result.GetResult<Prisma.$RegistroPesoPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of RegistroPesos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegistroPesoCountArgs} args - Arguments to filter RegistroPesos to count.
     * @example
     * // Count the number of RegistroPesos
     * const count = await prisma.registroPeso.count({
     *   where: {
     *     // ... the filter for the RegistroPesos we want to count
     *   }
     * })
    **/
    count<T extends RegistroPesoCountArgs>(
      args?: Subset<T, RegistroPesoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RegistroPesoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RegistroPeso.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegistroPesoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RegistroPesoAggregateArgs>(args: Subset<T, RegistroPesoAggregateArgs>): Prisma.PrismaPromise<GetRegistroPesoAggregateType<T>>

    /**
     * Group by RegistroPeso.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegistroPesoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RegistroPesoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RegistroPesoGroupByArgs['orderBy'] }
        : { orderBy?: RegistroPesoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RegistroPesoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRegistroPesoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RegistroPeso model
   */
  readonly fields: RegistroPesoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RegistroPeso.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RegistroPesoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    animal<T extends AnimalDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AnimalDefaultArgs<ExtArgs>>): Prisma__AnimalClient<$Result.GetResult<Prisma.$AnimalPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the RegistroPeso model
   */ 
  interface RegistroPesoFieldRefs {
    readonly id: FieldRef<"RegistroPeso", 'Int'>
    readonly animalId: FieldRef<"RegistroPeso", 'Int'>
    readonly peso: FieldRef<"RegistroPeso", 'Float'>
    readonly fecha: FieldRef<"RegistroPeso", 'DateTime'>
    readonly observaciones: FieldRef<"RegistroPeso", 'String'>
    readonly createdAt: FieldRef<"RegistroPeso", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * RegistroPeso findUnique
   */
  export type RegistroPesoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RegistroPeso
     */
    select?: RegistroPesoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegistroPesoInclude<ExtArgs> | null
    /**
     * Filter, which RegistroPeso to fetch.
     */
    where: RegistroPesoWhereUniqueInput
  }

  /**
   * RegistroPeso findUniqueOrThrow
   */
  export type RegistroPesoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RegistroPeso
     */
    select?: RegistroPesoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegistroPesoInclude<ExtArgs> | null
    /**
     * Filter, which RegistroPeso to fetch.
     */
    where: RegistroPesoWhereUniqueInput
  }

  /**
   * RegistroPeso findFirst
   */
  export type RegistroPesoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RegistroPeso
     */
    select?: RegistroPesoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegistroPesoInclude<ExtArgs> | null
    /**
     * Filter, which RegistroPeso to fetch.
     */
    where?: RegistroPesoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RegistroPesos to fetch.
     */
    orderBy?: RegistroPesoOrderByWithRelationInput | RegistroPesoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RegistroPesos.
     */
    cursor?: RegistroPesoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RegistroPesos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RegistroPesos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RegistroPesos.
     */
    distinct?: RegistroPesoScalarFieldEnum | RegistroPesoScalarFieldEnum[]
  }

  /**
   * RegistroPeso findFirstOrThrow
   */
  export type RegistroPesoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RegistroPeso
     */
    select?: RegistroPesoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegistroPesoInclude<ExtArgs> | null
    /**
     * Filter, which RegistroPeso to fetch.
     */
    where?: RegistroPesoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RegistroPesos to fetch.
     */
    orderBy?: RegistroPesoOrderByWithRelationInput | RegistroPesoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RegistroPesos.
     */
    cursor?: RegistroPesoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RegistroPesos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RegistroPesos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RegistroPesos.
     */
    distinct?: RegistroPesoScalarFieldEnum | RegistroPesoScalarFieldEnum[]
  }

  /**
   * RegistroPeso findMany
   */
  export type RegistroPesoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RegistroPeso
     */
    select?: RegistroPesoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegistroPesoInclude<ExtArgs> | null
    /**
     * Filter, which RegistroPesos to fetch.
     */
    where?: RegistroPesoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RegistroPesos to fetch.
     */
    orderBy?: RegistroPesoOrderByWithRelationInput | RegistroPesoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RegistroPesos.
     */
    cursor?: RegistroPesoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RegistroPesos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RegistroPesos.
     */
    skip?: number
    distinct?: RegistroPesoScalarFieldEnum | RegistroPesoScalarFieldEnum[]
  }

  /**
   * RegistroPeso create
   */
  export type RegistroPesoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RegistroPeso
     */
    select?: RegistroPesoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegistroPesoInclude<ExtArgs> | null
    /**
     * The data needed to create a RegistroPeso.
     */
    data: XOR<RegistroPesoCreateInput, RegistroPesoUncheckedCreateInput>
  }

  /**
   * RegistroPeso createMany
   */
  export type RegistroPesoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RegistroPesos.
     */
    data: RegistroPesoCreateManyInput | RegistroPesoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RegistroPeso createManyAndReturn
   */
  export type RegistroPesoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RegistroPeso
     */
    select?: RegistroPesoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many RegistroPesos.
     */
    data: RegistroPesoCreateManyInput | RegistroPesoCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegistroPesoIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * RegistroPeso update
   */
  export type RegistroPesoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RegistroPeso
     */
    select?: RegistroPesoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegistroPesoInclude<ExtArgs> | null
    /**
     * The data needed to update a RegistroPeso.
     */
    data: XOR<RegistroPesoUpdateInput, RegistroPesoUncheckedUpdateInput>
    /**
     * Choose, which RegistroPeso to update.
     */
    where: RegistroPesoWhereUniqueInput
  }

  /**
   * RegistroPeso updateMany
   */
  export type RegistroPesoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RegistroPesos.
     */
    data: XOR<RegistroPesoUpdateManyMutationInput, RegistroPesoUncheckedUpdateManyInput>
    /**
     * Filter which RegistroPesos to update
     */
    where?: RegistroPesoWhereInput
  }

  /**
   * RegistroPeso upsert
   */
  export type RegistroPesoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RegistroPeso
     */
    select?: RegistroPesoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegistroPesoInclude<ExtArgs> | null
    /**
     * The filter to search for the RegistroPeso to update in case it exists.
     */
    where: RegistroPesoWhereUniqueInput
    /**
     * In case the RegistroPeso found by the `where` argument doesn't exist, create a new RegistroPeso with this data.
     */
    create: XOR<RegistroPesoCreateInput, RegistroPesoUncheckedCreateInput>
    /**
     * In case the RegistroPeso was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RegistroPesoUpdateInput, RegistroPesoUncheckedUpdateInput>
  }

  /**
   * RegistroPeso delete
   */
  export type RegistroPesoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RegistroPeso
     */
    select?: RegistroPesoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegistroPesoInclude<ExtArgs> | null
    /**
     * Filter which RegistroPeso to delete.
     */
    where: RegistroPesoWhereUniqueInput
  }

  /**
   * RegistroPeso deleteMany
   */
  export type RegistroPesoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RegistroPesos to delete
     */
    where?: RegistroPesoWhereInput
  }

  /**
   * RegistroPeso without action
   */
  export type RegistroPesoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RegistroPeso
     */
    select?: RegistroPesoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegistroPesoInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UsuarioScalarFieldEnum: {
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

  export type UsuarioScalarFieldEnum = (typeof UsuarioScalarFieldEnum)[keyof typeof UsuarioScalarFieldEnum]


  export const CampoScalarFieldEnum: {
    id: 'id',
    nombre: 'nombre',
    hectareas: 'hectareas',
    ubicacion: 'ubicacion',
    propietario: 'propietario',
    usuarioId: 'usuarioId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CampoScalarFieldEnum = (typeof CampoScalarFieldEnum)[keyof typeof CampoScalarFieldEnum]


  export const LoteScalarFieldEnum: {
    id: 'id',
    nombre: 'nombre',
    hectareas: 'hectareas',
    campoId: 'campoId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type LoteScalarFieldEnum = (typeof LoteScalarFieldEnum)[keyof typeof LoteScalarFieldEnum]


  export const TipoCultivoScalarFieldEnum: {
    id: 'id',
    nombre: 'nombre',
    descripcion: 'descripcion',
    createdAt: 'createdAt'
  };

  export type TipoCultivoScalarFieldEnum = (typeof TipoCultivoScalarFieldEnum)[keyof typeof TipoCultivoScalarFieldEnum]


  export const SiembraScalarFieldEnum: {
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

  export type SiembraScalarFieldEnum = (typeof SiembraScalarFieldEnum)[keyof typeof SiembraScalarFieldEnum]


  export const CosechaScalarFieldEnum: {
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

  export type CosechaScalarFieldEnum = (typeof CosechaScalarFieldEnum)[keyof typeof CosechaScalarFieldEnum]


  export const InsumoScalarFieldEnum: {
    id: 'id',
    nombre: 'nombre',
    tipo: 'tipo',
    unidad: 'unidad',
    descripcion: 'descripcion',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type InsumoScalarFieldEnum = (typeof InsumoScalarFieldEnum)[keyof typeof InsumoScalarFieldEnum]


  export const AplicacionInsumoScalarFieldEnum: {
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

  export type AplicacionInsumoScalarFieldEnum = (typeof AplicacionInsumoScalarFieldEnum)[keyof typeof AplicacionInsumoScalarFieldEnum]


  export const AnimalScalarFieldEnum: {
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

  export type AnimalScalarFieldEnum = (typeof AnimalScalarFieldEnum)[keyof typeof AnimalScalarFieldEnum]


  export const PrenezScalarFieldEnum: {
    id: 'id',
    animalId: 'animalId',
    fechaInicio: 'fechaInicio',
    fechaEstimadaParto: 'fechaEstimadaParto',
    estado: 'estado',
    observaciones: 'observaciones',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PrenezScalarFieldEnum = (typeof PrenezScalarFieldEnum)[keyof typeof PrenezScalarFieldEnum]


  export const TareaRuralScalarFieldEnum: {
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

  export type TareaRuralScalarFieldEnum = (typeof TareaRuralScalarFieldEnum)[keyof typeof TareaRuralScalarFieldEnum]


  export const MovimientoFinancieroScalarFieldEnum: {
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

  export type MovimientoFinancieroScalarFieldEnum = (typeof MovimientoFinancieroScalarFieldEnum)[keyof typeof MovimientoFinancieroScalarFieldEnum]


  export const CampaniaScalarFieldEnum: {
    id: 'id',
    usuarioId: 'usuarioId',
    nombre: 'nombre',
    fechaInicio: 'fechaInicio',
    fechaFin: 'fechaFin',
    descripcion: 'descripcion',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CampaniaScalarFieldEnum = (typeof CampaniaScalarFieldEnum)[keyof typeof CampaniaScalarFieldEnum]


  export const RegistroPesoScalarFieldEnum: {
    id: 'id',
    animalId: 'animalId',
    peso: 'peso',
    fecha: 'fecha',
    observaciones: 'observaciones',
    createdAt: 'createdAt'
  };

  export type RegistroPesoScalarFieldEnum = (typeof RegistroPesoScalarFieldEnum)[keyof typeof RegistroPesoScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Rol'
   */
  export type EnumRolFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Rol'>
    


  /**
   * Reference to a field of type 'Rol[]'
   */
  export type ListEnumRolFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Rol[]'>
    


  /**
   * Reference to a field of type 'PlanTipo'
   */
  export type EnumPlanTipoFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PlanTipo'>
    


  /**
   * Reference to a field of type 'PlanTipo[]'
   */
  export type ListEnumPlanTipoFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PlanTipo[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'EstadoSiembra'
   */
  export type EnumEstadoSiembraFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EstadoSiembra'>
    


  /**
   * Reference to a field of type 'EstadoSiembra[]'
   */
  export type ListEnumEstadoSiembraFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EstadoSiembra[]'>
    


  /**
   * Reference to a field of type 'TipoInsumo'
   */
  export type EnumTipoInsumoFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TipoInsumo'>
    


  /**
   * Reference to a field of type 'TipoInsumo[]'
   */
  export type ListEnumTipoInsumoFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TipoInsumo[]'>
    


  /**
   * Reference to a field of type 'Especie'
   */
  export type EnumEspecieFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Especie'>
    


  /**
   * Reference to a field of type 'Especie[]'
   */
  export type ListEnumEspecieFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Especie[]'>
    


  /**
   * Reference to a field of type 'Sexo'
   */
  export type EnumSexoFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Sexo'>
    


  /**
   * Reference to a field of type 'Sexo[]'
   */
  export type ListEnumSexoFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Sexo[]'>
    


  /**
   * Reference to a field of type 'CategoriaAnimal'
   */
  export type EnumCategoriaAnimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CategoriaAnimal'>
    


  /**
   * Reference to a field of type 'CategoriaAnimal[]'
   */
  export type ListEnumCategoriaAnimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CategoriaAnimal[]'>
    


  /**
   * Reference to a field of type 'EstadoPrenez'
   */
  export type EnumEstadoPrenezFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EstadoPrenez'>
    


  /**
   * Reference to a field of type 'EstadoPrenez[]'
   */
  export type ListEnumEstadoPrenezFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EstadoPrenez[]'>
    


  /**
   * Reference to a field of type 'TipoTarea'
   */
  export type EnumTipoTareaFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TipoTarea'>
    


  /**
   * Reference to a field of type 'TipoTarea[]'
   */
  export type ListEnumTipoTareaFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TipoTarea[]'>
    


  /**
   * Reference to a field of type 'EstadoTarea'
   */
  export type EnumEstadoTareaFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EstadoTarea'>
    


  /**
   * Reference to a field of type 'EstadoTarea[]'
   */
  export type ListEnumEstadoTareaFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EstadoTarea[]'>
    


  /**
   * Reference to a field of type 'Prioridad'
   */
  export type EnumPrioridadFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Prioridad'>
    


  /**
   * Reference to a field of type 'Prioridad[]'
   */
  export type ListEnumPrioridadFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Prioridad[]'>
    


  /**
   * Reference to a field of type 'TipoMovimiento'
   */
  export type EnumTipoMovimientoFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TipoMovimiento'>
    


  /**
   * Reference to a field of type 'TipoMovimiento[]'
   */
  export type ListEnumTipoMovimientoFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TipoMovimiento[]'>
    


  /**
   * Reference to a field of type 'CategoriaMovimiento'
   */
  export type EnumCategoriaMovimientoFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CategoriaMovimiento'>
    


  /**
   * Reference to a field of type 'CategoriaMovimiento[]'
   */
  export type ListEnumCategoriaMovimientoFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CategoriaMovimiento[]'>
    
  /**
   * Deep Input Types
   */


  export type UsuarioWhereInput = {
    AND?: UsuarioWhereInput | UsuarioWhereInput[]
    OR?: UsuarioWhereInput[]
    NOT?: UsuarioWhereInput | UsuarioWhereInput[]
    id?: IntFilter<"Usuario"> | number
    email?: StringFilter<"Usuario"> | string
    nombre?: StringFilter<"Usuario"> | string
    password?: StringFilter<"Usuario"> | string
    rol?: EnumRolFilter<"Usuario"> | $Enums.Rol
    plan?: EnumPlanTipoFilter<"Usuario"> | $Enums.PlanTipo
    planExpira?: DateTimeNullableFilter<"Usuario"> | Date | string | null
    mpSuscripcionId?: StringNullableFilter<"Usuario"> | string | null
    createdAt?: DateTimeFilter<"Usuario"> | Date | string
    updatedAt?: DateTimeFilter<"Usuario"> | Date | string
    resetToken?: StringNullableFilter<"Usuario"> | string | null
    resetTokenExpiry?: DateTimeNullableFilter<"Usuario"> | Date | string | null
    campos?: CampoListRelationFilter
    animales?: AnimalListRelationFilter
    tareas?: TareaRuralListRelationFilter
    movimientos?: MovimientoFinancieroListRelationFilter
    campanias?: CampaniaListRelationFilter
  }

  export type UsuarioOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    nombre?: SortOrder
    password?: SortOrder
    rol?: SortOrder
    plan?: SortOrder
    planExpira?: SortOrderInput | SortOrder
    mpSuscripcionId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    resetToken?: SortOrderInput | SortOrder
    resetTokenExpiry?: SortOrderInput | SortOrder
    campos?: CampoOrderByRelationAggregateInput
    animales?: AnimalOrderByRelationAggregateInput
    tareas?: TareaRuralOrderByRelationAggregateInput
    movimientos?: MovimientoFinancieroOrderByRelationAggregateInput
    campanias?: CampaniaOrderByRelationAggregateInput
  }

  export type UsuarioWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    email?: string
    AND?: UsuarioWhereInput | UsuarioWhereInput[]
    OR?: UsuarioWhereInput[]
    NOT?: UsuarioWhereInput | UsuarioWhereInput[]
    nombre?: StringFilter<"Usuario"> | string
    password?: StringFilter<"Usuario"> | string
    rol?: EnumRolFilter<"Usuario"> | $Enums.Rol
    plan?: EnumPlanTipoFilter<"Usuario"> | $Enums.PlanTipo
    planExpira?: DateTimeNullableFilter<"Usuario"> | Date | string | null
    mpSuscripcionId?: StringNullableFilter<"Usuario"> | string | null
    createdAt?: DateTimeFilter<"Usuario"> | Date | string
    updatedAt?: DateTimeFilter<"Usuario"> | Date | string
    resetToken?: StringNullableFilter<"Usuario"> | string | null
    resetTokenExpiry?: DateTimeNullableFilter<"Usuario"> | Date | string | null
    campos?: CampoListRelationFilter
    animales?: AnimalListRelationFilter
    tareas?: TareaRuralListRelationFilter
    movimientos?: MovimientoFinancieroListRelationFilter
    campanias?: CampaniaListRelationFilter
  }, "id" | "email">

  export type UsuarioOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    nombre?: SortOrder
    password?: SortOrder
    rol?: SortOrder
    plan?: SortOrder
    planExpira?: SortOrderInput | SortOrder
    mpSuscripcionId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    resetToken?: SortOrderInput | SortOrder
    resetTokenExpiry?: SortOrderInput | SortOrder
    _count?: UsuarioCountOrderByAggregateInput
    _avg?: UsuarioAvgOrderByAggregateInput
    _max?: UsuarioMaxOrderByAggregateInput
    _min?: UsuarioMinOrderByAggregateInput
    _sum?: UsuarioSumOrderByAggregateInput
  }

  export type UsuarioScalarWhereWithAggregatesInput = {
    AND?: UsuarioScalarWhereWithAggregatesInput | UsuarioScalarWhereWithAggregatesInput[]
    OR?: UsuarioScalarWhereWithAggregatesInput[]
    NOT?: UsuarioScalarWhereWithAggregatesInput | UsuarioScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Usuario"> | number
    email?: StringWithAggregatesFilter<"Usuario"> | string
    nombre?: StringWithAggregatesFilter<"Usuario"> | string
    password?: StringWithAggregatesFilter<"Usuario"> | string
    rol?: EnumRolWithAggregatesFilter<"Usuario"> | $Enums.Rol
    plan?: EnumPlanTipoWithAggregatesFilter<"Usuario"> | $Enums.PlanTipo
    planExpira?: DateTimeNullableWithAggregatesFilter<"Usuario"> | Date | string | null
    mpSuscripcionId?: StringNullableWithAggregatesFilter<"Usuario"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Usuario"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Usuario"> | Date | string
    resetToken?: StringNullableWithAggregatesFilter<"Usuario"> | string | null
    resetTokenExpiry?: DateTimeNullableWithAggregatesFilter<"Usuario"> | Date | string | null
  }

  export type CampoWhereInput = {
    AND?: CampoWhereInput | CampoWhereInput[]
    OR?: CampoWhereInput[]
    NOT?: CampoWhereInput | CampoWhereInput[]
    id?: IntFilter<"Campo"> | number
    nombre?: StringFilter<"Campo"> | string
    hectareas?: FloatFilter<"Campo"> | number
    ubicacion?: StringNullableFilter<"Campo"> | string | null
    propietario?: StringNullableFilter<"Campo"> | string | null
    usuarioId?: IntFilter<"Campo"> | number
    createdAt?: DateTimeFilter<"Campo"> | Date | string
    updatedAt?: DateTimeFilter<"Campo"> | Date | string
    usuario?: XOR<UsuarioRelationFilter, UsuarioWhereInput>
    lotes?: LoteListRelationFilter
    tareas?: TareaRuralListRelationFilter
    movimentos?: MovimientoFinancieroListRelationFilter
  }

  export type CampoOrderByWithRelationInput = {
    id?: SortOrder
    nombre?: SortOrder
    hectareas?: SortOrder
    ubicacion?: SortOrderInput | SortOrder
    propietario?: SortOrderInput | SortOrder
    usuarioId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    usuario?: UsuarioOrderByWithRelationInput
    lotes?: LoteOrderByRelationAggregateInput
    tareas?: TareaRuralOrderByRelationAggregateInput
    movimentos?: MovimientoFinancieroOrderByRelationAggregateInput
  }

  export type CampoWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: CampoWhereInput | CampoWhereInput[]
    OR?: CampoWhereInput[]
    NOT?: CampoWhereInput | CampoWhereInput[]
    nombre?: StringFilter<"Campo"> | string
    hectareas?: FloatFilter<"Campo"> | number
    ubicacion?: StringNullableFilter<"Campo"> | string | null
    propietario?: StringNullableFilter<"Campo"> | string | null
    usuarioId?: IntFilter<"Campo"> | number
    createdAt?: DateTimeFilter<"Campo"> | Date | string
    updatedAt?: DateTimeFilter<"Campo"> | Date | string
    usuario?: XOR<UsuarioRelationFilter, UsuarioWhereInput>
    lotes?: LoteListRelationFilter
    tareas?: TareaRuralListRelationFilter
    movimentos?: MovimientoFinancieroListRelationFilter
  }, "id">

  export type CampoOrderByWithAggregationInput = {
    id?: SortOrder
    nombre?: SortOrder
    hectareas?: SortOrder
    ubicacion?: SortOrderInput | SortOrder
    propietario?: SortOrderInput | SortOrder
    usuarioId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CampoCountOrderByAggregateInput
    _avg?: CampoAvgOrderByAggregateInput
    _max?: CampoMaxOrderByAggregateInput
    _min?: CampoMinOrderByAggregateInput
    _sum?: CampoSumOrderByAggregateInput
  }

  export type CampoScalarWhereWithAggregatesInput = {
    AND?: CampoScalarWhereWithAggregatesInput | CampoScalarWhereWithAggregatesInput[]
    OR?: CampoScalarWhereWithAggregatesInput[]
    NOT?: CampoScalarWhereWithAggregatesInput | CampoScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Campo"> | number
    nombre?: StringWithAggregatesFilter<"Campo"> | string
    hectareas?: FloatWithAggregatesFilter<"Campo"> | number
    ubicacion?: StringNullableWithAggregatesFilter<"Campo"> | string | null
    propietario?: StringNullableWithAggregatesFilter<"Campo"> | string | null
    usuarioId?: IntWithAggregatesFilter<"Campo"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Campo"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Campo"> | Date | string
  }

  export type LoteWhereInput = {
    AND?: LoteWhereInput | LoteWhereInput[]
    OR?: LoteWhereInput[]
    NOT?: LoteWhereInput | LoteWhereInput[]
    id?: IntFilter<"Lote"> | number
    nombre?: StringFilter<"Lote"> | string
    hectareas?: FloatFilter<"Lote"> | number
    campoId?: IntFilter<"Lote"> | number
    createdAt?: DateTimeFilter<"Lote"> | Date | string
    updatedAt?: DateTimeFilter<"Lote"> | Date | string
    campo?: XOR<CampoRelationFilter, CampoWhereInput>
    siembras?: SiembraListRelationFilter
  }

  export type LoteOrderByWithRelationInput = {
    id?: SortOrder
    nombre?: SortOrder
    hectareas?: SortOrder
    campoId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    campo?: CampoOrderByWithRelationInput
    siembras?: SiembraOrderByRelationAggregateInput
  }

  export type LoteWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: LoteWhereInput | LoteWhereInput[]
    OR?: LoteWhereInput[]
    NOT?: LoteWhereInput | LoteWhereInput[]
    nombre?: StringFilter<"Lote"> | string
    hectareas?: FloatFilter<"Lote"> | number
    campoId?: IntFilter<"Lote"> | number
    createdAt?: DateTimeFilter<"Lote"> | Date | string
    updatedAt?: DateTimeFilter<"Lote"> | Date | string
    campo?: XOR<CampoRelationFilter, CampoWhereInput>
    siembras?: SiembraListRelationFilter
  }, "id">

  export type LoteOrderByWithAggregationInput = {
    id?: SortOrder
    nombre?: SortOrder
    hectareas?: SortOrder
    campoId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: LoteCountOrderByAggregateInput
    _avg?: LoteAvgOrderByAggregateInput
    _max?: LoteMaxOrderByAggregateInput
    _min?: LoteMinOrderByAggregateInput
    _sum?: LoteSumOrderByAggregateInput
  }

  export type LoteScalarWhereWithAggregatesInput = {
    AND?: LoteScalarWhereWithAggregatesInput | LoteScalarWhereWithAggregatesInput[]
    OR?: LoteScalarWhereWithAggregatesInput[]
    NOT?: LoteScalarWhereWithAggregatesInput | LoteScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Lote"> | number
    nombre?: StringWithAggregatesFilter<"Lote"> | string
    hectareas?: FloatWithAggregatesFilter<"Lote"> | number
    campoId?: IntWithAggregatesFilter<"Lote"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Lote"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Lote"> | Date | string
  }

  export type TipoCultivoWhereInput = {
    AND?: TipoCultivoWhereInput | TipoCultivoWhereInput[]
    OR?: TipoCultivoWhereInput[]
    NOT?: TipoCultivoWhereInput | TipoCultivoWhereInput[]
    id?: IntFilter<"TipoCultivo"> | number
    nombre?: StringFilter<"TipoCultivo"> | string
    descripcion?: StringNullableFilter<"TipoCultivo"> | string | null
    createdAt?: DateTimeFilter<"TipoCultivo"> | Date | string
    siembras?: SiembraListRelationFilter
  }

  export type TipoCultivoOrderByWithRelationInput = {
    id?: SortOrder
    nombre?: SortOrder
    descripcion?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    siembras?: SiembraOrderByRelationAggregateInput
  }

  export type TipoCultivoWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    nombre?: string
    AND?: TipoCultivoWhereInput | TipoCultivoWhereInput[]
    OR?: TipoCultivoWhereInput[]
    NOT?: TipoCultivoWhereInput | TipoCultivoWhereInput[]
    descripcion?: StringNullableFilter<"TipoCultivo"> | string | null
    createdAt?: DateTimeFilter<"TipoCultivo"> | Date | string
    siembras?: SiembraListRelationFilter
  }, "id" | "nombre">

  export type TipoCultivoOrderByWithAggregationInput = {
    id?: SortOrder
    nombre?: SortOrder
    descripcion?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: TipoCultivoCountOrderByAggregateInput
    _avg?: TipoCultivoAvgOrderByAggregateInput
    _max?: TipoCultivoMaxOrderByAggregateInput
    _min?: TipoCultivoMinOrderByAggregateInput
    _sum?: TipoCultivoSumOrderByAggregateInput
  }

  export type TipoCultivoScalarWhereWithAggregatesInput = {
    AND?: TipoCultivoScalarWhereWithAggregatesInput | TipoCultivoScalarWhereWithAggregatesInput[]
    OR?: TipoCultivoScalarWhereWithAggregatesInput[]
    NOT?: TipoCultivoScalarWhereWithAggregatesInput | TipoCultivoScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"TipoCultivo"> | number
    nombre?: StringWithAggregatesFilter<"TipoCultivo"> | string
    descripcion?: StringNullableWithAggregatesFilter<"TipoCultivo"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"TipoCultivo"> | Date | string
  }

  export type SiembraWhereInput = {
    AND?: SiembraWhereInput | SiembraWhereInput[]
    OR?: SiembraWhereInput[]
    NOT?: SiembraWhereInput | SiembraWhereInput[]
    id?: IntFilter<"Siembra"> | number
    loteId?: IntFilter<"Siembra"> | number
    tipoCultivoId?: IntFilter<"Siembra"> | number
    fechaSiembra?: DateTimeFilter<"Siembra"> | Date | string
    densidad?: FloatNullableFilter<"Siembra"> | number | null
    observaciones?: StringNullableFilter<"Siembra"> | string | null
    estado?: EnumEstadoSiembraFilter<"Siembra"> | $Enums.EstadoSiembra
    createdAt?: DateTimeFilter<"Siembra"> | Date | string
    updatedAt?: DateTimeFilter<"Siembra"> | Date | string
    campaniaId?: IntNullableFilter<"Siembra"> | number | null
    lote?: XOR<LoteRelationFilter, LoteWhereInput>
    tipoCultivo?: XOR<TipoCultivoRelationFilter, TipoCultivoWhereInput>
    cosechas?: CosechaListRelationFilter
    aplicaciones?: AplicacionInsumoListRelationFilter
    movimentos?: MovimientoFinancieroListRelationFilter
    campania?: XOR<CampaniaNullableRelationFilter, CampaniaWhereInput> | null
  }

  export type SiembraOrderByWithRelationInput = {
    id?: SortOrder
    loteId?: SortOrder
    tipoCultivoId?: SortOrder
    fechaSiembra?: SortOrder
    densidad?: SortOrderInput | SortOrder
    observaciones?: SortOrderInput | SortOrder
    estado?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    campaniaId?: SortOrderInput | SortOrder
    lote?: LoteOrderByWithRelationInput
    tipoCultivo?: TipoCultivoOrderByWithRelationInput
    cosechas?: CosechaOrderByRelationAggregateInput
    aplicaciones?: AplicacionInsumoOrderByRelationAggregateInput
    movimentos?: MovimientoFinancieroOrderByRelationAggregateInput
    campania?: CampaniaOrderByWithRelationInput
  }

  export type SiembraWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: SiembraWhereInput | SiembraWhereInput[]
    OR?: SiembraWhereInput[]
    NOT?: SiembraWhereInput | SiembraWhereInput[]
    loteId?: IntFilter<"Siembra"> | number
    tipoCultivoId?: IntFilter<"Siembra"> | number
    fechaSiembra?: DateTimeFilter<"Siembra"> | Date | string
    densidad?: FloatNullableFilter<"Siembra"> | number | null
    observaciones?: StringNullableFilter<"Siembra"> | string | null
    estado?: EnumEstadoSiembraFilter<"Siembra"> | $Enums.EstadoSiembra
    createdAt?: DateTimeFilter<"Siembra"> | Date | string
    updatedAt?: DateTimeFilter<"Siembra"> | Date | string
    campaniaId?: IntNullableFilter<"Siembra"> | number | null
    lote?: XOR<LoteRelationFilter, LoteWhereInput>
    tipoCultivo?: XOR<TipoCultivoRelationFilter, TipoCultivoWhereInput>
    cosechas?: CosechaListRelationFilter
    aplicaciones?: AplicacionInsumoListRelationFilter
    movimentos?: MovimientoFinancieroListRelationFilter
    campania?: XOR<CampaniaNullableRelationFilter, CampaniaWhereInput> | null
  }, "id">

  export type SiembraOrderByWithAggregationInput = {
    id?: SortOrder
    loteId?: SortOrder
    tipoCultivoId?: SortOrder
    fechaSiembra?: SortOrder
    densidad?: SortOrderInput | SortOrder
    observaciones?: SortOrderInput | SortOrder
    estado?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    campaniaId?: SortOrderInput | SortOrder
    _count?: SiembraCountOrderByAggregateInput
    _avg?: SiembraAvgOrderByAggregateInput
    _max?: SiembraMaxOrderByAggregateInput
    _min?: SiembraMinOrderByAggregateInput
    _sum?: SiembraSumOrderByAggregateInput
  }

  export type SiembraScalarWhereWithAggregatesInput = {
    AND?: SiembraScalarWhereWithAggregatesInput | SiembraScalarWhereWithAggregatesInput[]
    OR?: SiembraScalarWhereWithAggregatesInput[]
    NOT?: SiembraScalarWhereWithAggregatesInput | SiembraScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Siembra"> | number
    loteId?: IntWithAggregatesFilter<"Siembra"> | number
    tipoCultivoId?: IntWithAggregatesFilter<"Siembra"> | number
    fechaSiembra?: DateTimeWithAggregatesFilter<"Siembra"> | Date | string
    densidad?: FloatNullableWithAggregatesFilter<"Siembra"> | number | null
    observaciones?: StringNullableWithAggregatesFilter<"Siembra"> | string | null
    estado?: EnumEstadoSiembraWithAggregatesFilter<"Siembra"> | $Enums.EstadoSiembra
    createdAt?: DateTimeWithAggregatesFilter<"Siembra"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Siembra"> | Date | string
    campaniaId?: IntNullableWithAggregatesFilter<"Siembra"> | number | null
  }

  export type CosechaWhereInput = {
    AND?: CosechaWhereInput | CosechaWhereInput[]
    OR?: CosechaWhereInput[]
    NOT?: CosechaWhereInput | CosechaWhereInput[]
    id?: IntFilter<"Cosecha"> | number
    siembraId?: IntFilter<"Cosecha"> | number
    fechaCosecha?: DateTimeFilter<"Cosecha"> | Date | string
    rendimientoKgHa?: FloatFilter<"Cosecha"> | number
    totalKg?: FloatFilter<"Cosecha"> | number
    humedad?: FloatNullableFilter<"Cosecha"> | number | null
    observaciones?: StringNullableFilter<"Cosecha"> | string | null
    createdAt?: DateTimeFilter<"Cosecha"> | Date | string
    updatedAt?: DateTimeFilter<"Cosecha"> | Date | string
    siembra?: XOR<SiembraRelationFilter, SiembraWhereInput>
  }

  export type CosechaOrderByWithRelationInput = {
    id?: SortOrder
    siembraId?: SortOrder
    fechaCosecha?: SortOrder
    rendimientoKgHa?: SortOrder
    totalKg?: SortOrder
    humedad?: SortOrderInput | SortOrder
    observaciones?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    siembra?: SiembraOrderByWithRelationInput
  }

  export type CosechaWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: CosechaWhereInput | CosechaWhereInput[]
    OR?: CosechaWhereInput[]
    NOT?: CosechaWhereInput | CosechaWhereInput[]
    siembraId?: IntFilter<"Cosecha"> | number
    fechaCosecha?: DateTimeFilter<"Cosecha"> | Date | string
    rendimientoKgHa?: FloatFilter<"Cosecha"> | number
    totalKg?: FloatFilter<"Cosecha"> | number
    humedad?: FloatNullableFilter<"Cosecha"> | number | null
    observaciones?: StringNullableFilter<"Cosecha"> | string | null
    createdAt?: DateTimeFilter<"Cosecha"> | Date | string
    updatedAt?: DateTimeFilter<"Cosecha"> | Date | string
    siembra?: XOR<SiembraRelationFilter, SiembraWhereInput>
  }, "id">

  export type CosechaOrderByWithAggregationInput = {
    id?: SortOrder
    siembraId?: SortOrder
    fechaCosecha?: SortOrder
    rendimientoKgHa?: SortOrder
    totalKg?: SortOrder
    humedad?: SortOrderInput | SortOrder
    observaciones?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CosechaCountOrderByAggregateInput
    _avg?: CosechaAvgOrderByAggregateInput
    _max?: CosechaMaxOrderByAggregateInput
    _min?: CosechaMinOrderByAggregateInput
    _sum?: CosechaSumOrderByAggregateInput
  }

  export type CosechaScalarWhereWithAggregatesInput = {
    AND?: CosechaScalarWhereWithAggregatesInput | CosechaScalarWhereWithAggregatesInput[]
    OR?: CosechaScalarWhereWithAggregatesInput[]
    NOT?: CosechaScalarWhereWithAggregatesInput | CosechaScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Cosecha"> | number
    siembraId?: IntWithAggregatesFilter<"Cosecha"> | number
    fechaCosecha?: DateTimeWithAggregatesFilter<"Cosecha"> | Date | string
    rendimientoKgHa?: FloatWithAggregatesFilter<"Cosecha"> | number
    totalKg?: FloatWithAggregatesFilter<"Cosecha"> | number
    humedad?: FloatNullableWithAggregatesFilter<"Cosecha"> | number | null
    observaciones?: StringNullableWithAggregatesFilter<"Cosecha"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Cosecha"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Cosecha"> | Date | string
  }

  export type InsumoWhereInput = {
    AND?: InsumoWhereInput | InsumoWhereInput[]
    OR?: InsumoWhereInput[]
    NOT?: InsumoWhereInput | InsumoWhereInput[]
    id?: IntFilter<"Insumo"> | number
    nombre?: StringFilter<"Insumo"> | string
    tipo?: EnumTipoInsumoFilter<"Insumo"> | $Enums.TipoInsumo
    unidad?: StringFilter<"Insumo"> | string
    descripcion?: StringNullableFilter<"Insumo"> | string | null
    createdAt?: DateTimeFilter<"Insumo"> | Date | string
    updatedAt?: DateTimeFilter<"Insumo"> | Date | string
    aplicaciones?: AplicacionInsumoListRelationFilter
  }

  export type InsumoOrderByWithRelationInput = {
    id?: SortOrder
    nombre?: SortOrder
    tipo?: SortOrder
    unidad?: SortOrder
    descripcion?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    aplicaciones?: AplicacionInsumoOrderByRelationAggregateInput
  }

  export type InsumoWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: InsumoWhereInput | InsumoWhereInput[]
    OR?: InsumoWhereInput[]
    NOT?: InsumoWhereInput | InsumoWhereInput[]
    nombre?: StringFilter<"Insumo"> | string
    tipo?: EnumTipoInsumoFilter<"Insumo"> | $Enums.TipoInsumo
    unidad?: StringFilter<"Insumo"> | string
    descripcion?: StringNullableFilter<"Insumo"> | string | null
    createdAt?: DateTimeFilter<"Insumo"> | Date | string
    updatedAt?: DateTimeFilter<"Insumo"> | Date | string
    aplicaciones?: AplicacionInsumoListRelationFilter
  }, "id">

  export type InsumoOrderByWithAggregationInput = {
    id?: SortOrder
    nombre?: SortOrder
    tipo?: SortOrder
    unidad?: SortOrder
    descripcion?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: InsumoCountOrderByAggregateInput
    _avg?: InsumoAvgOrderByAggregateInput
    _max?: InsumoMaxOrderByAggregateInput
    _min?: InsumoMinOrderByAggregateInput
    _sum?: InsumoSumOrderByAggregateInput
  }

  export type InsumoScalarWhereWithAggregatesInput = {
    AND?: InsumoScalarWhereWithAggregatesInput | InsumoScalarWhereWithAggregatesInput[]
    OR?: InsumoScalarWhereWithAggregatesInput[]
    NOT?: InsumoScalarWhereWithAggregatesInput | InsumoScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Insumo"> | number
    nombre?: StringWithAggregatesFilter<"Insumo"> | string
    tipo?: EnumTipoInsumoWithAggregatesFilter<"Insumo"> | $Enums.TipoInsumo
    unidad?: StringWithAggregatesFilter<"Insumo"> | string
    descripcion?: StringNullableWithAggregatesFilter<"Insumo"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Insumo"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Insumo"> | Date | string
  }

  export type AplicacionInsumoWhereInput = {
    AND?: AplicacionInsumoWhereInput | AplicacionInsumoWhereInput[]
    OR?: AplicacionInsumoWhereInput[]
    NOT?: AplicacionInsumoWhereInput | AplicacionInsumoWhereInput[]
    id?: IntFilter<"AplicacionInsumo"> | number
    siembraId?: IntFilter<"AplicacionInsumo"> | number
    insumoId?: IntFilter<"AplicacionInsumo"> | number
    fecha?: DateTimeFilter<"AplicacionInsumo"> | Date | string
    cantidad?: FloatFilter<"AplicacionInsumo"> | number
    unidad?: StringFilter<"AplicacionInsumo"> | string
    observaciones?: StringNullableFilter<"AplicacionInsumo"> | string | null
    createdAt?: DateTimeFilter<"AplicacionInsumo"> | Date | string
    updatedAt?: DateTimeFilter<"AplicacionInsumo"> | Date | string
    siembra?: XOR<SiembraRelationFilter, SiembraWhereInput>
    insumo?: XOR<InsumoRelationFilter, InsumoWhereInput>
  }

  export type AplicacionInsumoOrderByWithRelationInput = {
    id?: SortOrder
    siembraId?: SortOrder
    insumoId?: SortOrder
    fecha?: SortOrder
    cantidad?: SortOrder
    unidad?: SortOrder
    observaciones?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    siembra?: SiembraOrderByWithRelationInput
    insumo?: InsumoOrderByWithRelationInput
  }

  export type AplicacionInsumoWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: AplicacionInsumoWhereInput | AplicacionInsumoWhereInput[]
    OR?: AplicacionInsumoWhereInput[]
    NOT?: AplicacionInsumoWhereInput | AplicacionInsumoWhereInput[]
    siembraId?: IntFilter<"AplicacionInsumo"> | number
    insumoId?: IntFilter<"AplicacionInsumo"> | number
    fecha?: DateTimeFilter<"AplicacionInsumo"> | Date | string
    cantidad?: FloatFilter<"AplicacionInsumo"> | number
    unidad?: StringFilter<"AplicacionInsumo"> | string
    observaciones?: StringNullableFilter<"AplicacionInsumo"> | string | null
    createdAt?: DateTimeFilter<"AplicacionInsumo"> | Date | string
    updatedAt?: DateTimeFilter<"AplicacionInsumo"> | Date | string
    siembra?: XOR<SiembraRelationFilter, SiembraWhereInput>
    insumo?: XOR<InsumoRelationFilter, InsumoWhereInput>
  }, "id">

  export type AplicacionInsumoOrderByWithAggregationInput = {
    id?: SortOrder
    siembraId?: SortOrder
    insumoId?: SortOrder
    fecha?: SortOrder
    cantidad?: SortOrder
    unidad?: SortOrder
    observaciones?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AplicacionInsumoCountOrderByAggregateInput
    _avg?: AplicacionInsumoAvgOrderByAggregateInput
    _max?: AplicacionInsumoMaxOrderByAggregateInput
    _min?: AplicacionInsumoMinOrderByAggregateInput
    _sum?: AplicacionInsumoSumOrderByAggregateInput
  }

  export type AplicacionInsumoScalarWhereWithAggregatesInput = {
    AND?: AplicacionInsumoScalarWhereWithAggregatesInput | AplicacionInsumoScalarWhereWithAggregatesInput[]
    OR?: AplicacionInsumoScalarWhereWithAggregatesInput[]
    NOT?: AplicacionInsumoScalarWhereWithAggregatesInput | AplicacionInsumoScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"AplicacionInsumo"> | number
    siembraId?: IntWithAggregatesFilter<"AplicacionInsumo"> | number
    insumoId?: IntWithAggregatesFilter<"AplicacionInsumo"> | number
    fecha?: DateTimeWithAggregatesFilter<"AplicacionInsumo"> | Date | string
    cantidad?: FloatWithAggregatesFilter<"AplicacionInsumo"> | number
    unidad?: StringWithAggregatesFilter<"AplicacionInsumo"> | string
    observaciones?: StringNullableWithAggregatesFilter<"AplicacionInsumo"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"AplicacionInsumo"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"AplicacionInsumo"> | Date | string
  }

  export type AnimalWhereInput = {
    AND?: AnimalWhereInput | AnimalWhereInput[]
    OR?: AnimalWhereInput[]
    NOT?: AnimalWhereInput | AnimalWhereInput[]
    id?: IntFilter<"Animal"> | number
    usuarioId?: IntFilter<"Animal"> | number
    nombre?: StringFilter<"Animal"> | string
    especie?: EnumEspecieFilter<"Animal"> | $Enums.Especie
    sexo?: EnumSexoFilter<"Animal"> | $Enums.Sexo
    categoria?: EnumCategoriaAnimalFilter<"Animal"> | $Enums.CategoriaAnimal
    peso?: FloatNullableFilter<"Animal"> | number | null
    fechaNacimiento?: DateTimeNullableFilter<"Animal"> | Date | string | null
    observaciones?: StringNullableFilter<"Animal"> | string | null
    createdAt?: DateTimeFilter<"Animal"> | Date | string
    updatedAt?: DateTimeFilter<"Animal"> | Date | string
    usuario?: XOR<UsuarioRelationFilter, UsuarioWhereInput>
    preneces?: PrenezListRelationFilter
    pesos?: RegistroPesoListRelationFilter
  }

  export type AnimalOrderByWithRelationInput = {
    id?: SortOrder
    usuarioId?: SortOrder
    nombre?: SortOrder
    especie?: SortOrder
    sexo?: SortOrder
    categoria?: SortOrder
    peso?: SortOrderInput | SortOrder
    fechaNacimiento?: SortOrderInput | SortOrder
    observaciones?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    usuario?: UsuarioOrderByWithRelationInput
    preneces?: PrenezOrderByRelationAggregateInput
    pesos?: RegistroPesoOrderByRelationAggregateInput
  }

  export type AnimalWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: AnimalWhereInput | AnimalWhereInput[]
    OR?: AnimalWhereInput[]
    NOT?: AnimalWhereInput | AnimalWhereInput[]
    usuarioId?: IntFilter<"Animal"> | number
    nombre?: StringFilter<"Animal"> | string
    especie?: EnumEspecieFilter<"Animal"> | $Enums.Especie
    sexo?: EnumSexoFilter<"Animal"> | $Enums.Sexo
    categoria?: EnumCategoriaAnimalFilter<"Animal"> | $Enums.CategoriaAnimal
    peso?: FloatNullableFilter<"Animal"> | number | null
    fechaNacimiento?: DateTimeNullableFilter<"Animal"> | Date | string | null
    observaciones?: StringNullableFilter<"Animal"> | string | null
    createdAt?: DateTimeFilter<"Animal"> | Date | string
    updatedAt?: DateTimeFilter<"Animal"> | Date | string
    usuario?: XOR<UsuarioRelationFilter, UsuarioWhereInput>
    preneces?: PrenezListRelationFilter
    pesos?: RegistroPesoListRelationFilter
  }, "id">

  export type AnimalOrderByWithAggregationInput = {
    id?: SortOrder
    usuarioId?: SortOrder
    nombre?: SortOrder
    especie?: SortOrder
    sexo?: SortOrder
    categoria?: SortOrder
    peso?: SortOrderInput | SortOrder
    fechaNacimiento?: SortOrderInput | SortOrder
    observaciones?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AnimalCountOrderByAggregateInput
    _avg?: AnimalAvgOrderByAggregateInput
    _max?: AnimalMaxOrderByAggregateInput
    _min?: AnimalMinOrderByAggregateInput
    _sum?: AnimalSumOrderByAggregateInput
  }

  export type AnimalScalarWhereWithAggregatesInput = {
    AND?: AnimalScalarWhereWithAggregatesInput | AnimalScalarWhereWithAggregatesInput[]
    OR?: AnimalScalarWhereWithAggregatesInput[]
    NOT?: AnimalScalarWhereWithAggregatesInput | AnimalScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Animal"> | number
    usuarioId?: IntWithAggregatesFilter<"Animal"> | number
    nombre?: StringWithAggregatesFilter<"Animal"> | string
    especie?: EnumEspecieWithAggregatesFilter<"Animal"> | $Enums.Especie
    sexo?: EnumSexoWithAggregatesFilter<"Animal"> | $Enums.Sexo
    categoria?: EnumCategoriaAnimalWithAggregatesFilter<"Animal"> | $Enums.CategoriaAnimal
    peso?: FloatNullableWithAggregatesFilter<"Animal"> | number | null
    fechaNacimiento?: DateTimeNullableWithAggregatesFilter<"Animal"> | Date | string | null
    observaciones?: StringNullableWithAggregatesFilter<"Animal"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Animal"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Animal"> | Date | string
  }

  export type PrenezWhereInput = {
    AND?: PrenezWhereInput | PrenezWhereInput[]
    OR?: PrenezWhereInput[]
    NOT?: PrenezWhereInput | PrenezWhereInput[]
    id?: IntFilter<"Prenez"> | number
    animalId?: IntFilter<"Prenez"> | number
    fechaInicio?: DateTimeFilter<"Prenez"> | Date | string
    fechaEstimadaParto?: DateTimeFilter<"Prenez"> | Date | string
    estado?: EnumEstadoPrenezFilter<"Prenez"> | $Enums.EstadoPrenez
    observaciones?: StringNullableFilter<"Prenez"> | string | null
    createdAt?: DateTimeFilter<"Prenez"> | Date | string
    updatedAt?: DateTimeFilter<"Prenez"> | Date | string
    animal?: XOR<AnimalRelationFilter, AnimalWhereInput>
  }

  export type PrenezOrderByWithRelationInput = {
    id?: SortOrder
    animalId?: SortOrder
    fechaInicio?: SortOrder
    fechaEstimadaParto?: SortOrder
    estado?: SortOrder
    observaciones?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    animal?: AnimalOrderByWithRelationInput
  }

  export type PrenezWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: PrenezWhereInput | PrenezWhereInput[]
    OR?: PrenezWhereInput[]
    NOT?: PrenezWhereInput | PrenezWhereInput[]
    animalId?: IntFilter<"Prenez"> | number
    fechaInicio?: DateTimeFilter<"Prenez"> | Date | string
    fechaEstimadaParto?: DateTimeFilter<"Prenez"> | Date | string
    estado?: EnumEstadoPrenezFilter<"Prenez"> | $Enums.EstadoPrenez
    observaciones?: StringNullableFilter<"Prenez"> | string | null
    createdAt?: DateTimeFilter<"Prenez"> | Date | string
    updatedAt?: DateTimeFilter<"Prenez"> | Date | string
    animal?: XOR<AnimalRelationFilter, AnimalWhereInput>
  }, "id">

  export type PrenezOrderByWithAggregationInput = {
    id?: SortOrder
    animalId?: SortOrder
    fechaInicio?: SortOrder
    fechaEstimadaParto?: SortOrder
    estado?: SortOrder
    observaciones?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PrenezCountOrderByAggregateInput
    _avg?: PrenezAvgOrderByAggregateInput
    _max?: PrenezMaxOrderByAggregateInput
    _min?: PrenezMinOrderByAggregateInput
    _sum?: PrenezSumOrderByAggregateInput
  }

  export type PrenezScalarWhereWithAggregatesInput = {
    AND?: PrenezScalarWhereWithAggregatesInput | PrenezScalarWhereWithAggregatesInput[]
    OR?: PrenezScalarWhereWithAggregatesInput[]
    NOT?: PrenezScalarWhereWithAggregatesInput | PrenezScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Prenez"> | number
    animalId?: IntWithAggregatesFilter<"Prenez"> | number
    fechaInicio?: DateTimeWithAggregatesFilter<"Prenez"> | Date | string
    fechaEstimadaParto?: DateTimeWithAggregatesFilter<"Prenez"> | Date | string
    estado?: EnumEstadoPrenezWithAggregatesFilter<"Prenez"> | $Enums.EstadoPrenez
    observaciones?: StringNullableWithAggregatesFilter<"Prenez"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Prenez"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Prenez"> | Date | string
  }

  export type TareaRuralWhereInput = {
    AND?: TareaRuralWhereInput | TareaRuralWhereInput[]
    OR?: TareaRuralWhereInput[]
    NOT?: TareaRuralWhereInput | TareaRuralWhereInput[]
    id?: IntFilter<"TareaRural"> | number
    usuarioId?: IntFilter<"TareaRural"> | number
    titulo?: StringFilter<"TareaRural"> | string
    descripcion?: StringNullableFilter<"TareaRural"> | string | null
    tipo?: EnumTipoTareaFilter<"TareaRural"> | $Enums.TipoTarea
    estado?: EnumEstadoTareaFilter<"TareaRural"> | $Enums.EstadoTarea
    prioridad?: EnumPrioridadFilter<"TareaRural"> | $Enums.Prioridad
    fechaProgramada?: DateTimeFilter<"TareaRural"> | Date | string
    fechaCompletada?: DateTimeNullableFilter<"TareaRural"> | Date | string | null
    campoId?: IntNullableFilter<"TareaRural"> | number | null
    observaciones?: StringNullableFilter<"TareaRural"> | string | null
    createdAt?: DateTimeFilter<"TareaRural"> | Date | string
    updatedAt?: DateTimeFilter<"TareaRural"> | Date | string
    usuario?: XOR<UsuarioRelationFilter, UsuarioWhereInput>
    campo?: XOR<CampoNullableRelationFilter, CampoWhereInput> | null
  }

  export type TareaRuralOrderByWithRelationInput = {
    id?: SortOrder
    usuarioId?: SortOrder
    titulo?: SortOrder
    descripcion?: SortOrderInput | SortOrder
    tipo?: SortOrder
    estado?: SortOrder
    prioridad?: SortOrder
    fechaProgramada?: SortOrder
    fechaCompletada?: SortOrderInput | SortOrder
    campoId?: SortOrderInput | SortOrder
    observaciones?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    usuario?: UsuarioOrderByWithRelationInput
    campo?: CampoOrderByWithRelationInput
  }

  export type TareaRuralWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: TareaRuralWhereInput | TareaRuralWhereInput[]
    OR?: TareaRuralWhereInput[]
    NOT?: TareaRuralWhereInput | TareaRuralWhereInput[]
    usuarioId?: IntFilter<"TareaRural"> | number
    titulo?: StringFilter<"TareaRural"> | string
    descripcion?: StringNullableFilter<"TareaRural"> | string | null
    tipo?: EnumTipoTareaFilter<"TareaRural"> | $Enums.TipoTarea
    estado?: EnumEstadoTareaFilter<"TareaRural"> | $Enums.EstadoTarea
    prioridad?: EnumPrioridadFilter<"TareaRural"> | $Enums.Prioridad
    fechaProgramada?: DateTimeFilter<"TareaRural"> | Date | string
    fechaCompletada?: DateTimeNullableFilter<"TareaRural"> | Date | string | null
    campoId?: IntNullableFilter<"TareaRural"> | number | null
    observaciones?: StringNullableFilter<"TareaRural"> | string | null
    createdAt?: DateTimeFilter<"TareaRural"> | Date | string
    updatedAt?: DateTimeFilter<"TareaRural"> | Date | string
    usuario?: XOR<UsuarioRelationFilter, UsuarioWhereInput>
    campo?: XOR<CampoNullableRelationFilter, CampoWhereInput> | null
  }, "id">

  export type TareaRuralOrderByWithAggregationInput = {
    id?: SortOrder
    usuarioId?: SortOrder
    titulo?: SortOrder
    descripcion?: SortOrderInput | SortOrder
    tipo?: SortOrder
    estado?: SortOrder
    prioridad?: SortOrder
    fechaProgramada?: SortOrder
    fechaCompletada?: SortOrderInput | SortOrder
    campoId?: SortOrderInput | SortOrder
    observaciones?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: TareaRuralCountOrderByAggregateInput
    _avg?: TareaRuralAvgOrderByAggregateInput
    _max?: TareaRuralMaxOrderByAggregateInput
    _min?: TareaRuralMinOrderByAggregateInput
    _sum?: TareaRuralSumOrderByAggregateInput
  }

  export type TareaRuralScalarWhereWithAggregatesInput = {
    AND?: TareaRuralScalarWhereWithAggregatesInput | TareaRuralScalarWhereWithAggregatesInput[]
    OR?: TareaRuralScalarWhereWithAggregatesInput[]
    NOT?: TareaRuralScalarWhereWithAggregatesInput | TareaRuralScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"TareaRural"> | number
    usuarioId?: IntWithAggregatesFilter<"TareaRural"> | number
    titulo?: StringWithAggregatesFilter<"TareaRural"> | string
    descripcion?: StringNullableWithAggregatesFilter<"TareaRural"> | string | null
    tipo?: EnumTipoTareaWithAggregatesFilter<"TareaRural"> | $Enums.TipoTarea
    estado?: EnumEstadoTareaWithAggregatesFilter<"TareaRural"> | $Enums.EstadoTarea
    prioridad?: EnumPrioridadWithAggregatesFilter<"TareaRural"> | $Enums.Prioridad
    fechaProgramada?: DateTimeWithAggregatesFilter<"TareaRural"> | Date | string
    fechaCompletada?: DateTimeNullableWithAggregatesFilter<"TareaRural"> | Date | string | null
    campoId?: IntNullableWithAggregatesFilter<"TareaRural"> | number | null
    observaciones?: StringNullableWithAggregatesFilter<"TareaRural"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"TareaRural"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"TareaRural"> | Date | string
  }

  export type MovimientoFinancieroWhereInput = {
    AND?: MovimientoFinancieroWhereInput | MovimientoFinancieroWhereInput[]
    OR?: MovimientoFinancieroWhereInput[]
    NOT?: MovimientoFinancieroWhereInput | MovimientoFinancieroWhereInput[]
    id?: IntFilter<"MovimientoFinanciero"> | number
    usuarioId?: IntFilter<"MovimientoFinanciero"> | number
    tipo?: EnumTipoMovimientoFilter<"MovimientoFinanciero"> | $Enums.TipoMovimiento
    concepto?: StringFilter<"MovimientoFinanciero"> | string
    monto?: FloatFilter<"MovimientoFinanciero"> | number
    fecha?: DateTimeFilter<"MovimientoFinanciero"> | Date | string
    categoria?: EnumCategoriaMovimientoFilter<"MovimientoFinanciero"> | $Enums.CategoriaMovimiento
    campoId?: IntNullableFilter<"MovimientoFinanciero"> | number | null
    siembraId?: IntNullableFilter<"MovimientoFinanciero"> | number | null
    observaciones?: StringNullableFilter<"MovimientoFinanciero"> | string | null
    createdAt?: DateTimeFilter<"MovimientoFinanciero"> | Date | string
    updatedAt?: DateTimeFilter<"MovimientoFinanciero"> | Date | string
    usuario?: XOR<UsuarioRelationFilter, UsuarioWhereInput>
    campo?: XOR<CampoNullableRelationFilter, CampoWhereInput> | null
    siembra?: XOR<SiembraNullableRelationFilter, SiembraWhereInput> | null
  }

  export type MovimientoFinancieroOrderByWithRelationInput = {
    id?: SortOrder
    usuarioId?: SortOrder
    tipo?: SortOrder
    concepto?: SortOrder
    monto?: SortOrder
    fecha?: SortOrder
    categoria?: SortOrder
    campoId?: SortOrderInput | SortOrder
    siembraId?: SortOrderInput | SortOrder
    observaciones?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    usuario?: UsuarioOrderByWithRelationInput
    campo?: CampoOrderByWithRelationInput
    siembra?: SiembraOrderByWithRelationInput
  }

  export type MovimientoFinancieroWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: MovimientoFinancieroWhereInput | MovimientoFinancieroWhereInput[]
    OR?: MovimientoFinancieroWhereInput[]
    NOT?: MovimientoFinancieroWhereInput | MovimientoFinancieroWhereInput[]
    usuarioId?: IntFilter<"MovimientoFinanciero"> | number
    tipo?: EnumTipoMovimientoFilter<"MovimientoFinanciero"> | $Enums.TipoMovimiento
    concepto?: StringFilter<"MovimientoFinanciero"> | string
    monto?: FloatFilter<"MovimientoFinanciero"> | number
    fecha?: DateTimeFilter<"MovimientoFinanciero"> | Date | string
    categoria?: EnumCategoriaMovimientoFilter<"MovimientoFinanciero"> | $Enums.CategoriaMovimiento
    campoId?: IntNullableFilter<"MovimientoFinanciero"> | number | null
    siembraId?: IntNullableFilter<"MovimientoFinanciero"> | number | null
    observaciones?: StringNullableFilter<"MovimientoFinanciero"> | string | null
    createdAt?: DateTimeFilter<"MovimientoFinanciero"> | Date | string
    updatedAt?: DateTimeFilter<"MovimientoFinanciero"> | Date | string
    usuario?: XOR<UsuarioRelationFilter, UsuarioWhereInput>
    campo?: XOR<CampoNullableRelationFilter, CampoWhereInput> | null
    siembra?: XOR<SiembraNullableRelationFilter, SiembraWhereInput> | null
  }, "id">

  export type MovimientoFinancieroOrderByWithAggregationInput = {
    id?: SortOrder
    usuarioId?: SortOrder
    tipo?: SortOrder
    concepto?: SortOrder
    monto?: SortOrder
    fecha?: SortOrder
    categoria?: SortOrder
    campoId?: SortOrderInput | SortOrder
    siembraId?: SortOrderInput | SortOrder
    observaciones?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: MovimientoFinancieroCountOrderByAggregateInput
    _avg?: MovimientoFinancieroAvgOrderByAggregateInput
    _max?: MovimientoFinancieroMaxOrderByAggregateInput
    _min?: MovimientoFinancieroMinOrderByAggregateInput
    _sum?: MovimientoFinancieroSumOrderByAggregateInput
  }

  export type MovimientoFinancieroScalarWhereWithAggregatesInput = {
    AND?: MovimientoFinancieroScalarWhereWithAggregatesInput | MovimientoFinancieroScalarWhereWithAggregatesInput[]
    OR?: MovimientoFinancieroScalarWhereWithAggregatesInput[]
    NOT?: MovimientoFinancieroScalarWhereWithAggregatesInput | MovimientoFinancieroScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"MovimientoFinanciero"> | number
    usuarioId?: IntWithAggregatesFilter<"MovimientoFinanciero"> | number
    tipo?: EnumTipoMovimientoWithAggregatesFilter<"MovimientoFinanciero"> | $Enums.TipoMovimiento
    concepto?: StringWithAggregatesFilter<"MovimientoFinanciero"> | string
    monto?: FloatWithAggregatesFilter<"MovimientoFinanciero"> | number
    fecha?: DateTimeWithAggregatesFilter<"MovimientoFinanciero"> | Date | string
    categoria?: EnumCategoriaMovimientoWithAggregatesFilter<"MovimientoFinanciero"> | $Enums.CategoriaMovimiento
    campoId?: IntNullableWithAggregatesFilter<"MovimientoFinanciero"> | number | null
    siembraId?: IntNullableWithAggregatesFilter<"MovimientoFinanciero"> | number | null
    observaciones?: StringNullableWithAggregatesFilter<"MovimientoFinanciero"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"MovimientoFinanciero"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"MovimientoFinanciero"> | Date | string
  }

  export type CampaniaWhereInput = {
    AND?: CampaniaWhereInput | CampaniaWhereInput[]
    OR?: CampaniaWhereInput[]
    NOT?: CampaniaWhereInput | CampaniaWhereInput[]
    id?: IntFilter<"Campania"> | number
    usuarioId?: IntFilter<"Campania"> | number
    nombre?: StringFilter<"Campania"> | string
    fechaInicio?: DateTimeFilter<"Campania"> | Date | string
    fechaFin?: DateTimeNullableFilter<"Campania"> | Date | string | null
    descripcion?: StringNullableFilter<"Campania"> | string | null
    createdAt?: DateTimeFilter<"Campania"> | Date | string
    updatedAt?: DateTimeFilter<"Campania"> | Date | string
    usuario?: XOR<UsuarioRelationFilter, UsuarioWhereInput>
    siembras?: SiembraListRelationFilter
  }

  export type CampaniaOrderByWithRelationInput = {
    id?: SortOrder
    usuarioId?: SortOrder
    nombre?: SortOrder
    fechaInicio?: SortOrder
    fechaFin?: SortOrderInput | SortOrder
    descripcion?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    usuario?: UsuarioOrderByWithRelationInput
    siembras?: SiembraOrderByRelationAggregateInput
  }

  export type CampaniaWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: CampaniaWhereInput | CampaniaWhereInput[]
    OR?: CampaniaWhereInput[]
    NOT?: CampaniaWhereInput | CampaniaWhereInput[]
    usuarioId?: IntFilter<"Campania"> | number
    nombre?: StringFilter<"Campania"> | string
    fechaInicio?: DateTimeFilter<"Campania"> | Date | string
    fechaFin?: DateTimeNullableFilter<"Campania"> | Date | string | null
    descripcion?: StringNullableFilter<"Campania"> | string | null
    createdAt?: DateTimeFilter<"Campania"> | Date | string
    updatedAt?: DateTimeFilter<"Campania"> | Date | string
    usuario?: XOR<UsuarioRelationFilter, UsuarioWhereInput>
    siembras?: SiembraListRelationFilter
  }, "id">

  export type CampaniaOrderByWithAggregationInput = {
    id?: SortOrder
    usuarioId?: SortOrder
    nombre?: SortOrder
    fechaInicio?: SortOrder
    fechaFin?: SortOrderInput | SortOrder
    descripcion?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CampaniaCountOrderByAggregateInput
    _avg?: CampaniaAvgOrderByAggregateInput
    _max?: CampaniaMaxOrderByAggregateInput
    _min?: CampaniaMinOrderByAggregateInput
    _sum?: CampaniaSumOrderByAggregateInput
  }

  export type CampaniaScalarWhereWithAggregatesInput = {
    AND?: CampaniaScalarWhereWithAggregatesInput | CampaniaScalarWhereWithAggregatesInput[]
    OR?: CampaniaScalarWhereWithAggregatesInput[]
    NOT?: CampaniaScalarWhereWithAggregatesInput | CampaniaScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Campania"> | number
    usuarioId?: IntWithAggregatesFilter<"Campania"> | number
    nombre?: StringWithAggregatesFilter<"Campania"> | string
    fechaInicio?: DateTimeWithAggregatesFilter<"Campania"> | Date | string
    fechaFin?: DateTimeNullableWithAggregatesFilter<"Campania"> | Date | string | null
    descripcion?: StringNullableWithAggregatesFilter<"Campania"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Campania"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Campania"> | Date | string
  }

  export type RegistroPesoWhereInput = {
    AND?: RegistroPesoWhereInput | RegistroPesoWhereInput[]
    OR?: RegistroPesoWhereInput[]
    NOT?: RegistroPesoWhereInput | RegistroPesoWhereInput[]
    id?: IntFilter<"RegistroPeso"> | number
    animalId?: IntFilter<"RegistroPeso"> | number
    peso?: FloatFilter<"RegistroPeso"> | number
    fecha?: DateTimeFilter<"RegistroPeso"> | Date | string
    observaciones?: StringNullableFilter<"RegistroPeso"> | string | null
    createdAt?: DateTimeFilter<"RegistroPeso"> | Date | string
    animal?: XOR<AnimalRelationFilter, AnimalWhereInput>
  }

  export type RegistroPesoOrderByWithRelationInput = {
    id?: SortOrder
    animalId?: SortOrder
    peso?: SortOrder
    fecha?: SortOrder
    observaciones?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    animal?: AnimalOrderByWithRelationInput
  }

  export type RegistroPesoWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: RegistroPesoWhereInput | RegistroPesoWhereInput[]
    OR?: RegistroPesoWhereInput[]
    NOT?: RegistroPesoWhereInput | RegistroPesoWhereInput[]
    animalId?: IntFilter<"RegistroPeso"> | number
    peso?: FloatFilter<"RegistroPeso"> | number
    fecha?: DateTimeFilter<"RegistroPeso"> | Date | string
    observaciones?: StringNullableFilter<"RegistroPeso"> | string | null
    createdAt?: DateTimeFilter<"RegistroPeso"> | Date | string
    animal?: XOR<AnimalRelationFilter, AnimalWhereInput>
  }, "id">

  export type RegistroPesoOrderByWithAggregationInput = {
    id?: SortOrder
    animalId?: SortOrder
    peso?: SortOrder
    fecha?: SortOrder
    observaciones?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: RegistroPesoCountOrderByAggregateInput
    _avg?: RegistroPesoAvgOrderByAggregateInput
    _max?: RegistroPesoMaxOrderByAggregateInput
    _min?: RegistroPesoMinOrderByAggregateInput
    _sum?: RegistroPesoSumOrderByAggregateInput
  }

  export type RegistroPesoScalarWhereWithAggregatesInput = {
    AND?: RegistroPesoScalarWhereWithAggregatesInput | RegistroPesoScalarWhereWithAggregatesInput[]
    OR?: RegistroPesoScalarWhereWithAggregatesInput[]
    NOT?: RegistroPesoScalarWhereWithAggregatesInput | RegistroPesoScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"RegistroPeso"> | number
    animalId?: IntWithAggregatesFilter<"RegistroPeso"> | number
    peso?: FloatWithAggregatesFilter<"RegistroPeso"> | number
    fecha?: DateTimeWithAggregatesFilter<"RegistroPeso"> | Date | string
    observaciones?: StringNullableWithAggregatesFilter<"RegistroPeso"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"RegistroPeso"> | Date | string
  }

  export type UsuarioCreateInput = {
    email: string
    nombre: string
    password: string
    rol?: $Enums.Rol
    plan?: $Enums.PlanTipo
    planExpira?: Date | string | null
    mpSuscripcionId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    resetToken?: string | null
    resetTokenExpiry?: Date | string | null
    campos?: CampoCreateNestedManyWithoutUsuarioInput
    animales?: AnimalCreateNestedManyWithoutUsuarioInput
    tareas?: TareaRuralCreateNestedManyWithoutUsuarioInput
    movimientos?: MovimientoFinancieroCreateNestedManyWithoutUsuarioInput
    campanias?: CampaniaCreateNestedManyWithoutUsuarioInput
  }

  export type UsuarioUncheckedCreateInput = {
    id?: number
    email: string
    nombre: string
    password: string
    rol?: $Enums.Rol
    plan?: $Enums.PlanTipo
    planExpira?: Date | string | null
    mpSuscripcionId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    resetToken?: string | null
    resetTokenExpiry?: Date | string | null
    campos?: CampoUncheckedCreateNestedManyWithoutUsuarioInput
    animales?: AnimalUncheckedCreateNestedManyWithoutUsuarioInput
    tareas?: TareaRuralUncheckedCreateNestedManyWithoutUsuarioInput
    movimientos?: MovimientoFinancieroUncheckedCreateNestedManyWithoutUsuarioInput
    campanias?: CampaniaUncheckedCreateNestedManyWithoutUsuarioInput
  }

  export type UsuarioUpdateInput = {
    email?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    rol?: EnumRolFieldUpdateOperationsInput | $Enums.Rol
    plan?: EnumPlanTipoFieldUpdateOperationsInput | $Enums.PlanTipo
    planExpira?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    mpSuscripcionId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    campos?: CampoUpdateManyWithoutUsuarioNestedInput
    animales?: AnimalUpdateManyWithoutUsuarioNestedInput
    tareas?: TareaRuralUpdateManyWithoutUsuarioNestedInput
    movimientos?: MovimientoFinancieroUpdateManyWithoutUsuarioNestedInput
    campanias?: CampaniaUpdateManyWithoutUsuarioNestedInput
  }

  export type UsuarioUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    rol?: EnumRolFieldUpdateOperationsInput | $Enums.Rol
    plan?: EnumPlanTipoFieldUpdateOperationsInput | $Enums.PlanTipo
    planExpira?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    mpSuscripcionId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    campos?: CampoUncheckedUpdateManyWithoutUsuarioNestedInput
    animales?: AnimalUncheckedUpdateManyWithoutUsuarioNestedInput
    tareas?: TareaRuralUncheckedUpdateManyWithoutUsuarioNestedInput
    movimientos?: MovimientoFinancieroUncheckedUpdateManyWithoutUsuarioNestedInput
    campanias?: CampaniaUncheckedUpdateManyWithoutUsuarioNestedInput
  }

  export type UsuarioCreateManyInput = {
    id?: number
    email: string
    nombre: string
    password: string
    rol?: $Enums.Rol
    plan?: $Enums.PlanTipo
    planExpira?: Date | string | null
    mpSuscripcionId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    resetToken?: string | null
    resetTokenExpiry?: Date | string | null
  }

  export type UsuarioUpdateManyMutationInput = {
    email?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    rol?: EnumRolFieldUpdateOperationsInput | $Enums.Rol
    plan?: EnumPlanTipoFieldUpdateOperationsInput | $Enums.PlanTipo
    planExpira?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    mpSuscripcionId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UsuarioUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    rol?: EnumRolFieldUpdateOperationsInput | $Enums.Rol
    plan?: EnumPlanTipoFieldUpdateOperationsInput | $Enums.PlanTipo
    planExpira?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    mpSuscripcionId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CampoCreateInput = {
    nombre: string
    hectareas: number
    ubicacion?: string | null
    propietario?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    usuario: UsuarioCreateNestedOneWithoutCamposInput
    lotes?: LoteCreateNestedManyWithoutCampoInput
    tareas?: TareaRuralCreateNestedManyWithoutCampoInput
    movimentos?: MovimientoFinancieroCreateNestedManyWithoutCampoInput
  }

  export type CampoUncheckedCreateInput = {
    id?: number
    nombre: string
    hectareas: number
    ubicacion?: string | null
    propietario?: string | null
    usuarioId: number
    createdAt?: Date | string
    updatedAt?: Date | string
    lotes?: LoteUncheckedCreateNestedManyWithoutCampoInput
    tareas?: TareaRuralUncheckedCreateNestedManyWithoutCampoInput
    movimentos?: MovimientoFinancieroUncheckedCreateNestedManyWithoutCampoInput
  }

  export type CampoUpdateInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    hectareas?: FloatFieldUpdateOperationsInput | number
    ubicacion?: NullableStringFieldUpdateOperationsInput | string | null
    propietario?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usuario?: UsuarioUpdateOneRequiredWithoutCamposNestedInput
    lotes?: LoteUpdateManyWithoutCampoNestedInput
    tareas?: TareaRuralUpdateManyWithoutCampoNestedInput
    movimentos?: MovimientoFinancieroUpdateManyWithoutCampoNestedInput
  }

  export type CampoUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    hectareas?: FloatFieldUpdateOperationsInput | number
    ubicacion?: NullableStringFieldUpdateOperationsInput | string | null
    propietario?: NullableStringFieldUpdateOperationsInput | string | null
    usuarioId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lotes?: LoteUncheckedUpdateManyWithoutCampoNestedInput
    tareas?: TareaRuralUncheckedUpdateManyWithoutCampoNestedInput
    movimentos?: MovimientoFinancieroUncheckedUpdateManyWithoutCampoNestedInput
  }

  export type CampoCreateManyInput = {
    id?: number
    nombre: string
    hectareas: number
    ubicacion?: string | null
    propietario?: string | null
    usuarioId: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CampoUpdateManyMutationInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    hectareas?: FloatFieldUpdateOperationsInput | number
    ubicacion?: NullableStringFieldUpdateOperationsInput | string | null
    propietario?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CampoUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    hectareas?: FloatFieldUpdateOperationsInput | number
    ubicacion?: NullableStringFieldUpdateOperationsInput | string | null
    propietario?: NullableStringFieldUpdateOperationsInput | string | null
    usuarioId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LoteCreateInput = {
    nombre: string
    hectareas: number
    createdAt?: Date | string
    updatedAt?: Date | string
    campo: CampoCreateNestedOneWithoutLotesInput
    siembras?: SiembraCreateNestedManyWithoutLoteInput
  }

  export type LoteUncheckedCreateInput = {
    id?: number
    nombre: string
    hectareas: number
    campoId: number
    createdAt?: Date | string
    updatedAt?: Date | string
    siembras?: SiembraUncheckedCreateNestedManyWithoutLoteInput
  }

  export type LoteUpdateInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    hectareas?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    campo?: CampoUpdateOneRequiredWithoutLotesNestedInput
    siembras?: SiembraUpdateManyWithoutLoteNestedInput
  }

  export type LoteUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    hectareas?: FloatFieldUpdateOperationsInput | number
    campoId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    siembras?: SiembraUncheckedUpdateManyWithoutLoteNestedInput
  }

  export type LoteCreateManyInput = {
    id?: number
    nombre: string
    hectareas: number
    campoId: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LoteUpdateManyMutationInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    hectareas?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LoteUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    hectareas?: FloatFieldUpdateOperationsInput | number
    campoId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TipoCultivoCreateInput = {
    nombre: string
    descripcion?: string | null
    createdAt?: Date | string
    siembras?: SiembraCreateNestedManyWithoutTipoCultivoInput
  }

  export type TipoCultivoUncheckedCreateInput = {
    id?: number
    nombre: string
    descripcion?: string | null
    createdAt?: Date | string
    siembras?: SiembraUncheckedCreateNestedManyWithoutTipoCultivoInput
  }

  export type TipoCultivoUpdateInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    siembras?: SiembraUpdateManyWithoutTipoCultivoNestedInput
  }

  export type TipoCultivoUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    siembras?: SiembraUncheckedUpdateManyWithoutTipoCultivoNestedInput
  }

  export type TipoCultivoCreateManyInput = {
    id?: number
    nombre: string
    descripcion?: string | null
    createdAt?: Date | string
  }

  export type TipoCultivoUpdateManyMutationInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TipoCultivoUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SiembraCreateInput = {
    fechaSiembra: Date | string
    densidad?: number | null
    observaciones?: string | null
    estado?: $Enums.EstadoSiembra
    createdAt?: Date | string
    updatedAt?: Date | string
    lote: LoteCreateNestedOneWithoutSiembrasInput
    tipoCultivo: TipoCultivoCreateNestedOneWithoutSiembrasInput
    cosechas?: CosechaCreateNestedManyWithoutSiembraInput
    aplicaciones?: AplicacionInsumoCreateNestedManyWithoutSiembraInput
    movimentos?: MovimientoFinancieroCreateNestedManyWithoutSiembraInput
    campania?: CampaniaCreateNestedOneWithoutSiembrasInput
  }

  export type SiembraUncheckedCreateInput = {
    id?: number
    loteId: number
    tipoCultivoId: number
    fechaSiembra: Date | string
    densidad?: number | null
    observaciones?: string | null
    estado?: $Enums.EstadoSiembra
    createdAt?: Date | string
    updatedAt?: Date | string
    campaniaId?: number | null
    cosechas?: CosechaUncheckedCreateNestedManyWithoutSiembraInput
    aplicaciones?: AplicacionInsumoUncheckedCreateNestedManyWithoutSiembraInput
    movimentos?: MovimientoFinancieroUncheckedCreateNestedManyWithoutSiembraInput
  }

  export type SiembraUpdateInput = {
    fechaSiembra?: DateTimeFieldUpdateOperationsInput | Date | string
    densidad?: NullableFloatFieldUpdateOperationsInput | number | null
    observaciones?: NullableStringFieldUpdateOperationsInput | string | null
    estado?: EnumEstadoSiembraFieldUpdateOperationsInput | $Enums.EstadoSiembra
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lote?: LoteUpdateOneRequiredWithoutSiembrasNestedInput
    tipoCultivo?: TipoCultivoUpdateOneRequiredWithoutSiembrasNestedInput
    cosechas?: CosechaUpdateManyWithoutSiembraNestedInput
    aplicaciones?: AplicacionInsumoUpdateManyWithoutSiembraNestedInput
    movimentos?: MovimientoFinancieroUpdateManyWithoutSiembraNestedInput
    campania?: CampaniaUpdateOneWithoutSiembrasNestedInput
  }

  export type SiembraUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    loteId?: IntFieldUpdateOperationsInput | number
    tipoCultivoId?: IntFieldUpdateOperationsInput | number
    fechaSiembra?: DateTimeFieldUpdateOperationsInput | Date | string
    densidad?: NullableFloatFieldUpdateOperationsInput | number | null
    observaciones?: NullableStringFieldUpdateOperationsInput | string | null
    estado?: EnumEstadoSiembraFieldUpdateOperationsInput | $Enums.EstadoSiembra
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    campaniaId?: NullableIntFieldUpdateOperationsInput | number | null
    cosechas?: CosechaUncheckedUpdateManyWithoutSiembraNestedInput
    aplicaciones?: AplicacionInsumoUncheckedUpdateManyWithoutSiembraNestedInput
    movimentos?: MovimientoFinancieroUncheckedUpdateManyWithoutSiembraNestedInput
  }

  export type SiembraCreateManyInput = {
    id?: number
    loteId: number
    tipoCultivoId: number
    fechaSiembra: Date | string
    densidad?: number | null
    observaciones?: string | null
    estado?: $Enums.EstadoSiembra
    createdAt?: Date | string
    updatedAt?: Date | string
    campaniaId?: number | null
  }

  export type SiembraUpdateManyMutationInput = {
    fechaSiembra?: DateTimeFieldUpdateOperationsInput | Date | string
    densidad?: NullableFloatFieldUpdateOperationsInput | number | null
    observaciones?: NullableStringFieldUpdateOperationsInput | string | null
    estado?: EnumEstadoSiembraFieldUpdateOperationsInput | $Enums.EstadoSiembra
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SiembraUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    loteId?: IntFieldUpdateOperationsInput | number
    tipoCultivoId?: IntFieldUpdateOperationsInput | number
    fechaSiembra?: DateTimeFieldUpdateOperationsInput | Date | string
    densidad?: NullableFloatFieldUpdateOperationsInput | number | null
    observaciones?: NullableStringFieldUpdateOperationsInput | string | null
    estado?: EnumEstadoSiembraFieldUpdateOperationsInput | $Enums.EstadoSiembra
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    campaniaId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type CosechaCreateInput = {
    fechaCosecha: Date | string
    rendimientoKgHa: number
    totalKg: number
    humedad?: number | null
    observaciones?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    siembra: SiembraCreateNestedOneWithoutCosechasInput
  }

  export type CosechaUncheckedCreateInput = {
    id?: number
    siembraId: number
    fechaCosecha: Date | string
    rendimientoKgHa: number
    totalKg: number
    humedad?: number | null
    observaciones?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CosechaUpdateInput = {
    fechaCosecha?: DateTimeFieldUpdateOperationsInput | Date | string
    rendimientoKgHa?: FloatFieldUpdateOperationsInput | number
    totalKg?: FloatFieldUpdateOperationsInput | number
    humedad?: NullableFloatFieldUpdateOperationsInput | number | null
    observaciones?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    siembra?: SiembraUpdateOneRequiredWithoutCosechasNestedInput
  }

  export type CosechaUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    siembraId?: IntFieldUpdateOperationsInput | number
    fechaCosecha?: DateTimeFieldUpdateOperationsInput | Date | string
    rendimientoKgHa?: FloatFieldUpdateOperationsInput | number
    totalKg?: FloatFieldUpdateOperationsInput | number
    humedad?: NullableFloatFieldUpdateOperationsInput | number | null
    observaciones?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CosechaCreateManyInput = {
    id?: number
    siembraId: number
    fechaCosecha: Date | string
    rendimientoKgHa: number
    totalKg: number
    humedad?: number | null
    observaciones?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CosechaUpdateManyMutationInput = {
    fechaCosecha?: DateTimeFieldUpdateOperationsInput | Date | string
    rendimientoKgHa?: FloatFieldUpdateOperationsInput | number
    totalKg?: FloatFieldUpdateOperationsInput | number
    humedad?: NullableFloatFieldUpdateOperationsInput | number | null
    observaciones?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CosechaUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    siembraId?: IntFieldUpdateOperationsInput | number
    fechaCosecha?: DateTimeFieldUpdateOperationsInput | Date | string
    rendimientoKgHa?: FloatFieldUpdateOperationsInput | number
    totalKg?: FloatFieldUpdateOperationsInput | number
    humedad?: NullableFloatFieldUpdateOperationsInput | number | null
    observaciones?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InsumoCreateInput = {
    nombre: string
    tipo: $Enums.TipoInsumo
    unidad: string
    descripcion?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    aplicaciones?: AplicacionInsumoCreateNestedManyWithoutInsumoInput
  }

  export type InsumoUncheckedCreateInput = {
    id?: number
    nombre: string
    tipo: $Enums.TipoInsumo
    unidad: string
    descripcion?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    aplicaciones?: AplicacionInsumoUncheckedCreateNestedManyWithoutInsumoInput
  }

  export type InsumoUpdateInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    tipo?: EnumTipoInsumoFieldUpdateOperationsInput | $Enums.TipoInsumo
    unidad?: StringFieldUpdateOperationsInput | string
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    aplicaciones?: AplicacionInsumoUpdateManyWithoutInsumoNestedInput
  }

  export type InsumoUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    tipo?: EnumTipoInsumoFieldUpdateOperationsInput | $Enums.TipoInsumo
    unidad?: StringFieldUpdateOperationsInput | string
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    aplicaciones?: AplicacionInsumoUncheckedUpdateManyWithoutInsumoNestedInput
  }

  export type InsumoCreateManyInput = {
    id?: number
    nombre: string
    tipo: $Enums.TipoInsumo
    unidad: string
    descripcion?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type InsumoUpdateManyMutationInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    tipo?: EnumTipoInsumoFieldUpdateOperationsInput | $Enums.TipoInsumo
    unidad?: StringFieldUpdateOperationsInput | string
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InsumoUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    tipo?: EnumTipoInsumoFieldUpdateOperationsInput | $Enums.TipoInsumo
    unidad?: StringFieldUpdateOperationsInput | string
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AplicacionInsumoCreateInput = {
    fecha: Date | string
    cantidad: number
    unidad: string
    observaciones?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    siembra: SiembraCreateNestedOneWithoutAplicacionesInput
    insumo: InsumoCreateNestedOneWithoutAplicacionesInput
  }

  export type AplicacionInsumoUncheckedCreateInput = {
    id?: number
    siembraId: number
    insumoId: number
    fecha: Date | string
    cantidad: number
    unidad: string
    observaciones?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AplicacionInsumoUpdateInput = {
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    cantidad?: FloatFieldUpdateOperationsInput | number
    unidad?: StringFieldUpdateOperationsInput | string
    observaciones?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    siembra?: SiembraUpdateOneRequiredWithoutAplicacionesNestedInput
    insumo?: InsumoUpdateOneRequiredWithoutAplicacionesNestedInput
  }

  export type AplicacionInsumoUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    siembraId?: IntFieldUpdateOperationsInput | number
    insumoId?: IntFieldUpdateOperationsInput | number
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    cantidad?: FloatFieldUpdateOperationsInput | number
    unidad?: StringFieldUpdateOperationsInput | string
    observaciones?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AplicacionInsumoCreateManyInput = {
    id?: number
    siembraId: number
    insumoId: number
    fecha: Date | string
    cantidad: number
    unidad: string
    observaciones?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AplicacionInsumoUpdateManyMutationInput = {
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    cantidad?: FloatFieldUpdateOperationsInput | number
    unidad?: StringFieldUpdateOperationsInput | string
    observaciones?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AplicacionInsumoUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    siembraId?: IntFieldUpdateOperationsInput | number
    insumoId?: IntFieldUpdateOperationsInput | number
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    cantidad?: FloatFieldUpdateOperationsInput | number
    unidad?: StringFieldUpdateOperationsInput | string
    observaciones?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AnimalCreateInput = {
    nombre: string
    especie: $Enums.Especie
    sexo: $Enums.Sexo
    categoria: $Enums.CategoriaAnimal
    peso?: number | null
    fechaNacimiento?: Date | string | null
    observaciones?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    usuario: UsuarioCreateNestedOneWithoutAnimalesInput
    preneces?: PrenezCreateNestedManyWithoutAnimalInput
    pesos?: RegistroPesoCreateNestedManyWithoutAnimalInput
  }

  export type AnimalUncheckedCreateInput = {
    id?: number
    usuarioId: number
    nombre: string
    especie: $Enums.Especie
    sexo: $Enums.Sexo
    categoria: $Enums.CategoriaAnimal
    peso?: number | null
    fechaNacimiento?: Date | string | null
    observaciones?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    preneces?: PrenezUncheckedCreateNestedManyWithoutAnimalInput
    pesos?: RegistroPesoUncheckedCreateNestedManyWithoutAnimalInput
  }

  export type AnimalUpdateInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    especie?: EnumEspecieFieldUpdateOperationsInput | $Enums.Especie
    sexo?: EnumSexoFieldUpdateOperationsInput | $Enums.Sexo
    categoria?: EnumCategoriaAnimalFieldUpdateOperationsInput | $Enums.CategoriaAnimal
    peso?: NullableFloatFieldUpdateOperationsInput | number | null
    fechaNacimiento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    observaciones?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usuario?: UsuarioUpdateOneRequiredWithoutAnimalesNestedInput
    preneces?: PrenezUpdateManyWithoutAnimalNestedInput
    pesos?: RegistroPesoUpdateManyWithoutAnimalNestedInput
  }

  export type AnimalUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    usuarioId?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    especie?: EnumEspecieFieldUpdateOperationsInput | $Enums.Especie
    sexo?: EnumSexoFieldUpdateOperationsInput | $Enums.Sexo
    categoria?: EnumCategoriaAnimalFieldUpdateOperationsInput | $Enums.CategoriaAnimal
    peso?: NullableFloatFieldUpdateOperationsInput | number | null
    fechaNacimiento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    observaciones?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    preneces?: PrenezUncheckedUpdateManyWithoutAnimalNestedInput
    pesos?: RegistroPesoUncheckedUpdateManyWithoutAnimalNestedInput
  }

  export type AnimalCreateManyInput = {
    id?: number
    usuarioId: number
    nombre: string
    especie: $Enums.Especie
    sexo: $Enums.Sexo
    categoria: $Enums.CategoriaAnimal
    peso?: number | null
    fechaNacimiento?: Date | string | null
    observaciones?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AnimalUpdateManyMutationInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    especie?: EnumEspecieFieldUpdateOperationsInput | $Enums.Especie
    sexo?: EnumSexoFieldUpdateOperationsInput | $Enums.Sexo
    categoria?: EnumCategoriaAnimalFieldUpdateOperationsInput | $Enums.CategoriaAnimal
    peso?: NullableFloatFieldUpdateOperationsInput | number | null
    fechaNacimiento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    observaciones?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AnimalUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    usuarioId?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    especie?: EnumEspecieFieldUpdateOperationsInput | $Enums.Especie
    sexo?: EnumSexoFieldUpdateOperationsInput | $Enums.Sexo
    categoria?: EnumCategoriaAnimalFieldUpdateOperationsInput | $Enums.CategoriaAnimal
    peso?: NullableFloatFieldUpdateOperationsInput | number | null
    fechaNacimiento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    observaciones?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PrenezCreateInput = {
    fechaInicio: Date | string
    fechaEstimadaParto: Date | string
    estado?: $Enums.EstadoPrenez
    observaciones?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    animal: AnimalCreateNestedOneWithoutPrenecesInput
  }

  export type PrenezUncheckedCreateInput = {
    id?: number
    animalId: number
    fechaInicio: Date | string
    fechaEstimadaParto: Date | string
    estado?: $Enums.EstadoPrenez
    observaciones?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PrenezUpdateInput = {
    fechaInicio?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaEstimadaParto?: DateTimeFieldUpdateOperationsInput | Date | string
    estado?: EnumEstadoPrenezFieldUpdateOperationsInput | $Enums.EstadoPrenez
    observaciones?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    animal?: AnimalUpdateOneRequiredWithoutPrenecesNestedInput
  }

  export type PrenezUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    animalId?: IntFieldUpdateOperationsInput | number
    fechaInicio?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaEstimadaParto?: DateTimeFieldUpdateOperationsInput | Date | string
    estado?: EnumEstadoPrenezFieldUpdateOperationsInput | $Enums.EstadoPrenez
    observaciones?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PrenezCreateManyInput = {
    id?: number
    animalId: number
    fechaInicio: Date | string
    fechaEstimadaParto: Date | string
    estado?: $Enums.EstadoPrenez
    observaciones?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PrenezUpdateManyMutationInput = {
    fechaInicio?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaEstimadaParto?: DateTimeFieldUpdateOperationsInput | Date | string
    estado?: EnumEstadoPrenezFieldUpdateOperationsInput | $Enums.EstadoPrenez
    observaciones?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PrenezUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    animalId?: IntFieldUpdateOperationsInput | number
    fechaInicio?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaEstimadaParto?: DateTimeFieldUpdateOperationsInput | Date | string
    estado?: EnumEstadoPrenezFieldUpdateOperationsInput | $Enums.EstadoPrenez
    observaciones?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TareaRuralCreateInput = {
    titulo: string
    descripcion?: string | null
    tipo: $Enums.TipoTarea
    estado?: $Enums.EstadoTarea
    prioridad?: $Enums.Prioridad
    fechaProgramada: Date | string
    fechaCompletada?: Date | string | null
    observaciones?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    usuario: UsuarioCreateNestedOneWithoutTareasInput
    campo?: CampoCreateNestedOneWithoutTareasInput
  }

  export type TareaRuralUncheckedCreateInput = {
    id?: number
    usuarioId: number
    titulo: string
    descripcion?: string | null
    tipo: $Enums.TipoTarea
    estado?: $Enums.EstadoTarea
    prioridad?: $Enums.Prioridad
    fechaProgramada: Date | string
    fechaCompletada?: Date | string | null
    campoId?: number | null
    observaciones?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TareaRuralUpdateInput = {
    titulo?: StringFieldUpdateOperationsInput | string
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    tipo?: EnumTipoTareaFieldUpdateOperationsInput | $Enums.TipoTarea
    estado?: EnumEstadoTareaFieldUpdateOperationsInput | $Enums.EstadoTarea
    prioridad?: EnumPrioridadFieldUpdateOperationsInput | $Enums.Prioridad
    fechaProgramada?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaCompletada?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    observaciones?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usuario?: UsuarioUpdateOneRequiredWithoutTareasNestedInput
    campo?: CampoUpdateOneWithoutTareasNestedInput
  }

  export type TareaRuralUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    usuarioId?: IntFieldUpdateOperationsInput | number
    titulo?: StringFieldUpdateOperationsInput | string
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    tipo?: EnumTipoTareaFieldUpdateOperationsInput | $Enums.TipoTarea
    estado?: EnumEstadoTareaFieldUpdateOperationsInput | $Enums.EstadoTarea
    prioridad?: EnumPrioridadFieldUpdateOperationsInput | $Enums.Prioridad
    fechaProgramada?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaCompletada?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    campoId?: NullableIntFieldUpdateOperationsInput | number | null
    observaciones?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TareaRuralCreateManyInput = {
    id?: number
    usuarioId: number
    titulo: string
    descripcion?: string | null
    tipo: $Enums.TipoTarea
    estado?: $Enums.EstadoTarea
    prioridad?: $Enums.Prioridad
    fechaProgramada: Date | string
    fechaCompletada?: Date | string | null
    campoId?: number | null
    observaciones?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TareaRuralUpdateManyMutationInput = {
    titulo?: StringFieldUpdateOperationsInput | string
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    tipo?: EnumTipoTareaFieldUpdateOperationsInput | $Enums.TipoTarea
    estado?: EnumEstadoTareaFieldUpdateOperationsInput | $Enums.EstadoTarea
    prioridad?: EnumPrioridadFieldUpdateOperationsInput | $Enums.Prioridad
    fechaProgramada?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaCompletada?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    observaciones?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TareaRuralUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    usuarioId?: IntFieldUpdateOperationsInput | number
    titulo?: StringFieldUpdateOperationsInput | string
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    tipo?: EnumTipoTareaFieldUpdateOperationsInput | $Enums.TipoTarea
    estado?: EnumEstadoTareaFieldUpdateOperationsInput | $Enums.EstadoTarea
    prioridad?: EnumPrioridadFieldUpdateOperationsInput | $Enums.Prioridad
    fechaProgramada?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaCompletada?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    campoId?: NullableIntFieldUpdateOperationsInput | number | null
    observaciones?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MovimientoFinancieroCreateInput = {
    tipo: $Enums.TipoMovimiento
    concepto: string
    monto: number
    fecha: Date | string
    categoria: $Enums.CategoriaMovimiento
    observaciones?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    usuario: UsuarioCreateNestedOneWithoutMovimientosInput
    campo?: CampoCreateNestedOneWithoutMovimentosInput
    siembra?: SiembraCreateNestedOneWithoutMovimentosInput
  }

  export type MovimientoFinancieroUncheckedCreateInput = {
    id?: number
    usuarioId: number
    tipo: $Enums.TipoMovimiento
    concepto: string
    monto: number
    fecha: Date | string
    categoria: $Enums.CategoriaMovimiento
    campoId?: number | null
    siembraId?: number | null
    observaciones?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MovimientoFinancieroUpdateInput = {
    tipo?: EnumTipoMovimientoFieldUpdateOperationsInput | $Enums.TipoMovimiento
    concepto?: StringFieldUpdateOperationsInput | string
    monto?: FloatFieldUpdateOperationsInput | number
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    categoria?: EnumCategoriaMovimientoFieldUpdateOperationsInput | $Enums.CategoriaMovimiento
    observaciones?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usuario?: UsuarioUpdateOneRequiredWithoutMovimientosNestedInput
    campo?: CampoUpdateOneWithoutMovimentosNestedInput
    siembra?: SiembraUpdateOneWithoutMovimentosNestedInput
  }

  export type MovimientoFinancieroUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    usuarioId?: IntFieldUpdateOperationsInput | number
    tipo?: EnumTipoMovimientoFieldUpdateOperationsInput | $Enums.TipoMovimiento
    concepto?: StringFieldUpdateOperationsInput | string
    monto?: FloatFieldUpdateOperationsInput | number
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    categoria?: EnumCategoriaMovimientoFieldUpdateOperationsInput | $Enums.CategoriaMovimiento
    campoId?: NullableIntFieldUpdateOperationsInput | number | null
    siembraId?: NullableIntFieldUpdateOperationsInput | number | null
    observaciones?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MovimientoFinancieroCreateManyInput = {
    id?: number
    usuarioId: number
    tipo: $Enums.TipoMovimiento
    concepto: string
    monto: number
    fecha: Date | string
    categoria: $Enums.CategoriaMovimiento
    campoId?: number | null
    siembraId?: number | null
    observaciones?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MovimientoFinancieroUpdateManyMutationInput = {
    tipo?: EnumTipoMovimientoFieldUpdateOperationsInput | $Enums.TipoMovimiento
    concepto?: StringFieldUpdateOperationsInput | string
    monto?: FloatFieldUpdateOperationsInput | number
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    categoria?: EnumCategoriaMovimientoFieldUpdateOperationsInput | $Enums.CategoriaMovimiento
    observaciones?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MovimientoFinancieroUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    usuarioId?: IntFieldUpdateOperationsInput | number
    tipo?: EnumTipoMovimientoFieldUpdateOperationsInput | $Enums.TipoMovimiento
    concepto?: StringFieldUpdateOperationsInput | string
    monto?: FloatFieldUpdateOperationsInput | number
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    categoria?: EnumCategoriaMovimientoFieldUpdateOperationsInput | $Enums.CategoriaMovimiento
    campoId?: NullableIntFieldUpdateOperationsInput | number | null
    siembraId?: NullableIntFieldUpdateOperationsInput | number | null
    observaciones?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CampaniaCreateInput = {
    nombre: string
    fechaInicio: Date | string
    fechaFin?: Date | string | null
    descripcion?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    usuario: UsuarioCreateNestedOneWithoutCampaniasInput
    siembras?: SiembraCreateNestedManyWithoutCampaniaInput
  }

  export type CampaniaUncheckedCreateInput = {
    id?: number
    usuarioId: number
    nombre: string
    fechaInicio: Date | string
    fechaFin?: Date | string | null
    descripcion?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    siembras?: SiembraUncheckedCreateNestedManyWithoutCampaniaInput
  }

  export type CampaniaUpdateInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    fechaInicio?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaFin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usuario?: UsuarioUpdateOneRequiredWithoutCampaniasNestedInput
    siembras?: SiembraUpdateManyWithoutCampaniaNestedInput
  }

  export type CampaniaUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    usuarioId?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    fechaInicio?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaFin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    siembras?: SiembraUncheckedUpdateManyWithoutCampaniaNestedInput
  }

  export type CampaniaCreateManyInput = {
    id?: number
    usuarioId: number
    nombre: string
    fechaInicio: Date | string
    fechaFin?: Date | string | null
    descripcion?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CampaniaUpdateManyMutationInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    fechaInicio?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaFin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CampaniaUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    usuarioId?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    fechaInicio?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaFin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RegistroPesoCreateInput = {
    peso: number
    fecha: Date | string
    observaciones?: string | null
    createdAt?: Date | string
    animal: AnimalCreateNestedOneWithoutPesosInput
  }

  export type RegistroPesoUncheckedCreateInput = {
    id?: number
    animalId: number
    peso: number
    fecha: Date | string
    observaciones?: string | null
    createdAt?: Date | string
  }

  export type RegistroPesoUpdateInput = {
    peso?: FloatFieldUpdateOperationsInput | number
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    observaciones?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    animal?: AnimalUpdateOneRequiredWithoutPesosNestedInput
  }

  export type RegistroPesoUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    animalId?: IntFieldUpdateOperationsInput | number
    peso?: FloatFieldUpdateOperationsInput | number
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    observaciones?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RegistroPesoCreateManyInput = {
    id?: number
    animalId: number
    peso: number
    fecha: Date | string
    observaciones?: string | null
    createdAt?: Date | string
  }

  export type RegistroPesoUpdateManyMutationInput = {
    peso?: FloatFieldUpdateOperationsInput | number
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    observaciones?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RegistroPesoUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    animalId?: IntFieldUpdateOperationsInput | number
    peso?: FloatFieldUpdateOperationsInput | number
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    observaciones?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type EnumRolFilter<$PrismaModel = never> = {
    equals?: $Enums.Rol | EnumRolFieldRefInput<$PrismaModel>
    in?: $Enums.Rol[] | ListEnumRolFieldRefInput<$PrismaModel>
    notIn?: $Enums.Rol[] | ListEnumRolFieldRefInput<$PrismaModel>
    not?: NestedEnumRolFilter<$PrismaModel> | $Enums.Rol
  }

  export type EnumPlanTipoFilter<$PrismaModel = never> = {
    equals?: $Enums.PlanTipo | EnumPlanTipoFieldRefInput<$PrismaModel>
    in?: $Enums.PlanTipo[] | ListEnumPlanTipoFieldRefInput<$PrismaModel>
    notIn?: $Enums.PlanTipo[] | ListEnumPlanTipoFieldRefInput<$PrismaModel>
    not?: NestedEnumPlanTipoFilter<$PrismaModel> | $Enums.PlanTipo
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type CampoListRelationFilter = {
    every?: CampoWhereInput
    some?: CampoWhereInput
    none?: CampoWhereInput
  }

  export type AnimalListRelationFilter = {
    every?: AnimalWhereInput
    some?: AnimalWhereInput
    none?: AnimalWhereInput
  }

  export type TareaRuralListRelationFilter = {
    every?: TareaRuralWhereInput
    some?: TareaRuralWhereInput
    none?: TareaRuralWhereInput
  }

  export type MovimientoFinancieroListRelationFilter = {
    every?: MovimientoFinancieroWhereInput
    some?: MovimientoFinancieroWhereInput
    none?: MovimientoFinancieroWhereInput
  }

  export type CampaniaListRelationFilter = {
    every?: CampaniaWhereInput
    some?: CampaniaWhereInput
    none?: CampaniaWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type CampoOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AnimalOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TareaRuralOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MovimientoFinancieroOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CampaniaOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UsuarioCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    nombre?: SortOrder
    password?: SortOrder
    rol?: SortOrder
    plan?: SortOrder
    planExpira?: SortOrder
    mpSuscripcionId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    resetToken?: SortOrder
    resetTokenExpiry?: SortOrder
  }

  export type UsuarioAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UsuarioMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    nombre?: SortOrder
    password?: SortOrder
    rol?: SortOrder
    plan?: SortOrder
    planExpira?: SortOrder
    mpSuscripcionId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    resetToken?: SortOrder
    resetTokenExpiry?: SortOrder
  }

  export type UsuarioMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    nombre?: SortOrder
    password?: SortOrder
    rol?: SortOrder
    plan?: SortOrder
    planExpira?: SortOrder
    mpSuscripcionId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    resetToken?: SortOrder
    resetTokenExpiry?: SortOrder
  }

  export type UsuarioSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type EnumRolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Rol | EnumRolFieldRefInput<$PrismaModel>
    in?: $Enums.Rol[] | ListEnumRolFieldRefInput<$PrismaModel>
    notIn?: $Enums.Rol[] | ListEnumRolFieldRefInput<$PrismaModel>
    not?: NestedEnumRolWithAggregatesFilter<$PrismaModel> | $Enums.Rol
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRolFilter<$PrismaModel>
    _max?: NestedEnumRolFilter<$PrismaModel>
  }

  export type EnumPlanTipoWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PlanTipo | EnumPlanTipoFieldRefInput<$PrismaModel>
    in?: $Enums.PlanTipo[] | ListEnumPlanTipoFieldRefInput<$PrismaModel>
    notIn?: $Enums.PlanTipo[] | ListEnumPlanTipoFieldRefInput<$PrismaModel>
    not?: NestedEnumPlanTipoWithAggregatesFilter<$PrismaModel> | $Enums.PlanTipo
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPlanTipoFilter<$PrismaModel>
    _max?: NestedEnumPlanTipoFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type UsuarioRelationFilter = {
    is?: UsuarioWhereInput
    isNot?: UsuarioWhereInput
  }

  export type LoteListRelationFilter = {
    every?: LoteWhereInput
    some?: LoteWhereInput
    none?: LoteWhereInput
  }

  export type LoteOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CampoCountOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    hectareas?: SortOrder
    ubicacion?: SortOrder
    propietario?: SortOrder
    usuarioId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CampoAvgOrderByAggregateInput = {
    id?: SortOrder
    hectareas?: SortOrder
    usuarioId?: SortOrder
  }

  export type CampoMaxOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    hectareas?: SortOrder
    ubicacion?: SortOrder
    propietario?: SortOrder
    usuarioId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CampoMinOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    hectareas?: SortOrder
    ubicacion?: SortOrder
    propietario?: SortOrder
    usuarioId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CampoSumOrderByAggregateInput = {
    id?: SortOrder
    hectareas?: SortOrder
    usuarioId?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type CampoRelationFilter = {
    is?: CampoWhereInput
    isNot?: CampoWhereInput
  }

  export type SiembraListRelationFilter = {
    every?: SiembraWhereInput
    some?: SiembraWhereInput
    none?: SiembraWhereInput
  }

  export type SiembraOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type LoteCountOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    hectareas?: SortOrder
    campoId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LoteAvgOrderByAggregateInput = {
    id?: SortOrder
    hectareas?: SortOrder
    campoId?: SortOrder
  }

  export type LoteMaxOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    hectareas?: SortOrder
    campoId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LoteMinOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    hectareas?: SortOrder
    campoId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LoteSumOrderByAggregateInput = {
    id?: SortOrder
    hectareas?: SortOrder
    campoId?: SortOrder
  }

  export type TipoCultivoCountOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    descripcion?: SortOrder
    createdAt?: SortOrder
  }

  export type TipoCultivoAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type TipoCultivoMaxOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    descripcion?: SortOrder
    createdAt?: SortOrder
  }

  export type TipoCultivoMinOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    descripcion?: SortOrder
    createdAt?: SortOrder
  }

  export type TipoCultivoSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type EnumEstadoSiembraFilter<$PrismaModel = never> = {
    equals?: $Enums.EstadoSiembra | EnumEstadoSiembraFieldRefInput<$PrismaModel>
    in?: $Enums.EstadoSiembra[] | ListEnumEstadoSiembraFieldRefInput<$PrismaModel>
    notIn?: $Enums.EstadoSiembra[] | ListEnumEstadoSiembraFieldRefInput<$PrismaModel>
    not?: NestedEnumEstadoSiembraFilter<$PrismaModel> | $Enums.EstadoSiembra
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type LoteRelationFilter = {
    is?: LoteWhereInput
    isNot?: LoteWhereInput
  }

  export type TipoCultivoRelationFilter = {
    is?: TipoCultivoWhereInput
    isNot?: TipoCultivoWhereInput
  }

  export type CosechaListRelationFilter = {
    every?: CosechaWhereInput
    some?: CosechaWhereInput
    none?: CosechaWhereInput
  }

  export type AplicacionInsumoListRelationFilter = {
    every?: AplicacionInsumoWhereInput
    some?: AplicacionInsumoWhereInput
    none?: AplicacionInsumoWhereInput
  }

  export type CampaniaNullableRelationFilter = {
    is?: CampaniaWhereInput | null
    isNot?: CampaniaWhereInput | null
  }

  export type CosechaOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AplicacionInsumoOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SiembraCountOrderByAggregateInput = {
    id?: SortOrder
    loteId?: SortOrder
    tipoCultivoId?: SortOrder
    fechaSiembra?: SortOrder
    densidad?: SortOrder
    observaciones?: SortOrder
    estado?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    campaniaId?: SortOrder
  }

  export type SiembraAvgOrderByAggregateInput = {
    id?: SortOrder
    loteId?: SortOrder
    tipoCultivoId?: SortOrder
    densidad?: SortOrder
    campaniaId?: SortOrder
  }

  export type SiembraMaxOrderByAggregateInput = {
    id?: SortOrder
    loteId?: SortOrder
    tipoCultivoId?: SortOrder
    fechaSiembra?: SortOrder
    densidad?: SortOrder
    observaciones?: SortOrder
    estado?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    campaniaId?: SortOrder
  }

  export type SiembraMinOrderByAggregateInput = {
    id?: SortOrder
    loteId?: SortOrder
    tipoCultivoId?: SortOrder
    fechaSiembra?: SortOrder
    densidad?: SortOrder
    observaciones?: SortOrder
    estado?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    campaniaId?: SortOrder
  }

  export type SiembraSumOrderByAggregateInput = {
    id?: SortOrder
    loteId?: SortOrder
    tipoCultivoId?: SortOrder
    densidad?: SortOrder
    campaniaId?: SortOrder
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type EnumEstadoSiembraWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EstadoSiembra | EnumEstadoSiembraFieldRefInput<$PrismaModel>
    in?: $Enums.EstadoSiembra[] | ListEnumEstadoSiembraFieldRefInput<$PrismaModel>
    notIn?: $Enums.EstadoSiembra[] | ListEnumEstadoSiembraFieldRefInput<$PrismaModel>
    not?: NestedEnumEstadoSiembraWithAggregatesFilter<$PrismaModel> | $Enums.EstadoSiembra
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEstadoSiembraFilter<$PrismaModel>
    _max?: NestedEnumEstadoSiembraFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type SiembraRelationFilter = {
    is?: SiembraWhereInput
    isNot?: SiembraWhereInput
  }

  export type CosechaCountOrderByAggregateInput = {
    id?: SortOrder
    siembraId?: SortOrder
    fechaCosecha?: SortOrder
    rendimientoKgHa?: SortOrder
    totalKg?: SortOrder
    humedad?: SortOrder
    observaciones?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CosechaAvgOrderByAggregateInput = {
    id?: SortOrder
    siembraId?: SortOrder
    rendimientoKgHa?: SortOrder
    totalKg?: SortOrder
    humedad?: SortOrder
  }

  export type CosechaMaxOrderByAggregateInput = {
    id?: SortOrder
    siembraId?: SortOrder
    fechaCosecha?: SortOrder
    rendimientoKgHa?: SortOrder
    totalKg?: SortOrder
    humedad?: SortOrder
    observaciones?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CosechaMinOrderByAggregateInput = {
    id?: SortOrder
    siembraId?: SortOrder
    fechaCosecha?: SortOrder
    rendimientoKgHa?: SortOrder
    totalKg?: SortOrder
    humedad?: SortOrder
    observaciones?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CosechaSumOrderByAggregateInput = {
    id?: SortOrder
    siembraId?: SortOrder
    rendimientoKgHa?: SortOrder
    totalKg?: SortOrder
    humedad?: SortOrder
  }

  export type EnumTipoInsumoFilter<$PrismaModel = never> = {
    equals?: $Enums.TipoInsumo | EnumTipoInsumoFieldRefInput<$PrismaModel>
    in?: $Enums.TipoInsumo[] | ListEnumTipoInsumoFieldRefInput<$PrismaModel>
    notIn?: $Enums.TipoInsumo[] | ListEnumTipoInsumoFieldRefInput<$PrismaModel>
    not?: NestedEnumTipoInsumoFilter<$PrismaModel> | $Enums.TipoInsumo
  }

  export type InsumoCountOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    tipo?: SortOrder
    unidad?: SortOrder
    descripcion?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type InsumoAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type InsumoMaxOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    tipo?: SortOrder
    unidad?: SortOrder
    descripcion?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type InsumoMinOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    tipo?: SortOrder
    unidad?: SortOrder
    descripcion?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type InsumoSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type EnumTipoInsumoWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TipoInsumo | EnumTipoInsumoFieldRefInput<$PrismaModel>
    in?: $Enums.TipoInsumo[] | ListEnumTipoInsumoFieldRefInput<$PrismaModel>
    notIn?: $Enums.TipoInsumo[] | ListEnumTipoInsumoFieldRefInput<$PrismaModel>
    not?: NestedEnumTipoInsumoWithAggregatesFilter<$PrismaModel> | $Enums.TipoInsumo
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTipoInsumoFilter<$PrismaModel>
    _max?: NestedEnumTipoInsumoFilter<$PrismaModel>
  }

  export type InsumoRelationFilter = {
    is?: InsumoWhereInput
    isNot?: InsumoWhereInput
  }

  export type AplicacionInsumoCountOrderByAggregateInput = {
    id?: SortOrder
    siembraId?: SortOrder
    insumoId?: SortOrder
    fecha?: SortOrder
    cantidad?: SortOrder
    unidad?: SortOrder
    observaciones?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AplicacionInsumoAvgOrderByAggregateInput = {
    id?: SortOrder
    siembraId?: SortOrder
    insumoId?: SortOrder
    cantidad?: SortOrder
  }

  export type AplicacionInsumoMaxOrderByAggregateInput = {
    id?: SortOrder
    siembraId?: SortOrder
    insumoId?: SortOrder
    fecha?: SortOrder
    cantidad?: SortOrder
    unidad?: SortOrder
    observaciones?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AplicacionInsumoMinOrderByAggregateInput = {
    id?: SortOrder
    siembraId?: SortOrder
    insumoId?: SortOrder
    fecha?: SortOrder
    cantidad?: SortOrder
    unidad?: SortOrder
    observaciones?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AplicacionInsumoSumOrderByAggregateInput = {
    id?: SortOrder
    siembraId?: SortOrder
    insumoId?: SortOrder
    cantidad?: SortOrder
  }

  export type EnumEspecieFilter<$PrismaModel = never> = {
    equals?: $Enums.Especie | EnumEspecieFieldRefInput<$PrismaModel>
    in?: $Enums.Especie[] | ListEnumEspecieFieldRefInput<$PrismaModel>
    notIn?: $Enums.Especie[] | ListEnumEspecieFieldRefInput<$PrismaModel>
    not?: NestedEnumEspecieFilter<$PrismaModel> | $Enums.Especie
  }

  export type EnumSexoFilter<$PrismaModel = never> = {
    equals?: $Enums.Sexo | EnumSexoFieldRefInput<$PrismaModel>
    in?: $Enums.Sexo[] | ListEnumSexoFieldRefInput<$PrismaModel>
    notIn?: $Enums.Sexo[] | ListEnumSexoFieldRefInput<$PrismaModel>
    not?: NestedEnumSexoFilter<$PrismaModel> | $Enums.Sexo
  }

  export type EnumCategoriaAnimalFilter<$PrismaModel = never> = {
    equals?: $Enums.CategoriaAnimal | EnumCategoriaAnimalFieldRefInput<$PrismaModel>
    in?: $Enums.CategoriaAnimal[] | ListEnumCategoriaAnimalFieldRefInput<$PrismaModel>
    notIn?: $Enums.CategoriaAnimal[] | ListEnumCategoriaAnimalFieldRefInput<$PrismaModel>
    not?: NestedEnumCategoriaAnimalFilter<$PrismaModel> | $Enums.CategoriaAnimal
  }

  export type PrenezListRelationFilter = {
    every?: PrenezWhereInput
    some?: PrenezWhereInput
    none?: PrenezWhereInput
  }

  export type RegistroPesoListRelationFilter = {
    every?: RegistroPesoWhereInput
    some?: RegistroPesoWhereInput
    none?: RegistroPesoWhereInput
  }

  export type PrenezOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RegistroPesoOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AnimalCountOrderByAggregateInput = {
    id?: SortOrder
    usuarioId?: SortOrder
    nombre?: SortOrder
    especie?: SortOrder
    sexo?: SortOrder
    categoria?: SortOrder
    peso?: SortOrder
    fechaNacimiento?: SortOrder
    observaciones?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AnimalAvgOrderByAggregateInput = {
    id?: SortOrder
    usuarioId?: SortOrder
    peso?: SortOrder
  }

  export type AnimalMaxOrderByAggregateInput = {
    id?: SortOrder
    usuarioId?: SortOrder
    nombre?: SortOrder
    especie?: SortOrder
    sexo?: SortOrder
    categoria?: SortOrder
    peso?: SortOrder
    fechaNacimiento?: SortOrder
    observaciones?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AnimalMinOrderByAggregateInput = {
    id?: SortOrder
    usuarioId?: SortOrder
    nombre?: SortOrder
    especie?: SortOrder
    sexo?: SortOrder
    categoria?: SortOrder
    peso?: SortOrder
    fechaNacimiento?: SortOrder
    observaciones?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AnimalSumOrderByAggregateInput = {
    id?: SortOrder
    usuarioId?: SortOrder
    peso?: SortOrder
  }

  export type EnumEspecieWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Especie | EnumEspecieFieldRefInput<$PrismaModel>
    in?: $Enums.Especie[] | ListEnumEspecieFieldRefInput<$PrismaModel>
    notIn?: $Enums.Especie[] | ListEnumEspecieFieldRefInput<$PrismaModel>
    not?: NestedEnumEspecieWithAggregatesFilter<$PrismaModel> | $Enums.Especie
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEspecieFilter<$PrismaModel>
    _max?: NestedEnumEspecieFilter<$PrismaModel>
  }

  export type EnumSexoWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Sexo | EnumSexoFieldRefInput<$PrismaModel>
    in?: $Enums.Sexo[] | ListEnumSexoFieldRefInput<$PrismaModel>
    notIn?: $Enums.Sexo[] | ListEnumSexoFieldRefInput<$PrismaModel>
    not?: NestedEnumSexoWithAggregatesFilter<$PrismaModel> | $Enums.Sexo
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSexoFilter<$PrismaModel>
    _max?: NestedEnumSexoFilter<$PrismaModel>
  }

  export type EnumCategoriaAnimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CategoriaAnimal | EnumCategoriaAnimalFieldRefInput<$PrismaModel>
    in?: $Enums.CategoriaAnimal[] | ListEnumCategoriaAnimalFieldRefInput<$PrismaModel>
    notIn?: $Enums.CategoriaAnimal[] | ListEnumCategoriaAnimalFieldRefInput<$PrismaModel>
    not?: NestedEnumCategoriaAnimalWithAggregatesFilter<$PrismaModel> | $Enums.CategoriaAnimal
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCategoriaAnimalFilter<$PrismaModel>
    _max?: NestedEnumCategoriaAnimalFilter<$PrismaModel>
  }

  export type EnumEstadoPrenezFilter<$PrismaModel = never> = {
    equals?: $Enums.EstadoPrenez | EnumEstadoPrenezFieldRefInput<$PrismaModel>
    in?: $Enums.EstadoPrenez[] | ListEnumEstadoPrenezFieldRefInput<$PrismaModel>
    notIn?: $Enums.EstadoPrenez[] | ListEnumEstadoPrenezFieldRefInput<$PrismaModel>
    not?: NestedEnumEstadoPrenezFilter<$PrismaModel> | $Enums.EstadoPrenez
  }

  export type AnimalRelationFilter = {
    is?: AnimalWhereInput
    isNot?: AnimalWhereInput
  }

  export type PrenezCountOrderByAggregateInput = {
    id?: SortOrder
    animalId?: SortOrder
    fechaInicio?: SortOrder
    fechaEstimadaParto?: SortOrder
    estado?: SortOrder
    observaciones?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PrenezAvgOrderByAggregateInput = {
    id?: SortOrder
    animalId?: SortOrder
  }

  export type PrenezMaxOrderByAggregateInput = {
    id?: SortOrder
    animalId?: SortOrder
    fechaInicio?: SortOrder
    fechaEstimadaParto?: SortOrder
    estado?: SortOrder
    observaciones?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PrenezMinOrderByAggregateInput = {
    id?: SortOrder
    animalId?: SortOrder
    fechaInicio?: SortOrder
    fechaEstimadaParto?: SortOrder
    estado?: SortOrder
    observaciones?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PrenezSumOrderByAggregateInput = {
    id?: SortOrder
    animalId?: SortOrder
  }

  export type EnumEstadoPrenezWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EstadoPrenez | EnumEstadoPrenezFieldRefInput<$PrismaModel>
    in?: $Enums.EstadoPrenez[] | ListEnumEstadoPrenezFieldRefInput<$PrismaModel>
    notIn?: $Enums.EstadoPrenez[] | ListEnumEstadoPrenezFieldRefInput<$PrismaModel>
    not?: NestedEnumEstadoPrenezWithAggregatesFilter<$PrismaModel> | $Enums.EstadoPrenez
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEstadoPrenezFilter<$PrismaModel>
    _max?: NestedEnumEstadoPrenezFilter<$PrismaModel>
  }

  export type EnumTipoTareaFilter<$PrismaModel = never> = {
    equals?: $Enums.TipoTarea | EnumTipoTareaFieldRefInput<$PrismaModel>
    in?: $Enums.TipoTarea[] | ListEnumTipoTareaFieldRefInput<$PrismaModel>
    notIn?: $Enums.TipoTarea[] | ListEnumTipoTareaFieldRefInput<$PrismaModel>
    not?: NestedEnumTipoTareaFilter<$PrismaModel> | $Enums.TipoTarea
  }

  export type EnumEstadoTareaFilter<$PrismaModel = never> = {
    equals?: $Enums.EstadoTarea | EnumEstadoTareaFieldRefInput<$PrismaModel>
    in?: $Enums.EstadoTarea[] | ListEnumEstadoTareaFieldRefInput<$PrismaModel>
    notIn?: $Enums.EstadoTarea[] | ListEnumEstadoTareaFieldRefInput<$PrismaModel>
    not?: NestedEnumEstadoTareaFilter<$PrismaModel> | $Enums.EstadoTarea
  }

  export type EnumPrioridadFilter<$PrismaModel = never> = {
    equals?: $Enums.Prioridad | EnumPrioridadFieldRefInput<$PrismaModel>
    in?: $Enums.Prioridad[] | ListEnumPrioridadFieldRefInput<$PrismaModel>
    notIn?: $Enums.Prioridad[] | ListEnumPrioridadFieldRefInput<$PrismaModel>
    not?: NestedEnumPrioridadFilter<$PrismaModel> | $Enums.Prioridad
  }

  export type CampoNullableRelationFilter = {
    is?: CampoWhereInput | null
    isNot?: CampoWhereInput | null
  }

  export type TareaRuralCountOrderByAggregateInput = {
    id?: SortOrder
    usuarioId?: SortOrder
    titulo?: SortOrder
    descripcion?: SortOrder
    tipo?: SortOrder
    estado?: SortOrder
    prioridad?: SortOrder
    fechaProgramada?: SortOrder
    fechaCompletada?: SortOrder
    campoId?: SortOrder
    observaciones?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TareaRuralAvgOrderByAggregateInput = {
    id?: SortOrder
    usuarioId?: SortOrder
    campoId?: SortOrder
  }

  export type TareaRuralMaxOrderByAggregateInput = {
    id?: SortOrder
    usuarioId?: SortOrder
    titulo?: SortOrder
    descripcion?: SortOrder
    tipo?: SortOrder
    estado?: SortOrder
    prioridad?: SortOrder
    fechaProgramada?: SortOrder
    fechaCompletada?: SortOrder
    campoId?: SortOrder
    observaciones?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TareaRuralMinOrderByAggregateInput = {
    id?: SortOrder
    usuarioId?: SortOrder
    titulo?: SortOrder
    descripcion?: SortOrder
    tipo?: SortOrder
    estado?: SortOrder
    prioridad?: SortOrder
    fechaProgramada?: SortOrder
    fechaCompletada?: SortOrder
    campoId?: SortOrder
    observaciones?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TareaRuralSumOrderByAggregateInput = {
    id?: SortOrder
    usuarioId?: SortOrder
    campoId?: SortOrder
  }

  export type EnumTipoTareaWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TipoTarea | EnumTipoTareaFieldRefInput<$PrismaModel>
    in?: $Enums.TipoTarea[] | ListEnumTipoTareaFieldRefInput<$PrismaModel>
    notIn?: $Enums.TipoTarea[] | ListEnumTipoTareaFieldRefInput<$PrismaModel>
    not?: NestedEnumTipoTareaWithAggregatesFilter<$PrismaModel> | $Enums.TipoTarea
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTipoTareaFilter<$PrismaModel>
    _max?: NestedEnumTipoTareaFilter<$PrismaModel>
  }

  export type EnumEstadoTareaWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EstadoTarea | EnumEstadoTareaFieldRefInput<$PrismaModel>
    in?: $Enums.EstadoTarea[] | ListEnumEstadoTareaFieldRefInput<$PrismaModel>
    notIn?: $Enums.EstadoTarea[] | ListEnumEstadoTareaFieldRefInput<$PrismaModel>
    not?: NestedEnumEstadoTareaWithAggregatesFilter<$PrismaModel> | $Enums.EstadoTarea
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEstadoTareaFilter<$PrismaModel>
    _max?: NestedEnumEstadoTareaFilter<$PrismaModel>
  }

  export type EnumPrioridadWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Prioridad | EnumPrioridadFieldRefInput<$PrismaModel>
    in?: $Enums.Prioridad[] | ListEnumPrioridadFieldRefInput<$PrismaModel>
    notIn?: $Enums.Prioridad[] | ListEnumPrioridadFieldRefInput<$PrismaModel>
    not?: NestedEnumPrioridadWithAggregatesFilter<$PrismaModel> | $Enums.Prioridad
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPrioridadFilter<$PrismaModel>
    _max?: NestedEnumPrioridadFilter<$PrismaModel>
  }

  export type EnumTipoMovimientoFilter<$PrismaModel = never> = {
    equals?: $Enums.TipoMovimiento | EnumTipoMovimientoFieldRefInput<$PrismaModel>
    in?: $Enums.TipoMovimiento[] | ListEnumTipoMovimientoFieldRefInput<$PrismaModel>
    notIn?: $Enums.TipoMovimiento[] | ListEnumTipoMovimientoFieldRefInput<$PrismaModel>
    not?: NestedEnumTipoMovimientoFilter<$PrismaModel> | $Enums.TipoMovimiento
  }

  export type EnumCategoriaMovimientoFilter<$PrismaModel = never> = {
    equals?: $Enums.CategoriaMovimiento | EnumCategoriaMovimientoFieldRefInput<$PrismaModel>
    in?: $Enums.CategoriaMovimiento[] | ListEnumCategoriaMovimientoFieldRefInput<$PrismaModel>
    notIn?: $Enums.CategoriaMovimiento[] | ListEnumCategoriaMovimientoFieldRefInput<$PrismaModel>
    not?: NestedEnumCategoriaMovimientoFilter<$PrismaModel> | $Enums.CategoriaMovimiento
  }

  export type SiembraNullableRelationFilter = {
    is?: SiembraWhereInput | null
    isNot?: SiembraWhereInput | null
  }

  export type MovimientoFinancieroCountOrderByAggregateInput = {
    id?: SortOrder
    usuarioId?: SortOrder
    tipo?: SortOrder
    concepto?: SortOrder
    monto?: SortOrder
    fecha?: SortOrder
    categoria?: SortOrder
    campoId?: SortOrder
    siembraId?: SortOrder
    observaciones?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MovimientoFinancieroAvgOrderByAggregateInput = {
    id?: SortOrder
    usuarioId?: SortOrder
    monto?: SortOrder
    campoId?: SortOrder
    siembraId?: SortOrder
  }

  export type MovimientoFinancieroMaxOrderByAggregateInput = {
    id?: SortOrder
    usuarioId?: SortOrder
    tipo?: SortOrder
    concepto?: SortOrder
    monto?: SortOrder
    fecha?: SortOrder
    categoria?: SortOrder
    campoId?: SortOrder
    siembraId?: SortOrder
    observaciones?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MovimientoFinancieroMinOrderByAggregateInput = {
    id?: SortOrder
    usuarioId?: SortOrder
    tipo?: SortOrder
    concepto?: SortOrder
    monto?: SortOrder
    fecha?: SortOrder
    categoria?: SortOrder
    campoId?: SortOrder
    siembraId?: SortOrder
    observaciones?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MovimientoFinancieroSumOrderByAggregateInput = {
    id?: SortOrder
    usuarioId?: SortOrder
    monto?: SortOrder
    campoId?: SortOrder
    siembraId?: SortOrder
  }

  export type EnumTipoMovimientoWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TipoMovimiento | EnumTipoMovimientoFieldRefInput<$PrismaModel>
    in?: $Enums.TipoMovimiento[] | ListEnumTipoMovimientoFieldRefInput<$PrismaModel>
    notIn?: $Enums.TipoMovimiento[] | ListEnumTipoMovimientoFieldRefInput<$PrismaModel>
    not?: NestedEnumTipoMovimientoWithAggregatesFilter<$PrismaModel> | $Enums.TipoMovimiento
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTipoMovimientoFilter<$PrismaModel>
    _max?: NestedEnumTipoMovimientoFilter<$PrismaModel>
  }

  export type EnumCategoriaMovimientoWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CategoriaMovimiento | EnumCategoriaMovimientoFieldRefInput<$PrismaModel>
    in?: $Enums.CategoriaMovimiento[] | ListEnumCategoriaMovimientoFieldRefInput<$PrismaModel>
    notIn?: $Enums.CategoriaMovimiento[] | ListEnumCategoriaMovimientoFieldRefInput<$PrismaModel>
    not?: NestedEnumCategoriaMovimientoWithAggregatesFilter<$PrismaModel> | $Enums.CategoriaMovimiento
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCategoriaMovimientoFilter<$PrismaModel>
    _max?: NestedEnumCategoriaMovimientoFilter<$PrismaModel>
  }

  export type CampaniaCountOrderByAggregateInput = {
    id?: SortOrder
    usuarioId?: SortOrder
    nombre?: SortOrder
    fechaInicio?: SortOrder
    fechaFin?: SortOrder
    descripcion?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CampaniaAvgOrderByAggregateInput = {
    id?: SortOrder
    usuarioId?: SortOrder
  }

  export type CampaniaMaxOrderByAggregateInput = {
    id?: SortOrder
    usuarioId?: SortOrder
    nombre?: SortOrder
    fechaInicio?: SortOrder
    fechaFin?: SortOrder
    descripcion?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CampaniaMinOrderByAggregateInput = {
    id?: SortOrder
    usuarioId?: SortOrder
    nombre?: SortOrder
    fechaInicio?: SortOrder
    fechaFin?: SortOrder
    descripcion?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CampaniaSumOrderByAggregateInput = {
    id?: SortOrder
    usuarioId?: SortOrder
  }

  export type RegistroPesoCountOrderByAggregateInput = {
    id?: SortOrder
    animalId?: SortOrder
    peso?: SortOrder
    fecha?: SortOrder
    observaciones?: SortOrder
    createdAt?: SortOrder
  }

  export type RegistroPesoAvgOrderByAggregateInput = {
    id?: SortOrder
    animalId?: SortOrder
    peso?: SortOrder
  }

  export type RegistroPesoMaxOrderByAggregateInput = {
    id?: SortOrder
    animalId?: SortOrder
    peso?: SortOrder
    fecha?: SortOrder
    observaciones?: SortOrder
    createdAt?: SortOrder
  }

  export type RegistroPesoMinOrderByAggregateInput = {
    id?: SortOrder
    animalId?: SortOrder
    peso?: SortOrder
    fecha?: SortOrder
    observaciones?: SortOrder
    createdAt?: SortOrder
  }

  export type RegistroPesoSumOrderByAggregateInput = {
    id?: SortOrder
    animalId?: SortOrder
    peso?: SortOrder
  }

  export type CampoCreateNestedManyWithoutUsuarioInput = {
    create?: XOR<CampoCreateWithoutUsuarioInput, CampoUncheckedCreateWithoutUsuarioInput> | CampoCreateWithoutUsuarioInput[] | CampoUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: CampoCreateOrConnectWithoutUsuarioInput | CampoCreateOrConnectWithoutUsuarioInput[]
    createMany?: CampoCreateManyUsuarioInputEnvelope
    connect?: CampoWhereUniqueInput | CampoWhereUniqueInput[]
  }

  export type AnimalCreateNestedManyWithoutUsuarioInput = {
    create?: XOR<AnimalCreateWithoutUsuarioInput, AnimalUncheckedCreateWithoutUsuarioInput> | AnimalCreateWithoutUsuarioInput[] | AnimalUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: AnimalCreateOrConnectWithoutUsuarioInput | AnimalCreateOrConnectWithoutUsuarioInput[]
    createMany?: AnimalCreateManyUsuarioInputEnvelope
    connect?: AnimalWhereUniqueInput | AnimalWhereUniqueInput[]
  }

  export type TareaRuralCreateNestedManyWithoutUsuarioInput = {
    create?: XOR<TareaRuralCreateWithoutUsuarioInput, TareaRuralUncheckedCreateWithoutUsuarioInput> | TareaRuralCreateWithoutUsuarioInput[] | TareaRuralUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: TareaRuralCreateOrConnectWithoutUsuarioInput | TareaRuralCreateOrConnectWithoutUsuarioInput[]
    createMany?: TareaRuralCreateManyUsuarioInputEnvelope
    connect?: TareaRuralWhereUniqueInput | TareaRuralWhereUniqueInput[]
  }

  export type MovimientoFinancieroCreateNestedManyWithoutUsuarioInput = {
    create?: XOR<MovimientoFinancieroCreateWithoutUsuarioInput, MovimientoFinancieroUncheckedCreateWithoutUsuarioInput> | MovimientoFinancieroCreateWithoutUsuarioInput[] | MovimientoFinancieroUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: MovimientoFinancieroCreateOrConnectWithoutUsuarioInput | MovimientoFinancieroCreateOrConnectWithoutUsuarioInput[]
    createMany?: MovimientoFinancieroCreateManyUsuarioInputEnvelope
    connect?: MovimientoFinancieroWhereUniqueInput | MovimientoFinancieroWhereUniqueInput[]
  }

  export type CampaniaCreateNestedManyWithoutUsuarioInput = {
    create?: XOR<CampaniaCreateWithoutUsuarioInput, CampaniaUncheckedCreateWithoutUsuarioInput> | CampaniaCreateWithoutUsuarioInput[] | CampaniaUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: CampaniaCreateOrConnectWithoutUsuarioInput | CampaniaCreateOrConnectWithoutUsuarioInput[]
    createMany?: CampaniaCreateManyUsuarioInputEnvelope
    connect?: CampaniaWhereUniqueInput | CampaniaWhereUniqueInput[]
  }

  export type CampoUncheckedCreateNestedManyWithoutUsuarioInput = {
    create?: XOR<CampoCreateWithoutUsuarioInput, CampoUncheckedCreateWithoutUsuarioInput> | CampoCreateWithoutUsuarioInput[] | CampoUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: CampoCreateOrConnectWithoutUsuarioInput | CampoCreateOrConnectWithoutUsuarioInput[]
    createMany?: CampoCreateManyUsuarioInputEnvelope
    connect?: CampoWhereUniqueInput | CampoWhereUniqueInput[]
  }

  export type AnimalUncheckedCreateNestedManyWithoutUsuarioInput = {
    create?: XOR<AnimalCreateWithoutUsuarioInput, AnimalUncheckedCreateWithoutUsuarioInput> | AnimalCreateWithoutUsuarioInput[] | AnimalUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: AnimalCreateOrConnectWithoutUsuarioInput | AnimalCreateOrConnectWithoutUsuarioInput[]
    createMany?: AnimalCreateManyUsuarioInputEnvelope
    connect?: AnimalWhereUniqueInput | AnimalWhereUniqueInput[]
  }

  export type TareaRuralUncheckedCreateNestedManyWithoutUsuarioInput = {
    create?: XOR<TareaRuralCreateWithoutUsuarioInput, TareaRuralUncheckedCreateWithoutUsuarioInput> | TareaRuralCreateWithoutUsuarioInput[] | TareaRuralUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: TareaRuralCreateOrConnectWithoutUsuarioInput | TareaRuralCreateOrConnectWithoutUsuarioInput[]
    createMany?: TareaRuralCreateManyUsuarioInputEnvelope
    connect?: TareaRuralWhereUniqueInput | TareaRuralWhereUniqueInput[]
  }

  export type MovimientoFinancieroUncheckedCreateNestedManyWithoutUsuarioInput = {
    create?: XOR<MovimientoFinancieroCreateWithoutUsuarioInput, MovimientoFinancieroUncheckedCreateWithoutUsuarioInput> | MovimientoFinancieroCreateWithoutUsuarioInput[] | MovimientoFinancieroUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: MovimientoFinancieroCreateOrConnectWithoutUsuarioInput | MovimientoFinancieroCreateOrConnectWithoutUsuarioInput[]
    createMany?: MovimientoFinancieroCreateManyUsuarioInputEnvelope
    connect?: MovimientoFinancieroWhereUniqueInput | MovimientoFinancieroWhereUniqueInput[]
  }

  export type CampaniaUncheckedCreateNestedManyWithoutUsuarioInput = {
    create?: XOR<CampaniaCreateWithoutUsuarioInput, CampaniaUncheckedCreateWithoutUsuarioInput> | CampaniaCreateWithoutUsuarioInput[] | CampaniaUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: CampaniaCreateOrConnectWithoutUsuarioInput | CampaniaCreateOrConnectWithoutUsuarioInput[]
    createMany?: CampaniaCreateManyUsuarioInputEnvelope
    connect?: CampaniaWhereUniqueInput | CampaniaWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumRolFieldUpdateOperationsInput = {
    set?: $Enums.Rol
  }

  export type EnumPlanTipoFieldUpdateOperationsInput = {
    set?: $Enums.PlanTipo
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type CampoUpdateManyWithoutUsuarioNestedInput = {
    create?: XOR<CampoCreateWithoutUsuarioInput, CampoUncheckedCreateWithoutUsuarioInput> | CampoCreateWithoutUsuarioInput[] | CampoUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: CampoCreateOrConnectWithoutUsuarioInput | CampoCreateOrConnectWithoutUsuarioInput[]
    upsert?: CampoUpsertWithWhereUniqueWithoutUsuarioInput | CampoUpsertWithWhereUniqueWithoutUsuarioInput[]
    createMany?: CampoCreateManyUsuarioInputEnvelope
    set?: CampoWhereUniqueInput | CampoWhereUniqueInput[]
    disconnect?: CampoWhereUniqueInput | CampoWhereUniqueInput[]
    delete?: CampoWhereUniqueInput | CampoWhereUniqueInput[]
    connect?: CampoWhereUniqueInput | CampoWhereUniqueInput[]
    update?: CampoUpdateWithWhereUniqueWithoutUsuarioInput | CampoUpdateWithWhereUniqueWithoutUsuarioInput[]
    updateMany?: CampoUpdateManyWithWhereWithoutUsuarioInput | CampoUpdateManyWithWhereWithoutUsuarioInput[]
    deleteMany?: CampoScalarWhereInput | CampoScalarWhereInput[]
  }

  export type AnimalUpdateManyWithoutUsuarioNestedInput = {
    create?: XOR<AnimalCreateWithoutUsuarioInput, AnimalUncheckedCreateWithoutUsuarioInput> | AnimalCreateWithoutUsuarioInput[] | AnimalUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: AnimalCreateOrConnectWithoutUsuarioInput | AnimalCreateOrConnectWithoutUsuarioInput[]
    upsert?: AnimalUpsertWithWhereUniqueWithoutUsuarioInput | AnimalUpsertWithWhereUniqueWithoutUsuarioInput[]
    createMany?: AnimalCreateManyUsuarioInputEnvelope
    set?: AnimalWhereUniqueInput | AnimalWhereUniqueInput[]
    disconnect?: AnimalWhereUniqueInput | AnimalWhereUniqueInput[]
    delete?: AnimalWhereUniqueInput | AnimalWhereUniqueInput[]
    connect?: AnimalWhereUniqueInput | AnimalWhereUniqueInput[]
    update?: AnimalUpdateWithWhereUniqueWithoutUsuarioInput | AnimalUpdateWithWhereUniqueWithoutUsuarioInput[]
    updateMany?: AnimalUpdateManyWithWhereWithoutUsuarioInput | AnimalUpdateManyWithWhereWithoutUsuarioInput[]
    deleteMany?: AnimalScalarWhereInput | AnimalScalarWhereInput[]
  }

  export type TareaRuralUpdateManyWithoutUsuarioNestedInput = {
    create?: XOR<TareaRuralCreateWithoutUsuarioInput, TareaRuralUncheckedCreateWithoutUsuarioInput> | TareaRuralCreateWithoutUsuarioInput[] | TareaRuralUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: TareaRuralCreateOrConnectWithoutUsuarioInput | TareaRuralCreateOrConnectWithoutUsuarioInput[]
    upsert?: TareaRuralUpsertWithWhereUniqueWithoutUsuarioInput | TareaRuralUpsertWithWhereUniqueWithoutUsuarioInput[]
    createMany?: TareaRuralCreateManyUsuarioInputEnvelope
    set?: TareaRuralWhereUniqueInput | TareaRuralWhereUniqueInput[]
    disconnect?: TareaRuralWhereUniqueInput | TareaRuralWhereUniqueInput[]
    delete?: TareaRuralWhereUniqueInput | TareaRuralWhereUniqueInput[]
    connect?: TareaRuralWhereUniqueInput | TareaRuralWhereUniqueInput[]
    update?: TareaRuralUpdateWithWhereUniqueWithoutUsuarioInput | TareaRuralUpdateWithWhereUniqueWithoutUsuarioInput[]
    updateMany?: TareaRuralUpdateManyWithWhereWithoutUsuarioInput | TareaRuralUpdateManyWithWhereWithoutUsuarioInput[]
    deleteMany?: TareaRuralScalarWhereInput | TareaRuralScalarWhereInput[]
  }

  export type MovimientoFinancieroUpdateManyWithoutUsuarioNestedInput = {
    create?: XOR<MovimientoFinancieroCreateWithoutUsuarioInput, MovimientoFinancieroUncheckedCreateWithoutUsuarioInput> | MovimientoFinancieroCreateWithoutUsuarioInput[] | MovimientoFinancieroUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: MovimientoFinancieroCreateOrConnectWithoutUsuarioInput | MovimientoFinancieroCreateOrConnectWithoutUsuarioInput[]
    upsert?: MovimientoFinancieroUpsertWithWhereUniqueWithoutUsuarioInput | MovimientoFinancieroUpsertWithWhereUniqueWithoutUsuarioInput[]
    createMany?: MovimientoFinancieroCreateManyUsuarioInputEnvelope
    set?: MovimientoFinancieroWhereUniqueInput | MovimientoFinancieroWhereUniqueInput[]
    disconnect?: MovimientoFinancieroWhereUniqueInput | MovimientoFinancieroWhereUniqueInput[]
    delete?: MovimientoFinancieroWhereUniqueInput | MovimientoFinancieroWhereUniqueInput[]
    connect?: MovimientoFinancieroWhereUniqueInput | MovimientoFinancieroWhereUniqueInput[]
    update?: MovimientoFinancieroUpdateWithWhereUniqueWithoutUsuarioInput | MovimientoFinancieroUpdateWithWhereUniqueWithoutUsuarioInput[]
    updateMany?: MovimientoFinancieroUpdateManyWithWhereWithoutUsuarioInput | MovimientoFinancieroUpdateManyWithWhereWithoutUsuarioInput[]
    deleteMany?: MovimientoFinancieroScalarWhereInput | MovimientoFinancieroScalarWhereInput[]
  }

  export type CampaniaUpdateManyWithoutUsuarioNestedInput = {
    create?: XOR<CampaniaCreateWithoutUsuarioInput, CampaniaUncheckedCreateWithoutUsuarioInput> | CampaniaCreateWithoutUsuarioInput[] | CampaniaUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: CampaniaCreateOrConnectWithoutUsuarioInput | CampaniaCreateOrConnectWithoutUsuarioInput[]
    upsert?: CampaniaUpsertWithWhereUniqueWithoutUsuarioInput | CampaniaUpsertWithWhereUniqueWithoutUsuarioInput[]
    createMany?: CampaniaCreateManyUsuarioInputEnvelope
    set?: CampaniaWhereUniqueInput | CampaniaWhereUniqueInput[]
    disconnect?: CampaniaWhereUniqueInput | CampaniaWhereUniqueInput[]
    delete?: CampaniaWhereUniqueInput | CampaniaWhereUniqueInput[]
    connect?: CampaniaWhereUniqueInput | CampaniaWhereUniqueInput[]
    update?: CampaniaUpdateWithWhereUniqueWithoutUsuarioInput | CampaniaUpdateWithWhereUniqueWithoutUsuarioInput[]
    updateMany?: CampaniaUpdateManyWithWhereWithoutUsuarioInput | CampaniaUpdateManyWithWhereWithoutUsuarioInput[]
    deleteMany?: CampaniaScalarWhereInput | CampaniaScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type CampoUncheckedUpdateManyWithoutUsuarioNestedInput = {
    create?: XOR<CampoCreateWithoutUsuarioInput, CampoUncheckedCreateWithoutUsuarioInput> | CampoCreateWithoutUsuarioInput[] | CampoUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: CampoCreateOrConnectWithoutUsuarioInput | CampoCreateOrConnectWithoutUsuarioInput[]
    upsert?: CampoUpsertWithWhereUniqueWithoutUsuarioInput | CampoUpsertWithWhereUniqueWithoutUsuarioInput[]
    createMany?: CampoCreateManyUsuarioInputEnvelope
    set?: CampoWhereUniqueInput | CampoWhereUniqueInput[]
    disconnect?: CampoWhereUniqueInput | CampoWhereUniqueInput[]
    delete?: CampoWhereUniqueInput | CampoWhereUniqueInput[]
    connect?: CampoWhereUniqueInput | CampoWhereUniqueInput[]
    update?: CampoUpdateWithWhereUniqueWithoutUsuarioInput | CampoUpdateWithWhereUniqueWithoutUsuarioInput[]
    updateMany?: CampoUpdateManyWithWhereWithoutUsuarioInput | CampoUpdateManyWithWhereWithoutUsuarioInput[]
    deleteMany?: CampoScalarWhereInput | CampoScalarWhereInput[]
  }

  export type AnimalUncheckedUpdateManyWithoutUsuarioNestedInput = {
    create?: XOR<AnimalCreateWithoutUsuarioInput, AnimalUncheckedCreateWithoutUsuarioInput> | AnimalCreateWithoutUsuarioInput[] | AnimalUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: AnimalCreateOrConnectWithoutUsuarioInput | AnimalCreateOrConnectWithoutUsuarioInput[]
    upsert?: AnimalUpsertWithWhereUniqueWithoutUsuarioInput | AnimalUpsertWithWhereUniqueWithoutUsuarioInput[]
    createMany?: AnimalCreateManyUsuarioInputEnvelope
    set?: AnimalWhereUniqueInput | AnimalWhereUniqueInput[]
    disconnect?: AnimalWhereUniqueInput | AnimalWhereUniqueInput[]
    delete?: AnimalWhereUniqueInput | AnimalWhereUniqueInput[]
    connect?: AnimalWhereUniqueInput | AnimalWhereUniqueInput[]
    update?: AnimalUpdateWithWhereUniqueWithoutUsuarioInput | AnimalUpdateWithWhereUniqueWithoutUsuarioInput[]
    updateMany?: AnimalUpdateManyWithWhereWithoutUsuarioInput | AnimalUpdateManyWithWhereWithoutUsuarioInput[]
    deleteMany?: AnimalScalarWhereInput | AnimalScalarWhereInput[]
  }

  export type TareaRuralUncheckedUpdateManyWithoutUsuarioNestedInput = {
    create?: XOR<TareaRuralCreateWithoutUsuarioInput, TareaRuralUncheckedCreateWithoutUsuarioInput> | TareaRuralCreateWithoutUsuarioInput[] | TareaRuralUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: TareaRuralCreateOrConnectWithoutUsuarioInput | TareaRuralCreateOrConnectWithoutUsuarioInput[]
    upsert?: TareaRuralUpsertWithWhereUniqueWithoutUsuarioInput | TareaRuralUpsertWithWhereUniqueWithoutUsuarioInput[]
    createMany?: TareaRuralCreateManyUsuarioInputEnvelope
    set?: TareaRuralWhereUniqueInput | TareaRuralWhereUniqueInput[]
    disconnect?: TareaRuralWhereUniqueInput | TareaRuralWhereUniqueInput[]
    delete?: TareaRuralWhereUniqueInput | TareaRuralWhereUniqueInput[]
    connect?: TareaRuralWhereUniqueInput | TareaRuralWhereUniqueInput[]
    update?: TareaRuralUpdateWithWhereUniqueWithoutUsuarioInput | TareaRuralUpdateWithWhereUniqueWithoutUsuarioInput[]
    updateMany?: TareaRuralUpdateManyWithWhereWithoutUsuarioInput | TareaRuralUpdateManyWithWhereWithoutUsuarioInput[]
    deleteMany?: TareaRuralScalarWhereInput | TareaRuralScalarWhereInput[]
  }

  export type MovimientoFinancieroUncheckedUpdateManyWithoutUsuarioNestedInput = {
    create?: XOR<MovimientoFinancieroCreateWithoutUsuarioInput, MovimientoFinancieroUncheckedCreateWithoutUsuarioInput> | MovimientoFinancieroCreateWithoutUsuarioInput[] | MovimientoFinancieroUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: MovimientoFinancieroCreateOrConnectWithoutUsuarioInput | MovimientoFinancieroCreateOrConnectWithoutUsuarioInput[]
    upsert?: MovimientoFinancieroUpsertWithWhereUniqueWithoutUsuarioInput | MovimientoFinancieroUpsertWithWhereUniqueWithoutUsuarioInput[]
    createMany?: MovimientoFinancieroCreateManyUsuarioInputEnvelope
    set?: MovimientoFinancieroWhereUniqueInput | MovimientoFinancieroWhereUniqueInput[]
    disconnect?: MovimientoFinancieroWhereUniqueInput | MovimientoFinancieroWhereUniqueInput[]
    delete?: MovimientoFinancieroWhereUniqueInput | MovimientoFinancieroWhereUniqueInput[]
    connect?: MovimientoFinancieroWhereUniqueInput | MovimientoFinancieroWhereUniqueInput[]
    update?: MovimientoFinancieroUpdateWithWhereUniqueWithoutUsuarioInput | MovimientoFinancieroUpdateWithWhereUniqueWithoutUsuarioInput[]
    updateMany?: MovimientoFinancieroUpdateManyWithWhereWithoutUsuarioInput | MovimientoFinancieroUpdateManyWithWhereWithoutUsuarioInput[]
    deleteMany?: MovimientoFinancieroScalarWhereInput | MovimientoFinancieroScalarWhereInput[]
  }

  export type CampaniaUncheckedUpdateManyWithoutUsuarioNestedInput = {
    create?: XOR<CampaniaCreateWithoutUsuarioInput, CampaniaUncheckedCreateWithoutUsuarioInput> | CampaniaCreateWithoutUsuarioInput[] | CampaniaUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: CampaniaCreateOrConnectWithoutUsuarioInput | CampaniaCreateOrConnectWithoutUsuarioInput[]
    upsert?: CampaniaUpsertWithWhereUniqueWithoutUsuarioInput | CampaniaUpsertWithWhereUniqueWithoutUsuarioInput[]
    createMany?: CampaniaCreateManyUsuarioInputEnvelope
    set?: CampaniaWhereUniqueInput | CampaniaWhereUniqueInput[]
    disconnect?: CampaniaWhereUniqueInput | CampaniaWhereUniqueInput[]
    delete?: CampaniaWhereUniqueInput | CampaniaWhereUniqueInput[]
    connect?: CampaniaWhereUniqueInput | CampaniaWhereUniqueInput[]
    update?: CampaniaUpdateWithWhereUniqueWithoutUsuarioInput | CampaniaUpdateWithWhereUniqueWithoutUsuarioInput[]
    updateMany?: CampaniaUpdateManyWithWhereWithoutUsuarioInput | CampaniaUpdateManyWithWhereWithoutUsuarioInput[]
    deleteMany?: CampaniaScalarWhereInput | CampaniaScalarWhereInput[]
  }

  export type UsuarioCreateNestedOneWithoutCamposInput = {
    create?: XOR<UsuarioCreateWithoutCamposInput, UsuarioUncheckedCreateWithoutCamposInput>
    connectOrCreate?: UsuarioCreateOrConnectWithoutCamposInput
    connect?: UsuarioWhereUniqueInput
  }

  export type LoteCreateNestedManyWithoutCampoInput = {
    create?: XOR<LoteCreateWithoutCampoInput, LoteUncheckedCreateWithoutCampoInput> | LoteCreateWithoutCampoInput[] | LoteUncheckedCreateWithoutCampoInput[]
    connectOrCreate?: LoteCreateOrConnectWithoutCampoInput | LoteCreateOrConnectWithoutCampoInput[]
    createMany?: LoteCreateManyCampoInputEnvelope
    connect?: LoteWhereUniqueInput | LoteWhereUniqueInput[]
  }

  export type TareaRuralCreateNestedManyWithoutCampoInput = {
    create?: XOR<TareaRuralCreateWithoutCampoInput, TareaRuralUncheckedCreateWithoutCampoInput> | TareaRuralCreateWithoutCampoInput[] | TareaRuralUncheckedCreateWithoutCampoInput[]
    connectOrCreate?: TareaRuralCreateOrConnectWithoutCampoInput | TareaRuralCreateOrConnectWithoutCampoInput[]
    createMany?: TareaRuralCreateManyCampoInputEnvelope
    connect?: TareaRuralWhereUniqueInput | TareaRuralWhereUniqueInput[]
  }

  export type MovimientoFinancieroCreateNestedManyWithoutCampoInput = {
    create?: XOR<MovimientoFinancieroCreateWithoutCampoInput, MovimientoFinancieroUncheckedCreateWithoutCampoInput> | MovimientoFinancieroCreateWithoutCampoInput[] | MovimientoFinancieroUncheckedCreateWithoutCampoInput[]
    connectOrCreate?: MovimientoFinancieroCreateOrConnectWithoutCampoInput | MovimientoFinancieroCreateOrConnectWithoutCampoInput[]
    createMany?: MovimientoFinancieroCreateManyCampoInputEnvelope
    connect?: MovimientoFinancieroWhereUniqueInput | MovimientoFinancieroWhereUniqueInput[]
  }

  export type LoteUncheckedCreateNestedManyWithoutCampoInput = {
    create?: XOR<LoteCreateWithoutCampoInput, LoteUncheckedCreateWithoutCampoInput> | LoteCreateWithoutCampoInput[] | LoteUncheckedCreateWithoutCampoInput[]
    connectOrCreate?: LoteCreateOrConnectWithoutCampoInput | LoteCreateOrConnectWithoutCampoInput[]
    createMany?: LoteCreateManyCampoInputEnvelope
    connect?: LoteWhereUniqueInput | LoteWhereUniqueInput[]
  }

  export type TareaRuralUncheckedCreateNestedManyWithoutCampoInput = {
    create?: XOR<TareaRuralCreateWithoutCampoInput, TareaRuralUncheckedCreateWithoutCampoInput> | TareaRuralCreateWithoutCampoInput[] | TareaRuralUncheckedCreateWithoutCampoInput[]
    connectOrCreate?: TareaRuralCreateOrConnectWithoutCampoInput | TareaRuralCreateOrConnectWithoutCampoInput[]
    createMany?: TareaRuralCreateManyCampoInputEnvelope
    connect?: TareaRuralWhereUniqueInput | TareaRuralWhereUniqueInput[]
  }

  export type MovimientoFinancieroUncheckedCreateNestedManyWithoutCampoInput = {
    create?: XOR<MovimientoFinancieroCreateWithoutCampoInput, MovimientoFinancieroUncheckedCreateWithoutCampoInput> | MovimientoFinancieroCreateWithoutCampoInput[] | MovimientoFinancieroUncheckedCreateWithoutCampoInput[]
    connectOrCreate?: MovimientoFinancieroCreateOrConnectWithoutCampoInput | MovimientoFinancieroCreateOrConnectWithoutCampoInput[]
    createMany?: MovimientoFinancieroCreateManyCampoInputEnvelope
    connect?: MovimientoFinancieroWhereUniqueInput | MovimientoFinancieroWhereUniqueInput[]
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UsuarioUpdateOneRequiredWithoutCamposNestedInput = {
    create?: XOR<UsuarioCreateWithoutCamposInput, UsuarioUncheckedCreateWithoutCamposInput>
    connectOrCreate?: UsuarioCreateOrConnectWithoutCamposInput
    upsert?: UsuarioUpsertWithoutCamposInput
    connect?: UsuarioWhereUniqueInput
    update?: XOR<XOR<UsuarioUpdateToOneWithWhereWithoutCamposInput, UsuarioUpdateWithoutCamposInput>, UsuarioUncheckedUpdateWithoutCamposInput>
  }

  export type LoteUpdateManyWithoutCampoNestedInput = {
    create?: XOR<LoteCreateWithoutCampoInput, LoteUncheckedCreateWithoutCampoInput> | LoteCreateWithoutCampoInput[] | LoteUncheckedCreateWithoutCampoInput[]
    connectOrCreate?: LoteCreateOrConnectWithoutCampoInput | LoteCreateOrConnectWithoutCampoInput[]
    upsert?: LoteUpsertWithWhereUniqueWithoutCampoInput | LoteUpsertWithWhereUniqueWithoutCampoInput[]
    createMany?: LoteCreateManyCampoInputEnvelope
    set?: LoteWhereUniqueInput | LoteWhereUniqueInput[]
    disconnect?: LoteWhereUniqueInput | LoteWhereUniqueInput[]
    delete?: LoteWhereUniqueInput | LoteWhereUniqueInput[]
    connect?: LoteWhereUniqueInput | LoteWhereUniqueInput[]
    update?: LoteUpdateWithWhereUniqueWithoutCampoInput | LoteUpdateWithWhereUniqueWithoutCampoInput[]
    updateMany?: LoteUpdateManyWithWhereWithoutCampoInput | LoteUpdateManyWithWhereWithoutCampoInput[]
    deleteMany?: LoteScalarWhereInput | LoteScalarWhereInput[]
  }

  export type TareaRuralUpdateManyWithoutCampoNestedInput = {
    create?: XOR<TareaRuralCreateWithoutCampoInput, TareaRuralUncheckedCreateWithoutCampoInput> | TareaRuralCreateWithoutCampoInput[] | TareaRuralUncheckedCreateWithoutCampoInput[]
    connectOrCreate?: TareaRuralCreateOrConnectWithoutCampoInput | TareaRuralCreateOrConnectWithoutCampoInput[]
    upsert?: TareaRuralUpsertWithWhereUniqueWithoutCampoInput | TareaRuralUpsertWithWhereUniqueWithoutCampoInput[]
    createMany?: TareaRuralCreateManyCampoInputEnvelope
    set?: TareaRuralWhereUniqueInput | TareaRuralWhereUniqueInput[]
    disconnect?: TareaRuralWhereUniqueInput | TareaRuralWhereUniqueInput[]
    delete?: TareaRuralWhereUniqueInput | TareaRuralWhereUniqueInput[]
    connect?: TareaRuralWhereUniqueInput | TareaRuralWhereUniqueInput[]
    update?: TareaRuralUpdateWithWhereUniqueWithoutCampoInput | TareaRuralUpdateWithWhereUniqueWithoutCampoInput[]
    updateMany?: TareaRuralUpdateManyWithWhereWithoutCampoInput | TareaRuralUpdateManyWithWhereWithoutCampoInput[]
    deleteMany?: TareaRuralScalarWhereInput | TareaRuralScalarWhereInput[]
  }

  export type MovimientoFinancieroUpdateManyWithoutCampoNestedInput = {
    create?: XOR<MovimientoFinancieroCreateWithoutCampoInput, MovimientoFinancieroUncheckedCreateWithoutCampoInput> | MovimientoFinancieroCreateWithoutCampoInput[] | MovimientoFinancieroUncheckedCreateWithoutCampoInput[]
    connectOrCreate?: MovimientoFinancieroCreateOrConnectWithoutCampoInput | MovimientoFinancieroCreateOrConnectWithoutCampoInput[]
    upsert?: MovimientoFinancieroUpsertWithWhereUniqueWithoutCampoInput | MovimientoFinancieroUpsertWithWhereUniqueWithoutCampoInput[]
    createMany?: MovimientoFinancieroCreateManyCampoInputEnvelope
    set?: MovimientoFinancieroWhereUniqueInput | MovimientoFinancieroWhereUniqueInput[]
    disconnect?: MovimientoFinancieroWhereUniqueInput | MovimientoFinancieroWhereUniqueInput[]
    delete?: MovimientoFinancieroWhereUniqueInput | MovimientoFinancieroWhereUniqueInput[]
    connect?: MovimientoFinancieroWhereUniqueInput | MovimientoFinancieroWhereUniqueInput[]
    update?: MovimientoFinancieroUpdateWithWhereUniqueWithoutCampoInput | MovimientoFinancieroUpdateWithWhereUniqueWithoutCampoInput[]
    updateMany?: MovimientoFinancieroUpdateManyWithWhereWithoutCampoInput | MovimientoFinancieroUpdateManyWithWhereWithoutCampoInput[]
    deleteMany?: MovimientoFinancieroScalarWhereInput | MovimientoFinancieroScalarWhereInput[]
  }

  export type LoteUncheckedUpdateManyWithoutCampoNestedInput = {
    create?: XOR<LoteCreateWithoutCampoInput, LoteUncheckedCreateWithoutCampoInput> | LoteCreateWithoutCampoInput[] | LoteUncheckedCreateWithoutCampoInput[]
    connectOrCreate?: LoteCreateOrConnectWithoutCampoInput | LoteCreateOrConnectWithoutCampoInput[]
    upsert?: LoteUpsertWithWhereUniqueWithoutCampoInput | LoteUpsertWithWhereUniqueWithoutCampoInput[]
    createMany?: LoteCreateManyCampoInputEnvelope
    set?: LoteWhereUniqueInput | LoteWhereUniqueInput[]
    disconnect?: LoteWhereUniqueInput | LoteWhereUniqueInput[]
    delete?: LoteWhereUniqueInput | LoteWhereUniqueInput[]
    connect?: LoteWhereUniqueInput | LoteWhereUniqueInput[]
    update?: LoteUpdateWithWhereUniqueWithoutCampoInput | LoteUpdateWithWhereUniqueWithoutCampoInput[]
    updateMany?: LoteUpdateManyWithWhereWithoutCampoInput | LoteUpdateManyWithWhereWithoutCampoInput[]
    deleteMany?: LoteScalarWhereInput | LoteScalarWhereInput[]
  }

  export type TareaRuralUncheckedUpdateManyWithoutCampoNestedInput = {
    create?: XOR<TareaRuralCreateWithoutCampoInput, TareaRuralUncheckedCreateWithoutCampoInput> | TareaRuralCreateWithoutCampoInput[] | TareaRuralUncheckedCreateWithoutCampoInput[]
    connectOrCreate?: TareaRuralCreateOrConnectWithoutCampoInput | TareaRuralCreateOrConnectWithoutCampoInput[]
    upsert?: TareaRuralUpsertWithWhereUniqueWithoutCampoInput | TareaRuralUpsertWithWhereUniqueWithoutCampoInput[]
    createMany?: TareaRuralCreateManyCampoInputEnvelope
    set?: TareaRuralWhereUniqueInput | TareaRuralWhereUniqueInput[]
    disconnect?: TareaRuralWhereUniqueInput | TareaRuralWhereUniqueInput[]
    delete?: TareaRuralWhereUniqueInput | TareaRuralWhereUniqueInput[]
    connect?: TareaRuralWhereUniqueInput | TareaRuralWhereUniqueInput[]
    update?: TareaRuralUpdateWithWhereUniqueWithoutCampoInput | TareaRuralUpdateWithWhereUniqueWithoutCampoInput[]
    updateMany?: TareaRuralUpdateManyWithWhereWithoutCampoInput | TareaRuralUpdateManyWithWhereWithoutCampoInput[]
    deleteMany?: TareaRuralScalarWhereInput | TareaRuralScalarWhereInput[]
  }

  export type MovimientoFinancieroUncheckedUpdateManyWithoutCampoNestedInput = {
    create?: XOR<MovimientoFinancieroCreateWithoutCampoInput, MovimientoFinancieroUncheckedCreateWithoutCampoInput> | MovimientoFinancieroCreateWithoutCampoInput[] | MovimientoFinancieroUncheckedCreateWithoutCampoInput[]
    connectOrCreate?: MovimientoFinancieroCreateOrConnectWithoutCampoInput | MovimientoFinancieroCreateOrConnectWithoutCampoInput[]
    upsert?: MovimientoFinancieroUpsertWithWhereUniqueWithoutCampoInput | MovimientoFinancieroUpsertWithWhereUniqueWithoutCampoInput[]
    createMany?: MovimientoFinancieroCreateManyCampoInputEnvelope
    set?: MovimientoFinancieroWhereUniqueInput | MovimientoFinancieroWhereUniqueInput[]
    disconnect?: MovimientoFinancieroWhereUniqueInput | MovimientoFinancieroWhereUniqueInput[]
    delete?: MovimientoFinancieroWhereUniqueInput | MovimientoFinancieroWhereUniqueInput[]
    connect?: MovimientoFinancieroWhereUniqueInput | MovimientoFinancieroWhereUniqueInput[]
    update?: MovimientoFinancieroUpdateWithWhereUniqueWithoutCampoInput | MovimientoFinancieroUpdateWithWhereUniqueWithoutCampoInput[]
    updateMany?: MovimientoFinancieroUpdateManyWithWhereWithoutCampoInput | MovimientoFinancieroUpdateManyWithWhereWithoutCampoInput[]
    deleteMany?: MovimientoFinancieroScalarWhereInput | MovimientoFinancieroScalarWhereInput[]
  }

  export type CampoCreateNestedOneWithoutLotesInput = {
    create?: XOR<CampoCreateWithoutLotesInput, CampoUncheckedCreateWithoutLotesInput>
    connectOrCreate?: CampoCreateOrConnectWithoutLotesInput
    connect?: CampoWhereUniqueInput
  }

  export type SiembraCreateNestedManyWithoutLoteInput = {
    create?: XOR<SiembraCreateWithoutLoteInput, SiembraUncheckedCreateWithoutLoteInput> | SiembraCreateWithoutLoteInput[] | SiembraUncheckedCreateWithoutLoteInput[]
    connectOrCreate?: SiembraCreateOrConnectWithoutLoteInput | SiembraCreateOrConnectWithoutLoteInput[]
    createMany?: SiembraCreateManyLoteInputEnvelope
    connect?: SiembraWhereUniqueInput | SiembraWhereUniqueInput[]
  }

  export type SiembraUncheckedCreateNestedManyWithoutLoteInput = {
    create?: XOR<SiembraCreateWithoutLoteInput, SiembraUncheckedCreateWithoutLoteInput> | SiembraCreateWithoutLoteInput[] | SiembraUncheckedCreateWithoutLoteInput[]
    connectOrCreate?: SiembraCreateOrConnectWithoutLoteInput | SiembraCreateOrConnectWithoutLoteInput[]
    createMany?: SiembraCreateManyLoteInputEnvelope
    connect?: SiembraWhereUniqueInput | SiembraWhereUniqueInput[]
  }

  export type CampoUpdateOneRequiredWithoutLotesNestedInput = {
    create?: XOR<CampoCreateWithoutLotesInput, CampoUncheckedCreateWithoutLotesInput>
    connectOrCreate?: CampoCreateOrConnectWithoutLotesInput
    upsert?: CampoUpsertWithoutLotesInput
    connect?: CampoWhereUniqueInput
    update?: XOR<XOR<CampoUpdateToOneWithWhereWithoutLotesInput, CampoUpdateWithoutLotesInput>, CampoUncheckedUpdateWithoutLotesInput>
  }

  export type SiembraUpdateManyWithoutLoteNestedInput = {
    create?: XOR<SiembraCreateWithoutLoteInput, SiembraUncheckedCreateWithoutLoteInput> | SiembraCreateWithoutLoteInput[] | SiembraUncheckedCreateWithoutLoteInput[]
    connectOrCreate?: SiembraCreateOrConnectWithoutLoteInput | SiembraCreateOrConnectWithoutLoteInput[]
    upsert?: SiembraUpsertWithWhereUniqueWithoutLoteInput | SiembraUpsertWithWhereUniqueWithoutLoteInput[]
    createMany?: SiembraCreateManyLoteInputEnvelope
    set?: SiembraWhereUniqueInput | SiembraWhereUniqueInput[]
    disconnect?: SiembraWhereUniqueInput | SiembraWhereUniqueInput[]
    delete?: SiembraWhereUniqueInput | SiembraWhereUniqueInput[]
    connect?: SiembraWhereUniqueInput | SiembraWhereUniqueInput[]
    update?: SiembraUpdateWithWhereUniqueWithoutLoteInput | SiembraUpdateWithWhereUniqueWithoutLoteInput[]
    updateMany?: SiembraUpdateManyWithWhereWithoutLoteInput | SiembraUpdateManyWithWhereWithoutLoteInput[]
    deleteMany?: SiembraScalarWhereInput | SiembraScalarWhereInput[]
  }

  export type SiembraUncheckedUpdateManyWithoutLoteNestedInput = {
    create?: XOR<SiembraCreateWithoutLoteInput, SiembraUncheckedCreateWithoutLoteInput> | SiembraCreateWithoutLoteInput[] | SiembraUncheckedCreateWithoutLoteInput[]
    connectOrCreate?: SiembraCreateOrConnectWithoutLoteInput | SiembraCreateOrConnectWithoutLoteInput[]
    upsert?: SiembraUpsertWithWhereUniqueWithoutLoteInput | SiembraUpsertWithWhereUniqueWithoutLoteInput[]
    createMany?: SiembraCreateManyLoteInputEnvelope
    set?: SiembraWhereUniqueInput | SiembraWhereUniqueInput[]
    disconnect?: SiembraWhereUniqueInput | SiembraWhereUniqueInput[]
    delete?: SiembraWhereUniqueInput | SiembraWhereUniqueInput[]
    connect?: SiembraWhereUniqueInput | SiembraWhereUniqueInput[]
    update?: SiembraUpdateWithWhereUniqueWithoutLoteInput | SiembraUpdateWithWhereUniqueWithoutLoteInput[]
    updateMany?: SiembraUpdateManyWithWhereWithoutLoteInput | SiembraUpdateManyWithWhereWithoutLoteInput[]
    deleteMany?: SiembraScalarWhereInput | SiembraScalarWhereInput[]
  }

  export type SiembraCreateNestedManyWithoutTipoCultivoInput = {
    create?: XOR<SiembraCreateWithoutTipoCultivoInput, SiembraUncheckedCreateWithoutTipoCultivoInput> | SiembraCreateWithoutTipoCultivoInput[] | SiembraUncheckedCreateWithoutTipoCultivoInput[]
    connectOrCreate?: SiembraCreateOrConnectWithoutTipoCultivoInput | SiembraCreateOrConnectWithoutTipoCultivoInput[]
    createMany?: SiembraCreateManyTipoCultivoInputEnvelope
    connect?: SiembraWhereUniqueInput | SiembraWhereUniqueInput[]
  }

  export type SiembraUncheckedCreateNestedManyWithoutTipoCultivoInput = {
    create?: XOR<SiembraCreateWithoutTipoCultivoInput, SiembraUncheckedCreateWithoutTipoCultivoInput> | SiembraCreateWithoutTipoCultivoInput[] | SiembraUncheckedCreateWithoutTipoCultivoInput[]
    connectOrCreate?: SiembraCreateOrConnectWithoutTipoCultivoInput | SiembraCreateOrConnectWithoutTipoCultivoInput[]
    createMany?: SiembraCreateManyTipoCultivoInputEnvelope
    connect?: SiembraWhereUniqueInput | SiembraWhereUniqueInput[]
  }

  export type SiembraUpdateManyWithoutTipoCultivoNestedInput = {
    create?: XOR<SiembraCreateWithoutTipoCultivoInput, SiembraUncheckedCreateWithoutTipoCultivoInput> | SiembraCreateWithoutTipoCultivoInput[] | SiembraUncheckedCreateWithoutTipoCultivoInput[]
    connectOrCreate?: SiembraCreateOrConnectWithoutTipoCultivoInput | SiembraCreateOrConnectWithoutTipoCultivoInput[]
    upsert?: SiembraUpsertWithWhereUniqueWithoutTipoCultivoInput | SiembraUpsertWithWhereUniqueWithoutTipoCultivoInput[]
    createMany?: SiembraCreateManyTipoCultivoInputEnvelope
    set?: SiembraWhereUniqueInput | SiembraWhereUniqueInput[]
    disconnect?: SiembraWhereUniqueInput | SiembraWhereUniqueInput[]
    delete?: SiembraWhereUniqueInput | SiembraWhereUniqueInput[]
    connect?: SiembraWhereUniqueInput | SiembraWhereUniqueInput[]
    update?: SiembraUpdateWithWhereUniqueWithoutTipoCultivoInput | SiembraUpdateWithWhereUniqueWithoutTipoCultivoInput[]
    updateMany?: SiembraUpdateManyWithWhereWithoutTipoCultivoInput | SiembraUpdateManyWithWhereWithoutTipoCultivoInput[]
    deleteMany?: SiembraScalarWhereInput | SiembraScalarWhereInput[]
  }

  export type SiembraUncheckedUpdateManyWithoutTipoCultivoNestedInput = {
    create?: XOR<SiembraCreateWithoutTipoCultivoInput, SiembraUncheckedCreateWithoutTipoCultivoInput> | SiembraCreateWithoutTipoCultivoInput[] | SiembraUncheckedCreateWithoutTipoCultivoInput[]
    connectOrCreate?: SiembraCreateOrConnectWithoutTipoCultivoInput | SiembraCreateOrConnectWithoutTipoCultivoInput[]
    upsert?: SiembraUpsertWithWhereUniqueWithoutTipoCultivoInput | SiembraUpsertWithWhereUniqueWithoutTipoCultivoInput[]
    createMany?: SiembraCreateManyTipoCultivoInputEnvelope
    set?: SiembraWhereUniqueInput | SiembraWhereUniqueInput[]
    disconnect?: SiembraWhereUniqueInput | SiembraWhereUniqueInput[]
    delete?: SiembraWhereUniqueInput | SiembraWhereUniqueInput[]
    connect?: SiembraWhereUniqueInput | SiembraWhereUniqueInput[]
    update?: SiembraUpdateWithWhereUniqueWithoutTipoCultivoInput | SiembraUpdateWithWhereUniqueWithoutTipoCultivoInput[]
    updateMany?: SiembraUpdateManyWithWhereWithoutTipoCultivoInput | SiembraUpdateManyWithWhereWithoutTipoCultivoInput[]
    deleteMany?: SiembraScalarWhereInput | SiembraScalarWhereInput[]
  }

  export type LoteCreateNestedOneWithoutSiembrasInput = {
    create?: XOR<LoteCreateWithoutSiembrasInput, LoteUncheckedCreateWithoutSiembrasInput>
    connectOrCreate?: LoteCreateOrConnectWithoutSiembrasInput
    connect?: LoteWhereUniqueInput
  }

  export type TipoCultivoCreateNestedOneWithoutSiembrasInput = {
    create?: XOR<TipoCultivoCreateWithoutSiembrasInput, TipoCultivoUncheckedCreateWithoutSiembrasInput>
    connectOrCreate?: TipoCultivoCreateOrConnectWithoutSiembrasInput
    connect?: TipoCultivoWhereUniqueInput
  }

  export type CosechaCreateNestedManyWithoutSiembraInput = {
    create?: XOR<CosechaCreateWithoutSiembraInput, CosechaUncheckedCreateWithoutSiembraInput> | CosechaCreateWithoutSiembraInput[] | CosechaUncheckedCreateWithoutSiembraInput[]
    connectOrCreate?: CosechaCreateOrConnectWithoutSiembraInput | CosechaCreateOrConnectWithoutSiembraInput[]
    createMany?: CosechaCreateManySiembraInputEnvelope
    connect?: CosechaWhereUniqueInput | CosechaWhereUniqueInput[]
  }

  export type AplicacionInsumoCreateNestedManyWithoutSiembraInput = {
    create?: XOR<AplicacionInsumoCreateWithoutSiembraInput, AplicacionInsumoUncheckedCreateWithoutSiembraInput> | AplicacionInsumoCreateWithoutSiembraInput[] | AplicacionInsumoUncheckedCreateWithoutSiembraInput[]
    connectOrCreate?: AplicacionInsumoCreateOrConnectWithoutSiembraInput | AplicacionInsumoCreateOrConnectWithoutSiembraInput[]
    createMany?: AplicacionInsumoCreateManySiembraInputEnvelope
    connect?: AplicacionInsumoWhereUniqueInput | AplicacionInsumoWhereUniqueInput[]
  }

  export type MovimientoFinancieroCreateNestedManyWithoutSiembraInput = {
    create?: XOR<MovimientoFinancieroCreateWithoutSiembraInput, MovimientoFinancieroUncheckedCreateWithoutSiembraInput> | MovimientoFinancieroCreateWithoutSiembraInput[] | MovimientoFinancieroUncheckedCreateWithoutSiembraInput[]
    connectOrCreate?: MovimientoFinancieroCreateOrConnectWithoutSiembraInput | MovimientoFinancieroCreateOrConnectWithoutSiembraInput[]
    createMany?: MovimientoFinancieroCreateManySiembraInputEnvelope
    connect?: MovimientoFinancieroWhereUniqueInput | MovimientoFinancieroWhereUniqueInput[]
  }

  export type CampaniaCreateNestedOneWithoutSiembrasInput = {
    create?: XOR<CampaniaCreateWithoutSiembrasInput, CampaniaUncheckedCreateWithoutSiembrasInput>
    connectOrCreate?: CampaniaCreateOrConnectWithoutSiembrasInput
    connect?: CampaniaWhereUniqueInput
  }

  export type CosechaUncheckedCreateNestedManyWithoutSiembraInput = {
    create?: XOR<CosechaCreateWithoutSiembraInput, CosechaUncheckedCreateWithoutSiembraInput> | CosechaCreateWithoutSiembraInput[] | CosechaUncheckedCreateWithoutSiembraInput[]
    connectOrCreate?: CosechaCreateOrConnectWithoutSiembraInput | CosechaCreateOrConnectWithoutSiembraInput[]
    createMany?: CosechaCreateManySiembraInputEnvelope
    connect?: CosechaWhereUniqueInput | CosechaWhereUniqueInput[]
  }

  export type AplicacionInsumoUncheckedCreateNestedManyWithoutSiembraInput = {
    create?: XOR<AplicacionInsumoCreateWithoutSiembraInput, AplicacionInsumoUncheckedCreateWithoutSiembraInput> | AplicacionInsumoCreateWithoutSiembraInput[] | AplicacionInsumoUncheckedCreateWithoutSiembraInput[]
    connectOrCreate?: AplicacionInsumoCreateOrConnectWithoutSiembraInput | AplicacionInsumoCreateOrConnectWithoutSiembraInput[]
    createMany?: AplicacionInsumoCreateManySiembraInputEnvelope
    connect?: AplicacionInsumoWhereUniqueInput | AplicacionInsumoWhereUniqueInput[]
  }

  export type MovimientoFinancieroUncheckedCreateNestedManyWithoutSiembraInput = {
    create?: XOR<MovimientoFinancieroCreateWithoutSiembraInput, MovimientoFinancieroUncheckedCreateWithoutSiembraInput> | MovimientoFinancieroCreateWithoutSiembraInput[] | MovimientoFinancieroUncheckedCreateWithoutSiembraInput[]
    connectOrCreate?: MovimientoFinancieroCreateOrConnectWithoutSiembraInput | MovimientoFinancieroCreateOrConnectWithoutSiembraInput[]
    createMany?: MovimientoFinancieroCreateManySiembraInputEnvelope
    connect?: MovimientoFinancieroWhereUniqueInput | MovimientoFinancieroWhereUniqueInput[]
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EnumEstadoSiembraFieldUpdateOperationsInput = {
    set?: $Enums.EstadoSiembra
  }

  export type LoteUpdateOneRequiredWithoutSiembrasNestedInput = {
    create?: XOR<LoteCreateWithoutSiembrasInput, LoteUncheckedCreateWithoutSiembrasInput>
    connectOrCreate?: LoteCreateOrConnectWithoutSiembrasInput
    upsert?: LoteUpsertWithoutSiembrasInput
    connect?: LoteWhereUniqueInput
    update?: XOR<XOR<LoteUpdateToOneWithWhereWithoutSiembrasInput, LoteUpdateWithoutSiembrasInput>, LoteUncheckedUpdateWithoutSiembrasInput>
  }

  export type TipoCultivoUpdateOneRequiredWithoutSiembrasNestedInput = {
    create?: XOR<TipoCultivoCreateWithoutSiembrasInput, TipoCultivoUncheckedCreateWithoutSiembrasInput>
    connectOrCreate?: TipoCultivoCreateOrConnectWithoutSiembrasInput
    upsert?: TipoCultivoUpsertWithoutSiembrasInput
    connect?: TipoCultivoWhereUniqueInput
    update?: XOR<XOR<TipoCultivoUpdateToOneWithWhereWithoutSiembrasInput, TipoCultivoUpdateWithoutSiembrasInput>, TipoCultivoUncheckedUpdateWithoutSiembrasInput>
  }

  export type CosechaUpdateManyWithoutSiembraNestedInput = {
    create?: XOR<CosechaCreateWithoutSiembraInput, CosechaUncheckedCreateWithoutSiembraInput> | CosechaCreateWithoutSiembraInput[] | CosechaUncheckedCreateWithoutSiembraInput[]
    connectOrCreate?: CosechaCreateOrConnectWithoutSiembraInput | CosechaCreateOrConnectWithoutSiembraInput[]
    upsert?: CosechaUpsertWithWhereUniqueWithoutSiembraInput | CosechaUpsertWithWhereUniqueWithoutSiembraInput[]
    createMany?: CosechaCreateManySiembraInputEnvelope
    set?: CosechaWhereUniqueInput | CosechaWhereUniqueInput[]
    disconnect?: CosechaWhereUniqueInput | CosechaWhereUniqueInput[]
    delete?: CosechaWhereUniqueInput | CosechaWhereUniqueInput[]
    connect?: CosechaWhereUniqueInput | CosechaWhereUniqueInput[]
    update?: CosechaUpdateWithWhereUniqueWithoutSiembraInput | CosechaUpdateWithWhereUniqueWithoutSiembraInput[]
    updateMany?: CosechaUpdateManyWithWhereWithoutSiembraInput | CosechaUpdateManyWithWhereWithoutSiembraInput[]
    deleteMany?: CosechaScalarWhereInput | CosechaScalarWhereInput[]
  }

  export type AplicacionInsumoUpdateManyWithoutSiembraNestedInput = {
    create?: XOR<AplicacionInsumoCreateWithoutSiembraInput, AplicacionInsumoUncheckedCreateWithoutSiembraInput> | AplicacionInsumoCreateWithoutSiembraInput[] | AplicacionInsumoUncheckedCreateWithoutSiembraInput[]
    connectOrCreate?: AplicacionInsumoCreateOrConnectWithoutSiembraInput | AplicacionInsumoCreateOrConnectWithoutSiembraInput[]
    upsert?: AplicacionInsumoUpsertWithWhereUniqueWithoutSiembraInput | AplicacionInsumoUpsertWithWhereUniqueWithoutSiembraInput[]
    createMany?: AplicacionInsumoCreateManySiembraInputEnvelope
    set?: AplicacionInsumoWhereUniqueInput | AplicacionInsumoWhereUniqueInput[]
    disconnect?: AplicacionInsumoWhereUniqueInput | AplicacionInsumoWhereUniqueInput[]
    delete?: AplicacionInsumoWhereUniqueInput | AplicacionInsumoWhereUniqueInput[]
    connect?: AplicacionInsumoWhereUniqueInput | AplicacionInsumoWhereUniqueInput[]
    update?: AplicacionInsumoUpdateWithWhereUniqueWithoutSiembraInput | AplicacionInsumoUpdateWithWhereUniqueWithoutSiembraInput[]
    updateMany?: AplicacionInsumoUpdateManyWithWhereWithoutSiembraInput | AplicacionInsumoUpdateManyWithWhereWithoutSiembraInput[]
    deleteMany?: AplicacionInsumoScalarWhereInput | AplicacionInsumoScalarWhereInput[]
  }

  export type MovimientoFinancieroUpdateManyWithoutSiembraNestedInput = {
    create?: XOR<MovimientoFinancieroCreateWithoutSiembraInput, MovimientoFinancieroUncheckedCreateWithoutSiembraInput> | MovimientoFinancieroCreateWithoutSiembraInput[] | MovimientoFinancieroUncheckedCreateWithoutSiembraInput[]
    connectOrCreate?: MovimientoFinancieroCreateOrConnectWithoutSiembraInput | MovimientoFinancieroCreateOrConnectWithoutSiembraInput[]
    upsert?: MovimientoFinancieroUpsertWithWhereUniqueWithoutSiembraInput | MovimientoFinancieroUpsertWithWhereUniqueWithoutSiembraInput[]
    createMany?: MovimientoFinancieroCreateManySiembraInputEnvelope
    set?: MovimientoFinancieroWhereUniqueInput | MovimientoFinancieroWhereUniqueInput[]
    disconnect?: MovimientoFinancieroWhereUniqueInput | MovimientoFinancieroWhereUniqueInput[]
    delete?: MovimientoFinancieroWhereUniqueInput | MovimientoFinancieroWhereUniqueInput[]
    connect?: MovimientoFinancieroWhereUniqueInput | MovimientoFinancieroWhereUniqueInput[]
    update?: MovimientoFinancieroUpdateWithWhereUniqueWithoutSiembraInput | MovimientoFinancieroUpdateWithWhereUniqueWithoutSiembraInput[]
    updateMany?: MovimientoFinancieroUpdateManyWithWhereWithoutSiembraInput | MovimientoFinancieroUpdateManyWithWhereWithoutSiembraInput[]
    deleteMany?: MovimientoFinancieroScalarWhereInput | MovimientoFinancieroScalarWhereInput[]
  }

  export type CampaniaUpdateOneWithoutSiembrasNestedInput = {
    create?: XOR<CampaniaCreateWithoutSiembrasInput, CampaniaUncheckedCreateWithoutSiembrasInput>
    connectOrCreate?: CampaniaCreateOrConnectWithoutSiembrasInput
    upsert?: CampaniaUpsertWithoutSiembrasInput
    disconnect?: CampaniaWhereInput | boolean
    delete?: CampaniaWhereInput | boolean
    connect?: CampaniaWhereUniqueInput
    update?: XOR<XOR<CampaniaUpdateToOneWithWhereWithoutSiembrasInput, CampaniaUpdateWithoutSiembrasInput>, CampaniaUncheckedUpdateWithoutSiembrasInput>
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type CosechaUncheckedUpdateManyWithoutSiembraNestedInput = {
    create?: XOR<CosechaCreateWithoutSiembraInput, CosechaUncheckedCreateWithoutSiembraInput> | CosechaCreateWithoutSiembraInput[] | CosechaUncheckedCreateWithoutSiembraInput[]
    connectOrCreate?: CosechaCreateOrConnectWithoutSiembraInput | CosechaCreateOrConnectWithoutSiembraInput[]
    upsert?: CosechaUpsertWithWhereUniqueWithoutSiembraInput | CosechaUpsertWithWhereUniqueWithoutSiembraInput[]
    createMany?: CosechaCreateManySiembraInputEnvelope
    set?: CosechaWhereUniqueInput | CosechaWhereUniqueInput[]
    disconnect?: CosechaWhereUniqueInput | CosechaWhereUniqueInput[]
    delete?: CosechaWhereUniqueInput | CosechaWhereUniqueInput[]
    connect?: CosechaWhereUniqueInput | CosechaWhereUniqueInput[]
    update?: CosechaUpdateWithWhereUniqueWithoutSiembraInput | CosechaUpdateWithWhereUniqueWithoutSiembraInput[]
    updateMany?: CosechaUpdateManyWithWhereWithoutSiembraInput | CosechaUpdateManyWithWhereWithoutSiembraInput[]
    deleteMany?: CosechaScalarWhereInput | CosechaScalarWhereInput[]
  }

  export type AplicacionInsumoUncheckedUpdateManyWithoutSiembraNestedInput = {
    create?: XOR<AplicacionInsumoCreateWithoutSiembraInput, AplicacionInsumoUncheckedCreateWithoutSiembraInput> | AplicacionInsumoCreateWithoutSiembraInput[] | AplicacionInsumoUncheckedCreateWithoutSiembraInput[]
    connectOrCreate?: AplicacionInsumoCreateOrConnectWithoutSiembraInput | AplicacionInsumoCreateOrConnectWithoutSiembraInput[]
    upsert?: AplicacionInsumoUpsertWithWhereUniqueWithoutSiembraInput | AplicacionInsumoUpsertWithWhereUniqueWithoutSiembraInput[]
    createMany?: AplicacionInsumoCreateManySiembraInputEnvelope
    set?: AplicacionInsumoWhereUniqueInput | AplicacionInsumoWhereUniqueInput[]
    disconnect?: AplicacionInsumoWhereUniqueInput | AplicacionInsumoWhereUniqueInput[]
    delete?: AplicacionInsumoWhereUniqueInput | AplicacionInsumoWhereUniqueInput[]
    connect?: AplicacionInsumoWhereUniqueInput | AplicacionInsumoWhereUniqueInput[]
    update?: AplicacionInsumoUpdateWithWhereUniqueWithoutSiembraInput | AplicacionInsumoUpdateWithWhereUniqueWithoutSiembraInput[]
    updateMany?: AplicacionInsumoUpdateManyWithWhereWithoutSiembraInput | AplicacionInsumoUpdateManyWithWhereWithoutSiembraInput[]
    deleteMany?: AplicacionInsumoScalarWhereInput | AplicacionInsumoScalarWhereInput[]
  }

  export type MovimientoFinancieroUncheckedUpdateManyWithoutSiembraNestedInput = {
    create?: XOR<MovimientoFinancieroCreateWithoutSiembraInput, MovimientoFinancieroUncheckedCreateWithoutSiembraInput> | MovimientoFinancieroCreateWithoutSiembraInput[] | MovimientoFinancieroUncheckedCreateWithoutSiembraInput[]
    connectOrCreate?: MovimientoFinancieroCreateOrConnectWithoutSiembraInput | MovimientoFinancieroCreateOrConnectWithoutSiembraInput[]
    upsert?: MovimientoFinancieroUpsertWithWhereUniqueWithoutSiembraInput | MovimientoFinancieroUpsertWithWhereUniqueWithoutSiembraInput[]
    createMany?: MovimientoFinancieroCreateManySiembraInputEnvelope
    set?: MovimientoFinancieroWhereUniqueInput | MovimientoFinancieroWhereUniqueInput[]
    disconnect?: MovimientoFinancieroWhereUniqueInput | MovimientoFinancieroWhereUniqueInput[]
    delete?: MovimientoFinancieroWhereUniqueInput | MovimientoFinancieroWhereUniqueInput[]
    connect?: MovimientoFinancieroWhereUniqueInput | MovimientoFinancieroWhereUniqueInput[]
    update?: MovimientoFinancieroUpdateWithWhereUniqueWithoutSiembraInput | MovimientoFinancieroUpdateWithWhereUniqueWithoutSiembraInput[]
    updateMany?: MovimientoFinancieroUpdateManyWithWhereWithoutSiembraInput | MovimientoFinancieroUpdateManyWithWhereWithoutSiembraInput[]
    deleteMany?: MovimientoFinancieroScalarWhereInput | MovimientoFinancieroScalarWhereInput[]
  }

  export type SiembraCreateNestedOneWithoutCosechasInput = {
    create?: XOR<SiembraCreateWithoutCosechasInput, SiembraUncheckedCreateWithoutCosechasInput>
    connectOrCreate?: SiembraCreateOrConnectWithoutCosechasInput
    connect?: SiembraWhereUniqueInput
  }

  export type SiembraUpdateOneRequiredWithoutCosechasNestedInput = {
    create?: XOR<SiembraCreateWithoutCosechasInput, SiembraUncheckedCreateWithoutCosechasInput>
    connectOrCreate?: SiembraCreateOrConnectWithoutCosechasInput
    upsert?: SiembraUpsertWithoutCosechasInput
    connect?: SiembraWhereUniqueInput
    update?: XOR<XOR<SiembraUpdateToOneWithWhereWithoutCosechasInput, SiembraUpdateWithoutCosechasInput>, SiembraUncheckedUpdateWithoutCosechasInput>
  }

  export type AplicacionInsumoCreateNestedManyWithoutInsumoInput = {
    create?: XOR<AplicacionInsumoCreateWithoutInsumoInput, AplicacionInsumoUncheckedCreateWithoutInsumoInput> | AplicacionInsumoCreateWithoutInsumoInput[] | AplicacionInsumoUncheckedCreateWithoutInsumoInput[]
    connectOrCreate?: AplicacionInsumoCreateOrConnectWithoutInsumoInput | AplicacionInsumoCreateOrConnectWithoutInsumoInput[]
    createMany?: AplicacionInsumoCreateManyInsumoInputEnvelope
    connect?: AplicacionInsumoWhereUniqueInput | AplicacionInsumoWhereUniqueInput[]
  }

  export type AplicacionInsumoUncheckedCreateNestedManyWithoutInsumoInput = {
    create?: XOR<AplicacionInsumoCreateWithoutInsumoInput, AplicacionInsumoUncheckedCreateWithoutInsumoInput> | AplicacionInsumoCreateWithoutInsumoInput[] | AplicacionInsumoUncheckedCreateWithoutInsumoInput[]
    connectOrCreate?: AplicacionInsumoCreateOrConnectWithoutInsumoInput | AplicacionInsumoCreateOrConnectWithoutInsumoInput[]
    createMany?: AplicacionInsumoCreateManyInsumoInputEnvelope
    connect?: AplicacionInsumoWhereUniqueInput | AplicacionInsumoWhereUniqueInput[]
  }

  export type EnumTipoInsumoFieldUpdateOperationsInput = {
    set?: $Enums.TipoInsumo
  }

  export type AplicacionInsumoUpdateManyWithoutInsumoNestedInput = {
    create?: XOR<AplicacionInsumoCreateWithoutInsumoInput, AplicacionInsumoUncheckedCreateWithoutInsumoInput> | AplicacionInsumoCreateWithoutInsumoInput[] | AplicacionInsumoUncheckedCreateWithoutInsumoInput[]
    connectOrCreate?: AplicacionInsumoCreateOrConnectWithoutInsumoInput | AplicacionInsumoCreateOrConnectWithoutInsumoInput[]
    upsert?: AplicacionInsumoUpsertWithWhereUniqueWithoutInsumoInput | AplicacionInsumoUpsertWithWhereUniqueWithoutInsumoInput[]
    createMany?: AplicacionInsumoCreateManyInsumoInputEnvelope
    set?: AplicacionInsumoWhereUniqueInput | AplicacionInsumoWhereUniqueInput[]
    disconnect?: AplicacionInsumoWhereUniqueInput | AplicacionInsumoWhereUniqueInput[]
    delete?: AplicacionInsumoWhereUniqueInput | AplicacionInsumoWhereUniqueInput[]
    connect?: AplicacionInsumoWhereUniqueInput | AplicacionInsumoWhereUniqueInput[]
    update?: AplicacionInsumoUpdateWithWhereUniqueWithoutInsumoInput | AplicacionInsumoUpdateWithWhereUniqueWithoutInsumoInput[]
    updateMany?: AplicacionInsumoUpdateManyWithWhereWithoutInsumoInput | AplicacionInsumoUpdateManyWithWhereWithoutInsumoInput[]
    deleteMany?: AplicacionInsumoScalarWhereInput | AplicacionInsumoScalarWhereInput[]
  }

  export type AplicacionInsumoUncheckedUpdateManyWithoutInsumoNestedInput = {
    create?: XOR<AplicacionInsumoCreateWithoutInsumoInput, AplicacionInsumoUncheckedCreateWithoutInsumoInput> | AplicacionInsumoCreateWithoutInsumoInput[] | AplicacionInsumoUncheckedCreateWithoutInsumoInput[]
    connectOrCreate?: AplicacionInsumoCreateOrConnectWithoutInsumoInput | AplicacionInsumoCreateOrConnectWithoutInsumoInput[]
    upsert?: AplicacionInsumoUpsertWithWhereUniqueWithoutInsumoInput | AplicacionInsumoUpsertWithWhereUniqueWithoutInsumoInput[]
    createMany?: AplicacionInsumoCreateManyInsumoInputEnvelope
    set?: AplicacionInsumoWhereUniqueInput | AplicacionInsumoWhereUniqueInput[]
    disconnect?: AplicacionInsumoWhereUniqueInput | AplicacionInsumoWhereUniqueInput[]
    delete?: AplicacionInsumoWhereUniqueInput | AplicacionInsumoWhereUniqueInput[]
    connect?: AplicacionInsumoWhereUniqueInput | AplicacionInsumoWhereUniqueInput[]
    update?: AplicacionInsumoUpdateWithWhereUniqueWithoutInsumoInput | AplicacionInsumoUpdateWithWhereUniqueWithoutInsumoInput[]
    updateMany?: AplicacionInsumoUpdateManyWithWhereWithoutInsumoInput | AplicacionInsumoUpdateManyWithWhereWithoutInsumoInput[]
    deleteMany?: AplicacionInsumoScalarWhereInput | AplicacionInsumoScalarWhereInput[]
  }

  export type SiembraCreateNestedOneWithoutAplicacionesInput = {
    create?: XOR<SiembraCreateWithoutAplicacionesInput, SiembraUncheckedCreateWithoutAplicacionesInput>
    connectOrCreate?: SiembraCreateOrConnectWithoutAplicacionesInput
    connect?: SiembraWhereUniqueInput
  }

  export type InsumoCreateNestedOneWithoutAplicacionesInput = {
    create?: XOR<InsumoCreateWithoutAplicacionesInput, InsumoUncheckedCreateWithoutAplicacionesInput>
    connectOrCreate?: InsumoCreateOrConnectWithoutAplicacionesInput
    connect?: InsumoWhereUniqueInput
  }

  export type SiembraUpdateOneRequiredWithoutAplicacionesNestedInput = {
    create?: XOR<SiembraCreateWithoutAplicacionesInput, SiembraUncheckedCreateWithoutAplicacionesInput>
    connectOrCreate?: SiembraCreateOrConnectWithoutAplicacionesInput
    upsert?: SiembraUpsertWithoutAplicacionesInput
    connect?: SiembraWhereUniqueInput
    update?: XOR<XOR<SiembraUpdateToOneWithWhereWithoutAplicacionesInput, SiembraUpdateWithoutAplicacionesInput>, SiembraUncheckedUpdateWithoutAplicacionesInput>
  }

  export type InsumoUpdateOneRequiredWithoutAplicacionesNestedInput = {
    create?: XOR<InsumoCreateWithoutAplicacionesInput, InsumoUncheckedCreateWithoutAplicacionesInput>
    connectOrCreate?: InsumoCreateOrConnectWithoutAplicacionesInput
    upsert?: InsumoUpsertWithoutAplicacionesInput
    connect?: InsumoWhereUniqueInput
    update?: XOR<XOR<InsumoUpdateToOneWithWhereWithoutAplicacionesInput, InsumoUpdateWithoutAplicacionesInput>, InsumoUncheckedUpdateWithoutAplicacionesInput>
  }

  export type UsuarioCreateNestedOneWithoutAnimalesInput = {
    create?: XOR<UsuarioCreateWithoutAnimalesInput, UsuarioUncheckedCreateWithoutAnimalesInput>
    connectOrCreate?: UsuarioCreateOrConnectWithoutAnimalesInput
    connect?: UsuarioWhereUniqueInput
  }

  export type PrenezCreateNestedManyWithoutAnimalInput = {
    create?: XOR<PrenezCreateWithoutAnimalInput, PrenezUncheckedCreateWithoutAnimalInput> | PrenezCreateWithoutAnimalInput[] | PrenezUncheckedCreateWithoutAnimalInput[]
    connectOrCreate?: PrenezCreateOrConnectWithoutAnimalInput | PrenezCreateOrConnectWithoutAnimalInput[]
    createMany?: PrenezCreateManyAnimalInputEnvelope
    connect?: PrenezWhereUniqueInput | PrenezWhereUniqueInput[]
  }

  export type RegistroPesoCreateNestedManyWithoutAnimalInput = {
    create?: XOR<RegistroPesoCreateWithoutAnimalInput, RegistroPesoUncheckedCreateWithoutAnimalInput> | RegistroPesoCreateWithoutAnimalInput[] | RegistroPesoUncheckedCreateWithoutAnimalInput[]
    connectOrCreate?: RegistroPesoCreateOrConnectWithoutAnimalInput | RegistroPesoCreateOrConnectWithoutAnimalInput[]
    createMany?: RegistroPesoCreateManyAnimalInputEnvelope
    connect?: RegistroPesoWhereUniqueInput | RegistroPesoWhereUniqueInput[]
  }

  export type PrenezUncheckedCreateNestedManyWithoutAnimalInput = {
    create?: XOR<PrenezCreateWithoutAnimalInput, PrenezUncheckedCreateWithoutAnimalInput> | PrenezCreateWithoutAnimalInput[] | PrenezUncheckedCreateWithoutAnimalInput[]
    connectOrCreate?: PrenezCreateOrConnectWithoutAnimalInput | PrenezCreateOrConnectWithoutAnimalInput[]
    createMany?: PrenezCreateManyAnimalInputEnvelope
    connect?: PrenezWhereUniqueInput | PrenezWhereUniqueInput[]
  }

  export type RegistroPesoUncheckedCreateNestedManyWithoutAnimalInput = {
    create?: XOR<RegistroPesoCreateWithoutAnimalInput, RegistroPesoUncheckedCreateWithoutAnimalInput> | RegistroPesoCreateWithoutAnimalInput[] | RegistroPesoUncheckedCreateWithoutAnimalInput[]
    connectOrCreate?: RegistroPesoCreateOrConnectWithoutAnimalInput | RegistroPesoCreateOrConnectWithoutAnimalInput[]
    createMany?: RegistroPesoCreateManyAnimalInputEnvelope
    connect?: RegistroPesoWhereUniqueInput | RegistroPesoWhereUniqueInput[]
  }

  export type EnumEspecieFieldUpdateOperationsInput = {
    set?: $Enums.Especie
  }

  export type EnumSexoFieldUpdateOperationsInput = {
    set?: $Enums.Sexo
  }

  export type EnumCategoriaAnimalFieldUpdateOperationsInput = {
    set?: $Enums.CategoriaAnimal
  }

  export type UsuarioUpdateOneRequiredWithoutAnimalesNestedInput = {
    create?: XOR<UsuarioCreateWithoutAnimalesInput, UsuarioUncheckedCreateWithoutAnimalesInput>
    connectOrCreate?: UsuarioCreateOrConnectWithoutAnimalesInput
    upsert?: UsuarioUpsertWithoutAnimalesInput
    connect?: UsuarioWhereUniqueInput
    update?: XOR<XOR<UsuarioUpdateToOneWithWhereWithoutAnimalesInput, UsuarioUpdateWithoutAnimalesInput>, UsuarioUncheckedUpdateWithoutAnimalesInput>
  }

  export type PrenezUpdateManyWithoutAnimalNestedInput = {
    create?: XOR<PrenezCreateWithoutAnimalInput, PrenezUncheckedCreateWithoutAnimalInput> | PrenezCreateWithoutAnimalInput[] | PrenezUncheckedCreateWithoutAnimalInput[]
    connectOrCreate?: PrenezCreateOrConnectWithoutAnimalInput | PrenezCreateOrConnectWithoutAnimalInput[]
    upsert?: PrenezUpsertWithWhereUniqueWithoutAnimalInput | PrenezUpsertWithWhereUniqueWithoutAnimalInput[]
    createMany?: PrenezCreateManyAnimalInputEnvelope
    set?: PrenezWhereUniqueInput | PrenezWhereUniqueInput[]
    disconnect?: PrenezWhereUniqueInput | PrenezWhereUniqueInput[]
    delete?: PrenezWhereUniqueInput | PrenezWhereUniqueInput[]
    connect?: PrenezWhereUniqueInput | PrenezWhereUniqueInput[]
    update?: PrenezUpdateWithWhereUniqueWithoutAnimalInput | PrenezUpdateWithWhereUniqueWithoutAnimalInput[]
    updateMany?: PrenezUpdateManyWithWhereWithoutAnimalInput | PrenezUpdateManyWithWhereWithoutAnimalInput[]
    deleteMany?: PrenezScalarWhereInput | PrenezScalarWhereInput[]
  }

  export type RegistroPesoUpdateManyWithoutAnimalNestedInput = {
    create?: XOR<RegistroPesoCreateWithoutAnimalInput, RegistroPesoUncheckedCreateWithoutAnimalInput> | RegistroPesoCreateWithoutAnimalInput[] | RegistroPesoUncheckedCreateWithoutAnimalInput[]
    connectOrCreate?: RegistroPesoCreateOrConnectWithoutAnimalInput | RegistroPesoCreateOrConnectWithoutAnimalInput[]
    upsert?: RegistroPesoUpsertWithWhereUniqueWithoutAnimalInput | RegistroPesoUpsertWithWhereUniqueWithoutAnimalInput[]
    createMany?: RegistroPesoCreateManyAnimalInputEnvelope
    set?: RegistroPesoWhereUniqueInput | RegistroPesoWhereUniqueInput[]
    disconnect?: RegistroPesoWhereUniqueInput | RegistroPesoWhereUniqueInput[]
    delete?: RegistroPesoWhereUniqueInput | RegistroPesoWhereUniqueInput[]
    connect?: RegistroPesoWhereUniqueInput | RegistroPesoWhereUniqueInput[]
    update?: RegistroPesoUpdateWithWhereUniqueWithoutAnimalInput | RegistroPesoUpdateWithWhereUniqueWithoutAnimalInput[]
    updateMany?: RegistroPesoUpdateManyWithWhereWithoutAnimalInput | RegistroPesoUpdateManyWithWhereWithoutAnimalInput[]
    deleteMany?: RegistroPesoScalarWhereInput | RegistroPesoScalarWhereInput[]
  }

  export type PrenezUncheckedUpdateManyWithoutAnimalNestedInput = {
    create?: XOR<PrenezCreateWithoutAnimalInput, PrenezUncheckedCreateWithoutAnimalInput> | PrenezCreateWithoutAnimalInput[] | PrenezUncheckedCreateWithoutAnimalInput[]
    connectOrCreate?: PrenezCreateOrConnectWithoutAnimalInput | PrenezCreateOrConnectWithoutAnimalInput[]
    upsert?: PrenezUpsertWithWhereUniqueWithoutAnimalInput | PrenezUpsertWithWhereUniqueWithoutAnimalInput[]
    createMany?: PrenezCreateManyAnimalInputEnvelope
    set?: PrenezWhereUniqueInput | PrenezWhereUniqueInput[]
    disconnect?: PrenezWhereUniqueInput | PrenezWhereUniqueInput[]
    delete?: PrenezWhereUniqueInput | PrenezWhereUniqueInput[]
    connect?: PrenezWhereUniqueInput | PrenezWhereUniqueInput[]
    update?: PrenezUpdateWithWhereUniqueWithoutAnimalInput | PrenezUpdateWithWhereUniqueWithoutAnimalInput[]
    updateMany?: PrenezUpdateManyWithWhereWithoutAnimalInput | PrenezUpdateManyWithWhereWithoutAnimalInput[]
    deleteMany?: PrenezScalarWhereInput | PrenezScalarWhereInput[]
  }

  export type RegistroPesoUncheckedUpdateManyWithoutAnimalNestedInput = {
    create?: XOR<RegistroPesoCreateWithoutAnimalInput, RegistroPesoUncheckedCreateWithoutAnimalInput> | RegistroPesoCreateWithoutAnimalInput[] | RegistroPesoUncheckedCreateWithoutAnimalInput[]
    connectOrCreate?: RegistroPesoCreateOrConnectWithoutAnimalInput | RegistroPesoCreateOrConnectWithoutAnimalInput[]
    upsert?: RegistroPesoUpsertWithWhereUniqueWithoutAnimalInput | RegistroPesoUpsertWithWhereUniqueWithoutAnimalInput[]
    createMany?: RegistroPesoCreateManyAnimalInputEnvelope
    set?: RegistroPesoWhereUniqueInput | RegistroPesoWhereUniqueInput[]
    disconnect?: RegistroPesoWhereUniqueInput | RegistroPesoWhereUniqueInput[]
    delete?: RegistroPesoWhereUniqueInput | RegistroPesoWhereUniqueInput[]
    connect?: RegistroPesoWhereUniqueInput | RegistroPesoWhereUniqueInput[]
    update?: RegistroPesoUpdateWithWhereUniqueWithoutAnimalInput | RegistroPesoUpdateWithWhereUniqueWithoutAnimalInput[]
    updateMany?: RegistroPesoUpdateManyWithWhereWithoutAnimalInput | RegistroPesoUpdateManyWithWhereWithoutAnimalInput[]
    deleteMany?: RegistroPesoScalarWhereInput | RegistroPesoScalarWhereInput[]
  }

  export type AnimalCreateNestedOneWithoutPrenecesInput = {
    create?: XOR<AnimalCreateWithoutPrenecesInput, AnimalUncheckedCreateWithoutPrenecesInput>
    connectOrCreate?: AnimalCreateOrConnectWithoutPrenecesInput
    connect?: AnimalWhereUniqueInput
  }

  export type EnumEstadoPrenezFieldUpdateOperationsInput = {
    set?: $Enums.EstadoPrenez
  }

  export type AnimalUpdateOneRequiredWithoutPrenecesNestedInput = {
    create?: XOR<AnimalCreateWithoutPrenecesInput, AnimalUncheckedCreateWithoutPrenecesInput>
    connectOrCreate?: AnimalCreateOrConnectWithoutPrenecesInput
    upsert?: AnimalUpsertWithoutPrenecesInput
    connect?: AnimalWhereUniqueInput
    update?: XOR<XOR<AnimalUpdateToOneWithWhereWithoutPrenecesInput, AnimalUpdateWithoutPrenecesInput>, AnimalUncheckedUpdateWithoutPrenecesInput>
  }

  export type UsuarioCreateNestedOneWithoutTareasInput = {
    create?: XOR<UsuarioCreateWithoutTareasInput, UsuarioUncheckedCreateWithoutTareasInput>
    connectOrCreate?: UsuarioCreateOrConnectWithoutTareasInput
    connect?: UsuarioWhereUniqueInput
  }

  export type CampoCreateNestedOneWithoutTareasInput = {
    create?: XOR<CampoCreateWithoutTareasInput, CampoUncheckedCreateWithoutTareasInput>
    connectOrCreate?: CampoCreateOrConnectWithoutTareasInput
    connect?: CampoWhereUniqueInput
  }

  export type EnumTipoTareaFieldUpdateOperationsInput = {
    set?: $Enums.TipoTarea
  }

  export type EnumEstadoTareaFieldUpdateOperationsInput = {
    set?: $Enums.EstadoTarea
  }

  export type EnumPrioridadFieldUpdateOperationsInput = {
    set?: $Enums.Prioridad
  }

  export type UsuarioUpdateOneRequiredWithoutTareasNestedInput = {
    create?: XOR<UsuarioCreateWithoutTareasInput, UsuarioUncheckedCreateWithoutTareasInput>
    connectOrCreate?: UsuarioCreateOrConnectWithoutTareasInput
    upsert?: UsuarioUpsertWithoutTareasInput
    connect?: UsuarioWhereUniqueInput
    update?: XOR<XOR<UsuarioUpdateToOneWithWhereWithoutTareasInput, UsuarioUpdateWithoutTareasInput>, UsuarioUncheckedUpdateWithoutTareasInput>
  }

  export type CampoUpdateOneWithoutTareasNestedInput = {
    create?: XOR<CampoCreateWithoutTareasInput, CampoUncheckedCreateWithoutTareasInput>
    connectOrCreate?: CampoCreateOrConnectWithoutTareasInput
    upsert?: CampoUpsertWithoutTareasInput
    disconnect?: CampoWhereInput | boolean
    delete?: CampoWhereInput | boolean
    connect?: CampoWhereUniqueInput
    update?: XOR<XOR<CampoUpdateToOneWithWhereWithoutTareasInput, CampoUpdateWithoutTareasInput>, CampoUncheckedUpdateWithoutTareasInput>
  }

  export type UsuarioCreateNestedOneWithoutMovimientosInput = {
    create?: XOR<UsuarioCreateWithoutMovimientosInput, UsuarioUncheckedCreateWithoutMovimientosInput>
    connectOrCreate?: UsuarioCreateOrConnectWithoutMovimientosInput
    connect?: UsuarioWhereUniqueInput
  }

  export type CampoCreateNestedOneWithoutMovimentosInput = {
    create?: XOR<CampoCreateWithoutMovimentosInput, CampoUncheckedCreateWithoutMovimentosInput>
    connectOrCreate?: CampoCreateOrConnectWithoutMovimentosInput
    connect?: CampoWhereUniqueInput
  }

  export type SiembraCreateNestedOneWithoutMovimentosInput = {
    create?: XOR<SiembraCreateWithoutMovimentosInput, SiembraUncheckedCreateWithoutMovimentosInput>
    connectOrCreate?: SiembraCreateOrConnectWithoutMovimentosInput
    connect?: SiembraWhereUniqueInput
  }

  export type EnumTipoMovimientoFieldUpdateOperationsInput = {
    set?: $Enums.TipoMovimiento
  }

  export type EnumCategoriaMovimientoFieldUpdateOperationsInput = {
    set?: $Enums.CategoriaMovimiento
  }

  export type UsuarioUpdateOneRequiredWithoutMovimientosNestedInput = {
    create?: XOR<UsuarioCreateWithoutMovimientosInput, UsuarioUncheckedCreateWithoutMovimientosInput>
    connectOrCreate?: UsuarioCreateOrConnectWithoutMovimientosInput
    upsert?: UsuarioUpsertWithoutMovimientosInput
    connect?: UsuarioWhereUniqueInput
    update?: XOR<XOR<UsuarioUpdateToOneWithWhereWithoutMovimientosInput, UsuarioUpdateWithoutMovimientosInput>, UsuarioUncheckedUpdateWithoutMovimientosInput>
  }

  export type CampoUpdateOneWithoutMovimentosNestedInput = {
    create?: XOR<CampoCreateWithoutMovimentosInput, CampoUncheckedCreateWithoutMovimentosInput>
    connectOrCreate?: CampoCreateOrConnectWithoutMovimentosInput
    upsert?: CampoUpsertWithoutMovimentosInput
    disconnect?: CampoWhereInput | boolean
    delete?: CampoWhereInput | boolean
    connect?: CampoWhereUniqueInput
    update?: XOR<XOR<CampoUpdateToOneWithWhereWithoutMovimentosInput, CampoUpdateWithoutMovimentosInput>, CampoUncheckedUpdateWithoutMovimentosInput>
  }

  export type SiembraUpdateOneWithoutMovimentosNestedInput = {
    create?: XOR<SiembraCreateWithoutMovimentosInput, SiembraUncheckedCreateWithoutMovimentosInput>
    connectOrCreate?: SiembraCreateOrConnectWithoutMovimentosInput
    upsert?: SiembraUpsertWithoutMovimentosInput
    disconnect?: SiembraWhereInput | boolean
    delete?: SiembraWhereInput | boolean
    connect?: SiembraWhereUniqueInput
    update?: XOR<XOR<SiembraUpdateToOneWithWhereWithoutMovimentosInput, SiembraUpdateWithoutMovimentosInput>, SiembraUncheckedUpdateWithoutMovimentosInput>
  }

  export type UsuarioCreateNestedOneWithoutCampaniasInput = {
    create?: XOR<UsuarioCreateWithoutCampaniasInput, UsuarioUncheckedCreateWithoutCampaniasInput>
    connectOrCreate?: UsuarioCreateOrConnectWithoutCampaniasInput
    connect?: UsuarioWhereUniqueInput
  }

  export type SiembraCreateNestedManyWithoutCampaniaInput = {
    create?: XOR<SiembraCreateWithoutCampaniaInput, SiembraUncheckedCreateWithoutCampaniaInput> | SiembraCreateWithoutCampaniaInput[] | SiembraUncheckedCreateWithoutCampaniaInput[]
    connectOrCreate?: SiembraCreateOrConnectWithoutCampaniaInput | SiembraCreateOrConnectWithoutCampaniaInput[]
    createMany?: SiembraCreateManyCampaniaInputEnvelope
    connect?: SiembraWhereUniqueInput | SiembraWhereUniqueInput[]
  }

  export type SiembraUncheckedCreateNestedManyWithoutCampaniaInput = {
    create?: XOR<SiembraCreateWithoutCampaniaInput, SiembraUncheckedCreateWithoutCampaniaInput> | SiembraCreateWithoutCampaniaInput[] | SiembraUncheckedCreateWithoutCampaniaInput[]
    connectOrCreate?: SiembraCreateOrConnectWithoutCampaniaInput | SiembraCreateOrConnectWithoutCampaniaInput[]
    createMany?: SiembraCreateManyCampaniaInputEnvelope
    connect?: SiembraWhereUniqueInput | SiembraWhereUniqueInput[]
  }

  export type UsuarioUpdateOneRequiredWithoutCampaniasNestedInput = {
    create?: XOR<UsuarioCreateWithoutCampaniasInput, UsuarioUncheckedCreateWithoutCampaniasInput>
    connectOrCreate?: UsuarioCreateOrConnectWithoutCampaniasInput
    upsert?: UsuarioUpsertWithoutCampaniasInput
    connect?: UsuarioWhereUniqueInput
    update?: XOR<XOR<UsuarioUpdateToOneWithWhereWithoutCampaniasInput, UsuarioUpdateWithoutCampaniasInput>, UsuarioUncheckedUpdateWithoutCampaniasInput>
  }

  export type SiembraUpdateManyWithoutCampaniaNestedInput = {
    create?: XOR<SiembraCreateWithoutCampaniaInput, SiembraUncheckedCreateWithoutCampaniaInput> | SiembraCreateWithoutCampaniaInput[] | SiembraUncheckedCreateWithoutCampaniaInput[]
    connectOrCreate?: SiembraCreateOrConnectWithoutCampaniaInput | SiembraCreateOrConnectWithoutCampaniaInput[]
    upsert?: SiembraUpsertWithWhereUniqueWithoutCampaniaInput | SiembraUpsertWithWhereUniqueWithoutCampaniaInput[]
    createMany?: SiembraCreateManyCampaniaInputEnvelope
    set?: SiembraWhereUniqueInput | SiembraWhereUniqueInput[]
    disconnect?: SiembraWhereUniqueInput | SiembraWhereUniqueInput[]
    delete?: SiembraWhereUniqueInput | SiembraWhereUniqueInput[]
    connect?: SiembraWhereUniqueInput | SiembraWhereUniqueInput[]
    update?: SiembraUpdateWithWhereUniqueWithoutCampaniaInput | SiembraUpdateWithWhereUniqueWithoutCampaniaInput[]
    updateMany?: SiembraUpdateManyWithWhereWithoutCampaniaInput | SiembraUpdateManyWithWhereWithoutCampaniaInput[]
    deleteMany?: SiembraScalarWhereInput | SiembraScalarWhereInput[]
  }

  export type SiembraUncheckedUpdateManyWithoutCampaniaNestedInput = {
    create?: XOR<SiembraCreateWithoutCampaniaInput, SiembraUncheckedCreateWithoutCampaniaInput> | SiembraCreateWithoutCampaniaInput[] | SiembraUncheckedCreateWithoutCampaniaInput[]
    connectOrCreate?: SiembraCreateOrConnectWithoutCampaniaInput | SiembraCreateOrConnectWithoutCampaniaInput[]
    upsert?: SiembraUpsertWithWhereUniqueWithoutCampaniaInput | SiembraUpsertWithWhereUniqueWithoutCampaniaInput[]
    createMany?: SiembraCreateManyCampaniaInputEnvelope
    set?: SiembraWhereUniqueInput | SiembraWhereUniqueInput[]
    disconnect?: SiembraWhereUniqueInput | SiembraWhereUniqueInput[]
    delete?: SiembraWhereUniqueInput | SiembraWhereUniqueInput[]
    connect?: SiembraWhereUniqueInput | SiembraWhereUniqueInput[]
    update?: SiembraUpdateWithWhereUniqueWithoutCampaniaInput | SiembraUpdateWithWhereUniqueWithoutCampaniaInput[]
    updateMany?: SiembraUpdateManyWithWhereWithoutCampaniaInput | SiembraUpdateManyWithWhereWithoutCampaniaInput[]
    deleteMany?: SiembraScalarWhereInput | SiembraScalarWhereInput[]
  }

  export type AnimalCreateNestedOneWithoutPesosInput = {
    create?: XOR<AnimalCreateWithoutPesosInput, AnimalUncheckedCreateWithoutPesosInput>
    connectOrCreate?: AnimalCreateOrConnectWithoutPesosInput
    connect?: AnimalWhereUniqueInput
  }

  export type AnimalUpdateOneRequiredWithoutPesosNestedInput = {
    create?: XOR<AnimalCreateWithoutPesosInput, AnimalUncheckedCreateWithoutPesosInput>
    connectOrCreate?: AnimalCreateOrConnectWithoutPesosInput
    upsert?: AnimalUpsertWithoutPesosInput
    connect?: AnimalWhereUniqueInput
    update?: XOR<XOR<AnimalUpdateToOneWithWhereWithoutPesosInput, AnimalUpdateWithoutPesosInput>, AnimalUncheckedUpdateWithoutPesosInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedEnumRolFilter<$PrismaModel = never> = {
    equals?: $Enums.Rol | EnumRolFieldRefInput<$PrismaModel>
    in?: $Enums.Rol[] | ListEnumRolFieldRefInput<$PrismaModel>
    notIn?: $Enums.Rol[] | ListEnumRolFieldRefInput<$PrismaModel>
    not?: NestedEnumRolFilter<$PrismaModel> | $Enums.Rol
  }

  export type NestedEnumPlanTipoFilter<$PrismaModel = never> = {
    equals?: $Enums.PlanTipo | EnumPlanTipoFieldRefInput<$PrismaModel>
    in?: $Enums.PlanTipo[] | ListEnumPlanTipoFieldRefInput<$PrismaModel>
    notIn?: $Enums.PlanTipo[] | ListEnumPlanTipoFieldRefInput<$PrismaModel>
    not?: NestedEnumPlanTipoFilter<$PrismaModel> | $Enums.PlanTipo
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedEnumRolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Rol | EnumRolFieldRefInput<$PrismaModel>
    in?: $Enums.Rol[] | ListEnumRolFieldRefInput<$PrismaModel>
    notIn?: $Enums.Rol[] | ListEnumRolFieldRefInput<$PrismaModel>
    not?: NestedEnumRolWithAggregatesFilter<$PrismaModel> | $Enums.Rol
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRolFilter<$PrismaModel>
    _max?: NestedEnumRolFilter<$PrismaModel>
  }

  export type NestedEnumPlanTipoWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PlanTipo | EnumPlanTipoFieldRefInput<$PrismaModel>
    in?: $Enums.PlanTipo[] | ListEnumPlanTipoFieldRefInput<$PrismaModel>
    notIn?: $Enums.PlanTipo[] | ListEnumPlanTipoFieldRefInput<$PrismaModel>
    not?: NestedEnumPlanTipoWithAggregatesFilter<$PrismaModel> | $Enums.PlanTipo
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPlanTipoFilter<$PrismaModel>
    _max?: NestedEnumPlanTipoFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumEstadoSiembraFilter<$PrismaModel = never> = {
    equals?: $Enums.EstadoSiembra | EnumEstadoSiembraFieldRefInput<$PrismaModel>
    in?: $Enums.EstadoSiembra[] | ListEnumEstadoSiembraFieldRefInput<$PrismaModel>
    notIn?: $Enums.EstadoSiembra[] | ListEnumEstadoSiembraFieldRefInput<$PrismaModel>
    not?: NestedEnumEstadoSiembraFilter<$PrismaModel> | $Enums.EstadoSiembra
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedEnumEstadoSiembraWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EstadoSiembra | EnumEstadoSiembraFieldRefInput<$PrismaModel>
    in?: $Enums.EstadoSiembra[] | ListEnumEstadoSiembraFieldRefInput<$PrismaModel>
    notIn?: $Enums.EstadoSiembra[] | ListEnumEstadoSiembraFieldRefInput<$PrismaModel>
    not?: NestedEnumEstadoSiembraWithAggregatesFilter<$PrismaModel> | $Enums.EstadoSiembra
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEstadoSiembraFilter<$PrismaModel>
    _max?: NestedEnumEstadoSiembraFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedEnumTipoInsumoFilter<$PrismaModel = never> = {
    equals?: $Enums.TipoInsumo | EnumTipoInsumoFieldRefInput<$PrismaModel>
    in?: $Enums.TipoInsumo[] | ListEnumTipoInsumoFieldRefInput<$PrismaModel>
    notIn?: $Enums.TipoInsumo[] | ListEnumTipoInsumoFieldRefInput<$PrismaModel>
    not?: NestedEnumTipoInsumoFilter<$PrismaModel> | $Enums.TipoInsumo
  }

  export type NestedEnumTipoInsumoWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TipoInsumo | EnumTipoInsumoFieldRefInput<$PrismaModel>
    in?: $Enums.TipoInsumo[] | ListEnumTipoInsumoFieldRefInput<$PrismaModel>
    notIn?: $Enums.TipoInsumo[] | ListEnumTipoInsumoFieldRefInput<$PrismaModel>
    not?: NestedEnumTipoInsumoWithAggregatesFilter<$PrismaModel> | $Enums.TipoInsumo
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTipoInsumoFilter<$PrismaModel>
    _max?: NestedEnumTipoInsumoFilter<$PrismaModel>
  }

  export type NestedEnumEspecieFilter<$PrismaModel = never> = {
    equals?: $Enums.Especie | EnumEspecieFieldRefInput<$PrismaModel>
    in?: $Enums.Especie[] | ListEnumEspecieFieldRefInput<$PrismaModel>
    notIn?: $Enums.Especie[] | ListEnumEspecieFieldRefInput<$PrismaModel>
    not?: NestedEnumEspecieFilter<$PrismaModel> | $Enums.Especie
  }

  export type NestedEnumSexoFilter<$PrismaModel = never> = {
    equals?: $Enums.Sexo | EnumSexoFieldRefInput<$PrismaModel>
    in?: $Enums.Sexo[] | ListEnumSexoFieldRefInput<$PrismaModel>
    notIn?: $Enums.Sexo[] | ListEnumSexoFieldRefInput<$PrismaModel>
    not?: NestedEnumSexoFilter<$PrismaModel> | $Enums.Sexo
  }

  export type NestedEnumCategoriaAnimalFilter<$PrismaModel = never> = {
    equals?: $Enums.CategoriaAnimal | EnumCategoriaAnimalFieldRefInput<$PrismaModel>
    in?: $Enums.CategoriaAnimal[] | ListEnumCategoriaAnimalFieldRefInput<$PrismaModel>
    notIn?: $Enums.CategoriaAnimal[] | ListEnumCategoriaAnimalFieldRefInput<$PrismaModel>
    not?: NestedEnumCategoriaAnimalFilter<$PrismaModel> | $Enums.CategoriaAnimal
  }

  export type NestedEnumEspecieWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Especie | EnumEspecieFieldRefInput<$PrismaModel>
    in?: $Enums.Especie[] | ListEnumEspecieFieldRefInput<$PrismaModel>
    notIn?: $Enums.Especie[] | ListEnumEspecieFieldRefInput<$PrismaModel>
    not?: NestedEnumEspecieWithAggregatesFilter<$PrismaModel> | $Enums.Especie
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEspecieFilter<$PrismaModel>
    _max?: NestedEnumEspecieFilter<$PrismaModel>
  }

  export type NestedEnumSexoWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Sexo | EnumSexoFieldRefInput<$PrismaModel>
    in?: $Enums.Sexo[] | ListEnumSexoFieldRefInput<$PrismaModel>
    notIn?: $Enums.Sexo[] | ListEnumSexoFieldRefInput<$PrismaModel>
    not?: NestedEnumSexoWithAggregatesFilter<$PrismaModel> | $Enums.Sexo
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSexoFilter<$PrismaModel>
    _max?: NestedEnumSexoFilter<$PrismaModel>
  }

  export type NestedEnumCategoriaAnimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CategoriaAnimal | EnumCategoriaAnimalFieldRefInput<$PrismaModel>
    in?: $Enums.CategoriaAnimal[] | ListEnumCategoriaAnimalFieldRefInput<$PrismaModel>
    notIn?: $Enums.CategoriaAnimal[] | ListEnumCategoriaAnimalFieldRefInput<$PrismaModel>
    not?: NestedEnumCategoriaAnimalWithAggregatesFilter<$PrismaModel> | $Enums.CategoriaAnimal
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCategoriaAnimalFilter<$PrismaModel>
    _max?: NestedEnumCategoriaAnimalFilter<$PrismaModel>
  }

  export type NestedEnumEstadoPrenezFilter<$PrismaModel = never> = {
    equals?: $Enums.EstadoPrenez | EnumEstadoPrenezFieldRefInput<$PrismaModel>
    in?: $Enums.EstadoPrenez[] | ListEnumEstadoPrenezFieldRefInput<$PrismaModel>
    notIn?: $Enums.EstadoPrenez[] | ListEnumEstadoPrenezFieldRefInput<$PrismaModel>
    not?: NestedEnumEstadoPrenezFilter<$PrismaModel> | $Enums.EstadoPrenez
  }

  export type NestedEnumEstadoPrenezWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EstadoPrenez | EnumEstadoPrenezFieldRefInput<$PrismaModel>
    in?: $Enums.EstadoPrenez[] | ListEnumEstadoPrenezFieldRefInput<$PrismaModel>
    notIn?: $Enums.EstadoPrenez[] | ListEnumEstadoPrenezFieldRefInput<$PrismaModel>
    not?: NestedEnumEstadoPrenezWithAggregatesFilter<$PrismaModel> | $Enums.EstadoPrenez
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEstadoPrenezFilter<$PrismaModel>
    _max?: NestedEnumEstadoPrenezFilter<$PrismaModel>
  }

  export type NestedEnumTipoTareaFilter<$PrismaModel = never> = {
    equals?: $Enums.TipoTarea | EnumTipoTareaFieldRefInput<$PrismaModel>
    in?: $Enums.TipoTarea[] | ListEnumTipoTareaFieldRefInput<$PrismaModel>
    notIn?: $Enums.TipoTarea[] | ListEnumTipoTareaFieldRefInput<$PrismaModel>
    not?: NestedEnumTipoTareaFilter<$PrismaModel> | $Enums.TipoTarea
  }

  export type NestedEnumEstadoTareaFilter<$PrismaModel = never> = {
    equals?: $Enums.EstadoTarea | EnumEstadoTareaFieldRefInput<$PrismaModel>
    in?: $Enums.EstadoTarea[] | ListEnumEstadoTareaFieldRefInput<$PrismaModel>
    notIn?: $Enums.EstadoTarea[] | ListEnumEstadoTareaFieldRefInput<$PrismaModel>
    not?: NestedEnumEstadoTareaFilter<$PrismaModel> | $Enums.EstadoTarea
  }

  export type NestedEnumPrioridadFilter<$PrismaModel = never> = {
    equals?: $Enums.Prioridad | EnumPrioridadFieldRefInput<$PrismaModel>
    in?: $Enums.Prioridad[] | ListEnumPrioridadFieldRefInput<$PrismaModel>
    notIn?: $Enums.Prioridad[] | ListEnumPrioridadFieldRefInput<$PrismaModel>
    not?: NestedEnumPrioridadFilter<$PrismaModel> | $Enums.Prioridad
  }

  export type NestedEnumTipoTareaWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TipoTarea | EnumTipoTareaFieldRefInput<$PrismaModel>
    in?: $Enums.TipoTarea[] | ListEnumTipoTareaFieldRefInput<$PrismaModel>
    notIn?: $Enums.TipoTarea[] | ListEnumTipoTareaFieldRefInput<$PrismaModel>
    not?: NestedEnumTipoTareaWithAggregatesFilter<$PrismaModel> | $Enums.TipoTarea
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTipoTareaFilter<$PrismaModel>
    _max?: NestedEnumTipoTareaFilter<$PrismaModel>
  }

  export type NestedEnumEstadoTareaWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EstadoTarea | EnumEstadoTareaFieldRefInput<$PrismaModel>
    in?: $Enums.EstadoTarea[] | ListEnumEstadoTareaFieldRefInput<$PrismaModel>
    notIn?: $Enums.EstadoTarea[] | ListEnumEstadoTareaFieldRefInput<$PrismaModel>
    not?: NestedEnumEstadoTareaWithAggregatesFilter<$PrismaModel> | $Enums.EstadoTarea
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEstadoTareaFilter<$PrismaModel>
    _max?: NestedEnumEstadoTareaFilter<$PrismaModel>
  }

  export type NestedEnumPrioridadWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Prioridad | EnumPrioridadFieldRefInput<$PrismaModel>
    in?: $Enums.Prioridad[] | ListEnumPrioridadFieldRefInput<$PrismaModel>
    notIn?: $Enums.Prioridad[] | ListEnumPrioridadFieldRefInput<$PrismaModel>
    not?: NestedEnumPrioridadWithAggregatesFilter<$PrismaModel> | $Enums.Prioridad
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPrioridadFilter<$PrismaModel>
    _max?: NestedEnumPrioridadFilter<$PrismaModel>
  }

  export type NestedEnumTipoMovimientoFilter<$PrismaModel = never> = {
    equals?: $Enums.TipoMovimiento | EnumTipoMovimientoFieldRefInput<$PrismaModel>
    in?: $Enums.TipoMovimiento[] | ListEnumTipoMovimientoFieldRefInput<$PrismaModel>
    notIn?: $Enums.TipoMovimiento[] | ListEnumTipoMovimientoFieldRefInput<$PrismaModel>
    not?: NestedEnumTipoMovimientoFilter<$PrismaModel> | $Enums.TipoMovimiento
  }

  export type NestedEnumCategoriaMovimientoFilter<$PrismaModel = never> = {
    equals?: $Enums.CategoriaMovimiento | EnumCategoriaMovimientoFieldRefInput<$PrismaModel>
    in?: $Enums.CategoriaMovimiento[] | ListEnumCategoriaMovimientoFieldRefInput<$PrismaModel>
    notIn?: $Enums.CategoriaMovimiento[] | ListEnumCategoriaMovimientoFieldRefInput<$PrismaModel>
    not?: NestedEnumCategoriaMovimientoFilter<$PrismaModel> | $Enums.CategoriaMovimiento
  }

  export type NestedEnumTipoMovimientoWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TipoMovimiento | EnumTipoMovimientoFieldRefInput<$PrismaModel>
    in?: $Enums.TipoMovimiento[] | ListEnumTipoMovimientoFieldRefInput<$PrismaModel>
    notIn?: $Enums.TipoMovimiento[] | ListEnumTipoMovimientoFieldRefInput<$PrismaModel>
    not?: NestedEnumTipoMovimientoWithAggregatesFilter<$PrismaModel> | $Enums.TipoMovimiento
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTipoMovimientoFilter<$PrismaModel>
    _max?: NestedEnumTipoMovimientoFilter<$PrismaModel>
  }

  export type NestedEnumCategoriaMovimientoWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CategoriaMovimiento | EnumCategoriaMovimientoFieldRefInput<$PrismaModel>
    in?: $Enums.CategoriaMovimiento[] | ListEnumCategoriaMovimientoFieldRefInput<$PrismaModel>
    notIn?: $Enums.CategoriaMovimiento[] | ListEnumCategoriaMovimientoFieldRefInput<$PrismaModel>
    not?: NestedEnumCategoriaMovimientoWithAggregatesFilter<$PrismaModel> | $Enums.CategoriaMovimiento
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCategoriaMovimientoFilter<$PrismaModel>
    _max?: NestedEnumCategoriaMovimientoFilter<$PrismaModel>
  }

  export type CampoCreateWithoutUsuarioInput = {
    nombre: string
    hectareas: number
    ubicacion?: string | null
    propietario?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    lotes?: LoteCreateNestedManyWithoutCampoInput
    tareas?: TareaRuralCreateNestedManyWithoutCampoInput
    movimentos?: MovimientoFinancieroCreateNestedManyWithoutCampoInput
  }

  export type CampoUncheckedCreateWithoutUsuarioInput = {
    id?: number
    nombre: string
    hectareas: number
    ubicacion?: string | null
    propietario?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    lotes?: LoteUncheckedCreateNestedManyWithoutCampoInput
    tareas?: TareaRuralUncheckedCreateNestedManyWithoutCampoInput
    movimentos?: MovimientoFinancieroUncheckedCreateNestedManyWithoutCampoInput
  }

  export type CampoCreateOrConnectWithoutUsuarioInput = {
    where: CampoWhereUniqueInput
    create: XOR<CampoCreateWithoutUsuarioInput, CampoUncheckedCreateWithoutUsuarioInput>
  }

  export type CampoCreateManyUsuarioInputEnvelope = {
    data: CampoCreateManyUsuarioInput | CampoCreateManyUsuarioInput[]
    skipDuplicates?: boolean
  }

  export type AnimalCreateWithoutUsuarioInput = {
    nombre: string
    especie: $Enums.Especie
    sexo: $Enums.Sexo
    categoria: $Enums.CategoriaAnimal
    peso?: number | null
    fechaNacimiento?: Date | string | null
    observaciones?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    preneces?: PrenezCreateNestedManyWithoutAnimalInput
    pesos?: RegistroPesoCreateNestedManyWithoutAnimalInput
  }

  export type AnimalUncheckedCreateWithoutUsuarioInput = {
    id?: number
    nombre: string
    especie: $Enums.Especie
    sexo: $Enums.Sexo
    categoria: $Enums.CategoriaAnimal
    peso?: number | null
    fechaNacimiento?: Date | string | null
    observaciones?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    preneces?: PrenezUncheckedCreateNestedManyWithoutAnimalInput
    pesos?: RegistroPesoUncheckedCreateNestedManyWithoutAnimalInput
  }

  export type AnimalCreateOrConnectWithoutUsuarioInput = {
    where: AnimalWhereUniqueInput
    create: XOR<AnimalCreateWithoutUsuarioInput, AnimalUncheckedCreateWithoutUsuarioInput>
  }

  export type AnimalCreateManyUsuarioInputEnvelope = {
    data: AnimalCreateManyUsuarioInput | AnimalCreateManyUsuarioInput[]
    skipDuplicates?: boolean
  }

  export type TareaRuralCreateWithoutUsuarioInput = {
    titulo: string
    descripcion?: string | null
    tipo: $Enums.TipoTarea
    estado?: $Enums.EstadoTarea
    prioridad?: $Enums.Prioridad
    fechaProgramada: Date | string
    fechaCompletada?: Date | string | null
    observaciones?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    campo?: CampoCreateNestedOneWithoutTareasInput
  }

  export type TareaRuralUncheckedCreateWithoutUsuarioInput = {
    id?: number
    titulo: string
    descripcion?: string | null
    tipo: $Enums.TipoTarea
    estado?: $Enums.EstadoTarea
    prioridad?: $Enums.Prioridad
    fechaProgramada: Date | string
    fechaCompletada?: Date | string | null
    campoId?: number | null
    observaciones?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TareaRuralCreateOrConnectWithoutUsuarioInput = {
    where: TareaRuralWhereUniqueInput
    create: XOR<TareaRuralCreateWithoutUsuarioInput, TareaRuralUncheckedCreateWithoutUsuarioInput>
  }

  export type TareaRuralCreateManyUsuarioInputEnvelope = {
    data: TareaRuralCreateManyUsuarioInput | TareaRuralCreateManyUsuarioInput[]
    skipDuplicates?: boolean
  }

  export type MovimientoFinancieroCreateWithoutUsuarioInput = {
    tipo: $Enums.TipoMovimiento
    concepto: string
    monto: number
    fecha: Date | string
    categoria: $Enums.CategoriaMovimiento
    observaciones?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    campo?: CampoCreateNestedOneWithoutMovimentosInput
    siembra?: SiembraCreateNestedOneWithoutMovimentosInput
  }

  export type MovimientoFinancieroUncheckedCreateWithoutUsuarioInput = {
    id?: number
    tipo: $Enums.TipoMovimiento
    concepto: string
    monto: number
    fecha: Date | string
    categoria: $Enums.CategoriaMovimiento
    campoId?: number | null
    siembraId?: number | null
    observaciones?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MovimientoFinancieroCreateOrConnectWithoutUsuarioInput = {
    where: MovimientoFinancieroWhereUniqueInput
    create: XOR<MovimientoFinancieroCreateWithoutUsuarioInput, MovimientoFinancieroUncheckedCreateWithoutUsuarioInput>
  }

  export type MovimientoFinancieroCreateManyUsuarioInputEnvelope = {
    data: MovimientoFinancieroCreateManyUsuarioInput | MovimientoFinancieroCreateManyUsuarioInput[]
    skipDuplicates?: boolean
  }

  export type CampaniaCreateWithoutUsuarioInput = {
    nombre: string
    fechaInicio: Date | string
    fechaFin?: Date | string | null
    descripcion?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    siembras?: SiembraCreateNestedManyWithoutCampaniaInput
  }

  export type CampaniaUncheckedCreateWithoutUsuarioInput = {
    id?: number
    nombre: string
    fechaInicio: Date | string
    fechaFin?: Date | string | null
    descripcion?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    siembras?: SiembraUncheckedCreateNestedManyWithoutCampaniaInput
  }

  export type CampaniaCreateOrConnectWithoutUsuarioInput = {
    where: CampaniaWhereUniqueInput
    create: XOR<CampaniaCreateWithoutUsuarioInput, CampaniaUncheckedCreateWithoutUsuarioInput>
  }

  export type CampaniaCreateManyUsuarioInputEnvelope = {
    data: CampaniaCreateManyUsuarioInput | CampaniaCreateManyUsuarioInput[]
    skipDuplicates?: boolean
  }

  export type CampoUpsertWithWhereUniqueWithoutUsuarioInput = {
    where: CampoWhereUniqueInput
    update: XOR<CampoUpdateWithoutUsuarioInput, CampoUncheckedUpdateWithoutUsuarioInput>
    create: XOR<CampoCreateWithoutUsuarioInput, CampoUncheckedCreateWithoutUsuarioInput>
  }

  export type CampoUpdateWithWhereUniqueWithoutUsuarioInput = {
    where: CampoWhereUniqueInput
    data: XOR<CampoUpdateWithoutUsuarioInput, CampoUncheckedUpdateWithoutUsuarioInput>
  }

  export type CampoUpdateManyWithWhereWithoutUsuarioInput = {
    where: CampoScalarWhereInput
    data: XOR<CampoUpdateManyMutationInput, CampoUncheckedUpdateManyWithoutUsuarioInput>
  }

  export type CampoScalarWhereInput = {
    AND?: CampoScalarWhereInput | CampoScalarWhereInput[]
    OR?: CampoScalarWhereInput[]
    NOT?: CampoScalarWhereInput | CampoScalarWhereInput[]
    id?: IntFilter<"Campo"> | number
    nombre?: StringFilter<"Campo"> | string
    hectareas?: FloatFilter<"Campo"> | number
    ubicacion?: StringNullableFilter<"Campo"> | string | null
    propietario?: StringNullableFilter<"Campo"> | string | null
    usuarioId?: IntFilter<"Campo"> | number
    createdAt?: DateTimeFilter<"Campo"> | Date | string
    updatedAt?: DateTimeFilter<"Campo"> | Date | string
  }

  export type AnimalUpsertWithWhereUniqueWithoutUsuarioInput = {
    where: AnimalWhereUniqueInput
    update: XOR<AnimalUpdateWithoutUsuarioInput, AnimalUncheckedUpdateWithoutUsuarioInput>
    create: XOR<AnimalCreateWithoutUsuarioInput, AnimalUncheckedCreateWithoutUsuarioInput>
  }

  export type AnimalUpdateWithWhereUniqueWithoutUsuarioInput = {
    where: AnimalWhereUniqueInput
    data: XOR<AnimalUpdateWithoutUsuarioInput, AnimalUncheckedUpdateWithoutUsuarioInput>
  }

  export type AnimalUpdateManyWithWhereWithoutUsuarioInput = {
    where: AnimalScalarWhereInput
    data: XOR<AnimalUpdateManyMutationInput, AnimalUncheckedUpdateManyWithoutUsuarioInput>
  }

  export type AnimalScalarWhereInput = {
    AND?: AnimalScalarWhereInput | AnimalScalarWhereInput[]
    OR?: AnimalScalarWhereInput[]
    NOT?: AnimalScalarWhereInput | AnimalScalarWhereInput[]
    id?: IntFilter<"Animal"> | number
    usuarioId?: IntFilter<"Animal"> | number
    nombre?: StringFilter<"Animal"> | string
    especie?: EnumEspecieFilter<"Animal"> | $Enums.Especie
    sexo?: EnumSexoFilter<"Animal"> | $Enums.Sexo
    categoria?: EnumCategoriaAnimalFilter<"Animal"> | $Enums.CategoriaAnimal
    peso?: FloatNullableFilter<"Animal"> | number | null
    fechaNacimiento?: DateTimeNullableFilter<"Animal"> | Date | string | null
    observaciones?: StringNullableFilter<"Animal"> | string | null
    createdAt?: DateTimeFilter<"Animal"> | Date | string
    updatedAt?: DateTimeFilter<"Animal"> | Date | string
  }

  export type TareaRuralUpsertWithWhereUniqueWithoutUsuarioInput = {
    where: TareaRuralWhereUniqueInput
    update: XOR<TareaRuralUpdateWithoutUsuarioInput, TareaRuralUncheckedUpdateWithoutUsuarioInput>
    create: XOR<TareaRuralCreateWithoutUsuarioInput, TareaRuralUncheckedCreateWithoutUsuarioInput>
  }

  export type TareaRuralUpdateWithWhereUniqueWithoutUsuarioInput = {
    where: TareaRuralWhereUniqueInput
    data: XOR<TareaRuralUpdateWithoutUsuarioInput, TareaRuralUncheckedUpdateWithoutUsuarioInput>
  }

  export type TareaRuralUpdateManyWithWhereWithoutUsuarioInput = {
    where: TareaRuralScalarWhereInput
    data: XOR<TareaRuralUpdateManyMutationInput, TareaRuralUncheckedUpdateManyWithoutUsuarioInput>
  }

  export type TareaRuralScalarWhereInput = {
    AND?: TareaRuralScalarWhereInput | TareaRuralScalarWhereInput[]
    OR?: TareaRuralScalarWhereInput[]
    NOT?: TareaRuralScalarWhereInput | TareaRuralScalarWhereInput[]
    id?: IntFilter<"TareaRural"> | number
    usuarioId?: IntFilter<"TareaRural"> | number
    titulo?: StringFilter<"TareaRural"> | string
    descripcion?: StringNullableFilter<"TareaRural"> | string | null
    tipo?: EnumTipoTareaFilter<"TareaRural"> | $Enums.TipoTarea
    estado?: EnumEstadoTareaFilter<"TareaRural"> | $Enums.EstadoTarea
    prioridad?: EnumPrioridadFilter<"TareaRural"> | $Enums.Prioridad
    fechaProgramada?: DateTimeFilter<"TareaRural"> | Date | string
    fechaCompletada?: DateTimeNullableFilter<"TareaRural"> | Date | string | null
    campoId?: IntNullableFilter<"TareaRural"> | number | null
    observaciones?: StringNullableFilter<"TareaRural"> | string | null
    createdAt?: DateTimeFilter<"TareaRural"> | Date | string
    updatedAt?: DateTimeFilter<"TareaRural"> | Date | string
  }

  export type MovimientoFinancieroUpsertWithWhereUniqueWithoutUsuarioInput = {
    where: MovimientoFinancieroWhereUniqueInput
    update: XOR<MovimientoFinancieroUpdateWithoutUsuarioInput, MovimientoFinancieroUncheckedUpdateWithoutUsuarioInput>
    create: XOR<MovimientoFinancieroCreateWithoutUsuarioInput, MovimientoFinancieroUncheckedCreateWithoutUsuarioInput>
  }

  export type MovimientoFinancieroUpdateWithWhereUniqueWithoutUsuarioInput = {
    where: MovimientoFinancieroWhereUniqueInput
    data: XOR<MovimientoFinancieroUpdateWithoutUsuarioInput, MovimientoFinancieroUncheckedUpdateWithoutUsuarioInput>
  }

  export type MovimientoFinancieroUpdateManyWithWhereWithoutUsuarioInput = {
    where: MovimientoFinancieroScalarWhereInput
    data: XOR<MovimientoFinancieroUpdateManyMutationInput, MovimientoFinancieroUncheckedUpdateManyWithoutUsuarioInput>
  }

  export type MovimientoFinancieroScalarWhereInput = {
    AND?: MovimientoFinancieroScalarWhereInput | MovimientoFinancieroScalarWhereInput[]
    OR?: MovimientoFinancieroScalarWhereInput[]
    NOT?: MovimientoFinancieroScalarWhereInput | MovimientoFinancieroScalarWhereInput[]
    id?: IntFilter<"MovimientoFinanciero"> | number
    usuarioId?: IntFilter<"MovimientoFinanciero"> | number
    tipo?: EnumTipoMovimientoFilter<"MovimientoFinanciero"> | $Enums.TipoMovimiento
    concepto?: StringFilter<"MovimientoFinanciero"> | string
    monto?: FloatFilter<"MovimientoFinanciero"> | number
    fecha?: DateTimeFilter<"MovimientoFinanciero"> | Date | string
    categoria?: EnumCategoriaMovimientoFilter<"MovimientoFinanciero"> | $Enums.CategoriaMovimiento
    campoId?: IntNullableFilter<"MovimientoFinanciero"> | number | null
    siembraId?: IntNullableFilter<"MovimientoFinanciero"> | number | null
    observaciones?: StringNullableFilter<"MovimientoFinanciero"> | string | null
    createdAt?: DateTimeFilter<"MovimientoFinanciero"> | Date | string
    updatedAt?: DateTimeFilter<"MovimientoFinanciero"> | Date | string
  }

  export type CampaniaUpsertWithWhereUniqueWithoutUsuarioInput = {
    where: CampaniaWhereUniqueInput
    update: XOR<CampaniaUpdateWithoutUsuarioInput, CampaniaUncheckedUpdateWithoutUsuarioInput>
    create: XOR<CampaniaCreateWithoutUsuarioInput, CampaniaUncheckedCreateWithoutUsuarioInput>
  }

  export type CampaniaUpdateWithWhereUniqueWithoutUsuarioInput = {
    where: CampaniaWhereUniqueInput
    data: XOR<CampaniaUpdateWithoutUsuarioInput, CampaniaUncheckedUpdateWithoutUsuarioInput>
  }

  export type CampaniaUpdateManyWithWhereWithoutUsuarioInput = {
    where: CampaniaScalarWhereInput
    data: XOR<CampaniaUpdateManyMutationInput, CampaniaUncheckedUpdateManyWithoutUsuarioInput>
  }

  export type CampaniaScalarWhereInput = {
    AND?: CampaniaScalarWhereInput | CampaniaScalarWhereInput[]
    OR?: CampaniaScalarWhereInput[]
    NOT?: CampaniaScalarWhereInput | CampaniaScalarWhereInput[]
    id?: IntFilter<"Campania"> | number
    usuarioId?: IntFilter<"Campania"> | number
    nombre?: StringFilter<"Campania"> | string
    fechaInicio?: DateTimeFilter<"Campania"> | Date | string
    fechaFin?: DateTimeNullableFilter<"Campania"> | Date | string | null
    descripcion?: StringNullableFilter<"Campania"> | string | null
    createdAt?: DateTimeFilter<"Campania"> | Date | string
    updatedAt?: DateTimeFilter<"Campania"> | Date | string
  }

  export type UsuarioCreateWithoutCamposInput = {
    email: string
    nombre: string
    password: string
    rol?: $Enums.Rol
    plan?: $Enums.PlanTipo
    planExpira?: Date | string | null
    mpSuscripcionId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    resetToken?: string | null
    resetTokenExpiry?: Date | string | null
    animales?: AnimalCreateNestedManyWithoutUsuarioInput
    tareas?: TareaRuralCreateNestedManyWithoutUsuarioInput
    movimientos?: MovimientoFinancieroCreateNestedManyWithoutUsuarioInput
    campanias?: CampaniaCreateNestedManyWithoutUsuarioInput
  }

  export type UsuarioUncheckedCreateWithoutCamposInput = {
    id?: number
    email: string
    nombre: string
    password: string
    rol?: $Enums.Rol
    plan?: $Enums.PlanTipo
    planExpira?: Date | string | null
    mpSuscripcionId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    resetToken?: string | null
    resetTokenExpiry?: Date | string | null
    animales?: AnimalUncheckedCreateNestedManyWithoutUsuarioInput
    tareas?: TareaRuralUncheckedCreateNestedManyWithoutUsuarioInput
    movimientos?: MovimientoFinancieroUncheckedCreateNestedManyWithoutUsuarioInput
    campanias?: CampaniaUncheckedCreateNestedManyWithoutUsuarioInput
  }

  export type UsuarioCreateOrConnectWithoutCamposInput = {
    where: UsuarioWhereUniqueInput
    create: XOR<UsuarioCreateWithoutCamposInput, UsuarioUncheckedCreateWithoutCamposInput>
  }

  export type LoteCreateWithoutCampoInput = {
    nombre: string
    hectareas: number
    createdAt?: Date | string
    updatedAt?: Date | string
    siembras?: SiembraCreateNestedManyWithoutLoteInput
  }

  export type LoteUncheckedCreateWithoutCampoInput = {
    id?: number
    nombre: string
    hectareas: number
    createdAt?: Date | string
    updatedAt?: Date | string
    siembras?: SiembraUncheckedCreateNestedManyWithoutLoteInput
  }

  export type LoteCreateOrConnectWithoutCampoInput = {
    where: LoteWhereUniqueInput
    create: XOR<LoteCreateWithoutCampoInput, LoteUncheckedCreateWithoutCampoInput>
  }

  export type LoteCreateManyCampoInputEnvelope = {
    data: LoteCreateManyCampoInput | LoteCreateManyCampoInput[]
    skipDuplicates?: boolean
  }

  export type TareaRuralCreateWithoutCampoInput = {
    titulo: string
    descripcion?: string | null
    tipo: $Enums.TipoTarea
    estado?: $Enums.EstadoTarea
    prioridad?: $Enums.Prioridad
    fechaProgramada: Date | string
    fechaCompletada?: Date | string | null
    observaciones?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    usuario: UsuarioCreateNestedOneWithoutTareasInput
  }

  export type TareaRuralUncheckedCreateWithoutCampoInput = {
    id?: number
    usuarioId: number
    titulo: string
    descripcion?: string | null
    tipo: $Enums.TipoTarea
    estado?: $Enums.EstadoTarea
    prioridad?: $Enums.Prioridad
    fechaProgramada: Date | string
    fechaCompletada?: Date | string | null
    observaciones?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TareaRuralCreateOrConnectWithoutCampoInput = {
    where: TareaRuralWhereUniqueInput
    create: XOR<TareaRuralCreateWithoutCampoInput, TareaRuralUncheckedCreateWithoutCampoInput>
  }

  export type TareaRuralCreateManyCampoInputEnvelope = {
    data: TareaRuralCreateManyCampoInput | TareaRuralCreateManyCampoInput[]
    skipDuplicates?: boolean
  }

  export type MovimientoFinancieroCreateWithoutCampoInput = {
    tipo: $Enums.TipoMovimiento
    concepto: string
    monto: number
    fecha: Date | string
    categoria: $Enums.CategoriaMovimiento
    observaciones?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    usuario: UsuarioCreateNestedOneWithoutMovimientosInput
    siembra?: SiembraCreateNestedOneWithoutMovimentosInput
  }

  export type MovimientoFinancieroUncheckedCreateWithoutCampoInput = {
    id?: number
    usuarioId: number
    tipo: $Enums.TipoMovimiento
    concepto: string
    monto: number
    fecha: Date | string
    categoria: $Enums.CategoriaMovimiento
    siembraId?: number | null
    observaciones?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MovimientoFinancieroCreateOrConnectWithoutCampoInput = {
    where: MovimientoFinancieroWhereUniqueInput
    create: XOR<MovimientoFinancieroCreateWithoutCampoInput, MovimientoFinancieroUncheckedCreateWithoutCampoInput>
  }

  export type MovimientoFinancieroCreateManyCampoInputEnvelope = {
    data: MovimientoFinancieroCreateManyCampoInput | MovimientoFinancieroCreateManyCampoInput[]
    skipDuplicates?: boolean
  }

  export type UsuarioUpsertWithoutCamposInput = {
    update: XOR<UsuarioUpdateWithoutCamposInput, UsuarioUncheckedUpdateWithoutCamposInput>
    create: XOR<UsuarioCreateWithoutCamposInput, UsuarioUncheckedCreateWithoutCamposInput>
    where?: UsuarioWhereInput
  }

  export type UsuarioUpdateToOneWithWhereWithoutCamposInput = {
    where?: UsuarioWhereInput
    data: XOR<UsuarioUpdateWithoutCamposInput, UsuarioUncheckedUpdateWithoutCamposInput>
  }

  export type UsuarioUpdateWithoutCamposInput = {
    email?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    rol?: EnumRolFieldUpdateOperationsInput | $Enums.Rol
    plan?: EnumPlanTipoFieldUpdateOperationsInput | $Enums.PlanTipo
    planExpira?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    mpSuscripcionId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    animales?: AnimalUpdateManyWithoutUsuarioNestedInput
    tareas?: TareaRuralUpdateManyWithoutUsuarioNestedInput
    movimientos?: MovimientoFinancieroUpdateManyWithoutUsuarioNestedInput
    campanias?: CampaniaUpdateManyWithoutUsuarioNestedInput
  }

  export type UsuarioUncheckedUpdateWithoutCamposInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    rol?: EnumRolFieldUpdateOperationsInput | $Enums.Rol
    plan?: EnumPlanTipoFieldUpdateOperationsInput | $Enums.PlanTipo
    planExpira?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    mpSuscripcionId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    animales?: AnimalUncheckedUpdateManyWithoutUsuarioNestedInput
    tareas?: TareaRuralUncheckedUpdateManyWithoutUsuarioNestedInput
    movimientos?: MovimientoFinancieroUncheckedUpdateManyWithoutUsuarioNestedInput
    campanias?: CampaniaUncheckedUpdateManyWithoutUsuarioNestedInput
  }

  export type LoteUpsertWithWhereUniqueWithoutCampoInput = {
    where: LoteWhereUniqueInput
    update: XOR<LoteUpdateWithoutCampoInput, LoteUncheckedUpdateWithoutCampoInput>
    create: XOR<LoteCreateWithoutCampoInput, LoteUncheckedCreateWithoutCampoInput>
  }

  export type LoteUpdateWithWhereUniqueWithoutCampoInput = {
    where: LoteWhereUniqueInput
    data: XOR<LoteUpdateWithoutCampoInput, LoteUncheckedUpdateWithoutCampoInput>
  }

  export type LoteUpdateManyWithWhereWithoutCampoInput = {
    where: LoteScalarWhereInput
    data: XOR<LoteUpdateManyMutationInput, LoteUncheckedUpdateManyWithoutCampoInput>
  }

  export type LoteScalarWhereInput = {
    AND?: LoteScalarWhereInput | LoteScalarWhereInput[]
    OR?: LoteScalarWhereInput[]
    NOT?: LoteScalarWhereInput | LoteScalarWhereInput[]
    id?: IntFilter<"Lote"> | number
    nombre?: StringFilter<"Lote"> | string
    hectareas?: FloatFilter<"Lote"> | number
    campoId?: IntFilter<"Lote"> | number
    createdAt?: DateTimeFilter<"Lote"> | Date | string
    updatedAt?: DateTimeFilter<"Lote"> | Date | string
  }

  export type TareaRuralUpsertWithWhereUniqueWithoutCampoInput = {
    where: TareaRuralWhereUniqueInput
    update: XOR<TareaRuralUpdateWithoutCampoInput, TareaRuralUncheckedUpdateWithoutCampoInput>
    create: XOR<TareaRuralCreateWithoutCampoInput, TareaRuralUncheckedCreateWithoutCampoInput>
  }

  export type TareaRuralUpdateWithWhereUniqueWithoutCampoInput = {
    where: TareaRuralWhereUniqueInput
    data: XOR<TareaRuralUpdateWithoutCampoInput, TareaRuralUncheckedUpdateWithoutCampoInput>
  }

  export type TareaRuralUpdateManyWithWhereWithoutCampoInput = {
    where: TareaRuralScalarWhereInput
    data: XOR<TareaRuralUpdateManyMutationInput, TareaRuralUncheckedUpdateManyWithoutCampoInput>
  }

  export type MovimientoFinancieroUpsertWithWhereUniqueWithoutCampoInput = {
    where: MovimientoFinancieroWhereUniqueInput
    update: XOR<MovimientoFinancieroUpdateWithoutCampoInput, MovimientoFinancieroUncheckedUpdateWithoutCampoInput>
    create: XOR<MovimientoFinancieroCreateWithoutCampoInput, MovimientoFinancieroUncheckedCreateWithoutCampoInput>
  }

  export type MovimientoFinancieroUpdateWithWhereUniqueWithoutCampoInput = {
    where: MovimientoFinancieroWhereUniqueInput
    data: XOR<MovimientoFinancieroUpdateWithoutCampoInput, MovimientoFinancieroUncheckedUpdateWithoutCampoInput>
  }

  export type MovimientoFinancieroUpdateManyWithWhereWithoutCampoInput = {
    where: MovimientoFinancieroScalarWhereInput
    data: XOR<MovimientoFinancieroUpdateManyMutationInput, MovimientoFinancieroUncheckedUpdateManyWithoutCampoInput>
  }

  export type CampoCreateWithoutLotesInput = {
    nombre: string
    hectareas: number
    ubicacion?: string | null
    propietario?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    usuario: UsuarioCreateNestedOneWithoutCamposInput
    tareas?: TareaRuralCreateNestedManyWithoutCampoInput
    movimentos?: MovimientoFinancieroCreateNestedManyWithoutCampoInput
  }

  export type CampoUncheckedCreateWithoutLotesInput = {
    id?: number
    nombre: string
    hectareas: number
    ubicacion?: string | null
    propietario?: string | null
    usuarioId: number
    createdAt?: Date | string
    updatedAt?: Date | string
    tareas?: TareaRuralUncheckedCreateNestedManyWithoutCampoInput
    movimentos?: MovimientoFinancieroUncheckedCreateNestedManyWithoutCampoInput
  }

  export type CampoCreateOrConnectWithoutLotesInput = {
    where: CampoWhereUniqueInput
    create: XOR<CampoCreateWithoutLotesInput, CampoUncheckedCreateWithoutLotesInput>
  }

  export type SiembraCreateWithoutLoteInput = {
    fechaSiembra: Date | string
    densidad?: number | null
    observaciones?: string | null
    estado?: $Enums.EstadoSiembra
    createdAt?: Date | string
    updatedAt?: Date | string
    tipoCultivo: TipoCultivoCreateNestedOneWithoutSiembrasInput
    cosechas?: CosechaCreateNestedManyWithoutSiembraInput
    aplicaciones?: AplicacionInsumoCreateNestedManyWithoutSiembraInput
    movimentos?: MovimientoFinancieroCreateNestedManyWithoutSiembraInput
    campania?: CampaniaCreateNestedOneWithoutSiembrasInput
  }

  export type SiembraUncheckedCreateWithoutLoteInput = {
    id?: number
    tipoCultivoId: number
    fechaSiembra: Date | string
    densidad?: number | null
    observaciones?: string | null
    estado?: $Enums.EstadoSiembra
    createdAt?: Date | string
    updatedAt?: Date | string
    campaniaId?: number | null
    cosechas?: CosechaUncheckedCreateNestedManyWithoutSiembraInput
    aplicaciones?: AplicacionInsumoUncheckedCreateNestedManyWithoutSiembraInput
    movimentos?: MovimientoFinancieroUncheckedCreateNestedManyWithoutSiembraInput
  }

  export type SiembraCreateOrConnectWithoutLoteInput = {
    where: SiembraWhereUniqueInput
    create: XOR<SiembraCreateWithoutLoteInput, SiembraUncheckedCreateWithoutLoteInput>
  }

  export type SiembraCreateManyLoteInputEnvelope = {
    data: SiembraCreateManyLoteInput | SiembraCreateManyLoteInput[]
    skipDuplicates?: boolean
  }

  export type CampoUpsertWithoutLotesInput = {
    update: XOR<CampoUpdateWithoutLotesInput, CampoUncheckedUpdateWithoutLotesInput>
    create: XOR<CampoCreateWithoutLotesInput, CampoUncheckedCreateWithoutLotesInput>
    where?: CampoWhereInput
  }

  export type CampoUpdateToOneWithWhereWithoutLotesInput = {
    where?: CampoWhereInput
    data: XOR<CampoUpdateWithoutLotesInput, CampoUncheckedUpdateWithoutLotesInput>
  }

  export type CampoUpdateWithoutLotesInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    hectareas?: FloatFieldUpdateOperationsInput | number
    ubicacion?: NullableStringFieldUpdateOperationsInput | string | null
    propietario?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usuario?: UsuarioUpdateOneRequiredWithoutCamposNestedInput
    tareas?: TareaRuralUpdateManyWithoutCampoNestedInput
    movimentos?: MovimientoFinancieroUpdateManyWithoutCampoNestedInput
  }

  export type CampoUncheckedUpdateWithoutLotesInput = {
    id?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    hectareas?: FloatFieldUpdateOperationsInput | number
    ubicacion?: NullableStringFieldUpdateOperationsInput | string | null
    propietario?: NullableStringFieldUpdateOperationsInput | string | null
    usuarioId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tareas?: TareaRuralUncheckedUpdateManyWithoutCampoNestedInput
    movimentos?: MovimientoFinancieroUncheckedUpdateManyWithoutCampoNestedInput
  }

  export type SiembraUpsertWithWhereUniqueWithoutLoteInput = {
    where: SiembraWhereUniqueInput
    update: XOR<SiembraUpdateWithoutLoteInput, SiembraUncheckedUpdateWithoutLoteInput>
    create: XOR<SiembraCreateWithoutLoteInput, SiembraUncheckedCreateWithoutLoteInput>
  }

  export type SiembraUpdateWithWhereUniqueWithoutLoteInput = {
    where: SiembraWhereUniqueInput
    data: XOR<SiembraUpdateWithoutLoteInput, SiembraUncheckedUpdateWithoutLoteInput>
  }

  export type SiembraUpdateManyWithWhereWithoutLoteInput = {
    where: SiembraScalarWhereInput
    data: XOR<SiembraUpdateManyMutationInput, SiembraUncheckedUpdateManyWithoutLoteInput>
  }

  export type SiembraScalarWhereInput = {
    AND?: SiembraScalarWhereInput | SiembraScalarWhereInput[]
    OR?: SiembraScalarWhereInput[]
    NOT?: SiembraScalarWhereInput | SiembraScalarWhereInput[]
    id?: IntFilter<"Siembra"> | number
    loteId?: IntFilter<"Siembra"> | number
    tipoCultivoId?: IntFilter<"Siembra"> | number
    fechaSiembra?: DateTimeFilter<"Siembra"> | Date | string
    densidad?: FloatNullableFilter<"Siembra"> | number | null
    observaciones?: StringNullableFilter<"Siembra"> | string | null
    estado?: EnumEstadoSiembraFilter<"Siembra"> | $Enums.EstadoSiembra
    createdAt?: DateTimeFilter<"Siembra"> | Date | string
    updatedAt?: DateTimeFilter<"Siembra"> | Date | string
    campaniaId?: IntNullableFilter<"Siembra"> | number | null
  }

  export type SiembraCreateWithoutTipoCultivoInput = {
    fechaSiembra: Date | string
    densidad?: number | null
    observaciones?: string | null
    estado?: $Enums.EstadoSiembra
    createdAt?: Date | string
    updatedAt?: Date | string
    lote: LoteCreateNestedOneWithoutSiembrasInput
    cosechas?: CosechaCreateNestedManyWithoutSiembraInput
    aplicaciones?: AplicacionInsumoCreateNestedManyWithoutSiembraInput
    movimentos?: MovimientoFinancieroCreateNestedManyWithoutSiembraInput
    campania?: CampaniaCreateNestedOneWithoutSiembrasInput
  }

  export type SiembraUncheckedCreateWithoutTipoCultivoInput = {
    id?: number
    loteId: number
    fechaSiembra: Date | string
    densidad?: number | null
    observaciones?: string | null
    estado?: $Enums.EstadoSiembra
    createdAt?: Date | string
    updatedAt?: Date | string
    campaniaId?: number | null
    cosechas?: CosechaUncheckedCreateNestedManyWithoutSiembraInput
    aplicaciones?: AplicacionInsumoUncheckedCreateNestedManyWithoutSiembraInput
    movimentos?: MovimientoFinancieroUncheckedCreateNestedManyWithoutSiembraInput
  }

  export type SiembraCreateOrConnectWithoutTipoCultivoInput = {
    where: SiembraWhereUniqueInput
    create: XOR<SiembraCreateWithoutTipoCultivoInput, SiembraUncheckedCreateWithoutTipoCultivoInput>
  }

  export type SiembraCreateManyTipoCultivoInputEnvelope = {
    data: SiembraCreateManyTipoCultivoInput | SiembraCreateManyTipoCultivoInput[]
    skipDuplicates?: boolean
  }

  export type SiembraUpsertWithWhereUniqueWithoutTipoCultivoInput = {
    where: SiembraWhereUniqueInput
    update: XOR<SiembraUpdateWithoutTipoCultivoInput, SiembraUncheckedUpdateWithoutTipoCultivoInput>
    create: XOR<SiembraCreateWithoutTipoCultivoInput, SiembraUncheckedCreateWithoutTipoCultivoInput>
  }

  export type SiembraUpdateWithWhereUniqueWithoutTipoCultivoInput = {
    where: SiembraWhereUniqueInput
    data: XOR<SiembraUpdateWithoutTipoCultivoInput, SiembraUncheckedUpdateWithoutTipoCultivoInput>
  }

  export type SiembraUpdateManyWithWhereWithoutTipoCultivoInput = {
    where: SiembraScalarWhereInput
    data: XOR<SiembraUpdateManyMutationInput, SiembraUncheckedUpdateManyWithoutTipoCultivoInput>
  }

  export type LoteCreateWithoutSiembrasInput = {
    nombre: string
    hectareas: number
    createdAt?: Date | string
    updatedAt?: Date | string
    campo: CampoCreateNestedOneWithoutLotesInput
  }

  export type LoteUncheckedCreateWithoutSiembrasInput = {
    id?: number
    nombre: string
    hectareas: number
    campoId: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LoteCreateOrConnectWithoutSiembrasInput = {
    where: LoteWhereUniqueInput
    create: XOR<LoteCreateWithoutSiembrasInput, LoteUncheckedCreateWithoutSiembrasInput>
  }

  export type TipoCultivoCreateWithoutSiembrasInput = {
    nombre: string
    descripcion?: string | null
    createdAt?: Date | string
  }

  export type TipoCultivoUncheckedCreateWithoutSiembrasInput = {
    id?: number
    nombre: string
    descripcion?: string | null
    createdAt?: Date | string
  }

  export type TipoCultivoCreateOrConnectWithoutSiembrasInput = {
    where: TipoCultivoWhereUniqueInput
    create: XOR<TipoCultivoCreateWithoutSiembrasInput, TipoCultivoUncheckedCreateWithoutSiembrasInput>
  }

  export type CosechaCreateWithoutSiembraInput = {
    fechaCosecha: Date | string
    rendimientoKgHa: number
    totalKg: number
    humedad?: number | null
    observaciones?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CosechaUncheckedCreateWithoutSiembraInput = {
    id?: number
    fechaCosecha: Date | string
    rendimientoKgHa: number
    totalKg: number
    humedad?: number | null
    observaciones?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CosechaCreateOrConnectWithoutSiembraInput = {
    where: CosechaWhereUniqueInput
    create: XOR<CosechaCreateWithoutSiembraInput, CosechaUncheckedCreateWithoutSiembraInput>
  }

  export type CosechaCreateManySiembraInputEnvelope = {
    data: CosechaCreateManySiembraInput | CosechaCreateManySiembraInput[]
    skipDuplicates?: boolean
  }

  export type AplicacionInsumoCreateWithoutSiembraInput = {
    fecha: Date | string
    cantidad: number
    unidad: string
    observaciones?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    insumo: InsumoCreateNestedOneWithoutAplicacionesInput
  }

  export type AplicacionInsumoUncheckedCreateWithoutSiembraInput = {
    id?: number
    insumoId: number
    fecha: Date | string
    cantidad: number
    unidad: string
    observaciones?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AplicacionInsumoCreateOrConnectWithoutSiembraInput = {
    where: AplicacionInsumoWhereUniqueInput
    create: XOR<AplicacionInsumoCreateWithoutSiembraInput, AplicacionInsumoUncheckedCreateWithoutSiembraInput>
  }

  export type AplicacionInsumoCreateManySiembraInputEnvelope = {
    data: AplicacionInsumoCreateManySiembraInput | AplicacionInsumoCreateManySiembraInput[]
    skipDuplicates?: boolean
  }

  export type MovimientoFinancieroCreateWithoutSiembraInput = {
    tipo: $Enums.TipoMovimiento
    concepto: string
    monto: number
    fecha: Date | string
    categoria: $Enums.CategoriaMovimiento
    observaciones?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    usuario: UsuarioCreateNestedOneWithoutMovimientosInput
    campo?: CampoCreateNestedOneWithoutMovimentosInput
  }

  export type MovimientoFinancieroUncheckedCreateWithoutSiembraInput = {
    id?: number
    usuarioId: number
    tipo: $Enums.TipoMovimiento
    concepto: string
    monto: number
    fecha: Date | string
    categoria: $Enums.CategoriaMovimiento
    campoId?: number | null
    observaciones?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MovimientoFinancieroCreateOrConnectWithoutSiembraInput = {
    where: MovimientoFinancieroWhereUniqueInput
    create: XOR<MovimientoFinancieroCreateWithoutSiembraInput, MovimientoFinancieroUncheckedCreateWithoutSiembraInput>
  }

  export type MovimientoFinancieroCreateManySiembraInputEnvelope = {
    data: MovimientoFinancieroCreateManySiembraInput | MovimientoFinancieroCreateManySiembraInput[]
    skipDuplicates?: boolean
  }

  export type CampaniaCreateWithoutSiembrasInput = {
    nombre: string
    fechaInicio: Date | string
    fechaFin?: Date | string | null
    descripcion?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    usuario: UsuarioCreateNestedOneWithoutCampaniasInput
  }

  export type CampaniaUncheckedCreateWithoutSiembrasInput = {
    id?: number
    usuarioId: number
    nombre: string
    fechaInicio: Date | string
    fechaFin?: Date | string | null
    descripcion?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CampaniaCreateOrConnectWithoutSiembrasInput = {
    where: CampaniaWhereUniqueInput
    create: XOR<CampaniaCreateWithoutSiembrasInput, CampaniaUncheckedCreateWithoutSiembrasInput>
  }

  export type LoteUpsertWithoutSiembrasInput = {
    update: XOR<LoteUpdateWithoutSiembrasInput, LoteUncheckedUpdateWithoutSiembrasInput>
    create: XOR<LoteCreateWithoutSiembrasInput, LoteUncheckedCreateWithoutSiembrasInput>
    where?: LoteWhereInput
  }

  export type LoteUpdateToOneWithWhereWithoutSiembrasInput = {
    where?: LoteWhereInput
    data: XOR<LoteUpdateWithoutSiembrasInput, LoteUncheckedUpdateWithoutSiembrasInput>
  }

  export type LoteUpdateWithoutSiembrasInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    hectareas?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    campo?: CampoUpdateOneRequiredWithoutLotesNestedInput
  }

  export type LoteUncheckedUpdateWithoutSiembrasInput = {
    id?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    hectareas?: FloatFieldUpdateOperationsInput | number
    campoId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TipoCultivoUpsertWithoutSiembrasInput = {
    update: XOR<TipoCultivoUpdateWithoutSiembrasInput, TipoCultivoUncheckedUpdateWithoutSiembrasInput>
    create: XOR<TipoCultivoCreateWithoutSiembrasInput, TipoCultivoUncheckedCreateWithoutSiembrasInput>
    where?: TipoCultivoWhereInput
  }

  export type TipoCultivoUpdateToOneWithWhereWithoutSiembrasInput = {
    where?: TipoCultivoWhereInput
    data: XOR<TipoCultivoUpdateWithoutSiembrasInput, TipoCultivoUncheckedUpdateWithoutSiembrasInput>
  }

  export type TipoCultivoUpdateWithoutSiembrasInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TipoCultivoUncheckedUpdateWithoutSiembrasInput = {
    id?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CosechaUpsertWithWhereUniqueWithoutSiembraInput = {
    where: CosechaWhereUniqueInput
    update: XOR<CosechaUpdateWithoutSiembraInput, CosechaUncheckedUpdateWithoutSiembraInput>
    create: XOR<CosechaCreateWithoutSiembraInput, CosechaUncheckedCreateWithoutSiembraInput>
  }

  export type CosechaUpdateWithWhereUniqueWithoutSiembraInput = {
    where: CosechaWhereUniqueInput
    data: XOR<CosechaUpdateWithoutSiembraInput, CosechaUncheckedUpdateWithoutSiembraInput>
  }

  export type CosechaUpdateManyWithWhereWithoutSiembraInput = {
    where: CosechaScalarWhereInput
    data: XOR<CosechaUpdateManyMutationInput, CosechaUncheckedUpdateManyWithoutSiembraInput>
  }

  export type CosechaScalarWhereInput = {
    AND?: CosechaScalarWhereInput | CosechaScalarWhereInput[]
    OR?: CosechaScalarWhereInput[]
    NOT?: CosechaScalarWhereInput | CosechaScalarWhereInput[]
    id?: IntFilter<"Cosecha"> | number
    siembraId?: IntFilter<"Cosecha"> | number
    fechaCosecha?: DateTimeFilter<"Cosecha"> | Date | string
    rendimientoKgHa?: FloatFilter<"Cosecha"> | number
    totalKg?: FloatFilter<"Cosecha"> | number
    humedad?: FloatNullableFilter<"Cosecha"> | number | null
    observaciones?: StringNullableFilter<"Cosecha"> | string | null
    createdAt?: DateTimeFilter<"Cosecha"> | Date | string
    updatedAt?: DateTimeFilter<"Cosecha"> | Date | string
  }

  export type AplicacionInsumoUpsertWithWhereUniqueWithoutSiembraInput = {
    where: AplicacionInsumoWhereUniqueInput
    update: XOR<AplicacionInsumoUpdateWithoutSiembraInput, AplicacionInsumoUncheckedUpdateWithoutSiembraInput>
    create: XOR<AplicacionInsumoCreateWithoutSiembraInput, AplicacionInsumoUncheckedCreateWithoutSiembraInput>
  }

  export type AplicacionInsumoUpdateWithWhereUniqueWithoutSiembraInput = {
    where: AplicacionInsumoWhereUniqueInput
    data: XOR<AplicacionInsumoUpdateWithoutSiembraInput, AplicacionInsumoUncheckedUpdateWithoutSiembraInput>
  }

  export type AplicacionInsumoUpdateManyWithWhereWithoutSiembraInput = {
    where: AplicacionInsumoScalarWhereInput
    data: XOR<AplicacionInsumoUpdateManyMutationInput, AplicacionInsumoUncheckedUpdateManyWithoutSiembraInput>
  }

  export type AplicacionInsumoScalarWhereInput = {
    AND?: AplicacionInsumoScalarWhereInput | AplicacionInsumoScalarWhereInput[]
    OR?: AplicacionInsumoScalarWhereInput[]
    NOT?: AplicacionInsumoScalarWhereInput | AplicacionInsumoScalarWhereInput[]
    id?: IntFilter<"AplicacionInsumo"> | number
    siembraId?: IntFilter<"AplicacionInsumo"> | number
    insumoId?: IntFilter<"AplicacionInsumo"> | number
    fecha?: DateTimeFilter<"AplicacionInsumo"> | Date | string
    cantidad?: FloatFilter<"AplicacionInsumo"> | number
    unidad?: StringFilter<"AplicacionInsumo"> | string
    observaciones?: StringNullableFilter<"AplicacionInsumo"> | string | null
    createdAt?: DateTimeFilter<"AplicacionInsumo"> | Date | string
    updatedAt?: DateTimeFilter<"AplicacionInsumo"> | Date | string
  }

  export type MovimientoFinancieroUpsertWithWhereUniqueWithoutSiembraInput = {
    where: MovimientoFinancieroWhereUniqueInput
    update: XOR<MovimientoFinancieroUpdateWithoutSiembraInput, MovimientoFinancieroUncheckedUpdateWithoutSiembraInput>
    create: XOR<MovimientoFinancieroCreateWithoutSiembraInput, MovimientoFinancieroUncheckedCreateWithoutSiembraInput>
  }

  export type MovimientoFinancieroUpdateWithWhereUniqueWithoutSiembraInput = {
    where: MovimientoFinancieroWhereUniqueInput
    data: XOR<MovimientoFinancieroUpdateWithoutSiembraInput, MovimientoFinancieroUncheckedUpdateWithoutSiembraInput>
  }

  export type MovimientoFinancieroUpdateManyWithWhereWithoutSiembraInput = {
    where: MovimientoFinancieroScalarWhereInput
    data: XOR<MovimientoFinancieroUpdateManyMutationInput, MovimientoFinancieroUncheckedUpdateManyWithoutSiembraInput>
  }

  export type CampaniaUpsertWithoutSiembrasInput = {
    update: XOR<CampaniaUpdateWithoutSiembrasInput, CampaniaUncheckedUpdateWithoutSiembrasInput>
    create: XOR<CampaniaCreateWithoutSiembrasInput, CampaniaUncheckedCreateWithoutSiembrasInput>
    where?: CampaniaWhereInput
  }

  export type CampaniaUpdateToOneWithWhereWithoutSiembrasInput = {
    where?: CampaniaWhereInput
    data: XOR<CampaniaUpdateWithoutSiembrasInput, CampaniaUncheckedUpdateWithoutSiembrasInput>
  }

  export type CampaniaUpdateWithoutSiembrasInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    fechaInicio?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaFin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usuario?: UsuarioUpdateOneRequiredWithoutCampaniasNestedInput
  }

  export type CampaniaUncheckedUpdateWithoutSiembrasInput = {
    id?: IntFieldUpdateOperationsInput | number
    usuarioId?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    fechaInicio?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaFin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SiembraCreateWithoutCosechasInput = {
    fechaSiembra: Date | string
    densidad?: number | null
    observaciones?: string | null
    estado?: $Enums.EstadoSiembra
    createdAt?: Date | string
    updatedAt?: Date | string
    lote: LoteCreateNestedOneWithoutSiembrasInput
    tipoCultivo: TipoCultivoCreateNestedOneWithoutSiembrasInput
    aplicaciones?: AplicacionInsumoCreateNestedManyWithoutSiembraInput
    movimentos?: MovimientoFinancieroCreateNestedManyWithoutSiembraInput
    campania?: CampaniaCreateNestedOneWithoutSiembrasInput
  }

  export type SiembraUncheckedCreateWithoutCosechasInput = {
    id?: number
    loteId: number
    tipoCultivoId: number
    fechaSiembra: Date | string
    densidad?: number | null
    observaciones?: string | null
    estado?: $Enums.EstadoSiembra
    createdAt?: Date | string
    updatedAt?: Date | string
    campaniaId?: number | null
    aplicaciones?: AplicacionInsumoUncheckedCreateNestedManyWithoutSiembraInput
    movimentos?: MovimientoFinancieroUncheckedCreateNestedManyWithoutSiembraInput
  }

  export type SiembraCreateOrConnectWithoutCosechasInput = {
    where: SiembraWhereUniqueInput
    create: XOR<SiembraCreateWithoutCosechasInput, SiembraUncheckedCreateWithoutCosechasInput>
  }

  export type SiembraUpsertWithoutCosechasInput = {
    update: XOR<SiembraUpdateWithoutCosechasInput, SiembraUncheckedUpdateWithoutCosechasInput>
    create: XOR<SiembraCreateWithoutCosechasInput, SiembraUncheckedCreateWithoutCosechasInput>
    where?: SiembraWhereInput
  }

  export type SiembraUpdateToOneWithWhereWithoutCosechasInput = {
    where?: SiembraWhereInput
    data: XOR<SiembraUpdateWithoutCosechasInput, SiembraUncheckedUpdateWithoutCosechasInput>
  }

  export type SiembraUpdateWithoutCosechasInput = {
    fechaSiembra?: DateTimeFieldUpdateOperationsInput | Date | string
    densidad?: NullableFloatFieldUpdateOperationsInput | number | null
    observaciones?: NullableStringFieldUpdateOperationsInput | string | null
    estado?: EnumEstadoSiembraFieldUpdateOperationsInput | $Enums.EstadoSiembra
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lote?: LoteUpdateOneRequiredWithoutSiembrasNestedInput
    tipoCultivo?: TipoCultivoUpdateOneRequiredWithoutSiembrasNestedInput
    aplicaciones?: AplicacionInsumoUpdateManyWithoutSiembraNestedInput
    movimentos?: MovimientoFinancieroUpdateManyWithoutSiembraNestedInput
    campania?: CampaniaUpdateOneWithoutSiembrasNestedInput
  }

  export type SiembraUncheckedUpdateWithoutCosechasInput = {
    id?: IntFieldUpdateOperationsInput | number
    loteId?: IntFieldUpdateOperationsInput | number
    tipoCultivoId?: IntFieldUpdateOperationsInput | number
    fechaSiembra?: DateTimeFieldUpdateOperationsInput | Date | string
    densidad?: NullableFloatFieldUpdateOperationsInput | number | null
    observaciones?: NullableStringFieldUpdateOperationsInput | string | null
    estado?: EnumEstadoSiembraFieldUpdateOperationsInput | $Enums.EstadoSiembra
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    campaniaId?: NullableIntFieldUpdateOperationsInput | number | null
    aplicaciones?: AplicacionInsumoUncheckedUpdateManyWithoutSiembraNestedInput
    movimentos?: MovimientoFinancieroUncheckedUpdateManyWithoutSiembraNestedInput
  }

  export type AplicacionInsumoCreateWithoutInsumoInput = {
    fecha: Date | string
    cantidad: number
    unidad: string
    observaciones?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    siembra: SiembraCreateNestedOneWithoutAplicacionesInput
  }

  export type AplicacionInsumoUncheckedCreateWithoutInsumoInput = {
    id?: number
    siembraId: number
    fecha: Date | string
    cantidad: number
    unidad: string
    observaciones?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AplicacionInsumoCreateOrConnectWithoutInsumoInput = {
    where: AplicacionInsumoWhereUniqueInput
    create: XOR<AplicacionInsumoCreateWithoutInsumoInput, AplicacionInsumoUncheckedCreateWithoutInsumoInput>
  }

  export type AplicacionInsumoCreateManyInsumoInputEnvelope = {
    data: AplicacionInsumoCreateManyInsumoInput | AplicacionInsumoCreateManyInsumoInput[]
    skipDuplicates?: boolean
  }

  export type AplicacionInsumoUpsertWithWhereUniqueWithoutInsumoInput = {
    where: AplicacionInsumoWhereUniqueInput
    update: XOR<AplicacionInsumoUpdateWithoutInsumoInput, AplicacionInsumoUncheckedUpdateWithoutInsumoInput>
    create: XOR<AplicacionInsumoCreateWithoutInsumoInput, AplicacionInsumoUncheckedCreateWithoutInsumoInput>
  }

  export type AplicacionInsumoUpdateWithWhereUniqueWithoutInsumoInput = {
    where: AplicacionInsumoWhereUniqueInput
    data: XOR<AplicacionInsumoUpdateWithoutInsumoInput, AplicacionInsumoUncheckedUpdateWithoutInsumoInput>
  }

  export type AplicacionInsumoUpdateManyWithWhereWithoutInsumoInput = {
    where: AplicacionInsumoScalarWhereInput
    data: XOR<AplicacionInsumoUpdateManyMutationInput, AplicacionInsumoUncheckedUpdateManyWithoutInsumoInput>
  }

  export type SiembraCreateWithoutAplicacionesInput = {
    fechaSiembra: Date | string
    densidad?: number | null
    observaciones?: string | null
    estado?: $Enums.EstadoSiembra
    createdAt?: Date | string
    updatedAt?: Date | string
    lote: LoteCreateNestedOneWithoutSiembrasInput
    tipoCultivo: TipoCultivoCreateNestedOneWithoutSiembrasInput
    cosechas?: CosechaCreateNestedManyWithoutSiembraInput
    movimentos?: MovimientoFinancieroCreateNestedManyWithoutSiembraInput
    campania?: CampaniaCreateNestedOneWithoutSiembrasInput
  }

  export type SiembraUncheckedCreateWithoutAplicacionesInput = {
    id?: number
    loteId: number
    tipoCultivoId: number
    fechaSiembra: Date | string
    densidad?: number | null
    observaciones?: string | null
    estado?: $Enums.EstadoSiembra
    createdAt?: Date | string
    updatedAt?: Date | string
    campaniaId?: number | null
    cosechas?: CosechaUncheckedCreateNestedManyWithoutSiembraInput
    movimentos?: MovimientoFinancieroUncheckedCreateNestedManyWithoutSiembraInput
  }

  export type SiembraCreateOrConnectWithoutAplicacionesInput = {
    where: SiembraWhereUniqueInput
    create: XOR<SiembraCreateWithoutAplicacionesInput, SiembraUncheckedCreateWithoutAplicacionesInput>
  }

  export type InsumoCreateWithoutAplicacionesInput = {
    nombre: string
    tipo: $Enums.TipoInsumo
    unidad: string
    descripcion?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type InsumoUncheckedCreateWithoutAplicacionesInput = {
    id?: number
    nombre: string
    tipo: $Enums.TipoInsumo
    unidad: string
    descripcion?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type InsumoCreateOrConnectWithoutAplicacionesInput = {
    where: InsumoWhereUniqueInput
    create: XOR<InsumoCreateWithoutAplicacionesInput, InsumoUncheckedCreateWithoutAplicacionesInput>
  }

  export type SiembraUpsertWithoutAplicacionesInput = {
    update: XOR<SiembraUpdateWithoutAplicacionesInput, SiembraUncheckedUpdateWithoutAplicacionesInput>
    create: XOR<SiembraCreateWithoutAplicacionesInput, SiembraUncheckedCreateWithoutAplicacionesInput>
    where?: SiembraWhereInput
  }

  export type SiembraUpdateToOneWithWhereWithoutAplicacionesInput = {
    where?: SiembraWhereInput
    data: XOR<SiembraUpdateWithoutAplicacionesInput, SiembraUncheckedUpdateWithoutAplicacionesInput>
  }

  export type SiembraUpdateWithoutAplicacionesInput = {
    fechaSiembra?: DateTimeFieldUpdateOperationsInput | Date | string
    densidad?: NullableFloatFieldUpdateOperationsInput | number | null
    observaciones?: NullableStringFieldUpdateOperationsInput | string | null
    estado?: EnumEstadoSiembraFieldUpdateOperationsInput | $Enums.EstadoSiembra
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lote?: LoteUpdateOneRequiredWithoutSiembrasNestedInput
    tipoCultivo?: TipoCultivoUpdateOneRequiredWithoutSiembrasNestedInput
    cosechas?: CosechaUpdateManyWithoutSiembraNestedInput
    movimentos?: MovimientoFinancieroUpdateManyWithoutSiembraNestedInput
    campania?: CampaniaUpdateOneWithoutSiembrasNestedInput
  }

  export type SiembraUncheckedUpdateWithoutAplicacionesInput = {
    id?: IntFieldUpdateOperationsInput | number
    loteId?: IntFieldUpdateOperationsInput | number
    tipoCultivoId?: IntFieldUpdateOperationsInput | number
    fechaSiembra?: DateTimeFieldUpdateOperationsInput | Date | string
    densidad?: NullableFloatFieldUpdateOperationsInput | number | null
    observaciones?: NullableStringFieldUpdateOperationsInput | string | null
    estado?: EnumEstadoSiembraFieldUpdateOperationsInput | $Enums.EstadoSiembra
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    campaniaId?: NullableIntFieldUpdateOperationsInput | number | null
    cosechas?: CosechaUncheckedUpdateManyWithoutSiembraNestedInput
    movimentos?: MovimientoFinancieroUncheckedUpdateManyWithoutSiembraNestedInput
  }

  export type InsumoUpsertWithoutAplicacionesInput = {
    update: XOR<InsumoUpdateWithoutAplicacionesInput, InsumoUncheckedUpdateWithoutAplicacionesInput>
    create: XOR<InsumoCreateWithoutAplicacionesInput, InsumoUncheckedCreateWithoutAplicacionesInput>
    where?: InsumoWhereInput
  }

  export type InsumoUpdateToOneWithWhereWithoutAplicacionesInput = {
    where?: InsumoWhereInput
    data: XOR<InsumoUpdateWithoutAplicacionesInput, InsumoUncheckedUpdateWithoutAplicacionesInput>
  }

  export type InsumoUpdateWithoutAplicacionesInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    tipo?: EnumTipoInsumoFieldUpdateOperationsInput | $Enums.TipoInsumo
    unidad?: StringFieldUpdateOperationsInput | string
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InsumoUncheckedUpdateWithoutAplicacionesInput = {
    id?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    tipo?: EnumTipoInsumoFieldUpdateOperationsInput | $Enums.TipoInsumo
    unidad?: StringFieldUpdateOperationsInput | string
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UsuarioCreateWithoutAnimalesInput = {
    email: string
    nombre: string
    password: string
    rol?: $Enums.Rol
    plan?: $Enums.PlanTipo
    planExpira?: Date | string | null
    mpSuscripcionId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    resetToken?: string | null
    resetTokenExpiry?: Date | string | null
    campos?: CampoCreateNestedManyWithoutUsuarioInput
    tareas?: TareaRuralCreateNestedManyWithoutUsuarioInput
    movimientos?: MovimientoFinancieroCreateNestedManyWithoutUsuarioInput
    campanias?: CampaniaCreateNestedManyWithoutUsuarioInput
  }

  export type UsuarioUncheckedCreateWithoutAnimalesInput = {
    id?: number
    email: string
    nombre: string
    password: string
    rol?: $Enums.Rol
    plan?: $Enums.PlanTipo
    planExpira?: Date | string | null
    mpSuscripcionId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    resetToken?: string | null
    resetTokenExpiry?: Date | string | null
    campos?: CampoUncheckedCreateNestedManyWithoutUsuarioInput
    tareas?: TareaRuralUncheckedCreateNestedManyWithoutUsuarioInput
    movimientos?: MovimientoFinancieroUncheckedCreateNestedManyWithoutUsuarioInput
    campanias?: CampaniaUncheckedCreateNestedManyWithoutUsuarioInput
  }

  export type UsuarioCreateOrConnectWithoutAnimalesInput = {
    where: UsuarioWhereUniqueInput
    create: XOR<UsuarioCreateWithoutAnimalesInput, UsuarioUncheckedCreateWithoutAnimalesInput>
  }

  export type PrenezCreateWithoutAnimalInput = {
    fechaInicio: Date | string
    fechaEstimadaParto: Date | string
    estado?: $Enums.EstadoPrenez
    observaciones?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PrenezUncheckedCreateWithoutAnimalInput = {
    id?: number
    fechaInicio: Date | string
    fechaEstimadaParto: Date | string
    estado?: $Enums.EstadoPrenez
    observaciones?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PrenezCreateOrConnectWithoutAnimalInput = {
    where: PrenezWhereUniqueInput
    create: XOR<PrenezCreateWithoutAnimalInput, PrenezUncheckedCreateWithoutAnimalInput>
  }

  export type PrenezCreateManyAnimalInputEnvelope = {
    data: PrenezCreateManyAnimalInput | PrenezCreateManyAnimalInput[]
    skipDuplicates?: boolean
  }

  export type RegistroPesoCreateWithoutAnimalInput = {
    peso: number
    fecha: Date | string
    observaciones?: string | null
    createdAt?: Date | string
  }

  export type RegistroPesoUncheckedCreateWithoutAnimalInput = {
    id?: number
    peso: number
    fecha: Date | string
    observaciones?: string | null
    createdAt?: Date | string
  }

  export type RegistroPesoCreateOrConnectWithoutAnimalInput = {
    where: RegistroPesoWhereUniqueInput
    create: XOR<RegistroPesoCreateWithoutAnimalInput, RegistroPesoUncheckedCreateWithoutAnimalInput>
  }

  export type RegistroPesoCreateManyAnimalInputEnvelope = {
    data: RegistroPesoCreateManyAnimalInput | RegistroPesoCreateManyAnimalInput[]
    skipDuplicates?: boolean
  }

  export type UsuarioUpsertWithoutAnimalesInput = {
    update: XOR<UsuarioUpdateWithoutAnimalesInput, UsuarioUncheckedUpdateWithoutAnimalesInput>
    create: XOR<UsuarioCreateWithoutAnimalesInput, UsuarioUncheckedCreateWithoutAnimalesInput>
    where?: UsuarioWhereInput
  }

  export type UsuarioUpdateToOneWithWhereWithoutAnimalesInput = {
    where?: UsuarioWhereInput
    data: XOR<UsuarioUpdateWithoutAnimalesInput, UsuarioUncheckedUpdateWithoutAnimalesInput>
  }

  export type UsuarioUpdateWithoutAnimalesInput = {
    email?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    rol?: EnumRolFieldUpdateOperationsInput | $Enums.Rol
    plan?: EnumPlanTipoFieldUpdateOperationsInput | $Enums.PlanTipo
    planExpira?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    mpSuscripcionId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    campos?: CampoUpdateManyWithoutUsuarioNestedInput
    tareas?: TareaRuralUpdateManyWithoutUsuarioNestedInput
    movimientos?: MovimientoFinancieroUpdateManyWithoutUsuarioNestedInput
    campanias?: CampaniaUpdateManyWithoutUsuarioNestedInput
  }

  export type UsuarioUncheckedUpdateWithoutAnimalesInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    rol?: EnumRolFieldUpdateOperationsInput | $Enums.Rol
    plan?: EnumPlanTipoFieldUpdateOperationsInput | $Enums.PlanTipo
    planExpira?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    mpSuscripcionId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    campos?: CampoUncheckedUpdateManyWithoutUsuarioNestedInput
    tareas?: TareaRuralUncheckedUpdateManyWithoutUsuarioNestedInput
    movimientos?: MovimientoFinancieroUncheckedUpdateManyWithoutUsuarioNestedInput
    campanias?: CampaniaUncheckedUpdateManyWithoutUsuarioNestedInput
  }

  export type PrenezUpsertWithWhereUniqueWithoutAnimalInput = {
    where: PrenezWhereUniqueInput
    update: XOR<PrenezUpdateWithoutAnimalInput, PrenezUncheckedUpdateWithoutAnimalInput>
    create: XOR<PrenezCreateWithoutAnimalInput, PrenezUncheckedCreateWithoutAnimalInput>
  }

  export type PrenezUpdateWithWhereUniqueWithoutAnimalInput = {
    where: PrenezWhereUniqueInput
    data: XOR<PrenezUpdateWithoutAnimalInput, PrenezUncheckedUpdateWithoutAnimalInput>
  }

  export type PrenezUpdateManyWithWhereWithoutAnimalInput = {
    where: PrenezScalarWhereInput
    data: XOR<PrenezUpdateManyMutationInput, PrenezUncheckedUpdateManyWithoutAnimalInput>
  }

  export type PrenezScalarWhereInput = {
    AND?: PrenezScalarWhereInput | PrenezScalarWhereInput[]
    OR?: PrenezScalarWhereInput[]
    NOT?: PrenezScalarWhereInput | PrenezScalarWhereInput[]
    id?: IntFilter<"Prenez"> | number
    animalId?: IntFilter<"Prenez"> | number
    fechaInicio?: DateTimeFilter<"Prenez"> | Date | string
    fechaEstimadaParto?: DateTimeFilter<"Prenez"> | Date | string
    estado?: EnumEstadoPrenezFilter<"Prenez"> | $Enums.EstadoPrenez
    observaciones?: StringNullableFilter<"Prenez"> | string | null
    createdAt?: DateTimeFilter<"Prenez"> | Date | string
    updatedAt?: DateTimeFilter<"Prenez"> | Date | string
  }

  export type RegistroPesoUpsertWithWhereUniqueWithoutAnimalInput = {
    where: RegistroPesoWhereUniqueInput
    update: XOR<RegistroPesoUpdateWithoutAnimalInput, RegistroPesoUncheckedUpdateWithoutAnimalInput>
    create: XOR<RegistroPesoCreateWithoutAnimalInput, RegistroPesoUncheckedCreateWithoutAnimalInput>
  }

  export type RegistroPesoUpdateWithWhereUniqueWithoutAnimalInput = {
    where: RegistroPesoWhereUniqueInput
    data: XOR<RegistroPesoUpdateWithoutAnimalInput, RegistroPesoUncheckedUpdateWithoutAnimalInput>
  }

  export type RegistroPesoUpdateManyWithWhereWithoutAnimalInput = {
    where: RegistroPesoScalarWhereInput
    data: XOR<RegistroPesoUpdateManyMutationInput, RegistroPesoUncheckedUpdateManyWithoutAnimalInput>
  }

  export type RegistroPesoScalarWhereInput = {
    AND?: RegistroPesoScalarWhereInput | RegistroPesoScalarWhereInput[]
    OR?: RegistroPesoScalarWhereInput[]
    NOT?: RegistroPesoScalarWhereInput | RegistroPesoScalarWhereInput[]
    id?: IntFilter<"RegistroPeso"> | number
    animalId?: IntFilter<"RegistroPeso"> | number
    peso?: FloatFilter<"RegistroPeso"> | number
    fecha?: DateTimeFilter<"RegistroPeso"> | Date | string
    observaciones?: StringNullableFilter<"RegistroPeso"> | string | null
    createdAt?: DateTimeFilter<"RegistroPeso"> | Date | string
  }

  export type AnimalCreateWithoutPrenecesInput = {
    nombre: string
    especie: $Enums.Especie
    sexo: $Enums.Sexo
    categoria: $Enums.CategoriaAnimal
    peso?: number | null
    fechaNacimiento?: Date | string | null
    observaciones?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    usuario: UsuarioCreateNestedOneWithoutAnimalesInput
    pesos?: RegistroPesoCreateNestedManyWithoutAnimalInput
  }

  export type AnimalUncheckedCreateWithoutPrenecesInput = {
    id?: number
    usuarioId: number
    nombre: string
    especie: $Enums.Especie
    sexo: $Enums.Sexo
    categoria: $Enums.CategoriaAnimal
    peso?: number | null
    fechaNacimiento?: Date | string | null
    observaciones?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    pesos?: RegistroPesoUncheckedCreateNestedManyWithoutAnimalInput
  }

  export type AnimalCreateOrConnectWithoutPrenecesInput = {
    where: AnimalWhereUniqueInput
    create: XOR<AnimalCreateWithoutPrenecesInput, AnimalUncheckedCreateWithoutPrenecesInput>
  }

  export type AnimalUpsertWithoutPrenecesInput = {
    update: XOR<AnimalUpdateWithoutPrenecesInput, AnimalUncheckedUpdateWithoutPrenecesInput>
    create: XOR<AnimalCreateWithoutPrenecesInput, AnimalUncheckedCreateWithoutPrenecesInput>
    where?: AnimalWhereInput
  }

  export type AnimalUpdateToOneWithWhereWithoutPrenecesInput = {
    where?: AnimalWhereInput
    data: XOR<AnimalUpdateWithoutPrenecesInput, AnimalUncheckedUpdateWithoutPrenecesInput>
  }

  export type AnimalUpdateWithoutPrenecesInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    especie?: EnumEspecieFieldUpdateOperationsInput | $Enums.Especie
    sexo?: EnumSexoFieldUpdateOperationsInput | $Enums.Sexo
    categoria?: EnumCategoriaAnimalFieldUpdateOperationsInput | $Enums.CategoriaAnimal
    peso?: NullableFloatFieldUpdateOperationsInput | number | null
    fechaNacimiento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    observaciones?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usuario?: UsuarioUpdateOneRequiredWithoutAnimalesNestedInput
    pesos?: RegistroPesoUpdateManyWithoutAnimalNestedInput
  }

  export type AnimalUncheckedUpdateWithoutPrenecesInput = {
    id?: IntFieldUpdateOperationsInput | number
    usuarioId?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    especie?: EnumEspecieFieldUpdateOperationsInput | $Enums.Especie
    sexo?: EnumSexoFieldUpdateOperationsInput | $Enums.Sexo
    categoria?: EnumCategoriaAnimalFieldUpdateOperationsInput | $Enums.CategoriaAnimal
    peso?: NullableFloatFieldUpdateOperationsInput | number | null
    fechaNacimiento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    observaciones?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pesos?: RegistroPesoUncheckedUpdateManyWithoutAnimalNestedInput
  }

  export type UsuarioCreateWithoutTareasInput = {
    email: string
    nombre: string
    password: string
    rol?: $Enums.Rol
    plan?: $Enums.PlanTipo
    planExpira?: Date | string | null
    mpSuscripcionId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    resetToken?: string | null
    resetTokenExpiry?: Date | string | null
    campos?: CampoCreateNestedManyWithoutUsuarioInput
    animales?: AnimalCreateNestedManyWithoutUsuarioInput
    movimientos?: MovimientoFinancieroCreateNestedManyWithoutUsuarioInput
    campanias?: CampaniaCreateNestedManyWithoutUsuarioInput
  }

  export type UsuarioUncheckedCreateWithoutTareasInput = {
    id?: number
    email: string
    nombre: string
    password: string
    rol?: $Enums.Rol
    plan?: $Enums.PlanTipo
    planExpira?: Date | string | null
    mpSuscripcionId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    resetToken?: string | null
    resetTokenExpiry?: Date | string | null
    campos?: CampoUncheckedCreateNestedManyWithoutUsuarioInput
    animales?: AnimalUncheckedCreateNestedManyWithoutUsuarioInput
    movimientos?: MovimientoFinancieroUncheckedCreateNestedManyWithoutUsuarioInput
    campanias?: CampaniaUncheckedCreateNestedManyWithoutUsuarioInput
  }

  export type UsuarioCreateOrConnectWithoutTareasInput = {
    where: UsuarioWhereUniqueInput
    create: XOR<UsuarioCreateWithoutTareasInput, UsuarioUncheckedCreateWithoutTareasInput>
  }

  export type CampoCreateWithoutTareasInput = {
    nombre: string
    hectareas: number
    ubicacion?: string | null
    propietario?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    usuario: UsuarioCreateNestedOneWithoutCamposInput
    lotes?: LoteCreateNestedManyWithoutCampoInput
    movimentos?: MovimientoFinancieroCreateNestedManyWithoutCampoInput
  }

  export type CampoUncheckedCreateWithoutTareasInput = {
    id?: number
    nombre: string
    hectareas: number
    ubicacion?: string | null
    propietario?: string | null
    usuarioId: number
    createdAt?: Date | string
    updatedAt?: Date | string
    lotes?: LoteUncheckedCreateNestedManyWithoutCampoInput
    movimentos?: MovimientoFinancieroUncheckedCreateNestedManyWithoutCampoInput
  }

  export type CampoCreateOrConnectWithoutTareasInput = {
    where: CampoWhereUniqueInput
    create: XOR<CampoCreateWithoutTareasInput, CampoUncheckedCreateWithoutTareasInput>
  }

  export type UsuarioUpsertWithoutTareasInput = {
    update: XOR<UsuarioUpdateWithoutTareasInput, UsuarioUncheckedUpdateWithoutTareasInput>
    create: XOR<UsuarioCreateWithoutTareasInput, UsuarioUncheckedCreateWithoutTareasInput>
    where?: UsuarioWhereInput
  }

  export type UsuarioUpdateToOneWithWhereWithoutTareasInput = {
    where?: UsuarioWhereInput
    data: XOR<UsuarioUpdateWithoutTareasInput, UsuarioUncheckedUpdateWithoutTareasInput>
  }

  export type UsuarioUpdateWithoutTareasInput = {
    email?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    rol?: EnumRolFieldUpdateOperationsInput | $Enums.Rol
    plan?: EnumPlanTipoFieldUpdateOperationsInput | $Enums.PlanTipo
    planExpira?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    mpSuscripcionId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    campos?: CampoUpdateManyWithoutUsuarioNestedInput
    animales?: AnimalUpdateManyWithoutUsuarioNestedInput
    movimientos?: MovimientoFinancieroUpdateManyWithoutUsuarioNestedInput
    campanias?: CampaniaUpdateManyWithoutUsuarioNestedInput
  }

  export type UsuarioUncheckedUpdateWithoutTareasInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    rol?: EnumRolFieldUpdateOperationsInput | $Enums.Rol
    plan?: EnumPlanTipoFieldUpdateOperationsInput | $Enums.PlanTipo
    planExpira?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    mpSuscripcionId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    campos?: CampoUncheckedUpdateManyWithoutUsuarioNestedInput
    animales?: AnimalUncheckedUpdateManyWithoutUsuarioNestedInput
    movimientos?: MovimientoFinancieroUncheckedUpdateManyWithoutUsuarioNestedInput
    campanias?: CampaniaUncheckedUpdateManyWithoutUsuarioNestedInput
  }

  export type CampoUpsertWithoutTareasInput = {
    update: XOR<CampoUpdateWithoutTareasInput, CampoUncheckedUpdateWithoutTareasInput>
    create: XOR<CampoCreateWithoutTareasInput, CampoUncheckedCreateWithoutTareasInput>
    where?: CampoWhereInput
  }

  export type CampoUpdateToOneWithWhereWithoutTareasInput = {
    where?: CampoWhereInput
    data: XOR<CampoUpdateWithoutTareasInput, CampoUncheckedUpdateWithoutTareasInput>
  }

  export type CampoUpdateWithoutTareasInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    hectareas?: FloatFieldUpdateOperationsInput | number
    ubicacion?: NullableStringFieldUpdateOperationsInput | string | null
    propietario?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usuario?: UsuarioUpdateOneRequiredWithoutCamposNestedInput
    lotes?: LoteUpdateManyWithoutCampoNestedInput
    movimentos?: MovimientoFinancieroUpdateManyWithoutCampoNestedInput
  }

  export type CampoUncheckedUpdateWithoutTareasInput = {
    id?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    hectareas?: FloatFieldUpdateOperationsInput | number
    ubicacion?: NullableStringFieldUpdateOperationsInput | string | null
    propietario?: NullableStringFieldUpdateOperationsInput | string | null
    usuarioId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lotes?: LoteUncheckedUpdateManyWithoutCampoNestedInput
    movimentos?: MovimientoFinancieroUncheckedUpdateManyWithoutCampoNestedInput
  }

  export type UsuarioCreateWithoutMovimientosInput = {
    email: string
    nombre: string
    password: string
    rol?: $Enums.Rol
    plan?: $Enums.PlanTipo
    planExpira?: Date | string | null
    mpSuscripcionId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    resetToken?: string | null
    resetTokenExpiry?: Date | string | null
    campos?: CampoCreateNestedManyWithoutUsuarioInput
    animales?: AnimalCreateNestedManyWithoutUsuarioInput
    tareas?: TareaRuralCreateNestedManyWithoutUsuarioInput
    campanias?: CampaniaCreateNestedManyWithoutUsuarioInput
  }

  export type UsuarioUncheckedCreateWithoutMovimientosInput = {
    id?: number
    email: string
    nombre: string
    password: string
    rol?: $Enums.Rol
    plan?: $Enums.PlanTipo
    planExpira?: Date | string | null
    mpSuscripcionId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    resetToken?: string | null
    resetTokenExpiry?: Date | string | null
    campos?: CampoUncheckedCreateNestedManyWithoutUsuarioInput
    animales?: AnimalUncheckedCreateNestedManyWithoutUsuarioInput
    tareas?: TareaRuralUncheckedCreateNestedManyWithoutUsuarioInput
    campanias?: CampaniaUncheckedCreateNestedManyWithoutUsuarioInput
  }

  export type UsuarioCreateOrConnectWithoutMovimientosInput = {
    where: UsuarioWhereUniqueInput
    create: XOR<UsuarioCreateWithoutMovimientosInput, UsuarioUncheckedCreateWithoutMovimientosInput>
  }

  export type CampoCreateWithoutMovimentosInput = {
    nombre: string
    hectareas: number
    ubicacion?: string | null
    propietario?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    usuario: UsuarioCreateNestedOneWithoutCamposInput
    lotes?: LoteCreateNestedManyWithoutCampoInput
    tareas?: TareaRuralCreateNestedManyWithoutCampoInput
  }

  export type CampoUncheckedCreateWithoutMovimentosInput = {
    id?: number
    nombre: string
    hectareas: number
    ubicacion?: string | null
    propietario?: string | null
    usuarioId: number
    createdAt?: Date | string
    updatedAt?: Date | string
    lotes?: LoteUncheckedCreateNestedManyWithoutCampoInput
    tareas?: TareaRuralUncheckedCreateNestedManyWithoutCampoInput
  }

  export type CampoCreateOrConnectWithoutMovimentosInput = {
    where: CampoWhereUniqueInput
    create: XOR<CampoCreateWithoutMovimentosInput, CampoUncheckedCreateWithoutMovimentosInput>
  }

  export type SiembraCreateWithoutMovimentosInput = {
    fechaSiembra: Date | string
    densidad?: number | null
    observaciones?: string | null
    estado?: $Enums.EstadoSiembra
    createdAt?: Date | string
    updatedAt?: Date | string
    lote: LoteCreateNestedOneWithoutSiembrasInput
    tipoCultivo: TipoCultivoCreateNestedOneWithoutSiembrasInput
    cosechas?: CosechaCreateNestedManyWithoutSiembraInput
    aplicaciones?: AplicacionInsumoCreateNestedManyWithoutSiembraInput
    campania?: CampaniaCreateNestedOneWithoutSiembrasInput
  }

  export type SiembraUncheckedCreateWithoutMovimentosInput = {
    id?: number
    loteId: number
    tipoCultivoId: number
    fechaSiembra: Date | string
    densidad?: number | null
    observaciones?: string | null
    estado?: $Enums.EstadoSiembra
    createdAt?: Date | string
    updatedAt?: Date | string
    campaniaId?: number | null
    cosechas?: CosechaUncheckedCreateNestedManyWithoutSiembraInput
    aplicaciones?: AplicacionInsumoUncheckedCreateNestedManyWithoutSiembraInput
  }

  export type SiembraCreateOrConnectWithoutMovimentosInput = {
    where: SiembraWhereUniqueInput
    create: XOR<SiembraCreateWithoutMovimentosInput, SiembraUncheckedCreateWithoutMovimentosInput>
  }

  export type UsuarioUpsertWithoutMovimientosInput = {
    update: XOR<UsuarioUpdateWithoutMovimientosInput, UsuarioUncheckedUpdateWithoutMovimientosInput>
    create: XOR<UsuarioCreateWithoutMovimientosInput, UsuarioUncheckedCreateWithoutMovimientosInput>
    where?: UsuarioWhereInput
  }

  export type UsuarioUpdateToOneWithWhereWithoutMovimientosInput = {
    where?: UsuarioWhereInput
    data: XOR<UsuarioUpdateWithoutMovimientosInput, UsuarioUncheckedUpdateWithoutMovimientosInput>
  }

  export type UsuarioUpdateWithoutMovimientosInput = {
    email?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    rol?: EnumRolFieldUpdateOperationsInput | $Enums.Rol
    plan?: EnumPlanTipoFieldUpdateOperationsInput | $Enums.PlanTipo
    planExpira?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    mpSuscripcionId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    campos?: CampoUpdateManyWithoutUsuarioNestedInput
    animales?: AnimalUpdateManyWithoutUsuarioNestedInput
    tareas?: TareaRuralUpdateManyWithoutUsuarioNestedInput
    campanias?: CampaniaUpdateManyWithoutUsuarioNestedInput
  }

  export type UsuarioUncheckedUpdateWithoutMovimientosInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    rol?: EnumRolFieldUpdateOperationsInput | $Enums.Rol
    plan?: EnumPlanTipoFieldUpdateOperationsInput | $Enums.PlanTipo
    planExpira?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    mpSuscripcionId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    campos?: CampoUncheckedUpdateManyWithoutUsuarioNestedInput
    animales?: AnimalUncheckedUpdateManyWithoutUsuarioNestedInput
    tareas?: TareaRuralUncheckedUpdateManyWithoutUsuarioNestedInput
    campanias?: CampaniaUncheckedUpdateManyWithoutUsuarioNestedInput
  }

  export type CampoUpsertWithoutMovimentosInput = {
    update: XOR<CampoUpdateWithoutMovimentosInput, CampoUncheckedUpdateWithoutMovimentosInput>
    create: XOR<CampoCreateWithoutMovimentosInput, CampoUncheckedCreateWithoutMovimentosInput>
    where?: CampoWhereInput
  }

  export type CampoUpdateToOneWithWhereWithoutMovimentosInput = {
    where?: CampoWhereInput
    data: XOR<CampoUpdateWithoutMovimentosInput, CampoUncheckedUpdateWithoutMovimentosInput>
  }

  export type CampoUpdateWithoutMovimentosInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    hectareas?: FloatFieldUpdateOperationsInput | number
    ubicacion?: NullableStringFieldUpdateOperationsInput | string | null
    propietario?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usuario?: UsuarioUpdateOneRequiredWithoutCamposNestedInput
    lotes?: LoteUpdateManyWithoutCampoNestedInput
    tareas?: TareaRuralUpdateManyWithoutCampoNestedInput
  }

  export type CampoUncheckedUpdateWithoutMovimentosInput = {
    id?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    hectareas?: FloatFieldUpdateOperationsInput | number
    ubicacion?: NullableStringFieldUpdateOperationsInput | string | null
    propietario?: NullableStringFieldUpdateOperationsInput | string | null
    usuarioId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lotes?: LoteUncheckedUpdateManyWithoutCampoNestedInput
    tareas?: TareaRuralUncheckedUpdateManyWithoutCampoNestedInput
  }

  export type SiembraUpsertWithoutMovimentosInput = {
    update: XOR<SiembraUpdateWithoutMovimentosInput, SiembraUncheckedUpdateWithoutMovimentosInput>
    create: XOR<SiembraCreateWithoutMovimentosInput, SiembraUncheckedCreateWithoutMovimentosInput>
    where?: SiembraWhereInput
  }

  export type SiembraUpdateToOneWithWhereWithoutMovimentosInput = {
    where?: SiembraWhereInput
    data: XOR<SiembraUpdateWithoutMovimentosInput, SiembraUncheckedUpdateWithoutMovimentosInput>
  }

  export type SiembraUpdateWithoutMovimentosInput = {
    fechaSiembra?: DateTimeFieldUpdateOperationsInput | Date | string
    densidad?: NullableFloatFieldUpdateOperationsInput | number | null
    observaciones?: NullableStringFieldUpdateOperationsInput | string | null
    estado?: EnumEstadoSiembraFieldUpdateOperationsInput | $Enums.EstadoSiembra
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lote?: LoteUpdateOneRequiredWithoutSiembrasNestedInput
    tipoCultivo?: TipoCultivoUpdateOneRequiredWithoutSiembrasNestedInput
    cosechas?: CosechaUpdateManyWithoutSiembraNestedInput
    aplicaciones?: AplicacionInsumoUpdateManyWithoutSiembraNestedInput
    campania?: CampaniaUpdateOneWithoutSiembrasNestedInput
  }

  export type SiembraUncheckedUpdateWithoutMovimentosInput = {
    id?: IntFieldUpdateOperationsInput | number
    loteId?: IntFieldUpdateOperationsInput | number
    tipoCultivoId?: IntFieldUpdateOperationsInput | number
    fechaSiembra?: DateTimeFieldUpdateOperationsInput | Date | string
    densidad?: NullableFloatFieldUpdateOperationsInput | number | null
    observaciones?: NullableStringFieldUpdateOperationsInput | string | null
    estado?: EnumEstadoSiembraFieldUpdateOperationsInput | $Enums.EstadoSiembra
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    campaniaId?: NullableIntFieldUpdateOperationsInput | number | null
    cosechas?: CosechaUncheckedUpdateManyWithoutSiembraNestedInput
    aplicaciones?: AplicacionInsumoUncheckedUpdateManyWithoutSiembraNestedInput
  }

  export type UsuarioCreateWithoutCampaniasInput = {
    email: string
    nombre: string
    password: string
    rol?: $Enums.Rol
    plan?: $Enums.PlanTipo
    planExpira?: Date | string | null
    mpSuscripcionId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    resetToken?: string | null
    resetTokenExpiry?: Date | string | null
    campos?: CampoCreateNestedManyWithoutUsuarioInput
    animales?: AnimalCreateNestedManyWithoutUsuarioInput
    tareas?: TareaRuralCreateNestedManyWithoutUsuarioInput
    movimientos?: MovimientoFinancieroCreateNestedManyWithoutUsuarioInput
  }

  export type UsuarioUncheckedCreateWithoutCampaniasInput = {
    id?: number
    email: string
    nombre: string
    password: string
    rol?: $Enums.Rol
    plan?: $Enums.PlanTipo
    planExpira?: Date | string | null
    mpSuscripcionId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    resetToken?: string | null
    resetTokenExpiry?: Date | string | null
    campos?: CampoUncheckedCreateNestedManyWithoutUsuarioInput
    animales?: AnimalUncheckedCreateNestedManyWithoutUsuarioInput
    tareas?: TareaRuralUncheckedCreateNestedManyWithoutUsuarioInput
    movimientos?: MovimientoFinancieroUncheckedCreateNestedManyWithoutUsuarioInput
  }

  export type UsuarioCreateOrConnectWithoutCampaniasInput = {
    where: UsuarioWhereUniqueInput
    create: XOR<UsuarioCreateWithoutCampaniasInput, UsuarioUncheckedCreateWithoutCampaniasInput>
  }

  export type SiembraCreateWithoutCampaniaInput = {
    fechaSiembra: Date | string
    densidad?: number | null
    observaciones?: string | null
    estado?: $Enums.EstadoSiembra
    createdAt?: Date | string
    updatedAt?: Date | string
    lote: LoteCreateNestedOneWithoutSiembrasInput
    tipoCultivo: TipoCultivoCreateNestedOneWithoutSiembrasInput
    cosechas?: CosechaCreateNestedManyWithoutSiembraInput
    aplicaciones?: AplicacionInsumoCreateNestedManyWithoutSiembraInput
    movimentos?: MovimientoFinancieroCreateNestedManyWithoutSiembraInput
  }

  export type SiembraUncheckedCreateWithoutCampaniaInput = {
    id?: number
    loteId: number
    tipoCultivoId: number
    fechaSiembra: Date | string
    densidad?: number | null
    observaciones?: string | null
    estado?: $Enums.EstadoSiembra
    createdAt?: Date | string
    updatedAt?: Date | string
    cosechas?: CosechaUncheckedCreateNestedManyWithoutSiembraInput
    aplicaciones?: AplicacionInsumoUncheckedCreateNestedManyWithoutSiembraInput
    movimentos?: MovimientoFinancieroUncheckedCreateNestedManyWithoutSiembraInput
  }

  export type SiembraCreateOrConnectWithoutCampaniaInput = {
    where: SiembraWhereUniqueInput
    create: XOR<SiembraCreateWithoutCampaniaInput, SiembraUncheckedCreateWithoutCampaniaInput>
  }

  export type SiembraCreateManyCampaniaInputEnvelope = {
    data: SiembraCreateManyCampaniaInput | SiembraCreateManyCampaniaInput[]
    skipDuplicates?: boolean
  }

  export type UsuarioUpsertWithoutCampaniasInput = {
    update: XOR<UsuarioUpdateWithoutCampaniasInput, UsuarioUncheckedUpdateWithoutCampaniasInput>
    create: XOR<UsuarioCreateWithoutCampaniasInput, UsuarioUncheckedCreateWithoutCampaniasInput>
    where?: UsuarioWhereInput
  }

  export type UsuarioUpdateToOneWithWhereWithoutCampaniasInput = {
    where?: UsuarioWhereInput
    data: XOR<UsuarioUpdateWithoutCampaniasInput, UsuarioUncheckedUpdateWithoutCampaniasInput>
  }

  export type UsuarioUpdateWithoutCampaniasInput = {
    email?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    rol?: EnumRolFieldUpdateOperationsInput | $Enums.Rol
    plan?: EnumPlanTipoFieldUpdateOperationsInput | $Enums.PlanTipo
    planExpira?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    mpSuscripcionId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    campos?: CampoUpdateManyWithoutUsuarioNestedInput
    animales?: AnimalUpdateManyWithoutUsuarioNestedInput
    tareas?: TareaRuralUpdateManyWithoutUsuarioNestedInput
    movimientos?: MovimientoFinancieroUpdateManyWithoutUsuarioNestedInput
  }

  export type UsuarioUncheckedUpdateWithoutCampaniasInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    rol?: EnumRolFieldUpdateOperationsInput | $Enums.Rol
    plan?: EnumPlanTipoFieldUpdateOperationsInput | $Enums.PlanTipo
    planExpira?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    mpSuscripcionId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    campos?: CampoUncheckedUpdateManyWithoutUsuarioNestedInput
    animales?: AnimalUncheckedUpdateManyWithoutUsuarioNestedInput
    tareas?: TareaRuralUncheckedUpdateManyWithoutUsuarioNestedInput
    movimientos?: MovimientoFinancieroUncheckedUpdateManyWithoutUsuarioNestedInput
  }

  export type SiembraUpsertWithWhereUniqueWithoutCampaniaInput = {
    where: SiembraWhereUniqueInput
    update: XOR<SiembraUpdateWithoutCampaniaInput, SiembraUncheckedUpdateWithoutCampaniaInput>
    create: XOR<SiembraCreateWithoutCampaniaInput, SiembraUncheckedCreateWithoutCampaniaInput>
  }

  export type SiembraUpdateWithWhereUniqueWithoutCampaniaInput = {
    where: SiembraWhereUniqueInput
    data: XOR<SiembraUpdateWithoutCampaniaInput, SiembraUncheckedUpdateWithoutCampaniaInput>
  }

  export type SiembraUpdateManyWithWhereWithoutCampaniaInput = {
    where: SiembraScalarWhereInput
    data: XOR<SiembraUpdateManyMutationInput, SiembraUncheckedUpdateManyWithoutCampaniaInput>
  }

  export type AnimalCreateWithoutPesosInput = {
    nombre: string
    especie: $Enums.Especie
    sexo: $Enums.Sexo
    categoria: $Enums.CategoriaAnimal
    peso?: number | null
    fechaNacimiento?: Date | string | null
    observaciones?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    usuario: UsuarioCreateNestedOneWithoutAnimalesInput
    preneces?: PrenezCreateNestedManyWithoutAnimalInput
  }

  export type AnimalUncheckedCreateWithoutPesosInput = {
    id?: number
    usuarioId: number
    nombre: string
    especie: $Enums.Especie
    sexo: $Enums.Sexo
    categoria: $Enums.CategoriaAnimal
    peso?: number | null
    fechaNacimiento?: Date | string | null
    observaciones?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    preneces?: PrenezUncheckedCreateNestedManyWithoutAnimalInput
  }

  export type AnimalCreateOrConnectWithoutPesosInput = {
    where: AnimalWhereUniqueInput
    create: XOR<AnimalCreateWithoutPesosInput, AnimalUncheckedCreateWithoutPesosInput>
  }

  export type AnimalUpsertWithoutPesosInput = {
    update: XOR<AnimalUpdateWithoutPesosInput, AnimalUncheckedUpdateWithoutPesosInput>
    create: XOR<AnimalCreateWithoutPesosInput, AnimalUncheckedCreateWithoutPesosInput>
    where?: AnimalWhereInput
  }

  export type AnimalUpdateToOneWithWhereWithoutPesosInput = {
    where?: AnimalWhereInput
    data: XOR<AnimalUpdateWithoutPesosInput, AnimalUncheckedUpdateWithoutPesosInput>
  }

  export type AnimalUpdateWithoutPesosInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    especie?: EnumEspecieFieldUpdateOperationsInput | $Enums.Especie
    sexo?: EnumSexoFieldUpdateOperationsInput | $Enums.Sexo
    categoria?: EnumCategoriaAnimalFieldUpdateOperationsInput | $Enums.CategoriaAnimal
    peso?: NullableFloatFieldUpdateOperationsInput | number | null
    fechaNacimiento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    observaciones?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usuario?: UsuarioUpdateOneRequiredWithoutAnimalesNestedInput
    preneces?: PrenezUpdateManyWithoutAnimalNestedInput
  }

  export type AnimalUncheckedUpdateWithoutPesosInput = {
    id?: IntFieldUpdateOperationsInput | number
    usuarioId?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    especie?: EnumEspecieFieldUpdateOperationsInput | $Enums.Especie
    sexo?: EnumSexoFieldUpdateOperationsInput | $Enums.Sexo
    categoria?: EnumCategoriaAnimalFieldUpdateOperationsInput | $Enums.CategoriaAnimal
    peso?: NullableFloatFieldUpdateOperationsInput | number | null
    fechaNacimiento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    observaciones?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    preneces?: PrenezUncheckedUpdateManyWithoutAnimalNestedInput
  }

  export type CampoCreateManyUsuarioInput = {
    id?: number
    nombre: string
    hectareas: number
    ubicacion?: string | null
    propietario?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AnimalCreateManyUsuarioInput = {
    id?: number
    nombre: string
    especie: $Enums.Especie
    sexo: $Enums.Sexo
    categoria: $Enums.CategoriaAnimal
    peso?: number | null
    fechaNacimiento?: Date | string | null
    observaciones?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TareaRuralCreateManyUsuarioInput = {
    id?: number
    titulo: string
    descripcion?: string | null
    tipo: $Enums.TipoTarea
    estado?: $Enums.EstadoTarea
    prioridad?: $Enums.Prioridad
    fechaProgramada: Date | string
    fechaCompletada?: Date | string | null
    campoId?: number | null
    observaciones?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MovimientoFinancieroCreateManyUsuarioInput = {
    id?: number
    tipo: $Enums.TipoMovimiento
    concepto: string
    monto: number
    fecha: Date | string
    categoria: $Enums.CategoriaMovimiento
    campoId?: number | null
    siembraId?: number | null
    observaciones?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CampaniaCreateManyUsuarioInput = {
    id?: number
    nombre: string
    fechaInicio: Date | string
    fechaFin?: Date | string | null
    descripcion?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CampoUpdateWithoutUsuarioInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    hectareas?: FloatFieldUpdateOperationsInput | number
    ubicacion?: NullableStringFieldUpdateOperationsInput | string | null
    propietario?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lotes?: LoteUpdateManyWithoutCampoNestedInput
    tareas?: TareaRuralUpdateManyWithoutCampoNestedInput
    movimentos?: MovimientoFinancieroUpdateManyWithoutCampoNestedInput
  }

  export type CampoUncheckedUpdateWithoutUsuarioInput = {
    id?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    hectareas?: FloatFieldUpdateOperationsInput | number
    ubicacion?: NullableStringFieldUpdateOperationsInput | string | null
    propietario?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lotes?: LoteUncheckedUpdateManyWithoutCampoNestedInput
    tareas?: TareaRuralUncheckedUpdateManyWithoutCampoNestedInput
    movimentos?: MovimientoFinancieroUncheckedUpdateManyWithoutCampoNestedInput
  }

  export type CampoUncheckedUpdateManyWithoutUsuarioInput = {
    id?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    hectareas?: FloatFieldUpdateOperationsInput | number
    ubicacion?: NullableStringFieldUpdateOperationsInput | string | null
    propietario?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AnimalUpdateWithoutUsuarioInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    especie?: EnumEspecieFieldUpdateOperationsInput | $Enums.Especie
    sexo?: EnumSexoFieldUpdateOperationsInput | $Enums.Sexo
    categoria?: EnumCategoriaAnimalFieldUpdateOperationsInput | $Enums.CategoriaAnimal
    peso?: NullableFloatFieldUpdateOperationsInput | number | null
    fechaNacimiento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    observaciones?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    preneces?: PrenezUpdateManyWithoutAnimalNestedInput
    pesos?: RegistroPesoUpdateManyWithoutAnimalNestedInput
  }

  export type AnimalUncheckedUpdateWithoutUsuarioInput = {
    id?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    especie?: EnumEspecieFieldUpdateOperationsInput | $Enums.Especie
    sexo?: EnumSexoFieldUpdateOperationsInput | $Enums.Sexo
    categoria?: EnumCategoriaAnimalFieldUpdateOperationsInput | $Enums.CategoriaAnimal
    peso?: NullableFloatFieldUpdateOperationsInput | number | null
    fechaNacimiento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    observaciones?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    preneces?: PrenezUncheckedUpdateManyWithoutAnimalNestedInput
    pesos?: RegistroPesoUncheckedUpdateManyWithoutAnimalNestedInput
  }

  export type AnimalUncheckedUpdateManyWithoutUsuarioInput = {
    id?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    especie?: EnumEspecieFieldUpdateOperationsInput | $Enums.Especie
    sexo?: EnumSexoFieldUpdateOperationsInput | $Enums.Sexo
    categoria?: EnumCategoriaAnimalFieldUpdateOperationsInput | $Enums.CategoriaAnimal
    peso?: NullableFloatFieldUpdateOperationsInput | number | null
    fechaNacimiento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    observaciones?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TareaRuralUpdateWithoutUsuarioInput = {
    titulo?: StringFieldUpdateOperationsInput | string
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    tipo?: EnumTipoTareaFieldUpdateOperationsInput | $Enums.TipoTarea
    estado?: EnumEstadoTareaFieldUpdateOperationsInput | $Enums.EstadoTarea
    prioridad?: EnumPrioridadFieldUpdateOperationsInput | $Enums.Prioridad
    fechaProgramada?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaCompletada?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    observaciones?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    campo?: CampoUpdateOneWithoutTareasNestedInput
  }

  export type TareaRuralUncheckedUpdateWithoutUsuarioInput = {
    id?: IntFieldUpdateOperationsInput | number
    titulo?: StringFieldUpdateOperationsInput | string
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    tipo?: EnumTipoTareaFieldUpdateOperationsInput | $Enums.TipoTarea
    estado?: EnumEstadoTareaFieldUpdateOperationsInput | $Enums.EstadoTarea
    prioridad?: EnumPrioridadFieldUpdateOperationsInput | $Enums.Prioridad
    fechaProgramada?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaCompletada?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    campoId?: NullableIntFieldUpdateOperationsInput | number | null
    observaciones?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TareaRuralUncheckedUpdateManyWithoutUsuarioInput = {
    id?: IntFieldUpdateOperationsInput | number
    titulo?: StringFieldUpdateOperationsInput | string
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    tipo?: EnumTipoTareaFieldUpdateOperationsInput | $Enums.TipoTarea
    estado?: EnumEstadoTareaFieldUpdateOperationsInput | $Enums.EstadoTarea
    prioridad?: EnumPrioridadFieldUpdateOperationsInput | $Enums.Prioridad
    fechaProgramada?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaCompletada?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    campoId?: NullableIntFieldUpdateOperationsInput | number | null
    observaciones?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MovimientoFinancieroUpdateWithoutUsuarioInput = {
    tipo?: EnumTipoMovimientoFieldUpdateOperationsInput | $Enums.TipoMovimiento
    concepto?: StringFieldUpdateOperationsInput | string
    monto?: FloatFieldUpdateOperationsInput | number
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    categoria?: EnumCategoriaMovimientoFieldUpdateOperationsInput | $Enums.CategoriaMovimiento
    observaciones?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    campo?: CampoUpdateOneWithoutMovimentosNestedInput
    siembra?: SiembraUpdateOneWithoutMovimentosNestedInput
  }

  export type MovimientoFinancieroUncheckedUpdateWithoutUsuarioInput = {
    id?: IntFieldUpdateOperationsInput | number
    tipo?: EnumTipoMovimientoFieldUpdateOperationsInput | $Enums.TipoMovimiento
    concepto?: StringFieldUpdateOperationsInput | string
    monto?: FloatFieldUpdateOperationsInput | number
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    categoria?: EnumCategoriaMovimientoFieldUpdateOperationsInput | $Enums.CategoriaMovimiento
    campoId?: NullableIntFieldUpdateOperationsInput | number | null
    siembraId?: NullableIntFieldUpdateOperationsInput | number | null
    observaciones?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MovimientoFinancieroUncheckedUpdateManyWithoutUsuarioInput = {
    id?: IntFieldUpdateOperationsInput | number
    tipo?: EnumTipoMovimientoFieldUpdateOperationsInput | $Enums.TipoMovimiento
    concepto?: StringFieldUpdateOperationsInput | string
    monto?: FloatFieldUpdateOperationsInput | number
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    categoria?: EnumCategoriaMovimientoFieldUpdateOperationsInput | $Enums.CategoriaMovimiento
    campoId?: NullableIntFieldUpdateOperationsInput | number | null
    siembraId?: NullableIntFieldUpdateOperationsInput | number | null
    observaciones?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CampaniaUpdateWithoutUsuarioInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    fechaInicio?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaFin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    siembras?: SiembraUpdateManyWithoutCampaniaNestedInput
  }

  export type CampaniaUncheckedUpdateWithoutUsuarioInput = {
    id?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    fechaInicio?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaFin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    siembras?: SiembraUncheckedUpdateManyWithoutCampaniaNestedInput
  }

  export type CampaniaUncheckedUpdateManyWithoutUsuarioInput = {
    id?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    fechaInicio?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaFin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LoteCreateManyCampoInput = {
    id?: number
    nombre: string
    hectareas: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TareaRuralCreateManyCampoInput = {
    id?: number
    usuarioId: number
    titulo: string
    descripcion?: string | null
    tipo: $Enums.TipoTarea
    estado?: $Enums.EstadoTarea
    prioridad?: $Enums.Prioridad
    fechaProgramada: Date | string
    fechaCompletada?: Date | string | null
    observaciones?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MovimientoFinancieroCreateManyCampoInput = {
    id?: number
    usuarioId: number
    tipo: $Enums.TipoMovimiento
    concepto: string
    monto: number
    fecha: Date | string
    categoria: $Enums.CategoriaMovimiento
    siembraId?: number | null
    observaciones?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LoteUpdateWithoutCampoInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    hectareas?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    siembras?: SiembraUpdateManyWithoutLoteNestedInput
  }

  export type LoteUncheckedUpdateWithoutCampoInput = {
    id?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    hectareas?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    siembras?: SiembraUncheckedUpdateManyWithoutLoteNestedInput
  }

  export type LoteUncheckedUpdateManyWithoutCampoInput = {
    id?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    hectareas?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TareaRuralUpdateWithoutCampoInput = {
    titulo?: StringFieldUpdateOperationsInput | string
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    tipo?: EnumTipoTareaFieldUpdateOperationsInput | $Enums.TipoTarea
    estado?: EnumEstadoTareaFieldUpdateOperationsInput | $Enums.EstadoTarea
    prioridad?: EnumPrioridadFieldUpdateOperationsInput | $Enums.Prioridad
    fechaProgramada?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaCompletada?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    observaciones?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usuario?: UsuarioUpdateOneRequiredWithoutTareasNestedInput
  }

  export type TareaRuralUncheckedUpdateWithoutCampoInput = {
    id?: IntFieldUpdateOperationsInput | number
    usuarioId?: IntFieldUpdateOperationsInput | number
    titulo?: StringFieldUpdateOperationsInput | string
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    tipo?: EnumTipoTareaFieldUpdateOperationsInput | $Enums.TipoTarea
    estado?: EnumEstadoTareaFieldUpdateOperationsInput | $Enums.EstadoTarea
    prioridad?: EnumPrioridadFieldUpdateOperationsInput | $Enums.Prioridad
    fechaProgramada?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaCompletada?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    observaciones?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TareaRuralUncheckedUpdateManyWithoutCampoInput = {
    id?: IntFieldUpdateOperationsInput | number
    usuarioId?: IntFieldUpdateOperationsInput | number
    titulo?: StringFieldUpdateOperationsInput | string
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    tipo?: EnumTipoTareaFieldUpdateOperationsInput | $Enums.TipoTarea
    estado?: EnumEstadoTareaFieldUpdateOperationsInput | $Enums.EstadoTarea
    prioridad?: EnumPrioridadFieldUpdateOperationsInput | $Enums.Prioridad
    fechaProgramada?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaCompletada?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    observaciones?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MovimientoFinancieroUpdateWithoutCampoInput = {
    tipo?: EnumTipoMovimientoFieldUpdateOperationsInput | $Enums.TipoMovimiento
    concepto?: StringFieldUpdateOperationsInput | string
    monto?: FloatFieldUpdateOperationsInput | number
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    categoria?: EnumCategoriaMovimientoFieldUpdateOperationsInput | $Enums.CategoriaMovimiento
    observaciones?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usuario?: UsuarioUpdateOneRequiredWithoutMovimientosNestedInput
    siembra?: SiembraUpdateOneWithoutMovimentosNestedInput
  }

  export type MovimientoFinancieroUncheckedUpdateWithoutCampoInput = {
    id?: IntFieldUpdateOperationsInput | number
    usuarioId?: IntFieldUpdateOperationsInput | number
    tipo?: EnumTipoMovimientoFieldUpdateOperationsInput | $Enums.TipoMovimiento
    concepto?: StringFieldUpdateOperationsInput | string
    monto?: FloatFieldUpdateOperationsInput | number
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    categoria?: EnumCategoriaMovimientoFieldUpdateOperationsInput | $Enums.CategoriaMovimiento
    siembraId?: NullableIntFieldUpdateOperationsInput | number | null
    observaciones?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MovimientoFinancieroUncheckedUpdateManyWithoutCampoInput = {
    id?: IntFieldUpdateOperationsInput | number
    usuarioId?: IntFieldUpdateOperationsInput | number
    tipo?: EnumTipoMovimientoFieldUpdateOperationsInput | $Enums.TipoMovimiento
    concepto?: StringFieldUpdateOperationsInput | string
    monto?: FloatFieldUpdateOperationsInput | number
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    categoria?: EnumCategoriaMovimientoFieldUpdateOperationsInput | $Enums.CategoriaMovimiento
    siembraId?: NullableIntFieldUpdateOperationsInput | number | null
    observaciones?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SiembraCreateManyLoteInput = {
    id?: number
    tipoCultivoId: number
    fechaSiembra: Date | string
    densidad?: number | null
    observaciones?: string | null
    estado?: $Enums.EstadoSiembra
    createdAt?: Date | string
    updatedAt?: Date | string
    campaniaId?: number | null
  }

  export type SiembraUpdateWithoutLoteInput = {
    fechaSiembra?: DateTimeFieldUpdateOperationsInput | Date | string
    densidad?: NullableFloatFieldUpdateOperationsInput | number | null
    observaciones?: NullableStringFieldUpdateOperationsInput | string | null
    estado?: EnumEstadoSiembraFieldUpdateOperationsInput | $Enums.EstadoSiembra
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tipoCultivo?: TipoCultivoUpdateOneRequiredWithoutSiembrasNestedInput
    cosechas?: CosechaUpdateManyWithoutSiembraNestedInput
    aplicaciones?: AplicacionInsumoUpdateManyWithoutSiembraNestedInput
    movimentos?: MovimientoFinancieroUpdateManyWithoutSiembraNestedInput
    campania?: CampaniaUpdateOneWithoutSiembrasNestedInput
  }

  export type SiembraUncheckedUpdateWithoutLoteInput = {
    id?: IntFieldUpdateOperationsInput | number
    tipoCultivoId?: IntFieldUpdateOperationsInput | number
    fechaSiembra?: DateTimeFieldUpdateOperationsInput | Date | string
    densidad?: NullableFloatFieldUpdateOperationsInput | number | null
    observaciones?: NullableStringFieldUpdateOperationsInput | string | null
    estado?: EnumEstadoSiembraFieldUpdateOperationsInput | $Enums.EstadoSiembra
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    campaniaId?: NullableIntFieldUpdateOperationsInput | number | null
    cosechas?: CosechaUncheckedUpdateManyWithoutSiembraNestedInput
    aplicaciones?: AplicacionInsumoUncheckedUpdateManyWithoutSiembraNestedInput
    movimentos?: MovimientoFinancieroUncheckedUpdateManyWithoutSiembraNestedInput
  }

  export type SiembraUncheckedUpdateManyWithoutLoteInput = {
    id?: IntFieldUpdateOperationsInput | number
    tipoCultivoId?: IntFieldUpdateOperationsInput | number
    fechaSiembra?: DateTimeFieldUpdateOperationsInput | Date | string
    densidad?: NullableFloatFieldUpdateOperationsInput | number | null
    observaciones?: NullableStringFieldUpdateOperationsInput | string | null
    estado?: EnumEstadoSiembraFieldUpdateOperationsInput | $Enums.EstadoSiembra
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    campaniaId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type SiembraCreateManyTipoCultivoInput = {
    id?: number
    loteId: number
    fechaSiembra: Date | string
    densidad?: number | null
    observaciones?: string | null
    estado?: $Enums.EstadoSiembra
    createdAt?: Date | string
    updatedAt?: Date | string
    campaniaId?: number | null
  }

  export type SiembraUpdateWithoutTipoCultivoInput = {
    fechaSiembra?: DateTimeFieldUpdateOperationsInput | Date | string
    densidad?: NullableFloatFieldUpdateOperationsInput | number | null
    observaciones?: NullableStringFieldUpdateOperationsInput | string | null
    estado?: EnumEstadoSiembraFieldUpdateOperationsInput | $Enums.EstadoSiembra
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lote?: LoteUpdateOneRequiredWithoutSiembrasNestedInput
    cosechas?: CosechaUpdateManyWithoutSiembraNestedInput
    aplicaciones?: AplicacionInsumoUpdateManyWithoutSiembraNestedInput
    movimentos?: MovimientoFinancieroUpdateManyWithoutSiembraNestedInput
    campania?: CampaniaUpdateOneWithoutSiembrasNestedInput
  }

  export type SiembraUncheckedUpdateWithoutTipoCultivoInput = {
    id?: IntFieldUpdateOperationsInput | number
    loteId?: IntFieldUpdateOperationsInput | number
    fechaSiembra?: DateTimeFieldUpdateOperationsInput | Date | string
    densidad?: NullableFloatFieldUpdateOperationsInput | number | null
    observaciones?: NullableStringFieldUpdateOperationsInput | string | null
    estado?: EnumEstadoSiembraFieldUpdateOperationsInput | $Enums.EstadoSiembra
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    campaniaId?: NullableIntFieldUpdateOperationsInput | number | null
    cosechas?: CosechaUncheckedUpdateManyWithoutSiembraNestedInput
    aplicaciones?: AplicacionInsumoUncheckedUpdateManyWithoutSiembraNestedInput
    movimentos?: MovimientoFinancieroUncheckedUpdateManyWithoutSiembraNestedInput
  }

  export type SiembraUncheckedUpdateManyWithoutTipoCultivoInput = {
    id?: IntFieldUpdateOperationsInput | number
    loteId?: IntFieldUpdateOperationsInput | number
    fechaSiembra?: DateTimeFieldUpdateOperationsInput | Date | string
    densidad?: NullableFloatFieldUpdateOperationsInput | number | null
    observaciones?: NullableStringFieldUpdateOperationsInput | string | null
    estado?: EnumEstadoSiembraFieldUpdateOperationsInput | $Enums.EstadoSiembra
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    campaniaId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type CosechaCreateManySiembraInput = {
    id?: number
    fechaCosecha: Date | string
    rendimientoKgHa: number
    totalKg: number
    humedad?: number | null
    observaciones?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AplicacionInsumoCreateManySiembraInput = {
    id?: number
    insumoId: number
    fecha: Date | string
    cantidad: number
    unidad: string
    observaciones?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MovimientoFinancieroCreateManySiembraInput = {
    id?: number
    usuarioId: number
    tipo: $Enums.TipoMovimiento
    concepto: string
    monto: number
    fecha: Date | string
    categoria: $Enums.CategoriaMovimiento
    campoId?: number | null
    observaciones?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CosechaUpdateWithoutSiembraInput = {
    fechaCosecha?: DateTimeFieldUpdateOperationsInput | Date | string
    rendimientoKgHa?: FloatFieldUpdateOperationsInput | number
    totalKg?: FloatFieldUpdateOperationsInput | number
    humedad?: NullableFloatFieldUpdateOperationsInput | number | null
    observaciones?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CosechaUncheckedUpdateWithoutSiembraInput = {
    id?: IntFieldUpdateOperationsInput | number
    fechaCosecha?: DateTimeFieldUpdateOperationsInput | Date | string
    rendimientoKgHa?: FloatFieldUpdateOperationsInput | number
    totalKg?: FloatFieldUpdateOperationsInput | number
    humedad?: NullableFloatFieldUpdateOperationsInput | number | null
    observaciones?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CosechaUncheckedUpdateManyWithoutSiembraInput = {
    id?: IntFieldUpdateOperationsInput | number
    fechaCosecha?: DateTimeFieldUpdateOperationsInput | Date | string
    rendimientoKgHa?: FloatFieldUpdateOperationsInput | number
    totalKg?: FloatFieldUpdateOperationsInput | number
    humedad?: NullableFloatFieldUpdateOperationsInput | number | null
    observaciones?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AplicacionInsumoUpdateWithoutSiembraInput = {
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    cantidad?: FloatFieldUpdateOperationsInput | number
    unidad?: StringFieldUpdateOperationsInput | string
    observaciones?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    insumo?: InsumoUpdateOneRequiredWithoutAplicacionesNestedInput
  }

  export type AplicacionInsumoUncheckedUpdateWithoutSiembraInput = {
    id?: IntFieldUpdateOperationsInput | number
    insumoId?: IntFieldUpdateOperationsInput | number
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    cantidad?: FloatFieldUpdateOperationsInput | number
    unidad?: StringFieldUpdateOperationsInput | string
    observaciones?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AplicacionInsumoUncheckedUpdateManyWithoutSiembraInput = {
    id?: IntFieldUpdateOperationsInput | number
    insumoId?: IntFieldUpdateOperationsInput | number
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    cantidad?: FloatFieldUpdateOperationsInput | number
    unidad?: StringFieldUpdateOperationsInput | string
    observaciones?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MovimientoFinancieroUpdateWithoutSiembraInput = {
    tipo?: EnumTipoMovimientoFieldUpdateOperationsInput | $Enums.TipoMovimiento
    concepto?: StringFieldUpdateOperationsInput | string
    monto?: FloatFieldUpdateOperationsInput | number
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    categoria?: EnumCategoriaMovimientoFieldUpdateOperationsInput | $Enums.CategoriaMovimiento
    observaciones?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usuario?: UsuarioUpdateOneRequiredWithoutMovimientosNestedInput
    campo?: CampoUpdateOneWithoutMovimentosNestedInput
  }

  export type MovimientoFinancieroUncheckedUpdateWithoutSiembraInput = {
    id?: IntFieldUpdateOperationsInput | number
    usuarioId?: IntFieldUpdateOperationsInput | number
    tipo?: EnumTipoMovimientoFieldUpdateOperationsInput | $Enums.TipoMovimiento
    concepto?: StringFieldUpdateOperationsInput | string
    monto?: FloatFieldUpdateOperationsInput | number
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    categoria?: EnumCategoriaMovimientoFieldUpdateOperationsInput | $Enums.CategoriaMovimiento
    campoId?: NullableIntFieldUpdateOperationsInput | number | null
    observaciones?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MovimientoFinancieroUncheckedUpdateManyWithoutSiembraInput = {
    id?: IntFieldUpdateOperationsInput | number
    usuarioId?: IntFieldUpdateOperationsInput | number
    tipo?: EnumTipoMovimientoFieldUpdateOperationsInput | $Enums.TipoMovimiento
    concepto?: StringFieldUpdateOperationsInput | string
    monto?: FloatFieldUpdateOperationsInput | number
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    categoria?: EnumCategoriaMovimientoFieldUpdateOperationsInput | $Enums.CategoriaMovimiento
    campoId?: NullableIntFieldUpdateOperationsInput | number | null
    observaciones?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AplicacionInsumoCreateManyInsumoInput = {
    id?: number
    siembraId: number
    fecha: Date | string
    cantidad: number
    unidad: string
    observaciones?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AplicacionInsumoUpdateWithoutInsumoInput = {
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    cantidad?: FloatFieldUpdateOperationsInput | number
    unidad?: StringFieldUpdateOperationsInput | string
    observaciones?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    siembra?: SiembraUpdateOneRequiredWithoutAplicacionesNestedInput
  }

  export type AplicacionInsumoUncheckedUpdateWithoutInsumoInput = {
    id?: IntFieldUpdateOperationsInput | number
    siembraId?: IntFieldUpdateOperationsInput | number
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    cantidad?: FloatFieldUpdateOperationsInput | number
    unidad?: StringFieldUpdateOperationsInput | string
    observaciones?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AplicacionInsumoUncheckedUpdateManyWithoutInsumoInput = {
    id?: IntFieldUpdateOperationsInput | number
    siembraId?: IntFieldUpdateOperationsInput | number
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    cantidad?: FloatFieldUpdateOperationsInput | number
    unidad?: StringFieldUpdateOperationsInput | string
    observaciones?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PrenezCreateManyAnimalInput = {
    id?: number
    fechaInicio: Date | string
    fechaEstimadaParto: Date | string
    estado?: $Enums.EstadoPrenez
    observaciones?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RegistroPesoCreateManyAnimalInput = {
    id?: number
    peso: number
    fecha: Date | string
    observaciones?: string | null
    createdAt?: Date | string
  }

  export type PrenezUpdateWithoutAnimalInput = {
    fechaInicio?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaEstimadaParto?: DateTimeFieldUpdateOperationsInput | Date | string
    estado?: EnumEstadoPrenezFieldUpdateOperationsInput | $Enums.EstadoPrenez
    observaciones?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PrenezUncheckedUpdateWithoutAnimalInput = {
    id?: IntFieldUpdateOperationsInput | number
    fechaInicio?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaEstimadaParto?: DateTimeFieldUpdateOperationsInput | Date | string
    estado?: EnumEstadoPrenezFieldUpdateOperationsInput | $Enums.EstadoPrenez
    observaciones?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PrenezUncheckedUpdateManyWithoutAnimalInput = {
    id?: IntFieldUpdateOperationsInput | number
    fechaInicio?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaEstimadaParto?: DateTimeFieldUpdateOperationsInput | Date | string
    estado?: EnumEstadoPrenezFieldUpdateOperationsInput | $Enums.EstadoPrenez
    observaciones?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RegistroPesoUpdateWithoutAnimalInput = {
    peso?: FloatFieldUpdateOperationsInput | number
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    observaciones?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RegistroPesoUncheckedUpdateWithoutAnimalInput = {
    id?: IntFieldUpdateOperationsInput | number
    peso?: FloatFieldUpdateOperationsInput | number
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    observaciones?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RegistroPesoUncheckedUpdateManyWithoutAnimalInput = {
    id?: IntFieldUpdateOperationsInput | number
    peso?: FloatFieldUpdateOperationsInput | number
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    observaciones?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SiembraCreateManyCampaniaInput = {
    id?: number
    loteId: number
    tipoCultivoId: number
    fechaSiembra: Date | string
    densidad?: number | null
    observaciones?: string | null
    estado?: $Enums.EstadoSiembra
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SiembraUpdateWithoutCampaniaInput = {
    fechaSiembra?: DateTimeFieldUpdateOperationsInput | Date | string
    densidad?: NullableFloatFieldUpdateOperationsInput | number | null
    observaciones?: NullableStringFieldUpdateOperationsInput | string | null
    estado?: EnumEstadoSiembraFieldUpdateOperationsInput | $Enums.EstadoSiembra
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lote?: LoteUpdateOneRequiredWithoutSiembrasNestedInput
    tipoCultivo?: TipoCultivoUpdateOneRequiredWithoutSiembrasNestedInput
    cosechas?: CosechaUpdateManyWithoutSiembraNestedInput
    aplicaciones?: AplicacionInsumoUpdateManyWithoutSiembraNestedInput
    movimentos?: MovimientoFinancieroUpdateManyWithoutSiembraNestedInput
  }

  export type SiembraUncheckedUpdateWithoutCampaniaInput = {
    id?: IntFieldUpdateOperationsInput | number
    loteId?: IntFieldUpdateOperationsInput | number
    tipoCultivoId?: IntFieldUpdateOperationsInput | number
    fechaSiembra?: DateTimeFieldUpdateOperationsInput | Date | string
    densidad?: NullableFloatFieldUpdateOperationsInput | number | null
    observaciones?: NullableStringFieldUpdateOperationsInput | string | null
    estado?: EnumEstadoSiembraFieldUpdateOperationsInput | $Enums.EstadoSiembra
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cosechas?: CosechaUncheckedUpdateManyWithoutSiembraNestedInput
    aplicaciones?: AplicacionInsumoUncheckedUpdateManyWithoutSiembraNestedInput
    movimentos?: MovimientoFinancieroUncheckedUpdateManyWithoutSiembraNestedInput
  }

  export type SiembraUncheckedUpdateManyWithoutCampaniaInput = {
    id?: IntFieldUpdateOperationsInput | number
    loteId?: IntFieldUpdateOperationsInput | number
    tipoCultivoId?: IntFieldUpdateOperationsInput | number
    fechaSiembra?: DateTimeFieldUpdateOperationsInput | Date | string
    densidad?: NullableFloatFieldUpdateOperationsInput | number | null
    observaciones?: NullableStringFieldUpdateOperationsInput | string | null
    estado?: EnumEstadoSiembraFieldUpdateOperationsInput | $Enums.EstadoSiembra
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use UsuarioCountOutputTypeDefaultArgs instead
     */
    export type UsuarioCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UsuarioCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CampoCountOutputTypeDefaultArgs instead
     */
    export type CampoCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CampoCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use LoteCountOutputTypeDefaultArgs instead
     */
    export type LoteCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = LoteCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use TipoCultivoCountOutputTypeDefaultArgs instead
     */
    export type TipoCultivoCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = TipoCultivoCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SiembraCountOutputTypeDefaultArgs instead
     */
    export type SiembraCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SiembraCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use InsumoCountOutputTypeDefaultArgs instead
     */
    export type InsumoCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = InsumoCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AnimalCountOutputTypeDefaultArgs instead
     */
    export type AnimalCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AnimalCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CampaniaCountOutputTypeDefaultArgs instead
     */
    export type CampaniaCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CampaniaCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UsuarioDefaultArgs instead
     */
    export type UsuarioArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UsuarioDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CampoDefaultArgs instead
     */
    export type CampoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CampoDefaultArgs<ExtArgs>
    /**
     * @deprecated Use LoteDefaultArgs instead
     */
    export type LoteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = LoteDefaultArgs<ExtArgs>
    /**
     * @deprecated Use TipoCultivoDefaultArgs instead
     */
    export type TipoCultivoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = TipoCultivoDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SiembraDefaultArgs instead
     */
    export type SiembraArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SiembraDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CosechaDefaultArgs instead
     */
    export type CosechaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CosechaDefaultArgs<ExtArgs>
    /**
     * @deprecated Use InsumoDefaultArgs instead
     */
    export type InsumoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = InsumoDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AplicacionInsumoDefaultArgs instead
     */
    export type AplicacionInsumoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AplicacionInsumoDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AnimalDefaultArgs instead
     */
    export type AnimalArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AnimalDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PrenezDefaultArgs instead
     */
    export type PrenezArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PrenezDefaultArgs<ExtArgs>
    /**
     * @deprecated Use TareaRuralDefaultArgs instead
     */
    export type TareaRuralArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = TareaRuralDefaultArgs<ExtArgs>
    /**
     * @deprecated Use MovimientoFinancieroDefaultArgs instead
     */
    export type MovimientoFinancieroArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = MovimientoFinancieroDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CampaniaDefaultArgs instead
     */
    export type CampaniaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CampaniaDefaultArgs<ExtArgs>
    /**
     * @deprecated Use RegistroPesoDefaultArgs instead
     */
    export type RegistroPesoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = RegistroPesoDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}