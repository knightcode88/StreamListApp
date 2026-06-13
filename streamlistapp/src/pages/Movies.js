import { useState, useEffect, useCallback } from 'react';
import MovieGrid from '../components/Movies/MovieGrid';
import SearchBar from '../components/Movies/SearchBar';
import FilterBar from '../components/Movies/FilterBar';
import { useCart } from '../hooks/useCart';
import { useMovieSearch } from '../hooks/useMovieSearch';
import { movieService } from '../services/movieService';
import './Movies.css';

export default function MoviesPage() {
  const [allMovies, setAllMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();
  const { searchTerm, setSearchTerm, filters, setFilters, filteredMovies } = useMovieSearch(allMovies);

  // Load popular movies on component mount
  useEffect(() => {
    const loadMovies = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await movieService.getPopularMovies(1);
        setAllMovies(data.results || []);
      } catch (err) {
        setError('Failed to load movies. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, []);

  // Handle search
  const handleSearch = useCallback(async (query) => {
    setSearchTerm(query);

    if (query.trim().length < 1) {
      // If search is cleared, reload popular movies
      try {
        setLoading(true);
        const data = await movieService.getPopularMovies(1);
        setAllMovies(data.results || []);
      } catch (err) {
        setError('Failed to load movies.');
      } finally {
        setLoading(false);
      }
      return;
    }

    // Search for movies
    try {
      setLoading(true);
      setError(null);
      const data = await movieService.searchMovies(query, 1);
      setAllMovies(data.results || []);
    } catch (err) {
      setError('Failed to search movies. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [setSearchTerm]);

  // Handle filter changes
  const handleFilterChange = useCallback((newFilters) => {
    setFilters(newFilters);
  }, [setFilters]);

  // Handle add to cart
  const handleAddToCart = (movie) => {
    addToCart({
      id: movie.id,
      title: movie.title,
      price: 12.99, // Default price since TMDb doesn't provide pricing
      poster: movieService.getPosterUrl(movie.poster_path),
      year: new Date(movie.release_date).getFullYear(),
      rating: movie.vote_average,
    });
  };

  return (
    <div className="page-container">
      <h2>
        <span className="material-symbols-outlined">movie</span>
        Discover Movies
      </h2>

      {/* Search and Filter Controls */}
      <div className="movies-controls">
        <div className="search-container">
          <SearchBar 
            onSearch={handleSearch} 
            placeholder="Search movies by title or keywords..."
            isLoading={loading && searchTerm.trim().length > 0}
          />
        </div>
        <FilterBar onFilterChange={handleFilterChange} />
      </div>

      {/* Error Message */}
      {error && (
        <div className="error" role="alert">
          <div className="error-title">Error</div>
          <p>{error}</p>
        </div>
      )}

      {/* Loading State */}
      {loading && searchTerm.trim().length > 0 && (
        <div className="loading">
          <div className="loading-spinner" aria-hidden="true"></div>
          <span className="loading-text">Searching movies...</span>
        </div>
      )}

      {/* Results Info */}
      {!loading && filteredMovies.length > 0 && (
        <div className="results-info">
          <span className="results-count">
            Found {filteredMovies.length} movie{filteredMovies.length !== 1 ? 's' : ''}
            {searchTerm && ` for "${searchTerm}"`}
          </span>
        </div>
      )}

      {/* No Results */}
      {!loading && filteredMovies.length === 0 && allMovies.length > 0 && (
        <div className="no-results">
          <h3 className="no-results-title">No movies found</h3>
          <p className="no-results-text">
            {searchTerm 
              ? `No results for "${searchTerm}"` 
              : 'No movies match your filters'}
          </p>
          <p className="no-results-suggestion">
            Try adjusting your search or filters
          </p>
        </div>
      )}

      {/* Movies Grid */}
      {!loading && filteredMovies.length > 0 && (
        <MovieGrid movies={filteredMovies} onAddToCart={handleAddToCart} />
      )}

      {/* Initial Loading */}
      {loading && searchTerm.trim().length === 0 && (
        <div className="loading">
          <div className="loading-spinner" aria-hidden="true"></div>
          <span className="loading-text">Loading movies...</span>
        </div>
      )}
    </div>
  );
}
