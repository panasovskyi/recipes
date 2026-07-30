import { useEffect } from "react";
import { CATEGORY_MAP, SUBCATEGORY_MAP } from "../../types/recipe";
import styles from "./RecipeDetails.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store";
import { fetchRecipe } from "@/store/slices";
import { Spinner } from "@/components/ui/atoms/Spinner";
import { ErrorState } from "@/components/ui/molecules/ErrorState";
import { EmptyState } from "@/components/ui/molecules/EmptyState";
import {
  getNutritionalValues,
  getQuickInfo,
} from "@/pages/recipe-details/constants";
import { Ingredients } from "@/pages/recipe-details/components/Ingredients";
import { QuickInfo } from "@/pages/recipe-details/components/QuickInfo";
import { Overview } from "@/pages/recipe-details/components/Overview";
import { Instructions } from "@/pages/recipe-details/components/Instructions";

export const RecipeDetailsPage = () => {
  const { error, isLoading, recipe } = useAppSelector(
    (state) => state.recipes.recipe,
  );
  const { isLoading: isAuthLoading } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();
  const { recipeId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthLoading) return;
    dispatch(fetchRecipe(recipeId as string));
  }, [dispatch, recipeId, isAuthLoading]);

  if (isAuthLoading || isLoading) {
    return (
      <div className={styles.page}>
        <Spinner isFullPage size="md" />
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.page}>
        <ErrorState />
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className={styles.page}>
        <EmptyState
          title="Рецепт кудись зник 🍳"
          text="Сьогодні шеф-кухар імпровізує! Оберіть будь-яку страву з нашого каталогу."
          buttonText="До каталогу рецептів"
          onClick={() => navigate("/recipes")}
        />
      </div>
    );
  }

  const categoryName = CATEGORY_MAP.get(recipe?.mainCategory) || "";
  const subcategoryObj = SUBCATEGORY_MAP.get(recipe?.subCategory);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        {recipe.imageUrl ? (
          <img
            src={recipe.imageUrl}
            alt={recipe?.title}
            className={styles.heroImage}
          />
        ) : (
          <div className={styles.heroPlaceholder}>
            {subcategoryObj?.placeholder || "🍽️"}
          </div>
        )}
      </header>

      <div className={styles.infoWrapper}>
        <Overview
          category={categoryName}
          subcategory={subcategoryObj?.name || ""}
          title={recipe.title}
          description={recipe.description}
          user={recipe.user}
        />

        <QuickInfo
          recipeId={recipeId as string}
          info={getQuickInfo(recipe)}
          isSaved={recipe.isSaved}
        />
      </div>

      <div className={styles.cookingWrapper}>
        <Ingredients
          recipe={recipe}
          nutritions={getNutritionalValues(recipe)}
        />
        <Instructions steps={recipe.instructions} />
      </div>
    </div>
  );
};
