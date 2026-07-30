import { FormField } from "@/components/ui/molecules/FormField";
import { FormFieldset } from "@/components/ui/molecules/FormFieldset";
import { TextLabel } from "@/components/ui/molecules/TextLabel";
import type { CreateRecipeFormValues } from '@/types/recipe';

export const NutritionalFieldset: React.FC = () => {
  return (
    <FormFieldset legend="Харчова цінність (на 100 г)">
      <FormField name="nutritionalValue.calories">
        <TextLabel<CreateRecipeFormValues>
          id="calories"
          type="number"
          name="nutritionalValue.calories"
          label="Калорійність"
          placeholder="ккал"
        />
      </FormField>
      <FormField name="nutritionalValue.proteins">
        <TextLabel<CreateRecipeFormValues>
          id="proteins"
          type="number"
          name="nutritionalValue.proteins"
          label="Білки"
          placeholder="г"
        />
      </FormField>
      <FormField name="nutritionalValue.fats">
        <TextLabel<CreateRecipeFormValues>
          id="fats"
          type="number"
          name="nutritionalValue.fats"
          label="Жири"
          placeholder="г"
        />
      </FormField>
      <FormField name="nutritionalValue.carbohydrates">
        <TextLabel<CreateRecipeFormValues>
          id="carbohydrates"
          type="number"
          name="nutritionalValue.carbohydrates"
          label="Вуглеводи"
          placeholder="г"
        />
      </FormField>
    </FormFieldset>
  );
};
