import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import { useRecipesFilters } from "@/hooks/use-recipe-filters";
import { fetchMy } from '@/store/slices';
import { RecipesCatalog } from '@/components/ui/molecules/RecipesCatalog';

export const ProfileMyRecipesPage: React.FC = () => {
  const { error, recipes, isLoading } = useAppSelector(
    (state) => state.recipes.my
  );
  const dispatch = useAppDispatch();
  const { category, subCategory, sort, search, ...filterActions } =
    useRecipesFilters();

  useEffect(() => {
    dispatch(fetchMy({category, subCategory, sort, search}));
  }, [dispatch, category, subCategory, sort, search ]);

  return (
    <RecipesCatalog
      title="Мої рецепти"
      mainLinkTitle='Профіль'
      mainLinkHref='/profile'
      currentBreadcrumb='Мої рецепти'
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