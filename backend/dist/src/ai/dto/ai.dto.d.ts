export declare class ChatMessageDto {
    role: 'user' | 'model';
    text: string;
}
export declare class AiChatDto {
    history: ChatMessageDto[];
    message: string;
}
export declare class AiInsightsDto {
    extra?: string;
}
