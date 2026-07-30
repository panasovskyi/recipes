import type { CreateRecipeFormValues, NutritionalValue } from "@/types/recipe";
import { subCategoriesMap } from "@/types/recipe";
import { z } from "zod";

const digitsOnly = /^[0-9]+$/;

const nutritionalValueSchema = z.object({
  calories: z
    .string()
    .min(1, "Вкажіть калорійність")
    .regex(digitsOnly, "Має бути числом"),
  proteins: z
    .string()
    .min(1, "Вкажіть кількість білків")
    .regex(digitsOnly, "Має бути числом"),
  fats: z
    .string()
    .min(1, "Вкажіть кількість жирів")
    .regex(digitsOnly, "Має бути числом"),
  carbohydrates: z
    .string()
    .min(1, "Вкажіть кількість вуглеводів")
    .regex(digitsOnly, "Має бути числом"),
}) satisfies z.ZodType<NutritionalValue>;

export const createRecipeShema = z
  .object({
    title: z.string().min(3, "Назва рецепту має містити мінімум 3 символи"),

    description: z
      .string()
      .min(100, "Опис має бути розлогим (мінімум 100 символів)"),

    mainCategory: z
      .enum(["", "breakfast", "lunch_dinner", "snacks", "drinks"], {
        message: "Некоректна категорія",
      })
      .refine((val) => val !== "", "Оберіть основну категорію"),

    subCategory: z.string(),

    ingredients: z
      .array(
        z.object({
          name: z
            .string()
            .min(3, "Назва інгредієнта має містити мінімум 3 символи"),
          amount: z.string().min(1, "Вкажіть кількість"),
        }),
      )
      .min(1, "Додайте хоча б один інгредієнт"),

    cookingSteps: z
      .array(
        z.object({
          description: z
            .string()
            .min(10, "Опис кроку має містити мінімум 10 символів"),
        }),
      )
      .min(1, "Додайте хоча б один крок приготування"),

    cookTime: z
      .string()
      .min(1, "Вкажіть час приготування")
      .regex(/^[0-9]+$/, "Час приготування має бути числом (хвилини)"),

    prepTime: z
      .string()
      .min(1, "Вкажіть час підготовки")
      .regex(/^[0-9]+$/, "Час підготовки має бути числом (хвилини)"),

    servings: z
      .string()
      .min(1, "Вкажіть кількість порцій")
      .regex(/^[0-9]+$/, "Кількість порцій має бути числом"),

    nutritionalValue: nutritionalValueSchema,

    image: z
      .union([
        z.literal(""),
        z.instanceof(FileList, { message: "Додайте зображення страви" }),
      ])
      .refine((val) => val !== "", "Додайте зображення страви"),
  })
  .superRefine((data, ctx) => {
    const hasSubCategories = data.mainCategory in subCategoriesMap;

    if (hasSubCategories && !data.subCategory) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Оберіть підкатегорію",
        path: ["subCategory"],
      });
    }
  }) satisfies z.ZodType<CreateRecipeFormValues>;
