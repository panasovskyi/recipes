import styles from "./Overview.module.scss";

type Props = {
  category: string;
  subcategory: string;
};

export const CategoryLabel: React.FC<Props> = ({ category, subcategory }) => {

  return (
    <span className={styles.category}>
      {category}
      {subcategory && ` · ${subcategory}`}
    </span>
  );
};
