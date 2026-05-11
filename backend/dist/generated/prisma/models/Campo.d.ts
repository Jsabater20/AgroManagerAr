import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type CampoModel = runtime.Types.Result.DefaultSelection<Prisma.$CampoPayload>;
export type AggregateCampo = {
    _count: CampoCountAggregateOutputType | null;
    _avg: CampoAvgAggregateOutputType | null;
    _sum: CampoSumAggregateOutputType | null;
    _min: CampoMinAggregateOutputType | null;
    _max: CampoMaxAggregateOutputType | null;
};
export type CampoAvgAggregateOutputType = {
    id: number | null;
    hectareas: number | null;
    usuarioId: number | null;
};
export type CampoSumAggregateOutputType = {
    id: number | null;
    hectareas: number | null;
    usuarioId: number | null;
};
export type CampoMinAggregateOutputType = {
    id: number | null;
    nombre: string | null;
    hectareas: number | null;
    ubicacion: string | null;
    propietario: string | null;
    usuarioId: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type CampoMaxAggregateOutputType = {
    id: number | null;
    nombre: string | null;
    hectareas: number | null;
    ubicacion: string | null;
    propietario: string | null;
    usuarioId: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type CampoCountAggregateOutputType = {
    id: number;
    nombre: number;
    hectareas: number;
    ubicacion: number;
    propietario: number;
    usuarioId: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type CampoAvgAggregateInputType = {
    id?: true;
    hectareas?: true;
    usuarioId?: true;
};
export type CampoSumAggregateInputType = {
    id?: true;
    hectareas?: true;
    usuarioId?: true;
};
export type CampoMinAggregateInputType = {
    id?: true;
    nombre?: true;
    hectareas?: true;
    ubicacion?: true;
    propietario?: true;
    usuarioId?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type CampoMaxAggregateInputType = {
    id?: true;
    nombre?: true;
    hectareas?: true;
    ubicacion?: true;
    propietario?: true;
    usuarioId?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type CampoCountAggregateInputType = {
    id?: true;
    nombre?: true;
    hectareas?: true;
    ubicacion?: true;
    propietario?: true;
    usuarioId?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type CampoAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CampoWhereInput;
    orderBy?: Prisma.CampoOrderByWithRelationInput | Prisma.CampoOrderByWithRelationInput[];
    cursor?: Prisma.CampoWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | CampoCountAggregateInputType;
    _avg?: CampoAvgAggregateInputType;
    _sum?: CampoSumAggregateInputType;
    _min?: CampoMinAggregateInputType;
    _max?: CampoMaxAggregateInputType;
};
export type GetCampoAggregateType<T extends CampoAggregateArgs> = {
    [P in keyof T & keyof AggregateCampo]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateCampo[P]> : Prisma.GetScalarType<T[P], AggregateCampo[P]>;
};
export type CampoGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CampoWhereInput;
    orderBy?: Prisma.CampoOrderByWithAggregationInput | Prisma.CampoOrderByWithAggregationInput[];
    by: Prisma.CampoScalarFieldEnum[] | Prisma.CampoScalarFieldEnum;
    having?: Prisma.CampoScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: CampoCountAggregateInputType | true;
    _avg?: CampoAvgAggregateInputType;
    _sum?: CampoSumAggregateInputType;
    _min?: CampoMinAggregateInputType;
    _max?: CampoMaxAggregateInputType;
};
export type CampoGroupByOutputType = {
    id: number;
    nombre: string;
    hectareas: number;
    ubicacion: string | null;
    propietario: string | null;
    usuarioId: number;
    createdAt: Date;
    updatedAt: Date;
    _count: CampoCountAggregateOutputType | null;
    _avg: CampoAvgAggregateOutputType | null;
    _sum: CampoSumAggregateOutputType | null;
    _min: CampoMinAggregateOutputType | null;
    _max: CampoMaxAggregateOutputType | null;
};
export type GetCampoGroupByPayload<T extends CampoGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<CampoGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof CampoGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], CampoGroupByOutputType[P]> : Prisma.GetScalarType<T[P], CampoGroupByOutputType[P]>;
}>>;
export type CampoWhereInput = {
    AND?: Prisma.CampoWhereInput | Prisma.CampoWhereInput[];
    OR?: Prisma.CampoWhereInput[];
    NOT?: Prisma.CampoWhereInput | Prisma.CampoWhereInput[];
    id?: Prisma.IntFilter<"Campo"> | number;
    nombre?: Prisma.StringFilter<"Campo"> | string;
    hectareas?: Prisma.FloatFilter<"Campo"> | number;
    ubicacion?: Prisma.StringNullableFilter<"Campo"> | string | null;
    propietario?: Prisma.StringNullableFilter<"Campo"> | string | null;
    usuarioId?: Prisma.IntFilter<"Campo"> | number;
    createdAt?: Prisma.DateTimeFilter<"Campo"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Campo"> | Date | string;
    usuario?: Prisma.XOR<Prisma.UsuarioScalarRelationFilter, Prisma.UsuarioWhereInput>;
    lotes?: Prisma.LoteListRelationFilter;
};
export type CampoOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    nombre?: Prisma.SortOrder;
    hectareas?: Prisma.SortOrder;
    ubicacion?: Prisma.SortOrderInput | Prisma.SortOrder;
    propietario?: Prisma.SortOrderInput | Prisma.SortOrder;
    usuarioId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    usuario?: Prisma.UsuarioOrderByWithRelationInput;
    lotes?: Prisma.LoteOrderByRelationAggregateInput;
};
export type CampoWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    AND?: Prisma.CampoWhereInput | Prisma.CampoWhereInput[];
    OR?: Prisma.CampoWhereInput[];
    NOT?: Prisma.CampoWhereInput | Prisma.CampoWhereInput[];
    nombre?: Prisma.StringFilter<"Campo"> | string;
    hectareas?: Prisma.FloatFilter<"Campo"> | number;
    ubicacion?: Prisma.StringNullableFilter<"Campo"> | string | null;
    propietario?: Prisma.StringNullableFilter<"Campo"> | string | null;
    usuarioId?: Prisma.IntFilter<"Campo"> | number;
    createdAt?: Prisma.DateTimeFilter<"Campo"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Campo"> | Date | string;
    usuario?: Prisma.XOR<Prisma.UsuarioScalarRelationFilter, Prisma.UsuarioWhereInput>;
    lotes?: Prisma.LoteListRelationFilter;
}, "id">;
export type CampoOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    nombre?: Prisma.SortOrder;
    hectareas?: Prisma.SortOrder;
    ubicacion?: Prisma.SortOrderInput | Prisma.SortOrder;
    propietario?: Prisma.SortOrderInput | Prisma.SortOrder;
    usuarioId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.CampoCountOrderByAggregateInput;
    _avg?: Prisma.CampoAvgOrderByAggregateInput;
    _max?: Prisma.CampoMaxOrderByAggregateInput;
    _min?: Prisma.CampoMinOrderByAggregateInput;
    _sum?: Prisma.CampoSumOrderByAggregateInput;
};
export type CampoScalarWhereWithAggregatesInput = {
    AND?: Prisma.CampoScalarWhereWithAggregatesInput | Prisma.CampoScalarWhereWithAggregatesInput[];
    OR?: Prisma.CampoScalarWhereWithAggregatesInput[];
    NOT?: Prisma.CampoScalarWhereWithAggregatesInput | Prisma.CampoScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"Campo"> | number;
    nombre?: Prisma.StringWithAggregatesFilter<"Campo"> | string;
    hectareas?: Prisma.FloatWithAggregatesFilter<"Campo"> | number;
    ubicacion?: Prisma.StringNullableWithAggregatesFilter<"Campo"> | string | null;
    propietario?: Prisma.StringNullableWithAggregatesFilter<"Campo"> | string | null;
    usuarioId?: Prisma.IntWithAggregatesFilter<"Campo"> | number;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Campo"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Campo"> | Date | string;
};
export type CampoCreateInput = {
    nombre: string;
    hectareas: number;
    ubicacion?: string | null;
    propietario?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    usuario: Prisma.UsuarioCreateNestedOneWithoutCamposInput;
    lotes?: Prisma.LoteCreateNestedManyWithoutCampoInput;
};
export type CampoUncheckedCreateInput = {
    id?: number;
    nombre: string;
    hectareas: number;
    ubicacion?: string | null;
    propietario?: string | null;
    usuarioId: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    lotes?: Prisma.LoteUncheckedCreateNestedManyWithoutCampoInput;
};
export type CampoUpdateInput = {
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    hectareas?: Prisma.FloatFieldUpdateOperationsInput | number;
    ubicacion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    propietario?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    usuario?: Prisma.UsuarioUpdateOneRequiredWithoutCamposNestedInput;
    lotes?: Prisma.LoteUpdateManyWithoutCampoNestedInput;
};
export type CampoUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    hectareas?: Prisma.FloatFieldUpdateOperationsInput | number;
    ubicacion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    propietario?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    usuarioId?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    lotes?: Prisma.LoteUncheckedUpdateManyWithoutCampoNestedInput;
};
export type CampoCreateManyInput = {
    id?: number;
    nombre: string;
    hectareas: number;
    ubicacion?: string | null;
    propietario?: string | null;
    usuarioId: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type CampoUpdateManyMutationInput = {
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    hectareas?: Prisma.FloatFieldUpdateOperationsInput | number;
    ubicacion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    propietario?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CampoUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    hectareas?: Prisma.FloatFieldUpdateOperationsInput | number;
    ubicacion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    propietario?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    usuarioId?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CampoListRelationFilter = {
    every?: Prisma.CampoWhereInput;
    some?: Prisma.CampoWhereInput;
    none?: Prisma.CampoWhereInput;
};
export type CampoOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type CampoCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    nombre?: Prisma.SortOrder;
    hectareas?: Prisma.SortOrder;
    ubicacion?: Prisma.SortOrder;
    propietario?: Prisma.SortOrder;
    usuarioId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type CampoAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    hectareas?: Prisma.SortOrder;
    usuarioId?: Prisma.SortOrder;
};
export type CampoMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    nombre?: Prisma.SortOrder;
    hectareas?: Prisma.SortOrder;
    ubicacion?: Prisma.SortOrder;
    propietario?: Prisma.SortOrder;
    usuarioId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type CampoMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    nombre?: Prisma.SortOrder;
    hectareas?: Prisma.SortOrder;
    ubicacion?: Prisma.SortOrder;
    propietario?: Prisma.SortOrder;
    usuarioId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type CampoSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    hectareas?: Prisma.SortOrder;
    usuarioId?: Prisma.SortOrder;
};
export type CampoScalarRelationFilter = {
    is?: Prisma.CampoWhereInput;
    isNot?: Prisma.CampoWhereInput;
};
export type CampoCreateNestedManyWithoutUsuarioInput = {
    create?: Prisma.XOR<Prisma.CampoCreateWithoutUsuarioInput, Prisma.CampoUncheckedCreateWithoutUsuarioInput> | Prisma.CampoCreateWithoutUsuarioInput[] | Prisma.CampoUncheckedCreateWithoutUsuarioInput[];
    connectOrCreate?: Prisma.CampoCreateOrConnectWithoutUsuarioInput | Prisma.CampoCreateOrConnectWithoutUsuarioInput[];
    createMany?: Prisma.CampoCreateManyUsuarioInputEnvelope;
    connect?: Prisma.CampoWhereUniqueInput | Prisma.CampoWhereUniqueInput[];
};
export type CampoUncheckedCreateNestedManyWithoutUsuarioInput = {
    create?: Prisma.XOR<Prisma.CampoCreateWithoutUsuarioInput, Prisma.CampoUncheckedCreateWithoutUsuarioInput> | Prisma.CampoCreateWithoutUsuarioInput[] | Prisma.CampoUncheckedCreateWithoutUsuarioInput[];
    connectOrCreate?: Prisma.CampoCreateOrConnectWithoutUsuarioInput | Prisma.CampoCreateOrConnectWithoutUsuarioInput[];
    createMany?: Prisma.CampoCreateManyUsuarioInputEnvelope;
    connect?: Prisma.CampoWhereUniqueInput | Prisma.CampoWhereUniqueInput[];
};
export type CampoUpdateManyWithoutUsuarioNestedInput = {
    create?: Prisma.XOR<Prisma.CampoCreateWithoutUsuarioInput, Prisma.CampoUncheckedCreateWithoutUsuarioInput> | Prisma.CampoCreateWithoutUsuarioInput[] | Prisma.CampoUncheckedCreateWithoutUsuarioInput[];
    connectOrCreate?: Prisma.CampoCreateOrConnectWithoutUsuarioInput | Prisma.CampoCreateOrConnectWithoutUsuarioInput[];
    upsert?: Prisma.CampoUpsertWithWhereUniqueWithoutUsuarioInput | Prisma.CampoUpsertWithWhereUniqueWithoutUsuarioInput[];
    createMany?: Prisma.CampoCreateManyUsuarioInputEnvelope;
    set?: Prisma.CampoWhereUniqueInput | Prisma.CampoWhereUniqueInput[];
    disconnect?: Prisma.CampoWhereUniqueInput | Prisma.CampoWhereUniqueInput[];
    delete?: Prisma.CampoWhereUniqueInput | Prisma.CampoWhereUniqueInput[];
    connect?: Prisma.CampoWhereUniqueInput | Prisma.CampoWhereUniqueInput[];
    update?: Prisma.CampoUpdateWithWhereUniqueWithoutUsuarioInput | Prisma.CampoUpdateWithWhereUniqueWithoutUsuarioInput[];
    updateMany?: Prisma.CampoUpdateManyWithWhereWithoutUsuarioInput | Prisma.CampoUpdateManyWithWhereWithoutUsuarioInput[];
    deleteMany?: Prisma.CampoScalarWhereInput | Prisma.CampoScalarWhereInput[];
};
export type CampoUncheckedUpdateManyWithoutUsuarioNestedInput = {
    create?: Prisma.XOR<Prisma.CampoCreateWithoutUsuarioInput, Prisma.CampoUncheckedCreateWithoutUsuarioInput> | Prisma.CampoCreateWithoutUsuarioInput[] | Prisma.CampoUncheckedCreateWithoutUsuarioInput[];
    connectOrCreate?: Prisma.CampoCreateOrConnectWithoutUsuarioInput | Prisma.CampoCreateOrConnectWithoutUsuarioInput[];
    upsert?: Prisma.CampoUpsertWithWhereUniqueWithoutUsuarioInput | Prisma.CampoUpsertWithWhereUniqueWithoutUsuarioInput[];
    createMany?: Prisma.CampoCreateManyUsuarioInputEnvelope;
    set?: Prisma.CampoWhereUniqueInput | Prisma.CampoWhereUniqueInput[];
    disconnect?: Prisma.CampoWhereUniqueInput | Prisma.CampoWhereUniqueInput[];
    delete?: Prisma.CampoWhereUniqueInput | Prisma.CampoWhereUniqueInput[];
    connect?: Prisma.CampoWhereUniqueInput | Prisma.CampoWhereUniqueInput[];
    update?: Prisma.CampoUpdateWithWhereUniqueWithoutUsuarioInput | Prisma.CampoUpdateWithWhereUniqueWithoutUsuarioInput[];
    updateMany?: Prisma.CampoUpdateManyWithWhereWithoutUsuarioInput | Prisma.CampoUpdateManyWithWhereWithoutUsuarioInput[];
    deleteMany?: Prisma.CampoScalarWhereInput | Prisma.CampoScalarWhereInput[];
};
export type FloatFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null;
};
export type CampoCreateNestedOneWithoutLotesInput = {
    create?: Prisma.XOR<Prisma.CampoCreateWithoutLotesInput, Prisma.CampoUncheckedCreateWithoutLotesInput>;
    connectOrCreate?: Prisma.CampoCreateOrConnectWithoutLotesInput;
    connect?: Prisma.CampoWhereUniqueInput;
};
export type CampoUpdateOneRequiredWithoutLotesNestedInput = {
    create?: Prisma.XOR<Prisma.CampoCreateWithoutLotesInput, Prisma.CampoUncheckedCreateWithoutLotesInput>;
    connectOrCreate?: Prisma.CampoCreateOrConnectWithoutLotesInput;
    upsert?: Prisma.CampoUpsertWithoutLotesInput;
    connect?: Prisma.CampoWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.CampoUpdateToOneWithWhereWithoutLotesInput, Prisma.CampoUpdateWithoutLotesInput>, Prisma.CampoUncheckedUpdateWithoutLotesInput>;
};
export type CampoCreateWithoutUsuarioInput = {
    nombre: string;
    hectareas: number;
    ubicacion?: string | null;
    propietario?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    lotes?: Prisma.LoteCreateNestedManyWithoutCampoInput;
};
export type CampoUncheckedCreateWithoutUsuarioInput = {
    id?: number;
    nombre: string;
    hectareas: number;
    ubicacion?: string | null;
    propietario?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    lotes?: Prisma.LoteUncheckedCreateNestedManyWithoutCampoInput;
};
export type CampoCreateOrConnectWithoutUsuarioInput = {
    where: Prisma.CampoWhereUniqueInput;
    create: Prisma.XOR<Prisma.CampoCreateWithoutUsuarioInput, Prisma.CampoUncheckedCreateWithoutUsuarioInput>;
};
export type CampoCreateManyUsuarioInputEnvelope = {
    data: Prisma.CampoCreateManyUsuarioInput | Prisma.CampoCreateManyUsuarioInput[];
    skipDuplicates?: boolean;
};
export type CampoUpsertWithWhereUniqueWithoutUsuarioInput = {
    where: Prisma.CampoWhereUniqueInput;
    update: Prisma.XOR<Prisma.CampoUpdateWithoutUsuarioInput, Prisma.CampoUncheckedUpdateWithoutUsuarioInput>;
    create: Prisma.XOR<Prisma.CampoCreateWithoutUsuarioInput, Prisma.CampoUncheckedCreateWithoutUsuarioInput>;
};
export type CampoUpdateWithWhereUniqueWithoutUsuarioInput = {
    where: Prisma.CampoWhereUniqueInput;
    data: Prisma.XOR<Prisma.CampoUpdateWithoutUsuarioInput, Prisma.CampoUncheckedUpdateWithoutUsuarioInput>;
};
export type CampoUpdateManyWithWhereWithoutUsuarioInput = {
    where: Prisma.CampoScalarWhereInput;
    data: Prisma.XOR<Prisma.CampoUpdateManyMutationInput, Prisma.CampoUncheckedUpdateManyWithoutUsuarioInput>;
};
export type CampoScalarWhereInput = {
    AND?: Prisma.CampoScalarWhereInput | Prisma.CampoScalarWhereInput[];
    OR?: Prisma.CampoScalarWhereInput[];
    NOT?: Prisma.CampoScalarWhereInput | Prisma.CampoScalarWhereInput[];
    id?: Prisma.IntFilter<"Campo"> | number;
    nombre?: Prisma.StringFilter<"Campo"> | string;
    hectareas?: Prisma.FloatFilter<"Campo"> | number;
    ubicacion?: Prisma.StringNullableFilter<"Campo"> | string | null;
    propietario?: Prisma.StringNullableFilter<"Campo"> | string | null;
    usuarioId?: Prisma.IntFilter<"Campo"> | number;
    createdAt?: Prisma.DateTimeFilter<"Campo"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Campo"> | Date | string;
};
export type CampoCreateWithoutLotesInput = {
    nombre: string;
    hectareas: number;
    ubicacion?: string | null;
    propietario?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    usuario: Prisma.UsuarioCreateNestedOneWithoutCamposInput;
};
export type CampoUncheckedCreateWithoutLotesInput = {
    id?: number;
    nombre: string;
    hectareas: number;
    ubicacion?: string | null;
    propietario?: string | null;
    usuarioId: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type CampoCreateOrConnectWithoutLotesInput = {
    where: Prisma.CampoWhereUniqueInput;
    create: Prisma.XOR<Prisma.CampoCreateWithoutLotesInput, Prisma.CampoUncheckedCreateWithoutLotesInput>;
};
export type CampoUpsertWithoutLotesInput = {
    update: Prisma.XOR<Prisma.CampoUpdateWithoutLotesInput, Prisma.CampoUncheckedUpdateWithoutLotesInput>;
    create: Prisma.XOR<Prisma.CampoCreateWithoutLotesInput, Prisma.CampoUncheckedCreateWithoutLotesInput>;
    where?: Prisma.CampoWhereInput;
};
export type CampoUpdateToOneWithWhereWithoutLotesInput = {
    where?: Prisma.CampoWhereInput;
    data: Prisma.XOR<Prisma.CampoUpdateWithoutLotesInput, Prisma.CampoUncheckedUpdateWithoutLotesInput>;
};
export type CampoUpdateWithoutLotesInput = {
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    hectareas?: Prisma.FloatFieldUpdateOperationsInput | number;
    ubicacion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    propietario?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    usuario?: Prisma.UsuarioUpdateOneRequiredWithoutCamposNestedInput;
};
export type CampoUncheckedUpdateWithoutLotesInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    hectareas?: Prisma.FloatFieldUpdateOperationsInput | number;
    ubicacion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    propietario?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    usuarioId?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CampoCreateManyUsuarioInput = {
    id?: number;
    nombre: string;
    hectareas: number;
    ubicacion?: string | null;
    propietario?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type CampoUpdateWithoutUsuarioInput = {
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    hectareas?: Prisma.FloatFieldUpdateOperationsInput | number;
    ubicacion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    propietario?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    lotes?: Prisma.LoteUpdateManyWithoutCampoNestedInput;
};
export type CampoUncheckedUpdateWithoutUsuarioInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    hectareas?: Prisma.FloatFieldUpdateOperationsInput | number;
    ubicacion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    propietario?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    lotes?: Prisma.LoteUncheckedUpdateManyWithoutCampoNestedInput;
};
export type CampoUncheckedUpdateManyWithoutUsuarioInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    hectareas?: Prisma.FloatFieldUpdateOperationsInput | number;
    ubicacion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    propietario?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CampoCountOutputType = {
    lotes: number;
};
export type CampoCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    lotes?: boolean | CampoCountOutputTypeCountLotesArgs;
};
export type CampoCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CampoCountOutputTypeSelect<ExtArgs> | null;
};
export type CampoCountOutputTypeCountLotesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.LoteWhereInput;
};
export type CampoSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    nombre?: boolean;
    hectareas?: boolean;
    ubicacion?: boolean;
    propietario?: boolean;
    usuarioId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    usuario?: boolean | Prisma.UsuarioDefaultArgs<ExtArgs>;
    lotes?: boolean | Prisma.Campo$lotesArgs<ExtArgs>;
    _count?: boolean | Prisma.CampoCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["campo"]>;
export type CampoSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    nombre?: boolean;
    hectareas?: boolean;
    ubicacion?: boolean;
    propietario?: boolean;
    usuarioId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    usuario?: boolean | Prisma.UsuarioDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["campo"]>;
export type CampoSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    nombre?: boolean;
    hectareas?: boolean;
    ubicacion?: boolean;
    propietario?: boolean;
    usuarioId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    usuario?: boolean | Prisma.UsuarioDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["campo"]>;
export type CampoSelectScalar = {
    id?: boolean;
    nombre?: boolean;
    hectareas?: boolean;
    ubicacion?: boolean;
    propietario?: boolean;
    usuarioId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type CampoOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "nombre" | "hectareas" | "ubicacion" | "propietario" | "usuarioId" | "createdAt" | "updatedAt", ExtArgs["result"]["campo"]>;
export type CampoInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    usuario?: boolean | Prisma.UsuarioDefaultArgs<ExtArgs>;
    lotes?: boolean | Prisma.Campo$lotesArgs<ExtArgs>;
    _count?: boolean | Prisma.CampoCountOutputTypeDefaultArgs<ExtArgs>;
};
export type CampoIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    usuario?: boolean | Prisma.UsuarioDefaultArgs<ExtArgs>;
};
export type CampoIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    usuario?: boolean | Prisma.UsuarioDefaultArgs<ExtArgs>;
};
export type $CampoPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Campo";
    objects: {
        usuario: Prisma.$UsuarioPayload<ExtArgs>;
        lotes: Prisma.$LotePayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        nombre: string;
        hectareas: number;
        ubicacion: string | null;
        propietario: string | null;
        usuarioId: number;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["campo"]>;
    composites: {};
};
export type CampoGetPayload<S extends boolean | null | undefined | CampoDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$CampoPayload, S>;
export type CampoCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<CampoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: CampoCountAggregateInputType | true;
};
export interface CampoDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Campo'];
        meta: {
            name: 'Campo';
        };
    };
    findUnique<T extends CampoFindUniqueArgs>(args: Prisma.SelectSubset<T, CampoFindUniqueArgs<ExtArgs>>): Prisma.Prisma__CampoClient<runtime.Types.Result.GetResult<Prisma.$CampoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends CampoFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, CampoFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__CampoClient<runtime.Types.Result.GetResult<Prisma.$CampoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends CampoFindFirstArgs>(args?: Prisma.SelectSubset<T, CampoFindFirstArgs<ExtArgs>>): Prisma.Prisma__CampoClient<runtime.Types.Result.GetResult<Prisma.$CampoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends CampoFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, CampoFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__CampoClient<runtime.Types.Result.GetResult<Prisma.$CampoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends CampoFindManyArgs>(args?: Prisma.SelectSubset<T, CampoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CampoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends CampoCreateArgs>(args: Prisma.SelectSubset<T, CampoCreateArgs<ExtArgs>>): Prisma.Prisma__CampoClient<runtime.Types.Result.GetResult<Prisma.$CampoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends CampoCreateManyArgs>(args?: Prisma.SelectSubset<T, CampoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends CampoCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, CampoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CampoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends CampoDeleteArgs>(args: Prisma.SelectSubset<T, CampoDeleteArgs<ExtArgs>>): Prisma.Prisma__CampoClient<runtime.Types.Result.GetResult<Prisma.$CampoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends CampoUpdateArgs>(args: Prisma.SelectSubset<T, CampoUpdateArgs<ExtArgs>>): Prisma.Prisma__CampoClient<runtime.Types.Result.GetResult<Prisma.$CampoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends CampoDeleteManyArgs>(args?: Prisma.SelectSubset<T, CampoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends CampoUpdateManyArgs>(args: Prisma.SelectSubset<T, CampoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends CampoUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, CampoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CampoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends CampoUpsertArgs>(args: Prisma.SelectSubset<T, CampoUpsertArgs<ExtArgs>>): Prisma.Prisma__CampoClient<runtime.Types.Result.GetResult<Prisma.$CampoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends CampoCountArgs>(args?: Prisma.Subset<T, CampoCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], CampoCountAggregateOutputType> : number>;
    aggregate<T extends CampoAggregateArgs>(args: Prisma.Subset<T, CampoAggregateArgs>): Prisma.PrismaPromise<GetCampoAggregateType<T>>;
    groupBy<T extends CampoGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: CampoGroupByArgs['orderBy'];
    } : {
        orderBy?: CampoGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, CampoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCampoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: CampoFieldRefs;
}
export interface Prisma__CampoClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    usuario<T extends Prisma.UsuarioDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UsuarioDefaultArgs<ExtArgs>>): Prisma.Prisma__UsuarioClient<runtime.Types.Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    lotes<T extends Prisma.Campo$lotesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Campo$lotesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$LotePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface CampoFieldRefs {
    readonly id: Prisma.FieldRef<"Campo", 'Int'>;
    readonly nombre: Prisma.FieldRef<"Campo", 'String'>;
    readonly hectareas: Prisma.FieldRef<"Campo", 'Float'>;
    readonly ubicacion: Prisma.FieldRef<"Campo", 'String'>;
    readonly propietario: Prisma.FieldRef<"Campo", 'String'>;
    readonly usuarioId: Prisma.FieldRef<"Campo", 'Int'>;
    readonly createdAt: Prisma.FieldRef<"Campo", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Campo", 'DateTime'>;
}
export type CampoFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CampoSelect<ExtArgs> | null;
    omit?: Prisma.CampoOmit<ExtArgs> | null;
    include?: Prisma.CampoInclude<ExtArgs> | null;
    where: Prisma.CampoWhereUniqueInput;
};
export type CampoFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CampoSelect<ExtArgs> | null;
    omit?: Prisma.CampoOmit<ExtArgs> | null;
    include?: Prisma.CampoInclude<ExtArgs> | null;
    where: Prisma.CampoWhereUniqueInput;
};
export type CampoFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CampoSelect<ExtArgs> | null;
    omit?: Prisma.CampoOmit<ExtArgs> | null;
    include?: Prisma.CampoInclude<ExtArgs> | null;
    where?: Prisma.CampoWhereInput;
    orderBy?: Prisma.CampoOrderByWithRelationInput | Prisma.CampoOrderByWithRelationInput[];
    cursor?: Prisma.CampoWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CampoScalarFieldEnum | Prisma.CampoScalarFieldEnum[];
};
export type CampoFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CampoSelect<ExtArgs> | null;
    omit?: Prisma.CampoOmit<ExtArgs> | null;
    include?: Prisma.CampoInclude<ExtArgs> | null;
    where?: Prisma.CampoWhereInput;
    orderBy?: Prisma.CampoOrderByWithRelationInput | Prisma.CampoOrderByWithRelationInput[];
    cursor?: Prisma.CampoWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CampoScalarFieldEnum | Prisma.CampoScalarFieldEnum[];
};
export type CampoFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CampoSelect<ExtArgs> | null;
    omit?: Prisma.CampoOmit<ExtArgs> | null;
    include?: Prisma.CampoInclude<ExtArgs> | null;
    where?: Prisma.CampoWhereInput;
    orderBy?: Prisma.CampoOrderByWithRelationInput | Prisma.CampoOrderByWithRelationInput[];
    cursor?: Prisma.CampoWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CampoScalarFieldEnum | Prisma.CampoScalarFieldEnum[];
};
export type CampoCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CampoSelect<ExtArgs> | null;
    omit?: Prisma.CampoOmit<ExtArgs> | null;
    include?: Prisma.CampoInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CampoCreateInput, Prisma.CampoUncheckedCreateInput>;
};
export type CampoCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.CampoCreateManyInput | Prisma.CampoCreateManyInput[];
    skipDuplicates?: boolean;
};
export type CampoCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CampoSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.CampoOmit<ExtArgs> | null;
    data: Prisma.CampoCreateManyInput | Prisma.CampoCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.CampoIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type CampoUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CampoSelect<ExtArgs> | null;
    omit?: Prisma.CampoOmit<ExtArgs> | null;
    include?: Prisma.CampoInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CampoUpdateInput, Prisma.CampoUncheckedUpdateInput>;
    where: Prisma.CampoWhereUniqueInput;
};
export type CampoUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.CampoUpdateManyMutationInput, Prisma.CampoUncheckedUpdateManyInput>;
    where?: Prisma.CampoWhereInput;
    limit?: number;
};
export type CampoUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CampoSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.CampoOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CampoUpdateManyMutationInput, Prisma.CampoUncheckedUpdateManyInput>;
    where?: Prisma.CampoWhereInput;
    limit?: number;
    include?: Prisma.CampoIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type CampoUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CampoSelect<ExtArgs> | null;
    omit?: Prisma.CampoOmit<ExtArgs> | null;
    include?: Prisma.CampoInclude<ExtArgs> | null;
    where: Prisma.CampoWhereUniqueInput;
    create: Prisma.XOR<Prisma.CampoCreateInput, Prisma.CampoUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.CampoUpdateInput, Prisma.CampoUncheckedUpdateInput>;
};
export type CampoDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CampoSelect<ExtArgs> | null;
    omit?: Prisma.CampoOmit<ExtArgs> | null;
    include?: Prisma.CampoInclude<ExtArgs> | null;
    where: Prisma.CampoWhereUniqueInput;
};
export type CampoDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CampoWhereInput;
    limit?: number;
};
export type Campo$lotesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LoteSelect<ExtArgs> | null;
    omit?: Prisma.LoteOmit<ExtArgs> | null;
    include?: Prisma.LoteInclude<ExtArgs> | null;
    where?: Prisma.LoteWhereInput;
    orderBy?: Prisma.LoteOrderByWithRelationInput | Prisma.LoteOrderByWithRelationInput[];
    cursor?: Prisma.LoteWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.LoteScalarFieldEnum | Prisma.LoteScalarFieldEnum[];
};
export type CampoDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CampoSelect<ExtArgs> | null;
    omit?: Prisma.CampoOmit<ExtArgs> | null;
    include?: Prisma.CampoInclude<ExtArgs> | null;
};
