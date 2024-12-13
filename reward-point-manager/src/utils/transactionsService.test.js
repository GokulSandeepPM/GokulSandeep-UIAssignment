import { fetchTransactions } from "../services/transactionsService";

global.fetch = jest.fn();  // Mock the global fetch function

describe('fetchTransactions', () => {
  afterEach(() => {
    fetch.mockClear(); // Clear the mock after each test
  });

  test('should fetch transactions successfully', async () => {
    const mockResponse = [{ customerId: 'C1', amount: 120, date: '2024-12-01' }];
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await fetchTransactions();
    expect(result).toEqual(mockResponse);
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  test('should handle fetch errors', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      statusText: 'Not Found',
    });

    try {
      await fetchTransactions();
    } catch (error) {
      expect(error).toEqual(new Error('Error fetching transactions: Not Found'));
    }
  });
});
