import { Button } from "@/components/ui/atoms/Button";
import styles from "./RecipesSidebar.module.scss";

type Props = {
  onReset: () => void;
};

export const FilterHeader: React.FC<Props> = ({ onReset }) => {
  return (
    <div className={styles.filterHeader}>
      <h3 className={styles.filterHeader__title}>Фільтри</h3>
      <Button
        text={"Скинути все"}
        variant="resetBtn"
        onClick={() => onReset()}
      />
    </div>
  );
};
