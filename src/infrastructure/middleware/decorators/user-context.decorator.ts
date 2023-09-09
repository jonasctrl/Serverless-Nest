import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { UserContext } from 'core/auth/context/user.context';
import { UserRequestContext } from 'core/auth/interfaces';

export const CurrentContext = createParamDecorator(
  (_, ctx: ExecutionContext): UserRequestContext => {
    const request = ctx.switchToHttp().getRequest();
    const userContext: UserRequestContext = request.user;

    UserContext.setUserId(userContext.id);

    return userContext;
  },
);
