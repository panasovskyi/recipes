import { z } from "zod";

export const registerSchema = z.object({
  body: z
    .object({
      login: z
        .string()
        .trim()
        .min(3, "Логін має містити мінімум 3 символи")
        .max(20, "Довжина логіну не може перевищувати 20 символів"),

      email: z.string().trim().email("Введіть коректну email-адресу"),

      password: z.string().trim().min(6, "Пароль має бути не менше 6 символів"),
      passwordConfirmation: z.string().trim(),
    })
    .refine((data) => data.password === data.passwordConfirmation, {
      message: "Паролі не збігаються",
      path: ["passwordConfirmation"],
    }),
});

export const loginSchema = z.object({
  body: z.object({
    login: z
      .string()
      .trim()
      .min(3, "Логін має містити мінімум 3 символи")
      .max(20, "Довжина логіну не може перевищувати 20 символів"),

    password: z.string().trim().min(6, "Пароль має бути не менше 6 символів"),
  }),
});

export type RegisterInput = z.infer<typeof registerSchema>["body"];
