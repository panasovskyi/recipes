import { NavLink } from "react-router-dom";
import styles from "./Navigation.module.scss";

const NAV_LINKS = [
  { to: "/", label: "Головна", end: true },
  { to: "/recipes", label: "Рецепти" },
  { to: "/categories", label: "Категорії" },
];

type Props = {
  onLinkClick?: () => void;
};

export const Navigation: React.FC<Props> = ({ onLinkClick }) => {
  return (
    <nav className={styles.nav}>
      {NAV_LINKS.map(({ to, label, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          onClick={onLinkClick}
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }
        >
          {label}
        </NavLink>
      ))}
    </nav>
  );
};