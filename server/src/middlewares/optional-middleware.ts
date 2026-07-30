import { tokenService } from "@/services";
import { NextFunction, Response } from "express";
import type { AuthRequest } from "@/middlewares/auth-middleware";

export const optionalAuthMiddleware = (
  req: AuthRequest,
  _res: Response,
  next: NextFunction,
) => {
  const authorizationHeader = req.headers.authorization;
  const accessToken = authorizationHeader?.split(" ")[1];

  if (accessToken) {
    const userData = tokenService.validateAccessToken(accessToken);

    if (userData) {
      req.user = userData;
    }
  }

  next();
};
