import styles from "./Checkbox.module.scss";

type Props = {
  label: string;
}

export const Checkbox: React.FC<Props> = ({ label }) => {
  return (
    <>
      <input type="checkbox" className={styles.checkbox} />
      <span className={styles.label}>{label}</span>
    </>
  );
};
