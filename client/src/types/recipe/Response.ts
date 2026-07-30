import type { Recipe } from '@/types/recipe/Recipe';

export type RecipeResponse = {
  totalResults: number;
  totalPages: number;
  limit: number;
  page: number;
  results: Recipe[];
};