import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.css';

const NotFoundPage = () => (
  <div className={styles.notFoundContainer}>
    <h1 className={styles.title}>
      <span className={styles.text}>404 - Page Not Found</span>
      <span className={styles.cursor}></span>
    </h1>
    <p className={styles.subtitle}>
      <span className={styles.text}>Lost page. Search for something else</span>
      <span className={styles.cursor}></span>
    </p>
    <Link to="/" className={styles.homeLink}>
      Return to Home
    </Link>
  </div>
);

export default NotFoundPage;
