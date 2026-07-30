import { type FieldValues, type Path } from "react-hook-form";
import styles from "./TextareaLabel.module.scss";
import { Textarea } from '../../atoms/Textarea';

type Props<T extends FieldValues = FieldValues> = {
  placeholder: string;
  label?: string;
  id: string;
  name: Path<T>;
};

export const TextareaLabel = <T extends FieldValues = FieldValues>({
  placeholder,
  label,
  id,
  name,
}: Props<T>) => {
  return (
    <>
      {label && (
        <label className={styles.field__label} htmlFor={id}>
          {label}
        </label>
      )}
      <Textarea name={name as string} id={id} placeholder={placeholder} />
    </>
  );
};
