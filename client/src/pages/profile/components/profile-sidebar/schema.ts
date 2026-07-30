import { z } from "zod";

export const profileSchema = z.object({
  login: z.string().min(2, "Мінімум 2 символи").max(30, "Максимум 30 символів"),
  email: z.string().email("Некоректний email"),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;
