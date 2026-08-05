import { favouriteController } from "@/controllers";
import { validate } from "@/middlewares";
import { authMiddleware } from "@/middlewares";
import { errorCatcher } from "@/utils";
import { getRecipeSchema, getRecipesQuerySchema } from "@/validations";
import { Router } from "express";

export const favouriteRouter = Router();

favouriteRouter.get(
  "/recipe/saved",
  authMiddleware,
  validate(getRecipesQuerySchema),
  errorCatcher(favouriteController.get),
);

favouriteRouter.post(
  "/recipe/:recipeId/toggle-save",
  authMiddleware,
  validate(getRecipeSchema),
  errorCatcher(favouriteController.toggle),
);
