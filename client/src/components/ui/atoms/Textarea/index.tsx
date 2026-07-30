import { useFormContext } from 'react-hook-form';
import styles from './Textarea.module.scss';

type Props = {
  name: string;
  placeholder: string;
  id: string;
}

export const Textarea: React.FC<Props> = ({ name, placeholder, id }) => {
  const { register, formState } = useFormContext();

  return (
    <textarea
      {...register(name)}
      id={id}
      placeholder={placeholder}
      className={styles.textarea}
      disabled={formState.isSubmitting}
    />
  )
}