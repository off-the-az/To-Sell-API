import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Request,
  NotAcceptableException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './guards/auth.guard';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import { Role } from '../users-role/constants/users-role.enum';

@Controller('/api/auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('signin')
  async signIn(
    @Body('mail') mail: string,
    @Body('password') password: string,
  ): Promise<any> {
    return await this.authService.signIn(mail, password);
  }

  @Post('register')
  async register(@Body() userDTO: CreateUserDto): Promise<any> {
    if (userDTO.userRole[0] != Role.Admin)
      return await this.authService.register(userDTO);
    else
      return await new NotAcceptableException(
        'Cannot register user with role "Admin"!',
      ).message;
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
    const user = await this.userService.getUserByMail(
      req.params.mail as string,
    );
    if (!user)
      return new NotAcceptableException(
        'User not found. Invalid mail address!',
      );
    console.log(user);
    if (user.isVerified)
      return new NotAcceptableException('User was verified earlier!');
    return await this.authService.verify(req.params.mail);
  }
}
