import React from "react";
import styles from "./ErrorState.module.scss";

type ErrorStateProps = {
  title?: string;
  message?: string | null;
  icon?: string;
  retryText?: string;
  onRetry?: () => void;
  compact?: boolean;
  className?: string;
};

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = "Щось пішло не так",
  message = "Виникла помилка під час завантаження даних. Спробуйте оновити сторінку або повторити спробу пізніше.",
  icon = "⚠️",
  retryText = "Спробувати знову",
  onRetry,
  compact = false,
  className = "",
}) => {
  return (
    <div
      className={`${styles.errorState} ${compact ? styles.compact : ""} ${className}`}
      role="alert"
    >
      <div className={styles.icon}>{icon}</div>
      <h3 className={styles.title}>{title}</h3>
      {message && <p className={styles.message}>{message}</p>}

      {onRetry && (
        <button type="button" className={styles.retryBtn} onClick={onRetry}>
          {retryText}
        </button>
      )}
    </div>
  );
};
