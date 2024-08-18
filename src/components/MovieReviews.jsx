import { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import styles from './MovieReviews.module.css';

const MovieReviews = () => {
const { movieId } = useParams();
const [reviews, setReviews] = useState([]);
const [showHideButton, setShowHideButton] = useState(false);
const [error, setError] = useState(null);
const navigate = useNavigate();
const location = useLocation();

useEffect(() => {
  const fetchReviews = async () => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}reviews`, {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9eyJhdWQiOiI3Yzg3YzcxNWM4YTg0ZmNmMDI0NDhhYzM3YmMyNzJhZiIsIm5iZiI6MTcyMjg2NDANy4zODkzOTMsInN1YiI6IjY2YjBjZmRiZDYwYmQ2MTA5N2RjNWFjMiIsInNjb3BlcyI6WyJhcGlcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VIMQwuMLcR7F7k13GJ-s4PYq0VkIBydmxSJz4vr8BQo`
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch reviews');
      }
      const data = await response.json();
      if (data.results.length === 0) {
        setError('No reviews available for this movie.');
      } else {
        setReviews(data.results);
      }
    } catch (error) {
      setError(error.message);
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
    {error ? (
      <p className={styles.error}>{error}</p>
    ) : (
      <ul className={styles.reviewsList}>
        {reviews.map(review => (
          <li key={review.id} className={styles.reviewItem}>
            <div className={styles.avatarContainer}>
              <div className={styles.avatar}></div>
              <div className={styles.avatarContent}>
                <h3>{review.author}</h3>
                <p className={styles.reviewDate}>
                  {new Date(review.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className={styles.reviewContent}>
              <p>{review.content}</p>
            </div>
          </li>
        ))}
      </ul>
    )}
    {showHideButton && (
      <button onClick={handleRemoveCastFromUrl}>Hide</button>
    )}
  </div>
);
};

export default MovieReviews;
