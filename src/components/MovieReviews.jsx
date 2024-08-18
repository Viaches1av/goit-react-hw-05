import { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation} from 'react-router-dom';
import styles from './MovieReviews.module.css';

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [showHideButton, setShowHideButton] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/reviews`, {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3Yzg3YzcxNWM4YTg0ZmNmMDI0NDhhYzM3YmMyNzJhZiIsIm5iZiI6MTcyMjg2NDAwNy4zODkzOTMsInN1YiI6IjY2YjBjZmRiZDYwYmQ2MTA5N2RjNWFjMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VIMQwuMLcR7F7k13GJ-s4PYq0VkIBydmxSJz4vr8BQo`
          }
        });
        const data = await response.json();
        setReviews(data.results);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, [movieId]);

  const handleRemoveCastFromUrl = () => {
    const newUrl = location.pathname.replace('/reviews', '');
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
        <ul className={styles.reviewsList}>
        {reviews.map(review => (
          <li key={review.id} className={styles.reviewItem}>
            <h3>{review.author}</h3>
            <p>{review.content}</p>
          </li>
        ))}
      </ul>
      {showHideButton && (
        <button onClick={handleRemoveCastFromUrl}>Hide</button>
      )}
    </div>
  );
};

export default MovieReviews;