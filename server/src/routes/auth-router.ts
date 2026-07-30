import { authController } from '@/controllers';
import { validate } from '@/middlewares';
import { errorCatcher } from '@/utils';
import { loginSchema, registerSchema } from "@/validations";
import { Router } from 'express';

export const authRouter = Router();

authRouter.post(
  "/register",
  validate(registerSchema),
  errorCatcher(authController.register),
);

authRouter.post(
  "/login",
   validate(loginSchema),
  errorCatcher(authController.login),
);

authRouter.get("/refresh", errorCatcher(authController.refresh));
authRouter.post("/logout", errorCatcher(authController.logout));