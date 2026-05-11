import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type AplicacionInsumoModel = runtime.Types.Result.DefaultSelection<Prisma.$AplicacionInsumoPayload>;
export type AggregateAplicacionInsumo = {
    _count: AplicacionInsumoCountAggregateOutputType | null;
    _avg: AplicacionInsumoAvgAggregateOutputType | null;
    _sum: AplicacionInsumoSumAggregateOutputType | null;
    _min: AplicacionInsumoMinAggregateOutputType | null;
    _max: AplicacionInsumoMaxAggregateOutputType | null;
};
export type AplicacionInsumoAvgAggregateOutputType = {
    id: number | null;
    siembraId: number | null;
    insumoId: number | null;
    cantidad: number | null;
};
export type AplicacionInsumoSumAggregateOutputType = {
    id: number | null;
    siembraId: number | null;
    insumoId: number | null;
    cantidad: number | null;
};
export type AplicacionInsumoMinAggregateOutputType = {
    id: number | null;
    siembraId: number | null;
    insumoId: number | null;
    fecha: Date | null;
    cantidad: number | null;
    unidad: string | null;
    observaciones: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type AplicacionInsumoMaxAggregateOutputType = {
    id: number | null;
    siembraId: number | null;
    insumoId: number | null;
    fecha: Date | null;
    cantidad: number | null;
    unidad: string | null;
    observaciones: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type AplicacionInsumoCountAggregateOutputType = {
    id: number;
    siembraId: number;
    insumoId: number;
    fecha: number;
    cantidad: number;
    unidad: number;
    observaciones: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type AplicacionInsumoAvgAggregateInputType = {
    id?: true;
    siembraId?: true;
    insumoId?: true;
    cantidad?: true;
};
export type AplicacionInsumoSumAggregateInputType = {
    id?: true;
    siembraId?: true;
    insumoId?: true;
    cantidad?: true;
};
export type AplicacionInsumoMinAggregateInputType = {
    id?: true;
    siembraId?: true;
    insumoId?: true;
    fecha?: true;
    cantidad?: true;
    unidad?: true;
    observaciones?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type AplicacionInsumoMaxAggregateInputType = {
    id?: true;
    siembraId?: true;
    insumoId?: true;
    fecha?: true;
    cantidad?: true;
    unidad?: true;
    observaciones?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type AplicacionInsumoCountAggregateInputType = {
    id?: true;
    siembraId?: true;
    insumoId?: true;
    fecha?: true;
    cantidad?: true;
    unidad?: true;
    observaciones?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type AplicacionInsumoAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AplicacionInsumoWhereInput;
    orderBy?: Prisma.AplicacionInsumoOrderByWithRelationInput | Prisma.AplicacionInsumoOrderByWithRelationInput[];
    cursor?: Prisma.AplicacionInsumoWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | AplicacionInsumoCountAggregateInputType;
    _avg?: AplicacionInsumoAvgAggregateInputType;
    _sum?: AplicacionInsumoSumAggregateInputType;
    _min?: AplicacionInsumoMinAggregateInputType;
    _max?: AplicacionInsumoMaxAggregateInputType;
};
export type GetAplicacionInsumoAggregateType<T extends AplicacionInsumoAggregateArgs> = {
    [P in keyof T & keyof AggregateAplicacionInsumo]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateAplicacionInsumo[P]> : Prisma.GetScalarType<T[P], AggregateAplicacionInsumo[P]>;
};
export type AplicacionInsumoGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AplicacionInsumoWhereInput;
    orderBy?: Prisma.AplicacionInsumoOrderByWithAggregationInput | Prisma.AplicacionInsumoOrderByWithAggregationInput[];
    by: Prisma.AplicacionInsumoScalarFieldEnum[] | Prisma.AplicacionInsumoScalarFieldEnum;
    having?: Prisma.AplicacionInsumoScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: AplicacionInsumoCountAggregateInputType | true;
    _avg?: AplicacionInsumoAvgAggregateInputType;
    _sum?: AplicacionInsumoSumAggregateInputType;
    _min?: AplicacionInsumoMinAggregateInputType;
    _max?: AplicacionInsumoMaxAggregateInputType;
};
export type AplicacionInsumoGroupByOutputType = {
    id: number;
    siembraId: number;
    insumoId: number;
    fecha: Date;
    cantidad: number;
    unidad: string;
    observaciones: string | null;
    createdAt: Date;
    updatedAt: Date;
    _count: AplicacionInsumoCountAggregateOutputType | null;
    _avg: AplicacionInsumoAvgAggregateOutputType | null;
    _sum: AplicacionInsumoSumAggregateOutputType | null;
    _min: AplicacionInsumoMinAggregateOutputType | null;
    _max: AplicacionInsumoMaxAggregateOutputType | null;
};
export type GetAplicacionInsumoGroupByPayload<T extends AplicacionInsumoGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<AplicacionInsumoGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof AplicacionInsumoGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], AplicacionInsumoGroupByOutputType[P]> : Prisma.GetScalarType<T[P], AplicacionInsumoGroupByOutputType[P]>;
}>>;
export type AplicacionInsumoWhereInput = {
    AND?: Prisma.AplicacionInsumoWhereInput | Prisma.AplicacionInsumoWhereInput[];
    OR?: Prisma.AplicacionInsumoWhereInput[];
    NOT?: Prisma.AplicacionInsumoWhereInput | Prisma.AplicacionInsumoWhereInput[];
    id?: Prisma.IntFilter<"AplicacionInsumo"> | number;
    siembraId?: Prisma.IntFilter<"AplicacionInsumo"> | number;
    insumoId?: Prisma.IntFilter<"AplicacionInsumo"> | number;
    fecha?: Prisma.DateTimeFilter<"AplicacionInsumo"> | Date | string;
    cantidad?: Prisma.FloatFilter<"AplicacionInsumo"> | number;
    unidad?: Prisma.StringFilter<"AplicacionInsumo"> | string;
    observaciones?: Prisma.StringNullableFilter<"AplicacionInsumo"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"AplicacionInsumo"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"AplicacionInsumo"> | Date | string;
    siembra?: Prisma.XOR<Prisma.SiembraScalarRelationFilter, Prisma.SiembraWhereInput>;
    insumo?: Prisma.XOR<Prisma.InsumoScalarRelationFilter, Prisma.InsumoWhereInput>;
};
export type AplicacionInsumoOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    siembraId?: Prisma.SortOrder;
    insumoId?: Prisma.SortOrder;
    fecha?: Prisma.SortOrder;
    cantidad?: Prisma.SortOrder;
    unidad?: Prisma.SortOrder;
    observaciones?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    siembra?: Prisma.SiembraOrderByWithRelationInput;
    insumo?: Prisma.InsumoOrderByWithRelationInput;
};
export type AplicacionInsumoWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    AND?: Prisma.AplicacionInsumoWhereInput | Prisma.AplicacionInsumoWhereInput[];
    OR?: Prisma.AplicacionInsumoWhereInput[];
    NOT?: Prisma.AplicacionInsumoWhereInput | Prisma.AplicacionInsumoWhereInput[];
    siembraId?: Prisma.IntFilter<"AplicacionInsumo"> | number;
    insumoId?: Prisma.IntFilter<"AplicacionInsumo"> | number;
    fecha?: Prisma.DateTimeFilter<"AplicacionInsumo"> | Date | string;
    cantidad?: Prisma.FloatFilter<"AplicacionInsumo"> | number;
    unidad?: Prisma.StringFilter<"AplicacionInsumo"> | string;
    observaciones?: Prisma.StringNullableFilter<"AplicacionInsumo"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"AplicacionInsumo"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"AplicacionInsumo"> | Date | string;
    siembra?: Prisma.XOR<Prisma.SiembraScalarRelationFilter, Prisma.SiembraWhereInput>;
    insumo?: Prisma.XOR<Prisma.InsumoScalarRelationFilter, Prisma.InsumoWhereInput>;
}, "id">;
export type AplicacionInsumoOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    siembraId?: Prisma.SortOrder;
    insumoId?: Prisma.SortOrder;
    fecha?: Prisma.SortOrder;
    cantidad?: Prisma.SortOrder;
    unidad?: Prisma.SortOrder;
    observaciones?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.AplicacionInsumoCountOrderByAggregateInput;
    _avg?: Prisma.AplicacionInsumoAvgOrderByAggregateInput;
    _max?: Prisma.AplicacionInsumoMaxOrderByAggregateInput;
    _min?: Prisma.AplicacionInsumoMinOrderByAggregateInput;
    _sum?: Prisma.AplicacionInsumoSumOrderByAggregateInput;
};
export type AplicacionInsumoScalarWhereWithAggregatesInput = {
    AND?: Prisma.AplicacionInsumoScalarWhereWithAggregatesInput | Prisma.AplicacionInsumoScalarWhereWithAggregatesInput[];
    OR?: Prisma.AplicacionInsumoScalarWhereWithAggregatesInput[];
    NOT?: Prisma.AplicacionInsumoScalarWhereWithAggregatesInput | Prisma.AplicacionInsumoScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"AplicacionInsumo"> | number;
    siembraId?: Prisma.IntWithAggregatesFilter<"AplicacionInsumo"> | number;
    insumoId?: Prisma.IntWithAggregatesFilter<"AplicacionInsumo"> | number;
    fecha?: Prisma.DateTimeWithAggregatesFilter<"AplicacionInsumo"> | Date | string;
    cantidad?: Prisma.FloatWithAggregatesFilter<"AplicacionInsumo"> | number;
    unidad?: Prisma.StringWithAggregatesFilter<"AplicacionInsumo"> | string;
    observaciones?: Prisma.StringNullableWithAggregatesFilter<"AplicacionInsumo"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"AplicacionInsumo"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"AplicacionInsumo"> | Date | string;
};
export type AplicacionInsumoCreateInput = {
    fecha: Date | string;
    cantidad: number;
    unidad: string;
    observaciones?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    siembra: Prisma.SiembraCreateNestedOneWithoutAplicacionesInput;
    insumo: Prisma.InsumoCreateNestedOneWithoutAplicacionesInput;
};
export type AplicacionInsumoUncheckedCreateInput = {
    id?: number;
    siembraId: number;
    insumoId: number;
    fecha: Date | string;
    cantidad: number;
    unidad: string;
    observaciones?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type AplicacionInsumoUpdateInput = {
    fecha?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    cantidad?: Prisma.FloatFieldUpdateOperationsInput | number;
    unidad?: Prisma.StringFieldUpdateOperationsInput | string;
    observaciones?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    siembra?: Prisma.SiembraUpdateOneRequiredWithoutAplicacionesNestedInput;
    insumo?: Prisma.InsumoUpdateOneRequiredWithoutAplicacionesNestedInput;
};
export type AplicacionInsumoUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    siembraId?: Prisma.IntFieldUpdateOperationsInput | number;
    insumoId?: Prisma.IntFieldUpdateOperationsInput | number;
    fecha?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    cantidad?: Prisma.FloatFieldUpdateOperationsInput | number;
    unidad?: Prisma.StringFieldUpdateOperationsInput | string;
    observaciones?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AplicacionInsumoCreateManyInput = {
    id?: number;
    siembraId: number;
    insumoId: number;
    fecha: Date | string;
    cantidad: number;
    unidad: string;
    observaciones?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type AplicacionInsumoUpdateManyMutationInput = {
    fecha?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    cantidad?: Prisma.FloatFieldUpdateOperationsInput | number;
    unidad?: Prisma.StringFieldUpdateOperationsInput | string;
    observaciones?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AplicacionInsumoUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    siembraId?: Prisma.IntFieldUpdateOperationsInput | number;
    insumoId?: Prisma.IntFieldUpdateOperationsInput | number;
    fecha?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    cantidad?: Prisma.FloatFieldUpdateOperationsInput | number;
    unidad?: Prisma.StringFieldUpdateOperationsInput | string;
    observaciones?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AplicacionInsumoListRelationFilter = {
    every?: Prisma.AplicacionInsumoWhereInput;
    some?: Prisma.AplicacionInsumoWhereInput;
    none?: Prisma.AplicacionInsumoWhereInput;
};
export type AplicacionInsumoOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type AplicacionInsumoCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    siembraId?: Prisma.SortOrder;
    insumoId?: Prisma.SortOrder;
    fecha?: Prisma.SortOrder;
    cantidad?: Prisma.SortOrder;
    unidad?: Prisma.SortOrder;
    observaciones?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type AplicacionInsumoAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    siembraId?: Prisma.SortOrder;
    insumoId?: Prisma.SortOrder;
    cantidad?: Prisma.SortOrder;
};
export type AplicacionInsumoMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    siembraId?: Prisma.SortOrder;
    insumoId?: Prisma.SortOrder;
    fecha?: Prisma.SortOrder;
    cantidad?: Prisma.SortOrder;
    unidad?: Prisma.SortOrder;
    observaciones?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type AplicacionInsumoMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    siembraId?: Prisma.SortOrder;
    insumoId?: Prisma.SortOrder;
    fecha?: Prisma.SortOrder;
    cantidad?: Prisma.SortOrder;
    unidad?: Prisma.SortOrder;
    observaciones?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type AplicacionInsumoSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    siembraId?: Prisma.SortOrder;
    insumoId?: Prisma.SortOrder;
    cantidad?: Prisma.SortOrder;
};
export type AplicacionInsumoCreateNestedManyWithoutSiembraInput = {
    create?: Prisma.XOR<Prisma.AplicacionInsumoCreateWithoutSiembraInput, Prisma.AplicacionInsumoUncheckedCreateWithoutSiembraInput> | Prisma.AplicacionInsumoCreateWithoutSiembraInput[] | Prisma.AplicacionInsumoUncheckedCreateWithoutSiembraInput[];
    connectOrCreate?: Prisma.AplicacionInsumoCreateOrConnectWithoutSiembraInput | Prisma.AplicacionInsumoCreateOrConnectWithoutSiembraInput[];
    createMany?: Prisma.AplicacionInsumoCreateManySiembraInputEnvelope;
    connect?: Prisma.AplicacionInsumoWhereUniqueInput | Prisma.AplicacionInsumoWhereUniqueInput[];
};
export type AplicacionInsumoUncheckedCreateNestedManyWithoutSiembraInput = {
    create?: Prisma.XOR<Prisma.AplicacionInsumoCreateWithoutSiembraInput, Prisma.AplicacionInsumoUncheckedCreateWithoutSiembraInput> | Prisma.AplicacionInsumoCreateWithoutSiembraInput[] | Prisma.AplicacionInsumoUncheckedCreateWithoutSiembraInput[];
    connectOrCreate?: Prisma.AplicacionInsumoCreateOrConnectWithoutSiembraInput | Prisma.AplicacionInsumoCreateOrConnectWithoutSiembraInput[];
    createMany?: Prisma.AplicacionInsumoCreateManySiembraInputEnvelope;
    connect?: Prisma.AplicacionInsumoWhereUniqueInput | Prisma.AplicacionInsumoWhereUniqueInput[];
};
export type AplicacionInsumoUpdateManyWithoutSiembraNestedInput = {
    create?: Prisma.XOR<Prisma.AplicacionInsumoCreateWithoutSiembraInput, Prisma.AplicacionInsumoUncheckedCreateWithoutSiembraInput> | Prisma.AplicacionInsumoCreateWithoutSiembraInput[] | Prisma.AplicacionInsumoUncheckedCreateWithoutSiembraInput[];
    connectOrCreate?: Prisma.AplicacionInsumoCreateOrConnectWithoutSiembraInput | Prisma.AplicacionInsumoCreateOrConnectWithoutSiembraInput[];
    upsert?: Prisma.AplicacionInsumoUpsertWithWhereUniqueWithoutSiembraInput | Prisma.AplicacionInsumoUpsertWithWhereUniqueWithoutSiembraInput[];
    createMany?: Prisma.AplicacionInsumoCreateManySiembraInputEnvelope;
    set?: Prisma.AplicacionInsumoWhereUniqueInput | Prisma.AplicacionInsumoWhereUniqueInput[];
    disconnect?: Prisma.AplicacionInsumoWhereUniqueInput | Prisma.AplicacionInsumoWhereUniqueInput[];
    delete?: Prisma.AplicacionInsumoWhereUniqueInput | Prisma.AplicacionInsumoWhereUniqueInput[];
    connect?: Prisma.AplicacionInsumoWhereUniqueInput | Prisma.AplicacionInsumoWhereUniqueInput[];
    update?: Prisma.AplicacionInsumoUpdateWithWhereUniqueWithoutSiembraInput | Prisma.AplicacionInsumoUpdateWithWhereUniqueWithoutSiembraInput[];
    updateMany?: Prisma.AplicacionInsumoUpdateManyWithWhereWithoutSiembraInput | Prisma.AplicacionInsumoUpdateManyWithWhereWithoutSiembraInput[];
    deleteMany?: Prisma.AplicacionInsumoScalarWhereInput | Prisma.AplicacionInsumoScalarWhereInput[];
};
export type AplicacionInsumoUncheckedUpdateManyWithoutSiembraNestedInput = {
    create?: Prisma.XOR<Prisma.AplicacionInsumoCreateWithoutSiembraInput, Prisma.AplicacionInsumoUncheckedCreateWithoutSiembraInput> | Prisma.AplicacionInsumoCreateWithoutSiembraInput[] | Prisma.AplicacionInsumoUncheckedCreateWithoutSiembraInput[];
    connectOrCreate?: Prisma.AplicacionInsumoCreateOrConnectWithoutSiembraInput | Prisma.AplicacionInsumoCreateOrConnectWithoutSiembraInput[];
    upsert?: Prisma.AplicacionInsumoUpsertWithWhereUniqueWithoutSiembraInput | Prisma.AplicacionInsumoUpsertWithWhereUniqueWithoutSiembraInput[];
    createMany?: Prisma.AplicacionInsumoCreateManySiembraInputEnvelope;
    set?: Prisma.AplicacionInsumoWhereUniqueInput | Prisma.AplicacionInsumoWhereUniqueInput[];
    disconnect?: Prisma.AplicacionInsumoWhereUniqueInput | Prisma.AplicacionInsumoWhereUniqueInput[];
    delete?: Prisma.AplicacionInsumoWhereUniqueInput | Prisma.AplicacionInsumoWhereUniqueInput[];
    connect?: Prisma.AplicacionInsumoWhereUniqueInput | Prisma.AplicacionInsumoWhereUniqueInput[];
    update?: Prisma.AplicacionInsumoUpdateWithWhereUniqueWithoutSiembraInput | Prisma.AplicacionInsumoUpdateWithWhereUniqueWithoutSiembraInput[];
    updateMany?: Prisma.AplicacionInsumoUpdateManyWithWhereWithoutSiembraInput | Prisma.AplicacionInsumoUpdateManyWithWhereWithoutSiembraInput[];
    deleteMany?: Prisma.AplicacionInsumoScalarWhereInput | Prisma.AplicacionInsumoScalarWhereInput[];
};
export type AplicacionInsumoCreateNestedManyWithoutInsumoInput = {
    create?: Prisma.XOR<Prisma.AplicacionInsumoCreateWithoutInsumoInput, Prisma.AplicacionInsumoUncheckedCreateWithoutInsumoInput> | Prisma.AplicacionInsumoCreateWithoutInsumoInput[] | Prisma.AplicacionInsumoUncheckedCreateWithoutInsumoInput[];
    connectOrCreate?: Prisma.AplicacionInsumoCreateOrConnectWithoutInsumoInput | Prisma.AplicacionInsumoCreateOrConnectWithoutInsumoInput[];
    createMany?: Prisma.AplicacionInsumoCreateManyInsumoInputEnvelope;
    connect?: Prisma.AplicacionInsumoWhereUniqueInput | Prisma.AplicacionInsumoWhereUniqueInput[];
};
export type AplicacionInsumoUncheckedCreateNestedManyWithoutInsumoInput = {
    create?: Prisma.XOR<Prisma.AplicacionInsumoCreateWithoutInsumoInput, Prisma.AplicacionInsumoUncheckedCreateWithoutInsumoInput> | Prisma.AplicacionInsumoCreateWithoutInsumoInput[] | Prisma.AplicacionInsumoUncheckedCreateWithoutInsumoInput[];
    connectOrCreate?: Prisma.AplicacionInsumoCreateOrConnectWithoutInsumoInput | Prisma.AplicacionInsumoCreateOrConnectWithoutInsumoInput[];
    createMany?: Prisma.AplicacionInsumoCreateManyInsumoInputEnvelope;
    connect?: Prisma.AplicacionInsumoWhereUniqueInput | Prisma.AplicacionInsumoWhereUniqueInput[];
};
export type AplicacionInsumoUpdateManyWithoutInsumoNestedInput = {
    create?: Prisma.XOR<Prisma.AplicacionInsumoCreateWithoutInsumoInput, Prisma.AplicacionInsumoUncheckedCreateWithoutInsumoInput> | Prisma.AplicacionInsumoCreateWithoutInsumoInput[] | Prisma.AplicacionInsumoUncheckedCreateWithoutInsumoInput[];
    connectOrCreate?: Prisma.AplicacionInsumoCreateOrConnectWithoutInsumoInput | Prisma.AplicacionInsumoCreateOrConnectWithoutInsumoInput[];
    upsert?: Prisma.AplicacionInsumoUpsertWithWhereUniqueWithoutInsumoInput | Prisma.AplicacionInsumoUpsertWithWhereUniqueWithoutInsumoInput[];
    createMany?: Prisma.AplicacionInsumoCreateManyInsumoInputEnvelope;
    set?: Prisma.AplicacionInsumoWhereUniqueInput | Prisma.AplicacionInsumoWhereUniqueInput[];
    disconnect?: Prisma.AplicacionInsumoWhereUniqueInput | Prisma.AplicacionInsumoWhereUniqueInput[];
    delete?: Prisma.AplicacionInsumoWhereUniqueInput | Prisma.AplicacionInsumoWhereUniqueInput[];
    connect?: Prisma.AplicacionInsumoWhereUniqueInput | Prisma.AplicacionInsumoWhereUniqueInput[];
    update?: Prisma.AplicacionInsumoUpdateWithWhereUniqueWithoutInsumoInput | Prisma.AplicacionInsumoUpdateWithWhereUniqueWithoutInsumoInput[];
    updateMany?: Prisma.AplicacionInsumoUpdateManyWithWhereWithoutInsumoInput | Prisma.AplicacionInsumoUpdateManyWithWhereWithoutInsumoInput[];
    deleteMany?: Prisma.AplicacionInsumoScalarWhereInput | Prisma.AplicacionInsumoScalarWhereInput[];
};
export type AplicacionInsumoUncheckedUpdateManyWithoutInsumoNestedInput = {
    create?: Prisma.XOR<Prisma.AplicacionInsumoCreateWithoutInsumoInput, Prisma.AplicacionInsumoUncheckedCreateWithoutInsumoInput> | Prisma.AplicacionInsumoCreateWithoutInsumoInput[] | Prisma.AplicacionInsumoUncheckedCreateWithoutInsumoInput[];
    connectOrCreate?: Prisma.AplicacionInsumoCreateOrConnectWithoutInsumoInput | Prisma.AplicacionInsumoCreateOrConnectWithoutInsumoInput[];
    upsert?: Prisma.AplicacionInsumoUpsertWithWhereUniqueWithoutInsumoInput | Prisma.AplicacionInsumoUpsertWithWhereUniqueWithoutInsumoInput[];
    createMany?: Prisma.AplicacionInsumoCreateManyInsumoInputEnvelope;
    set?: Prisma.AplicacionInsumoWhereUniqueInput | Prisma.AplicacionInsumoWhereUniqueInput[];
    disconnect?: Prisma.AplicacionInsumoWhereUniqueInput | Prisma.AplicacionInsumoWhereUniqueInput[];
    delete?: Prisma.AplicacionInsumoWhereUniqueInput | Prisma.AplicacionInsumoWhereUniqueInput[];
    connect?: Prisma.AplicacionInsumoWhereUniqueInput | Prisma.AplicacionInsumoWhereUniqueInput[];
    update?: Prisma.AplicacionInsumoUpdateWithWhereUniqueWithoutInsumoInput | Prisma.AplicacionInsumoUpdateWithWhereUniqueWithoutInsumoInput[];
    updateMany?: Prisma.AplicacionInsumoUpdateManyWithWhereWithoutInsumoInput | Prisma.AplicacionInsumoUpdateManyWithWhereWithoutInsumoInput[];
    deleteMany?: Prisma.AplicacionInsumoScalarWhereInput | Prisma.AplicacionInsumoScalarWhereInput[];
};
export type AplicacionInsumoCreateWithoutSiembraInput = {
    fecha: Date | string;
    cantidad: number;
    unidad: string;
    observaciones?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    insumo: Prisma.InsumoCreateNestedOneWithoutAplicacionesInput;
};
export type AplicacionInsumoUncheckedCreateWithoutSiembraInput = {
    id?: number;
    insumoId: number;
    fecha: Date | string;
    cantidad: number;
    unidad: string;
    observaciones?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type AplicacionInsumoCreateOrConnectWithoutSiembraInput = {
    where: Prisma.AplicacionInsumoWhereUniqueInput;
    create: Prisma.XOR<Prisma.AplicacionInsumoCreateWithoutSiembraInput, Prisma.AplicacionInsumoUncheckedCreateWithoutSiembraInput>;
};
export type AplicacionInsumoCreateManySiembraInputEnvelope = {
    data: Prisma.AplicacionInsumoCreateManySiembraInput | Prisma.AplicacionInsumoCreateManySiembraInput[];
    skipDuplicates?: boolean;
};
export type AplicacionInsumoUpsertWithWhereUniqueWithoutSiembraInput = {
    where: Prisma.AplicacionInsumoWhereUniqueInput;
    update: Prisma.XOR<Prisma.AplicacionInsumoUpdateWithoutSiembraInput, Prisma.AplicacionInsumoUncheckedUpdateWithoutSiembraInput>;
    create: Prisma.XOR<Prisma.AplicacionInsumoCreateWithoutSiembraInput, Prisma.AplicacionInsumoUncheckedCreateWithoutSiembraInput>;
};
export type AplicacionInsumoUpdateWithWhereUniqueWithoutSiembraInput = {
    where: Prisma.AplicacionInsumoWhereUniqueInput;
    data: Prisma.XOR<Prisma.AplicacionInsumoUpdateWithoutSiembraInput, Prisma.AplicacionInsumoUncheckedUpdateWithoutSiembraInput>;
};
export type AplicacionInsumoUpdateManyWithWhereWithoutSiembraInput = {
    where: Prisma.AplicacionInsumoScalarWhereInput;
    data: Prisma.XOR<Prisma.AplicacionInsumoUpdateManyMutationInput, Prisma.AplicacionInsumoUncheckedUpdateManyWithoutSiembraInput>;
};
export type AplicacionInsumoScalarWhereInput = {
    AND?: Prisma.AplicacionInsumoScalarWhereInput | Prisma.AplicacionInsumoScalarWhereInput[];
    OR?: Prisma.AplicacionInsumoScalarWhereInput[];
    NOT?: Prisma.AplicacionInsumoScalarWhereInput | Prisma.AplicacionInsumoScalarWhereInput[];
    id?: Prisma.IntFilter<"AplicacionInsumo"> | number;
    siembraId?: Prisma.IntFilter<"AplicacionInsumo"> | number;
    insumoId?: Prisma.IntFilter<"AplicacionInsumo"> | number;
    fecha?: Prisma.DateTimeFilter<"AplicacionInsumo"> | Date | string;
    cantidad?: Prisma.FloatFilter<"AplicacionInsumo"> | number;
    unidad?: Prisma.StringFilter<"AplicacionInsumo"> | string;
    observaciones?: Prisma.StringNullableFilter<"AplicacionInsumo"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"AplicacionInsumo"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"AplicacionInsumo"> | Date | string;
};
export type AplicacionInsumoCreateWithoutInsumoInput = {
    fecha: Date | string;
    cantidad: number;
    unidad: string;
    observaciones?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    siembra: Prisma.SiembraCreateNestedOneWithoutAplicacionesInput;
};
export type AplicacionInsumoUncheckedCreateWithoutInsumoInput = {
    id?: number;
    siembraId: number;
    fecha: Date | string;
    cantidad: number;
    unidad: string;
    observaciones?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type AplicacionInsumoCreateOrConnectWithoutInsumoInput = {
    where: Prisma.AplicacionInsumoWhereUniqueInput;
    create: Prisma.XOR<Prisma.AplicacionInsumoCreateWithoutInsumoInput, Prisma.AplicacionInsumoUncheckedCreateWithoutInsumoInput>;
};
export type AplicacionInsumoCreateManyInsumoInputEnvelope = {
    data: Prisma.AplicacionInsumoCreateManyInsumoInput | Prisma.AplicacionInsumoCreateManyInsumoInput[];
    skipDuplicates?: boolean;
};
export type AplicacionInsumoUpsertWithWhereUniqueWithoutInsumoInput = {
    where: Prisma.AplicacionInsumoWhereUniqueInput;
    update: Prisma.XOR<Prisma.AplicacionInsumoUpdateWithoutInsumoInput, Prisma.AplicacionInsumoUncheckedUpdateWithoutInsumoInput>;
    create: Prisma.XOR<Prisma.AplicacionInsumoCreateWithoutInsumoInput, Prisma.AplicacionInsumoUncheckedCreateWithoutInsumoInput>;
};
export type AplicacionInsumoUpdateWithWhereUniqueWithoutInsumoInput = {
    where: Prisma.AplicacionInsumoWhereUniqueInput;
    data: Prisma.XOR<Prisma.AplicacionInsumoUpdateWithoutInsumoInput, Prisma.AplicacionInsumoUncheckedUpdateWithoutInsumoInput>;
};
export type AplicacionInsumoUpdateManyWithWhereWithoutInsumoInput = {
    where: Prisma.AplicacionInsumoScalarWhereInput;
    data: Prisma.XOR<Prisma.AplicacionInsumoUpdateManyMutationInput, Prisma.AplicacionInsumoUncheckedUpdateManyWithoutInsumoInput>;
};
export type AplicacionInsumoCreateManySiembraInput = {
    id?: number;
    insumoId: number;
    fecha: Date | string;
    cantidad: number;
    unidad: string;
    observaciones?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type AplicacionInsumoUpdateWithoutSiembraInput = {
    fecha?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    cantidad?: Prisma.FloatFieldUpdateOperationsInput | number;
    unidad?: Prisma.StringFieldUpdateOperationsInput | string;
    observaciones?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    insumo?: Prisma.InsumoUpdateOneRequiredWithoutAplicacionesNestedInput;
};
export type AplicacionInsumoUncheckedUpdateWithoutSiembraInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    insumoId?: Prisma.IntFieldUpdateOperationsInput | number;
    fecha?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    cantidad?: Prisma.FloatFieldUpdateOperationsInput | number;
    unidad?: Prisma.StringFieldUpdateOperationsInput | string;
    observaciones?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AplicacionInsumoUncheckedUpdateManyWithoutSiembraInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    insumoId?: Prisma.IntFieldUpdateOperationsInput | number;
    fecha?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    cantidad?: Prisma.FloatFieldUpdateOperationsInput | number;
    unidad?: Prisma.StringFieldUpdateOperationsInput | string;
    observaciones?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AplicacionInsumoCreateManyInsumoInput = {
    id?: number;
    siembraId: number;
    fecha: Date | string;
    cantidad: number;
    unidad: string;
    observaciones?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type AplicacionInsumoUpdateWithoutInsumoInput = {
    fecha?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    cantidad?: Prisma.FloatFieldUpdateOperationsInput | number;
    unidad?: Prisma.StringFieldUpdateOperationsInput | string;
    observaciones?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    siembra?: Prisma.SiembraUpdateOneRequiredWithoutAplicacionesNestedInput;
};
export type AplicacionInsumoUncheckedUpdateWithoutInsumoInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    siembraId?: Prisma.IntFieldUpdateOperationsInput | number;
    fecha?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    cantidad?: Prisma.FloatFieldUpdateOperationsInput | number;
    unidad?: Prisma.StringFieldUpdateOperationsInput | string;
    observaciones?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AplicacionInsumoUncheckedUpdateManyWithoutInsumoInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    siembraId?: Prisma.IntFieldUpdateOperationsInput | number;
    fecha?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    cantidad?: Prisma.FloatFieldUpdateOperationsInput | number;
    unidad?: Prisma.StringFieldUpdateOperationsInput | string;
    observaciones?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AplicacionInsumoSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    siembraId?: boolean;
    insumoId?: boolean;
    fecha?: boolean;
    cantidad?: boolean;
    unidad?: boolean;
    observaciones?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    siembra?: boolean | Prisma.SiembraDefaultArgs<ExtArgs>;
    insumo?: boolean | Prisma.InsumoDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["aplicacionInsumo"]>;
export type AplicacionInsumoSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    siembraId?: boolean;
    insumoId?: boolean;
    fecha?: boolean;
    cantidad?: boolean;
    unidad?: boolean;
    observaciones?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    siembra?: boolean | Prisma.SiembraDefaultArgs<ExtArgs>;
    insumo?: boolean | Prisma.InsumoDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["aplicacionInsumo"]>;
export type AplicacionInsumoSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    siembraId?: boolean;
    insumoId?: boolean;
    fecha?: boolean;
    cantidad?: boolean;
    unidad?: boolean;
    observaciones?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    siembra?: boolean | Prisma.SiembraDefaultArgs<ExtArgs>;
    insumo?: boolean | Prisma.InsumoDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["aplicacionInsumo"]>;
export type AplicacionInsumoSelectScalar = {
    id?: boolean;
    siembraId?: boolean;
    insumoId?: boolean;
    fecha?: boolean;
    cantidad?: boolean;
    unidad?: boolean;
    observaciones?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type AplicacionInsumoOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "siembraId" | "insumoId" | "fecha" | "cantidad" | "unidad" | "observaciones" | "createdAt" | "updatedAt", ExtArgs["result"]["aplicacionInsumo"]>;
export type AplicacionInsumoInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    siembra?: boolean | Prisma.SiembraDefaultArgs<ExtArgs>;
    insumo?: boolean | Prisma.InsumoDefaultArgs<ExtArgs>;
};
export type AplicacionInsumoIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    siembra?: boolean | Prisma.SiembraDefaultArgs<ExtArgs>;
    insumo?: boolean | Prisma.InsumoDefaultArgs<ExtArgs>;
};
export type AplicacionInsumoIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    siembra?: boolean | Prisma.SiembraDefaultArgs<ExtArgs>;
    insumo?: boolean | Prisma.InsumoDefaultArgs<ExtArgs>;
};
export type $AplicacionInsumoPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "AplicacionInsumo";
    objects: {
        siembra: Prisma.$SiembraPayload<ExtArgs>;
        insumo: Prisma.$InsumoPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        siembraId: number;
        insumoId: number;
        fecha: Date;
        cantidad: number;
        unidad: string;
        observaciones: string | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["aplicacionInsumo"]>;
    composites: {};
};
export type AplicacionInsumoGetPayload<S extends boolean | null | undefined | AplicacionInsumoDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$AplicacionInsumoPayload, S>;
export type AplicacionInsumoCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<AplicacionInsumoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: AplicacionInsumoCountAggregateInputType | true;
};
export interface AplicacionInsumoDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['AplicacionInsumo'];
        meta: {
            name: 'AplicacionInsumo';
        };
    };
    findUnique<T extends AplicacionInsumoFindUniqueArgs>(args: Prisma.SelectSubset<T, AplicacionInsumoFindUniqueArgs<ExtArgs>>): Prisma.Prisma__AplicacionInsumoClient<runtime.Types.Result.GetResult<Prisma.$AplicacionInsumoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends AplicacionInsumoFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, AplicacionInsumoFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__AplicacionInsumoClient<runtime.Types.Result.GetResult<Prisma.$AplicacionInsumoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends AplicacionInsumoFindFirstArgs>(args?: Prisma.SelectSubset<T, AplicacionInsumoFindFirstArgs<ExtArgs>>): Prisma.Prisma__AplicacionInsumoClient<runtime.Types.Result.GetResult<Prisma.$AplicacionInsumoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends AplicacionInsumoFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, AplicacionInsumoFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__AplicacionInsumoClient<runtime.Types.Result.GetResult<Prisma.$AplicacionInsumoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends AplicacionInsumoFindManyArgs>(args?: Prisma.SelectSubset<T, AplicacionInsumoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AplicacionInsumoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends AplicacionInsumoCreateArgs>(args: Prisma.SelectSubset<T, AplicacionInsumoCreateArgs<ExtArgs>>): Prisma.Prisma__AplicacionInsumoClient<runtime.Types.Result.GetResult<Prisma.$AplicacionInsumoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends AplicacionInsumoCreateManyArgs>(args?: Prisma.SelectSubset<T, AplicacionInsumoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends AplicacionInsumoCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, AplicacionInsumoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AplicacionInsumoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends AplicacionInsumoDeleteArgs>(args: Prisma.SelectSubset<T, AplicacionInsumoDeleteArgs<ExtArgs>>): Prisma.Prisma__AplicacionInsumoClient<runtime.Types.Result.GetResult<Prisma.$AplicacionInsumoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends AplicacionInsumoUpdateArgs>(args: Prisma.SelectSubset<T, AplicacionInsumoUpdateArgs<ExtArgs>>): Prisma.Prisma__AplicacionInsumoClient<runtime.Types.Result.GetResult<Prisma.$AplicacionInsumoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends AplicacionInsumoDeleteManyArgs>(args?: Prisma.SelectSubset<T, AplicacionInsumoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends AplicacionInsumoUpdateManyArgs>(args: Prisma.SelectSubset<T, AplicacionInsumoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends AplicacionInsumoUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, AplicacionInsumoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AplicacionInsumoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends AplicacionInsumoUpsertArgs>(args: Prisma.SelectSubset<T, AplicacionInsumoUpsertArgs<ExtArgs>>): Prisma.Prisma__AplicacionInsumoClient<runtime.Types.Result.GetResult<Prisma.$AplicacionInsumoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends AplicacionInsumoCountArgs>(args?: Prisma.Subset<T, AplicacionInsumoCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], AplicacionInsumoCountAggregateOutputType> : number>;
    aggregate<T extends AplicacionInsumoAggregateArgs>(args: Prisma.Subset<T, AplicacionInsumoAggregateArgs>): Prisma.PrismaPromise<GetAplicacionInsumoAggregateType<T>>;
    groupBy<T extends AplicacionInsumoGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: AplicacionInsumoGroupByArgs['orderBy'];
    } : {
        orderBy?: AplicacionInsumoGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, AplicacionInsumoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAplicacionInsumoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: AplicacionInsumoFieldRefs;
}
export interface Prisma__AplicacionInsumoClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    siembra<T extends Prisma.SiembraDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.SiembraDefaultArgs<ExtArgs>>): Prisma.Prisma__SiembraClient<runtime.Types.Result.GetResult<Prisma.$SiembraPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    insumo<T extends Prisma.InsumoDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.InsumoDefaultArgs<ExtArgs>>): Prisma.Prisma__InsumoClient<runtime.Types.Result.GetResult<Prisma.$InsumoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface AplicacionInsumoFieldRefs {
    readonly id: Prisma.FieldRef<"AplicacionInsumo", 'Int'>;
    readonly siembraId: Prisma.FieldRef<"AplicacionInsumo", 'Int'>;
    readonly insumoId: Prisma.FieldRef<"AplicacionInsumo", 'Int'>;
    readonly fecha: Prisma.FieldRef<"AplicacionInsumo", 'DateTime'>;
    readonly cantidad: Prisma.FieldRef<"AplicacionInsumo", 'Float'>;
    readonly unidad: Prisma.FieldRef<"AplicacionInsumo", 'String'>;
    readonly observaciones: Prisma.FieldRef<"AplicacionInsumo", 'String'>;
    readonly createdAt: Prisma.FieldRef<"AplicacionInsumo", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"AplicacionInsumo", 'DateTime'>;
}
export type AplicacionInsumoFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AplicacionInsumoSelect<ExtArgs> | null;
    omit?: Prisma.AplicacionInsumoOmit<ExtArgs> | null;
    include?: Prisma.AplicacionInsumoInclude<ExtArgs> | null;
    where: Prisma.AplicacionInsumoWhereUniqueInput;
};
export type AplicacionInsumoFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AplicacionInsumoSelect<ExtArgs> | null;
    omit?: Prisma.AplicacionInsumoOmit<ExtArgs> | null;
    include?: Prisma.AplicacionInsumoInclude<ExtArgs> | null;
    where: Prisma.AplicacionInsumoWhereUniqueInput;
};
export type AplicacionInsumoFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type AplicacionInsumoFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type AplicacionInsumoFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type AplicacionInsumoCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AplicacionInsumoSelect<ExtArgs> | null;
    omit?: Prisma.AplicacionInsumoOmit<ExtArgs> | null;
    include?: Prisma.AplicacionInsumoInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AplicacionInsumoCreateInput, Prisma.AplicacionInsumoUncheckedCreateInput>;
};
export type AplicacionInsumoCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.AplicacionInsumoCreateManyInput | Prisma.AplicacionInsumoCreateManyInput[];
    skipDuplicates?: boolean;
};
export type AplicacionInsumoCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AplicacionInsumoSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.AplicacionInsumoOmit<ExtArgs> | null;
    data: Prisma.AplicacionInsumoCreateManyInput | Prisma.AplicacionInsumoCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.AplicacionInsumoIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type AplicacionInsumoUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AplicacionInsumoSelect<ExtArgs> | null;
    omit?: Prisma.AplicacionInsumoOmit<ExtArgs> | null;
    include?: Prisma.AplicacionInsumoInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AplicacionInsumoUpdateInput, Prisma.AplicacionInsumoUncheckedUpdateInput>;
    where: Prisma.AplicacionInsumoWhereUniqueInput;
};
export type AplicacionInsumoUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.AplicacionInsumoUpdateManyMutationInput, Prisma.AplicacionInsumoUncheckedUpdateManyInput>;
    where?: Prisma.AplicacionInsumoWhereInput;
    limit?: number;
};
export type AplicacionInsumoUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AplicacionInsumoSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.AplicacionInsumoOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AplicacionInsumoUpdateManyMutationInput, Prisma.AplicacionInsumoUncheckedUpdateManyInput>;
    where?: Prisma.AplicacionInsumoWhereInput;
    limit?: number;
    include?: Prisma.AplicacionInsumoIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type AplicacionInsumoUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AplicacionInsumoSelect<ExtArgs> | null;
    omit?: Prisma.AplicacionInsumoOmit<ExtArgs> | null;
    include?: Prisma.AplicacionInsumoInclude<ExtArgs> | null;
    where: Prisma.AplicacionInsumoWhereUniqueInput;
    create: Prisma.XOR<Prisma.AplicacionInsumoCreateInput, Prisma.AplicacionInsumoUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.AplicacionInsumoUpdateInput, Prisma.AplicacionInsumoUncheckedUpdateInput>;
};
export type AplicacionInsumoDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AplicacionInsumoSelect<ExtArgs> | null;
    omit?: Prisma.AplicacionInsumoOmit<ExtArgs> | null;
    include?: Prisma.AplicacionInsumoInclude<ExtArgs> | null;
    where: Prisma.AplicacionInsumoWhereUniqueInput;
};
export type AplicacionInsumoDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AplicacionInsumoWhereInput;
    limit?: number;
};
export type AplicacionInsumoDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AplicacionInsumoSelect<ExtArgs> | null;
    omit?: Prisma.AplicacionInsumoOmit<ExtArgs> | null;
    include?: Prisma.AplicacionInsumoInclude<ExtArgs> | null;
};
