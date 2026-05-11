import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class ChatMessageDto {
  @IsString()
  role!: 'user' | 'model';

  @IsString()
  text!: string;
}

export class AiChatDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ChatMessageDto)
  history!: ChatMessageDto[];

  @IsString()
  message!: string;
}

export class AiInsightsDto {
  @IsOptional()
  @IsString()
  extra?: string;
}
