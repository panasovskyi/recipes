import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { prisma } from "@/prisma";

export interface TokenPayload {
  id: string;
  email: string;
  login: string;
}

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

if (!JWT_ACCESS_SECRET || !JWT_REFRESH_SECRET) {
  throw new Error(
    "JWT_ACCESS_SECRET та JWT_REFRESH_SECRET мають бути задані в .env — без них сервер не запускається.",
  );
}

export const tokenService = {
  async generate(payload: TokenPayload) {
    const accessToken = jwt.sign(payload, JWT_ACCESS_SECRET, {
      expiresIn: "15m",
    });

    const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, {
      expiresIn: "30d",
    });

    return { accessToken, refreshToken };
  },

  async save({
    userId,
    refreshToken,
  }: {
    userId: string;
    refreshToken: string;
  }) {
    const token = await prisma.token.findUnique({
      where: { userId },
    });

    if (token) {
      return await prisma.token.update({
        where: { userId },
        data: { refreshToken },
      });
    }

    return await prisma.token.create({
      data: { userId, refreshToken },
    });
  },

  validateAccessToken(token: string): TokenPayload | null {
    try {
      return jwt.verify(token, JWT_ACCESS_SECRET) as TokenPayload;
    } catch {
      return null;
    }
  },

  validateRefreshToken(token: string): TokenPayload | null {
    try {
      return jwt.verify(token, JWT_REFRESH_SECRET) as TokenPayload;
    } catch {
      return null;
    }
  },

  async findToken(refreshToken: string) {
    return prisma.token.findFirst({
      where: { refreshToken },
    });
  },

  async removeToken(refreshToken: string) {
    return prisma.token.deleteMany({
      where: { refreshToken },
    });
  },
};
