import { IngredientInput, InstructionInput } from "@/types";
import { generateSlug } from "@/utils";
import { MainCategory, SubCategory } from "@prisma/client";

const parseJson = (value: any) => {
  if (typeof value === "string") {
    try {
      return JSON.parse(value);
    } catch {
      return value;
    }
  }
  return value;
};

export class CreateRecipeDto {
  title: string;
  slug: string;
  userId: string;
  description: string;
  mainCategory: MainCategory;
  subCategory: SubCategory | null;
  prepTime: number;
  cookTime: number;
  servings: number;
  nutritionalValue: {
    calories: number;
    proteins: number;
    fats: number;
    carbohydrates: number;
  };
  imageUrl: string | null;
  ingredients: IngredientInput[];
  cookingSteps: InstructionInput[];

  constructor(body: any) {
    this.userId = body.userId;
    this.title = body.title;
    this.slug = generateSlug(body.title || "");
    this.description = body.description;
    this.mainCategory = body.mainCategory;
    this.subCategory = body.subCategory || null;

    this.prepTime = Number(body.prepTime) || 0;
    this.cookTime = Number(body.cookTime) || 0;
    this.servings = Number(body.servings) || 0;

    const nv = parseJson(body.nutritionalValue) || {};
    this.nutritionalValue = {
      calories: Number(nv.calories) || 0,
      proteins: Number(nv.proteins) || 0,
      fats: Number(nv.fats) || 0,
      carbohydrates: Number(nv.carbohydrates) || 0,
    };

    this.ingredients = parseJson(body.ingredients) || [];
    this.cookingSteps = parseJson(body.cookingSteps) || [];

    this.imageUrl = body.imageUrl || null;
  }
}

const DEFAULT_LIMIT = 9;
const MAX_LIMIT = 45;

export class GetRecipesQueryDto {
  category?: MainCategory;
  subCategory?: SubCategory;
  search?: string;
  ingredients?: string;
  maxCalories?: number;
  maxTime?: number;
  sort?: "newest" | "oldest" | "cookTime" | "calories";

  limit: number;
  page: number;

  constructor(query: any) {
    const rawCategory = query.category || query.mainCategory;
    this.category = rawCategory ? (rawCategory as MainCategory) : undefined;

    this.subCategory = query.subCategory
      ? (query.subCategory as SubCategory)
      : undefined;

    this.search = query.search ? String(query.search).trim() : undefined;
    this.ingredients = query.ingredients
      ? String(query.ingredients).trim()
      : undefined;

    this.maxTime = query.maxTime ? Number(query.maxTime) : undefined;
    this.maxCalories = query.maxCalories
      ? Number(query.maxCalories)
      : undefined;

    this.sort = query.sort
      ? (query.sort as GetRecipesQueryDto["sort"])
      : "newest";

    const parsedLimit = Number(query.limit);
    this.limit =
      Number.isFinite(parsedLimit) && parsedLimit > 0
        ? Math.min(parsedLimit, MAX_LIMIT)
        : DEFAULT_LIMIT;
    const parsedPage = Number(query.page);
    this.page = Number.isFinite(parsedPage) && parsedPage >= 1 ? parsedPage : 1;
  }
}
