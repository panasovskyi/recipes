import styles from './Ingredients.module.scss';

type Props = {
  label: string;
  value: string;
}

export const NutrientCard: React.FC<Props> = ({ label , value}) => {
  return (
    <div className={styles.nutrientCard}>
      <span className={styles.nutrientLabel}>{label}</span>
      <span className={styles.nutrientValue}>{value}</span>
    </div>
  )
}