import { render, screen } from 'vitest';
import ActiveDeals from '../components/ActiveDeals';

test('renders ActiveDeals component', () => {
  render(<ActiveDeals />);
  const activeDealsElement = screen.getByTestId('active-deals');
  expect(activeDealsElement).toBeInTheDocument();
});

test('displays correct number of active deals', () => {
  const deals = [
    { id: 1, name: 'Deal 1', isActive: true },
    { id: 2, name: 'Deal 2', isActive: true },
    { id: 3, name: 'Deal 3', isActive: false },
  ];
  render(<ActiveDeals deals={deals} />);
  const activeDealsElements = screen.getAllByTestId('active-deal');
  expect(activeDealsElements.length).toBe(2);
});

test('displays "No active deals" message when there are no active deals', () => {
  const deals = [
    { id: 1, name: 'Deal 1', isActive: false },
    { id: 2, name: 'Deal 2', isActive: false },
    { id: 3, name: 'Deal 3', isActive: false },
  ];
  render(<ActiveDeals deals={deals} />);
  const noActiveDealsElement = screen.getByText('No active deals');
  expect(noActiveDealsElement).toBeInTheDocument();
});
