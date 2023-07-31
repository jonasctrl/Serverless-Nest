export interface Context {
  id: number;
  email: string;
  role: string;
}

export interface JwtPayload extends Context {
  exp?: number;
  iat?: number;
}
