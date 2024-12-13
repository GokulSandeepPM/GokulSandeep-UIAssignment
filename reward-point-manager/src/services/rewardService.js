/**
 * @fileoverview Service to handle reward calculation and data processing logic.
 */

import rewardConfig from '../config/rewardConfig';

/**
 * Calculate reward points for a given transaction amount using configurable rates.
 * @param {number} amount - Transaction amount.
 * @returns {number} Reward points earned.
 */
export const calculateRewardPoints = (amount) => {
  let totalPoints = 0;

  // Iterate the configured amount ranges and calculate points for the amount.
  for (const range of rewardConfig.amountRanges) {
    if (amount > range.min) {
      const applicableAmount = Math.min(amount, range.max) - range.min;
      totalPoints += applicableAmount * range.rate;
    }
  }

  return totalPoints;
};

/**
 * Process transaction data to calculate rewards for each customer.
 * @param {Array} transactions - Array of transaction objects with `customerId`, `amount`, and `date`.
 * @returns {Array} Array of processed reward data, each containing `customerId`, `month`, and `points`.
 */
export const processRewardData = (transactions) => {
  // An object to store rewards data grouped by customer and month.
  const rewardsByCustomer = {};

  // Loop through all transactions to process the data.
  transactions.forEach(({ customerId, amount, date }) => {
    // Extract the month from the transaction date.
    const month = new Date(date).toLocaleString('default', { month: 'long' });
    
    // Calculate reward points based on the transaction amount.
    const points = calculateRewardPoints(amount);

    // If this customer doesn't exist in the rewards object, initialize their entry.
    if (!rewardsByCustomer[customerId]) {
      rewardsByCustomer[customerId] = {};
    }

    // If the month does not exist for this customer, initialize it with 0 points.
    if (!rewardsByCustomer[customerId][month]) {
      rewardsByCustomer[customerId][month] = 0;
    }

    // Add the calculated points to the existing points for that month and customer.
    rewardsByCustomer[customerId][month] = parseFloat(
      (rewardsByCustomer[customerId][month] + points).toFixed(2)
    );
  });

  // Convert the rewardsByCustomer object into an array of reward entries.
  return Object.entries(rewardsByCustomer).flatMap(([customerId, months]) =>
    Object.entries(months).map(([month, points]) => ({
      customerId,
      month,
      points,
    }))
  );
};


/**
 * Filter reward data based on a search query (customerId or month).
 * @param {Array} data - The reward data.
 * @param {string} query - The search query.
 * @returns {Array} Filtered reward data.
 */
export const filterRewardData = (data, query) => {
  if (!query) return data;
  
  //convert the query string to lower case
  const lowerCaseQuery = query.toLowerCase();
  //return the items that matches the query string
  return data.filter(
    ({ customerId, month }) =>
      customerId.toLowerCase().includes(lowerCaseQuery) ||
      month.toLowerCase().includes(lowerCaseQuery)
  );
};
