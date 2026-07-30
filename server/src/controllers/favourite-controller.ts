import { GetRecipesQueryDto } from "@/dtos";
import { ApiError } from "@/exceptions";
import { AuthRequest } from "@/middlewares";
import { favouriteService } from "@/services";
import { Request, Response } from "express";

export const favouriteController = {
  async toggle(req: AuthRequest, res: Response) {
    const userId = req.user!.id;
    const { recipeId } = req.params;

    const recipe = await favouriteService.toggleFav({
      userId,
      recipeId: recipeId as string,
    });

    res.status(200).json(recipe);
  },

  async get(req: AuthRequest, res: Response) {
    const params = new GetRecipesQueryDto(req.query);
    const userId = req.user?.id;

    if (!userId) {
      throw ApiError.unauthorized("Користувач неавторизований");
    }

    const recipes = await favouriteService.getSaved({ params, userId });

    res.status(200).json(recipes);
  },
};
