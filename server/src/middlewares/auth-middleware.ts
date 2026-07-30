import { ApiError } from "@/exceptions";
import { tokenService } from "@/services";
import { NextFunction, Request, Response } from "express";

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    login: string;
  };
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
      throw ApiError.unauthorized("Користувач неавторизований");
    }

    const accessToken = authorizationHeader.split(" ")[1];

    if (!accessToken) {
      throw ApiError.unauthorized("Користувач неавторизований");
    }

    const userData = tokenService.validateAccessToken(accessToken);

    if (!userData) {
      return next(ApiError.unauthorized("Невалідний або прострочений токен"));
    }

    req.user = userData;

    next();
  } catch {
    next(ApiError.unauthorized("Користувач неавторизований"));
  }
};
