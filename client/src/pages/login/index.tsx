import { LoginForm } from '@/pages/login/LoginForm';
import styles from "./Login.module.scss";

export const LoginPage = () => {

  return (
    <div className={styles.page}>
      <h1 className={styles.page__title}>Авторизація</h1>
      <LoginForm />
    </div>
  );
};
