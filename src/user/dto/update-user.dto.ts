import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateSellerDto extends PartialType(CreateUserDto) {
  avatar: string;
  tgChatId: string;
  isVerified: boolean;
}
