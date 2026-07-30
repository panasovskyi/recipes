import { useFormContext, useFieldArray } from "react-hook-form";
import { FormFieldset } from "@/components/ui/molecules/FormFieldset";
import { InstructionStep } from './InstructionStep';
import { Button } from '@/components/ui/atoms/Button';
import type { CreateRecipeFormValues } from '@/types/recipe';

export const InstructionFieldset = () => {
  const { control } = useFormContext<CreateRecipeFormValues>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "cookingSteps",
  });

  return (
    <FormFieldset legend="Інструкція з приготування">
      {fields.map((field, index) => (
        <InstructionStep<CreateRecipeFormValues>
          key={field.id}
          id={`step-description-${index}`}
          name={`cookingSteps.${index}.description` as const}
          placeholder="Опишіть, що саме потрібно зробити на цьому кроці..."
          stepNumber={index + 1}
          showRemoveButton={fields.length > 1}
          onRemove={() => remove(index)}
        />
      ))}

      <Button text='Додати крок' variant="btnAdd" onClick={() => append({ description: "" })} />
    </FormFieldset>
  );
};