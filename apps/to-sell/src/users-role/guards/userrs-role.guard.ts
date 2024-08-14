import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/users-role.decorator';
import { Role } from '../constants/users-role.enum';
import { UserService } from '../../user/user.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const needAuth = requiredRoles.some((role) => role !== 4);
    if (needAuth) {
      const request = context.switchToHttp().getRequest();
      const token = this.extractTokenFromHeader(request);
      const exsistUser = await this.userService.getUserByToken(token);
      if (exsistUser)
        return requiredRoles.some(
          (role) => exsistUser?.userRole['id'] === role,
        );
      else return false;
    } else {
      return true;
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers['authorization']?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
