import { mainApi } from "@/api/instances";
import type { Recipe, RecipeQueryParams } from "@/types/recipe";

export const recipesApi = {
  async getOne(recipeId: string): Promise<Recipe> {
    const res = await mainApi.get<Recipe>(`/recipe/${recipeId}`);
    return res.data;
  },

  async getAll(params?: RecipeQueryParams): Promise<Recipe[]> {
    const res = await mainApi.get<Recipe[]>("/recipe", {
      params,
    });

    return res.data;
  },

  async getPopular(params?: RecipeQueryParams): Promise<Recipe[]> {
    const res = await mainApi.get<Recipe[]>("recipe/popular", {
      params,
    });

    return res.data;
  },

  async getTopOfDay(): Promise<Recipe> {
    const res = await mainApi.get<Recipe>("/recipe/today");
    return res.data;
  },

  async create(payload: FormData): Promise<Recipe> {
    const res = await mainApi.post<Recipe>("/recipe", payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  },

  async toggleSaved(recipeId: string) {
    const res = await mainApi.post(`/recipe/${recipeId}/toggle-save`);

    return res.data;
  },

  async getFav(params?: RecipeQueryParams): Promise<Recipe[]> {
    const res = await mainApi.get<Recipe[]>("/recipe/saved", {
      params
    });

    return res.data;
  },

  async getMy(params?: RecipeQueryParams): Promise<Recipe[]> {
    const res = await mainApi.get("/recipe/my", {
      params
    });

    return res.data;
  },
};
