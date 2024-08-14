import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async getUserById(id: number): Promise<User> {
    const user: User = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.userRole', 'usersRole.id')
      .where('user.ID = :id', { id })
      .getOne();
    return user;
  }
  async getUserByToken(token: string) {
    return await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.userRole', 'usersRole.id')
      .where('user.token = :token', { token })
      .getOne();
  }
  async getUserByMail(mail: string) {
    return await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.userRole', 'usersRole.id')
      .where('user.mail = :mail', { mail })
      .getOne();
  }
  async getUsers(request: Request) {
    // const token = await this.extractTokenFromHeader(request);
    // if (token) {
    //   const user = await this.getUserByToken(token);
    //   if (user.userRole['id'] === 3) {

    //     console.log(allUsers);
    //
    //   }
    // }
    const allUsers = await this.userRepository.find();
    return await allUsers;
  }
  async addUser(userDTO: CreateUserDto) {
    try {
      const newUser = this.userRepository.create({
        ...userDTO,
      });
      throw await this.userRepository.save(newUser);
    } catch (exception) {
      return exception;
    }
  }
  async updateUser(user: User, mail: string) {
    try {
      await this.userRepository.update({ mail: mail }, user);
      throw 'User updated';
    } catch (exception) {
      return exception;
    }
  }
  async deleteUser(request: Request) {
    try {
      const token = await this.extractTokenFromHeader(request);
      if (token) {
        await this.userRepository.delete({ token: token });
        throw 'User deleted';
      } else throw 'Token required';
    } catch (exception) {
      return exception;
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers['authorization']?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
