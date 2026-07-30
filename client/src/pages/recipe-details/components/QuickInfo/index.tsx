import { useState } from 'react';
import styles from './QuickInfo.module.scss';
import { Button } from '@/components/ui/atoms/Button';
import { api } from '@/api';

type Info = {
  id: number;
  label: string;
  value: string;

}

type Props = {
  info: Info[];
  isSaved: boolean;
  recipeId: string;
}

export const QuickInfo: React.FC<Props> = ({ info, recipeId, isSaved }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [saved, setSaved] = useState(isSaved);

  const toggleSaved = async () => {
    if (isLoading) return;

    const previousSaved = saved;
    setSaved(!previousSaved);
    setIsLoading(true);

    try {
      await api.recipes.toggleSaved(recipeId);
    } catch {
      setSaved(previousSaved);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.quickInfo}>
      <h2 className={styles.quickInfo__title}>Швидка інформація</h2>
      <ul className={styles.quickInfo__list}>
        {info.map((item) => (
          <li key={item.id} className={styles.quickInfo__item}>
            <span className={styles.quickInfo__label}>{item.label}</span>
            <span className={styles.quickInfo__value}>{item.value}</span>
          </li>
        ))}
      </ul>
      <div className={styles.quickInfo__actions}>
        <Button
          variant="btnSave"
          text={saved ? "Видалити" : "Зберегти"}
          onClick={toggleSaved}
          disabled={isLoading}
          isActive={saved}
        />
        <Button
          variant="btnPrint"
          text="Роздрукувати"
          onClick={() => window.print()}
        />
      </div>
    </div>
  )
}