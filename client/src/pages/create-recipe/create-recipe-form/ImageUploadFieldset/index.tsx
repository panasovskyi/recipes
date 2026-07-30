import { useMemo } from "react";
import styles from "./ImageUploadFieldset.module.scss";
import { useWatch } from "react-hook-form";
import { FormFieldset } from '@/components/ui/molecules/FormFieldset';
import { FormField } from '@/components/ui/molecules/FormField';
import { FileLabel } from '@/components/ui/molecules/FileLabel';

export const ImageUploadFieldset = () => {
  const image = useWatch({ name: "image" });

  const previewUrl = useMemo(() => {
    if (image && image instanceof FileList && image.length > 0) {
      return URL.createObjectURL(image[0]);
    }
    return null;
  }, [image]);

  return (
    <FormFieldset legend="Зображення">
      <FormField name="image">
        <div className={styles.uploadContainer}>
          {previewUrl && (
            <img
              src={previewUrl}
              alt="Прев'ю рецепта"
              className={styles.previewImage}
            />
          )}
          <FileLabel previewUrl={previewUrl} name="image" id="image" />
        </div>
      </FormField>
    </FormFieldset>
  );
};
