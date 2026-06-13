import { useState, useEffect } from 'react';
import MovieGrid from '../components/Movies/MovieGrid';
import { useCart } from '../hooks/useCart';
import { useFetch } from '../hooks/useFetch';

// Mock movie data - replace with API call
const MOCK_MOVIES = [
  { id: 1, title: 'Inception', year: 2010, rating: 8.8, price: 12.99, poster: null },
  { id: 2, title: 'The Dark Knight', year: 2008, rating: 9.0, price: 12.99, poster: null },
  { id: 3, title: 'Interstellar', year: 2014, rating: 8.6, price: 14.99, poster: null },
  { id: 4, title: 'Pulp Fiction', year: 1994, rating: 8.9, price: 9.99, poster: null },
  { id: 5, title: 'Fight Club', year: 1999, rating: 8.8, price: 10.99, poster: null },
  { id: 6, title: 'The Matrix', year: 1999, rating: 8.7, price: 10.99, poster: null },
];

export default function MoviesPage() {
  const [movies, setMovies] = useState(MOCK_MOVIES);
  const { addToCart } = useCart();

  // Example: You can replace this with actual API call
  // const { data: movies, loading, error } = useFetch('/api/movies');

  const handleAddToCart = (movie) => {
    addToCart(movie);
    // Show feedback to user (optional)
    console.log(`Added ${movie.title} to cart`);
  };

  return (
    <div className="page-container">
      <h2>
        <span className="material-symbols-outlined">movie</span>
        Available Movies
      </h2>
      <MovieGrid movies={movies} onAddToCart={handleAddToCart} />
    </div>
  );
}
