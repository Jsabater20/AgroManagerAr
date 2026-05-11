import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type CosechaModel = runtime.Types.Result.DefaultSelection<Prisma.$CosechaPayload>;
export type AggregateCosecha = {
    _count: CosechaCountAggregateOutputType | null;
    _avg: CosechaAvgAggregateOutputType | null;
    _sum: CosechaSumAggregateOutputType | null;
    _min: CosechaMinAggregateOutputType | null;
    _max: CosechaMaxAggregateOutputType | null;
};
export type CosechaAvgAggregateOutputType = {
    id: number | null;
    siembraId: number | null;
    rendimientoKgHa: number | null;
    totalKg: number | null;
    humedad: number | null;
};
export type CosechaSumAggregateOutputType = {
    id: number | null;
    siembraId: number | null;
    rendimientoKgHa: number | null;
    totalKg: number | null;
    humedad: number | null;
};
export type CosechaMinAggregateOutputType = {
    id: number | null;
    siembraId: number | null;
    fechaCosecha: Date | null;
    rendimientoKgHa: number | null;
    totalKg: number | null;
    humedad: number | null;
    observaciones: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type CosechaMaxAggregateOutputType = {
    id: number | null;
    siembraId: number | null;
    fechaCosecha: Date | null;
    rendimientoKgHa: number | null;
    totalKg: number | null;
    humedad: number | null;
    observaciones: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type CosechaCountAggregateOutputType = {
    id: number;
    siembraId: number;
    fechaCosecha: number;
    rendimientoKgHa: number;
    totalKg: number;
    humedad: number;
    observaciones: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type CosechaAvgAggregateInputType = {
    id?: true;
    siembraId?: true;
    rendimientoKgHa?: true;
    totalKg?: true;
    humedad?: true;
};
export type CosechaSumAggregateInputType = {
    id?: true;
    siembraId?: true;
    rendimientoKgHa?: true;
    totalKg?: true;
    humedad?: true;
};
export type CosechaMinAggregateInputType = {
    id?: true;
    siembraId?: true;
    fechaCosecha?: true;
    rendimientoKgHa?: true;
    totalKg?: true;
    humedad?: true;
    observaciones?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type CosechaMaxAggregateInputType = {
    id?: true;
    siembraId?: true;
    fechaCosecha?: true;
    rendimientoKgHa?: true;
    totalKg?: true;
    humedad?: true;
    observaciones?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type CosechaCountAggregateInputType = {
    id?: true;
    siembraId?: true;
    fechaCosecha?: true;
    rendimientoKgHa?: true;
    totalKg?: true;
    humedad?: true;
    observaciones?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type CosechaAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CosechaWhereInput;
    orderBy?: Prisma.CosechaOrderByWithRelationInput | Prisma.CosechaOrderByWithRelationInput[];
    cursor?: Prisma.CosechaWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | CosechaCountAggregateInputType;
    _avg?: CosechaAvgAggregateInputType;
    _sum?: CosechaSumAggregateInputType;
    _min?: CosechaMinAggregateInputType;
    _max?: CosechaMaxAggregateInputType;
};
export type GetCosechaAggregateType<T extends CosechaAggregateArgs> = {
    [P in keyof T & keyof AggregateCosecha]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateCosecha[P]> : Prisma.GetScalarType<T[P], AggregateCosecha[P]>;
};
export type CosechaGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CosechaWhereInput;
    orderBy?: Prisma.CosechaOrderByWithAggregationInput | Prisma.CosechaOrderByWithAggregationInput[];
    by: Prisma.CosechaScalarFieldEnum[] | Prisma.CosechaScalarFieldEnum;
    having?: Prisma.CosechaScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: CosechaCountAggregateInputType | true;
    _avg?: CosechaAvgAggregateInputType;
    _sum?: CosechaSumAggregateInputType;
    _min?: CosechaMinAggregateInputType;
    _max?: CosechaMaxAggregateInputType;
};
export type CosechaGroupByOutputType = {
    id: number;
    siembraId: number;
    fechaCosecha: Date;
    rendimientoKgHa: number;
    totalKg: number;
    humedad: number | null;
    observaciones: string | null;
    createdAt: Date;
    updatedAt: Date;
    _count: CosechaCountAggregateOutputType | null;
    _avg: CosechaAvgAggregateOutputType | null;
    _sum: CosechaSumAggregateOutputType | null;
    _min: CosechaMinAggregateOutputType | null;
    _max: CosechaMaxAggregateOutputType | null;
};
export type GetCosechaGroupByPayload<T extends CosechaGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<CosechaGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof CosechaGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], CosechaGroupByOutputType[P]> : Prisma.GetScalarType<T[P], CosechaGroupByOutputType[P]>;
}>>;
export type CosechaWhereInput = {
    AND?: Prisma.CosechaWhereInput | Prisma.CosechaWhereInput[];
    OR?: Prisma.CosechaWhereInput[];
    NOT?: Prisma.CosechaWhereInput | Prisma.CosechaWhereInput[];
    id?: Prisma.IntFilter<"Cosecha"> | number;
    siembraId?: Prisma.IntFilter<"Cosecha"> | number;
    fechaCosecha?: Prisma.DateTimeFilter<"Cosecha"> | Date | string;
    rendimientoKgHa?: Prisma.FloatFilter<"Cosecha"> | number;
    totalKg?: Prisma.FloatFilter<"Cosecha"> | number;
    humedad?: Prisma.FloatNullableFilter<"Cosecha"> | number | null;
    observaciones?: Prisma.StringNullableFilter<"Cosecha"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Cosecha"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Cosecha"> | Date | string;
    siembra?: Prisma.XOR<Prisma.SiembraScalarRelationFilter, Prisma.SiembraWhereInput>;
};
export type CosechaOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    siembraId?: Prisma.SortOrder;
    fechaCosecha?: Prisma.SortOrder;
    rendimientoKgHa?: Prisma.SortOrder;
    totalKg?: Prisma.SortOrder;
    humedad?: Prisma.SortOrderInput | Prisma.SortOrder;
    observaciones?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    siembra?: Prisma.SiembraOrderByWithRelationInput;
};
export type CosechaWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    AND?: Prisma.CosechaWhereInput | Prisma.CosechaWhereInput[];
    OR?: Prisma.CosechaWhereInput[];
    NOT?: Prisma.CosechaWhereInput | Prisma.CosechaWhereInput[];
    siembraId?: Prisma.IntFilter<"Cosecha"> | number;
    fechaCosecha?: Prisma.DateTimeFilter<"Cosecha"> | Date | string;
    rendimientoKgHa?: Prisma.FloatFilter<"Cosecha"> | number;
    totalKg?: Prisma.FloatFilter<"Cosecha"> | number;
    humedad?: Prisma.FloatNullableFilter<"Cosecha"> | number | null;
    observaciones?: Prisma.StringNullableFilter<"Cosecha"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Cosecha"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Cosecha"> | Date | string;
    siembra?: Prisma.XOR<Prisma.SiembraScalarRelationFilter, Prisma.SiembraWhereInput>;
}, "id">;
export type CosechaOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    siembraId?: Prisma.SortOrder;
    fechaCosecha?: Prisma.SortOrder;
    rendimientoKgHa?: Prisma.SortOrder;
    totalKg?: Prisma.SortOrder;
    humedad?: Prisma.SortOrderInput | Prisma.SortOrder;
    observaciones?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.CosechaCountOrderByAggregateInput;
    _avg?: Prisma.CosechaAvgOrderByAggregateInput;
    _max?: Prisma.CosechaMaxOrderByAggregateInput;
    _min?: Prisma.CosechaMinOrderByAggregateInput;
    _sum?: Prisma.CosechaSumOrderByAggregateInput;
};
export type CosechaScalarWhereWithAggregatesInput = {
    AND?: Prisma.CosechaScalarWhereWithAggregatesInput | Prisma.CosechaScalarWhereWithAggregatesInput[];
    OR?: Prisma.CosechaScalarWhereWithAggregatesInput[];
    NOT?: Prisma.CosechaScalarWhereWithAggregatesInput | Prisma.CosechaScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"Cosecha"> | number;
    siembraId?: Prisma.IntWithAggregatesFilter<"Cosecha"> | number;
    fechaCosecha?: Prisma.DateTimeWithAggregatesFilter<"Cosecha"> | Date | string;
    rendimientoKgHa?: Prisma.FloatWithAggregatesFilter<"Cosecha"> | number;
    totalKg?: Prisma.FloatWithAggregatesFilter<"Cosecha"> | number;
    humedad?: Prisma.FloatNullableWithAggregatesFilter<"Cosecha"> | number | null;
    observaciones?: Prisma.StringNullableWithAggregatesFilter<"Cosecha"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Cosecha"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Cosecha"> | Date | string;
};
export type CosechaCreateInput = {
    fechaCosecha: Date | string;
    rendimientoKgHa: number;
    totalKg: number;
    humedad?: number | null;
    observaciones?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    siembra: Prisma.SiembraCreateNestedOneWithoutCosechasInput;
};
export type CosechaUncheckedCreateInput = {
    id?: number;
    siembraId: number;
    fechaCosecha: Date | string;
    rendimientoKgHa: number;
    totalKg: number;
    humedad?: number | null;
    observaciones?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type CosechaUpdateInput = {
    fechaCosecha?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    rendimientoKgHa?: Prisma.FloatFieldUpdateOperationsInput | number;
    totalKg?: Prisma.FloatFieldUpdateOperationsInput | number;
    humedad?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    observaciones?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    siembra?: Prisma.SiembraUpdateOneRequiredWithoutCosechasNestedInput;
};
export type CosechaUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    siembraId?: Prisma.IntFieldUpdateOperationsInput | number;
    fechaCosecha?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    rendimientoKgHa?: Prisma.FloatFieldUpdateOperationsInput | number;
    totalKg?: Prisma.FloatFieldUpdateOperationsInput | number;
    humedad?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    observaciones?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CosechaCreateManyInput = {
    id?: number;
    siembraId: number;
    fechaCosecha: Date | string;
    rendimientoKgHa: number;
    totalKg: number;
    humedad?: number | null;
    observaciones?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type CosechaUpdateManyMutationInput = {
    fechaCosecha?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    rendimientoKgHa?: Prisma.FloatFieldUpdateOperationsInput | number;
    totalKg?: Prisma.FloatFieldUpdateOperationsInput | number;
    humedad?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    observaciones?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CosechaUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    siembraId?: Prisma.IntFieldUpdateOperationsInput | number;
    fechaCosecha?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    rendimientoKgHa?: Prisma.FloatFieldUpdateOperationsInput | number;
    totalKg?: Prisma.FloatFieldUpdateOperationsInput | number;
    humedad?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    observaciones?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CosechaListRelationFilter = {
    every?: Prisma.CosechaWhereInput;
    some?: Prisma.CosechaWhereInput;
    none?: Prisma.CosechaWhereInput;
};
export type CosechaOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type CosechaCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    siembraId?: Prisma.SortOrder;
    fechaCosecha?: Prisma.SortOrder;
    rendimientoKgHa?: Prisma.SortOrder;
    totalKg?: Prisma.SortOrder;
    humedad?: Prisma.SortOrder;
    observaciones?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type CosechaAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    siembraId?: Prisma.SortOrder;
    rendimientoKgHa?: Prisma.SortOrder;
    totalKg?: Prisma.SortOrder;
    humedad?: Prisma.SortOrder;
};
export type CosechaMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    siembraId?: Prisma.SortOrder;
    fechaCosecha?: Prisma.SortOrder;
    rendimientoKgHa?: Prisma.SortOrder;
    totalKg?: Prisma.SortOrder;
    humedad?: Prisma.SortOrder;
    observaciones?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type CosechaMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    siembraId?: Prisma.SortOrder;
    fechaCosecha?: Prisma.SortOrder;
    rendimientoKgHa?: Prisma.SortOrder;
    totalKg?: Prisma.SortOrder;
    humedad?: Prisma.SortOrder;
    observaciones?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type CosechaSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    siembraId?: Prisma.SortOrder;
    rendimientoKgHa?: Prisma.SortOrder;
    totalKg?: Prisma.SortOrder;
    humedad?: Prisma.SortOrder;
};
export type CosechaCreateNestedManyWithoutSiembraInput = {
    create?: Prisma.XOR<Prisma.CosechaCreateWithoutSiembraInput, Prisma.CosechaUncheckedCreateWithoutSiembraInput> | Prisma.CosechaCreateWithoutSiembraInput[] | Prisma.CosechaUncheckedCreateWithoutSiembraInput[];
    connectOrCreate?: Prisma.CosechaCreateOrConnectWithoutSiembraInput | Prisma.CosechaCreateOrConnectWithoutSiembraInput[];
    createMany?: Prisma.CosechaCreateManySiembraInputEnvelope;
    connect?: Prisma.CosechaWhereUniqueInput | Prisma.CosechaWhereUniqueInput[];
};
export type CosechaUncheckedCreateNestedManyWithoutSiembraInput = {
    create?: Prisma.XOR<Prisma.CosechaCreateWithoutSiembraInput, Prisma.CosechaUncheckedCreateWithoutSiembraInput> | Prisma.CosechaCreateWithoutSiembraInput[] | Prisma.CosechaUncheckedCreateWithoutSiembraInput[];
    connectOrCreate?: Prisma.CosechaCreateOrConnectWithoutSiembraInput | Prisma.CosechaCreateOrConnectWithoutSiembraInput[];
    createMany?: Prisma.CosechaCreateManySiembraInputEnvelope;
    connect?: Prisma.CosechaWhereUniqueInput | Prisma.CosechaWhereUniqueInput[];
};
export type CosechaUpdateManyWithoutSiembraNestedInput = {
    create?: Prisma.XOR<Prisma.CosechaCreateWithoutSiembraInput, Prisma.CosechaUncheckedCreateWithoutSiembraInput> | Prisma.CosechaCreateWithoutSiembraInput[] | Prisma.CosechaUncheckedCreateWithoutSiembraInput[];
    connectOrCreate?: Prisma.CosechaCreateOrConnectWithoutSiembraInput | Prisma.CosechaCreateOrConnectWithoutSiembraInput[];
    upsert?: Prisma.CosechaUpsertWithWhereUniqueWithoutSiembraInput | Prisma.CosechaUpsertWithWhereUniqueWithoutSiembraInput[];
    createMany?: Prisma.CosechaCreateManySiembraInputEnvelope;
    set?: Prisma.CosechaWhereUniqueInput | Prisma.CosechaWhereUniqueInput[];
    disconnect?: Prisma.CosechaWhereUniqueInput | Prisma.CosechaWhereUniqueInput[];
    delete?: Prisma.CosechaWhereUniqueInput | Prisma.CosechaWhereUniqueInput[];
    connect?: Prisma.CosechaWhereUniqueInput | Prisma.CosechaWhereUniqueInput[];
    update?: Prisma.CosechaUpdateWithWhereUniqueWithoutSiembraInput | Prisma.CosechaUpdateWithWhereUniqueWithoutSiembraInput[];
    updateMany?: Prisma.CosechaUpdateManyWithWhereWithoutSiembraInput | Prisma.CosechaUpdateManyWithWhereWithoutSiembraInput[];
    deleteMany?: Prisma.CosechaScalarWhereInput | Prisma.CosechaScalarWhereInput[];
};
export type CosechaUncheckedUpdateManyWithoutSiembraNestedInput = {
    create?: Prisma.XOR<Prisma.CosechaCreateWithoutSiembraInput, Prisma.CosechaUncheckedCreateWithoutSiembraInput> | Prisma.CosechaCreateWithoutSiembraInput[] | Prisma.CosechaUncheckedCreateWithoutSiembraInput[];
    connectOrCreate?: Prisma.CosechaCreateOrConnectWithoutSiembraInput | Prisma.CosechaCreateOrConnectWithoutSiembraInput[];
    upsert?: Prisma.CosechaUpsertWithWhereUniqueWithoutSiembraInput | Prisma.CosechaUpsertWithWhereUniqueWithoutSiembraInput[];
    createMany?: Prisma.CosechaCreateManySiembraInputEnvelope;
    set?: Prisma.CosechaWhereUniqueInput | Prisma.CosechaWhereUniqueInput[];
    disconnect?: Prisma.CosechaWhereUniqueInput | Prisma.CosechaWhereUniqueInput[];
    delete?: Prisma.CosechaWhereUniqueInput | Prisma.CosechaWhereUniqueInput[];
    connect?: Prisma.CosechaWhereUniqueInput | Prisma.CosechaWhereUniqueInput[];
    update?: Prisma.CosechaUpdateWithWhereUniqueWithoutSiembraInput | Prisma.CosechaUpdateWithWhereUniqueWithoutSiembraInput[];
    updateMany?: Prisma.CosechaUpdateManyWithWhereWithoutSiembraInput | Prisma.CosechaUpdateManyWithWhereWithoutSiembraInput[];
    deleteMany?: Prisma.CosechaScalarWhereInput | Prisma.CosechaScalarWhereInput[];
};
export type CosechaCreateWithoutSiembraInput = {
    fechaCosecha: Date | string;
    rendimientoKgHa: number;
    totalKg: number;
    humedad?: number | null;
    observaciones?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type CosechaUncheckedCreateWithoutSiembraInput = {
    id?: number;
    fechaCosecha: Date | string;
    rendimientoKgHa: number;
    totalKg: number;
    humedad?: number | null;
    observaciones?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type CosechaCreateOrConnectWithoutSiembraInput = {
    where: Prisma.CosechaWhereUniqueInput;
    create: Prisma.XOR<Prisma.CosechaCreateWithoutSiembraInput, Prisma.CosechaUncheckedCreateWithoutSiembraInput>;
};
export type CosechaCreateManySiembraInputEnvelope = {
    data: Prisma.CosechaCreateManySiembraInput | Prisma.CosechaCreateManySiembraInput[];
    skipDuplicates?: boolean;
};
export type CosechaUpsertWithWhereUniqueWithoutSiembraInput = {
    where: Prisma.CosechaWhereUniqueInput;
    update: Prisma.XOR<Prisma.CosechaUpdateWithoutSiembraInput, Prisma.CosechaUncheckedUpdateWithoutSiembraInput>;
    create: Prisma.XOR<Prisma.CosechaCreateWithoutSiembraInput, Prisma.CosechaUncheckedCreateWithoutSiembraInput>;
};
export type CosechaUpdateWithWhereUniqueWithoutSiembraInput = {
    where: Prisma.CosechaWhereUniqueInput;
    data: Prisma.XOR<Prisma.CosechaUpdateWithoutSiembraInput, Prisma.CosechaUncheckedUpdateWithoutSiembraInput>;
};
export type CosechaUpdateManyWithWhereWithoutSiembraInput = {
    where: Prisma.CosechaScalarWhereInput;
    data: Prisma.XOR<Prisma.CosechaUpdateManyMutationInput, Prisma.CosechaUncheckedUpdateManyWithoutSiembraInput>;
};
export type CosechaScalarWhereInput = {
    AND?: Prisma.CosechaScalarWhereInput | Prisma.CosechaScalarWhereInput[];
    OR?: Prisma.CosechaScalarWhereInput[];
    NOT?: Prisma.CosechaScalarWhereInput | Prisma.CosechaScalarWhereInput[];
    id?: Prisma.IntFilter<"Cosecha"> | number;
    siembraId?: Prisma.IntFilter<"Cosecha"> | number;
    fechaCosecha?: Prisma.DateTimeFilter<"Cosecha"> | Date | string;
    rendimientoKgHa?: Prisma.FloatFilter<"Cosecha"> | number;
    totalKg?: Prisma.FloatFilter<"Cosecha"> | number;
    humedad?: Prisma.FloatNullableFilter<"Cosecha"> | number | null;
    observaciones?: Prisma.StringNullableFilter<"Cosecha"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Cosecha"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Cosecha"> | Date | string;
};
export type CosechaCreateManySiembraInput = {
    id?: number;
    fechaCosecha: Date | string;
    rendimientoKgHa: number;
    totalKg: number;
    humedad?: number | null;
    observaciones?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type CosechaUpdateWithoutSiembraInput = {
    fechaCosecha?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    rendimientoKgHa?: Prisma.FloatFieldUpdateOperationsInput | number;
    totalKg?: Prisma.FloatFieldUpdateOperationsInput | number;
    humedad?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    observaciones?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CosechaUncheckedUpdateWithoutSiembraInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    fechaCosecha?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    rendimientoKgHa?: Prisma.FloatFieldUpdateOperationsInput | number;
    totalKg?: Prisma.FloatFieldUpdateOperationsInput | number;
    humedad?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    observaciones?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CosechaUncheckedUpdateManyWithoutSiembraInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    fechaCosecha?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    rendimientoKgHa?: Prisma.FloatFieldUpdateOperationsInput | number;
    totalKg?: Prisma.FloatFieldUpdateOperationsInput | number;
    humedad?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    observaciones?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CosechaSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    siembraId?: boolean;
    fechaCosecha?: boolean;
    rendimientoKgHa?: boolean;
    totalKg?: boolean;
    humedad?: boolean;
    observaciones?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    siembra?: boolean | Prisma.SiembraDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["cosecha"]>;
export type CosechaSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    siembraId?: boolean;
    fechaCosecha?: boolean;
    rendimientoKgHa?: boolean;
    totalKg?: boolean;
    humedad?: boolean;
    observaciones?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    siembra?: boolean | Prisma.SiembraDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["cosecha"]>;
export type CosechaSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    siembraId?: boolean;
    fechaCosecha?: boolean;
    rendimientoKgHa?: boolean;
    totalKg?: boolean;
    humedad?: boolean;
    observaciones?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    siembra?: boolean | Prisma.SiembraDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["cosecha"]>;
export type CosechaSelectScalar = {
    id?: boolean;
    siembraId?: boolean;
    fechaCosecha?: boolean;
    rendimientoKgHa?: boolean;
    totalKg?: boolean;
    humedad?: boolean;
    observaciones?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type CosechaOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "siembraId" | "fechaCosecha" | "rendimientoKgHa" | "totalKg" | "humedad" | "observaciones" | "createdAt" | "updatedAt", ExtArgs["result"]["cosecha"]>;
export type CosechaInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    siembra?: boolean | Prisma.SiembraDefaultArgs<ExtArgs>;
};
export type CosechaIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    siembra?: boolean | Prisma.SiembraDefaultArgs<ExtArgs>;
};
export type CosechaIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    siembra?: boolean | Prisma.SiembraDefaultArgs<ExtArgs>;
};
export type $CosechaPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Cosecha";
    objects: {
        siembra: Prisma.$SiembraPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        siembraId: number;
        fechaCosecha: Date;
        rendimientoKgHa: number;
        totalKg: number;
        humedad: number | null;
        observaciones: string | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["cosecha"]>;
    composites: {};
};
export type CosechaGetPayload<S extends boolean | null | undefined | CosechaDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$CosechaPayload, S>;
export type CosechaCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<CosechaFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: CosechaCountAggregateInputType | true;
};
export interface CosechaDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Cosecha'];
        meta: {
            name: 'Cosecha';
        };
    };
    findUnique<T extends CosechaFindUniqueArgs>(args: Prisma.SelectSubset<T, CosechaFindUniqueArgs<ExtArgs>>): Prisma.Prisma__CosechaClient<runtime.Types.Result.GetResult<Prisma.$CosechaPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends CosechaFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, CosechaFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__CosechaClient<runtime.Types.Result.GetResult<Prisma.$CosechaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends CosechaFindFirstArgs>(args?: Prisma.SelectSubset<T, CosechaFindFirstArgs<ExtArgs>>): Prisma.Prisma__CosechaClient<runtime.Types.Result.GetResult<Prisma.$CosechaPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends CosechaFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, CosechaFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__CosechaClient<runtime.Types.Result.GetResult<Prisma.$CosechaPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends CosechaFindManyArgs>(args?: Prisma.SelectSubset<T, CosechaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CosechaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends CosechaCreateArgs>(args: Prisma.SelectSubset<T, CosechaCreateArgs<ExtArgs>>): Prisma.Prisma__CosechaClient<runtime.Types.Result.GetResult<Prisma.$CosechaPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends CosechaCreateManyArgs>(args?: Prisma.SelectSubset<T, CosechaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends CosechaCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, CosechaCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CosechaPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends CosechaDeleteArgs>(args: Prisma.SelectSubset<T, CosechaDeleteArgs<ExtArgs>>): Prisma.Prisma__CosechaClient<runtime.Types.Result.GetResult<Prisma.$CosechaPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends CosechaUpdateArgs>(args: Prisma.SelectSubset<T, CosechaUpdateArgs<ExtArgs>>): Prisma.Prisma__CosechaClient<runtime.Types.Result.GetResult<Prisma.$CosechaPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends CosechaDeleteManyArgs>(args?: Prisma.SelectSubset<T, CosechaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends CosechaUpdateManyArgs>(args: Prisma.SelectSubset<T, CosechaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends CosechaUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, CosechaUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CosechaPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends CosechaUpsertArgs>(args: Prisma.SelectSubset<T, CosechaUpsertArgs<ExtArgs>>): Prisma.Prisma__CosechaClient<runtime.Types.Result.GetResult<Prisma.$CosechaPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends CosechaCountArgs>(args?: Prisma.Subset<T, CosechaCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], CosechaCountAggregateOutputType> : number>;
    aggregate<T extends CosechaAggregateArgs>(args: Prisma.Subset<T, CosechaAggregateArgs>): Prisma.PrismaPromise<GetCosechaAggregateType<T>>;
    groupBy<T extends CosechaGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: CosechaGroupByArgs['orderBy'];
    } : {
        orderBy?: CosechaGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, CosechaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCosechaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: CosechaFieldRefs;
}
export interface Prisma__CosechaClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    siembra<T extends Prisma.SiembraDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.SiembraDefaultArgs<ExtArgs>>): Prisma.Prisma__SiembraClient<runtime.Types.Result.GetResult<Prisma.$SiembraPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface CosechaFieldRefs {
    readonly id: Prisma.FieldRef<"Cosecha", 'Int'>;
    readonly siembraId: Prisma.FieldRef<"Cosecha", 'Int'>;
    readonly fechaCosecha: Prisma.FieldRef<"Cosecha", 'DateTime'>;
    readonly rendimientoKgHa: Prisma.FieldRef<"Cosecha", 'Float'>;
    readonly totalKg: Prisma.FieldRef<"Cosecha", 'Float'>;
    readonly humedad: Prisma.FieldRef<"Cosecha", 'Float'>;
    readonly observaciones: Prisma.FieldRef<"Cosecha", 'String'>;
    readonly createdAt: Prisma.FieldRef<"Cosecha", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Cosecha", 'DateTime'>;
}
export type CosechaFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CosechaSelect<ExtArgs> | null;
    omit?: Prisma.CosechaOmit<ExtArgs> | null;
    include?: Prisma.CosechaInclude<ExtArgs> | null;
    where: Prisma.CosechaWhereUniqueInput;
};
export type CosechaFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CosechaSelect<ExtArgs> | null;
    omit?: Prisma.CosechaOmit<ExtArgs> | null;
    include?: Prisma.CosechaInclude<ExtArgs> | null;
    where: Prisma.CosechaWhereUniqueInput;
};
export type CosechaFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type CosechaFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type CosechaFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type CosechaCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CosechaSelect<ExtArgs> | null;
    omit?: Prisma.CosechaOmit<ExtArgs> | null;
    include?: Prisma.CosechaInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CosechaCreateInput, Prisma.CosechaUncheckedCreateInput>;
};
export type CosechaCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.CosechaCreateManyInput | Prisma.CosechaCreateManyInput[];
    skipDuplicates?: boolean;
};
export type CosechaCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CosechaSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.CosechaOmit<ExtArgs> | null;
    data: Prisma.CosechaCreateManyInput | Prisma.CosechaCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.CosechaIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type CosechaUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CosechaSelect<ExtArgs> | null;
    omit?: Prisma.CosechaOmit<ExtArgs> | null;
    include?: Prisma.CosechaInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CosechaUpdateInput, Prisma.CosechaUncheckedUpdateInput>;
    where: Prisma.CosechaWhereUniqueInput;
};
export type CosechaUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.CosechaUpdateManyMutationInput, Prisma.CosechaUncheckedUpdateManyInput>;
    where?: Prisma.CosechaWhereInput;
    limit?: number;
};
export type CosechaUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CosechaSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.CosechaOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CosechaUpdateManyMutationInput, Prisma.CosechaUncheckedUpdateManyInput>;
    where?: Prisma.CosechaWhereInput;
    limit?: number;
    include?: Prisma.CosechaIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type CosechaUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CosechaSelect<ExtArgs> | null;
    omit?: Prisma.CosechaOmit<ExtArgs> | null;
    include?: Prisma.CosechaInclude<ExtArgs> | null;
    where: Prisma.CosechaWhereUniqueInput;
    create: Prisma.XOR<Prisma.CosechaCreateInput, Prisma.CosechaUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.CosechaUpdateInput, Prisma.CosechaUncheckedUpdateInput>;
};
export type CosechaDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CosechaSelect<ExtArgs> | null;
    omit?: Prisma.CosechaOmit<ExtArgs> | null;
    include?: Prisma.CosechaInclude<ExtArgs> | null;
    where: Prisma.CosechaWhereUniqueInput;
};
export type CosechaDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CosechaWhereInput;
    limit?: number;
};
export type CosechaDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CosechaSelect<ExtArgs> | null;
    omit?: Prisma.CosechaOmit<ExtArgs> | null;
    include?: Prisma.CosechaInclude<ExtArgs> | null;
};
