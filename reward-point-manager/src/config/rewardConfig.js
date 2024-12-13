/**
 * @fileoverview Configuration for reward points calculation.
 * This file contains configurable values such as the reward rate and the amount ranges.
 */

const rewardConfig = {
    amountRanges: [
      { min: 50, max: 100, rate: 1 }, // 1 point for every dollar between 50 and 100
      { min: 100, max: Infinity, rate: 2 } // 2 points for every dollar above 100
    ]
  };
  
  export default rewardConfig;
  