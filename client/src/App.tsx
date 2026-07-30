import { Route, Routes } from "react-router-dom";
import { CreateRecipePage } from "@/pages/create-recipe";
import { RegistrationPage } from '@/pages/registration';
import { RecipeDetailsPage } from '@/pages/recipe-details';
import { CategoriesPage } from '@/pages/categories';
import { HomePage } from '@/pages/home';
//import { RecipesPage } from '@/pages/recipes';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { LoginPage } from '@/pages/login';
import { useAppDispatch } from '@/store';
import { useEffect, useRef } from 'react';
import { api } from '@/api';
import { setCredentials, setLoading } from '@/store/slices';
import { ProfilePage } from '@/pages/profile';
import { PublicOnlyRoute } from '@/components/routes';
import { ProtectedRoute } from '@/components/routes';
import styles from './App.module.scss';
import { ProfileFavoritesPage } from '@/pages/fav-recipes';
import { RecipesPage } from '@/pages/recipes';
import { ProfileMyRecipesPage } from '@/pages/my-recipes';

function App() {
  const dispatch = useAppDispatch();
  const hasCheckedAuth = useRef(false);

  useEffect(() => {
    if (hasCheckedAuth.current) return;
    hasCheckedAuth.current = true;

    const checkAuth = async () => {
      try {
        const data = await api.auth.refresh();
        dispatch(setCredentials(data));
      } catch {
        dispatch(setLoading(false));
      }
    };

    checkAuth();
  }, [dispatch]);

  return (
    <div className={styles.appLayout}>
      <Header />

      <main className={styles.mainContent}>
        <Routes>
          {/* 🌍 1. ЗАГАЛЬНОДОСТУПНІ РОУТИ (Доступні всім) */}
          <Route path="/" element={<HomePage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/categories/:categorySlug" element={<CategoriesPage />} />
          <Route path="/recipes" element={<RecipesPage />} />
          <Route path="/recipes/:recipeId" element={<RecipeDetailsPage />} />

          {/* 🚫 2. РОУТИ ТІЛЬКИ ДЛЯ ГОСТЕЙ (Недоступні, якщо залогінений) */}
          <Route element={<PublicOnlyRoute />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/registration" element={<RegistrationPage />} />
          </Route>

          {/* 🔒 3. ПРИВАТНІ РОУТИ (Тільки для залогінених) */}
          <Route element={<ProtectedRoute />}>
            <Route path="/create-recipe" element={<CreateRecipePage />} />

            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/profile/saved-recipes" element={<ProfileFavoritesPage />} />
            <Route path="/profile/my-recipes" element={<ProfileMyRecipesPage />} />
            {/* <Route path="/profile/settings" element={<ProfileSettingsPage />} />
            <Route path="/profile/my-recipes" element={<MyRecipesPage />} /> */}
          </Route>

          <Route path="*" element={<div>Сторінку не знайдено (404)</div>} />
        </Routes>
      </main>

   <Footer />
    </div>
  );
}

export default App;