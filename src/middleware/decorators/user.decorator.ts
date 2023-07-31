import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentContext = createParamDecorator((_data, ctx: ExecutionContext): any => {
  const request = ctx.switchToHttp().getRequest();

  return request.user;
});
