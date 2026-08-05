import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Profile.module.scss";
import { ProfileSidebar } from "@/pages/profile/components/profile-sidebar";
import { ProfileRecipesSection } from "@/pages/profile/components/profile-recipes-section";
import { useAppDispatch, useAppSelector } from "@/store";
import { fetchFav, fetchMy } from "@/store/slices";
import { useRecipesFilters } from '@/hooks/use-recipe-filters';

export const ProfilePage = () => {
  const navigate = useNavigate();
  const favRecipes = useAppSelector((state) => state.recipes.fav);
  const myRecipes = useAppSelector((state) => state.recipes.my);
  const dispatch = useAppDispatch();
   const { category, subCategory, sort, search } =
      useRecipesFilters();

  useEffect(() => {
    dispatch(fetchMy({category, subCategory, sort, search}));
    dispatch(fetchFav({category, subCategory, sort, search}));
  }, [dispatch, category, subCategory, sort, search]);

  return (
    <div className={styles.page}>
      <ProfileSidebar />

      <div className={styles.content}>
        <ProfileRecipesSection
          totalResults={myRecipes.totalResults}
          title="Мої рецепти"
          recipes={myRecipes.recipes}
          isLoading={myRecipes.isLoading}
          error={myRecipes.error}
          viewAllTo="/profile/my-recipes"
          emptyTitle="Ви ще не додали жодного рецепта"
          emptyText="Поділіться своїм фірмовим рецептом — це займе кілька хвилин."
          emptyButtonText="Додати рецепт"
          onEmptyButtonClick={() => navigate("/create-recipe")}
        />

        <ProfileRecipesSection
          totalResults={favRecipes.totalResults}
          title="Обрані рецепти"
          recipes={favRecipes.recipes}
          isLoading={favRecipes.isLoading}
          error={favRecipes.error}
          viewAllTo="/profile/saved-recipes"
          emptyTitle="Список обраного порожній"
          emptyText="Тисніть на рецептах, які захочете зберегти на потім."
          emptyButtonText="Переглянути рецепти"
          onEmptyButtonClick={() => navigate("/recipes")}
        />
      </div>
    </div>
  );
};