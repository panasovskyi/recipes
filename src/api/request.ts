import axios from "axios";
import { Recipe } from '../types/recipe';

const BASE_URL = "http://localhost:1111";

const create = async (newRecipe: Recipe) => {
  const res = await axios.post(
    "http://localhost:1111/recipes/create",
    newRecipe
  );

  return res.data;
};

const getAll = async () => {
  const res = await axios.get("http://localhost:1111/recipes");

  return res.data;
}

export const recipeService = {
  create,
  getAll,
};