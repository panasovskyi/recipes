import React from "react";
import { get, useFormContext, useFormState, type Control, type FieldValues } from "react-hook-form";
import { ErrorMessage } from "../../atoms/ErrorMessage";
import styles from "./FormField.module.scss";

type Props = {
  label?: string;
  name?: string;
  error?: string;
  htmlFor?: string;
  children: React.ReactNode;
  hiddenLabel?: boolean;
};

const HookFormError: React.FC<{ name: string }> = ({ name }) => {
  const formContext = useFormContext();

  if (!formContext) return null;

  return <HookFormErrorContent name={name} control={formContext.control} />;
};

const HookFormErrorContent: React.FC<{ name: string; control: Control<FieldValues> }> = ({
  name,
  control,
}) => {
  const { errors } = useFormState({ control, name });
  const error = get(errors, name);
  const errorMessage = error?.message as string | undefined;

  return <ErrorMessage message={errorMessage} />;
};

export const FormField: React.FC<Props> = ({
  label,
  children,
  name,
  error: directError,
  htmlFor,
  hiddenLabel = false,
}) => {
  return (
    <div className={styles.field}>
      {label && (
        <label
          htmlFor={htmlFor}
          className={`${styles.field__label} ${
            hiddenLabel ? styles.visuallyHidden : ""
          }`}
        >
          {label}
        </label>
      )}

      {children}

      {directError && <ErrorMessage message={directError} />}

      {!directError && name && <HookFormError name={name} />}
    </div>
  );
};
