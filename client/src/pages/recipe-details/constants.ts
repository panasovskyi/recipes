import type { Recipe } from '@/types/recipe';

export const getQuickInfo = (data: Recipe) => [
  { id: 1, label: "Час підготовки", value: `${data.prepTime || 0} хв` },
  { id: 2, label: "Час приготування", value: `${data.cookTime || 0} хв` },
  { id: 3, label: "Кількість порцій", value: String(data.servings || 0) },
];

export const getNutritionalValues = (data: Recipe) => [
  {
    id: 1,
    label: "ккал",
    value: String(data.nutritionalValue?.calories || 0),
  },
  {
    id: 2,
    label: "Білки",
    value: `${data.nutritionalValue?.proteins || 0}г`,
  },
  { id: 3, label: "Жири", value: `${data.nutritionalValue?.fats || 0}г` },
  {
    id: 4,
    label: "Вуглеводи",
    value: `${data.nutritionalValue?.carbohydrates || 0}г`,
  },
];
