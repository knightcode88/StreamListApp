import './MovieCard.css';

export default function MovieCard({ movie, onAddToCart }) {
  return (
    <div className="movie-card">
      <div className="movie-poster">
        {movie.poster ? (
          <img src={movie.poster} alt={movie.title} />
        ) : (
          <div className="no-poster">No Image</div>
        )}
      </div>
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <p className="movie-year">{movie.year}</p>
        <p className="movie-rating">⭐ {movie.rating}</p>
        <button onClick={() => onAddToCart(movie)}>Add to Cart</button>
      </div>
    </div>
  );
}