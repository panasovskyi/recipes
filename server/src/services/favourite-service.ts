import { GetRecipesQueryDto } from '@/dtos';
import { prisma } from '@/prisma'
import { NutritionalValueDto } from '@/types';
import { Prisma } from '@prisma/client';

const recipeInclude = {
  ingredients: true,
  instructions: true,
  user: {
    select: { id: true, login: true },
  },
} satisfies Prisma.RecipeInclude;

export const favouriteService = {
  async find({ userId, recipeId }: { userId: string; recipeId: string }) {
    const res = await prisma.savedRecipe.findUnique({
      where: {
        userId_recipeId: { userId, recipeId },
      },
    });

    return res;
  },

  async delete(savedRecipeId: string) {
    await prisma.savedRecipe.delete({
      where: { id: savedRecipeId },
    });
  },

  async create({ userId, recipeId }: { userId: string; recipeId: string }) {
    const res = await prisma.savedRecipe.create({
      data: { userId, recipeId },
    });

    return res;
  },

  async toggleFav({ userId, recipeId }: { userId: string; recipeId: string }) {
    const isSaved = await favouriteService.find({ userId, recipeId });

    if (isSaved) {
      await favouriteService.delete(isSaved.id);
      return { isSaved: false, message: "Рецепт видалено зі збережених" };
    }

    await favouriteService.create({ userId, recipeId });

    return { isSaved: true, message: "Рецепт збережено" };
  },

  async getSaved({
    params,
    userId,
  }: {
    params: GetRecipesQueryDto;
    userId: string;
  }) {
    const recipeWhere: Prisma.RecipeWhereInput = {};

    const categoryFilter = params.category as string | undefined;
    if (categoryFilter) {
      recipeWhere.mainCategory =
        categoryFilter as Prisma.RecipeWhereInput["mainCategory"];
    }

    if (params.subCategory) {
      recipeWhere.subCategory =
        params.subCategory as Prisma.RecipeWhereInput["subCategory"];
    }

    if (params.ingredients) {
      recipeWhere.ingredients = {
        some: {
          name: { contains: params.ingredients, mode: "insensitive" },
        },
      };
    }

    if (params.search) {
      const searchString = params.search as string;
      recipeWhere.OR = [
        {
          title: { contains: searchString, mode: "insensitive" },
        },
        {
          description: { contains: searchString, mode: "insensitive" },
        },
        {
          ingredients: {
            some: {
              name: { contains: searchString, mode: "insensitive" },
            },
          },
        },
      ];
    }

    let recipeOrderBy: Prisma.RecipeOrderByWithRelationInput = {
      createdAt: "desc",
    };

    if (params.sort === "newest") {
      recipeOrderBy = { createdAt: "desc" };
    }

    if (params.sort === "oldest") {
      recipeOrderBy = { createdAt: "asc" };
    }

    if (params.sort === "cookTime") {
      recipeOrderBy = { cookTime: "asc" };
    }

    const saved = await prisma.savedRecipe.findMany({
      where: {
        userId,
        recipe: recipeWhere,
      },
      orderBy: {
        recipe: recipeOrderBy,
      },
      include: {
        recipe: {
          include: recipeInclude,
        },
      },
    });

    const recipes = saved.map((item) => item.recipe);

    if (params.sort === "calories") {
      recipes.sort((a, b) => {
        const caloriesA =
          (a.nutritionalValue as NutritionalValueDto | null)?.calories ?? 0;
        const caloriesB =
          (b.nutritionalValue as NutritionalValueDto | null)?.calories ?? 0;

        return caloriesA - caloriesB;
      });
    }

    return recipes;
  },
};