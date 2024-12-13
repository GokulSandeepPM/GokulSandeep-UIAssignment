import React, { useEffect, useState } from 'react';
import './styles/App.scss';
import Header from './components/Header';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';
import RewardsTable from './components/RewardsTable';
import Loading from './components/Loading';
import Error from './components/Error';
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

  // Load transactions on initial load
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

  // Handle search functionality
  const handleSearch = (query) => {
    const filtered = filterRewardData(rewardData, query);
    setFilteredData(filtered);
  };

  return (
    <div className="App container-fluid">
      <Header />
      {loading && <Loading />}
      {error && <Error message={error} />}
      {!loading && !error && (
        <>
          <SearchBar onSearch={handleSearch} />
          <RewardsTable data={filteredData} />
        </>
      )}
      <Footer />
    </div>
  );
};

export default App;
