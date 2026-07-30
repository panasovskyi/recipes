import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import type { AxiosError } from "axios";
import { api } from "@/api";
import type { ServerError } from "@/types/errors";
import type { CreateRecipeFormValues } from "@/types/recipe";
import { createRecipeDefaultValues } from "./default-value";
import { createRecipeShema } from "./schema";

export const useCreateRecipeForm = () => {
  const navigate = useNavigate();

  const methods = useForm<CreateRecipeFormValues>({
    defaultValues: createRecipeDefaultValues,
    resolver: zodResolver(createRecipeShema),
  });

  const {
    setValue,
    setError,
    handleSubmit,
    formState: { isDirty },
  } = methods;

  const selectedMainCategory = useWatch({
    control: methods.control,
    name: "mainCategory",
  });

  useEffect(() => {
    if (isDirty) {
      setValue("subCategory", "");
    }
  }, [selectedMainCategory, setValue, isDirty]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      const formData = new FormData();

      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("mainCategory", data.mainCategory);
      formData.append("cookTime", String(data.cookTime));
      formData.append("prepTime", String(data.prepTime));
      formData.append("servings", String(data.servings));

      if (data.subCategory) {
        formData.append("subCategory", data.subCategory);
      }

      if (data.ingredients) {
        formData.append("ingredients", JSON.stringify(data.ingredients));
      }

      if (data.cookingSteps) {
        formData.append("cookingSteps", JSON.stringify(data.cookingSteps));
      }

      if (data.nutritionalValue) {
        formData.append(
          "nutritionalValue",
          JSON.stringify(data.nutritionalValue),
        );
      }

      if (data.image && data.image.length > 0) {
        formData.append("image", data.image[0]);
      }

      const newRecipe = await api.recipes.create(formData);
      navigate(`/recipes/${newRecipe.id}`);
    } catch (err) {
      const error = err as AxiosError<ServerError>;
      setError("root", {
        message: error.response?.data?.message || "Щось пішло не так",
      });
    }
  });

  return { methods, onSubmit };
};
