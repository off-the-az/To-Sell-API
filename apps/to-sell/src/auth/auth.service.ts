import { Injectable, NotAcceptableException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { SmtpService } from "../smtp/smtp.service";

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private readonly maillerService: SmtpService,
  ) {}

  async verify(mail: string): Promise<any> {
    const user = await this.userService.getUserByMail(mail);
    if (!user) throw new NotAcceptableException('could not find user');
    user.isVerified = true;
    await this.userService.updateUser(user, mail);
    return 'Mail is verified!';
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
  async register(userDTO: CreateUserDto): Promise<any> {
    userDTO.password = await bcrypt.hash(userDTO.password, 10);
    await this.maillerService.sendVarificationMail(userDTO.mail, 'Підтвердження Аккаунту на платформі To Sell');
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
