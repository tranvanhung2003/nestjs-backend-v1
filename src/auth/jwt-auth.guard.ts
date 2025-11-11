import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { IS_PUBLIC_KEY } from 'src/decorator/customize';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    return super.canActivate(context);
  }

  handleRequest(err, user, info, context: ExecutionContext) {
    const req: Request = context.switchToHttp().getRequest();

    // you can throw an exception based on either "err" or "info" arguments
    if (err || !user) {
      throw (
        err ||
        new UnauthorizedException(
          'Token không hợp lệ hoặc không có token ở Bearer Token ở header request!',
        )
      );
    }

    // check permissions
    const targetMethod = req.method;
    const targetEndpoint = req.route?.path as string;

    const permissions = user?.permissions ?? [];
    let isExist = permissions.some(
      (permission) =>
        targetMethod === permission.method &&
        targetEndpoint === permission.apiPath,
    );

    if (targetEndpoint.startsWith('/api/v1/auth')) {
      isExist = true;
    }

    if (!isExist) {
      throw new ForbiddenException(
        'Bạn không có quyền để truy cập endpoint này!',
      );
    }

    return user;
  }
}
