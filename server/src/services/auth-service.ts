import { CreateUserDto, LoginDto } from "@/dtos/";
import { ApiError } from "@/exceptions";
import { prisma } from "@/prisma";
import { tokenService } from "./token-service";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

export const authService = {
  async create({ email, password, login }: CreateUserDto) {
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { login }],
      },
    });

    if (existingUser) {
      throw ApiError.badRequest(
        "Користувач з таким email або логіном вже існує",
      );
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const user = await prisma.user.create({
      data: {
        email,
        login,
        password: hashedPassword,
      },
    });

    const { password: _, ...userWithoutPassword } = user;

    return userWithoutPassword;
  },

  async login({ login, password }: LoginDto) {
    const user = await prisma.user.findUnique({
      where: { login },
    });

    if (!user) {
      throw ApiError.badRequest("Невірний логін або пароль");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw ApiError.badRequest("Невірний логін або пароль");
    }

    const userDto = {
      id: user.id,
      email: user.email,
      login: user.login,
    };

    const tokens = await tokenService.generate(userDto);

    await tokenService.save({
      userId: userDto.id,
      refreshToken: tokens.refreshToken,
    });

    return { ...tokens, user: userDto };
  },

  async logout(refreshToken: string) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  },

  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw ApiError.unauthorized("Користувач неавторизований");
    }

    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDatabase = await tokenService.findToken(refreshToken);

    if (!userData || !tokenFromDatabase) {
      throw ApiError.unauthorized("Сесія закінчилася, увійдіть знову");
    }

    const user = await authService.findById(userData.id);

    if (!user) {
      throw ApiError.unauthorized("Користувача не знайдено");
    }

    const userDto = {
      id: user.id,
      email: user.email,
      login: user.login,
    };

    const tokens = await tokenService.generate(userDto);
    await tokenService.save({
      userId: userDto.id,
      refreshToken: tokens.refreshToken,
    });

    return { ...tokens, user: userDto };
  },

  async findById(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    return user;
  },
};
