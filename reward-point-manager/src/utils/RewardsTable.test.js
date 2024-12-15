import { render, screen, fireEvent } from '@testing-library/react';
import RewardsTable from '../components/RewardsTable';

const mockData = [
  { customerId: 'C1', year: '2024', month: 'December', points: 90 },
  { customerId: 'C2', year: '2024', month: 'December', points: 250 },
  { customerId: 'C3', year: '2024', month: 'December', points: 250 },
  { customerId: 'C4', year: '2024', month: 'December', points: 252 },
  { customerId: 'C5', year: '2024', month: 'December', points: 252 },
  { customerId: 'C6', year: '2024', month: 'December', points: 200 },
  { customerId: 'C7', year: '2024', month: 'December', points: 200 },
  { customerId: 'C8', year: '2024', month: 'December', points: 150 },
  { customerId: 'C9', year: '2024', month: 'December', points: 150 },
  { customerId: 'C10', year: '2024', month: 'December', points: 100 },
  { customerId: 'C11', year: '2024', month: 'December', points: 50 }
];


describe('RewardsTable', () => {
  test('should render the table with data', () => {
    render(<RewardsTable data={mockData} />);
    const rows = screen.getAllByRole('row');
    expect(rows.length).toBe(11);  
  });
});

describe('RewardsTable Pagination', () => {
  test('First button should go to the first page', () => {
    render(<RewardsTable data={mockData} />);
    expect(screen.getByText(/Page 1/)).toBeInTheDocument();
    const firstButton = screen.getByLabelText('First');
    fireEvent.click(firstButton);
    expect(screen.getByText(/Page 1/)).toBeInTheDocument();
  });

  test('Next button should go to the next page', () => {
    render(<RewardsTable data={mockData} />);
    expect(screen.getByText(/Page 1/)).toBeInTheDocument();
    const nextButton = screen.getByLabelText('Next');
    fireEvent.click(nextButton);
    expect(screen.getByText(/Page 2/)).toBeInTheDocument();
  });

  test('Previous button should go to the previous page', () => {
    render(<RewardsTable data={mockData} />);
    const nextButton = screen.getByLabelText('Next');
    fireEvent.click(nextButton);
    expect(screen.getByText(/Page 2/)).toBeInTheDocument();
    const prevButton = screen.getByLabelText('Previous');
    fireEvent.click(prevButton);
    expect(screen.getByText(/Page 1/)).toBeInTheDocument();
  });

  test('Last button should go to the last page', () => {
    render(<RewardsTable data={mockData} />);
    expect(screen.getByText(/Page 1/)).toBeInTheDocument();
    const lastButton = screen.getByLabelText('Last');
    fireEvent.click(lastButton);
    const totalPages = Math.ceil(mockData.length / 10);
    expect(screen.getByText(new RegExp(`Page ${totalPages}`))).toBeInTheDocument();
  });
});
