import React, { useState, useCallback } from 'react';
import { debounce } from '../services/debounce'; 
import '../styles/SearchBar.scss';

/**
 * SearchBar component that allows the user to search for transactions by customer ID or month.
 * 
 * @param {Function} onSearch - The function to call when the search input changes.
 */
const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  // Create a debounced version of the search function to reduce the number of calls
  const debouncedSearch = useCallback(
    debounce((searchQuery) => {
      onSearch(searchQuery);
    }, 300), // 300ms delay before triggering search
    [onSearch]
  );

  const handleInputChange = (event) => {
    const value = event.target.value;
    setQuery(value);
    debouncedSearch(value);  // Trigger debounced search
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

export default React.memo(SearchBar);  // Memoize component to avoid unnecessary re-renders
