import type { MainCategoryType, SubCategoryType } from "@/types/recipe";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDebounce } from "use-debounce";

export const useRecipesFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const category = searchParams.get("category") as MainCategoryType;
  const subCategory = searchParams.get("subCategory") as SubCategoryType;
  const sort = searchParams.get("sort") as string;
  const ingredients = searchParams.get("ingredients") as string;
  const searchFromUrl = searchParams.get("search") ?? "";
  const maxTime = searchParams.get("maxTime") as string;
  const maxCalories = searchParams.get("calories") as string;

  // 💡 Читаємо page з URL для повернення з хука
  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;

  const [searchInput, setSearchInput] = useState(
    () => searchParams.get("search") ?? "",
  );

  const [prevSearchFromUrl, setPrevSearchFromUrl] = useState(searchFromUrl);
  if (searchFromUrl !== prevSearchFromUrl) {
    setPrevSearchFromUrl(searchFromUrl);
    setSearchInput(searchFromUrl);
  }

  const [debouncedValue] = useDebounce(searchInput, 1000);

  const updateParams = (
    updates: Record<string, string | null | undefined>,
    options?: { replace?: boolean },
  ) => {
    const params = new URLSearchParams(searchParams);

    // 💡 АВТОМАТИЧНЕ СКИДАННЯ СТОРІНКИ:
    // Якщо оновлюються будь-які фільтри і параметр 'page' не передано явно,
    // видаляємо 'page' з URL (що дорівнює поверненню на 1 сторінку).
    if (!("page" in updates)) {
      params.delete("page");
    }

    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    setSearchParams(params, options);
  };

  const selectCategory = (slug: MainCategoryType) => {
    updateParams({ category: slug, subCategory: null });
  };

  const resetCategory = () => {
    updateParams({ category: null, subCategory: null });
  };

  const selectSubcategory = (slug: SubCategoryType) => {
    updateParams({ subCategory: slug });
  };

  const resetSubcategory = () => {
    updateParams({ subCategory: null });
  };

  const handleFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateParams({ sort: e.target.value });
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchInput(value);

    updateParams({ search: value.trim() ? value : null }, { replace: true });
  };

  const resetAll = () => setSearchParams({});

  return {
    category,
    subCategory,
    sort,
    search: debouncedValue,
    searchInput,
    ingredients,
    maxTime,
    maxCalories,
    page,

    selectCategory,
    resetCategory,
    selectSubcategory,
    resetSubcategory,
    resetAll,

    handleFilter,
    handleSearch,
  };
};
