import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRole } from './entities/users-role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersRoleService {
  constructor(
    @InjectRepository(UsersRole) private rolesRepository: Repository<UsersRole>,
  ) {}

  async findAll() {
    return await this.rolesRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} usersRole`;
  }

  remove(id: number) {
    return `This action removes a #${id} usersRole`;
  }
}
