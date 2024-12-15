import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import RewardsTable from './components/RewardsTable';
import Header from './components/Header';
import Footer from './components/Footer';
import Error from './components/Error';
import Loading from './components/Loading';
import { fetchTransactions } from './services/transactionsService';
import { processRewardData, filterRewardData } from './services/rewardService';

/**
 * Main application component.
 * @returns {JSX.Element} App component.
 */
const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [rewardData, setRewardData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [noResults, setNoResults] = useState(false);  // Track if no results after search

  useEffect(() => {
    const loadTransactions = async () => {
      try {
        const data = await fetchTransactions();
        setTransactions(data);
        const rewards = processRewardData(data);
        setRewardData(rewards);
        setFilteredData(rewards);
      } catch (err) {
        setError('Failed to load transactions.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadTransactions();
  }, []);

  /**
   * Handle search input changes and filter reward data.
   * 
   * @param {string} query - The search query to filter data.
   */
  const handleSearch = (query) => {
    const filtered = filterRewardData(rewardData, query);
    setFilteredData(filtered);
    setNoResults(filtered.length === 0);  // If no results found, set noResults to true
  };

  return (
    <div className="App container-fluid">
      <Header />
      {loading && <Loading />}
      {error && <Error message={error} />}
      {!loading && !error && (
        <>
          <SearchBar onSearch={handleSearch} />
          {noResults && <p>No records found" </p>}
          {!noResults && <RewardsTable data={filteredData} /> }
        </>
      )}
      <Footer />
    </div>
  );
};

export default App;
