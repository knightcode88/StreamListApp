import MovieCard from './MovieCard';
import './MovieGrid.css';

export default function MovieGrid({ movies, onAddToCart }) {
  if (!movies || movies.length === 0) {
    return null;
  }

  return (
    <div className="movie-grid">
      {movies.map(movie => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
}