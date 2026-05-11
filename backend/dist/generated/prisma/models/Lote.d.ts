import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type LoteModel = runtime.Types.Result.DefaultSelection<Prisma.$LotePayload>;
export type AggregateLote = {
    _count: LoteCountAggregateOutputType | null;
    _avg: LoteAvgAggregateOutputType | null;
    _sum: LoteSumAggregateOutputType | null;
    _min: LoteMinAggregateOutputType | null;
    _max: LoteMaxAggregateOutputType | null;
};
export type LoteAvgAggregateOutputType = {
    id: number | null;
    hectareas: number | null;
    campoId: number | null;
};
export type LoteSumAggregateOutputType = {
    id: number | null;
    hectareas: number | null;
    campoId: number | null;
};
export type LoteMinAggregateOutputType = {
    id: number | null;
    nombre: string | null;
    hectareas: number | null;
    campoId: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type LoteMaxAggregateOutputType = {
    id: number | null;
    nombre: string | null;
    hectareas: number | null;
    campoId: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type LoteCountAggregateOutputType = {
    id: number;
    nombre: number;
    hectareas: number;
    campoId: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type LoteAvgAggregateInputType = {
    id?: true;
    hectareas?: true;
    campoId?: true;
};
export type LoteSumAggregateInputType = {
    id?: true;
    hectareas?: true;
    campoId?: true;
};
export type LoteMinAggregateInputType = {
    id?: true;
    nombre?: true;
    hectareas?: true;
    campoId?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type LoteMaxAggregateInputType = {
    id?: true;
    nombre?: true;
    hectareas?: true;
    campoId?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type LoteCountAggregateInputType = {
    id?: true;
    nombre?: true;
    hectareas?: true;
    campoId?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type LoteAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.LoteWhereInput;
    orderBy?: Prisma.LoteOrderByWithRelationInput | Prisma.LoteOrderByWithRelationInput[];
    cursor?: Prisma.LoteWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | LoteCountAggregateInputType;
    _avg?: LoteAvgAggregateInputType;
    _sum?: LoteSumAggregateInputType;
    _min?: LoteMinAggregateInputType;
    _max?: LoteMaxAggregateInputType;
};
export type GetLoteAggregateType<T extends LoteAggregateArgs> = {
    [P in keyof T & keyof AggregateLote]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateLote[P]> : Prisma.GetScalarType<T[P], AggregateLote[P]>;
};
export type LoteGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.LoteWhereInput;
    orderBy?: Prisma.LoteOrderByWithAggregationInput | Prisma.LoteOrderByWithAggregationInput[];
    by: Prisma.LoteScalarFieldEnum[] | Prisma.LoteScalarFieldEnum;
    having?: Prisma.LoteScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: LoteCountAggregateInputType | true;
    _avg?: LoteAvgAggregateInputType;
    _sum?: LoteSumAggregateInputType;
    _min?: LoteMinAggregateInputType;
    _max?: LoteMaxAggregateInputType;
};
export type LoteGroupByOutputType = {
    id: number;
    nombre: string;
    hectareas: number;
    campoId: number;
    createdAt: Date;
    updatedAt: Date;
    _count: LoteCountAggregateOutputType | null;
    _avg: LoteAvgAggregateOutputType | null;
    _sum: LoteSumAggregateOutputType | null;
    _min: LoteMinAggregateOutputType | null;
    _max: LoteMaxAggregateOutputType | null;
};
export type GetLoteGroupByPayload<T extends LoteGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<LoteGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof LoteGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], LoteGroupByOutputType[P]> : Prisma.GetScalarType<T[P], LoteGroupByOutputType[P]>;
}>>;
export type LoteWhereInput = {
    AND?: Prisma.LoteWhereInput | Prisma.LoteWhereInput[];
    OR?: Prisma.LoteWhereInput[];
    NOT?: Prisma.LoteWhereInput | Prisma.LoteWhereInput[];
    id?: Prisma.IntFilter<"Lote"> | number;
    nombre?: Prisma.StringFilter<"Lote"> | string;
    hectareas?: Prisma.FloatFilter<"Lote"> | number;
    campoId?: Prisma.IntFilter<"Lote"> | number;
    createdAt?: Prisma.DateTimeFilter<"Lote"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Lote"> | Date | string;
    campo?: Prisma.XOR<Prisma.CampoScalarRelationFilter, Prisma.CampoWhereInput>;
    siembras?: Prisma.SiembraListRelationFilter;
};
export type LoteOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    nombre?: Prisma.SortOrder;
    hectareas?: Prisma.SortOrder;
    campoId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    campo?: Prisma.CampoOrderByWithRelationInput;
    siembras?: Prisma.SiembraOrderByRelationAggregateInput;
};
export type LoteWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    AND?: Prisma.LoteWhereInput | Prisma.LoteWhereInput[];
    OR?: Prisma.LoteWhereInput[];
    NOT?: Prisma.LoteWhereInput | Prisma.LoteWhereInput[];
    nombre?: Prisma.StringFilter<"Lote"> | string;
    hectareas?: Prisma.FloatFilter<"Lote"> | number;
    campoId?: Prisma.IntFilter<"Lote"> | number;
    createdAt?: Prisma.DateTimeFilter<"Lote"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Lote"> | Date | string;
    campo?: Prisma.XOR<Prisma.CampoScalarRelationFilter, Prisma.CampoWhereInput>;
    siembras?: Prisma.SiembraListRelationFilter;
}, "id">;
export type LoteOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    nombre?: Prisma.SortOrder;
    hectareas?: Prisma.SortOrder;
    campoId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.LoteCountOrderByAggregateInput;
    _avg?: Prisma.LoteAvgOrderByAggregateInput;
    _max?: Prisma.LoteMaxOrderByAggregateInput;
    _min?: Prisma.LoteMinOrderByAggregateInput;
    _sum?: Prisma.LoteSumOrderByAggregateInput;
};
export type LoteScalarWhereWithAggregatesInput = {
    AND?: Prisma.LoteScalarWhereWithAggregatesInput | Prisma.LoteScalarWhereWithAggregatesInput[];
    OR?: Prisma.LoteScalarWhereWithAggregatesInput[];
    NOT?: Prisma.LoteScalarWhereWithAggregatesInput | Prisma.LoteScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"Lote"> | number;
    nombre?: Prisma.StringWithAggregatesFilter<"Lote"> | string;
    hectareas?: Prisma.FloatWithAggregatesFilter<"Lote"> | number;
    campoId?: Prisma.IntWithAggregatesFilter<"Lote"> | number;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Lote"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Lote"> | Date | string;
};
export type LoteCreateInput = {
    nombre: string;
    hectareas: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    campo: Prisma.CampoCreateNestedOneWithoutLotesInput;
    siembras?: Prisma.SiembraCreateNestedManyWithoutLoteInput;
};
export type LoteUncheckedCreateInput = {
    id?: number;
    nombre: string;
    hectareas: number;
    campoId: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    siembras?: Prisma.SiembraUncheckedCreateNestedManyWithoutLoteInput;
};
export type LoteUpdateInput = {
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    hectareas?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    campo?: Prisma.CampoUpdateOneRequiredWithoutLotesNestedInput;
    siembras?: Prisma.SiembraUpdateManyWithoutLoteNestedInput;
};
export type LoteUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    hectareas?: Prisma.FloatFieldUpdateOperationsInput | number;
    campoId?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    siembras?: Prisma.SiembraUncheckedUpdateManyWithoutLoteNestedInput;
};
export type LoteCreateManyInput = {
    id?: number;
    nombre: string;
    hectareas: number;
    campoId: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type LoteUpdateManyMutationInput = {
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    hectareas?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type LoteUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    hectareas?: Prisma.FloatFieldUpdateOperationsInput | number;
    campoId?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type LoteListRelationFilter = {
    every?: Prisma.LoteWhereInput;
    some?: Prisma.LoteWhereInput;
    none?: Prisma.LoteWhereInput;
};
export type LoteOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type LoteCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    nombre?: Prisma.SortOrder;
    hectareas?: Prisma.SortOrder;
    campoId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type LoteAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    hectareas?: Prisma.SortOrder;
    campoId?: Prisma.SortOrder;
};
export type LoteMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    nombre?: Prisma.SortOrder;
    hectareas?: Prisma.SortOrder;
    campoId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type LoteMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    nombre?: Prisma.SortOrder;
    hectareas?: Prisma.SortOrder;
    campoId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type LoteSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    hectareas?: Prisma.SortOrder;
    campoId?: Prisma.SortOrder;
};
export type LoteScalarRelationFilter = {
    is?: Prisma.LoteWhereInput;
    isNot?: Prisma.LoteWhereInput;
};
export type LoteCreateNestedManyWithoutCampoInput = {
    create?: Prisma.XOR<Prisma.LoteCreateWithoutCampoInput, Prisma.LoteUncheckedCreateWithoutCampoInput> | Prisma.LoteCreateWithoutCampoInput[] | Prisma.LoteUncheckedCreateWithoutCampoInput[];
    connectOrCreate?: Prisma.LoteCreateOrConnectWithoutCampoInput | Prisma.LoteCreateOrConnectWithoutCampoInput[];
    createMany?: Prisma.LoteCreateManyCampoInputEnvelope;
    connect?: Prisma.LoteWhereUniqueInput | Prisma.LoteWhereUniqueInput[];
};
export type LoteUncheckedCreateNestedManyWithoutCampoInput = {
    create?: Prisma.XOR<Prisma.LoteCreateWithoutCampoInput, Prisma.LoteUncheckedCreateWithoutCampoInput> | Prisma.LoteCreateWithoutCampoInput[] | Prisma.LoteUncheckedCreateWithoutCampoInput[];
    connectOrCreate?: Prisma.LoteCreateOrConnectWithoutCampoInput | Prisma.LoteCreateOrConnectWithoutCampoInput[];
    createMany?: Prisma.LoteCreateManyCampoInputEnvelope;
    connect?: Prisma.LoteWhereUniqueInput | Prisma.LoteWhereUniqueInput[];
};
export type LoteUpdateManyWithoutCampoNestedInput = {
    create?: Prisma.XOR<Prisma.LoteCreateWithoutCampoInput, Prisma.LoteUncheckedCreateWithoutCampoInput> | Prisma.LoteCreateWithoutCampoInput[] | Prisma.LoteUncheckedCreateWithoutCampoInput[];
    connectOrCreate?: Prisma.LoteCreateOrConnectWithoutCampoInput | Prisma.LoteCreateOrConnectWithoutCampoInput[];
    upsert?: Prisma.LoteUpsertWithWhereUniqueWithoutCampoInput | Prisma.LoteUpsertWithWhereUniqueWithoutCampoInput[];
    createMany?: Prisma.LoteCreateManyCampoInputEnvelope;
    set?: Prisma.LoteWhereUniqueInput | Prisma.LoteWhereUniqueInput[];
    disconnect?: Prisma.LoteWhereUniqueInput | Prisma.LoteWhereUniqueInput[];
    delete?: Prisma.LoteWhereUniqueInput | Prisma.LoteWhereUniqueInput[];
    connect?: Prisma.LoteWhereUniqueInput | Prisma.LoteWhereUniqueInput[];
    update?: Prisma.LoteUpdateWithWhereUniqueWithoutCampoInput | Prisma.LoteUpdateWithWhereUniqueWithoutCampoInput[];
    updateMany?: Prisma.LoteUpdateManyWithWhereWithoutCampoInput | Prisma.LoteUpdateManyWithWhereWithoutCampoInput[];
    deleteMany?: Prisma.LoteScalarWhereInput | Prisma.LoteScalarWhereInput[];
};
export type LoteUncheckedUpdateManyWithoutCampoNestedInput = {
    create?: Prisma.XOR<Prisma.LoteCreateWithoutCampoInput, Prisma.LoteUncheckedCreateWithoutCampoInput> | Prisma.LoteCreateWithoutCampoInput[] | Prisma.LoteUncheckedCreateWithoutCampoInput[];
    connectOrCreate?: Prisma.LoteCreateOrConnectWithoutCampoInput | Prisma.LoteCreateOrConnectWithoutCampoInput[];
    upsert?: Prisma.LoteUpsertWithWhereUniqueWithoutCampoInput | Prisma.LoteUpsertWithWhereUniqueWithoutCampoInput[];
    createMany?: Prisma.LoteCreateManyCampoInputEnvelope;
    set?: Prisma.LoteWhereUniqueInput | Prisma.LoteWhereUniqueInput[];
    disconnect?: Prisma.LoteWhereUniqueInput | Prisma.LoteWhereUniqueInput[];
    delete?: Prisma.LoteWhereUniqueInput | Prisma.LoteWhereUniqueInput[];
    connect?: Prisma.LoteWhereUniqueInput | Prisma.LoteWhereUniqueInput[];
    update?: Prisma.LoteUpdateWithWhereUniqueWithoutCampoInput | Prisma.LoteUpdateWithWhereUniqueWithoutCampoInput[];
    updateMany?: Prisma.LoteUpdateManyWithWhereWithoutCampoInput | Prisma.LoteUpdateManyWithWhereWithoutCampoInput[];
    deleteMany?: Prisma.LoteScalarWhereInput | Prisma.LoteScalarWhereInput[];
};
export type LoteCreateNestedOneWithoutSiembrasInput = {
    create?: Prisma.XOR<Prisma.LoteCreateWithoutSiembrasInput, Prisma.LoteUncheckedCreateWithoutSiembrasInput>;
    connectOrCreate?: Prisma.LoteCreateOrConnectWithoutSiembrasInput;
    connect?: Prisma.LoteWhereUniqueInput;
};
export type LoteUpdateOneRequiredWithoutSiembrasNestedInput = {
    create?: Prisma.XOR<Prisma.LoteCreateWithoutSiembrasInput, Prisma.LoteUncheckedCreateWithoutSiembrasInput>;
    connectOrCreate?: Prisma.LoteCreateOrConnectWithoutSiembrasInput;
    upsert?: Prisma.LoteUpsertWithoutSiembrasInput;
    connect?: Prisma.LoteWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.LoteUpdateToOneWithWhereWithoutSiembrasInput, Prisma.LoteUpdateWithoutSiembrasInput>, Prisma.LoteUncheckedUpdateWithoutSiembrasInput>;
};
export type LoteCreateWithoutCampoInput = {
    nombre: string;
    hectareas: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    siembras?: Prisma.SiembraCreateNestedManyWithoutLoteInput;
};
export type LoteUncheckedCreateWithoutCampoInput = {
    id?: number;
    nombre: string;
    hectareas: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    siembras?: Prisma.SiembraUncheckedCreateNestedManyWithoutLoteInput;
};
export type LoteCreateOrConnectWithoutCampoInput = {
    where: Prisma.LoteWhereUniqueInput;
    create: Prisma.XOR<Prisma.LoteCreateWithoutCampoInput, Prisma.LoteUncheckedCreateWithoutCampoInput>;
};
export type LoteCreateManyCampoInputEnvelope = {
    data: Prisma.LoteCreateManyCampoInput | Prisma.LoteCreateManyCampoInput[];
    skipDuplicates?: boolean;
};
export type LoteUpsertWithWhereUniqueWithoutCampoInput = {
    where: Prisma.LoteWhereUniqueInput;
    update: Prisma.XOR<Prisma.LoteUpdateWithoutCampoInput, Prisma.LoteUncheckedUpdateWithoutCampoInput>;
    create: Prisma.XOR<Prisma.LoteCreateWithoutCampoInput, Prisma.LoteUncheckedCreateWithoutCampoInput>;
};
export type LoteUpdateWithWhereUniqueWithoutCampoInput = {
    where: Prisma.LoteWhereUniqueInput;
    data: Prisma.XOR<Prisma.LoteUpdateWithoutCampoInput, Prisma.LoteUncheckedUpdateWithoutCampoInput>;
};
export type LoteUpdateManyWithWhereWithoutCampoInput = {
    where: Prisma.LoteScalarWhereInput;
    data: Prisma.XOR<Prisma.LoteUpdateManyMutationInput, Prisma.LoteUncheckedUpdateManyWithoutCampoInput>;
};
export type LoteScalarWhereInput = {
    AND?: Prisma.LoteScalarWhereInput | Prisma.LoteScalarWhereInput[];
    OR?: Prisma.LoteScalarWhereInput[];
    NOT?: Prisma.LoteScalarWhereInput | Prisma.LoteScalarWhereInput[];
    id?: Prisma.IntFilter<"Lote"> | number;
    nombre?: Prisma.StringFilter<"Lote"> | string;
    hectareas?: Prisma.FloatFilter<"Lote"> | number;
    campoId?: Prisma.IntFilter<"Lote"> | number;
    createdAt?: Prisma.DateTimeFilter<"Lote"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Lote"> | Date | string;
};
export type LoteCreateWithoutSiembrasInput = {
    nombre: string;
    hectareas: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    campo: Prisma.CampoCreateNestedOneWithoutLotesInput;
};
export type LoteUncheckedCreateWithoutSiembrasInput = {
    id?: number;
    nombre: string;
    hectareas: number;
    campoId: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type LoteCreateOrConnectWithoutSiembrasInput = {
    where: Prisma.LoteWhereUniqueInput;
    create: Prisma.XOR<Prisma.LoteCreateWithoutSiembrasInput, Prisma.LoteUncheckedCreateWithoutSiembrasInput>;
};
export type LoteUpsertWithoutSiembrasInput = {
    update: Prisma.XOR<Prisma.LoteUpdateWithoutSiembrasInput, Prisma.LoteUncheckedUpdateWithoutSiembrasInput>;
    create: Prisma.XOR<Prisma.LoteCreateWithoutSiembrasInput, Prisma.LoteUncheckedCreateWithoutSiembrasInput>;
    where?: Prisma.LoteWhereInput;
};
export type LoteUpdateToOneWithWhereWithoutSiembrasInput = {
    where?: Prisma.LoteWhereInput;
    data: Prisma.XOR<Prisma.LoteUpdateWithoutSiembrasInput, Prisma.LoteUncheckedUpdateWithoutSiembrasInput>;
};
export type LoteUpdateWithoutSiembrasInput = {
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    hectareas?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    campo?: Prisma.CampoUpdateOneRequiredWithoutLotesNestedInput;
};
export type LoteUncheckedUpdateWithoutSiembrasInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    hectareas?: Prisma.FloatFieldUpdateOperationsInput | number;
    campoId?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type LoteCreateManyCampoInput = {
    id?: number;
    nombre: string;
    hectareas: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type LoteUpdateWithoutCampoInput = {
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    hectareas?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    siembras?: Prisma.SiembraUpdateManyWithoutLoteNestedInput;
};
export type LoteUncheckedUpdateWithoutCampoInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    hectareas?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    siembras?: Prisma.SiembraUncheckedUpdateManyWithoutLoteNestedInput;
};
export type LoteUncheckedUpdateManyWithoutCampoInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    hectareas?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type LoteCountOutputType = {
    siembras: number;
};
export type LoteCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    siembras?: boolean | LoteCountOutputTypeCountSiembrasArgs;
};
export type LoteCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LoteCountOutputTypeSelect<ExtArgs> | null;
};
export type LoteCountOutputTypeCountSiembrasArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SiembraWhereInput;
};
export type LoteSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    nombre?: boolean;
    hectareas?: boolean;
    campoId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    campo?: boolean | Prisma.CampoDefaultArgs<ExtArgs>;
    siembras?: boolean | Prisma.Lote$siembrasArgs<ExtArgs>;
    _count?: boolean | Prisma.LoteCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["lote"]>;
export type LoteSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    nombre?: boolean;
    hectareas?: boolean;
    campoId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    campo?: boolean | Prisma.CampoDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["lote"]>;
export type LoteSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    nombre?: boolean;
    hectareas?: boolean;
    campoId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    campo?: boolean | Prisma.CampoDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["lote"]>;
export type LoteSelectScalar = {
    id?: boolean;
    nombre?: boolean;
    hectareas?: boolean;
    campoId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type LoteOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "nombre" | "hectareas" | "campoId" | "createdAt" | "updatedAt", ExtArgs["result"]["lote"]>;
export type LoteInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    campo?: boolean | Prisma.CampoDefaultArgs<ExtArgs>;
    siembras?: boolean | Prisma.Lote$siembrasArgs<ExtArgs>;
    _count?: boolean | Prisma.LoteCountOutputTypeDefaultArgs<ExtArgs>;
};
export type LoteIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    campo?: boolean | Prisma.CampoDefaultArgs<ExtArgs>;
};
export type LoteIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    campo?: boolean | Prisma.CampoDefaultArgs<ExtArgs>;
};
export type $LotePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Lote";
    objects: {
        campo: Prisma.$CampoPayload<ExtArgs>;
        siembras: Prisma.$SiembraPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        nombre: string;
        hectareas: number;
        campoId: number;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["lote"]>;
    composites: {};
};
export type LoteGetPayload<S extends boolean | null | undefined | LoteDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$LotePayload, S>;
export type LoteCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<LoteFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: LoteCountAggregateInputType | true;
};
export interface LoteDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Lote'];
        meta: {
            name: 'Lote';
        };
    };
    findUnique<T extends LoteFindUniqueArgs>(args: Prisma.SelectSubset<T, LoteFindUniqueArgs<ExtArgs>>): Prisma.Prisma__LoteClient<runtime.Types.Result.GetResult<Prisma.$LotePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends LoteFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, LoteFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__LoteClient<runtime.Types.Result.GetResult<Prisma.$LotePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends LoteFindFirstArgs>(args?: Prisma.SelectSubset<T, LoteFindFirstArgs<ExtArgs>>): Prisma.Prisma__LoteClient<runtime.Types.Result.GetResult<Prisma.$LotePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends LoteFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, LoteFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__LoteClient<runtime.Types.Result.GetResult<Prisma.$LotePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends LoteFindManyArgs>(args?: Prisma.SelectSubset<T, LoteFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$LotePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends LoteCreateArgs>(args: Prisma.SelectSubset<T, LoteCreateArgs<ExtArgs>>): Prisma.Prisma__LoteClient<runtime.Types.Result.GetResult<Prisma.$LotePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends LoteCreateManyArgs>(args?: Prisma.SelectSubset<T, LoteCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends LoteCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, LoteCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$LotePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends LoteDeleteArgs>(args: Prisma.SelectSubset<T, LoteDeleteArgs<ExtArgs>>): Prisma.Prisma__LoteClient<runtime.Types.Result.GetResult<Prisma.$LotePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends LoteUpdateArgs>(args: Prisma.SelectSubset<T, LoteUpdateArgs<ExtArgs>>): Prisma.Prisma__LoteClient<runtime.Types.Result.GetResult<Prisma.$LotePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends LoteDeleteManyArgs>(args?: Prisma.SelectSubset<T, LoteDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends LoteUpdateManyArgs>(args: Prisma.SelectSubset<T, LoteUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends LoteUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, LoteUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$LotePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends LoteUpsertArgs>(args: Prisma.SelectSubset<T, LoteUpsertArgs<ExtArgs>>): Prisma.Prisma__LoteClient<runtime.Types.Result.GetResult<Prisma.$LotePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends LoteCountArgs>(args?: Prisma.Subset<T, LoteCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], LoteCountAggregateOutputType> : number>;
    aggregate<T extends LoteAggregateArgs>(args: Prisma.Subset<T, LoteAggregateArgs>): Prisma.PrismaPromise<GetLoteAggregateType<T>>;
    groupBy<T extends LoteGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: LoteGroupByArgs['orderBy'];
    } : {
        orderBy?: LoteGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, LoteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLoteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: LoteFieldRefs;
}
export interface Prisma__LoteClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    campo<T extends Prisma.CampoDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.CampoDefaultArgs<ExtArgs>>): Prisma.Prisma__CampoClient<runtime.Types.Result.GetResult<Prisma.$CampoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    siembras<T extends Prisma.Lote$siembrasArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Lote$siembrasArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SiembraPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface LoteFieldRefs {
    readonly id: Prisma.FieldRef<"Lote", 'Int'>;
    readonly nombre: Prisma.FieldRef<"Lote", 'String'>;
    readonly hectareas: Prisma.FieldRef<"Lote", 'Float'>;
    readonly campoId: Prisma.FieldRef<"Lote", 'Int'>;
    readonly createdAt: Prisma.FieldRef<"Lote", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Lote", 'DateTime'>;
}
export type LoteFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LoteSelect<ExtArgs> | null;
    omit?: Prisma.LoteOmit<ExtArgs> | null;
    include?: Prisma.LoteInclude<ExtArgs> | null;
    where: Prisma.LoteWhereUniqueInput;
};
export type LoteFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LoteSelect<ExtArgs> | null;
    omit?: Prisma.LoteOmit<ExtArgs> | null;
    include?: Prisma.LoteInclude<ExtArgs> | null;
    where: Prisma.LoteWhereUniqueInput;
};
export type LoteFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type LoteFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type LoteFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type LoteCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LoteSelect<ExtArgs> | null;
    omit?: Prisma.LoteOmit<ExtArgs> | null;
    include?: Prisma.LoteInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.LoteCreateInput, Prisma.LoteUncheckedCreateInput>;
};
export type LoteCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.LoteCreateManyInput | Prisma.LoteCreateManyInput[];
    skipDuplicates?: boolean;
};
export type LoteCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LoteSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.LoteOmit<ExtArgs> | null;
    data: Prisma.LoteCreateManyInput | Prisma.LoteCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.LoteIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type LoteUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LoteSelect<ExtArgs> | null;
    omit?: Prisma.LoteOmit<ExtArgs> | null;
    include?: Prisma.LoteInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.LoteUpdateInput, Prisma.LoteUncheckedUpdateInput>;
    where: Prisma.LoteWhereUniqueInput;
};
export type LoteUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.LoteUpdateManyMutationInput, Prisma.LoteUncheckedUpdateManyInput>;
    where?: Prisma.LoteWhereInput;
    limit?: number;
};
export type LoteUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LoteSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.LoteOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.LoteUpdateManyMutationInput, Prisma.LoteUncheckedUpdateManyInput>;
    where?: Prisma.LoteWhereInput;
    limit?: number;
    include?: Prisma.LoteIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type LoteUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LoteSelect<ExtArgs> | null;
    omit?: Prisma.LoteOmit<ExtArgs> | null;
    include?: Prisma.LoteInclude<ExtArgs> | null;
    where: Prisma.LoteWhereUniqueInput;
    create: Prisma.XOR<Prisma.LoteCreateInput, Prisma.LoteUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.LoteUpdateInput, Prisma.LoteUncheckedUpdateInput>;
};
export type LoteDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LoteSelect<ExtArgs> | null;
    omit?: Prisma.LoteOmit<ExtArgs> | null;
    include?: Prisma.LoteInclude<ExtArgs> | null;
    where: Prisma.LoteWhereUniqueInput;
};
export type LoteDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.LoteWhereInput;
    limit?: number;
};
export type Lote$siembrasArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type LoteDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LoteSelect<ExtArgs> | null;
    omit?: Prisma.LoteOmit<ExtArgs> | null;
    include?: Prisma.LoteInclude<ExtArgs> | null;
};
