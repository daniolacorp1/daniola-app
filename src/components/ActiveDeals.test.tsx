import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import ActiveDeals from './ActiveDeals';
import { describe, it, expect } from 'vitest';

describe('ActiveDeals', () => {
  it('displays "No active deals" message when there are no active deals', () => {
    const deals = [
      { id: 1, name: 'Deal 1', isActive: false },
      { id: 2, name: 'Deal 2', isActive: false },
      { id: 3, name: 'Deal 3', isActive: false },
    ];
    // eslint-disable-next-line react/react-in-jsx-scope
    render(<ActiveDeals deals={deals} />);
    expect(screen.getByText('No active deals')).toBeInTheDocument();
  });

  it('displays active deals when present', () => {
    const deals = [
      { id: 1, name: 'Deal 1', isActive: true },
      { id: 2, name: 'Deal 2', isActive: false },
      { id: 3, name: 'Deal 3', isActive: true },
    ];
    render(<ActiveDeals deals={deals} />);
    expect(screen.getByText('Deal 1')).toBeInTheDocument();
    expect(screen.queryByText('Deal 2')).not.toBeInTheDocument();
    expect(screen.getByText('Deal 3')).toBeInTheDocument();
  });
});