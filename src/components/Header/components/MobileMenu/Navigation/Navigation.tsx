import { Link } from 'react-router-dom'
import './Navigation.scss';

const CATEGORIES = ['breakfasts', 'dinners', 'snacks'];

type Props = {
  modificator: string;
}

export const Navigation: React.FC<Props> = ({modificator}) => {
  return (
    <nav className={`navigation navigation--${modificator}`}>
      <ul className={`navigation__list navigation__list--${modificator}`}>
        {CATEGORIES.map(cat => (
          <li key={cat} className={`navigation__item navigation__item--${modificator}`}>
            <Link to={`/${cat}`} className={`navigation__link navigation__link--${modificator}`}>{cat}</Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}