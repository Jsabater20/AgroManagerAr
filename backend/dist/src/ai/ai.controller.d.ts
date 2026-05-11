import { AiService } from './ai.service';
import { AiChatDto } from './dto/ai.dto';
import type { Request } from 'express';
interface AuthRequest extends Request {
    user: {
        userId: number;
    };
}
export declare class AiController {
    private readonly aiService;
    constructor(aiService: AiService);
    chat(req: AuthRequest, dto: AiChatDto): Promise<{
        text: string;
    }>;
    insights(req: AuthRequest): Promise<{
        insights: {
            tipo: string;
            titulo: string;
            texto: string;
        }[];
    }>;
}
export {};
