import { Link } from "react-router-dom";
import styles from "./CategoryCard.module.scss";

type Props = {
  title: string;
  subtitle: string;
  mainLinkHref: string;
  mainLinkText: string;
  description?: string;
  children?: React.ReactNode;
};

export const CategoryCard: React.FC<Props> = ({
  title,
  subtitle,
  mainLinkHref,
  mainLinkText,
  description,
  children
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.card__header}>
        <div className={styles.card__titleWrapper}>
          <h2 className={styles.card__title}>{title}</h2>
          <span className={styles.card__subtitle}>{subtitle}</span>
        </div>

        <Link to={mainLinkHref} className={styles.mainCategoryLink}>
          {mainLinkText}
        </Link>
      </div>

      {description && (
        <p className={styles.card__description}>
          {description}
        </p>
      )}

      {children && children}
    </div>
  );
};
