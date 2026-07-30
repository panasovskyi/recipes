import { Link } from 'react-router-dom';
import styles from './SubcategoriesList.module.scss';
import type { MainCategoryType, SubCategoryList } from '@/types/recipe';

type Props = {
  subcategories: SubCategoryList;
  mainCategory: MainCategoryType
}

export const SubcategoriesList: React.FC<Props> = ({ subcategories, mainCategory }) => {
  if (subcategories.length === 0) return null;

  return (
    <div className={styles.list}>
      {subcategories.map((subcategory) => (
        <Link
          key={subcategory.slug}
          to={`/recipes?category=${mainCategory}&subCategory=${subcategory.slug}`}
          className={styles.subChip}
        >
          <span className={styles.subName}>{subcategory.name}</span>
          <span className={styles.arrowIcon}>›</span>
        </Link>
      ))}
    </div>
  )
}