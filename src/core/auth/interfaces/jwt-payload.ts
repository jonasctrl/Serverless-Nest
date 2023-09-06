import { Context } from './context';

export interface JwtPayload extends Context {
  exp?: number;
  iat?: number;
}
