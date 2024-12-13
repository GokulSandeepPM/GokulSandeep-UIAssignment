import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SearchBar from '../components/SearchBar'

describe('SearchBar', () => {
  test('should call onSearch with correct query after debouncing', async () => {
    const mockOnSearch = jest.fn();
    render(<SearchBar onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText('Search by Customer ID or Month');
    fireEvent.change(input, { target: { value: 'C1' } });
    fireEvent.change(input, { target: { value: 'C12' } });

    // Wait for debounce to finish
    await waitFor(() => expect(mockOnSearch).toHaveBeenCalledWith('C12'), { timeout: 500 });
  });
});
