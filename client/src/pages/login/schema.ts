import { z } from 'zod';

export const LoginSchema = z.object({
  login: z.string().min(3, "Логін має містити мінімум 3 символи"),
  password: z.string().min(6, "Пароль має бути не менше 6 символів"),
});