import { useState } from 'react';
import './FilterBar.css';

const GENRES = [
  { id: 28, name: 'Action' },
  { id: 12, name: 'Adventure' },
  { id: 16, name: 'Animation' },
  { id: 35, name: 'Comedy' },
  { id: 80, name: 'Crime' },
  { id: 18, name: 'Drama' },
  { id: 27, name: 'Horror' },
  { id: 10749, name: 'Romance' },
  { id: 878, name: 'Sci-Fi' },
  { id: 53, name: 'Thriller' },
];

const RATING_FILTERS = [
  { label: 'All Ratings', value: null },
  { label: '9.0+', value: 9.0 },
  { label: '8.5+', value: 8.5 },
  { label: '8.0+', value: 8.0 },
  { label: '7.0+', value: 7.0 },
];

const SORT_OPTIONS = [
  { label: 'Popularity (Descending)', value: 'popularity.desc' },
  { label: 'Rating (Highest)', value: 'vote_average.desc' },
  { label: 'Release Date (Newest)', value: 'release_date.desc' },
  { label: 'Title (A-Z)', value: 'title.asc' },
];

export default function FilterBar({ onFilterChange, selectedSort = 'popularity.desc' }) {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedRating, setSelectedRating] = useState(null);
  const [selectedSort, setSelectedSort] = useState(selectedSort);
  const [isOpen, setIsOpen] = useState(false);

  const handleGenreToggle = (genreId) => {
    const updated = selectedGenres.includes(genreId)
      ? selectedGenres.filter(g => g !== genreId)
      : [...selectedGenres, genreId];
    setSelectedGenres(updated);
    onFilterChange({
      genres: updated,
      rating: selectedRating,
      sortBy: selectedSort,
    });
  };

  const handleRatingChange = (rating) => {
    setSelectedRating(rating);
    onFilterChange({
      genres: selectedGenres,
      rating,
      sortBy: selectedSort,
    });
  };

  const handleSortChange = (sortBy) => {
    setSelectedSort(sortBy);
    onFilterChange({
      genres: selectedGenres,
      rating: selectedRating,
      sortBy,
    });
  };

  const resetFilters = () => {
    setSelectedGenres([]);
    setSelectedRating(null);
    setSelectedSort('popularity.desc');
    onFilterChange({
      genres: [],
      rating: null,
      sortBy: 'popularity.desc',
    });
  };

  const activeFilterCount = selectedGenres.length + (selectedRating ? 1 : 0);

  return (
    <div className="filter-bar">
      <div className="filter-header">
        <button
          className="filter-toggle"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
        >
          <span className="material-symbols-outlined">tune</span>
          Filters
          {activeFilterCount > 0 && (
            <span className="filter-badge">{activeFilterCount}</span>
          )}
        </button>
        {activeFilterCount > 0 && (
          <button
            className="reset-filters"
            onClick={resetFilters}
            aria-label="Reset all filters"
          >
            Reset
          </button>
        )}
      </div>

      {isOpen && (
        <div className="filter-content">
          {/* Genre Filter */}
          <div className="filter-section">
            <h4>Genre</h4>
            <div className="filter-options">
              {GENRES.map(({ id, name }) => (
                <label key={id} className="filter-checkbox">
                  <input
                    type="checkbox"
                    checked={selectedGenres.includes(id)}
                    onChange={() => handleGenreToggle(id)}
                  />
                  <span>{name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Rating Filter */}
          <div className="filter-section">
            <h4>Vote Average</h4>
            <div className="filter-options">
              {RATING_FILTERS.map(({ label, value }) => (
                <label key={label} className="filter-radio">
                  <input
                    type="radio"
                    name="rating"
                    checked={selectedRating === value}
                    onChange={() => handleRatingChange(value)}
                  />
                  <span>{label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Sort By */}
          <div className="filter-section">
            <h4>Sort By</h4>
            <div className="filter-options">
              {SORT_OPTIONS.map(({ label, value }) => (
                <label key={value} className="filter-radio">
                  <input
                    type="radio"
                    name="sortBy"
                    checked={selectedSort === value}
                    onChange={() => handleSortChange(value)}
                  />
                  <span>{label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}