import { Link } from "react-router-dom";
import styles from "./Logo.module.scss";

export const Logo = () => {
  return (
    <Link to="/" className={styles.logo} aria-label="Смакота — на головну">
      <span className={styles.mark}>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 1v5a1.3 1.3 0 0 0 1.3 1.3V17" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" />
          <path d="M4 1v3.2M6 1v3.2" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" />
          <path
            d="M13 1c-1.1 0-2 1.3-2 3.4 0 1.5.6 2.6 1.5 3.1L12.2 17"
            stroke="#fff"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className={styles.wordmark}>
        Смак<span className={styles.accent}>ота</span>
      </span>
    </Link>
  );
};