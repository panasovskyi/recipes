import { useRecipesFilters } from '@/hooks/use-recipe-filters';
import styles from "./RecipesContent.module.scss";

const OPTIONS = [
  { id: 1, value: "newest", label: "Спочатку нові" },
  { id: 2, value: "oldest", label: "Спочатку старі" },
  { id: 3, value: "cookTime", label: "За часом приготування" },
  { id: 4, value: "calories", label: "За калорійністю" },
];

export const RecipesContentSort = () => {
  const { sort, handleFilter } = useRecipesFilters();

  return (
    <div className={styles.sortBox}>
      <label htmlFor="sort">Сортувати:</label>
      <select
        id="sort"
        className={styles.sortSelect}
        value={sort}
        onChange={handleFilter}
      >
        {OPTIONS.map(({ id, label, value }) => (
          <option key={id} value={value}>{label}</option>
        ))}
      </select>
    </div>
  );
};
