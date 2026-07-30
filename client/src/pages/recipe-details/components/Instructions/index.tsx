import type { InstructionStep } from '@/types/recipe';
import styles from './Instructions.module.scss';

type Props = {
  steps: InstructionStep[];
}

export const Instructions: React.FC<Props> = ({ steps }) => {
  return (
    <div className={styles.instructionsBlock}>
      <h2 className={styles.sectionTitle}>Інструкція з приготування</h2>
      <ol className={styles.instructionsList}>
        {steps.map((instruction) => (
          <li key={instruction.id} className={styles.instructionStep}>
            <div className={styles.stepContent}>
              <p className={styles.stepDescription}>
                {instruction.description}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}