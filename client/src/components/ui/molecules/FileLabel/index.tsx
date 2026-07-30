import { useFormContext, type Path } from "react-hook-form";
import styles from "./FileLabel.module.scss";
import type { CreateRecipeFormValues } from '@/types/recipe';

type Props = {
  id: string;
  name: Path<CreateRecipeFormValues>;
  previewUrl: string | null;
};

export const FileLabel: React.FC<Props> = ({
  id,
  name,
  previewUrl
}) => {
  const { register, formState } = useFormContext<CreateRecipeFormValues>();

  return (
    <label htmlFor={id} className={styles.label}>
      <span>{previewUrl ? "Змінити фото" : "Обрати фото рецепта"}</span>
      <input
        {...register(name)}
        type="file"
        id={id}
        className={styles.fileInput}
        disabled={formState.isSubmitting}
      />
    </label>
  );
};