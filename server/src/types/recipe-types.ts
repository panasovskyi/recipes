import { Prisma } from '@prisma/client';

export interface NutritionalValueDto extends Prisma.InputJsonObject {
  calories: number;
  proteins: number;
  fats: number;
  carbohydrates: number;
}

export interface IngredientInput {
  name: string;
  amount: string;
}

export interface InstructionInput {
  description: string;
}
