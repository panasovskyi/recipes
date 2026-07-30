export interface InstructionStep {
  id: string;
  stepNumber: number;
  description: string;
  recipeId: string;
}

export type CreateInstructionInput = Omit<InstructionStep, "id" | "recipeId" | "stepNumber">;