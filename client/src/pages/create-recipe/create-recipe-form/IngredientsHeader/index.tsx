import styles from './IngredientsHeader.module.scss';

type Props = {
  leftLabel: string;
  rightLabel: string;
}

export const IngredientsHeader: React.FC<Props> = ({ leftLabel, rightLabel }) => {
  return (
    <div className={styles.ingredientsHeader}>
      <span>{leftLabel}</span>
      <span>{rightLabel}</span>
    </div>
  )
}