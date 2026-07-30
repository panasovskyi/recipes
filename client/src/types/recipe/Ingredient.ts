export interface Ingredient {
  id: string;
  name: string;
  amount: string;
  recipeId: string;
}

export type CreateIngredientInput = Omit<Ingredient, "id" | "recipeId">;