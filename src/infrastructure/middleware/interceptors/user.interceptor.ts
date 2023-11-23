import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';

import { UserContext } from 'core/auth/context/user.context';
import { UserRequestContext } from 'core/auth/interfaces';

@Injectable()
export class UserContextInterceptor implements NestInterceptor {
  intercept(ctx: ExecutionContext, next: CallHandler<any>) {
    const request = ctx.switchToHttp().getRequest();
    const userContext: UserRequestContext | undefined = request.user;

    UserContext.setUserId(userContext?.id || -1);

    return next.handle();
  }
}
