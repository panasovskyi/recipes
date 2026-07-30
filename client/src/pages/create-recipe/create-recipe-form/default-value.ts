import type { CreateRecipeFormValues } from '@/types/recipe';

export const createRecipeDefaultValues: CreateRecipeFormValues = {
  title: "",
  description: "",
  mainCategory: "",
  subCategory: "",
  ingredients: [{ name: "", amount: "" }],
  cookingSteps: [
    {
      description: "",
    },
  ],

  cookTime: "",
  prepTime: "",
  servings: "",

  nutritionalValue: {
    calories: "",
    proteins: "",
    fats: "",
    carbohydrates: "",
  },

  image: "",
};