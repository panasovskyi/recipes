import { z } from "zod";
import { MainCategory, SubCategory } from "@prisma/client";

const numericField = (
  numberMessage: string,
  min: number,
  minMessage: string,
  fallbackToZero = false,
) =>
  z
    .union([z.number(), z.string()])
    .transform((val) => (fallbackToZero ? Number(val) || 0 : Number(val)))
    .pipe(z.number({ message: numberMessage }).min(min, minMessage));

export const createRecipeSchema = z.object({
  body: z.object({
    title: z
      .string({ message: "Заголовок є обов'язковим" })
      .trim()
      .min(3, "Заголовок має містити мінімум 3 символи")
      .max(100, "Заголовок не може бути довшим за 100 символів"),

    description: z
      .string({ message: "Опис страви є обов'язковим" })
      .trim()
      .min(10, "Будь ласка, розпишіть опис детальніше (мінімум 10 символів)")
      .max(1000, "Опис занадто довгий (максимум 1000 символів)"),

    mainCategory: z.nativeEnum(MainCategory, {
      message: "Оберіть коректну основну категорію зі списку",
    }),

    subCategory: z.preprocess(
      (val) => (val === "" ? undefined : val),
      z
        .nativeEnum(SubCategory, { message: "Обрано некоректну підкатегорію" })
        .nullable()
        .optional(),
    ),

    prepTime: numericField(
      "Час підготовки має бути числом",
      0,
      "Час не може бути від'ємним",
    ),
    cookTime: numericField(
      "Час приготування має бути числом",
      0,
      "Час не може бути від'ємним",
    ),
    servings: numericField(
      "Кількість порцій має бути числом",
      1,
      "Кількість порцій має бути не менше 1",
    ),

    nutritionalValue: z.object(
      {
        calories: numericField(
          "Калорії мають бути числом",
          0,
          "Калорії не можуть бути від'ємними",
          true,
        ),
        proteins: numericField(
          "Білки мають бути числом",
          0,
          "Білки не можуть бути від'ємними",
          true,
        ),
        fats: numericField(
          "Жири мають бути числом",
          0,
          "Жири не можуть бути від'ємними",
          true,
        ),
        carbohydrates: numericField(
          "Вуглеводи мають бути числом",
          0,
          "Вуглеводи не можуть бути від'ємними",
          true,
        ),
      },
      { message: "Харчова цінність (БЖУ) є обов'язковою" },
    ),

    ingredients: z
      .array(
        z.object({
          name: z
            .string({ message: "Назва інгредієнта обов'язкова" })
            .trim()
            .min(1, "Назва інгредієнта не може бути порожньою"),
          amount: z
            .string({ message: "Кількість інгредієнта обов'язкова" })
            .trim()
            .min(1, "Вкажіть кількість або вагу (наприклад: '1 шт', '200 г')"),
        }),
      )
      .min(1, "Додайте хоча б один інгредієнт"),

    cookingSteps: z
      .array(
        z.object({
          description: z
            .string({ message: "Опис кроку обов'язковий" })
            .trim()
            .min(
              5,
              "Опис кроку приготування занадто короткий (мінімум 5 символів)",
            ),
        }),
      )
      .min(1, "Додайте хоча б один крок приготування"),
  }),
});

export const getRecipeSchema = z.object({
  params: z.object({
    recipeId: z.string({ message: "Відустній унікальинй ID рецепту" }).trim(),
  }),
});

export const getRecipesQuerySchema = z.object({
  query: z.object({
    category: z
      .nativeEnum(MainCategory, {
        message: "Обрано некоректну основну категорію",
      })
      .optional(),
    mainCategory: z
      .nativeEnum(MainCategory, {
        message: "Обрано некоректну основну категорію",
      })
      .optional(),
    subCategory: z
      .nativeEnum(SubCategory, { message: "Обрано некоректну підкатегорію" })
      .optional(),
    search: z.string().trim().optional(),
    ingredients: z.string().trim().optional(),
    sort: z
      .enum(["newest", "oldest", "cookTime", "calories"], {
        message: "Некоректне значення сортування",
      })
      .optional(),

    maxTime: z
      .string()
      .regex(/^[0-9]+$/, "maxTime має бути числом")
      .optional(),

    maxCalories: z
      .string()
      .regex(/^[0-9]+$/, "maxCalories має бути числом")
      .optional(),

    limit: z.string().regex(/^\d+$/, "Ліміт має бути числом").optional(),
    page: z.string().regex(/^\d+$/, "Сторінка має бути числом").optional(),
  }),
});
