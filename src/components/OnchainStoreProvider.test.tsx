import { act, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  OnchainStoreProvider,
  useOnchainStoreContext,
} from './OnchainStoreProvider';

vi.mock('src/data/products', () => ({
  products: [{ id: 'p1', name: 'Test Product', price: 1.0, image: 'test.png' }],
}));

function TestConsumer() {
  const { quantities, setQuantities, products } = useOnchainStoreContext();
  return (
    <div>
      <span data-testid="quantities">{JSON.stringify(quantities)}</span>
      <span data-testid="products">{products?.length}</span>
      <button
        type="button"
        onClick={() => {
          setQuantities({ p1: 3 });
        }}
      >
        Set Quantity
      </button>
    </div>
  );
}

describe('OnchainStoreProvider', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders children', () => {
    render(
      <OnchainStoreProvider>
        <span>child</span>
      </OnchainStoreProvider>,
    );
    expect(screen.getByText('child')).toBeInTheDocument();
  });

  it('provides products', () => {
    render(
      <OnchainStoreProvider>
        <TestConsumer />
      </OnchainStoreProvider>,
    );
    expect(screen.getByTestId('products')).toHaveTextContent('1');
  });

  it('provides default empty quantities', () => {
    render(
      <OnchainStoreProvider>
        <TestConsumer />
      </OnchainStoreProvider>,
    );
    expect(screen.getByTestId('quantities')).toHaveTextContent('{}');
  });

  it('updates quantities via setQuantities', () => {
    render(
      <OnchainStoreProvider>
        <TestConsumer />
      </OnchainStoreProvider>,
    );
    act(() => {
      screen.getByText('Set Quantity').click();
    });
    expect(screen.getByTestId('quantities')).toHaveTextContent('{"p1":3}');
  });

  it('persists quantities to localStorage', () => {
    render(
      <OnchainStoreProvider>
        <TestConsumer />
      </OnchainStoreProvider>,
    );
    act(() => {
      screen.getByText('Set Quantity').click();
    });
    const stored = localStorage.getItem('cart-quantities');
    expect(stored).toBe('{"p1":3}');
  });

  it('restores quantities from localStorage', () => {
    localStorage.setItem('cart-quantities', JSON.stringify({ p1: 5 }));
    render(
      <OnchainStoreProvider>
        <TestConsumer />
      </OnchainStoreProvider>,
    );
    expect(screen.getByTestId('quantities')).toHaveTextContent('{"p1":5}');
  });
});
