import { Controller, Delete, Get, Headers, Req, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "./entities/user.entity";
import { AuthGuard } from "../auth/guards/auth.guard";
import { Roles } from "../users-role/decorators/users-role.decorator";
import { Role } from "../users-role/constants/users-role.enum";

@Controller('/api/user')
export class UserController {
  constructor(private readonly userSevice: UserService) {}

  @Roles(Role.Admin)
  @UseGuards(AuthGuard)
  @Get('all')
  getUsers(@Req() req: Request) {
    return this.userSevice.getUsers(req);
  }

  @Get('byId/:id')
  async getUserById(@Req() req): Promise<User> {
    return await this.userSevice.getUserById(req.params.id);
  }

  @Get('byToken')
  getUserByToken(@Headers() headers) {
    return this.userSevice.getUserByToken(headers.token);
  }
  @UseGuards(AuthGuard)
  @Delete()
  deleteUser(@Req() request: Request) {
    return this.userSevice.deleteUser(request);
  }
}
