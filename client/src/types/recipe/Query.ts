import type { MainCategoryType, SubCategoryType } from '@/types/recipe/Slugs';

export type RecipeQueryParams = {
  category?: MainCategoryType;
  subCategory?: SubCategoryType;

  sort?: string;
  search?: string;
  ingredients?: string;

  maxTime?: string;
  maxCalories?: string;

  limit?: number;
  page?: number;
};