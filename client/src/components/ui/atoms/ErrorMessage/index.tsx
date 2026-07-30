import styles from './ErrorMessage.module.scss';

type Props = {
  message: string | undefined;
}

export const ErrorMessage: React.FC<Props> = ({ message }) => {
  if (!message) return null;

  return (
    <span className={styles.error}>{message}</span>
  )
}