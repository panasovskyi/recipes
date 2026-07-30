import { FormField } from '@/components/ui/molecules/FormField';
import { FormFieldset } from '@/components/ui/molecules/FormFieldset';
import { TextLabel } from '@/components/ui/molecules/TextLabel';
import type { CreateRecipeFormValues } from '@/types/recipe';

export const QuickInfoFieldset = () => {
  return (
    <FormFieldset legend="Швидка інформація">
      <FormField name="prepTime">
        <TextLabel<CreateRecipeFormValues>
          type="number"
          placeholder="Напр: 15"
          id="prepTime"
          label="Підготовка (хв)"
          name="prepTime"
        />
      </FormField>
      <FormField name="cookTime">
        <TextLabel<CreateRecipeFormValues>
          type="number"
          placeholder="Напр: 35"
          id="cookTime"
          label="Приготування (хв)"
          name="cookTime"
        />
      </FormField>
      <FormField name="servings">
        <TextLabel<CreateRecipeFormValues>
          type="number"
          placeholder="Напр: 4"
          id="servings"
          label="К-ть порцій"
          name="servings"
        />
      </FormField>
    </FormFieldset>
  );
};
