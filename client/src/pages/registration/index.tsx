import { useState } from "react";
import styles from "./Registration.module.scss";
import { RegistrationSuccess } from '@/pages/registration/RegistrationSuccess';
import { RegistrationForm } from '@/pages/registration/RegistrationForm';

export const RegistrationPage = () => {
  const [isSuccess, setIsSuccess] = useState(false);

  return (
    <div className={styles.page}>
      {isSuccess ? (
        <RegistrationSuccess />
      ) : (
        <>
          <h1 className={styles.page__title}>Реєстрація</h1>
          <RegistrationForm onSuccess={() => setIsSuccess(true)} />
        </>
      )}
    </div>
  );
};