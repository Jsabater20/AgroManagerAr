import {
  ArrayMaxSize,
  IsArray,
  IsIn,
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class ChatMessageDto {
  @IsString()
  @IsIn(['user', 'model'])
  role!: 'user' | 'model';

  @IsString()
  @MaxLength(2000)
  text!: string;
}

export class AiChatDto {
  @IsArray()
  @ArrayMaxSize(8)
  @ValidateNested({ each: true })
  @Type(() => ChatMessageDto)
  history!: ChatMessageDto[];

  @IsString()
  @MaxLength(1000)
  message!: string;
}

export class AiInsightsDto {
  @IsOptional()
  @IsString()
  extra?: string;
}
