import { type FieldValues, type Path } from "react-hook-form";
import styles from "./InstructionFieldset.module.scss";
import { FormField } from '@/components/ui/molecules/FormField';
import { TextareaLabel } from '@/components/ui/molecules/TextareaLabel';
import { Button } from '@/components/ui/atoms/Button';

type Props<T extends FieldValues = FieldValues> = {
  id: string;
  name: Path<T>;
  stepNumber: number;
  placeholder: string;
  onRemove?: () => void;
  showRemoveButton: boolean;
};

export const InstructionStep = <T extends FieldValues = FieldValues>({
  id,
  name,
  stepNumber,
  placeholder,
  onRemove,
  showRemoveButton,
}: Props<T>) => {
  return (
    <div className={styles.step}>
      <span className={styles.step__number}>{stepNumber}.</span>

      <FormField name={name as string}>
        <TextareaLabel<T>
          id={id}
          name={name}
          placeholder={placeholder}
          aria-label={`Опис кроку приготування №${stepNumber}`}
        />
      </FormField>

      {showRemoveButton && onRemove && (
        <Button text="Видалити" variant="btnRemove" onClick={onRemove} />
      )}
    </div>
  );
};
