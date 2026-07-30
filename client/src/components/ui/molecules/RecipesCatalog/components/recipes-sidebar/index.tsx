import { FilterHeader } from "@/components/ui/molecules/RecipesCatalog/components/recipes-sidebar/FilterHeader";
import styles from "./RecipesSidebar.module.scss";
import { FilterGroup } from "@/components/ui/molecules/RecipesCatalog/components/recipes-sidebar/FilterGroup";
import {
  CATEGORIES_WITH_SUBS,
  type MainCategoryType,
  type SubCategoryType,
} from "@/types/recipe";

type Props = {
  category: MainCategoryType;
  subcategory: SubCategoryType;
  categories: typeof CATEGORIES_WITH_SUBS;
  setCategory: (val: MainCategoryType) => void;
  resetCategory: () => void;
  setSubcategory: (val: SubCategoryType) => void;
  resetSubcategory: () => void;
  resetAll: () => void;
};

export const RecipesSidebar: React.FC<Props> = ({
  category,
  subcategory,
  categories,
  setCategory,
  resetCategory,
  setSubcategory,
  resetSubcategory,
  resetAll,
}) => {
  const currentCategory = categories.find((cat) => cat.slug === category);
  const currentSubcategories = currentCategory?.sub || [];

  return (
    <aside className={styles.sidebar}>
      <div className={styles.filterBlock}>
        <FilterHeader onReset={resetAll} />

        <FilterGroup
          title="Категорія"
          resetButtonText="Всі категорії"
          currentParam={category}
          categories={categories}
          onSelect={setCategory}
          onReset={resetCategory}
        />

        {category !== "drinks" && category && (
          <FilterGroup
            title="Підкатегорія"
            resetButtonText="Всі"
            currentParam={subcategory}
            categories={currentSubcategories}
            onSelect={setSubcategory}
            onReset={resetSubcategory}
          />
        )}
      </div>
    </aside>
  );
};
