import { Role } from 'src/users-role/constants/users-role.enum';

export class CreateUserDto {
  name: string;
  mail: string;
  password: string;
  userRole: Role[];
}
