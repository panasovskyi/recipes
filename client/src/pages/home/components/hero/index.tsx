import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import { fetchTopOfDay } from "@/store/slices";
import { ErrorState } from "@/components/ui/molecules/ErrorState";
import { Spinner } from "@/components/ui/atoms/Spinner";
import { EmptyState } from "@/components/ui/molecules/EmptyState";
import { MetaItem } from "@/pages/home/components/hero/MetaItem";
import styles from "./Hero.module.scss";

export const Hero = () => {
  const { error, isLoading, recipe } = useAppSelector(
    (state) => state.recipes.topOfDay,
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTopOfDay());
  }, [dispatch]);

  const metaItems = [
    { id: 1, label: "Час:", value: `${recipe?.cookTime} хв` },
    {
      id: 2,
      label: "Калорійність:",
      value: `${recipe?.nutritionalValue.calories} ккал`,
    },
  ];

  if (error) {
    return (
      <div className={`${styles.hero} ${styles.center}`}>
        <ErrorState message={error} />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={`${styles.hero} ${styles.center}`}>
        <Spinner size="md" />
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className={`${styles.hero} ${styles.center}`}>
        <EmptyState
          text="На сьогодні рецепт дня ще не обрано або він сховається десь у нашому кулінарному зошиті."
          title="Шеф-кухар ще відпочиває 👨‍🍳"
        />
      </div>
    );
  }
  
  const heroStyle = recipe.imageUrl
    ? {
        backgroundImage: `linear-gradient(135deg, rgba(0, 0, 0, 0.75) 0%, rgba(0, 0, 0, 0.4) 100%), url(${recipe.imageUrl})`,
      }
    : undefined;

  return (
    <section
      className={`${styles.hero} ${recipe.imageUrl ? styles.hasBgImage : ""}`}
      style={heroStyle}
    >
      <div className={styles.heroBadge}>✨ Рецепт дня</div>
      <h1 className={styles.heroTitle}>{recipe.title}</h1>
      <p className={styles.heroDescription}>{recipe.description}</p>

      <div className={styles.heroMeta}>
        {metaItems.map((item) => (
          <MetaItem key={item.id} label={item.label} value={item.value} />
        ))}
      </div>

      <Link to={`/recipes/${recipe.id}`} className={styles.linkPrimary}>
        Переглянути рецепт
      </Link>
    </section>
  );
};
