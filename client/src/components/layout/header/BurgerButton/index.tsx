import styles from "./BurgerButton.module.scss";

type Props = {
  isOpen: boolean;
  onClick: () => void;
};

export const BurgerButton: React.FC<Props> = ({ isOpen, onClick }) => {
  return (
    <button
      type="button"
      className={`${styles.burger} ${isOpen ? styles.open : ""}`}
      onClick={onClick}
      aria-label={isOpen ? "Закрити меню" : "Відкрити меню"}
      aria-expanded={isOpen}
    >
      <span />
      <span />
      <span />
    </button>
  );
};