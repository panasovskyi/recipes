import React from "react";
import styles from "./Recipes.module.scss";
import {
  CATEGORIES_WITH_SUBS,
  type MainCategoryType,
  type Recipe,
  type SubCategoryType,
} from "@/types/recipe";
import { RecipesHeader } from "@/components/ui/molecules/RecipesCatalog/components/recipes-header";
import { RecipesSidebar } from "@/components/ui/molecules/RecipesCatalog/components/recipes-sidebar";
import { RecipesContent } from "@/components/ui/molecules/RecipesCatalog/components/recipes-content";
import { Pagination } from "@/components/ui/molecules/Pagination";

interface RecipesCatalogProps {
  recipes: Recipe[];
  isLoading: boolean;
  error: string | null;
  category: MainCategoryType;
  subCategory: SubCategoryType;
  selectCategory: (cat: MainCategoryType) => void;
  resetCategory: () => void;
  selectSubcategory: (sub: SubCategoryType) => void;
  resetSubcategory: () => void;
  resetAll: () => void;

  currentBreadcrumb: string;
  mainLinkTitle: string;
  mainLinkHref: string;
  title: string;

  totalPages: number;
  count: number;
}

export const RecipesCatalog: React.FC<RecipesCatalogProps> = ({
  mainLinkHref,
  mainLinkTitle,
  currentBreadcrumb,
  title,
  recipes,
  isLoading,
  error,
  category,
  subCategory,
  selectCategory,
  resetCategory,
  selectSubcategory,
  resetSubcategory,
  resetAll,

  totalPages,
  count,
}) => {
  return (
    <div className={styles.page}>
      <RecipesHeader
        title={title}
        count={count}
        mainLinkHref={mainLinkHref}
        mainLinkTitle={mainLinkTitle}
        currentBreadcrumb={currentBreadcrumb}
      />

      <div className={styles.contentLayout}>
        <RecipesSidebar
          category={category}
          subcategory={subCategory}
          categories={CATEGORIES_WITH_SUBS}
          setCategory={selectCategory}
          resetCategory={resetCategory}
          setSubcategory={selectSubcategory}
          resetSubcategory={resetSubcategory}
          resetAll={resetAll}
        />

        <RecipesContent
          recipes={recipes}
          resetAll={resetAll}
          isLoading={isLoading}
          error={error}
        />
      </div>

      {!isLoading && !error && recipes.length > 0 && (
        <div className={styles.paginationWrapper}>
          <Pagination
            totalPages={totalPages}
          />
        </div>
      )}
    </div>
  );
};
