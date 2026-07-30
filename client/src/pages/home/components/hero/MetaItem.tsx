import styles from './Hero.module.scss';

type Props = {
  label: string;
  value: string;
}

export const MetaItem: React.FC<Props> = ({label, value}) => {
  return (
    <div className={styles.metaItem}>
      <span className={styles.metaLabel}>{label}</span>
      <span className={styles.metaValue}>{value}</span>
    </div>
  )
}