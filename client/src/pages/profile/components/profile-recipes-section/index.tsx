import { Link } from "react-router-dom";
import type { Recipe } from "@/types/recipe";
import { RecipesGrid } from "@/components/ui/molecules/RecipesGrid";
import { EmptyState } from "@/components/ui/molecules/EmptyState";
import { ErrorState } from "@/components/ui/molecules/ErrorState";
import { Spinner } from "@/components/ui/atoms/Spinner";
import styles from "./ProfileRecipesSection.module.scss";
import { useAppSelector } from '@/store';

const PREVIEW_LIMIT = 3;

type Props = {
  title: string;
  recipes: Recipe[];
  isLoading: boolean;
  error: string | null;
  viewAllTo: string;
  emptyTitle: string;
  emptyText: string;
  emptyButtonText?: string;
  onEmptyButtonClick?: () => void;
};

export const ProfileRecipesSection: React.FC<Props> = ({
  title,
  recipes,
  isLoading,
  error,
  viewAllTo,
  emptyTitle,
  emptyText,
  emptyButtonText,
  onEmptyButtonClick,
}) => {
  const { totalResults } = useAppSelector(state => state.recipes.fav);
  const previewRecipes = recipes.slice(0, PREVIEW_LIMIT);

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2>{title}</h2>
        {!isLoading && !error && totalResults > PREVIEW_LIMIT && (
          <Link to={viewAllTo} className={styles.viewAllLink}>
            Дивитися всі →
          </Link>
        )}
      </div>

      {isLoading && <Spinner size="md" />}

      {!isLoading && error && <ErrorState message={error} compact />}

      {!isLoading && !error && previewRecipes.length > 0 && (
        <RecipesGrid recipes={previewRecipes} />
      )}

      {!isLoading && !error && previewRecipes.length === 0 && (
        <EmptyState
          title={emptyTitle}
          text={emptyText}
          buttonText={emptyButtonText}
          onClick={onEmptyButtonClick}
        />
      )}
    </section>
  );
};