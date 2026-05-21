import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { IsEmail, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { ValidationPipe as VP } from '@nestjs/common';

class ContactDto {
  @IsString() @MinLength(2) @MaxLength(100) nombre!: string;
  @IsEmail() @MaxLength(200) email!: string;
  @IsOptional() @IsString() @MaxLength(200) asunto?: string;
  @IsString() @MinLength(5) @MaxLength(2000) mensaje!: string;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('health')
  health(): { status: string } {
    return { status: 'ok' };
  }

  @Post('contact')
  @HttpCode(200)
  async contact(@Body(new VP({ whitelist: true })) dto: ContactDto): Promise<{ ok: boolean }> {
    await this.appService.sendContactEmail(dto.nombre, dto.email, dto.asunto ?? '', dto.mensaje);
    return { ok: true };
  }
}
