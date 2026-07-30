import { NutrientCard } from './NutrientCard';
import styles from "./Ingredients.module.scss";
import type { Recipe } from '@/types/recipe';
import { Ingredient } from './Ingredient';

type Nutritions = {
  id: number;
  label: string;
  value: string;
}

type Props = {
  nutritions: Nutritions[];
  recipe: Recipe;
};

export const Ingredients: React.FC<Props> = ({ nutritions, recipe }) => {
  return (
    <div className={styles.ingredientsBlock}>
      <h2 className={styles.sectionTitle}>Інгредієнти</h2>
      <div className={styles.nutrientsGrid}>
        {nutritions.map((item) => (
          <NutrientCard key={item.id} label={item.label} value={item.value} />
        ))}
      </div>
      <ul className={styles.ingredientsList}>
        {recipe?.ingredients.map((ingredient) => (
          <Ingredient
            key={ingredient.id}
            label={ingredient.name}
            amount={ingredient.amount}
          />
        ))}
      </ul>
    </div>
  );
};
