import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SearchBar from '../components/SearchBar';
import App from '../App';

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

  test('should handle blank query', async () => {
    const mockOnSearch = jest.fn();
    render(<SearchBar onSearch={mockOnSearch} />);
    const input = screen.getByPlaceholderText('Search by Customer ID or Month');
    fireEvent.change(input, { target: { value: '' } });
    fireEvent.blur(input); 
    await waitFor(() => expect(mockOnSearch).not.toHaveBeenCalled());  
  });

  test('should handle invalid query', async () => {
    const mockOnSearch = jest.fn();
    render(<SearchBar onSearch={mockOnSearch} />);
    const input = screen.getByPlaceholderText('Search by Customer ID or Month');
    fireEvent.change(input, { target: { value: 'InvalidQuery' } });
    await waitFor(() => expect(mockOnSearch).toHaveBeenCalledWith('InvalidQuery'), { timeout: 500 });
  });
});
