import React from "react";
import styles from "./Categories.module.scss";
import { CATEGORIES_WITH_SUBS } from "@/types/recipe";
import { CategoryHeader } from "@/pages/categories/components/category-header";
import { CategoryCard } from "@/pages/categories/components/category-card";
import { SubcategoriesList } from "@/pages/categories/components/subcategories-list";
import { getSubCategoryLabel } from '@/pages/categories/format-subcategory-label';

export const CategoriesPage: React.FC = () => {
  return (
    <div className={styles.page}>
      <CategoryHeader
        title="Категорії рецептів"
        subtitle="Обирайте розділ та знаходьте ідеальні страви для будь-якого приводу"
      />

      <div className={styles.categoriesGrid}>
        <CategoryCard
          title="Усі рецепти"
          subtitle="Повний каталог страв"
          mainLinkHref="/recipes"
          mainLinkText="Переглянути всі →"
          description="Шукаєте щось конкретне? Відкрийте повний список усіх рецептів із
            можливістю зручного фільтрування та пошуку."
        />
        {CATEGORIES_WITH_SUBS.map((category) => (
          <CategoryCard
            key={category.slug}
            title={category.name}
            subtitle={getSubCategoryLabel(category.sub.length)}
            mainLinkHref={`/recipes?category=${category.slug}`}
            mainLinkText="Всі рецепти →"
          >
            <SubcategoriesList mainCategory={category.slug} subcategories={category.sub} />
          </CategoryCard>
        ))}
      </div>
    </div>
  );
};
