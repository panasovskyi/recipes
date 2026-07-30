import { Link } from "react-router-dom";
import styles from "./Footer.module.scss";
import { Logo } from '@/components/layout/logo';

const EXPLORE_LINKS = [
  { to: "/recipes", label: "Усі рецепти" },
  { to: "/categories", label: "Категорії" },
  { to: "/create-recipe", label: "Додати рецепт" },
];

const INFO_LINKS = [
  { to: "/about", label: "Про проєкт" },
  { to: "/contacts", label: "Контакти" },
  { to: "/privacy", label: "Політика конфіденційності" },
];

export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <Logo />
          <p className={styles.tagline}>
            Рецепти під настрій і те, що вже є у холодильнику.
          </p>
        </div>

        <div className={styles.column}>
          <span className={styles.columnTitle}>Рецепти</span>
          <ul>
            {EXPLORE_LINKS.map(({ to, label }) => (
              <li key={to}>
                <Link to={to}>{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.column}>
          <span className={styles.columnTitle}>Інформація</span>
          <ul>
            {INFO_LINKS.map(({ to, label }) => (
              <li key={to}>
                <Link to={to}>{label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={styles.bottom}>
        <span>© {year} Смакота. Усі права захищено.</span>
      </div>
    </footer>
  );
};