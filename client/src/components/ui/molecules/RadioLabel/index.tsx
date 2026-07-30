import { type FieldValues, type Path } from "react-hook-form";
import styles from "./RadioLabel.module.scss";
import { Radio } from '../../atoms/Radio';

type Props<T extends FieldValues = FieldValues> = {
  name: Path<T>;
  radioText: string;
  value: string;
};

export const RadioLabel = <T extends FieldValues = FieldValues>({
  value,
  radioText,
  name
}: Props<T>) => {
  return (
    <label className={styles.radioLabel}>
      <Radio name={name as string} value={value} />
      <span className={styles.option}>{radioText}</span>
    </label>
  );
};