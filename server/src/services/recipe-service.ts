import { prisma } from "@/prisma";
import { CreateRecipeDto, GetRecipesQueryDto } from "@/dtos";
import { Prisma } from "@prisma/client";
import { NutritionalValueDto } from "@/types";
import { ApiError } from "@/exceptions";
import { favouriteService } from "@/services/favourite-service";

const recipeInclude = {
  ingredients: true,
  instructions: true,
  user: {
    select: { id: true, login: true },
  },
} satisfies Prisma.RecipeInclude;

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

export const recipeService = {
  async create(recipe: CreateRecipeDto) {
    const newRecipe = await prisma.recipe.create({
      data: {
        userId: recipe.userId,
        title: recipe.title,
        slug: recipe.slug,
        description: recipe.description,
        mainCategory: recipe.mainCategory,
        subCategory: recipe.subCategory,
        prepTime: recipe.prepTime,
        cookTime: recipe.cookTime,
        servings: recipe.servings,
        imageUrl: recipe.imageUrl,
        nutritionalValue: recipe.nutritionalValue,

        ingredients: {
          create: recipe.ingredients.map((ing) => ({
            name: ing.name,
            amount: ing.amount,
          })),
        },

        instructions: {
          create: recipe.cookingSteps.map((step, index: number) => ({
            description: step.description,
            stepNumber: index + 1,
          })),
        },
      },

      include: recipeInclude,
    });

    return newRecipe;
  },

  async getById({ userId, recipeId }: { userId?: string; recipeId: string }) {
    const res = await prisma.recipe.findUnique({
      where: { id: recipeId },
      include: {
        ingredients: true,
        instructions: true,
        user: {
          select: {
            id: true,
            email: true,
            login: true,
          },
        },
      },
    });

    if (!res) return null;

    let isSaved = false;

    if (userId) {
      const isRecipeSaved = await favouriteService.find({ userId, recipeId });
      isSaved = !!isRecipeSaved;
    }

    return { ...res, isSaved };
  },

  async getAll(params: GetRecipesQueryDto) {
    const where: Prisma.RecipeWhereInput = {};
    let orderBy: Prisma.RecipeOrderByWithRelationInput = { createdAt: "desc" };

    const categoryFilter = params.category as string | undefined;

    if (categoryFilter) {
      where.mainCategory = params.category;
    }

    if (params.subCategory) {
      where.subCategory = params.subCategory;
    }

    if (params.ingredients) {
      where.ingredients = {
        some: {
          name: { contains: params.ingredients, mode: "insensitive" },
        },
      };
    }

    if (params.maxTime) {
      where.cookTime = { lte: params.maxTime };
    }

    if (params.maxCalories) {
      where.nutritionalValue = {
        path: ["calories"],
        lte: params.maxCalories,
      };
    }

    if (params.search) {
      where.OR = [
        { title: { contains: params.search, mode: "insensitive" } },
        { description: { contains: params.search, mode: "insensitive" } },
        {
          ingredients: {
            some: { name: { contains: params.search, mode: "insensitive" } },
          },
        },
      ];
    }

    const res = await prisma.recipe.findMany({
      where,
      orderBy,
      include: recipeInclude,
    });

    const sorted = [...res].sort((a, b) => compareRecipes(a, b, params.sort));
    const totalResults = sorted.length;
    const results = sorted.slice(
      (params.page - 1) * params.limit,
      params.page * params.limit,
    );
    const totalPages = Math.ceil(totalResults / params.limit);

    return {
      totalResults,
      results,
      totalPages,
      limit: params.limit,
      page: params.page,
    };
  },

  async getMy({
    params,
    userId,
  }: {
    params: GetRecipesQueryDto;
    userId: string;
  }) {
    const where: Prisma.RecipeWhereInput = { userId };
    let orderBy: Prisma.RecipeOrderByWithRelationInput = { createdAt: "desc" };

    const categoryFilter = params.category as string | undefined;
    if (categoryFilter) {
      where.mainCategory =
        categoryFilter as Prisma.RecipeWhereInput["mainCategory"];
    }

    if (params.subCategory) {
      where.subCategory =
        params.subCategory as Prisma.RecipeWhereInput["subCategory"];
    }

    if (params.ingredients) {
      where.ingredients = {
        some: {
          name: { contains: params.ingredients, mode: "insensitive" },
        },
      };
    }

    if (params.maxTime) {
      where.cookTime = { lte: params.maxTime };
    }

    if (params.maxCalories) {
      where.nutritionalValue = {
        path: ["calories"],
        lte: params.maxCalories,
      };
    }

    if (params.search) {
      const searchString = params.search as string;
      where.OR = [
        { title: { contains: searchString, mode: "insensitive" } },
        { description: { contains: searchString, mode: "insensitive" } },
        {
          ingredients: {
            some: { name: { contains: searchString, mode: "insensitive" } },
          },
        },
      ];
    }

    const res = await prisma.recipe.findMany({
      where,
      orderBy,
      include: recipeInclude,
    });

    const sorted = [...res].sort((a, b) => compareRecipes(a, b, params.sort));
    const totalResults = sorted.length;
    const results = sorted.slice(
      (params.page - 1) * params.limit,
      params.page * params.limit,
    );
    const totalPages = Math.ceil(totalResults / params.limit);

    return {
      totalResults,
      results,
      totalPages,
      limit: params.limit,
      page: params.page,
    };
  },

  async getPopular(params?: GetRecipesQueryDto) {
    const limit = params?.limit ?? 4;
    const page = params?.page ?? 1;

    const totalResults = await prisma.recipe.count();

    const results = await prisma.recipe.findMany({
      take: limit,
      skip: (page - 1) * limit,
      orderBy: {
        createdAt: "desc",
      },
      include: recipeInclude,
    });

    const totalPages = Math.ceil(totalResults / limit);

    return {
      totalResults,
      results,
      totalPages,
      limit,
      page,
    };
  },

  async getRecipeOfDay() {
    const recipesCount = await prisma.recipe.count();

    if (recipesCount === 0) {
      throw ApiError.notFound("В базі даних ще немає рецептів");
    }

    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 0);
    const diff = now.getTime() - startOfYear.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);

    const dayHash = now.getFullYear() * 366 + dayOfYear;
    const skipIndex = dayHash % recipesCount;

    const recipe = await prisma.recipe.findFirst({
      skip: skipIndex,
      take: 1,
      orderBy: { id: "asc" },
      include: {
        ingredients: true,
        instructions: true,
      },
    });

    return recipe;
  },
};
