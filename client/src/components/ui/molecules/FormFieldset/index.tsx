import styles from './FormFieldset.module.scss';

type Props = {
  legend: string;
  children: React.ReactNode;
}

export const FormFieldset: React.FC<Props> = ({ legend, children }) => {
  return (
    <fieldset className={styles.fieldset}>
      <legend className={styles.fieldset__legend}>{legend}</legend>
      {children}
    </fieldset>
  )
}