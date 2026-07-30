import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import { useRecipesFilters } from "@/hooks/use-recipe-filters";
import { fetchFav } from '@/store/slices';
import { RecipesCatalog } from '@/components/ui/molecules/RecipesCatalog';

export const ProfileFavoritesPage: React.FC = () => {
  const { error, recipes, isLoading, totalPages, totalResults } = useAppSelector(
    (state) => state.recipes.fav
  );
  const dispatch = useAppDispatch();
  const { category, subCategory, sort, search, page, ...filterActions } =
    useRecipesFilters();

  useEffect(() => {
    dispatch(fetchFav({ category, subCategory, sort, search, page }));
  }, [dispatch, category, subCategory, sort, search, page]);

  return (
    <RecipesCatalog
      count={totalResults}
      totalPages={totalPages}
      title="Збережені рецепти"
      mainLinkTitle='Профіль'
      mainLinkHref='/profile'
      currentBreadcrumb='Збережені рецепти'
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