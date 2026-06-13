import MovieCard from './MovieCard';
import './MovieGrid.css';

export default function MovieGrid({ movies, onAddToCart }) {
  return (
    <div className="movie-grid">
      {movies.length === 0 ? (
        <p className="no-movies">No movies available at the moment.</p>
      ) : (
        movies.map(movie => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onAddToCart={onAddToCart}
          />
        ))
      )}
    </div>
  );
}