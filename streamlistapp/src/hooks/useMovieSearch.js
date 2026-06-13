import { useState, useMemo, useCallback } from 'react';

export const useMovieSearch = (movies) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    genres: [],
    rating: null,
    sortBy: 'popularity.desc',
  });

  const filteredMovies = useMemo(() => {
    let result = [...movies];

    // Search filter
    if (searchTerm.trim()) {
      result = result.filter(movie =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (movie.overview && movie.overview.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Genre filter
    if (filters.genres.length > 0) {
      result = result.filter(movie => {
        const movieGenres = movie.genre_ids || [];
        return filters.genres.some(genre => movieGenres.includes(genre));
      });
    }

    // Rating filter
    if (filters.rating !== null) {
      result = result.filter(movie => movie.vote_average >= filters.rating);
    }

    // Sort
    result = sortMovies(result, filters.sortBy);

    return result;
  }, [movies, searchTerm, filters]);

  const sortMovies = (moviesToSort, sortBy) => {
    const sorted = [...moviesToSort];
    switch (sortBy) {
      case 'popularity.desc':
        return sorted.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
      case 'vote_average.desc':
        return sorted.sort((a, b) => (b.vote_average || 0) - (a.vote_average || 0));
      case 'release_date.desc':
        return sorted.sort((a, b) => {
          const dateA = new Date(a.release_date || 0);
          const dateB = new Date(b.release_date || 0);
          return dateB - dateA;
        });
      case 'title.asc':
        return sorted.sort((a, b) => a.title.localeCompare(b.title));
      default:
        return sorted;
    }
  };

  return {
    searchTerm,
    setSearchTerm: useCallback((term) => setSearchTerm(term), []),
    filters,
    setFilters: useCallback((newFilters) => setFilters(newFilters), []),
    filteredMovies,
  };
};