import { Link, useNavigate } from "react-router-dom";
import { LogoutIcon, PlusIcon, UserIcon } from "@/components/ui/atoms/icons";
import { useAppDispatch, useAppSelector } from "@/store";
import { Spinner } from "@/components/ui/atoms/Spinner";
import { logout } from "@/store/slices";
import { api } from "@/api";
import styles from "./AuthActions.module.scss";
import { Button } from "@/components/ui/atoms/Button";

type Props = {
  onLinkClick?: () => void;
};

export const AuthActions: React.FC<Props> = ({ onLinkClick }) => {
  const { user, isAuthenticated, isLoading } = useAppSelector(
    (state) => state.auth,
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.auth.logout();
      navigate("/login");

      if (onLinkClick) {
        onLinkClick();
      }
    } catch {
      console.log("Помилка");
    } finally {
      dispatch(logout());
    }
  };

  if (isLoading) {
    return (
      <div className={styles.actions}>
        <Spinner />
      </div>
    );
  }

  if (!isAuthenticated && !user) {
    return (
      <div className={styles.actions}>
        <Link to="/login" onClick={onLinkClick} className={styles.loginLink}>
          Увійти
        </Link>
        <Link to="/registration" onClick={onLinkClick} className={styles.registerBtn}>
          Реєстрація
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.actions}>
      <Link to="/create-recipe" onClick={onLinkClick} className={styles.addRecipeBtn}>
        <PlusIcon />
        Додати рецепт
      </Link>
      <Link to="/profile" onClick={onLinkClick} className={styles.btnIcon} aria-label="Профіль">
        <UserIcon />
      </Link>
      <Button
        variant="btnIcon"
        onClick={handleLogout}
        text={<LogoutIcon />}
      />
    </div>
  );
};
