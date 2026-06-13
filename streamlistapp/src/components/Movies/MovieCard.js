import { useState } from 'react';
import { movieService } from '../../services/movieService';
import './MovieCard.css';

export default function MovieCard({ movie, onAddToCart }) {
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    setIsAdding(true);
    try {
      onAddToCart(movie);
    } finally {
      setIsAdding(false);
    }
  };

  const posterUrl = movieService.getPosterUrl(movie.poster_path);
  const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A';
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A';

  return (
    <div className="movie-card">
      <div className="movie-poster-container">
        {posterUrl ? (
          <img
            src={posterUrl}
            alt={movie.title}
            className="movie-poster"
            loading="lazy"
          />
        ) : (
          <div className="movie-poster-placeholder">
            <span className="material-symbols-outlined">image_not_supported</span>
          </div>
        )}
        <div className="movie-overlay">
          <button
            className="add-to-cart-btn"
            onClick={handleAddToCart}
            disabled={isAdding}
            aria-label={`Add ${movie.title} to cart`}
          >
            <span className="material-symbols-outlined">add_shopping_cart</span>
            {isAdding ? 'Adding...' : 'Add to Cart'}
          </button>
        </div>
      </div>

      <div className="movie-info">
        <h3 className="movie-title" title={movie.title}>
          {movie.title}
        </h3>

        <div className="movie-meta">
          <span className="movie-year">{releaseYear}</span>
          <div className="movie-rating">
            <span className="material-symbols-outlined">star</span>
            <span>{rating}</span>
          </div>
        </div>

        {movie.overview && (
          <p className="movie-description">
            {movie.overview.substring(0, 100)}...
          </p>
        )}

        <div className="movie-price">$12.99</div>
      </div>
    </div>
  );
}