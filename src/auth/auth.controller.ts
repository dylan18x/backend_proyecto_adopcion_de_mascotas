import { Controller, Post, Body, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserRole } from '../users/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() body: any) {
    const { username, password, role } = body;

    if (role && !Object.values(UserRole).includes(role)) {
      throw new BadRequestException(`El rol ${role} no es válido`);
    }

    return this.authService.register(username, password, role);
  }

  @Post('login')
  async login(@Body() body: any) {
    const { username, password } = body;

    const user = await this.authService.validateUser(username, password);
    
    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    return this.authService.login(user);
  }
}