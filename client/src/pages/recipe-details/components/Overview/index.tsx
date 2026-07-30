import type { RecipeAuthor } from '@/types/auth';
import { AuthorCard } from "./AuthorCard";
import { CategoryLabel } from "./CategoryLabel";
import styles from "./Overview.module.scss";

type Props = {
  category: string;
  subcategory: string;
  title: string;
  description: string;
  user: RecipeAuthor;
};

export const Overview: React.FC<Props> = ({
  category,
  subcategory,
  title,
  description,
  user,
}) => {
  return (
    <div className={styles.overview}>
      <CategoryLabel category={category} subcategory={subcategory} />

      <h1 className={styles.title}>{title}</h1>

      <AuthorCard user={user} />

      <p className={styles.description}>{description}</p>
    </div>
  );
};
