import { useRecipesFilters } from '@/hooks/use-recipe-filters';
import styles from './RecipesContent.module.scss';

export const RecipesContentSearch = () => {
  const { handleSearch, searchInput } = useRecipesFilters();

  return (
    <div className={styles.searchBox}>
      <input
        type="text"
        value={searchInput}
        onChange={handleSearch}
        placeholder="Шукати за назвою або інгредієнтом..."
        className={styles.searchInput}
      />
    </div>
  )
}