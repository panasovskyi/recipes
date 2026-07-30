import { useFormContext } from "react-hook-form";
import styles from "./Input.module.scss";

type Props = {
  placeholder?: string;
  id: string;
  name: string;
  type?: "number" | "text" | "password" | "email";
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;

};

export const Input: React.FC<Props> = ({
  name,
  placeholder,
  id,
  type = "text",
  value,
  onChange, 
  disabled
}) => {

  const formContext = useFormContext();
  const isControlled = value !== undefined || onChange !== undefined;
  const rhfProps = !isControlled && formContext ? formContext.register(name) : {};
  const controlledProps = isControlled ? { value, onChange } : {}

  return (
    <input
      {...rhfProps}
      className={styles.input}
      id={id}
      name={name}
      type={type}
      placeholder={placeholder}
      {...controlledProps}
      disabled={disabled || formContext?.formState.isSubmitting}
    />
  );
};