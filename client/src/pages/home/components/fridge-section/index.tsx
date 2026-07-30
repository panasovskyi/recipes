import { SearchForm } from '@/components/ui/molecules/SearchForm';
import styles from "./FridgeSection.module.scss";
import { useSearchRedirect } from '@/hooks/use-search-redirect';

export const FridgeSection = () => {
  const { query, handleChange, handleSubmit } = useSearchRedirect("ingredients");

  return (
    <section className={styles.fridgeSection}>
      <div className={styles.fridgeContent}>
        <h2>Не знаєте, що приготувати? 🥑</h2>
        <p>
          Вкажіть інгредієнти, які у вас є, і ми підберемо ідеальний рецепт!
        </p>

        <SearchForm
          value={query}
          onChange={handleChange}
          onSubmit={handleSubmit}
          buttonText="Знайти страви"
          buttonVariant="btnFind"
          label="Пошук страв"
          htmlFor="dish-search"
          inputId="dish-search"
          inputName="find"
          inputPlaceholder="Наприклад: Хек, Сир, Броколі..."
        />
      </div>
    </section>
  );
};
