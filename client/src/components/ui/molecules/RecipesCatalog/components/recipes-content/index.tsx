import { RecipesContentSearch } from "@/components/ui/molecules/RecipesCatalog/components/recipes-content/RecipesContentSearch";
import { RecipesContentSort } from "@/components/ui/molecules/RecipesCatalog/components/recipes-content/RecipesContentSort";
import { Spinner } from "@/components/ui/atoms/Spinner";
import { type Recipe } from "@/types/recipe";
import styles from "./RecipesContent.module.scss";
import { EmptyState } from "@/components/ui/molecules/EmptyState";
import { RecipesGrid } from '@/components/ui/molecules/RecipesGrid';
import { ErrorState } from '@/components/ui/molecules/ErrorState';

type Props = {
  recipes: Recipe[];
  resetAll: () => void;
  isLoading: boolean;
  error: string | null;
};

export const RecipesContent: React.FC<Props> = ({
  recipes,
  resetAll,
  isLoading,
  error,
}) => {
  const isEmpty = !isLoading && !error && recipes.length === 0;

  return (
    <div className={styles.mainContent}>
      <div className={styles.topBar}>
        <RecipesContentSearch />
        <RecipesContentSort />
      </div>

      {isLoading && <Spinner size='md' />}

      {error && <ErrorState message={error} />}

      {!isLoading && !error && recipes.length > 0 && (
        <RecipesGrid recipes={recipes} />
      )}

      {isEmpty && (
        <EmptyState
          onClick={resetAll}
          title="Рецептів не знайдено 🔍"
          text="Спробуйте змінити параметри пошуку або обрати іншу категорію."
          buttonText="Скинути фільтри"
        />
      )}
    </div>
  );
};
