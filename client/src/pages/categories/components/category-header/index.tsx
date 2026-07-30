import styles from "./CategoryHeader.module.scss";

type Props = {
  title: string;
  subtitle: string;
};

export const CategoryHeader: React.FC<Props> = ({ title, subtitle }) => {
  return (
    <header className={styles.header}>
      <h1 className={styles.header__title}>{title}</h1>
      <p className={styles.header__subtitle}>{subtitle}</p>
    </header>
  );
};
