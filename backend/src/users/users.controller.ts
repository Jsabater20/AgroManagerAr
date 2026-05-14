import {
  Controller,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  UseGuards,
  Request,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UsersService } from './users.service';
import {
  UpdateProfileDto,
  ChangePasswordDto,
  UpdateUserPlanDto,
  UpdateUserRolDto,
} from './dto/users.dto';

interface AuthRequest {
  user: { id: number; email: string; nombre: string; rol: string };
}

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  // ─── Perfil propio ────────────────────────────────────────────────────────

  @Get('profile')
  getProfile(@Request() req: AuthRequest) {
    return this.usersService.getProfile(req.user.id);
  }

  @Patch('profile')
  updateProfile(@Request() req: AuthRequest, @Body() dto: UpdateProfileDto) {
    return this.usersService.updateProfile(req.user.id, dto);
  }

  @Patch('profile/password')
  changePassword(@Request() req: AuthRequest, @Body() dto: ChangePasswordDto) {
    return this.usersService.changePassword(req.user.id, dto);
  }

  // ─── Admin ────────────────────────────────────────────────────────────────

  @Get('admin/all')
  getAllUsers(@Request() req: AuthRequest) {
    return this.usersService.getAllUsers(req.user.id);
  }

  @Patch('admin/:id/plan')
  updateUserPlan(
    @Request() req: AuthRequest,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateUserPlanDto,
  ) {
    return this.usersService.updateUserPlan(req.user.id, id, dto);
  }

  @Patch('admin/:id/rol')
  updateUserRol(
    @Request() req: AuthRequest,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateUserRolDto,
  ) {
    return this.usersService.updateUserRol(req.user.id, id, dto);
  }

  @Delete('admin/:id')
  deleteUser(
    @Request() req: AuthRequest,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.usersService.deleteUser(req.user.id, id);
  }
}
