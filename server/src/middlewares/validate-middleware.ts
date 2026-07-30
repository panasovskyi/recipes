import { ApiError } from "@/exceptions";
import { NextFunction, Request, Response } from "express";
import z from "zod";

type RequestSchema = z.ZodTypeAny;

export const validate = (schema: RequestSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsed = await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      if (parsed && typeof parsed === "object") {
        if ("body" in parsed) req.body = parsed.body;
        if ("params" in parsed) Object.assign(req.params, parsed.params);
        if ("query" in parsed) Object.assign(req.query, parsed.query);
      }

      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return next(ApiError.badRequest(error.issues[0].message));
      }

      next(error);
    }
  };
};
