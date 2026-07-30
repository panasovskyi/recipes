import React from 'react';
import styles from './Spinner.module.scss';

interface SpinnerProps {
  size?: 'sm' | 'md';
  text?: string;
  isFullPage?: boolean;
}

export const Spinner: React.FC<SpinnerProps> = ({
  size = 'sm',
  text,
  isFullPage = false
}) => {
  if (size === 'sm') {
    return <span className={`${styles.spinner} ${styles.sm}`} />;
  }

  return (
    <div className={`${styles.spinnerWrapper} ${isFullPage ? styles.fullPage : ''}`}>
      <span className={`${styles.spinner} ${styles.md}`} />
      {text && <span className={styles.spinnerText}>{text}</span>}
    </div>
  );
};