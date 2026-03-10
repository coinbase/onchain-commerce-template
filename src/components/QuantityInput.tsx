import { useCallback, useMemo } from 'react';
import MinusSvg from 'src/svg/MinusSvg';
import PlusSvg from 'src/svg/PlusSvg';
import type {
  Quantities,
  QuantityInputButtonReact,
  QuantityInputReact,
} from 'src/types';
import { useOnchainStoreContext } from './OnchainStoreProvider';

function QuantityInputButton({
  onClick,
  svg,
  label,
}: QuantityInputButtonReact) {
  return (
    <button
      className="flex h-8 w-8 items-center justify-center rounded border border-gray-200 p-0"
      onClick={onClick}
      type="button"
    >
      <span className="sr-only">{label}</span>
      {svg}
    </button>
  );
}

export default function QuantityInput({ productId }: QuantityInputReact) {
  const { quantities, setQuantities } = useOnchainStoreContext();

  const currentItemQuantity = useMemo(() => {
    return quantities[productId] || 0;
  }, [quantities, productId]);

  const handleIncrement = useCallback(() => {
    setQuantities((prev: Quantities) => {
      return { ...prev, [productId]: currentItemQuantity + 1 };
    });
  }, [currentItemQuantity, productId, setQuantities]);

  const handleDecrement = useCallback(() => {
    const newQuantity = Math.max(0, currentItemQuantity - 1);
    setQuantities((prev: Quantities) => {
      return { ...prev, [productId]: newQuantity };
    });
  }, [currentItemQuantity, productId, setQuantities]);

  return (
    <div className="flex items-center space-x-2">
      <QuantityInputButton
        label="Decrease quantity"
        svg={<MinusSvg />}
        onClick={handleDecrement}
      />
      <span className="w-8 text-center font-medium text-sm">
        {currentItemQuantity}
      </span>
      <QuantityInputButton
        label="Increase quantity"
        svg={<PlusSvg />}
        onClick={handleIncrement}
      />
    </div>
  );
}
