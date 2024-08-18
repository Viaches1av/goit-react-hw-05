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
const inputRef = useRef(null);
const [isOpened, setIsOpened] = useState(false);

useEffect(() => {
  if (!query) {
    setMovies([]);
    return;
  }

  const fetchMovies = async () => {
    setError(null);
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${query}`,
        {
          headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9eyJhdWQiOiI3Yzg3YzcxNWM4YTg0ZmNmMDI0NDhhYzM3YmMyNzJhZiIsIm5iZiI6MTcyMjg2NDANy4zODkzOTMsInN1YiI6IjY2YjBjZmRiZDYwYmQ2MTA5N2RjNWFjMiIsInNjb3BlcyI6WyJhcGlcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VIMQwuMLcR7F7k13GJ-s4PYq0VkIBydmxSJz4vr8BQo`
          },
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

const handleSearch = () => {
  const searchQuery = inputRef.current.value.trim();
  if (searchQuery) {
    setSearchParams({ query: searchQuery });
  }
};

const handleToggleSearch = () => {
  if (!isOpened) {
    setIsOpened(true);
    setTimeout(() => {
      inputRef.current.focus();
    }, 300);
  } else {
    handleSearch();
  }
};

const handleReset = () => {
  setSearchParams({});
  setMovies([]);
  inputRef.current.value = '';
  setIsOpened(false);
};

return (
  <div className={styles.container}>
    <h1 className={styles.header}>Search Movies</h1>
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSearch();
      }}
      className={`${styles.form} ${styles.search} ${
        isOpened ? styles.opened : ''
      }`}
      >
      <input
        type="text"
        name="query"
        placeholder="Search for movies"
        className={`${styles.input} ${styles['searchInput']}`}
        ref={inputRef}
      />
      <button
        type="button"
        className={styles.searchButton}
        onClick={handleToggleSearch}
      >
        <svg
          className="w-6 h-6 text-gray-800 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          fill="none"
          viewBox="0 0 25 25"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="2"
            d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
          />
        </svg>
      </button>
      <button
        type="button"
        className={styles.resetButton}
        onClick={handleReset}
      >
        Reset
      </button>
    </form>
    {error && (
    <div className={styles.error}>
      {error}
      <button onClick={() => setSearchParams({ query })} className={styles.retryButton}>
        Retry
      </button>
    </div>
    )}
  <MovieList movies={movies} backLink={location} />
  </div>
  );
};

export default MoviesPage;
