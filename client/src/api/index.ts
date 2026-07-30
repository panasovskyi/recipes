import { authApi } from '@/api/modules/auth-api';
import { recipesApi } from '@/api/modules/recipes-api';

export const api = {
  recipes: recipesApi,
  auth: authApi,
}