import { act, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import QuantityInput from './QuantityInput';

const mockSetQuantities = vi.fn();
let mockQuantities: Record<string, number> = {};

vi.mock('./OnchainStoreProvider', () => ({
  useOnchainStoreContext: () => ({
    quantities: mockQuantities,
    setQuantities: mockSetQuantities,
    products: [],
  }),
}));

vi.mock('src/svg/PlusSvg', () => ({
  default: () => <span>+</span>,
}));

vi.mock('src/svg/MinusSvg', () => ({
  default: () => <span>-</span>,
}));

describe('QuantityInput', () => {
  beforeEach(() => {
    mockSetQuantities.mockClear();
  });

  it('renders with quantity 0 by default', () => {
    mockQuantities = {};
    render(<QuantityInput productId="p1" />);
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('displays current quantity from context', () => {
    mockQuantities = { p1: 5 };
    render(<QuantityInput productId="p1" />);
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('calls setQuantities on increment', () => {
    mockQuantities = { p1: 2 };
    mockSetQuantities.mockImplementation(() => {});
    render(<QuantityInput productId="p1" />);

    act(() => {
      screen.getByRole('button', { name: /Increase quantity/ }).click();
    });

    expect(mockSetQuantities).toHaveBeenCalled();
    const updater = mockSetQuantities.mock.calls[0][0];
    const result = updater({ p1: 2 });
    expect(result.p1).toBe(3);
  });

  it('calls setQuantities on decrement', () => {
    mockQuantities = { p1: 2 };
    mockSetQuantities.mockImplementation(() => {});
    render(<QuantityInput productId="p1" />);

    act(() => {
      screen.getByRole('button', { name: /Decrease quantity/ }).click();
    });

    expect(mockSetQuantities).toHaveBeenCalled();
    const updater = mockSetQuantities.mock.calls[0][0];
    const result = updater({ p1: 2 });
    expect(result.p1).toBe(1);
  });

  it('does not go below 0 on decrement', () => {
    mockQuantities = { p1: 0 };
    mockSetQuantities.mockImplementation(() => {});
    render(<QuantityInput productId="p1" />);

    act(() => {
      screen.getByRole('button', { name: /Decrease quantity/ }).click();
    });

    expect(mockSetQuantities).toHaveBeenCalled();
    const updater = mockSetQuantities.mock.calls[0][0];
    const result = updater({ p1: 0 });
    expect(result.p1).toBe(0);
  });
});
