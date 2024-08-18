import { Link } from 'react-router-dom';
import styles from './MovieList.module.css';

const MovieList = ({ movies, backLink }) => {
  const defaultImg = 'https://dummyimage.com/400x600/cdcdcd/000.jpg&text=No+poster';

  return (
    <ul className={styles.movieList}>
      {movies.map(movie => (
        <li key={movie.id} className={styles.movieItem}>
          <Link to={`/movies/${movie.id}`} state={{ from: backLink }}> 
          <div className={styles.movieImageContainer}>
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                  : defaultImg
              }
              alt={movie.title}
              width={250}
            />
            </div>
            <div className={styles.movieInfo}>
              <p className={styles.movieTitle}>{movie.title || 'Untitled'}</p>
              <p className={styles.movieDetails}>{movie.release_date ? new Date(movie.release_date).getFullYear() : 'Unknown year'}</p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
