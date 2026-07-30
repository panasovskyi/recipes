import { Request, Response } from "express";
import { recipeService, imageService } from "@/services";
import { CreateRecipeDto, GetRecipesQueryDto } from "@/dtos";
import { ApiError } from "@/exceptions";
import { AuthRequest } from "@/middlewares";

export const recipeController = {
  async create(req: AuthRequest, res: Response) {
    const userId = req.user?.id;

    if (!userId) {
      throw ApiError.unauthorized("Користувач неавторизований");
    }

    let imageUrl: string | null = null;

    if (req.file) {
      imageUrl = await imageService.createImageUrl(req.file.buffer, "recipes");
    }

    const recipeDto = new CreateRecipeDto({
      ...req.body,
      imageUrl,
      userId,
    });

    const newRecipe = await recipeService.create(recipeDto);

    res.status(201).json(newRecipe);
  },

  async getMy(req: AuthRequest, res: Response) {
    const params = new GetRecipesQueryDto(req.query);
    const userId = req.user?.id;

    if (!userId) {
      throw ApiError.unauthorized("Користувач неавторизований");
    }

    const recipes = await recipeService.getMy({params, userId});

    res.status(200).json(recipes)
  },

  async getOne(req: AuthRequest, res: Response) {
    const recipeId = req.params.recipeId;

    const result = await recipeService.getById({
      recipeId: recipeId as string,
      userId: req.user?.id,
    });

    if (!result) {
      throw ApiError.notFound("Рецепт із таким ID не знайдено");
    }
    res.status(200).json(result);
  },

  async getAll(req: AuthRequest, res: Response) {
    const params = new GetRecipesQueryDto(req.query);

    const result = await recipeService.getAll(params);

    res.status(200).json(result);
  },

  async getPopular(req: Request, res: Response) {
    const result = await recipeService.getPopular();

    res.status(200).json(result);
  },

  async getRecipeOfDay(req: Request, res: Response) {
    const recipe = await recipeService.getRecipeOfDay();
    res.status(200).json(recipe);
  },
};
