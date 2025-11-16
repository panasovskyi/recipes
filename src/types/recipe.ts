import { Ingredient } from './ingredient';

export type Recipe = {
  id: number;
  name: string;
  category: string;
  subcategory: string;
  ingredients: Ingredient[];
  steps: string;
  calories: string;
  proteins: string;
  fats: string;
  carbs: string;
};