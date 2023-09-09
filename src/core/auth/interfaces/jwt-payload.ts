import { UserRequestContext } from './user-request-context';

export interface JwtPayload extends UserRequestContext {
  exp?: number;
  iat?: number;
}
