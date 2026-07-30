import { FormField } from "@/components/ui/molecules/FormField";
import styles from "./SearchForm.module.scss";
import { Input } from "@/components/ui/atoms/Input";
import { Button, type ButtonVariant } from "@/components/ui/atoms/Button";

type Props = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (val: React.SubmitEvent<HTMLFormElement>) => void;
  value: string;
  buttonVariant: ButtonVariant;
  buttonText: string;
  htmlFor: string;
  label: string;
  inputId: string;
  inputName: string;
  inputPlaceholder: string;
};

export const SearchForm: React.FC<Props> = ({
  value,
  onChange,
  onSubmit,
  buttonText,
  buttonVariant,
  htmlFor,
  label,
  inputId,
  inputName,
  inputPlaceholder,
}) => {

  return (
    <form className={styles.searchForm} onSubmit={onSubmit}>
      <FormField label={label} hiddenLabel htmlFor={htmlFor}>
        <Input
          id={inputId}
          name={inputName}
          value={value}
          onChange={onChange}
          placeholder={inputPlaceholder}
        />
      </FormField>
      <Button type="submit" variant={buttonVariant} text={buttonText} />
    </form>
  );
};
