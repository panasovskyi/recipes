import { Button } from "@/components/ui/atoms/Button";
import styles from "./RecipesSidebar.module.scss";

export interface FilterItem<TSlug extends string = string> {
  slug: TSlug;
  name: string;
  placeholder?: string;
}

interface Props<TSlug extends string> {
  title: string;
  resetButtonText: string;
  currentParam?: string;
  categories: readonly FilterItem<TSlug>[];
  onSelect: (slug: TSlug) => void;
  onReset: () => void;
}

export const FilterGroup = <TSlug extends string>({
  title,
  resetButtonText,
  currentParam = "",
  categories,
  onSelect,
  onReset,
}: Props<TSlug>) => {
  return (
    <div className={styles.filterGroup}>
      <h4 className={styles.groupTitle}>{title}</h4>
      <ul className={styles.filterList}>
        <li>
          <Button
            text={resetButtonText}
            variant="btnFilterItem"
            isActive={!currentParam}
            onClick={onReset}
          />
        </li>

        {categories.map((category) => {
          const isActive = currentParam === category.slug;

          return (
            <li key={category.slug}>
              <Button
                text={category.name}
                variant="btnFilterItem"
                isActive={isActive}
                onClick={() => onSelect(category.slug)}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};
