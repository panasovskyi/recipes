import { useFormContext } from 'react-hook-form';
import styles from "./Button.module.scss";
import { Spinner } from '@/components/ui/atoms/Spinner';

type Props = {
  isActive?: boolean;
  text: React.ReactNode;
  variant: ButtonVariant;
  type?: "submit" | "button";
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  shouldShowSpinner?: boolean;
};

export type ButtonVariant =
  | "btnPrimary"
  | "btnPrint"
  | "btnCancel"
  | "btnLogin"
  | "btnRegistration"
  | "btnCreateRecipe"
  | "btnAdd"
  | "btnRemove"
  | "btnOpen"
  | "btnBack"
  | "btnFilterItem"
  | "resetBtn"
  | "resetBtnLarge"
  | "btnSearch"
  | "btnTag"
  | "btnFind"
  | "btnSave"
  | "btnIcon"
  | "btnLogout"
  | "btnPrev"
  | "btnNext"
  | "btnPage";

export const Button: React.FC<Props> = ({
  text,
  isActive = false,
  variant,
  type = "button",
  onClick,
  disabled = false,
  shouldShowSpinner = true,
}) => {
  const buttonClass = isActive ? styles[variant + "__active"] : styles[variant];
  const formContext = useFormContext();

  const isSubmitting = formContext?.formState?.isSubmitting ?? false;
  const isButtonDisabled = disabled || isSubmitting;
  const canShowSpinner = isButtonDisabled && shouldShowSpinner;

  return (
    <button
      type={type}
      className={buttonClass}
      onClick={onClick}
      disabled={isButtonDisabled}
    >
      {canShowSpinner ? <Spinner /> : text}
    </button>
  );
};