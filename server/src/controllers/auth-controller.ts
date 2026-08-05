import { CreateUserDto, LoginDto } from "@/dtos";
import { authService } from "@/services";
import { Request, Response } from "express";

const REFRESH_COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite:
    process.env.NODE_ENV === "production"
      ? ("none" as const)
      : ("lax" as const),
  secure: process.env.NODE_ENV === "production",
};

export const authController = {
  async register(req: Request, res: Response) {
    const userDto = new CreateUserDto(req.body);
    const newUser = await authService.create(userDto);

    res.status(201).json(newUser);
  },

  async login(req: Request, res: Response) {
    const loginDto = new LoginDto(req.body);
    const newUser = await authService.login(loginDto);

    res.cookie("refreshToken", newUser.refreshToken, {
      ...REFRESH_COOKIE_OPTIONS,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res
      .status(201)
      .json({ user: newUser.user, accessToken: newUser.accessToken });
  },

  async logout(req: Request, res: Response) {
    const { refreshToken } = req.cookies;

    if (refreshToken) {
      await authService.logout(refreshToken);
    }

    res.clearCookie("refreshToken", REFRESH_COOKIE_OPTIONS);

    res.status(200).json({ message: "Вихід успішний" });
  },

  async refresh(req: Request, res: Response) {
    const userData = await authService.refresh(req.cookies.refreshToken);

    res.cookie("refreshToken", userData.refreshToken, {
      ...REFRESH_COOKIE_OPTIONS,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res
      .status(200)
      .json({ user: userData.user, accessToken: userData.accessToken });
  },
};
