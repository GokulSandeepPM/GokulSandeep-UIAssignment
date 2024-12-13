import { calculateRewardPoints,processRewardData } from "../services/rewardService";

describe('calculateRewardPoints', () => {
  test('should return 0 for amounts less than or equal to 50', () => {
    expect(calculateRewardPoints(50)).toBe(0);
    expect(calculateRewardPoints(30)).toBe(0);
  });

  test('should calculate points for amounts between 50 and 100', () => {
    expect(calculateRewardPoints(75)).toBe(25);
  });

  test('should calculate points for amounts over 100', () => {
    expect(calculateRewardPoints(150)).toBe(150);
  });
});

describe('processRewardData', () => {
  const mockTransactions = [
    { customerId: 'C1', amount: 120, date: '2024-12-01' },
    { customerId: 'C1', amount: 50, date: '2024-12-15' },
    { customerId: 'C2', amount: 200, date: '2024-12-20' },
  ];

  test('should correctly process transaction data and calculate rewards', () => {
    const result = processRewardData(mockTransactions);

    expect(result).toEqual([
      { customerId: 'C1', month: 'December', points: 90 },
      { customerId: 'C2', month: 'December', points: 250 },
    ]);
  });

  test('should handle empty transactions array', () => {
    const result = processRewardData([]);
    expect(result).toEqual([]);
  });
});
