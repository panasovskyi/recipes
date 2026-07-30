import { Link } from "react-router-dom";
import styles from "./Registration.module.scss";

export const RegistrationSuccess = () => {
  return (
    <div className={styles.success}>
      <span className={styles.icon}>
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M7 14.5 11.5 19 21 9"
            stroke="#fff"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>

      <h1 className={styles.title}>Реєстрація пройшла успішно</h1>
      <p className={styles.subtitle}>
        Тепер ви можете увійти у свій акаунт і почати додавати рецепти.
      </p>

      <Link to="/login" className={styles.loginBtn}>
        Увійти
      </Link>
    </div>
  );
};