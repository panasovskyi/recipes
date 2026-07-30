import { type FieldValues, type Path } from "react-hook-form";
import styles from "./TextLabel.module.scss";
import { Input } from '../../atoms/Input';

type Props<T extends FieldValues = FieldValues> = {
  placeholder?: string;
  label?: string;
  id: string;
  name: Path<T>;
  type?: "number" | "text" | "password";
  disabled?: boolean;
};

export const TextLabel = <T extends FieldValues = FieldValues>({
  placeholder,
  label,
  id,
  name,
  type = "text",
  disabled = false
}: Props<T>) => {
  return (
    <>
      {label && (
        <label className={styles.field__label} htmlFor={id}>
          {label}
        </label>
      )}
      <Input
        name={name as string}
        id={id}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
      />
    </>
  );
};