import { z } from "zod";

export const registerSchema = z
  .object({
    login: z.string().min(3, "Логін має містити мінімум 3 символи"),
    email: z
      .string()
      .min(1, "Email є обов'язковим")
      .email("Некоректний формат email"),
    password: z.string().min(6, "Пароль має бути не менше 6 символів"),
    passwordConfirmation: z
      .string()
      .min(1, "Підтвердження пароля є обов'язковим"),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Паролі не збігаються",
    path: ["passwordConfirmation"],
  });
