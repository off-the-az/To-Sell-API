import { Module } from '@nestjs/common';
import { UsersRoleService } from './users-role.service';
import { UsersRoleController } from './users-role.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRole } from './entities/users-role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UsersRole])],
  controllers: [UsersRoleController],
  providers: [UsersRoleService],
})
export class UsersRoleModule {}
