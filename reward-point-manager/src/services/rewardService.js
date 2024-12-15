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
 * Processes a list of transactions and calculates reward points for each customer, 
 * grouped by year and month.
 * 
 * @param {Array} transactions - The list of transactions with customerId, amount, and date.
 * @returns {Array} - An array of processed reward data with customerId, year, month, and points.
 */
export const processRewardData = (transactions) => {
  const rewardsByCustomer = {};

  transactions.forEach(({ customerId, amount, date }) => {
    const dateObj = new Date(date);
    const month = dateObj.toLocaleString('default', { month: 'long' });
    const year = dateObj.getFullYear();
    const points = calculateRewardPoints(Math.round(amount));

    // Initialize customer and year if they don't exist
    if (!rewardsByCustomer[customerId]) {
      rewardsByCustomer[customerId] = {};
    }
    if (!rewardsByCustomer[customerId][year]) {
      rewardsByCustomer[customerId][year] = {};
    }

    // Initialize the month if it doesn't exist for the current year
    if (!rewardsByCustomer[customerId][year][month]) {
      rewardsByCustomer[customerId][year][month] = 0;
    }

    // Accumulate points
    rewardsByCustomer[customerId][year][month] = rewardsByCustomer[customerId][year][month] + points;
  });

  // Flatten the object to an array
  return Object.entries(rewardsByCustomer).flatMap(([customerId, years]) =>
    Object.entries(years).flatMap(([year, months]) =>
      Object.entries(months).map(([month, points]) => ({
        customerId,
        year,
        month,
        points,
      }))
    )
  ).sort();
};


/**
 * A helper function to filter reward data based on a search query.
 * 
 * @param {Array} data - The reward data to filter.
 * @param {string} query - The search query to match.
 * @returns {Array} - The filtered data.
 */
export const filterRewardData = (data, query) => {
  return data.filter(
    ({ customerId, month, year }) =>
      customerId.toLowerCase().includes(query.toLowerCase()) ||
      month.toLowerCase().includes(query.toLowerCase()) ||
      year.toString().includes(query)
  );
};
