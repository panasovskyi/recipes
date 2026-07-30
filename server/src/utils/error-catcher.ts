import { NextFunction, Request, Response } from "express";

interface AsyncController {
  (req: Request, res: Response, next: NextFunction): Promise<void> | void;
};

interface WrappedController {
  (req: Request, res: Response, next: NextFunction): Promise<void>;
}

export const errorCatcher = (action: AsyncController): WrappedController => {
  return async function (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      await action(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};