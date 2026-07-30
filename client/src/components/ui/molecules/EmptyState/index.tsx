import { Button } from '@/components/ui/atoms/Button';
import styles from './EmptyState.module.scss';

type Props = {
  onClick?: () => void;
  buttonText?: string;
  title?: string;
  text?: string;
}

export const EmptyState: React.FC<Props> = ({ onClick, buttonText, title, text}) => {
  return (
    <div className={styles.emptyState}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.text}>{text}</p>
      {onClick && buttonText && (
        <Button
          text={buttonText}
          variant="resetBtnLarge"
          onClick={() => onClick()}
        />
      )}
    </div>
  )
}