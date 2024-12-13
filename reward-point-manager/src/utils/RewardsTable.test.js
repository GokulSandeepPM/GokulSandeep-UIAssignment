import { render, screen, fireEvent } from '@testing-library/react';
import RewardsTable from '../components/RewardsTable';

const mockData = [
  { customerId: 'C1', month: 'December', points: 120 },
  { customerId: 'C2', month: 'December', points: 150 },
];

describe('RewardsTable', () => {
  test('should render the table with data', () => {
    render(<RewardsTable data={mockData} />);
    const rows = screen.getAllByRole('row');
    expect(rows.length).toBe(mockData.length + 1);  
  });

  test('should change page when pagination buttons are clicked', () => {
    render(<RewardsTable data={mockData} />);
    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton);
  });
});
