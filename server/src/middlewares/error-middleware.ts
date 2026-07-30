import { ApiError } from "@/exceptions";
import { NextFunction, Request, Response } from "express";
import { MulterError } from "multer";

export const errorMiddleware = (
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  if (error instanceof ApiError) {
    res.status(error.status).send({
      status: error.status,
      message: error.message,
    });
    return;
  }

  if (error instanceof MulterError) {
    if (error.code === "LIMIT_FILE_SIZE") {
      res.status(400).json({
        message: "Розмір файлу занадто великий. Максимальний розмір — 10 МБ.",
      });
      return;
    }
    res
      .status(400)
      .json({ message: `Помилка завантаження файлу: ${error.message}` });
    return;
  }

  console.error(error);
  res.status(500).send({
    status: 500,
    message: "Внутрішня помилка сервера",
  });
};
