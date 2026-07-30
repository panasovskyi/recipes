import { FormProvider, useForm } from "react-hook-form";
import type { RegisterFormValues } from "../../types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "./schema";
import type { AxiosError } from "axios";
import type { ServerError } from "@/types/errors";
import { FormField } from '@/components/ui/molecules/FormField';
import { TextLabel } from '@/components/ui/molecules/TextLabel';
import { Button } from '@/components/ui/atoms/Button';
import { ErrorMessage } from '@/components/ui/atoms/ErrorMessage';
import styles from './Registration.module.scss';
import { api } from '@/api';

type Props = {
  onSuccess: (val: boolean) => void;
}

export const RegistrationForm: React.FC<Props> = ({ onSuccess }) => {
  const methods = useForm<RegisterFormValues>({
    defaultValues: {
      login: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },

    resolver: zodResolver(registerSchema),
  });

  const {
    handleSubmit,
    setError,
    formState: { isSubmitting, errors },
  } = methods;

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      await api.auth.register(data);
      onSuccess(true);
    } catch (err) {
      const error = err as AxiosError<ServerError>;
      setError("root", {
        message: error.response?.data?.message || "Щось пішло не так",
      });
    }
  };

  return (
    <FormProvider {...methods}>
      <form className={styles.page__form} onSubmit={handleSubmit(onSubmit)}>
        <FormField name="login">
          <TextLabel<RegisterFormValues>
            placeholder="Наприклад: chef_maksym"
            label="Логін:"
            id="login"
            name="login"
          />
        </FormField>
        <FormField name="email">
          <TextLabel<RegisterFormValues>
            placeholder="your.email@example.com"
            label="Email:"
            id="email"
            name="email"
          />
        </FormField>
        <FormField name="password">
          <TextLabel<RegisterFormValues>
            type="password"
            placeholder="Не менше 6 символів"
            label="Пароль:"
            id="password"
            name="password"
          />
        </FormField>
        <FormField name="passwordConfirmation">
          <TextLabel<RegisterFormValues>
            type="password"
            placeholder="Повторіть ваш пароль"
            label="Підтвердіть пароль:"
            id="passwordConfirmation"
            name="passwordConfirmation"
          />
        </FormField>

        <Button
          disabled={isSubmitting}
          type="submit"
          text="Зареєструватися"
          variant="btnRegistration"
        />

        <ErrorMessage message={errors.root?.message} />
      </form>
    </FormProvider>
  );
};
