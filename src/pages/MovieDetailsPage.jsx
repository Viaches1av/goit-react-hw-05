import { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate, Link, Outlet } from 'react-router-dom';
import styles from './MovieDetailsPage.module.css';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const backLinkLocationRef = useState(location.state?.from ?? '/')[0];

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}`, {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3Yzg3YzcxNWM4YTg0ZmNmMDI0NDhhYzM3YmMyNzJhZiIsIm5iZiI6MTcyMjg2NDAwNy4zODkzOTMsInN1YiI6IjY2YjBjZmRiZDYwYmQ2MTA5N2RjNWFjMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VIMQwuMLcR7F7k13GJ-s4PYq0VkIBydmxSJz4vr8BQo`
          }
        });
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  const handleGoBack = () => {
    if (backLinkLocationRef) {
      navigate(backLinkLocationRef);
    }
  };  

  return (
    <div className={styles.container}>
      <button onClick={handleGoBack} className={styles.goBackButton}>
        Go back
      </button>
      {movie && (
        <div className={styles.movieDetails}>
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className={styles.poster} />
          <div className={styles.details}>
            <h1 className={styles.title}>{movie.title}</h1>
            <p className={styles.rating}>Rating: {movie.vote_average} / 10</p>
            <p className={styles.overview}>{movie.overview}</p>
            <p className={styles.genres}>Genres: {movie.genres?.map(genre => genre.name).join(', ')}</p>
            <nav className={styles.nav}>
              <Link to="cast" className={styles.navLink}>Cast</Link>
              <Link to="reviews" className={styles.navLink}>Reviews</Link>
            </nav>
          </div>
        </div>
      )}
      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
