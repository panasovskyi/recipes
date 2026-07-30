import { Checkbox } from '@/components/ui/atoms/Checkbox';
import styles from './CheckboxLabel.module.scss';

type Props = {
  label: string;
}

export const CheckboxLabel: React.FC<Props> = ({ label }) => {
  return (
    <label className={styles.checkboxLabel}>
      <Checkbox label={label} />
    </label>
  )
}