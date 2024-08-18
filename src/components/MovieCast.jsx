import { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import styles from './MovieCast.module.css';

const MovieCast = () => {
const { movieId } = useParams();
const [cast, setCast] = useState([]);
const [showHideButton, setShowHideButton] = useState(false);
const navigate = useNavigate();
const location = useLocation(); 

const defaultImg = 'https://dummyimage.com/400x600/cdcdcd/000.jpg&text=No+poster';

useEffect(() => {
  const fetchCast = async () => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}credits`, {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9eyJhdWQiOiI3Yzg3YzcxNWM4YTg0ZmNmMDI0NDhhYzM3YmMyNzJhZiIsIm5iZiI6MTcyMjg2NDANy4zODkzOTMsInN1YiI6IjY2YjBjZmRiZDYwYmQ2MTA5N2RjNWFjMiIsInNjb3BlcyI6WyJhcGlcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VIMQwuMLcR7F7k13GJ-s4PYq0VkIBydmxSJz4vr8BQo`
        }
      });

      const data = await response.json();
      setCast(data.cast);
    } catch (error) {
      console.error('Error fetching cast:', error);
    }
  };

  fetchCast();
}, [movieId]);

const handleRemoveCastFromUrl = () => {
const newUrl = location.pathname.replace('/cast', '');
  navigate(newUrl, { replace: true });
};

useEffect(() => {
  const handleScroll = () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const windowHeight = window.innerHeight;
  const fullHeight = document.documentElement.scrollHeight;
  const scrolledRatio = scrollTop / (fullHeight - windowHeight);
    if (scrolledRatio > 2 / (fullHeight / windowHeight)) {
      setShowHideButton(true);
    } else {
      setShowHideButton(false);
    }
  };
  window.addEventListener('scroll', handleScroll);
  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
}, []);

return (
  <div>
    <button onClick={handleRemoveCastFromUrl}>Hide</button>
    <ul className={styles.castList}>
      {cast.map(actor => (
        <li key={actor.id} className={styles.castItem}>
          <img
            src={
              actor.profile_path
                ? `https://image.tmdb.org/t/p/w500/${actor.profile_path}`
                : defaultImg
            }
            alt={actor.name}
            width={100}
          />
          <p>{actor.name}</p>
          <p>Character: {actor.character}</p>
        </li>
      ))}
    </ul>
    {showHideButton && (
      <button onClick={handleRemoveCastFromUrl}>Hide</button>
    )}
  </div>
);
};

export default MovieCast;
