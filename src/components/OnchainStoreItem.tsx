import Image from 'next/image';
import type { Product } from 'src/types';
import QuantityInput from './QuantityInput';

export default function OnchainStoreItem({ id, name, price, image }: Product) {
  return (
    <div className="store-item mx-auto flex w-full flex-col p-4 sm:mx-0 lg:p-6">
      <div className="mb-1 flex items-start justify-between">
        <h2 className="font-regular text-xs">{name}</h2>
      </div>
      <div className="flex grow justify-center md:relative">
        <Image
          src={image}
          alt={name}
          className="mx-auto object-contain max-sm:max-w-[300px] md:absolute md:h-full md:w-auto"
        />
      </div>
      <div className="flex items-center justify-between">
        <p className="font-regular text-xs">{price.toFixed(2)} USDC</p>
        <QuantityInput productId={id} />
      </div>
    </div>
  );
}
