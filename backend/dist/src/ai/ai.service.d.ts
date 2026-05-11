import { PrismaService } from '../prisma/prisma.service';
import { ChatMessageDto } from './dto/ai.dto';
export declare class AiService {
    private prisma;
    constructor(prisma: PrismaService);
    chat(userId: number, history: ChatMessageDto[], message: string): Promise<string>;
    insights(userId: number): Promise<{
        tipo: string;
        titulo: string;
        texto: string;
    }[]>;
    private buildContext;
}
