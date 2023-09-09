import { NextFunction, Request, Response } from 'express';

export const clsMiddleware = (namespace: any) => {
  if (!namespace) throw new Error('CLS namespace required');

  return (req: Request, res: Response, next: NextFunction) => {
    namespace.bindEmitter(req);
    namespace.bindEmitter(res);

    namespace.run(() => {
      next();
    });
  };
};
