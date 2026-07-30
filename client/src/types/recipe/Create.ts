import type { CreateIngredientInput } from "./Ingredient";
import type { CreateInstructionInput } from "./Instruction";
import type { NutritionalValue } from "./Nutritions";
import type { MainCategoryType, SubCategoryType } from "./Slugs";

export interface CreateRecipeFormValues {
  title: string;
  description: string;
  mainCategory: MainCategoryType | "";
  subCategory: SubCategoryType | string;
  ingredients: CreateIngredientInput[];
  cookingSteps: CreateInstructionInput[];

  prepTime: string;
  cookTime: string;
  servings: string;

  nutritionalValue: NutritionalValue;

  image: FileList | "";
}