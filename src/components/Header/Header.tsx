import { useEffect, useState } from "react";
import { Navigation } from "./components/MobileMenu/Navigation/Navigation";
import { MobileMenu } from "./components/MobileMenu/MobileMenu";
import { Link } from "react-router-dom";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className="header">
      <div className="container">
        <Link to="/">
          <img src="img/header/header-logo.webp" alt="logo" className="header__logo" width={100} />
        </Link>
        {isMobile ? (
          <button
            className="header__menu"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? "Close" : "Menu"}
          </button>
        ) : (
          <Navigation modificator="desktop" />
        )}
        {isMenuOpen && <MobileMenu />}
      </div>
    </header>
  );
};
