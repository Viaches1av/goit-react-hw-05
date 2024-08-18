import { useState, useEffect } from 'react';
import MovieList from '../components/MovieList';
import styles from './HomePage.module.css';

const HomePage = () => {
const [movies, setMovies] = useState([]);
useEffect(() => {
  const fetchPopularMovies = async () => {
    try {
      const response = await fetch('https://api.themoviedb.org/3/movie/popular', {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9eyJhdWQiOiI3Yzg3YzcxNWM4YTg0ZmNmMDI0NDhhYzM3YmMyNzJhZiIsIm5iZiI6MTcyMjg2NDANy4zODkzOTMsInN1YiI6IjY2YjBjZmRiZDYwYmQ2MTA5N2RjNWFjMiIsInNjb3BlcyI6WyJhcGlcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VIMQwuMLcR7F7k13GJ-s4PYq0VkIBydmxSJz4vr8BQo`
        }
      });
      const data = await response.json();
      setMovies(data.results);
    } catch (error) {
      console.error('Error fetching popular movies:', error);
    }
  };
  
  fetchPopularMovies();
}, []);

return (
  <div>
    <h1 className={styles.title}>Popular Movies</h1>
    <MovieList movies={movies} />
  </div>
);
};

export default HomePage;
