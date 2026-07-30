import { uploadMiddleware } from "@/config/cloudinary";
import { recipeController } from "@/controllers";
import {
  authMiddleware,
  optionalAuthMiddleware,
  parseFormDataJson,
  validate,
} from "@/middlewares";
import { errorCatcher } from "@/utils";
import { createRecipeSchema, getRecipeSchema, getRecipesQuerySchema } from "@/validations";
import { Router } from "express";

export const recipeRouter = Router();
recipeRouter.get(
  "/recipe",
  validate(getRecipesQuerySchema),
  errorCatcher(recipeController.getAll),
);
recipeRouter.get(
  "/recipe/my",
  authMiddleware,
  errorCatcher(recipeController.getMy),
);
recipeRouter.get("/recipe/popular", errorCatcher(recipeController.getPopular));
recipeRouter.get(
  "/recipe/today",
  errorCatcher(recipeController.getRecipeOfDay),
);

recipeRouter.post(
  "/recipe",
  authMiddleware,
  uploadMiddleware.single("image"),
  parseFormDataJson,
  validate(createRecipeSchema),
  errorCatcher(recipeController.create),
);

recipeRouter.get("/recipe/:recipeId", optionalAuthMiddleware, validate(getRecipeSchema) ,errorCatcher(recipeController.getOne));

