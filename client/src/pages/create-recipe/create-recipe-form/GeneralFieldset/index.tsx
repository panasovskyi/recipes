import { useWatch } from "react-hook-form";
import { FormField } from "@/components/ui/molecules/FormField";
import {
  MainCategories,
  subCategoriesMap,
  type CreateRecipeFormValues,
} from "@/types/recipe";
import { TextLabel } from "@/components/ui/molecules/TextLabel";
import { RadioGroup } from "@/components/ui/molecules/RadioGroup";
import { FormFieldset } from "@/components/ui/molecules/FormFieldset";
import { TextareaLabel } from '@/components/ui/molecules/TextareaLabel';

export const GeneralFieldset: React.FC = () => {
  const selectedMainCategory = useWatch({
    name: "mainCategory",
  });

  return (
    <FormFieldset legend="Основна інформація">
      
      <FormField name="title">
        <TextLabel<CreateRecipeFormValues>
          placeholder="Наприклад: Український борщ"
          id="title"
          label="Назва страви"
          name="title"
        />
      </FormField>

      <FormField name="description">
        <TextareaLabel<CreateRecipeFormValues>
          placeholder="Розкажіть трохи про цю страву..."
          id="description"
          label="Короткий опис"
          name="description"
        />
      </FormField>

      <FormField label="Категорія" name="mainCategory">
        <RadioGroup<CreateRecipeFormValues>
          options={MainCategories.map((cat) => ({
            value: cat.slug,
            label: cat.name,
          }))}
          name="mainCategory"
        />
      </FormField>

      {selectedMainCategory && selectedMainCategory in subCategoriesMap && (
        <FormField label="Оберіть тип страви:" name="subCategory">
          <RadioGroup<CreateRecipeFormValues>
            options={subCategoriesMap[
              selectedMainCategory as keyof typeof subCategoriesMap
            ].map((subCat) => ({ value: subCat.slug, label: subCat.name }))}
            name="subCategory"
          />
        </FormField>
      )}
    </FormFieldset>
  );
};
