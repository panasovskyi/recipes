import { createContext, useEffect, useState } from "react";
import { Recipe } from "../types/recipe";
import { recipeService } from "../api/request";

type ContextType = {
  recipes: Recipe[];
}

export const RecipeContext = createContext<ContextType>({
  recipes: [],
});

type Props = {
  children: React.ReactNode;
};

export const RecipeProvider: React.FC<Props> = ({ children }) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    recipeService.getAll().then(setRecipes);
  }, []);

  const value = {
    recipes
  };

  return (
    <RecipeContext.Provider value={value}>{children}</RecipeContext.Provider>
  );
};
