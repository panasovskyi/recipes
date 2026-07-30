import { useState } from "react";
import styles from "./Header.module.scss";
import { Logo } from '@/components/layout/logo';
import { Navigation } from '@/components/layout/header/Navigation';
import { AuthActions } from '@/components/layout/header/AuthActions';
import { BurgerButton } from '@/components/layout/header/BurgerButton';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Logo />

        <div className={styles.desktopControls}>
          <Navigation />
          <AuthActions />
        </div>

        <BurgerButton isOpen={isMenuOpen} onClick={() => setIsMenuOpen((v) => !v)} />
      </div>

      {isMenuOpen && (
        <div className={styles.mobileMenu}>
          <Navigation onLinkClick={() => setIsMenuOpen(false)} />
          <AuthActions />
        </div>
      )}
    </header>
  );
};