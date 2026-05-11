import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type InsumoModel = runtime.Types.Result.DefaultSelection<Prisma.$InsumoPayload>;
export type AggregateInsumo = {
    _count: InsumoCountAggregateOutputType | null;
    _avg: InsumoAvgAggregateOutputType | null;
    _sum: InsumoSumAggregateOutputType | null;
    _min: InsumoMinAggregateOutputType | null;
    _max: InsumoMaxAggregateOutputType | null;
};
export type InsumoAvgAggregateOutputType = {
    id: number | null;
};
export type InsumoSumAggregateOutputType = {
    id: number | null;
};
export type InsumoMinAggregateOutputType = {
    id: number | null;
    nombre: string | null;
    tipo: $Enums.TipoInsumo | null;
    unidad: string | null;
    descripcion: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type InsumoMaxAggregateOutputType = {
    id: number | null;
    nombre: string | null;
    tipo: $Enums.TipoInsumo | null;
    unidad: string | null;
    descripcion: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type InsumoCountAggregateOutputType = {
    id: number;
    nombre: number;
    tipo: number;
    unidad: number;
    descripcion: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type InsumoAvgAggregateInputType = {
    id?: true;
};
export type InsumoSumAggregateInputType = {
    id?: true;
};
export type InsumoMinAggregateInputType = {
    id?: true;
    nombre?: true;
    tipo?: true;
    unidad?: true;
    descripcion?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type InsumoMaxAggregateInputType = {
    id?: true;
    nombre?: true;
    tipo?: true;
    unidad?: true;
    descripcion?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type InsumoCountAggregateInputType = {
    id?: true;
    nombre?: true;
    tipo?: true;
    unidad?: true;
    descripcion?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type InsumoAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.InsumoWhereInput;
    orderBy?: Prisma.InsumoOrderByWithRelationInput | Prisma.InsumoOrderByWithRelationInput[];
    cursor?: Prisma.InsumoWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | InsumoCountAggregateInputType;
    _avg?: InsumoAvgAggregateInputType;
    _sum?: InsumoSumAggregateInputType;
    _min?: InsumoMinAggregateInputType;
    _max?: InsumoMaxAggregateInputType;
};
export type GetInsumoAggregateType<T extends InsumoAggregateArgs> = {
    [P in keyof T & keyof AggregateInsumo]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateInsumo[P]> : Prisma.GetScalarType<T[P], AggregateInsumo[P]>;
};
export type InsumoGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.InsumoWhereInput;
    orderBy?: Prisma.InsumoOrderByWithAggregationInput | Prisma.InsumoOrderByWithAggregationInput[];
    by: Prisma.InsumoScalarFieldEnum[] | Prisma.InsumoScalarFieldEnum;
    having?: Prisma.InsumoScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: InsumoCountAggregateInputType | true;
    _avg?: InsumoAvgAggregateInputType;
    _sum?: InsumoSumAggregateInputType;
    _min?: InsumoMinAggregateInputType;
    _max?: InsumoMaxAggregateInputType;
};
export type InsumoGroupByOutputType = {
    id: number;
    nombre: string;
    tipo: $Enums.TipoInsumo;
    unidad: string;
    descripcion: string | null;
    createdAt: Date;
    updatedAt: Date;
    _count: InsumoCountAggregateOutputType | null;
    _avg: InsumoAvgAggregateOutputType | null;
    _sum: InsumoSumAggregateOutputType | null;
    _min: InsumoMinAggregateOutputType | null;
    _max: InsumoMaxAggregateOutputType | null;
};
export type GetInsumoGroupByPayload<T extends InsumoGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<InsumoGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof InsumoGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], InsumoGroupByOutputType[P]> : Prisma.GetScalarType<T[P], InsumoGroupByOutputType[P]>;
}>>;
export type InsumoWhereInput = {
    AND?: Prisma.InsumoWhereInput | Prisma.InsumoWhereInput[];
    OR?: Prisma.InsumoWhereInput[];
    NOT?: Prisma.InsumoWhereInput | Prisma.InsumoWhereInput[];
    id?: Prisma.IntFilter<"Insumo"> | number;
    nombre?: Prisma.StringFilter<"Insumo"> | string;
    tipo?: Prisma.EnumTipoInsumoFilter<"Insumo"> | $Enums.TipoInsumo;
    unidad?: Prisma.StringFilter<"Insumo"> | string;
    descripcion?: Prisma.StringNullableFilter<"Insumo"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Insumo"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Insumo"> | Date | string;
    aplicaciones?: Prisma.AplicacionInsumoListRelationFilter;
};
export type InsumoOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    nombre?: Prisma.SortOrder;
    tipo?: Prisma.SortOrder;
    unidad?: Prisma.SortOrder;
    descripcion?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    aplicaciones?: Prisma.AplicacionInsumoOrderByRelationAggregateInput;
};
export type InsumoWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    AND?: Prisma.InsumoWhereInput | Prisma.InsumoWhereInput[];
    OR?: Prisma.InsumoWhereInput[];
    NOT?: Prisma.InsumoWhereInput | Prisma.InsumoWhereInput[];
    nombre?: Prisma.StringFilter<"Insumo"> | string;
    tipo?: Prisma.EnumTipoInsumoFilter<"Insumo"> | $Enums.TipoInsumo;
    unidad?: Prisma.StringFilter<"Insumo"> | string;
    descripcion?: Prisma.StringNullableFilter<"Insumo"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Insumo"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Insumo"> | Date | string;
    aplicaciones?: Prisma.AplicacionInsumoListRelationFilter;
}, "id">;
export type InsumoOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    nombre?: Prisma.SortOrder;
    tipo?: Prisma.SortOrder;
    unidad?: Prisma.SortOrder;
    descripcion?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.InsumoCountOrderByAggregateInput;
    _avg?: Prisma.InsumoAvgOrderByAggregateInput;
    _max?: Prisma.InsumoMaxOrderByAggregateInput;
    _min?: Prisma.InsumoMinOrderByAggregateInput;
    _sum?: Prisma.InsumoSumOrderByAggregateInput;
};
export type InsumoScalarWhereWithAggregatesInput = {
    AND?: Prisma.InsumoScalarWhereWithAggregatesInput | Prisma.InsumoScalarWhereWithAggregatesInput[];
    OR?: Prisma.InsumoScalarWhereWithAggregatesInput[];
    NOT?: Prisma.InsumoScalarWhereWithAggregatesInput | Prisma.InsumoScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"Insumo"> | number;
    nombre?: Prisma.StringWithAggregatesFilter<"Insumo"> | string;
    tipo?: Prisma.EnumTipoInsumoWithAggregatesFilter<"Insumo"> | $Enums.TipoInsumo;
    unidad?: Prisma.StringWithAggregatesFilter<"Insumo"> | string;
    descripcion?: Prisma.StringNullableWithAggregatesFilter<"Insumo"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Insumo"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Insumo"> | Date | string;
};
export type InsumoCreateInput = {
    nombre: string;
    tipo: $Enums.TipoInsumo;
    unidad: string;
    descripcion?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    aplicaciones?: Prisma.AplicacionInsumoCreateNestedManyWithoutInsumoInput;
};
export type InsumoUncheckedCreateInput = {
    id?: number;
    nombre: string;
    tipo: $Enums.TipoInsumo;
    unidad: string;
    descripcion?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    aplicaciones?: Prisma.AplicacionInsumoUncheckedCreateNestedManyWithoutInsumoInput;
};
export type InsumoUpdateInput = {
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    tipo?: Prisma.EnumTipoInsumoFieldUpdateOperationsInput | $Enums.TipoInsumo;
    unidad?: Prisma.StringFieldUpdateOperationsInput | string;
    descripcion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    aplicaciones?: Prisma.AplicacionInsumoUpdateManyWithoutInsumoNestedInput;
};
export type InsumoUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    tipo?: Prisma.EnumTipoInsumoFieldUpdateOperationsInput | $Enums.TipoInsumo;
    unidad?: Prisma.StringFieldUpdateOperationsInput | string;
    descripcion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    aplicaciones?: Prisma.AplicacionInsumoUncheckedUpdateManyWithoutInsumoNestedInput;
};
export type InsumoCreateManyInput = {
    id?: number;
    nombre: string;
    tipo: $Enums.TipoInsumo;
    unidad: string;
    descripcion?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type InsumoUpdateManyMutationInput = {
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    tipo?: Prisma.EnumTipoInsumoFieldUpdateOperationsInput | $Enums.TipoInsumo;
    unidad?: Prisma.StringFieldUpdateOperationsInput | string;
    descripcion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type InsumoUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    tipo?: Prisma.EnumTipoInsumoFieldUpdateOperationsInput | $Enums.TipoInsumo;
    unidad?: Prisma.StringFieldUpdateOperationsInput | string;
    descripcion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type InsumoCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    nombre?: Prisma.SortOrder;
    tipo?: Prisma.SortOrder;
    unidad?: Prisma.SortOrder;
    descripcion?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type InsumoAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
};
export type InsumoMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    nombre?: Prisma.SortOrder;
    tipo?: Prisma.SortOrder;
    unidad?: Prisma.SortOrder;
    descripcion?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type InsumoMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    nombre?: Prisma.SortOrder;
    tipo?: Prisma.SortOrder;
    unidad?: Prisma.SortOrder;
    descripcion?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type InsumoSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
};
export type InsumoScalarRelationFilter = {
    is?: Prisma.InsumoWhereInput;
    isNot?: Prisma.InsumoWhereInput;
};
export type EnumTipoInsumoFieldUpdateOperationsInput = {
    set?: $Enums.TipoInsumo;
};
export type InsumoCreateNestedOneWithoutAplicacionesInput = {
    create?: Prisma.XOR<Prisma.InsumoCreateWithoutAplicacionesInput, Prisma.InsumoUncheckedCreateWithoutAplicacionesInput>;
    connectOrCreate?: Prisma.InsumoCreateOrConnectWithoutAplicacionesInput;
    connect?: Prisma.InsumoWhereUniqueInput;
};
export type InsumoUpdateOneRequiredWithoutAplicacionesNestedInput = {
    create?: Prisma.XOR<Prisma.InsumoCreateWithoutAplicacionesInput, Prisma.InsumoUncheckedCreateWithoutAplicacionesInput>;
    connectOrCreate?: Prisma.InsumoCreateOrConnectWithoutAplicacionesInput;
    upsert?: Prisma.InsumoUpsertWithoutAplicacionesInput;
    connect?: Prisma.InsumoWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.InsumoUpdateToOneWithWhereWithoutAplicacionesInput, Prisma.InsumoUpdateWithoutAplicacionesInput>, Prisma.InsumoUncheckedUpdateWithoutAplicacionesInput>;
};
export type InsumoCreateWithoutAplicacionesInput = {
    nombre: string;
    tipo: $Enums.TipoInsumo;
    unidad: string;
    descripcion?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type InsumoUncheckedCreateWithoutAplicacionesInput = {
    id?: number;
    nombre: string;
    tipo: $Enums.TipoInsumo;
    unidad: string;
    descripcion?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type InsumoCreateOrConnectWithoutAplicacionesInput = {
    where: Prisma.InsumoWhereUniqueInput;
    create: Prisma.XOR<Prisma.InsumoCreateWithoutAplicacionesInput, Prisma.InsumoUncheckedCreateWithoutAplicacionesInput>;
};
export type InsumoUpsertWithoutAplicacionesInput = {
    update: Prisma.XOR<Prisma.InsumoUpdateWithoutAplicacionesInput, Prisma.InsumoUncheckedUpdateWithoutAplicacionesInput>;
    create: Prisma.XOR<Prisma.InsumoCreateWithoutAplicacionesInput, Prisma.InsumoUncheckedCreateWithoutAplicacionesInput>;
    where?: Prisma.InsumoWhereInput;
};
export type InsumoUpdateToOneWithWhereWithoutAplicacionesInput = {
    where?: Prisma.InsumoWhereInput;
    data: Prisma.XOR<Prisma.InsumoUpdateWithoutAplicacionesInput, Prisma.InsumoUncheckedUpdateWithoutAplicacionesInput>;
};
export type InsumoUpdateWithoutAplicacionesInput = {
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    tipo?: Prisma.EnumTipoInsumoFieldUpdateOperationsInput | $Enums.TipoInsumo;
    unidad?: Prisma.StringFieldUpdateOperationsInput | string;
    descripcion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type InsumoUncheckedUpdateWithoutAplicacionesInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    tipo?: Prisma.EnumTipoInsumoFieldUpdateOperationsInput | $Enums.TipoInsumo;
    unidad?: Prisma.StringFieldUpdateOperationsInput | string;
    descripcion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type InsumoCountOutputType = {
    aplicaciones: number;
};
export type InsumoCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    aplicaciones?: boolean | InsumoCountOutputTypeCountAplicacionesArgs;
};
export type InsumoCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InsumoCountOutputTypeSelect<ExtArgs> | null;
};
export type InsumoCountOutputTypeCountAplicacionesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AplicacionInsumoWhereInput;
};
export type InsumoSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    nombre?: boolean;
    tipo?: boolean;
    unidad?: boolean;
    descripcion?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    aplicaciones?: boolean | Prisma.Insumo$aplicacionesArgs<ExtArgs>;
    _count?: boolean | Prisma.InsumoCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["insumo"]>;
export type InsumoSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    nombre?: boolean;
    tipo?: boolean;
    unidad?: boolean;
    descripcion?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["insumo"]>;
export type InsumoSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    nombre?: boolean;
    tipo?: boolean;
    unidad?: boolean;
    descripcion?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["insumo"]>;
export type InsumoSelectScalar = {
    id?: boolean;
    nombre?: boolean;
    tipo?: boolean;
    unidad?: boolean;
    descripcion?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type InsumoOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "nombre" | "tipo" | "unidad" | "descripcion" | "createdAt" | "updatedAt", ExtArgs["result"]["insumo"]>;
export type InsumoInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    aplicaciones?: boolean | Prisma.Insumo$aplicacionesArgs<ExtArgs>;
    _count?: boolean | Prisma.InsumoCountOutputTypeDefaultArgs<ExtArgs>;
};
export type InsumoIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type InsumoIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $InsumoPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Insumo";
    objects: {
        aplicaciones: Prisma.$AplicacionInsumoPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        nombre: string;
        tipo: $Enums.TipoInsumo;
        unidad: string;
        descripcion: string | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["insumo"]>;
    composites: {};
};
export type InsumoGetPayload<S extends boolean | null | undefined | InsumoDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$InsumoPayload, S>;
export type InsumoCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<InsumoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: InsumoCountAggregateInputType | true;
};
export interface InsumoDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Insumo'];
        meta: {
            name: 'Insumo';
        };
    };
    findUnique<T extends InsumoFindUniqueArgs>(args: Prisma.SelectSubset<T, InsumoFindUniqueArgs<ExtArgs>>): Prisma.Prisma__InsumoClient<runtime.Types.Result.GetResult<Prisma.$InsumoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends InsumoFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, InsumoFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__InsumoClient<runtime.Types.Result.GetResult<Prisma.$InsumoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends InsumoFindFirstArgs>(args?: Prisma.SelectSubset<T, InsumoFindFirstArgs<ExtArgs>>): Prisma.Prisma__InsumoClient<runtime.Types.Result.GetResult<Prisma.$InsumoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends InsumoFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, InsumoFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__InsumoClient<runtime.Types.Result.GetResult<Prisma.$InsumoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends InsumoFindManyArgs>(args?: Prisma.SelectSubset<T, InsumoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$InsumoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends InsumoCreateArgs>(args: Prisma.SelectSubset<T, InsumoCreateArgs<ExtArgs>>): Prisma.Prisma__InsumoClient<runtime.Types.Result.GetResult<Prisma.$InsumoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends InsumoCreateManyArgs>(args?: Prisma.SelectSubset<T, InsumoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends InsumoCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, InsumoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$InsumoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends InsumoDeleteArgs>(args: Prisma.SelectSubset<T, InsumoDeleteArgs<ExtArgs>>): Prisma.Prisma__InsumoClient<runtime.Types.Result.GetResult<Prisma.$InsumoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends InsumoUpdateArgs>(args: Prisma.SelectSubset<T, InsumoUpdateArgs<ExtArgs>>): Prisma.Prisma__InsumoClient<runtime.Types.Result.GetResult<Prisma.$InsumoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends InsumoDeleteManyArgs>(args?: Prisma.SelectSubset<T, InsumoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends InsumoUpdateManyArgs>(args: Prisma.SelectSubset<T, InsumoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends InsumoUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, InsumoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$InsumoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends InsumoUpsertArgs>(args: Prisma.SelectSubset<T, InsumoUpsertArgs<ExtArgs>>): Prisma.Prisma__InsumoClient<runtime.Types.Result.GetResult<Prisma.$InsumoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends InsumoCountArgs>(args?: Prisma.Subset<T, InsumoCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], InsumoCountAggregateOutputType> : number>;
    aggregate<T extends InsumoAggregateArgs>(args: Prisma.Subset<T, InsumoAggregateArgs>): Prisma.PrismaPromise<GetInsumoAggregateType<T>>;
    groupBy<T extends InsumoGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: InsumoGroupByArgs['orderBy'];
    } : {
        orderBy?: InsumoGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, InsumoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInsumoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: InsumoFieldRefs;
}
export interface Prisma__InsumoClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    aplicaciones<T extends Prisma.Insumo$aplicacionesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Insumo$aplicacionesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AplicacionInsumoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface InsumoFieldRefs {
    readonly id: Prisma.FieldRef<"Insumo", 'Int'>;
    readonly nombre: Prisma.FieldRef<"Insumo", 'String'>;
    readonly tipo: Prisma.FieldRef<"Insumo", 'TipoInsumo'>;
    readonly unidad: Prisma.FieldRef<"Insumo", 'String'>;
    readonly descripcion: Prisma.FieldRef<"Insumo", 'String'>;
    readonly createdAt: Prisma.FieldRef<"Insumo", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Insumo", 'DateTime'>;
}
export type InsumoFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InsumoSelect<ExtArgs> | null;
    omit?: Prisma.InsumoOmit<ExtArgs> | null;
    include?: Prisma.InsumoInclude<ExtArgs> | null;
    where: Prisma.InsumoWhereUniqueInput;
};
export type InsumoFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InsumoSelect<ExtArgs> | null;
    omit?: Prisma.InsumoOmit<ExtArgs> | null;
    include?: Prisma.InsumoInclude<ExtArgs> | null;
    where: Prisma.InsumoWhereUniqueInput;
};
export type InsumoFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InsumoSelect<ExtArgs> | null;
    omit?: Prisma.InsumoOmit<ExtArgs> | null;
    include?: Prisma.InsumoInclude<ExtArgs> | null;
    where?: Prisma.InsumoWhereInput;
    orderBy?: Prisma.InsumoOrderByWithRelationInput | Prisma.InsumoOrderByWithRelationInput[];
    cursor?: Prisma.InsumoWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.InsumoScalarFieldEnum | Prisma.InsumoScalarFieldEnum[];
};
export type InsumoFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InsumoSelect<ExtArgs> | null;
    omit?: Prisma.InsumoOmit<ExtArgs> | null;
    include?: Prisma.InsumoInclude<ExtArgs> | null;
    where?: Prisma.InsumoWhereInput;
    orderBy?: Prisma.InsumoOrderByWithRelationInput | Prisma.InsumoOrderByWithRelationInput[];
    cursor?: Prisma.InsumoWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.InsumoScalarFieldEnum | Prisma.InsumoScalarFieldEnum[];
};
export type InsumoFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InsumoSelect<ExtArgs> | null;
    omit?: Prisma.InsumoOmit<ExtArgs> | null;
    include?: Prisma.InsumoInclude<ExtArgs> | null;
    where?: Prisma.InsumoWhereInput;
    orderBy?: Prisma.InsumoOrderByWithRelationInput | Prisma.InsumoOrderByWithRelationInput[];
    cursor?: Prisma.InsumoWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.InsumoScalarFieldEnum | Prisma.InsumoScalarFieldEnum[];
};
export type InsumoCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InsumoSelect<ExtArgs> | null;
    omit?: Prisma.InsumoOmit<ExtArgs> | null;
    include?: Prisma.InsumoInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.InsumoCreateInput, Prisma.InsumoUncheckedCreateInput>;
};
export type InsumoCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.InsumoCreateManyInput | Prisma.InsumoCreateManyInput[];
    skipDuplicates?: boolean;
};
export type InsumoCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InsumoSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.InsumoOmit<ExtArgs> | null;
    data: Prisma.InsumoCreateManyInput | Prisma.InsumoCreateManyInput[];
    skipDuplicates?: boolean;
};
export type InsumoUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InsumoSelect<ExtArgs> | null;
    omit?: Prisma.InsumoOmit<ExtArgs> | null;
    include?: Prisma.InsumoInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.InsumoUpdateInput, Prisma.InsumoUncheckedUpdateInput>;
    where: Prisma.InsumoWhereUniqueInput;
};
export type InsumoUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.InsumoUpdateManyMutationInput, Prisma.InsumoUncheckedUpdateManyInput>;
    where?: Prisma.InsumoWhereInput;
    limit?: number;
};
export type InsumoUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InsumoSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.InsumoOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.InsumoUpdateManyMutationInput, Prisma.InsumoUncheckedUpdateManyInput>;
    where?: Prisma.InsumoWhereInput;
    limit?: number;
};
export type InsumoUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InsumoSelect<ExtArgs> | null;
    omit?: Prisma.InsumoOmit<ExtArgs> | null;
    include?: Prisma.InsumoInclude<ExtArgs> | null;
    where: Prisma.InsumoWhereUniqueInput;
    create: Prisma.XOR<Prisma.InsumoCreateInput, Prisma.InsumoUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.InsumoUpdateInput, Prisma.InsumoUncheckedUpdateInput>;
};
export type InsumoDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InsumoSelect<ExtArgs> | null;
    omit?: Prisma.InsumoOmit<ExtArgs> | null;
    include?: Prisma.InsumoInclude<ExtArgs> | null;
    where: Prisma.InsumoWhereUniqueInput;
};
export type InsumoDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.InsumoWhereInput;
    limit?: number;
};
export type Insumo$aplicacionesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AplicacionInsumoSelect<ExtArgs> | null;
    omit?: Prisma.AplicacionInsumoOmit<ExtArgs> | null;
    include?: Prisma.AplicacionInsumoInclude<ExtArgs> | null;
    where?: Prisma.AplicacionInsumoWhereInput;
    orderBy?: Prisma.AplicacionInsumoOrderByWithRelationInput | Prisma.AplicacionInsumoOrderByWithRelationInput[];
    cursor?: Prisma.AplicacionInsumoWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AplicacionInsumoScalarFieldEnum | Prisma.AplicacionInsumoScalarFieldEnum[];
};
export type InsumoDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InsumoSelect<ExtArgs> | null;
    omit?: Prisma.InsumoOmit<ExtArgs> | null;
    include?: Prisma.InsumoInclude<ExtArgs> | null;
};
