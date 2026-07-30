export const MainCategories = [
  { slug: "lunch_dinner", name: "Обіди та вечері" },
  { slug: "breakfast", name: "Сніданки" },
  { slug: "drinks", name: "Напої" },
  { slug: "snacks", name: "Перекуси" },
] as const;

export const SubCategories = {
  LunchDinner: [
    { slug: "soups", name: "Супи", placeholder: "🍲" },
    { slug: "lenten_food", name: "Пісна їжа", placeholder: "🥗" },
    { slug: "meat_dishes", name: "Мʼясні страви", placeholder: "🥩" },
    { slug: "salads", name: "Салати", placeholder: "🥬" },
    { slug: "fish", name: "Риба", placeholder: "🐟" },
    { slug: "fast_food", name: "Фастфуд", placeholder: "🍔" },
  ],
  Breakfast: [
    { slug: "sweet", name: "Солодкі", placeholder: "🥞" },
    { slug: "savory", name: "Солоні", placeholder: "🍳" },
  ],
  Snacks: [
    { slug: "sweet", name: "Солодкі", placeholder: "🧇" },
    { slug: "savory", name: "Солоні", placeholder: "🥪" },
  ],
} as const;

export const subCategoriesMap = {
  lunch_dinner: SubCategories.LunchDinner,
  breakfast: SubCategories.Breakfast,
  snacks: SubCategories.Snacks,
} as const;

export const CATEGORIES_WITH_SUBS = MainCategories.map((category) => {
  const sub =
    category.slug in subCategoriesMap
      ? subCategoriesMap[category.slug as keyof typeof subCategoriesMap]
      : [];

  return {
    ...category,
    sub,
  };
});

export type MainCategoryType = (typeof MainCategories)[number]["slug"];

export type SubCategoryType =
  (typeof SubCategories)[keyof typeof SubCategories][number]["slug"];

export type SubCategoryItem =
  (typeof SubCategories)[keyof typeof SubCategories][number];

export type SubCategoryList = readonly SubCategoryItem[];

export type MainCategoryItem = (typeof MainCategories)[number];

// export type MainCategoryList = readonly MainCategoryItem[];

/* export type CategoryWithSubsItem = MainCategoryItem & {
  sub: SubCategoryList | readonly [];
};
 */
// export type CategoriesWithSubsList = CategoryWithSubsItem[];
