import { useState, useEffect, useRef } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import MovieList from '../components/MovieList';
import styles from './MoviesPage.module.css';
const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const location = useLocation();
  const backLink = location.state ?? '/';
  const inputRef = useRef(null);

  useEffect(() => {
    if (!query) return;

    const fetchMovies = async () => {
      setError(null);
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?query=${query}`,
          {
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3Yzg3YzcxNWM4YTg0ZmNmMDI0NDhhYzM3YmMyNzJhZiIsIm5iZiI6MTcyMjg2NDAwNy4zODkzOTMsInN1YiI6IjY2YjBjZmRiZDYwYmQ2MTA5N2RjNWFjMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VIMQwuMLcR7F7k13GJ-s4PYq0VkIBydmxSJz4vr8BQo`
            }
          }
        );
        const data = await response.json();
        if (response.ok) {
          setMovies(data.results);
        } else {
          setError(data.status_message || 'Error fetching movies');
        }
      } catch (error) {
        setError('Error fetching movies');
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, [query]);

  const handleSearch = (e) => {
    e.preventDefault();
    const searchQuery = inputRef.current.value.trim();
    setSearchParams({ query: searchQuery });
  };

  const handleReset = () => {
    setSearchParams({});
    setMovies([]);
    inputRef.current.value = '';
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Search Movies</h1>
      <form onSubmit={handleSearch} className={styles.form}>
        <input
          type="text"
          name="query"
          defaultValue={query}
          placeholder="Search for movies"
          className={styles.input}
          ref={inputRef}
        />
        <button type="submit" className={styles.button}>
          <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/>
          </svg>
        </button>
        <button type="button" onClick={handleReset} className={styles.resetButton}>
        <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9h13a5 5 0 0 1 0 10H7M3 9l4-4M3 9l4 4"/>
</svg>

        </button>
      </form>
      {error && <div className={styles.error}>{error}</div>}
      <MovieList movies={movies} backLink={backLink} />
    </div>
  );
};

export default MoviesPage;
