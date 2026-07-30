import styles from "./HomeSearch.module.scss";
import { Tags } from "@/pages/home/components/home-search/Tags";
import { useSearchRedirect } from "@/hooks/use-search-redirect";
import { SearchForm } from '@/components/ui/molecules/SearchForm';

export const HomeSearch = () => {
  const { query, handleChange, handleSubmit } = useSearchRedirect("search");

  return (
    <section className={styles.searchSection}>
      <SearchForm
        value={query}
        onChange={handleChange}
        onSubmit={handleSubmit}
        buttonText="Пошук"
        buttonVariant="btnSearch"
        label="Пошук рецептів"
        htmlFor="site-search"
        inputId="site-search"
        inputName="search"
        inputPlaceholder="Шукати за назвою, інгредієнтом або категорією..."
      />
      <Tags />
    </section>
  );
};
