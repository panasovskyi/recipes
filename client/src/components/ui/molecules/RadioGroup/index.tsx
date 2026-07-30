import type { FieldValues, Path } from 'react-hook-form';
import styles from "./RadioGroup.module.scss";
import { RadioLabel } from '../RadioLabel';

type RadioOption = {
  value: string;
  label: string;
};

type Props<T extends FieldValues = FieldValues> = {
  options: RadioOption[];
  name: Path<T>;
};

export const RadioGroup = <T extends FieldValues = FieldValues>({
  options,
  name
}: Props<T>) => {
  return (
    <div className={styles.radioGroup}>
      {options.map((option) => (
        <RadioLabel<T>
          key={option.value}
          value={option.value}
          radioText={option.label}
          name={name}
        />
      ))}
    </div>
  );
};
