import { PrismaService } from '../prisma/prisma.service';
export declare class PlanService {
    private prisma;
    private frontendUrl;
    private mpPlanId;
    private getMPClient;
    constructor(prisma: PrismaService);
    getLimitesFree(): {
        campos: number;
        lotesPerCampo: number;
        animales: number;
        siembras: number;
    };
    getUsuarioPlan(usuarioId: number): Promise<{
        plan: import(".prisma/client").$Enums.PlanTipo;
        planExpira: Date | null;
        mpSuscripcionId: string | null;
    } | null>;
    isPro(usuarioId: number): Promise<boolean>;
    checkCamposLimit(usuarioId: number): Promise<void>;
    checkLotesLimit(campoId: number, usuarioId: number): Promise<void>;
    checkAnimalesLimit(usuarioId: number): Promise<void>;
    checkSiembrasLimit(usuarioId: number): Promise<void>;
    crearPlanMP(): Promise<{
        id: string | undefined;
        status: string | undefined;
    }>;
    crearCheckout(usuarioId: number, email: string): Promise<{
        init_point: string | undefined;
        id: string | undefined;
    }>;
    procesarWebhook(body: Record<string, unknown>): Promise<{
        ok: boolean;
    }>;
    cancelarSuscripcion(usuarioId: number): Promise<{
        ok: boolean;
    }>;
}
