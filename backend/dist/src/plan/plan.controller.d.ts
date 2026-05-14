import { PlanService } from './plan.service';
interface AuthRequest {
    user: {
        id: number;
        email: string;
        nombre: string;
        rol: string;
    };
}
export declare class PlanController {
    private planService;
    constructor(planService: PlanService);
    getPlan(req: AuthRequest): Promise<{
        plan: import(".prisma/client").$Enums.PlanTipo;
        planExpira: Date | null;
        mpSuscripcionId: string | null;
    } | null>;
    checkout(req: AuthRequest): Promise<{
        init_point: string | undefined;
        id: string | undefined;
    }>;
    cancelar(req: AuthRequest): Promise<{
        ok: boolean;
    }>;
    webhook(body: Record<string, unknown>): Promise<{
        ok: boolean;
    }>;
    setup(): Promise<{
        id: string | undefined;
        status: string | undefined;
    }>;
}
export {};
