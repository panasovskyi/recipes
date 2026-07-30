import { Link } from 'react-router-dom';
import styles from "./RecipeCard.module.scss";
import { useState } from 'react';

type Props = {
  id: string;
  placeholder: string;
  title: string;
  description: string;
  time: number;
  calories: string;
  category: string;
  subcategory: string;
  imageUrl?: string;
};

export const RecipeCard: React.FC<Props> = ({
  id,
  placeholder,
  title,
  description,
  time,
  calories,
  category,
  subcategory,
  imageUrl,
}) => {
  const [imageError, setImageError] = useState(false);
  return (
    <article className={styles.card}>
      <div className={styles.imageWrapper}>
        {imageUrl && !imageError ? (
          <img
            src={imageUrl}
            className={styles.cardImage}
            alt={title}
            onError={() => setImageError(true)}
          />
        ) : (
          placeholder
        )}
      </div>
      <div className={styles.cardBody}>
        <div className={styles.badgeGroup}>
          <span className={styles.badge}>{category}</span>
          {subcategory && <span className={styles.subBadge}>{subcategory}</span>}
        </div>
        <h3 className={styles.cardTitle}>
          <Link to={`/recipes/${id}`} className={styles.stretchedLink}>
            {title}
          </Link>
        </h3>
        <p className={styles.cardDesc}>{description}</p>
        <div className={styles.cardFooter}>
          <span>{`⏱ ${time} хв`}</span>
          <span>{`🔥 ${calories}`}</span>
        </div>
      </div>
    </article>
  );
};
