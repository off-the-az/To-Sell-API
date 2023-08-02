import {
  Controller,
  Delete,
  Get,
  Headers,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('/api/user')
export class UserController {
  constructor(private readonly userSevice: UserService) {}

  @Get('all')
  @UseGuards(AuthGuard)
  getUsers(@Req() req: Request) {
    return this.userSevice.getUsers(req);
  }

  @Get('byId/:id')
  async getUserById(@Req() req): Promise<User> {
    return await this.userSevice.getUserById(req.params.id);
  }

  @Get('byToken')
  getUserByToken(@Headers() headers) {
    const user = this.userSevice.getUserByToken(headers.token);
    return user;
  }
  @UseGuards(AuthGuard)
  @Delete()
  deleteUser(@Req() request: Request) {
    return this.userSevice.deleteUser(request);
  }
}
