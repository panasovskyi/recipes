import type { RecipeAuthor } from '@/types/auth';
import styles from './Overview.module.scss';

type Props = {
  user: RecipeAuthor;
}

export const AuthorCard: React.FC<Props> = ({user}) => {
  return (
    <div className={styles.authorCard}>
      <div className={styles.authorAvatar}>
        {user.login.charAt(0).toUpperCase()}
      </div>
      <div className={styles.authorInfo}>
        <span className={styles.authorName}>{user.login}</span>
      </div>
    </div>
  )
}