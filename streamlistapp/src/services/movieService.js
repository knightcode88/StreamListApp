// TMDb API service for handling movie data and operations
// API Documentation: https://developer.themoviedb.org/docs

const API_KEY = process.env.REACT_APP_TMDB_API_KEY || '067e8118c0078bd071ea217f01452418';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const defaultHeaders = {
  accept: 'application/json',
};

/**
 * Handle API errors
 */
const handleApiError = (error) => {
  console.error('TMDb API Error:', error);
  throw new Error(error.message || 'Failed to fetch from TMDb API');
};

/**
 * Movie Service
 */
export const movieService = {
  /**
   * Search for movies by query
   * @param {string} query - Search query
   * @param {number} page - Page number (default: 1)
   * @returns {Promise} Movie search results
   */
  searchMovies: async (query, page = 1) => {
    try {
      if (!query.trim()) {
        return { results: [], total_pages: 0, total_results: 0 };
      }

      const response = await fetch(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
          query
        )}&page=${page}&include_adult=false`,
        { headers: defaultHeaders }
      );

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      handleApiError(error);
    }
  },

  /**
   * Get popular movies
   * @param {number} page - Page number (default: 1)
   * @returns {Promise} Popular movies
   */
  getPopularMovies: async (page = 1) => {
    try {
      const response = await fetch(
        `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}&language=en-US`,
        { headers: defaultHeaders }
      );

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      handleApiError(error);
    }
  },

  /**
   * Get top-rated movies
   * @param {number} page - Page number (default: 1)
   * @returns {Promise} Top-rated movies
   */
  getTopRatedMovies: async (page = 1) => {
    try {
      const response = await fetch(
        `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&page=${page}&language=en-US`,
        { headers: defaultHeaders }
      );

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      handleApiError(error);
    }
  },

  /**
   * Get upcoming movies
   * @param {number} page - Page number (default: 1)
   * @returns {Promise} Upcoming movies
   */
  getUpcomingMovies: async (page = 1) => {
    try {
      const response = await fetch(
        `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&page=${page}&language=en-US`,
        { headers: defaultHeaders }
      );

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      handleApiError(error);
    }
  },

  /**
   * Get movies by genre
   * @param {array} genreIds - Array of genre IDs
   * @param {number} page - Page number (default: 1)
   * @returns {Promise} Movies in specified genres
   */
  getMoviesByGenre: async (genreIds, page = 1) => {
    try {
      const genreQuery = genreIds.join('|');
      const response = await fetch(
        `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreQuery}&page=${page}&language=en-US&sort_by=popularity.desc`,
        { headers: defaultHeaders }
      );

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      handleApiError(error);
    }
  },

  /**
   * Get movie details
   * @param {number} movieId - Movie ID
   * @returns {Promise} Movie details
   */
  getMovieDetails: async (movieId) => {
    try {
      const response = await fetch(
        `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`,
        { headers: defaultHeaders }
      );

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      handleApiError(error);
    }
  },

  /**
   * Get genres list
   * @returns {Promise} Genres
   */
  getGenres: async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`,
        { headers: defaultHeaders }
      );

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      handleApiError(error);
    }
  },

  /**
   * Get poster image URL
   * @param {string} posterPath - Poster path from API
   * @param {string} size - Image size (w200, w500, w780, original)
   * @returns {string} Full image URL
   */
  getPosterUrl: (posterPath, size = 'w500') => {
    if (!posterPath) return null;
    return `${IMAGE_BASE_URL.replace('w500', size)}${posterPath}`;
  },
};

export default movieService;