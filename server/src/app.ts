import express from 'express';
import cors from 'cors';
import { errorMiddleware } from '@/middlewares';
import { authRouter, recipeRouter, favouriteRouter } from "@/routes";
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

dotenv.config()

const PORT = process.env.PORT || 5000;

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser())

app.use('/api', favouriteRouter);
app.use('/api', recipeRouter);
app.use('/api/auth', authRouter);

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log('Бекенд запустився')
});