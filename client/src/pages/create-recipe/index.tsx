import { CreateRecipeForm } from '@/pages/create-recipe/create-recipe-form';
import styles from "./CreateRecipe.module.scss";

export const CreateRecipePage: React.FC = () => {
  return (
    <div className={styles.page}>
      <h1 className={styles.page__title}>Створити рецепт</h1>
      <CreateRecipeForm />
    </div>
  );
};
