import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type TipoCultivoModel = runtime.Types.Result.DefaultSelection<Prisma.$TipoCultivoPayload>;
export type AggregateTipoCultivo = {
    _count: TipoCultivoCountAggregateOutputType | null;
    _avg: TipoCultivoAvgAggregateOutputType | null;
    _sum: TipoCultivoSumAggregateOutputType | null;
    _min: TipoCultivoMinAggregateOutputType | null;
    _max: TipoCultivoMaxAggregateOutputType | null;
};
export type TipoCultivoAvgAggregateOutputType = {
    id: number | null;
};
export type TipoCultivoSumAggregateOutputType = {
    id: number | null;
};
export type TipoCultivoMinAggregateOutputType = {
    id: number | null;
    nombre: string | null;
    descripcion: string | null;
    createdAt: Date | null;
};
export type TipoCultivoMaxAggregateOutputType = {
    id: number | null;
    nombre: string | null;
    descripcion: string | null;
    createdAt: Date | null;
};
export type TipoCultivoCountAggregateOutputType = {
    id: number;
    nombre: number;
    descripcion: number;
    createdAt: number;
    _all: number;
};
export type TipoCultivoAvgAggregateInputType = {
    id?: true;
};
export type TipoCultivoSumAggregateInputType = {
    id?: true;
};
export type TipoCultivoMinAggregateInputType = {
    id?: true;
    nombre?: true;
    descripcion?: true;
    createdAt?: true;
};
export type TipoCultivoMaxAggregateInputType = {
    id?: true;
    nombre?: true;
    descripcion?: true;
    createdAt?: true;
};
export type TipoCultivoCountAggregateInputType = {
    id?: true;
    nombre?: true;
    descripcion?: true;
    createdAt?: true;
    _all?: true;
};
export type TipoCultivoAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TipoCultivoWhereInput;
    orderBy?: Prisma.TipoCultivoOrderByWithRelationInput | Prisma.TipoCultivoOrderByWithRelationInput[];
    cursor?: Prisma.TipoCultivoWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | TipoCultivoCountAggregateInputType;
    _avg?: TipoCultivoAvgAggregateInputType;
    _sum?: TipoCultivoSumAggregateInputType;
    _min?: TipoCultivoMinAggregateInputType;
    _max?: TipoCultivoMaxAggregateInputType;
};
export type GetTipoCultivoAggregateType<T extends TipoCultivoAggregateArgs> = {
    [P in keyof T & keyof AggregateTipoCultivo]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateTipoCultivo[P]> : Prisma.GetScalarType<T[P], AggregateTipoCultivo[P]>;
};
export type TipoCultivoGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TipoCultivoWhereInput;
    orderBy?: Prisma.TipoCultivoOrderByWithAggregationInput | Prisma.TipoCultivoOrderByWithAggregationInput[];
    by: Prisma.TipoCultivoScalarFieldEnum[] | Prisma.TipoCultivoScalarFieldEnum;
    having?: Prisma.TipoCultivoScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: TipoCultivoCountAggregateInputType | true;
    _avg?: TipoCultivoAvgAggregateInputType;
    _sum?: TipoCultivoSumAggregateInputType;
    _min?: TipoCultivoMinAggregateInputType;
    _max?: TipoCultivoMaxAggregateInputType;
};
export type TipoCultivoGroupByOutputType = {
    id: number;
    nombre: string;
    descripcion: string | null;
    createdAt: Date;
    _count: TipoCultivoCountAggregateOutputType | null;
    _avg: TipoCultivoAvgAggregateOutputType | null;
    _sum: TipoCultivoSumAggregateOutputType | null;
    _min: TipoCultivoMinAggregateOutputType | null;
    _max: TipoCultivoMaxAggregateOutputType | null;
};
export type GetTipoCultivoGroupByPayload<T extends TipoCultivoGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<TipoCultivoGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof TipoCultivoGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], TipoCultivoGroupByOutputType[P]> : Prisma.GetScalarType<T[P], TipoCultivoGroupByOutputType[P]>;
}>>;
export type TipoCultivoWhereInput = {
    AND?: Prisma.TipoCultivoWhereInput | Prisma.TipoCultivoWhereInput[];
    OR?: Prisma.TipoCultivoWhereInput[];
    NOT?: Prisma.TipoCultivoWhereInput | Prisma.TipoCultivoWhereInput[];
    id?: Prisma.IntFilter<"TipoCultivo"> | number;
    nombre?: Prisma.StringFilter<"TipoCultivo"> | string;
    descripcion?: Prisma.StringNullableFilter<"TipoCultivo"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"TipoCultivo"> | Date | string;
    siembras?: Prisma.SiembraListRelationFilter;
};
export type TipoCultivoOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    nombre?: Prisma.SortOrder;
    descripcion?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    siembras?: Prisma.SiembraOrderByRelationAggregateInput;
};
export type TipoCultivoWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    nombre?: string;
    AND?: Prisma.TipoCultivoWhereInput | Prisma.TipoCultivoWhereInput[];
    OR?: Prisma.TipoCultivoWhereInput[];
    NOT?: Prisma.TipoCultivoWhereInput | Prisma.TipoCultivoWhereInput[];
    descripcion?: Prisma.StringNullableFilter<"TipoCultivo"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"TipoCultivo"> | Date | string;
    siembras?: Prisma.SiembraListRelationFilter;
}, "id" | "nombre">;
export type TipoCultivoOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    nombre?: Prisma.SortOrder;
    descripcion?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.TipoCultivoCountOrderByAggregateInput;
    _avg?: Prisma.TipoCultivoAvgOrderByAggregateInput;
    _max?: Prisma.TipoCultivoMaxOrderByAggregateInput;
    _min?: Prisma.TipoCultivoMinOrderByAggregateInput;
    _sum?: Prisma.TipoCultivoSumOrderByAggregateInput;
};
export type TipoCultivoScalarWhereWithAggregatesInput = {
    AND?: Prisma.TipoCultivoScalarWhereWithAggregatesInput | Prisma.TipoCultivoScalarWhereWithAggregatesInput[];
    OR?: Prisma.TipoCultivoScalarWhereWithAggregatesInput[];
    NOT?: Prisma.TipoCultivoScalarWhereWithAggregatesInput | Prisma.TipoCultivoScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"TipoCultivo"> | number;
    nombre?: Prisma.StringWithAggregatesFilter<"TipoCultivo"> | string;
    descripcion?: Prisma.StringNullableWithAggregatesFilter<"TipoCultivo"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"TipoCultivo"> | Date | string;
};
export type TipoCultivoCreateInput = {
    nombre: string;
    descripcion?: string | null;
    createdAt?: Date | string;
    siembras?: Prisma.SiembraCreateNestedManyWithoutTipoCultivoInput;
};
export type TipoCultivoUncheckedCreateInput = {
    id?: number;
    nombre: string;
    descripcion?: string | null;
    createdAt?: Date | string;
    siembras?: Prisma.SiembraUncheckedCreateNestedManyWithoutTipoCultivoInput;
};
export type TipoCultivoUpdateInput = {
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    descripcion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    siembras?: Prisma.SiembraUpdateManyWithoutTipoCultivoNestedInput;
};
export type TipoCultivoUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    descripcion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    siembras?: Prisma.SiembraUncheckedUpdateManyWithoutTipoCultivoNestedInput;
};
export type TipoCultivoCreateManyInput = {
    id?: number;
    nombre: string;
    descripcion?: string | null;
    createdAt?: Date | string;
};
export type TipoCultivoUpdateManyMutationInput = {
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    descripcion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TipoCultivoUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    descripcion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TipoCultivoCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    nombre?: Prisma.SortOrder;
    descripcion?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type TipoCultivoAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
};
export type TipoCultivoMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    nombre?: Prisma.SortOrder;
    descripcion?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type TipoCultivoMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    nombre?: Prisma.SortOrder;
    descripcion?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type TipoCultivoSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
};
export type TipoCultivoScalarRelationFilter = {
    is?: Prisma.TipoCultivoWhereInput;
    isNot?: Prisma.TipoCultivoWhereInput;
};
export type TipoCultivoCreateNestedOneWithoutSiembrasInput = {
    create?: Prisma.XOR<Prisma.TipoCultivoCreateWithoutSiembrasInput, Prisma.TipoCultivoUncheckedCreateWithoutSiembrasInput>;
    connectOrCreate?: Prisma.TipoCultivoCreateOrConnectWithoutSiembrasInput;
    connect?: Prisma.TipoCultivoWhereUniqueInput;
};
export type TipoCultivoUpdateOneRequiredWithoutSiembrasNestedInput = {
    create?: Prisma.XOR<Prisma.TipoCultivoCreateWithoutSiembrasInput, Prisma.TipoCultivoUncheckedCreateWithoutSiembrasInput>;
    connectOrCreate?: Prisma.TipoCultivoCreateOrConnectWithoutSiembrasInput;
    upsert?: Prisma.TipoCultivoUpsertWithoutSiembrasInput;
    connect?: Prisma.TipoCultivoWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.TipoCultivoUpdateToOneWithWhereWithoutSiembrasInput, Prisma.TipoCultivoUpdateWithoutSiembrasInput>, Prisma.TipoCultivoUncheckedUpdateWithoutSiembrasInput>;
};
export type TipoCultivoCreateWithoutSiembrasInput = {
    nombre: string;
    descripcion?: string | null;
    createdAt?: Date | string;
};
export type TipoCultivoUncheckedCreateWithoutSiembrasInput = {
    id?: number;
    nombre: string;
    descripcion?: string | null;
    createdAt?: Date | string;
};
export type TipoCultivoCreateOrConnectWithoutSiembrasInput = {
    where: Prisma.TipoCultivoWhereUniqueInput;
    create: Prisma.XOR<Prisma.TipoCultivoCreateWithoutSiembrasInput, Prisma.TipoCultivoUncheckedCreateWithoutSiembrasInput>;
};
export type TipoCultivoUpsertWithoutSiembrasInput = {
    update: Prisma.XOR<Prisma.TipoCultivoUpdateWithoutSiembrasInput, Prisma.TipoCultivoUncheckedUpdateWithoutSiembrasInput>;
    create: Prisma.XOR<Prisma.TipoCultivoCreateWithoutSiembrasInput, Prisma.TipoCultivoUncheckedCreateWithoutSiembrasInput>;
    where?: Prisma.TipoCultivoWhereInput;
};
export type TipoCultivoUpdateToOneWithWhereWithoutSiembrasInput = {
    where?: Prisma.TipoCultivoWhereInput;
    data: Prisma.XOR<Prisma.TipoCultivoUpdateWithoutSiembrasInput, Prisma.TipoCultivoUncheckedUpdateWithoutSiembrasInput>;
};
export type TipoCultivoUpdateWithoutSiembrasInput = {
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    descripcion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TipoCultivoUncheckedUpdateWithoutSiembrasInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    descripcion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TipoCultivoCountOutputType = {
    siembras: number;
};
export type TipoCultivoCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    siembras?: boolean | TipoCultivoCountOutputTypeCountSiembrasArgs;
};
export type TipoCultivoCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TipoCultivoCountOutputTypeSelect<ExtArgs> | null;
};
export type TipoCultivoCountOutputTypeCountSiembrasArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SiembraWhereInput;
};
export type TipoCultivoSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    nombre?: boolean;
    descripcion?: boolean;
    createdAt?: boolean;
    siembras?: boolean | Prisma.TipoCultivo$siembrasArgs<ExtArgs>;
    _count?: boolean | Prisma.TipoCultivoCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["tipoCultivo"]>;
export type TipoCultivoSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    nombre?: boolean;
    descripcion?: boolean;
    createdAt?: boolean;
}, ExtArgs["result"]["tipoCultivo"]>;
export type TipoCultivoSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    nombre?: boolean;
    descripcion?: boolean;
    createdAt?: boolean;
}, ExtArgs["result"]["tipoCultivo"]>;
export type TipoCultivoSelectScalar = {
    id?: boolean;
    nombre?: boolean;
    descripcion?: boolean;
    createdAt?: boolean;
};
export type TipoCultivoOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "nombre" | "descripcion" | "createdAt", ExtArgs["result"]["tipoCultivo"]>;
export type TipoCultivoInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    siembras?: boolean | Prisma.TipoCultivo$siembrasArgs<ExtArgs>;
    _count?: boolean | Prisma.TipoCultivoCountOutputTypeDefaultArgs<ExtArgs>;
};
export type TipoCultivoIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type TipoCultivoIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $TipoCultivoPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "TipoCultivo";
    objects: {
        siembras: Prisma.$SiembraPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        nombre: string;
        descripcion: string | null;
        createdAt: Date;
    }, ExtArgs["result"]["tipoCultivo"]>;
    composites: {};
};
export type TipoCultivoGetPayload<S extends boolean | null | undefined | TipoCultivoDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$TipoCultivoPayload, S>;
export type TipoCultivoCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<TipoCultivoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: TipoCultivoCountAggregateInputType | true;
};
export interface TipoCultivoDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['TipoCultivo'];
        meta: {
            name: 'TipoCultivo';
        };
    };
    findUnique<T extends TipoCultivoFindUniqueArgs>(args: Prisma.SelectSubset<T, TipoCultivoFindUniqueArgs<ExtArgs>>): Prisma.Prisma__TipoCultivoClient<runtime.Types.Result.GetResult<Prisma.$TipoCultivoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends TipoCultivoFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, TipoCultivoFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__TipoCultivoClient<runtime.Types.Result.GetResult<Prisma.$TipoCultivoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends TipoCultivoFindFirstArgs>(args?: Prisma.SelectSubset<T, TipoCultivoFindFirstArgs<ExtArgs>>): Prisma.Prisma__TipoCultivoClient<runtime.Types.Result.GetResult<Prisma.$TipoCultivoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends TipoCultivoFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, TipoCultivoFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__TipoCultivoClient<runtime.Types.Result.GetResult<Prisma.$TipoCultivoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends TipoCultivoFindManyArgs>(args?: Prisma.SelectSubset<T, TipoCultivoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TipoCultivoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends TipoCultivoCreateArgs>(args: Prisma.SelectSubset<T, TipoCultivoCreateArgs<ExtArgs>>): Prisma.Prisma__TipoCultivoClient<runtime.Types.Result.GetResult<Prisma.$TipoCultivoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends TipoCultivoCreateManyArgs>(args?: Prisma.SelectSubset<T, TipoCultivoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends TipoCultivoCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, TipoCultivoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TipoCultivoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends TipoCultivoDeleteArgs>(args: Prisma.SelectSubset<T, TipoCultivoDeleteArgs<ExtArgs>>): Prisma.Prisma__TipoCultivoClient<runtime.Types.Result.GetResult<Prisma.$TipoCultivoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends TipoCultivoUpdateArgs>(args: Prisma.SelectSubset<T, TipoCultivoUpdateArgs<ExtArgs>>): Prisma.Prisma__TipoCultivoClient<runtime.Types.Result.GetResult<Prisma.$TipoCultivoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends TipoCultivoDeleteManyArgs>(args?: Prisma.SelectSubset<T, TipoCultivoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends TipoCultivoUpdateManyArgs>(args: Prisma.SelectSubset<T, TipoCultivoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends TipoCultivoUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, TipoCultivoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TipoCultivoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends TipoCultivoUpsertArgs>(args: Prisma.SelectSubset<T, TipoCultivoUpsertArgs<ExtArgs>>): Prisma.Prisma__TipoCultivoClient<runtime.Types.Result.GetResult<Prisma.$TipoCultivoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends TipoCultivoCountArgs>(args?: Prisma.Subset<T, TipoCultivoCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], TipoCultivoCountAggregateOutputType> : number>;
    aggregate<T extends TipoCultivoAggregateArgs>(args: Prisma.Subset<T, TipoCultivoAggregateArgs>): Prisma.PrismaPromise<GetTipoCultivoAggregateType<T>>;
    groupBy<T extends TipoCultivoGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: TipoCultivoGroupByArgs['orderBy'];
    } : {
        orderBy?: TipoCultivoGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, TipoCultivoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTipoCultivoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: TipoCultivoFieldRefs;
}
export interface Prisma__TipoCultivoClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    siembras<T extends Prisma.TipoCultivo$siembrasArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.TipoCultivo$siembrasArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SiembraPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface TipoCultivoFieldRefs {
    readonly id: Prisma.FieldRef<"TipoCultivo", 'Int'>;
    readonly nombre: Prisma.FieldRef<"TipoCultivo", 'String'>;
    readonly descripcion: Prisma.FieldRef<"TipoCultivo", 'String'>;
    readonly createdAt: Prisma.FieldRef<"TipoCultivo", 'DateTime'>;
}
export type TipoCultivoFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TipoCultivoSelect<ExtArgs> | null;
    omit?: Prisma.TipoCultivoOmit<ExtArgs> | null;
    include?: Prisma.TipoCultivoInclude<ExtArgs> | null;
    where: Prisma.TipoCultivoWhereUniqueInput;
};
export type TipoCultivoFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TipoCultivoSelect<ExtArgs> | null;
    omit?: Prisma.TipoCultivoOmit<ExtArgs> | null;
    include?: Prisma.TipoCultivoInclude<ExtArgs> | null;
    where: Prisma.TipoCultivoWhereUniqueInput;
};
export type TipoCultivoFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TipoCultivoSelect<ExtArgs> | null;
    omit?: Prisma.TipoCultivoOmit<ExtArgs> | null;
    include?: Prisma.TipoCultivoInclude<ExtArgs> | null;
    where?: Prisma.TipoCultivoWhereInput;
    orderBy?: Prisma.TipoCultivoOrderByWithRelationInput | Prisma.TipoCultivoOrderByWithRelationInput[];
    cursor?: Prisma.TipoCultivoWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TipoCultivoScalarFieldEnum | Prisma.TipoCultivoScalarFieldEnum[];
};
export type TipoCultivoFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TipoCultivoSelect<ExtArgs> | null;
    omit?: Prisma.TipoCultivoOmit<ExtArgs> | null;
    include?: Prisma.TipoCultivoInclude<ExtArgs> | null;
    where?: Prisma.TipoCultivoWhereInput;
    orderBy?: Prisma.TipoCultivoOrderByWithRelationInput | Prisma.TipoCultivoOrderByWithRelationInput[];
    cursor?: Prisma.TipoCultivoWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TipoCultivoScalarFieldEnum | Prisma.TipoCultivoScalarFieldEnum[];
};
export type TipoCultivoFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TipoCultivoSelect<ExtArgs> | null;
    omit?: Prisma.TipoCultivoOmit<ExtArgs> | null;
    include?: Prisma.TipoCultivoInclude<ExtArgs> | null;
    where?: Prisma.TipoCultivoWhereInput;
    orderBy?: Prisma.TipoCultivoOrderByWithRelationInput | Prisma.TipoCultivoOrderByWithRelationInput[];
    cursor?: Prisma.TipoCultivoWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TipoCultivoScalarFieldEnum | Prisma.TipoCultivoScalarFieldEnum[];
};
export type TipoCultivoCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TipoCultivoSelect<ExtArgs> | null;
    omit?: Prisma.TipoCultivoOmit<ExtArgs> | null;
    include?: Prisma.TipoCultivoInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.TipoCultivoCreateInput, Prisma.TipoCultivoUncheckedCreateInput>;
};
export type TipoCultivoCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.TipoCultivoCreateManyInput | Prisma.TipoCultivoCreateManyInput[];
    skipDuplicates?: boolean;
};
export type TipoCultivoCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TipoCultivoSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.TipoCultivoOmit<ExtArgs> | null;
    data: Prisma.TipoCultivoCreateManyInput | Prisma.TipoCultivoCreateManyInput[];
    skipDuplicates?: boolean;
};
export type TipoCultivoUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TipoCultivoSelect<ExtArgs> | null;
    omit?: Prisma.TipoCultivoOmit<ExtArgs> | null;
    include?: Prisma.TipoCultivoInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.TipoCultivoUpdateInput, Prisma.TipoCultivoUncheckedUpdateInput>;
    where: Prisma.TipoCultivoWhereUniqueInput;
};
export type TipoCultivoUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.TipoCultivoUpdateManyMutationInput, Prisma.TipoCultivoUncheckedUpdateManyInput>;
    where?: Prisma.TipoCultivoWhereInput;
    limit?: number;
};
export type TipoCultivoUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TipoCultivoSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.TipoCultivoOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.TipoCultivoUpdateManyMutationInput, Prisma.TipoCultivoUncheckedUpdateManyInput>;
    where?: Prisma.TipoCultivoWhereInput;
    limit?: number;
};
export type TipoCultivoUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TipoCultivoSelect<ExtArgs> | null;
    omit?: Prisma.TipoCultivoOmit<ExtArgs> | null;
    include?: Prisma.TipoCultivoInclude<ExtArgs> | null;
    where: Prisma.TipoCultivoWhereUniqueInput;
    create: Prisma.XOR<Prisma.TipoCultivoCreateInput, Prisma.TipoCultivoUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.TipoCultivoUpdateInput, Prisma.TipoCultivoUncheckedUpdateInput>;
};
export type TipoCultivoDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TipoCultivoSelect<ExtArgs> | null;
    omit?: Prisma.TipoCultivoOmit<ExtArgs> | null;
    include?: Prisma.TipoCultivoInclude<ExtArgs> | null;
    where: Prisma.TipoCultivoWhereUniqueInput;
};
export type TipoCultivoDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TipoCultivoWhereInput;
    limit?: number;
};
export type TipoCultivo$siembrasArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SiembraSelect<ExtArgs> | null;
    omit?: Prisma.SiembraOmit<ExtArgs> | null;
    include?: Prisma.SiembraInclude<ExtArgs> | null;
    where?: Prisma.SiembraWhereInput;
    orderBy?: Prisma.SiembraOrderByWithRelationInput | Prisma.SiembraOrderByWithRelationInput[];
    cursor?: Prisma.SiembraWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SiembraScalarFieldEnum | Prisma.SiembraScalarFieldEnum[];
};
export type TipoCultivoDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TipoCultivoSelect<ExtArgs> | null;
    omit?: Prisma.TipoCultivoOmit<ExtArgs> | null;
    include?: Prisma.TipoCultivoInclude<ExtArgs> | null;
};
