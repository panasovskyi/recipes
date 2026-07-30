import { CATEGORY_MAP, SUBCATEGORY_MAP, type Recipe } from '@/types/recipe';
import styles from './RecipesGrid.module.scss';
import { RecipeCard } from '@/components/ui/molecules/RecipeCard';

type Props = {
  recipes: Recipe[];
}

export const RecipesGrid: React.FC<Props> = ({ recipes }) => {
  return (
    <div className={styles.recipesGrid}>
      {recipes.map((recipe) => {
        const categoryName = CATEGORY_MAP.get(recipe.mainCategory) || "";
        const subcategoryObj = SUBCATEGORY_MAP.get(recipe.subCategory);

        return (
          <RecipeCard
            key={recipe.id}
            id={recipe.id}
            placeholder={subcategoryObj?.placeholder || "🍽️"}
            title={recipe.title}
            description={recipe.description}
            time={recipe.cookTime}
            calories={recipe.nutritionalValue?.calories}
            category={categoryName}
            subcategory={subcategoryObj?.name || ""}
            imageUrl={recipe.imageUrl}
          />
        );
      })}
    </div>
  )
}