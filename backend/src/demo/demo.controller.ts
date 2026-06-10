import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { DemoService, DEMO_EMAIL } from './demo.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

type AuthRequest = Request & { user: { id: number; email: string } };

@Controller('demo')
export class DemoController {
  constructor(private readonly demoService: DemoService) {}

  /** POST /demo/reset — solo para demo account */
  @UseGuards(JwtAuthGuard)
  @Post('reset')
  async reset(@Request() req: AuthRequest) {
    if (req.user.email !== DEMO_EMAIL) {
      return { error: 'Solo la cuenta demo puede resetear' };
    }
    await this.demoService.resetDemoData();
    return { message: 'Demo reseteada correctamente' };
  }
}
