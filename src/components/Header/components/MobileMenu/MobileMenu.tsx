import { Navigation } from './Navigation/Navigation';
import './MobileMenu.scss';

export const MobileMenu = () => {
  return (
    <div className='mobileMenu'>
      <Navigation modificator="mobile" />
    </div>
  )
}