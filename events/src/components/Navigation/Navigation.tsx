import { Link } from 'react-router-dom';
import styles from './styles.module.css';

export default function Navigation() {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <Link to="/" className={styles.navLink}>
            Create Event
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link to="/events" className={styles.navLink}>
            Events
          </Link>
        </li>
      </ul>
    </nav>
  );
}
