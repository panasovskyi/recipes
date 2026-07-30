import { Link, useSearchParams } from 'react-router-dom';
import styles from './RecipesSection.module.scss';
import { useAppDispatch, useAppSelector } from '@/store';
import { Spinner } from '@/components/ui/atoms/Spinner';
import { RecipesGrid } from '@/components/ui/molecules/RecipesGrid';
import { ErrorState } from '@/components/ui/molecules/ErrorState';
import { useEffect } from 'react';
import { fetchPopularRecipes } from '@/store/slices';

export const RecipesSection = () => {
  const { error, isLoading, recipes } = useAppSelector(
      (state) => state.recipes.popularRecipes,
  );
  const [searchParams] = useSearchParams();
  const limit = searchParams.get("limit") || undefined;

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPopularRecipes({ limit }));
  }, [dispatch, limit]);


  return (
    <section className={styles.recipesSection}>
      <div className={styles.sectionHeader}>
        <h2>Популярні рецепти</h2>
        <Link to="/recipes" className={styles.seeAllLink}>
          Дивитися всі →
        </Link>
      </div>

      {isLoading && <Spinner size='md' />}

      {error && <ErrorState message={error}/>}

      {!isLoading && !error && recipes.length > 0 && (
        <RecipesGrid recipes={recipes} />
      )}
    </section>
  )
}