import React, { useState, useCallback } from 'react';
import '../styles/SearchBar.scss';

/**
 * Component for a search bar with debounce functionality.
 * @param {Object} props - Component properties.
 * @param {Function} props.onSearch - Callback function triggered on search.
 * @returns {JSX.Element} SearchBar component.
 */
const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const debounce = (func, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };

  const debouncedSearch = useCallback(
    debounce((searchQuery) => {
      onSearch(searchQuery);
    }, 300),
    [onSearch]
  );

  const handleInputChange = (event) => {
    const value = event.target.value;
    setQuery(value);
    debouncedSearch(value);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        className="form-control"
        placeholder="Search by Customer ID or Month"
      />
    </div>
  );
};

export default React.memo(SearchBar);