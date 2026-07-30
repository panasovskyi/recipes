import { FormProvider, useForm } from "react-hook-form";
import styles from "./Login.module.scss";
import type { LoginRequest } from "@/types/auth";
import { FormField } from "@/components/ui/molecules/FormField";
import { TextLabel } from "@/components/ui/molecules/TextLabel";
import { Button } from "@/components/ui/atoms/Button";
import { ErrorMessage } from "@/components/ui/atoms/ErrorMessage";
import type { AxiosError } from "axios";
import type { ServerError } from "@/types/errors";
import { api } from "@/api";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/pages/login/schema";
import { useAppDispatch } from '@/store';
import { setCredentials } from '@/store/slices';

export const LoginForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const methods = useForm<LoginRequest>({
    defaultValues: {
      login: "",
      password: "",
    },

    resolver: zodResolver(LoginSchema),
  });

  const {
    handleSubmit,
    formState: { isSubmitting, errors },
    setError,
  } = methods;

  const onSubmit = async (data: LoginRequest) => {
    try {
      const res = await api.auth.login(data);
      dispatch(setCredentials(res));
      navigate("/");
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
          <TextLabel<LoginRequest>
            placeholder="Наприклад: chef_maksym"
            label="Логін:"
            id="login"
            name="login"
          />
        </FormField>

        <FormField name="password">
          <TextLabel<LoginRequest>
            type="password"
            placeholder="Не менше 6 символів"
            label="Пароль:"
            id="password"
            name="password"
          />
        </FormField>

        <Button
          disabled={isSubmitting}
          type="submit"
          text="Авторизуватися"
          variant="btnRegistration"
        />

        <ErrorMessage message={errors.root?.message} />
      </form>
    </FormProvider>
  );
};
