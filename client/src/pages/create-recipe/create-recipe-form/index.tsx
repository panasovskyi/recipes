import { FormProvider } from "react-hook-form";
import { GeneralFieldset } from "./GeneralFieldset";
import { IngredientsFieldset } from "./IngredientsFieldset";
import { InstructionFieldset } from "./InstructionFieldset";
import { QuickInfoFieldset } from "./QuickInfoFieldset";
import { NutritionalFieldset } from "./NutritionalFieldset";
import { ImageUploadFieldset } from "./ImageUploadFieldset";
import { ErrorMessage } from "@/components/ui/atoms/ErrorMessage";
import { useCreateRecipeForm } from "./use-create-recipe-form";
import styles from "./CreateRecipeForm.module.scss";
import { Button } from '@/components/ui/atoms/Button';

export const CreateRecipeForm = () => {
  const { methods, onSubmit } = useCreateRecipeForm();
  const {
    formState: { errors, isSubmitting },
  } = methods;

  return (
    <FormProvider {...methods}>
      <form className={styles.page__form} onSubmit={onSubmit}>
        <GeneralFieldset />
        <IngredientsFieldset />
        <InstructionFieldset />
        <QuickInfoFieldset />
        <NutritionalFieldset />
        <ImageUploadFieldset />

        <Button
          disabled={isSubmitting}
          type="submit"
          text="Створити рецепт"
          variant="btnCreateRecipe"
        />

        {errors.root?.message && <ErrorMessage message={errors.root.message} />}
      </form>
    </FormProvider>
  );
};