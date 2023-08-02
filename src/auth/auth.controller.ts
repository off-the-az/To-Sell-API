import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './guards/auth.guard';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Controller('/api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signin')
  async signIn(
    @Body('mail') mail: string,
    @Body('password') password: string,
  ): Promise<any> {
    return await this.authService.signIn(mail, password);
  }

  @Post('register')
  async register(@Body() userDTO: CreateUserDto): Promise<any> {
    return await this.authService.register(userDTO);
  }

  @Get('profile')
  @UseGuards(AuthGuard)
  async getProfile(@Request() req): Promise<any> {
    return await this.authService.getProfile(req);
  }

  @Post('logout')
  async logout(@Request() req): Promise<any> {
    return await this.authService.logout(req);
  }

  @Get('verify/:mail')
  async verifyUser(@Request() req): Promise<any> {
    return await this.authService.verify(req.params.mail);
  }
}
