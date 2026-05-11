import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type SiembraModel = runtime.Types.Result.DefaultSelection<Prisma.$SiembraPayload>;
export type AggregateSiembra = {
    _count: SiembraCountAggregateOutputType | null;
    _avg: SiembraAvgAggregateOutputType | null;
    _sum: SiembraSumAggregateOutputType | null;
    _min: SiembraMinAggregateOutputType | null;
    _max: SiembraMaxAggregateOutputType | null;
};
export type SiembraAvgAggregateOutputType = {
    id: number | null;
    loteId: number | null;
    tipoCultivoId: number | null;
    densidad: number | null;
};
export type SiembraSumAggregateOutputType = {
    id: number | null;
    loteId: number | null;
    tipoCultivoId: number | null;
    densidad: number | null;
};
export type SiembraMinAggregateOutputType = {
    id: number | null;
    loteId: number | null;
    tipoCultivoId: number | null;
    fechaSiembra: Date | null;
    densidad: number | null;
    observaciones: string | null;
    estado: $Enums.EstadoSiembra | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type SiembraMaxAggregateOutputType = {
    id: number | null;
    loteId: number | null;
    tipoCultivoId: number | null;
    fechaSiembra: Date | null;
    densidad: number | null;
    observaciones: string | null;
    estado: $Enums.EstadoSiembra | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type SiembraCountAggregateOutputType = {
    id: number;
    loteId: number;
    tipoCultivoId: number;
    fechaSiembra: number;
    densidad: number;
    observaciones: number;
    estado: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type SiembraAvgAggregateInputType = {
    id?: true;
    loteId?: true;
    tipoCultivoId?: true;
    densidad?: true;
};
export type SiembraSumAggregateInputType = {
    id?: true;
    loteId?: true;
    tipoCultivoId?: true;
    densidad?: true;
};
export type SiembraMinAggregateInputType = {
    id?: true;
    loteId?: true;
    tipoCultivoId?: true;
    fechaSiembra?: true;
    densidad?: true;
    observaciones?: true;
    estado?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type SiembraMaxAggregateInputType = {
    id?: true;
    loteId?: true;
    tipoCultivoId?: true;
    fechaSiembra?: true;
    densidad?: true;
    observaciones?: true;
    estado?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type SiembraCountAggregateInputType = {
    id?: true;
    loteId?: true;
    tipoCultivoId?: true;
    fechaSiembra?: true;
    densidad?: true;
    observaciones?: true;
    estado?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type SiembraAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SiembraWhereInput;
    orderBy?: Prisma.SiembraOrderByWithRelationInput | Prisma.SiembraOrderByWithRelationInput[];
    cursor?: Prisma.SiembraWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | SiembraCountAggregateInputType;
    _avg?: SiembraAvgAggregateInputType;
    _sum?: SiembraSumAggregateInputType;
    _min?: SiembraMinAggregateInputType;
    _max?: SiembraMaxAggregateInputType;
};
export type GetSiembraAggregateType<T extends SiembraAggregateArgs> = {
    [P in keyof T & keyof AggregateSiembra]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateSiembra[P]> : Prisma.GetScalarType<T[P], AggregateSiembra[P]>;
};
export type SiembraGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SiembraWhereInput;
    orderBy?: Prisma.SiembraOrderByWithAggregationInput | Prisma.SiembraOrderByWithAggregationInput[];
    by: Prisma.SiembraScalarFieldEnum[] | Prisma.SiembraScalarFieldEnum;
    having?: Prisma.SiembraScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: SiembraCountAggregateInputType | true;
    _avg?: SiembraAvgAggregateInputType;
    _sum?: SiembraSumAggregateInputType;
    _min?: SiembraMinAggregateInputType;
    _max?: SiembraMaxAggregateInputType;
};
export type SiembraGroupByOutputType = {
    id: number;
    loteId: number;
    tipoCultivoId: number;
    fechaSiembra: Date;
    densidad: number | null;
    observaciones: string | null;
    estado: $Enums.EstadoSiembra;
    createdAt: Date;
    updatedAt: Date;
    _count: SiembraCountAggregateOutputType | null;
    _avg: SiembraAvgAggregateOutputType | null;
    _sum: SiembraSumAggregateOutputType | null;
    _min: SiembraMinAggregateOutputType | null;
    _max: SiembraMaxAggregateOutputType | null;
};
export type GetSiembraGroupByPayload<T extends SiembraGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<SiembraGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof SiembraGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], SiembraGroupByOutputType[P]> : Prisma.GetScalarType<T[P], SiembraGroupByOutputType[P]>;
}>>;
export type SiembraWhereInput = {
    AND?: Prisma.SiembraWhereInput | Prisma.SiembraWhereInput[];
    OR?: Prisma.SiembraWhereInput[];
    NOT?: Prisma.SiembraWhereInput | Prisma.SiembraWhereInput[];
    id?: Prisma.IntFilter<"Siembra"> | number;
    loteId?: Prisma.IntFilter<"Siembra"> | number;
    tipoCultivoId?: Prisma.IntFilter<"Siembra"> | number;
    fechaSiembra?: Prisma.DateTimeFilter<"Siembra"> | Date | string;
    densidad?: Prisma.FloatNullableFilter<"Siembra"> | number | null;
    observaciones?: Prisma.StringNullableFilter<"Siembra"> | string | null;
    estado?: Prisma.EnumEstadoSiembraFilter<"Siembra"> | $Enums.EstadoSiembra;
    createdAt?: Prisma.DateTimeFilter<"Siembra"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Siembra"> | Date | string;
    lote?: Prisma.XOR<Prisma.LoteScalarRelationFilter, Prisma.LoteWhereInput>;
    tipoCultivo?: Prisma.XOR<Prisma.TipoCultivoScalarRelationFilter, Prisma.TipoCultivoWhereInput>;
    cosechas?: Prisma.CosechaListRelationFilter;
    aplicaciones?: Prisma.AplicacionInsumoListRelationFilter;
};
export type SiembraOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    loteId?: Prisma.SortOrder;
    tipoCultivoId?: Prisma.SortOrder;
    fechaSiembra?: Prisma.SortOrder;
    densidad?: Prisma.SortOrderInput | Prisma.SortOrder;
    observaciones?: Prisma.SortOrderInput | Prisma.SortOrder;
    estado?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    lote?: Prisma.LoteOrderByWithRelationInput;
    tipoCultivo?: Prisma.TipoCultivoOrderByWithRelationInput;
    cosechas?: Prisma.CosechaOrderByRelationAggregateInput;
    aplicaciones?: Prisma.AplicacionInsumoOrderByRelationAggregateInput;
};
export type SiembraWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    AND?: Prisma.SiembraWhereInput | Prisma.SiembraWhereInput[];
    OR?: Prisma.SiembraWhereInput[];
    NOT?: Prisma.SiembraWhereInput | Prisma.SiembraWhereInput[];
    loteId?: Prisma.IntFilter<"Siembra"> | number;
    tipoCultivoId?: Prisma.IntFilter<"Siembra"> | number;
    fechaSiembra?: Prisma.DateTimeFilter<"Siembra"> | Date | string;
    densidad?: Prisma.FloatNullableFilter<"Siembra"> | number | null;
    observaciones?: Prisma.StringNullableFilter<"Siembra"> | string | null;
    estado?: Prisma.EnumEstadoSiembraFilter<"Siembra"> | $Enums.EstadoSiembra;
    createdAt?: Prisma.DateTimeFilter<"Siembra"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Siembra"> | Date | string;
    lote?: Prisma.XOR<Prisma.LoteScalarRelationFilter, Prisma.LoteWhereInput>;
    tipoCultivo?: Prisma.XOR<Prisma.TipoCultivoScalarRelationFilter, Prisma.TipoCultivoWhereInput>;
    cosechas?: Prisma.CosechaListRelationFilter;
    aplicaciones?: Prisma.AplicacionInsumoListRelationFilter;
}, "id">;
export type SiembraOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    loteId?: Prisma.SortOrder;
    tipoCultivoId?: Prisma.SortOrder;
    fechaSiembra?: Prisma.SortOrder;
    densidad?: Prisma.SortOrderInput | Prisma.SortOrder;
    observaciones?: Prisma.SortOrderInput | Prisma.SortOrder;
    estado?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.SiembraCountOrderByAggregateInput;
    _avg?: Prisma.SiembraAvgOrderByAggregateInput;
    _max?: Prisma.SiembraMaxOrderByAggregateInput;
    _min?: Prisma.SiembraMinOrderByAggregateInput;
    _sum?: Prisma.SiembraSumOrderByAggregateInput;
};
export type SiembraScalarWhereWithAggregatesInput = {
    AND?: Prisma.SiembraScalarWhereWithAggregatesInput | Prisma.SiembraScalarWhereWithAggregatesInput[];
    OR?: Prisma.SiembraScalarWhereWithAggregatesInput[];
    NOT?: Prisma.SiembraScalarWhereWithAggregatesInput | Prisma.SiembraScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"Siembra"> | number;
    loteId?: Prisma.IntWithAggregatesFilter<"Siembra"> | number;
    tipoCultivoId?: Prisma.IntWithAggregatesFilter<"Siembra"> | number;
    fechaSiembra?: Prisma.DateTimeWithAggregatesFilter<"Siembra"> | Date | string;
    densidad?: Prisma.FloatNullableWithAggregatesFilter<"Siembra"> | number | null;
    observaciones?: Prisma.StringNullableWithAggregatesFilter<"Siembra"> | string | null;
    estado?: Prisma.EnumEstadoSiembraWithAggregatesFilter<"Siembra"> | $Enums.EstadoSiembra;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Siembra"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Siembra"> | Date | string;
};
export type SiembraCreateInput = {
    fechaSiembra: Date | string;
    densidad?: number | null;
    observaciones?: string | null;
    estado?: $Enums.EstadoSiembra;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    lote: Prisma.LoteCreateNestedOneWithoutSiembrasInput;
    tipoCultivo: Prisma.TipoCultivoCreateNestedOneWithoutSiembrasInput;
    cosechas?: Prisma.CosechaCreateNestedManyWithoutSiembraInput;
    aplicaciones?: Prisma.AplicacionInsumoCreateNestedManyWithoutSiembraInput;
};
export type SiembraUncheckedCreateInput = {
    id?: number;
    loteId: number;
    tipoCultivoId: number;
    fechaSiembra: Date | string;
    densidad?: number | null;
    observaciones?: string | null;
    estado?: $Enums.EstadoSiembra;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    cosechas?: Prisma.CosechaUncheckedCreateNestedManyWithoutSiembraInput;
    aplicaciones?: Prisma.AplicacionInsumoUncheckedCreateNestedManyWithoutSiembraInput;
};
export type SiembraUpdateInput = {
    fechaSiembra?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    densidad?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    observaciones?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    estado?: Prisma.EnumEstadoSiembraFieldUpdateOperationsInput | $Enums.EstadoSiembra;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    lote?: Prisma.LoteUpdateOneRequiredWithoutSiembrasNestedInput;
    tipoCultivo?: Prisma.TipoCultivoUpdateOneRequiredWithoutSiembrasNestedInput;
    cosechas?: Prisma.CosechaUpdateManyWithoutSiembraNestedInput;
    aplicaciones?: Prisma.AplicacionInsumoUpdateManyWithoutSiembraNestedInput;
};
export type SiembraUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    loteId?: Prisma.IntFieldUpdateOperationsInput | number;
    tipoCultivoId?: Prisma.IntFieldUpdateOperationsInput | number;
    fechaSiembra?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    densidad?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    observaciones?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    estado?: Prisma.EnumEstadoSiembraFieldUpdateOperationsInput | $Enums.EstadoSiembra;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    cosechas?: Prisma.CosechaUncheckedUpdateManyWithoutSiembraNestedInput;
    aplicaciones?: Prisma.AplicacionInsumoUncheckedUpdateManyWithoutSiembraNestedInput;
};
export type SiembraCreateManyInput = {
    id?: number;
    loteId: number;
    tipoCultivoId: number;
    fechaSiembra: Date | string;
    densidad?: number | null;
    observaciones?: string | null;
    estado?: $Enums.EstadoSiembra;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type SiembraUpdateManyMutationInput = {
    fechaSiembra?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    densidad?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    observaciones?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    estado?: Prisma.EnumEstadoSiembraFieldUpdateOperationsInput | $Enums.EstadoSiembra;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SiembraUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    loteId?: Prisma.IntFieldUpdateOperationsInput | number;
    tipoCultivoId?: Prisma.IntFieldUpdateOperationsInput | number;
    fechaSiembra?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    densidad?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    observaciones?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    estado?: Prisma.EnumEstadoSiembraFieldUpdateOperationsInput | $Enums.EstadoSiembra;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SiembraListRelationFilter = {
    every?: Prisma.SiembraWhereInput;
    some?: Prisma.SiembraWhereInput;
    none?: Prisma.SiembraWhereInput;
};
export type SiembraOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type SiembraCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    loteId?: Prisma.SortOrder;
    tipoCultivoId?: Prisma.SortOrder;
    fechaSiembra?: Prisma.SortOrder;
    densidad?: Prisma.SortOrder;
    observaciones?: Prisma.SortOrder;
    estado?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type SiembraAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    loteId?: Prisma.SortOrder;
    tipoCultivoId?: Prisma.SortOrder;
    densidad?: Prisma.SortOrder;
};
export type SiembraMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    loteId?: Prisma.SortOrder;
    tipoCultivoId?: Prisma.SortOrder;
    fechaSiembra?: Prisma.SortOrder;
    densidad?: Prisma.SortOrder;
    observaciones?: Prisma.SortOrder;
    estado?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type SiembraMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    loteId?: Prisma.SortOrder;
    tipoCultivoId?: Prisma.SortOrder;
    fechaSiembra?: Prisma.SortOrder;
    densidad?: Prisma.SortOrder;
    observaciones?: Prisma.SortOrder;
    estado?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type SiembraSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    loteId?: Prisma.SortOrder;
    tipoCultivoId?: Prisma.SortOrder;
    densidad?: Prisma.SortOrder;
};
export type SiembraScalarRelationFilter = {
    is?: Prisma.SiembraWhereInput;
    isNot?: Prisma.SiembraWhereInput;
};
export type SiembraCreateNestedManyWithoutLoteInput = {
    create?: Prisma.XOR<Prisma.SiembraCreateWithoutLoteInput, Prisma.SiembraUncheckedCreateWithoutLoteInput> | Prisma.SiembraCreateWithoutLoteInput[] | Prisma.SiembraUncheckedCreateWithoutLoteInput[];
    connectOrCreate?: Prisma.SiembraCreateOrConnectWithoutLoteInput | Prisma.SiembraCreateOrConnectWithoutLoteInput[];
    createMany?: Prisma.SiembraCreateManyLoteInputEnvelope;
    connect?: Prisma.SiembraWhereUniqueInput | Prisma.SiembraWhereUniqueInput[];
};
export type SiembraUncheckedCreateNestedManyWithoutLoteInput = {
    create?: Prisma.XOR<Prisma.SiembraCreateWithoutLoteInput, Prisma.SiembraUncheckedCreateWithoutLoteInput> | Prisma.SiembraCreateWithoutLoteInput[] | Prisma.SiembraUncheckedCreateWithoutLoteInput[];
    connectOrCreate?: Prisma.SiembraCreateOrConnectWithoutLoteInput | Prisma.SiembraCreateOrConnectWithoutLoteInput[];
    createMany?: Prisma.SiembraCreateManyLoteInputEnvelope;
    connect?: Prisma.SiembraWhereUniqueInput | Prisma.SiembraWhereUniqueInput[];
};
export type SiembraUpdateManyWithoutLoteNestedInput = {
    create?: Prisma.XOR<Prisma.SiembraCreateWithoutLoteInput, Prisma.SiembraUncheckedCreateWithoutLoteInput> | Prisma.SiembraCreateWithoutLoteInput[] | Prisma.SiembraUncheckedCreateWithoutLoteInput[];
    connectOrCreate?: Prisma.SiembraCreateOrConnectWithoutLoteInput | Prisma.SiembraCreateOrConnectWithoutLoteInput[];
    upsert?: Prisma.SiembraUpsertWithWhereUniqueWithoutLoteInput | Prisma.SiembraUpsertWithWhereUniqueWithoutLoteInput[];
    createMany?: Prisma.SiembraCreateManyLoteInputEnvelope;
    set?: Prisma.SiembraWhereUniqueInput | Prisma.SiembraWhereUniqueInput[];
    disconnect?: Prisma.SiembraWhereUniqueInput | Prisma.SiembraWhereUniqueInput[];
    delete?: Prisma.SiembraWhereUniqueInput | Prisma.SiembraWhereUniqueInput[];
    connect?: Prisma.SiembraWhereUniqueInput | Prisma.SiembraWhereUniqueInput[];
    update?: Prisma.SiembraUpdateWithWhereUniqueWithoutLoteInput | Prisma.SiembraUpdateWithWhereUniqueWithoutLoteInput[];
    updateMany?: Prisma.SiembraUpdateManyWithWhereWithoutLoteInput | Prisma.SiembraUpdateManyWithWhereWithoutLoteInput[];
    deleteMany?: Prisma.SiembraScalarWhereInput | Prisma.SiembraScalarWhereInput[];
};
export type SiembraUncheckedUpdateManyWithoutLoteNestedInput = {
    create?: Prisma.XOR<Prisma.SiembraCreateWithoutLoteInput, Prisma.SiembraUncheckedCreateWithoutLoteInput> | Prisma.SiembraCreateWithoutLoteInput[] | Prisma.SiembraUncheckedCreateWithoutLoteInput[];
    connectOrCreate?: Prisma.SiembraCreateOrConnectWithoutLoteInput | Prisma.SiembraCreateOrConnectWithoutLoteInput[];
    upsert?: Prisma.SiembraUpsertWithWhereUniqueWithoutLoteInput | Prisma.SiembraUpsertWithWhereUniqueWithoutLoteInput[];
    createMany?: Prisma.SiembraCreateManyLoteInputEnvelope;
    set?: Prisma.SiembraWhereUniqueInput | Prisma.SiembraWhereUniqueInput[];
    disconnect?: Prisma.SiembraWhereUniqueInput | Prisma.SiembraWhereUniqueInput[];
    delete?: Prisma.SiembraWhereUniqueInput | Prisma.SiembraWhereUniqueInput[];
    connect?: Prisma.SiembraWhereUniqueInput | Prisma.SiembraWhereUniqueInput[];
    update?: Prisma.SiembraUpdateWithWhereUniqueWithoutLoteInput | Prisma.SiembraUpdateWithWhereUniqueWithoutLoteInput[];
    updateMany?: Prisma.SiembraUpdateManyWithWhereWithoutLoteInput | Prisma.SiembraUpdateManyWithWhereWithoutLoteInput[];
    deleteMany?: Prisma.SiembraScalarWhereInput | Prisma.SiembraScalarWhereInput[];
};
export type SiembraCreateNestedManyWithoutTipoCultivoInput = {
    create?: Prisma.XOR<Prisma.SiembraCreateWithoutTipoCultivoInput, Prisma.SiembraUncheckedCreateWithoutTipoCultivoInput> | Prisma.SiembraCreateWithoutTipoCultivoInput[] | Prisma.SiembraUncheckedCreateWithoutTipoCultivoInput[];
    connectOrCreate?: Prisma.SiembraCreateOrConnectWithoutTipoCultivoInput | Prisma.SiembraCreateOrConnectWithoutTipoCultivoInput[];
    createMany?: Prisma.SiembraCreateManyTipoCultivoInputEnvelope;
    connect?: Prisma.SiembraWhereUniqueInput | Prisma.SiembraWhereUniqueInput[];
};
export type SiembraUncheckedCreateNestedManyWithoutTipoCultivoInput = {
    create?: Prisma.XOR<Prisma.SiembraCreateWithoutTipoCultivoInput, Prisma.SiembraUncheckedCreateWithoutTipoCultivoInput> | Prisma.SiembraCreateWithoutTipoCultivoInput[] | Prisma.SiembraUncheckedCreateWithoutTipoCultivoInput[];
    connectOrCreate?: Prisma.SiembraCreateOrConnectWithoutTipoCultivoInput | Prisma.SiembraCreateOrConnectWithoutTipoCultivoInput[];
    createMany?: Prisma.SiembraCreateManyTipoCultivoInputEnvelope;
    connect?: Prisma.SiembraWhereUniqueInput | Prisma.SiembraWhereUniqueInput[];
};
export type SiembraUpdateManyWithoutTipoCultivoNestedInput = {
    create?: Prisma.XOR<Prisma.SiembraCreateWithoutTipoCultivoInput, Prisma.SiembraUncheckedCreateWithoutTipoCultivoInput> | Prisma.SiembraCreateWithoutTipoCultivoInput[] | Prisma.SiembraUncheckedCreateWithoutTipoCultivoInput[];
    connectOrCreate?: Prisma.SiembraCreateOrConnectWithoutTipoCultivoInput | Prisma.SiembraCreateOrConnectWithoutTipoCultivoInput[];
    upsert?: Prisma.SiembraUpsertWithWhereUniqueWithoutTipoCultivoInput | Prisma.SiembraUpsertWithWhereUniqueWithoutTipoCultivoInput[];
    createMany?: Prisma.SiembraCreateManyTipoCultivoInputEnvelope;
    set?: Prisma.SiembraWhereUniqueInput | Prisma.SiembraWhereUniqueInput[];
    disconnect?: Prisma.SiembraWhereUniqueInput | Prisma.SiembraWhereUniqueInput[];
    delete?: Prisma.SiembraWhereUniqueInput | Prisma.SiembraWhereUniqueInput[];
    connect?: Prisma.SiembraWhereUniqueInput | Prisma.SiembraWhereUniqueInput[];
    update?: Prisma.SiembraUpdateWithWhereUniqueWithoutTipoCultivoInput | Prisma.SiembraUpdateWithWhereUniqueWithoutTipoCultivoInput[];
    updateMany?: Prisma.SiembraUpdateManyWithWhereWithoutTipoCultivoInput | Prisma.SiembraUpdateManyWithWhereWithoutTipoCultivoInput[];
    deleteMany?: Prisma.SiembraScalarWhereInput | Prisma.SiembraScalarWhereInput[];
};
export type SiembraUncheckedUpdateManyWithoutTipoCultivoNestedInput = {
    create?: Prisma.XOR<Prisma.SiembraCreateWithoutTipoCultivoInput, Prisma.SiembraUncheckedCreateWithoutTipoCultivoInput> | Prisma.SiembraCreateWithoutTipoCultivoInput[] | Prisma.SiembraUncheckedCreateWithoutTipoCultivoInput[];
    connectOrCreate?: Prisma.SiembraCreateOrConnectWithoutTipoCultivoInput | Prisma.SiembraCreateOrConnectWithoutTipoCultivoInput[];
    upsert?: Prisma.SiembraUpsertWithWhereUniqueWithoutTipoCultivoInput | Prisma.SiembraUpsertWithWhereUniqueWithoutTipoCultivoInput[];
    createMany?: Prisma.SiembraCreateManyTipoCultivoInputEnvelope;
    set?: Prisma.SiembraWhereUniqueInput | Prisma.SiembraWhereUniqueInput[];
    disconnect?: Prisma.SiembraWhereUniqueInput | Prisma.SiembraWhereUniqueInput[];
    delete?: Prisma.SiembraWhereUniqueInput | Prisma.SiembraWhereUniqueInput[];
    connect?: Prisma.SiembraWhereUniqueInput | Prisma.SiembraWhereUniqueInput[];
    update?: Prisma.SiembraUpdateWithWhereUniqueWithoutTipoCultivoInput | Prisma.SiembraUpdateWithWhereUniqueWithoutTipoCultivoInput[];
    updateMany?: Prisma.SiembraUpdateManyWithWhereWithoutTipoCultivoInput | Prisma.SiembraUpdateManyWithWhereWithoutTipoCultivoInput[];
    deleteMany?: Prisma.SiembraScalarWhereInput | Prisma.SiembraScalarWhereInput[];
};
export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type EnumEstadoSiembraFieldUpdateOperationsInput = {
    set?: $Enums.EstadoSiembra;
};
export type SiembraCreateNestedOneWithoutCosechasInput = {
    create?: Prisma.XOR<Prisma.SiembraCreateWithoutCosechasInput, Prisma.SiembraUncheckedCreateWithoutCosechasInput>;
    connectOrCreate?: Prisma.SiembraCreateOrConnectWithoutCosechasInput;
    connect?: Prisma.SiembraWhereUniqueInput;
};
export type SiembraUpdateOneRequiredWithoutCosechasNestedInput = {
    create?: Prisma.XOR<Prisma.SiembraCreateWithoutCosechasInput, Prisma.SiembraUncheckedCreateWithoutCosechasInput>;
    connectOrCreate?: Prisma.SiembraCreateOrConnectWithoutCosechasInput;
    upsert?: Prisma.SiembraUpsertWithoutCosechasInput;
    connect?: Prisma.SiembraWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.SiembraUpdateToOneWithWhereWithoutCosechasInput, Prisma.SiembraUpdateWithoutCosechasInput>, Prisma.SiembraUncheckedUpdateWithoutCosechasInput>;
};
export type SiembraCreateNestedOneWithoutAplicacionesInput = {
    create?: Prisma.XOR<Prisma.SiembraCreateWithoutAplicacionesInput, Prisma.SiembraUncheckedCreateWithoutAplicacionesInput>;
    connectOrCreate?: Prisma.SiembraCreateOrConnectWithoutAplicacionesInput;
    connect?: Prisma.SiembraWhereUniqueInput;
};
export type SiembraUpdateOneRequiredWithoutAplicacionesNestedInput = {
    create?: Prisma.XOR<Prisma.SiembraCreateWithoutAplicacionesInput, Prisma.SiembraUncheckedCreateWithoutAplicacionesInput>;
    connectOrCreate?: Prisma.SiembraCreateOrConnectWithoutAplicacionesInput;
    upsert?: Prisma.SiembraUpsertWithoutAplicacionesInput;
    connect?: Prisma.SiembraWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.SiembraUpdateToOneWithWhereWithoutAplicacionesInput, Prisma.SiembraUpdateWithoutAplicacionesInput>, Prisma.SiembraUncheckedUpdateWithoutAplicacionesInput>;
};
export type SiembraCreateWithoutLoteInput = {
    fechaSiembra: Date | string;
    densidad?: number | null;
    observaciones?: string | null;
    estado?: $Enums.EstadoSiembra;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    tipoCultivo: Prisma.TipoCultivoCreateNestedOneWithoutSiembrasInput;
    cosechas?: Prisma.CosechaCreateNestedManyWithoutSiembraInput;
    aplicaciones?: Prisma.AplicacionInsumoCreateNestedManyWithoutSiembraInput;
};
export type SiembraUncheckedCreateWithoutLoteInput = {
    id?: number;
    tipoCultivoId: number;
    fechaSiembra: Date | string;
    densidad?: number | null;
    observaciones?: string | null;
    estado?: $Enums.EstadoSiembra;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    cosechas?: Prisma.CosechaUncheckedCreateNestedManyWithoutSiembraInput;
    aplicaciones?: Prisma.AplicacionInsumoUncheckedCreateNestedManyWithoutSiembraInput;
};
export type SiembraCreateOrConnectWithoutLoteInput = {
    where: Prisma.SiembraWhereUniqueInput;
    create: Prisma.XOR<Prisma.SiembraCreateWithoutLoteInput, Prisma.SiembraUncheckedCreateWithoutLoteInput>;
};
export type SiembraCreateManyLoteInputEnvelope = {
    data: Prisma.SiembraCreateManyLoteInput | Prisma.SiembraCreateManyLoteInput[];
    skipDuplicates?: boolean;
};
export type SiembraUpsertWithWhereUniqueWithoutLoteInput = {
    where: Prisma.SiembraWhereUniqueInput;
    update: Prisma.XOR<Prisma.SiembraUpdateWithoutLoteInput, Prisma.SiembraUncheckedUpdateWithoutLoteInput>;
    create: Prisma.XOR<Prisma.SiembraCreateWithoutLoteInput, Prisma.SiembraUncheckedCreateWithoutLoteInput>;
};
export type SiembraUpdateWithWhereUniqueWithoutLoteInput = {
    where: Prisma.SiembraWhereUniqueInput;
    data: Prisma.XOR<Prisma.SiembraUpdateWithoutLoteInput, Prisma.SiembraUncheckedUpdateWithoutLoteInput>;
};
export type SiembraUpdateManyWithWhereWithoutLoteInput = {
    where: Prisma.SiembraScalarWhereInput;
    data: Prisma.XOR<Prisma.SiembraUpdateManyMutationInput, Prisma.SiembraUncheckedUpdateManyWithoutLoteInput>;
};
export type SiembraScalarWhereInput = {
    AND?: Prisma.SiembraScalarWhereInput | Prisma.SiembraScalarWhereInput[];
    OR?: Prisma.SiembraScalarWhereInput[];
    NOT?: Prisma.SiembraScalarWhereInput | Prisma.SiembraScalarWhereInput[];
    id?: Prisma.IntFilter<"Siembra"> | number;
    loteId?: Prisma.IntFilter<"Siembra"> | number;
    tipoCultivoId?: Prisma.IntFilter<"Siembra"> | number;
    fechaSiembra?: Prisma.DateTimeFilter<"Siembra"> | Date | string;
    densidad?: Prisma.FloatNullableFilter<"Siembra"> | number | null;
    observaciones?: Prisma.StringNullableFilter<"Siembra"> | string | null;
    estado?: Prisma.EnumEstadoSiembraFilter<"Siembra"> | $Enums.EstadoSiembra;
    createdAt?: Prisma.DateTimeFilter<"Siembra"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Siembra"> | Date | string;
};
export type SiembraCreateWithoutTipoCultivoInput = {
    fechaSiembra: Date | string;
    densidad?: number | null;
    observaciones?: string | null;
    estado?: $Enums.EstadoSiembra;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    lote: Prisma.LoteCreateNestedOneWithoutSiembrasInput;
    cosechas?: Prisma.CosechaCreateNestedManyWithoutSiembraInput;
    aplicaciones?: Prisma.AplicacionInsumoCreateNestedManyWithoutSiembraInput;
};
export type SiembraUncheckedCreateWithoutTipoCultivoInput = {
    id?: number;
    loteId: number;
    fechaSiembra: Date | string;
    densidad?: number | null;
    observaciones?: string | null;
    estado?: $Enums.EstadoSiembra;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    cosechas?: Prisma.CosechaUncheckedCreateNestedManyWithoutSiembraInput;
    aplicaciones?: Prisma.AplicacionInsumoUncheckedCreateNestedManyWithoutSiembraInput;
};
export type SiembraCreateOrConnectWithoutTipoCultivoInput = {
    where: Prisma.SiembraWhereUniqueInput;
    create: Prisma.XOR<Prisma.SiembraCreateWithoutTipoCultivoInput, Prisma.SiembraUncheckedCreateWithoutTipoCultivoInput>;
};
export type SiembraCreateManyTipoCultivoInputEnvelope = {
    data: Prisma.SiembraCreateManyTipoCultivoInput | Prisma.SiembraCreateManyTipoCultivoInput[];
    skipDuplicates?: boolean;
};
export type SiembraUpsertWithWhereUniqueWithoutTipoCultivoInput = {
    where: Prisma.SiembraWhereUniqueInput;
    update: Prisma.XOR<Prisma.SiembraUpdateWithoutTipoCultivoInput, Prisma.SiembraUncheckedUpdateWithoutTipoCultivoInput>;
    create: Prisma.XOR<Prisma.SiembraCreateWithoutTipoCultivoInput, Prisma.SiembraUncheckedCreateWithoutTipoCultivoInput>;
};
export type SiembraUpdateWithWhereUniqueWithoutTipoCultivoInput = {
    where: Prisma.SiembraWhereUniqueInput;
    data: Prisma.XOR<Prisma.SiembraUpdateWithoutTipoCultivoInput, Prisma.SiembraUncheckedUpdateWithoutTipoCultivoInput>;
};
export type SiembraUpdateManyWithWhereWithoutTipoCultivoInput = {
    where: Prisma.SiembraScalarWhereInput;
    data: Prisma.XOR<Prisma.SiembraUpdateManyMutationInput, Prisma.SiembraUncheckedUpdateManyWithoutTipoCultivoInput>;
};
export type SiembraCreateWithoutCosechasInput = {
    fechaSiembra: Date | string;
    densidad?: number | null;
    observaciones?: string | null;
    estado?: $Enums.EstadoSiembra;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    lote: Prisma.LoteCreateNestedOneWithoutSiembrasInput;
    tipoCultivo: Prisma.TipoCultivoCreateNestedOneWithoutSiembrasInput;
    aplicaciones?: Prisma.AplicacionInsumoCreateNestedManyWithoutSiembraInput;
};
export type SiembraUncheckedCreateWithoutCosechasInput = {
    id?: number;
    loteId: number;
    tipoCultivoId: number;
    fechaSiembra: Date | string;
    densidad?: number | null;
    observaciones?: string | null;
    estado?: $Enums.EstadoSiembra;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    aplicaciones?: Prisma.AplicacionInsumoUncheckedCreateNestedManyWithoutSiembraInput;
};
export type SiembraCreateOrConnectWithoutCosechasInput = {
    where: Prisma.SiembraWhereUniqueInput;
    create: Prisma.XOR<Prisma.SiembraCreateWithoutCosechasInput, Prisma.SiembraUncheckedCreateWithoutCosechasInput>;
};
export type SiembraUpsertWithoutCosechasInput = {
    update: Prisma.XOR<Prisma.SiembraUpdateWithoutCosechasInput, Prisma.SiembraUncheckedUpdateWithoutCosechasInput>;
    create: Prisma.XOR<Prisma.SiembraCreateWithoutCosechasInput, Prisma.SiembraUncheckedCreateWithoutCosechasInput>;
    where?: Prisma.SiembraWhereInput;
};
export type SiembraUpdateToOneWithWhereWithoutCosechasInput = {
    where?: Prisma.SiembraWhereInput;
    data: Prisma.XOR<Prisma.SiembraUpdateWithoutCosechasInput, Prisma.SiembraUncheckedUpdateWithoutCosechasInput>;
};
export type SiembraUpdateWithoutCosechasInput = {
    fechaSiembra?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    densidad?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    observaciones?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    estado?: Prisma.EnumEstadoSiembraFieldUpdateOperationsInput | $Enums.EstadoSiembra;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    lote?: Prisma.LoteUpdateOneRequiredWithoutSiembrasNestedInput;
    tipoCultivo?: Prisma.TipoCultivoUpdateOneRequiredWithoutSiembrasNestedInput;
    aplicaciones?: Prisma.AplicacionInsumoUpdateManyWithoutSiembraNestedInput;
};
export type SiembraUncheckedUpdateWithoutCosechasInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    loteId?: Prisma.IntFieldUpdateOperationsInput | number;
    tipoCultivoId?: Prisma.IntFieldUpdateOperationsInput | number;
    fechaSiembra?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    densidad?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    observaciones?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    estado?: Prisma.EnumEstadoSiembraFieldUpdateOperationsInput | $Enums.EstadoSiembra;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    aplicaciones?: Prisma.AplicacionInsumoUncheckedUpdateManyWithoutSiembraNestedInput;
};
export type SiembraCreateWithoutAplicacionesInput = {
    fechaSiembra: Date | string;
    densidad?: number | null;
    observaciones?: string | null;
    estado?: $Enums.EstadoSiembra;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    lote: Prisma.LoteCreateNestedOneWithoutSiembrasInput;
    tipoCultivo: Prisma.TipoCultivoCreateNestedOneWithoutSiembrasInput;
    cosechas?: Prisma.CosechaCreateNestedManyWithoutSiembraInput;
};
export type SiembraUncheckedCreateWithoutAplicacionesInput = {
    id?: number;
    loteId: number;
    tipoCultivoId: number;
    fechaSiembra: Date | string;
    densidad?: number | null;
    observaciones?: string | null;
    estado?: $Enums.EstadoSiembra;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    cosechas?: Prisma.CosechaUncheckedCreateNestedManyWithoutSiembraInput;
};
export type SiembraCreateOrConnectWithoutAplicacionesInput = {
    where: Prisma.SiembraWhereUniqueInput;
    create: Prisma.XOR<Prisma.SiembraCreateWithoutAplicacionesInput, Prisma.SiembraUncheckedCreateWithoutAplicacionesInput>;
};
export type SiembraUpsertWithoutAplicacionesInput = {
    update: Prisma.XOR<Prisma.SiembraUpdateWithoutAplicacionesInput, Prisma.SiembraUncheckedUpdateWithoutAplicacionesInput>;
    create: Prisma.XOR<Prisma.SiembraCreateWithoutAplicacionesInput, Prisma.SiembraUncheckedCreateWithoutAplicacionesInput>;
    where?: Prisma.SiembraWhereInput;
};
export type SiembraUpdateToOneWithWhereWithoutAplicacionesInput = {
    where?: Prisma.SiembraWhereInput;
    data: Prisma.XOR<Prisma.SiembraUpdateWithoutAplicacionesInput, Prisma.SiembraUncheckedUpdateWithoutAplicacionesInput>;
};
export type SiembraUpdateWithoutAplicacionesInput = {
    fechaSiembra?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    densidad?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    observaciones?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    estado?: Prisma.EnumEstadoSiembraFieldUpdateOperationsInput | $Enums.EstadoSiembra;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    lote?: Prisma.LoteUpdateOneRequiredWithoutSiembrasNestedInput;
    tipoCultivo?: Prisma.TipoCultivoUpdateOneRequiredWithoutSiembrasNestedInput;
    cosechas?: Prisma.CosechaUpdateManyWithoutSiembraNestedInput;
};
export type SiembraUncheckedUpdateWithoutAplicacionesInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    loteId?: Prisma.IntFieldUpdateOperationsInput | number;
    tipoCultivoId?: Prisma.IntFieldUpdateOperationsInput | number;
    fechaSiembra?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    densidad?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    observaciones?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    estado?: Prisma.EnumEstadoSiembraFieldUpdateOperationsInput | $Enums.EstadoSiembra;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    cosechas?: Prisma.CosechaUncheckedUpdateManyWithoutSiembraNestedInput;
};
export type SiembraCreateManyLoteInput = {
    id?: number;
    tipoCultivoId: number;
    fechaSiembra: Date | string;
    densidad?: number | null;
    observaciones?: string | null;
    estado?: $Enums.EstadoSiembra;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type SiembraUpdateWithoutLoteInput = {
    fechaSiembra?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    densidad?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    observaciones?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    estado?: Prisma.EnumEstadoSiembraFieldUpdateOperationsInput | $Enums.EstadoSiembra;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tipoCultivo?: Prisma.TipoCultivoUpdateOneRequiredWithoutSiembrasNestedInput;
    cosechas?: Prisma.CosechaUpdateManyWithoutSiembraNestedInput;
    aplicaciones?: Prisma.AplicacionInsumoUpdateManyWithoutSiembraNestedInput;
};
export type SiembraUncheckedUpdateWithoutLoteInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    tipoCultivoId?: Prisma.IntFieldUpdateOperationsInput | number;
    fechaSiembra?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    densidad?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    observaciones?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    estado?: Prisma.EnumEstadoSiembraFieldUpdateOperationsInput | $Enums.EstadoSiembra;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    cosechas?: Prisma.CosechaUncheckedUpdateManyWithoutSiembraNestedInput;
    aplicaciones?: Prisma.AplicacionInsumoUncheckedUpdateManyWithoutSiembraNestedInput;
};
export type SiembraUncheckedUpdateManyWithoutLoteInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    tipoCultivoId?: Prisma.IntFieldUpdateOperationsInput | number;
    fechaSiembra?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    densidad?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    observaciones?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    estado?: Prisma.EnumEstadoSiembraFieldUpdateOperationsInput | $Enums.EstadoSiembra;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SiembraCreateManyTipoCultivoInput = {
    id?: number;
    loteId: number;
    fechaSiembra: Date | string;
    densidad?: number | null;
    observaciones?: string | null;
    estado?: $Enums.EstadoSiembra;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type SiembraUpdateWithoutTipoCultivoInput = {
    fechaSiembra?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    densidad?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    observaciones?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    estado?: Prisma.EnumEstadoSiembraFieldUpdateOperationsInput | $Enums.EstadoSiembra;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    lote?: Prisma.LoteUpdateOneRequiredWithoutSiembrasNestedInput;
    cosechas?: Prisma.CosechaUpdateManyWithoutSiembraNestedInput;
    aplicaciones?: Prisma.AplicacionInsumoUpdateManyWithoutSiembraNestedInput;
};
export type SiembraUncheckedUpdateWithoutTipoCultivoInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    loteId?: Prisma.IntFieldUpdateOperationsInput | number;
    fechaSiembra?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    densidad?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    observaciones?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    estado?: Prisma.EnumEstadoSiembraFieldUpdateOperationsInput | $Enums.EstadoSiembra;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    cosechas?: Prisma.CosechaUncheckedUpdateManyWithoutSiembraNestedInput;
    aplicaciones?: Prisma.AplicacionInsumoUncheckedUpdateManyWithoutSiembraNestedInput;
};
export type SiembraUncheckedUpdateManyWithoutTipoCultivoInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    loteId?: Prisma.IntFieldUpdateOperationsInput | number;
    fechaSiembra?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    densidad?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    observaciones?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    estado?: Prisma.EnumEstadoSiembraFieldUpdateOperationsInput | $Enums.EstadoSiembra;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SiembraCountOutputType = {
    cosechas: number;
    aplicaciones: number;
};
export type SiembraCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    cosechas?: boolean | SiembraCountOutputTypeCountCosechasArgs;
    aplicaciones?: boolean | SiembraCountOutputTypeCountAplicacionesArgs;
};
export type SiembraCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SiembraCountOutputTypeSelect<ExtArgs> | null;
};
export type SiembraCountOutputTypeCountCosechasArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CosechaWhereInput;
};
export type SiembraCountOutputTypeCountAplicacionesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AplicacionInsumoWhereInput;
};
export type SiembraSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    loteId?: boolean;
    tipoCultivoId?: boolean;
    fechaSiembra?: boolean;
    densidad?: boolean;
    observaciones?: boolean;
    estado?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    lote?: boolean | Prisma.LoteDefaultArgs<ExtArgs>;
    tipoCultivo?: boolean | Prisma.TipoCultivoDefaultArgs<ExtArgs>;
    cosechas?: boolean | Prisma.Siembra$cosechasArgs<ExtArgs>;
    aplicaciones?: boolean | Prisma.Siembra$aplicacionesArgs<ExtArgs>;
    _count?: boolean | Prisma.SiembraCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["siembra"]>;
export type SiembraSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    loteId?: boolean;
    tipoCultivoId?: boolean;
    fechaSiembra?: boolean;
    densidad?: boolean;
    observaciones?: boolean;
    estado?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    lote?: boolean | Prisma.LoteDefaultArgs<ExtArgs>;
    tipoCultivo?: boolean | Prisma.TipoCultivoDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["siembra"]>;
export type SiembraSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    loteId?: boolean;
    tipoCultivoId?: boolean;
    fechaSiembra?: boolean;
    densidad?: boolean;
    observaciones?: boolean;
    estado?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    lote?: boolean | Prisma.LoteDefaultArgs<ExtArgs>;
    tipoCultivo?: boolean | Prisma.TipoCultivoDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["siembra"]>;
export type SiembraSelectScalar = {
    id?: boolean;
    loteId?: boolean;
    tipoCultivoId?: boolean;
    fechaSiembra?: boolean;
    densidad?: boolean;
    observaciones?: boolean;
    estado?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type SiembraOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "loteId" | "tipoCultivoId" | "fechaSiembra" | "densidad" | "observaciones" | "estado" | "createdAt" | "updatedAt", ExtArgs["result"]["siembra"]>;
export type SiembraInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    lote?: boolean | Prisma.LoteDefaultArgs<ExtArgs>;
    tipoCultivo?: boolean | Prisma.TipoCultivoDefaultArgs<ExtArgs>;
    cosechas?: boolean | Prisma.Siembra$cosechasArgs<ExtArgs>;
    aplicaciones?: boolean | Prisma.Siembra$aplicacionesArgs<ExtArgs>;
    _count?: boolean | Prisma.SiembraCountOutputTypeDefaultArgs<ExtArgs>;
};
export type SiembraIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    lote?: boolean | Prisma.LoteDefaultArgs<ExtArgs>;
    tipoCultivo?: boolean | Prisma.TipoCultivoDefaultArgs<ExtArgs>;
};
export type SiembraIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    lote?: boolean | Prisma.LoteDefaultArgs<ExtArgs>;
    tipoCultivo?: boolean | Prisma.TipoCultivoDefaultArgs<ExtArgs>;
};
export type $SiembraPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Siembra";
    objects: {
        lote: Prisma.$LotePayload<ExtArgs>;
        tipoCultivo: Prisma.$TipoCultivoPayload<ExtArgs>;
        cosechas: Prisma.$CosechaPayload<ExtArgs>[];
        aplicaciones: Prisma.$AplicacionInsumoPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        loteId: number;
        tipoCultivoId: number;
        fechaSiembra: Date;
        densidad: number | null;
        observaciones: string | null;
        estado: $Enums.EstadoSiembra;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["siembra"]>;
    composites: {};
};
export type SiembraGetPayload<S extends boolean | null | undefined | SiembraDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$SiembraPayload, S>;
export type SiembraCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<SiembraFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: SiembraCountAggregateInputType | true;
};
export interface SiembraDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Siembra'];
        meta: {
            name: 'Siembra';
        };
    };
    findUnique<T extends SiembraFindUniqueArgs>(args: Prisma.SelectSubset<T, SiembraFindUniqueArgs<ExtArgs>>): Prisma.Prisma__SiembraClient<runtime.Types.Result.GetResult<Prisma.$SiembraPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends SiembraFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, SiembraFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__SiembraClient<runtime.Types.Result.GetResult<Prisma.$SiembraPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends SiembraFindFirstArgs>(args?: Prisma.SelectSubset<T, SiembraFindFirstArgs<ExtArgs>>): Prisma.Prisma__SiembraClient<runtime.Types.Result.GetResult<Prisma.$SiembraPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends SiembraFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, SiembraFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__SiembraClient<runtime.Types.Result.GetResult<Prisma.$SiembraPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends SiembraFindManyArgs>(args?: Prisma.SelectSubset<T, SiembraFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SiembraPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends SiembraCreateArgs>(args: Prisma.SelectSubset<T, SiembraCreateArgs<ExtArgs>>): Prisma.Prisma__SiembraClient<runtime.Types.Result.GetResult<Prisma.$SiembraPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends SiembraCreateManyArgs>(args?: Prisma.SelectSubset<T, SiembraCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends SiembraCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, SiembraCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SiembraPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends SiembraDeleteArgs>(args: Prisma.SelectSubset<T, SiembraDeleteArgs<ExtArgs>>): Prisma.Prisma__SiembraClient<runtime.Types.Result.GetResult<Prisma.$SiembraPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends SiembraUpdateArgs>(args: Prisma.SelectSubset<T, SiembraUpdateArgs<ExtArgs>>): Prisma.Prisma__SiembraClient<runtime.Types.Result.GetResult<Prisma.$SiembraPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends SiembraDeleteManyArgs>(args?: Prisma.SelectSubset<T, SiembraDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends SiembraUpdateManyArgs>(args: Prisma.SelectSubset<T, SiembraUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends SiembraUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, SiembraUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SiembraPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends SiembraUpsertArgs>(args: Prisma.SelectSubset<T, SiembraUpsertArgs<ExtArgs>>): Prisma.Prisma__SiembraClient<runtime.Types.Result.GetResult<Prisma.$SiembraPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends SiembraCountArgs>(args?: Prisma.Subset<T, SiembraCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], SiembraCountAggregateOutputType> : number>;
    aggregate<T extends SiembraAggregateArgs>(args: Prisma.Subset<T, SiembraAggregateArgs>): Prisma.PrismaPromise<GetSiembraAggregateType<T>>;
    groupBy<T extends SiembraGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: SiembraGroupByArgs['orderBy'];
    } : {
        orderBy?: SiembraGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, SiembraGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSiembraGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: SiembraFieldRefs;
}
export interface Prisma__SiembraClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    lote<T extends Prisma.LoteDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.LoteDefaultArgs<ExtArgs>>): Prisma.Prisma__LoteClient<runtime.Types.Result.GetResult<Prisma.$LotePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    tipoCultivo<T extends Prisma.TipoCultivoDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.TipoCultivoDefaultArgs<ExtArgs>>): Prisma.Prisma__TipoCultivoClient<runtime.Types.Result.GetResult<Prisma.$TipoCultivoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    cosechas<T extends Prisma.Siembra$cosechasArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Siembra$cosechasArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CosechaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    aplicaciones<T extends Prisma.Siembra$aplicacionesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Siembra$aplicacionesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AplicacionInsumoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface SiembraFieldRefs {
    readonly id: Prisma.FieldRef<"Siembra", 'Int'>;
    readonly loteId: Prisma.FieldRef<"Siembra", 'Int'>;
    readonly tipoCultivoId: Prisma.FieldRef<"Siembra", 'Int'>;
    readonly fechaSiembra: Prisma.FieldRef<"Siembra", 'DateTime'>;
    readonly densidad: Prisma.FieldRef<"Siembra", 'Float'>;
    readonly observaciones: Prisma.FieldRef<"Siembra", 'String'>;
    readonly estado: Prisma.FieldRef<"Siembra", 'EstadoSiembra'>;
    readonly createdAt: Prisma.FieldRef<"Siembra", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Siembra", 'DateTime'>;
}
export type SiembraFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SiembraSelect<ExtArgs> | null;
    omit?: Prisma.SiembraOmit<ExtArgs> | null;
    include?: Prisma.SiembraInclude<ExtArgs> | null;
    where: Prisma.SiembraWhereUniqueInput;
};
export type SiembraFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SiembraSelect<ExtArgs> | null;
    omit?: Prisma.SiembraOmit<ExtArgs> | null;
    include?: Prisma.SiembraInclude<ExtArgs> | null;
    where: Prisma.SiembraWhereUniqueInput;
};
export type SiembraFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type SiembraFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type SiembraFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type SiembraCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SiembraSelect<ExtArgs> | null;
    omit?: Prisma.SiembraOmit<ExtArgs> | null;
    include?: Prisma.SiembraInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.SiembraCreateInput, Prisma.SiembraUncheckedCreateInput>;
};
export type SiembraCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.SiembraCreateManyInput | Prisma.SiembraCreateManyInput[];
    skipDuplicates?: boolean;
};
export type SiembraCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SiembraSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.SiembraOmit<ExtArgs> | null;
    data: Prisma.SiembraCreateManyInput | Prisma.SiembraCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.SiembraIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type SiembraUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SiembraSelect<ExtArgs> | null;
    omit?: Prisma.SiembraOmit<ExtArgs> | null;
    include?: Prisma.SiembraInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.SiembraUpdateInput, Prisma.SiembraUncheckedUpdateInput>;
    where: Prisma.SiembraWhereUniqueInput;
};
export type SiembraUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.SiembraUpdateManyMutationInput, Prisma.SiembraUncheckedUpdateManyInput>;
    where?: Prisma.SiembraWhereInput;
    limit?: number;
};
export type SiembraUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SiembraSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.SiembraOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.SiembraUpdateManyMutationInput, Prisma.SiembraUncheckedUpdateManyInput>;
    where?: Prisma.SiembraWhereInput;
    limit?: number;
    include?: Prisma.SiembraIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type SiembraUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SiembraSelect<ExtArgs> | null;
    omit?: Prisma.SiembraOmit<ExtArgs> | null;
    include?: Prisma.SiembraInclude<ExtArgs> | null;
    where: Prisma.SiembraWhereUniqueInput;
    create: Prisma.XOR<Prisma.SiembraCreateInput, Prisma.SiembraUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.SiembraUpdateInput, Prisma.SiembraUncheckedUpdateInput>;
};
export type SiembraDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SiembraSelect<ExtArgs> | null;
    omit?: Prisma.SiembraOmit<ExtArgs> | null;
    include?: Prisma.SiembraInclude<ExtArgs> | null;
    where: Prisma.SiembraWhereUniqueInput;
};
export type SiembraDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SiembraWhereInput;
    limit?: number;
};
export type Siembra$cosechasArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CosechaSelect<ExtArgs> | null;
    omit?: Prisma.CosechaOmit<ExtArgs> | null;
    include?: Prisma.CosechaInclude<ExtArgs> | null;
    where?: Prisma.CosechaWhereInput;
    orderBy?: Prisma.CosechaOrderByWithRelationInput | Prisma.CosechaOrderByWithRelationInput[];
    cursor?: Prisma.CosechaWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CosechaScalarFieldEnum | Prisma.CosechaScalarFieldEnum[];
};
export type Siembra$aplicacionesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type SiembraDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SiembraSelect<ExtArgs> | null;
    omit?: Prisma.SiembraOmit<ExtArgs> | null;
    include?: Prisma.SiembraInclude<ExtArgs> | null;
};
