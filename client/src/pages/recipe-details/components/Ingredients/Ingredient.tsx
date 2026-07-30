import { CheckboxLabel } from '@/components/ui/molecules/CheckboxLabel';
import styles from './Ingredients.module.scss';

type Props = {
  label: string;
  amount: string;
}

export const Ingredient: React.FC<Props> = ({label, amount}) => {
  return (
    <li  className={styles.ingredientItem}>
      <CheckboxLabel label={label} />
      <span className={styles.ingredientAmount}>
        {amount}
      </span>
    </li>
  )
}