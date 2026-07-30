import { Button } from "@/components/ui/atoms/Button";
import styles from "./HomeSearch.module.scss";
import { POPULAR_TAGS } from '@/pages/home/components/home-search/constants';
import { useNavigate } from 'react-router-dom';


export const Tags: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.tags}>
      <span className={styles.tagsLabel}>Популярні теги:</span>

      {POPULAR_TAGS.map((tag) => {
        return (
          <Button
            key={tag.endpoint}
            variant="btnTag"
            text={tag.tagLabel}
            onClick={() => navigate(tag.endpoint)}
          />
        );
      })}
    </div>
  );
};
