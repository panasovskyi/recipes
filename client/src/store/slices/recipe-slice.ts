import { api } from "@/api";
import type { ServerError } from "@/types/errors";
import type { Recipe, RecipeQueryParams } from "@/types/recipe";
import type { RecipeResponse } from '@/types/recipe/Response';
import {
  createAsyncThunk,
  createSlice,
  type ActionReducerMapBuilder,
  type AsyncThunk,
} from "@reduxjs/toolkit";
import { AxiosError } from "axios";

type RecipeCategory = {
  isLoading: boolean;
  error: string | null;
  recipes: Recipe[];
  totalResults: number;
  totalPages: number;
  limit: number;
  page: number;
};

type SingleRecipe = {
  isLoading: boolean;
  error: string | null;
  recipe: Recipe | null;
};

const recipe: SingleRecipe = {
  isLoading: false,
  error: null,
  recipe: null,
};

const recipeCategory: RecipeCategory = {
  isLoading: false,
  error: null,
  recipes: [],
  totalResults: 0,
  totalPages: 1,
  limit: 1,
  page: 1,
};

type InitialState = {
  allRecipes: RecipeCategory;
  fav: RecipeCategory;
  my: RecipeCategory;
  popularRecipes: RecipeCategory;
  topOfDay: SingleRecipe;
  recipe: SingleRecipe;
};

const initialState: InitialState = {
  allRecipes: { ...recipeCategory },
  fav: { ...recipeCategory },
  my: { ...recipeCategory },
  popularRecipes: { ...recipeCategory },
  topOfDay: { ...recipe },
  recipe: { ...recipe },
};

const getRejectMessage = (err: unknown) => {
  const error = err as AxiosError<ServerError>;

  if (error.response?.data) {
    const { status, message } = error.response.data;
    return `Помилка ${status}. ${message}`;
  }

  return "Щось пішло не так";
};

export const fetchRecipes = createAsyncThunk<
  RecipeResponse,
  RecipeQueryParams,
  { rejectValue: string }
>("recipes/all", async (params, thunkAPI) => {
  try {
    const res = await api.recipes.getAll(params);
    return res;
  } catch (err: unknown) {
    return thunkAPI.rejectWithValue(getRejectMessage(err));
  }
});

export const fetchPopularRecipes = createAsyncThunk<
  RecipeResponse,
  RecipeQueryParams,
  { rejectValue: string }
>("recipes/popular", async (params, thunkAPI) => {
  try {
    const res = await api.recipes.getPopular(params);
    return res;
  } catch (err: unknown) {
    return thunkAPI.rejectWithValue(getRejectMessage(err));
  }
});

export const fetchTopOfDay = createAsyncThunk<
  Recipe,
  void,
  { rejectValue: string }
>("fetch/top", async (_, thunkAPI) => {
  try {
    const res = await api.recipes.getTopOfDay();
    return res;
  } catch (err: unknown) {
    return thunkAPI.rejectWithValue(getRejectMessage(err));
  }
});

export const fetchRecipe = createAsyncThunk<
  Recipe,
  string,
  { rejectValue: string }
>("recipe/details", async (recipeId, thunkAPI) => {
  try {
    const res = await api.recipes.getOne(recipeId);
    return res;
  } catch (err: unknown) {
    return thunkAPI.rejectWithValue(getRejectMessage(err));
  }
});

export const fetchFav = createAsyncThunk<
  RecipeResponse,
  RecipeQueryParams,
  { rejectValue: string }
>("recipes/fav", async (params, thunkAPI) => {
  try {
    const res = await api.recipes.getFav(params);
    return res;
  } catch (err: unknown) {
    return thunkAPI.rejectWithValue(getRejectMessage(err));
  }
});

export const fetchMy = createAsyncThunk<
  RecipeResponse,
  RecipeQueryParams,
  { rejectValue: string }
>("recipes/my", async (params, thunkAPI) => {
  try {
    const res = await api.recipes.getMy(params);
    return res;
  } catch (err: unknown) {
    return thunkAPI.rejectWithValue(getRejectMessage(err));
  }
});

export const addListCases = <
  K extends "allRecipes" | "fav" | "my" | "popularRecipes",
  Arg,
>(
  builder: ActionReducerMapBuilder<InitialState>,
  thunk: AsyncThunk<RecipeResponse, Arg, { rejectValue: string }>,
  key: K,
) => {
  builder
    .addCase(thunk.pending, (state) => {
      state[key].isLoading = true;
      state[key].error = null;
    })
    .addCase(thunk.rejected, (state, action) => {
      state[key].isLoading = false;
      state[key].error = action.payload || "Щось пішло не так";
    })
    .addCase(thunk.fulfilled, (state, action) => {
      state[key].isLoading = false;
      state[key].recipes = action.payload.results;
      state[key].totalResults = action.payload.totalResults;
      state[key].totalPages = action.payload.totalPages;
      state[key].limit = action.payload.limit;
      state[key].page = action.payload.page;
    });
};

export const addSingleCases = <K extends "topOfDay" | "recipe", Arg>(
  builder: ActionReducerMapBuilder<InitialState>,
  thunk: AsyncThunk<Recipe, Arg, { rejectValue: string }>,
  key: K,
) => {
  builder
    .addCase(thunk.pending, (state) => {
      state[key].isLoading = true;
      state[key].error = null;
    })
    .addCase(thunk.rejected, (state, action) => {
      state[key].isLoading = false;
      state[key].error = action.payload || "Щось пішло не так";
    })
    .addCase(thunk.fulfilled, (state, action) => {
      state[key].isLoading = false;
      state[key].recipe = action.payload;
    });
};

const slice = createSlice({
  name: "recipes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    addListCases(builder, fetchRecipes, "allRecipes");
    addListCases(builder, fetchPopularRecipes, "popularRecipes");
    addListCases(builder, fetchFav, "fav");
    addListCases(builder, fetchMy, "my");
    addSingleCases(builder, fetchTopOfDay, "topOfDay");
    addSingleCases(builder, fetchRecipe, "recipe");
  },
});

export const recipeSlice = slice.reducer;
