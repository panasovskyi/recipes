import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch, useAppSelector } from "@/store";
import { logout } from "@/store/slices";
import { profileSchema, type ProfileFormValues } from "./schema";
import styles from "./ProfileSidebar.module.scss";
import { FormField } from '@/components/ui/molecules/FormField';
import { TextLabel } from '@/components/ui/molecules/TextLabel';
import { Button } from '@/components/ui/atoms/Button';

export const ProfileSidebar = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const methods = useForm<ProfileFormValues>({
    defaultValues: {
      login: user?.login ?? "",
      email: user?.email ?? "",
    },

    resolver: zodResolver(profileSchema),
  });
  
  const initials = (user?.login ?? "??").slice(0, 2).toUpperCase();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.avatar}>{initials}</div>

      <FormProvider {...methods}>
        <form className={styles.form}>
          <FormField name="login">
            <TextLabel<ProfileFormValues>
              name="login"
              id="login"
              label="Логін"
              disabled
            />
          </FormField>
          <FormField name="email">
            <TextLabel<ProfileFormValues>
              name="email"
              id="email"
              label="Email"
              disabled
            />
          </FormField>
      </form>
      </FormProvider>
      <Button
        variant='btnLogout'
        onClick={handleLogout}
        text="Вийти з акаунту"
      />
    </aside>
  );
};
