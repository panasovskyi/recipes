import { NextFunction, Request, Response } from "express";

export const parseFormDataJson = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.body) return next();

  const jsonFields = ["nutritionalValue", "ingredients", "cookingSteps"];

  jsonFields.forEach((field) => {
    if (typeof req.body[field] === "string") {
      try {
        req.body[field] = JSON.parse(req.body[field]);
      } catch (err) {}
    }
  });

  /* if (req.body.cookingSteps && !req.body.instructions) {
    req.body.instructions = req.body.cookingSteps;
  } */

  next();
};
