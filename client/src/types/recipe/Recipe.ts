import type { RecipeAuthor } from '@/types/auth';
import type { Ingredient } from "./Ingredient";
import type { InstructionStep } from "./Instruction";
import type { NutritionalValue } from "./Nutritions";
import type { MainCategoryType, SubCategoryType } from './Slugs';

export interface Recipe {
  id: string;
  slug: string;

  title: string;
  description: string;

  mainCategory: MainCategoryType;
  subCategory: SubCategoryType;

  ingredients: Ingredient[];
  instructions: InstructionStep[];

  imageUrl?: string;

  prepTime: number;
  cookTime: number;
  servings: number;

  nutritionalValue: NutritionalValue;

  isSaved: boolean;

  userId: string;
  user: RecipeAuthor;

  createdAt: string;
  updatedAt: string;
}
