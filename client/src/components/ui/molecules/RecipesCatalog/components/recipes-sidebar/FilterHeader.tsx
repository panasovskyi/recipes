import { useSearchParams } from 'react-router-dom';
import { Button } from "@/components/ui/atoms/Button";
import styles from "./RecipesSidebar.module.scss";

type Props = {
  onReset: () => void;
};


export const FilterHeader: React.FC<Props> = ({ onReset }) => {
  const [searchParams] = useSearchParams();

  const hasQueryParams = Array.from(searchParams.keys()).length > 0;

  return (
    <div className={styles.filterHeader}>
      <h3 className={styles.filterHeader__title}>Фільтри</h3>
      {hasQueryParams && (
        <Button
          text={"Скинути все"}
          variant="resetBtn"
          onClick={onReset}
        />
      )}
    </div>
  );
};