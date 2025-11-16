import './HowToCook.scss';

type Props = {
  steps: string[];
}

export const HowToCook: React.FC<Props> = ({ steps }) => {
  return (
    <ol className='howToCook'>
      {steps.map(step => (
        <li key={step} className='howToCook__item'>{step}</li>
      ))}
    </ol>
  )
}