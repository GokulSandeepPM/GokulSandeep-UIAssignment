/**
 * @fileoverview Service for fetching transaction data from the mock server.
 */

const API_URL = 'http://localhost:5000/transactions';

/**
 * Fetch transaction data from the API.
 * @returns {Promise<Array>} A promise resolving to an array of transactions.
 * @throws {Error} Will throw an error if the fetch request fails.
 */
export const fetchTransactions = async () => {
  try {
    // Make a GET request to the API to fetch transaction data.
    const response = await fetch(API_URL);
    
    // Check if the response is successful (status code 200-299).
    if (!response.ok) {
      throw new Error(`Error fetching transactions: ${response.statusText}`);
    }

    // Parse the JSON response and return the transaction data.
    return await response.json();
  } catch (error) {
    // Log the error and rethrow it.
    console.error('Failed to fetch transactions:', error);
    throw error;
  }
};
