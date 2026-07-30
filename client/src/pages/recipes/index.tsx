import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import { useRecipesFilters } from "@/hooks/use-recipe-filters";
import { fetchRecipes } from '@/store/slices';
import { RecipesCatalog } from '@/components/ui/molecules/RecipesCatalog';

export const RecipesPage: React.FC = () => {
  const { error, recipes, isLoading, totalPages, totalResults } = useAppSelector(
    (state) => state.recipes.allRecipes
  );
  const dispatch = useAppDispatch();
  const { category, subCategory, sort, search, ingredients, maxTime, maxCalories, page, ...filterActions } =
    useRecipesFilters();

  useEffect(() => {
    dispatch(fetchRecipes({ category, subCategory, sort, search, maxTime, maxCalories, page, ingredients }));
  }, [dispatch, category, subCategory, sort, search, ingredients, maxTime, maxCalories, page]);

  return (
    <RecipesCatalog
      count={totalResults}
      totalPages={totalPages}
      title="Всі рецепти"
      mainLinkTitle='Головна'
      mainLinkHref='/'
      currentBreadcrumb='Рецепти'
      recipes={recipes}
      isLoading={isLoading}
      error={error}
      category={category}
      subCategory={subCategory}
      selectCategory={filterActions.selectCategory}
      resetCategory={filterActions.resetCategory}
      selectSubcategory={filterActions.selectSubcategory}
      resetSubcategory={filterActions.resetSubcategory}
      resetAll={filterActions.resetAll}
    />
  );
};