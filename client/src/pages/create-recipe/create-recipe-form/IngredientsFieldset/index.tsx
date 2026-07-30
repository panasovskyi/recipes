import { useFieldArray, useFormContext } from "react-hook-form";
import { IngredientsHeader } from "../IngredientsHeader";
import styles from "./IngredientsFieldset.module.scss";
import { FormFieldset } from "@/components/ui/molecules/FormFieldset";
import { TextLabel } from "@/components/ui/molecules/TextLabel";
import { FormField } from "@/components/ui/molecules/FormField";
import { Button } from '@/components/ui/atoms/Button';
import type { CreateRecipeFormValues } from '@/types/recipe';

export const IngredientsFieldset = () => {
  const { control } = useFormContext<CreateRecipeFormValues>();
  const { append, fields, remove } = useFieldArray({
    control,
    name: "ingredients",
  });
  return (
    <FormFieldset legend="Інгредієнти">
      <IngredientsHeader
        leftLabel="Назва інгредієнта"
        rightLabel="Кількість"
      />

      {fields.map((field, index) => (
        <div key={field.id} className={styles.ingredientRow}>
          <FormField name={`ingredients.${index}.name` as const}>
            <TextLabel<CreateRecipeFormValues>
              placeholder="Наприклад: Борошно"
              name={`ingredients.${index}.name` as const}
              id={`ingredient-name-${index}`}
            />
          </FormField>
          <FormField name={`ingredients.${index}.amount` as const}>
            <TextLabel<CreateRecipeFormValues>
              placeholder="Наприклад: 300 г"
              name={`ingredients.${index}.amount` as const}
              id={`ingredient-amount-${index}`}
            />
          </FormField>
          {fields.length > 1 && (
            <Button text='Видалити' variant="btnRemove" onClick={() => remove(index)} />
          )}
        </div>
      ))}
      <Button text='Додати' variant='btnAdd' onClick={() => append({ name: "", amount: "" })} />
    </FormFieldset>
  );
};
