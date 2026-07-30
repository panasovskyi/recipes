import { useFormContext } from "react-hook-form";
import styles from "./Radio.module.scss";

type Props = {
  name: string;
  value: string;
};

export const Radio: React.FC<Props> = ({ value, name }) => {
  const { register, formState } = useFormContext();

  return (
    <input
      {...register(name)}
      type="radio"
      value={value}
      className={styles.radio}
      disabled={formState.isSubmitting}
    />
  );
};
