import { Injectable, NotAcceptableException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { MaillerService } from 'src/mailer/mailer.service';
import { Role } from 'src/users-role/constants/users-role.enum';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private readonly maillerService: MaillerService,
  ) {}

  async verify(mail: any): Promise<any> {
    const user = await this.userService.getUserByMail(mail);
    if (!user) throw new NotAcceptableException('could not find user');
    else {
      user.isVerified = true;
      await this.userService.updateUser(user, mail);
      return true;
    }
  }
  async signIn(mail: string, password: string): Promise<any> {
    const user = await this.userService.getUserByMail(mail);
    if (!user) return null;
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!user) throw new NotAcceptableException('could not find user');

    if (user && passwordValid) {
      const payload = { sub: user.id, username: user.mail };
      user.token = await this.jwtService.signAsync(payload);
      await this.userService.updateUser(user, mail);
      return {
        access_token: user.token,
      };
    }
    return null;
  }
  async register(userDTO: CreateUserDto): Promise<any>{
    userDTO.password = await bcrypt.hash(userDTO.password, 10);
    await this.maillerService.sendVarificationMail(userDTO.mail, userDTO.name);
    return await this.userService.addUser(userDTO);
  }

  async getProfile(request: Request): Promise<any> {
    const [type, token] = request.headers['authorization']?.split(' ') ?? [];
    return await this.userService.getUserByToken(token);
  }

  async logout(request: Request): Promise<any> {
    const [type, token] = request.headers['authorization']?.split(' ') ?? [];
    const user = await this.userService.getUserByToken(token);
    user.token = '';
    return user;
  }
}
