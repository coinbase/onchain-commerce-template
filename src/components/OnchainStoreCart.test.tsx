import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import OnchainStoreCart from './OnchainStoreCart';

vi.mock('./OnchainStoreProvider', () => ({
  useOnchainStoreContext: () => ({
    quantities: { p1: 2, p2: 1 },
    setQuantities: vi.fn(),
    products: [
      { id: 'p1', name: 'Product 1', price: 0.04, image: 'p1.png' },
      { id: 'p2', name: 'Product 2', price: 0.01, image: 'p2.png' },
    ],
  }),
}));

vi.mock('src/hooks/useCreateCharge', () => ({
  default: () => ({
    createCharge: vi.fn().mockResolvedValue('charge-123'),
  }),
}));

vi.mock('@coinbase/onchainkit/checkout', () => ({
  Checkout: ({
    children,
  }: {
    children: React.ReactNode;
  }) => <div data-testid="checkout">{children}</div>,
  CheckoutButton: ({
    text,
    disabled,
  }: {
    text: string;
    disabled: boolean;
  }) => (
    <button type="button" disabled={disabled} data-testid="checkout-button">
      {text}
    </button>
  ),
}));

describe('OnchainStoreCart', () => {
  it('calculates and displays correct total', () => {
    render(<OnchainStoreCart />);
    // 2 * 0.04 + 1 * 0.01 = 0.09
    expect(screen.getByText('TOTAL 0.09 USDC')).toBeInTheDocument();
  });

  it('renders the checkout component', () => {
    render(<OnchainStoreCart />);
    expect(screen.getByTestId('checkout')).toBeInTheDocument();
    expect(screen.getByTestId('checkout-button')).toBeInTheDocument();
  });

  it('shows Pay with Crypto text', () => {
    render(<OnchainStoreCart />);
    expect(screen.getByText('Pay with Crypto')).toBeInTheDocument();
  });
});
