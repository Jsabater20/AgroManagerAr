import * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../models.js";
import { type PrismaClient } from "./class.js";
export type * from '../models.js';
export type DMMF = typeof runtime.DMMF;
export type PrismaPromise<T> = runtime.Types.Public.PrismaPromise<T>;
export declare const PrismaClientKnownRequestError: any;
export type PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError;
export declare const PrismaClientUnknownRequestError: any;
export type PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError;
export declare const PrismaClientRustPanicError: any;
export type PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;
export declare const PrismaClientInitializationError: any;
export type PrismaClientInitializationError = runtime.PrismaClientInitializationError;
export declare const PrismaClientValidationError: any;
export type PrismaClientValidationError = runtime.PrismaClientValidationError;
export declare const sql: any;
export declare const empty: any;
export declare const join: any;
export declare const raw: any;
export declare const Sql: any;
export type Sql = runtime.Sql;
export declare const Decimal: any;
export type Decimal = runtime.Decimal;
export type DecimalJsLike = runtime.DecimalJsLike;
export type Extension = runtime.Types.Extensions.UserArgs;
export declare const getExtensionContext: any;
export type Args<T, F extends runtime.Operation> = runtime.Types.Public.Args<T, F>;
export type Payload<T, F extends runtime.Operation = never> = runtime.Types.Public.Payload<T, F>;
export type Result<T, A, F extends runtime.Operation> = runtime.Types.Public.Result<T, A, F>;
export type Exact<A, W> = runtime.Types.Public.Exact<A, W>;
export type PrismaVersion = {
    client: string;
    engine: string;
};
export declare const prismaVersion: PrismaVersion;
export type Bytes = runtime.Bytes;
export type JsonObject = runtime.JsonObject;
export type JsonArray = runtime.JsonArray;
export type JsonValue = runtime.JsonValue;
export type InputJsonObject = runtime.InputJsonObject;
export type InputJsonArray = runtime.InputJsonArray;
export type InputJsonValue = runtime.InputJsonValue;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.AnyNull);
};
export declare const DbNull: any;
export declare const JsonNull: any;
export declare const AnyNull: any;
type SelectAndInclude = {
    select: any;
    include: any;
};
type SelectAndOmit = {
    select: any;
    omit: any;
};
type Prisma__Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};
export type Enumerable<T> = T | Array<T>;
export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
};
export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
} & (T extends SelectAndInclude ? 'Please either choose `select` or `include`.' : T extends SelectAndOmit ? 'Please either choose `select` or `omit`.' : {});
export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
} & K;
type Without<T, U> = {
    [P in Exclude<keyof T, keyof U>]?: never;
};
export type XOR<T, U> = T extends object ? U extends object ? (Without<T, U> & U) | (Without<U, T> & T) : U : T;
type IsObject<T extends any> = T extends Array<any> ? False : T extends Date ? False : T extends Uint8Array ? False : T extends BigInt ? False : T extends object ? True : False;
export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T;
type __Either<O extends object, K extends Key> = Omit<O, K> & {
    [P in K]: Prisma__Pick<O, P & keyof O>;
}[K];
type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>;
type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>;
type _Either<O extends object, K extends Key, strict extends Boolean> = {
    1: EitherStrict<O, K>;
    0: EitherLoose<O, K>;
}[strict];
export type Either<O extends object, K extends Key, strict extends Boolean = 1> = O extends unknown ? _Either<O, K, strict> : never;
export type Union = any;
export type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K];
} & {};
export type IntersectOf<U extends Union> = (U extends unknown ? (k: U) => void : never) extends (k: infer I) => void ? I : never;
export type Overwrite<O extends object, O1 extends object> = {
    [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
} & {};
type _Merge<U extends object> = IntersectOf<Overwrite<U, {
    [K in keyof U]-?: At<U, K>;
}>>;
type Key = string | number | symbol;
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
type NoExpand<T> = T extends unknown ? T : never;
export type AtLeast<O extends object, K extends string> = NoExpand<O extends unknown ? (K extends keyof O ? {
    [P in K]: O[P];
} & O : O) | {
    [P in keyof O as P extends K ? P : never]-?: O[P];
} & O : never>;
type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;
export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;
export type Boolean = True | False;
export type True = 1;
export type False = 0;
export type Not<B extends Boolean> = {
    0: 1;
    1: 0;
}[B];
export type Extends<A1 extends any, A2 extends any> = [A1] extends [never] ? 0 : A1 extends A2 ? 1 : 0;
export type Has<U extends Union, U1 extends Union> = Not<Extends<Exclude<U1, U>, U1>>;
export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
        0: 0;
        1: 1;
    };
    1: {
        0: 1;
        1: 1;
    };
}[B1][B2];
export type Keys<U extends Union> = U extends unknown ? keyof U : never;
export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O ? O[P] : never;
} : never;
type FieldPaths<T, U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>> = IsObject<T> extends True ? U : T;
export type GetHavingFields<T> = {
    [K in keyof T]: Or<Or<Extends<'OR', K>, Extends<'AND', K>>, Extends<'NOT', K>> extends True ? T[K] extends infer TK ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never> : never : {} extends FieldPaths<T[K]> ? never : K;
}[keyof T];
type _TupleToUnion<T> = T extends (infer E)[] ? E : never;
type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>;
export type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T;
export type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>;
export type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T;
export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>;
type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>;
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
export interface TypeMapCb<GlobalOmitOptions = {}> extends runtime.Types.Utils.Fn<{
    extArgs: runtime.Types.Extensions.InternalArgs;
}, runtime.Types.Utils.Record<string, any>> {
    returns: TypeMap<this['params']['extArgs'], GlobalOmitOptions>;
}
export type TypeMap<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
        omit: GlobalOmitOptions;
    };
    meta: {
        modelProps: "usuario" | "campo" | "lote" | "tipoCultivo" | "siembra" | "cosecha" | "insumo" | "aplicacionInsumo";
        txIsolationLevel: TransactionIsolationLevel;
    };
    model: {
        Usuario: {
            payload: Prisma.$UsuarioPayload<ExtArgs>;
            fields: Prisma.UsuarioFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.UsuarioFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UsuarioPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.UsuarioFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UsuarioPayload>;
                };
                findFirst: {
                    args: Prisma.UsuarioFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UsuarioPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.UsuarioFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UsuarioPayload>;
                };
                findMany: {
                    args: Prisma.UsuarioFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UsuarioPayload>[];
                };
                create: {
                    args: Prisma.UsuarioCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UsuarioPayload>;
                };
                createMany: {
                    args: Prisma.UsuarioCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.UsuarioCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UsuarioPayload>[];
                };
                delete: {
                    args: Prisma.UsuarioDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UsuarioPayload>;
                };
                update: {
                    args: Prisma.UsuarioUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UsuarioPayload>;
                };
                deleteMany: {
                    args: Prisma.UsuarioDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.UsuarioUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.UsuarioUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UsuarioPayload>[];
                };
                upsert: {
                    args: Prisma.UsuarioUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UsuarioPayload>;
                };
                aggregate: {
                    args: Prisma.UsuarioAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateUsuario>;
                };
                groupBy: {
                    args: Prisma.UsuarioGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.UsuarioGroupByOutputType>[];
                };
                count: {
                    args: Prisma.UsuarioCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.UsuarioCountAggregateOutputType> | number;
                };
            };
        };
        Campo: {
            payload: Prisma.$CampoPayload<ExtArgs>;
            fields: Prisma.CampoFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.CampoFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CampoPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.CampoFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CampoPayload>;
                };
                findFirst: {
                    args: Prisma.CampoFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CampoPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.CampoFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CampoPayload>;
                };
                findMany: {
                    args: Prisma.CampoFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CampoPayload>[];
                };
                create: {
                    args: Prisma.CampoCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CampoPayload>;
                };
                createMany: {
                    args: Prisma.CampoCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.CampoCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CampoPayload>[];
                };
                delete: {
                    args: Prisma.CampoDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CampoPayload>;
                };
                update: {
                    args: Prisma.CampoUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CampoPayload>;
                };
                deleteMany: {
                    args: Prisma.CampoDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.CampoUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.CampoUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CampoPayload>[];
                };
                upsert: {
                    args: Prisma.CampoUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CampoPayload>;
                };
                aggregate: {
                    args: Prisma.CampoAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateCampo>;
                };
                groupBy: {
                    args: Prisma.CampoGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CampoGroupByOutputType>[];
                };
                count: {
                    args: Prisma.CampoCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CampoCountAggregateOutputType> | number;
                };
            };
        };
        Lote: {
            payload: Prisma.$LotePayload<ExtArgs>;
            fields: Prisma.LoteFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.LoteFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LotePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.LoteFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LotePayload>;
                };
                findFirst: {
                    args: Prisma.LoteFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LotePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.LoteFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LotePayload>;
                };
                findMany: {
                    args: Prisma.LoteFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LotePayload>[];
                };
                create: {
                    args: Prisma.LoteCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LotePayload>;
                };
                createMany: {
                    args: Prisma.LoteCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.LoteCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LotePayload>[];
                };
                delete: {
                    args: Prisma.LoteDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LotePayload>;
                };
                update: {
                    args: Prisma.LoteUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LotePayload>;
                };
                deleteMany: {
                    args: Prisma.LoteDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.LoteUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.LoteUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LotePayload>[];
                };
                upsert: {
                    args: Prisma.LoteUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LotePayload>;
                };
                aggregate: {
                    args: Prisma.LoteAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateLote>;
                };
                groupBy: {
                    args: Prisma.LoteGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.LoteGroupByOutputType>[];
                };
                count: {
                    args: Prisma.LoteCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.LoteCountAggregateOutputType> | number;
                };
            };
        };
        TipoCultivo: {
            payload: Prisma.$TipoCultivoPayload<ExtArgs>;
            fields: Prisma.TipoCultivoFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.TipoCultivoFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TipoCultivoPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.TipoCultivoFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TipoCultivoPayload>;
                };
                findFirst: {
                    args: Prisma.TipoCultivoFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TipoCultivoPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.TipoCultivoFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TipoCultivoPayload>;
                };
                findMany: {
                    args: Prisma.TipoCultivoFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TipoCultivoPayload>[];
                };
                create: {
                    args: Prisma.TipoCultivoCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TipoCultivoPayload>;
                };
                createMany: {
                    args: Prisma.TipoCultivoCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.TipoCultivoCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TipoCultivoPayload>[];
                };
                delete: {
                    args: Prisma.TipoCultivoDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TipoCultivoPayload>;
                };
                update: {
                    args: Prisma.TipoCultivoUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TipoCultivoPayload>;
                };
                deleteMany: {
                    args: Prisma.TipoCultivoDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.TipoCultivoUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.TipoCultivoUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TipoCultivoPayload>[];
                };
                upsert: {
                    args: Prisma.TipoCultivoUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TipoCultivoPayload>;
                };
                aggregate: {
                    args: Prisma.TipoCultivoAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateTipoCultivo>;
                };
                groupBy: {
                    args: Prisma.TipoCultivoGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.TipoCultivoGroupByOutputType>[];
                };
                count: {
                    args: Prisma.TipoCultivoCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.TipoCultivoCountAggregateOutputType> | number;
                };
            };
        };
        Siembra: {
            payload: Prisma.$SiembraPayload<ExtArgs>;
            fields: Prisma.SiembraFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.SiembraFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SiembraPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.SiembraFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SiembraPayload>;
                };
                findFirst: {
                    args: Prisma.SiembraFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SiembraPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.SiembraFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SiembraPayload>;
                };
                findMany: {
                    args: Prisma.SiembraFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SiembraPayload>[];
                };
                create: {
                    args: Prisma.SiembraCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SiembraPayload>;
                };
                createMany: {
                    args: Prisma.SiembraCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.SiembraCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SiembraPayload>[];
                };
                delete: {
                    args: Prisma.SiembraDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SiembraPayload>;
                };
                update: {
                    args: Prisma.SiembraUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SiembraPayload>;
                };
                deleteMany: {
                    args: Prisma.SiembraDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.SiembraUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.SiembraUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SiembraPayload>[];
                };
                upsert: {
                    args: Prisma.SiembraUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SiembraPayload>;
                };
                aggregate: {
                    args: Prisma.SiembraAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateSiembra>;
                };
                groupBy: {
                    args: Prisma.SiembraGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SiembraGroupByOutputType>[];
                };
                count: {
                    args: Prisma.SiembraCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SiembraCountAggregateOutputType> | number;
                };
            };
        };
        Cosecha: {
            payload: Prisma.$CosechaPayload<ExtArgs>;
            fields: Prisma.CosechaFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.CosechaFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CosechaPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.CosechaFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CosechaPayload>;
                };
                findFirst: {
                    args: Prisma.CosechaFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CosechaPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.CosechaFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CosechaPayload>;
                };
                findMany: {
                    args: Prisma.CosechaFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CosechaPayload>[];
                };
                create: {
                    args: Prisma.CosechaCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CosechaPayload>;
                };
                createMany: {
                    args: Prisma.CosechaCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.CosechaCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CosechaPayload>[];
                };
                delete: {
                    args: Prisma.CosechaDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CosechaPayload>;
                };
                update: {
                    args: Prisma.CosechaUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CosechaPayload>;
                };
                deleteMany: {
                    args: Prisma.CosechaDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.CosechaUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.CosechaUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CosechaPayload>[];
                };
                upsert: {
                    args: Prisma.CosechaUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CosechaPayload>;
                };
                aggregate: {
                    args: Prisma.CosechaAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateCosecha>;
                };
                groupBy: {
                    args: Prisma.CosechaGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CosechaGroupByOutputType>[];
                };
                count: {
                    args: Prisma.CosechaCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CosechaCountAggregateOutputType> | number;
                };
            };
        };
        Insumo: {
            payload: Prisma.$InsumoPayload<ExtArgs>;
            fields: Prisma.InsumoFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.InsumoFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InsumoPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.InsumoFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InsumoPayload>;
                };
                findFirst: {
                    args: Prisma.InsumoFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InsumoPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.InsumoFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InsumoPayload>;
                };
                findMany: {
                    args: Prisma.InsumoFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InsumoPayload>[];
                };
                create: {
                    args: Prisma.InsumoCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InsumoPayload>;
                };
                createMany: {
                    args: Prisma.InsumoCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.InsumoCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InsumoPayload>[];
                };
                delete: {
                    args: Prisma.InsumoDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InsumoPayload>;
                };
                update: {
                    args: Prisma.InsumoUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InsumoPayload>;
                };
                deleteMany: {
                    args: Prisma.InsumoDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.InsumoUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.InsumoUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InsumoPayload>[];
                };
                upsert: {
                    args: Prisma.InsumoUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InsumoPayload>;
                };
                aggregate: {
                    args: Prisma.InsumoAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateInsumo>;
                };
                groupBy: {
                    args: Prisma.InsumoGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.InsumoGroupByOutputType>[];
                };
                count: {
                    args: Prisma.InsumoCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.InsumoCountAggregateOutputType> | number;
                };
            };
        };
        AplicacionInsumo: {
            payload: Prisma.$AplicacionInsumoPayload<ExtArgs>;
            fields: Prisma.AplicacionInsumoFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.AplicacionInsumoFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AplicacionInsumoPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.AplicacionInsumoFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AplicacionInsumoPayload>;
                };
                findFirst: {
                    args: Prisma.AplicacionInsumoFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AplicacionInsumoPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.AplicacionInsumoFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AplicacionInsumoPayload>;
                };
                findMany: {
                    args: Prisma.AplicacionInsumoFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AplicacionInsumoPayload>[];
                };
                create: {
                    args: Prisma.AplicacionInsumoCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AplicacionInsumoPayload>;
                };
                createMany: {
                    args: Prisma.AplicacionInsumoCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.AplicacionInsumoCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AplicacionInsumoPayload>[];
                };
                delete: {
                    args: Prisma.AplicacionInsumoDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AplicacionInsumoPayload>;
                };
                update: {
                    args: Prisma.AplicacionInsumoUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AplicacionInsumoPayload>;
                };
                deleteMany: {
                    args: Prisma.AplicacionInsumoDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.AplicacionInsumoUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.AplicacionInsumoUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AplicacionInsumoPayload>[];
                };
                upsert: {
                    args: Prisma.AplicacionInsumoUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AplicacionInsumoPayload>;
                };
                aggregate: {
                    args: Prisma.AplicacionInsumoAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateAplicacionInsumo>;
                };
                groupBy: {
                    args: Prisma.AplicacionInsumoGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AplicacionInsumoGroupByOutputType>[];
                };
                count: {
                    args: Prisma.AplicacionInsumoCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AplicacionInsumoCountAggregateOutputType> | number;
                };
            };
        };
    };
} & {
    other: {
        payload: any;
        operations: {
            $executeRaw: {
                args: [query: TemplateStringsArray | Sql, ...values: any[]];
                result: any;
            };
            $executeRawUnsafe: {
                args: [query: string, ...values: any[]];
                result: any;
            };
            $queryRaw: {
                args: [query: TemplateStringsArray | Sql, ...values: any[]];
                result: any;
            };
            $queryRawUnsafe: {
                args: [query: string, ...values: any[]];
                result: any;
            };
        };
    };
};
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
export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>;
export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>;
export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>;
export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>;
export type EnumRolFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Rol'>;
export type ListEnumRolFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Rol[]'>;
export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>;
export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>;
export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>;
export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>;
export type EnumEstadoSiembraFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EstadoSiembra'>;
export type ListEnumEstadoSiembraFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EstadoSiembra[]'>;
export type EnumTipoInsumoFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TipoInsumo'>;
export type ListEnumTipoInsumoFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TipoInsumo[]'>;
export type BatchPayload = {
    count: number;
};
export declare const defineExtension: runtime.Types.Extensions.ExtendsHook<"define", TypeMapCb, runtime.Types.Extensions.DefaultArgs>;
export type DefaultPrismaClient = PrismaClient;
export type ErrorFormat = 'pretty' | 'colorless' | 'minimal';
export type PrismaClientOptions = ({
    adapter: runtime.SqlDriverAdapterFactory;
    accelerateUrl?: never;
} | {
    accelerateUrl: string;
    adapter?: never;
}) & {
    errorFormat?: ErrorFormat;
    log?: (LogLevel | LogDefinition)[];
    transactionOptions?: {
        maxWait?: number;
        timeout?: number;
        isolationLevel?: TransactionIsolationLevel;
    };
    omit?: GlobalOmitConfig;
    comments?: runtime.SqlCommenterPlugin[];
};
export type GlobalOmitConfig = {
    usuario?: Prisma.UsuarioOmit;
    campo?: Prisma.CampoOmit;
    lote?: Prisma.LoteOmit;
    tipoCultivo?: Prisma.TipoCultivoOmit;
    siembra?: Prisma.SiembraOmit;
    cosecha?: Prisma.CosechaOmit;
    insumo?: Prisma.InsumoOmit;
    aplicacionInsumo?: Prisma.AplicacionInsumoOmit;
};
export type LogLevel = 'info' | 'query' | 'warn' | 'error';
export type LogDefinition = {
    level: LogLevel;
    emit: 'stdout' | 'event';
};
export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;
export type GetLogType<T> = CheckIsLogLevel<T extends LogDefinition ? T['level'] : T>;
export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition> ? GetLogType<T[number]> : never;
export type QueryEvent = {
    timestamp: Date;
    query: string;
    params: string;
    duration: number;
    target: string;
};
export type LogEvent = {
    timestamp: Date;
    message: string;
    target: string;
};
export type PrismaAction = 'findUnique' | 'findUniqueOrThrow' | 'findMany' | 'findFirst' | 'findFirstOrThrow' | 'create' | 'createMany' | 'createManyAndReturn' | 'update' | 'updateMany' | 'updateManyAndReturn' | 'upsert' | 'delete' | 'deleteMany' | 'executeRaw' | 'queryRaw' | 'aggregate' | 'count' | 'runCommandRaw' | 'findRaw' | 'groupBy';
export type TransactionClient = Omit<DefaultPrismaClient, runtime.ITXClientDenyList>;
