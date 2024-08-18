import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.css';

const Navigation = () => (
  <nav className={styles.nav}>
    <NavLink 
      to="/" 
      end 
      className={({ isActive }) => isActive ? styles.linkActive : styles.link}
    >
      Home
    </NavLink>
    <NavLink 
      to="/movies" 
      className={({ isActive }) => isActive ? styles.linkActive : styles.link}
    >
      Movies
    </NavLink>
  </nav>
);

export default Navigation;
