import { MainCategory, PrismaClient, SubCategory } from "@prisma/client";
import recipes from "./recipes.json" with { type: "json" };

import slugify from "slugify";
import crypto from "crypto";

export const generateSlug = (title: string): string => {
  const baseSlug = slugify(title, {
    lower: true,
    strict: true,
    locale: "uk",
  });
  const hash = crypto.randomBytes(3).toString("hex");
  return `${baseSlug}-${hash}`;
};


const prisma = new PrismaClient();

async function main() {
  console.log(
    `Знайдено рецептів для імпорту: ${recipes.length}. Починаємо запис...`,
  );

  for (const recipe of recipes) {
    await prisma.recipe.create({
      data: {
        userId: "75a9179c-543c-49ab-8ab2-dfdac698759f",
        title: recipe.title,
        slug: generateSlug(recipe.title),
        description: recipe.description,
        prepTime: recipe.prepTime,
        cookTime: recipe.cookTime,
        servings: recipe.servings,
        imageUrl: recipe.imageUrl,
        mainCategory: recipe.mainCategory as MainCategory,
        subCategory: recipe.subCategory as SubCategory,

        ingredients: {
          create: recipe.ingredients.map((ing: any) => ({
            name: ing.name,
            amount: String(ing.amount),
          })),
        },

        instructions: {
          create: recipe.instructions.map((inst: any, i: number) => ({
            description: inst.description,
            stepNumber: i + 1,
          })),
        },

        nutritionalValue: {
          calories: recipe.nutritionalValue?.calories || 0,
          proteins: recipe.nutritionalValue?.proteins || 0,
          fats: recipe.nutritionalValue?.fats || 0,
          carbohydrates: recipe.nutritionalValue?.carbohydrates || 0,
        },
      },
    });
    console.log(`✓ Рецепт "${recipe.title}" успішно додано.`);
  }

  console.log("🚀 Сідінг завершено успішно!");
}

main()
  .catch((e) => {
    console.error("Помилка під час сідінгу:", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
