import { Controller, Get, Param, Delete } from '@nestjs/common';
import { UsersRoleService } from './users-role.service';

@Controller('users-role')
export class UsersRoleController {
  constructor(private readonly usersRoleService: UsersRoleService) {}

  @Get()
  findAll() {
    return this.usersRoleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersRoleService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersRoleService.remove(+id);
  }
}
