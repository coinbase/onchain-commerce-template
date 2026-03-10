import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import OnchainStoreItem from './OnchainStoreItem';

const mockProduct = {
  id: '1',
  name: 'Sample Product',
  price: 19.99,
  image: 'https://example.com/image.jpg',
};

vi.mock('./QuantityInput', () => {
  return {
    default: ({ productId }: { productId: string }) => (
      <input data-testid={`quantity-input-${productId}`} />
    ),
  };
});

vi.mock('next/image', () => {
  return {
    default: ({
      src,
      alt,
      className,
    }: {
      src: string;
      alt: string;
      className: string;
    }) => <img src={src} alt={alt} className={className} />,
  };
});

describe('OnchainStoreItem', () => {
  it('should render product information correctly', () => {
    render(<OnchainStoreItem {...mockProduct} />);

    expect(screen.getByText('Sample Product')).toBeInTheDocument();
    expect(screen.getByText('19.99 USDC')).toBeInTheDocument();
    const imageElement = screen.getByAltText('Sample Product');
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute('src', mockProduct.image);
    expect(screen.getByTestId('quantity-input-1')).toBeInTheDocument();
  });
});
