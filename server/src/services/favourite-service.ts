import { GetRecipesQueryDto } from '@/dtos';
import { prisma } from '@/prisma'
import { NutritionalValueDto } from '@/types';
import { Prisma } from '@prisma/client';

type SortOption = GetRecipesQueryDto["sort"];

const compareRecipes = (
  a: Prisma.RecipeGetPayload<{ include: typeof recipeInclude }>,
  b: Prisma.RecipeGetPayload<{ include: typeof recipeInclude }>,
  sort: SortOption,
) => {
  switch (sort) {
    case "oldest":
      return a.createdAt.getTime() - b.createdAt.getTime();
    case "cookTime":
      return a.cookTime - b.cookTime;
    case "calories": {
      const caloriesA =
        (a.nutritionalValue as NutritionalValueDto | null)?.calories ?? 0;
      const caloriesB =
        (b.nutritionalValue as NutritionalValueDto | null)?.calories ?? 0;
      return caloriesA - caloriesB;
    }
    case "newest":
    default:
      return b.createdAt.getTime() - a.createdAt.getTime();
  }
};

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
    const page = params.page ?? 1;
    const limit = params.limit ?? 10;

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

    if (params.maxTime) {
      recipeWhere.cookTime = { lte: params.maxTime };
    }

    if (params.maxCalories) {
      recipeWhere.nutritionalValue = {
        path: ["calories"],
        lte: params.maxCalories,
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

    const saved = await prisma.savedRecipe.findMany({
      where: {
        userId,
        recipe: recipeWhere,
      },
      include: {
        recipe: {
          include: recipeInclude,
        },
      },
    });

    const recipes = saved.map((item) => item.recipe);

    const sorted = [...recipes].sort((a, b) =>
      compareRecipes(a, b, params.sort),
    );

    const totalResults = sorted.length;
    const results = sorted.slice((page - 1) * limit, page * limit);
    const totalPages = Math.ceil(totalResults / limit);

    return {
      totalResults,
      results,
      totalPages,
      limit,
      page,
    };
  },
};