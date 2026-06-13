import { useState, useCallback } from 'react';
import './SearchBar.css';

export default function SearchBar({ onSearch, placeholder = 'Search movies...', isLoading = false }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = useCallback((e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  }, [onSearch]);

  const handleClear = useCallback(() => {
    setSearchTerm('');
    onSearch('');
  }, [onSearch]);

  return (
    <div className="search-bar">
      <span className="search-icon material-symbols-outlined">search</span>
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder={placeholder}
        className="search-input"
        aria-label="Search movies"
        disabled={isLoading}
      />
      {searchTerm && !isLoading && (
        <button
          onClick={handleClear}
          className="clear-btn"
          aria-label="Clear search"
        >
          ✕
        </button>
      )}
      {isLoading && (
        <span className="search-loading">Loading...</span>
      )}
    </div>
  );
}