import { Link } from "react-router-dom";
import styles from "./RecipesHeader.module.scss";

type Props = {
  count: number | "...";
  currentBreadcrumb: string;
  mainLinkTitle: string;
  mainLinkHref: string;
  title: string;
};

export const RecipesHeader: React.FC<Props> = ({
  count,
  title,
  mainLinkHref,
  mainLinkTitle,
  currentBreadcrumb,
}) => {
  return (
    <header className={styles.header}>
      <div className={styles.breadcrumbs}>
        <Link to={mainLinkHref}>{mainLinkTitle}</Link>
        <span>/</span>
        <span className={styles.currentBreadcrumb}>{currentBreadcrumb}</span>
      </div>

      <h1 className={styles.title}>{title}</h1>
      <p className={styles.countText}>Знайдено рецептів: {count}</p>
    </header>
  );
};
