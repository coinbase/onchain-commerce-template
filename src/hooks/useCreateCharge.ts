import { useCallback } from 'react';

type Price = {
  amount: string;
  currency: string;
};
export type ChargeDetails = {
  name?: string;
  description?: string;
  pricing_type?: string;
  local_price?: Price;
};

const useCreateCharge = () => {
  const createCharge = useCallback(async (chargeDetails: ChargeDetails) => {
    try {
      const res = await fetch('/api/charges', {
        method: 'POST',
        body: JSON.stringify(chargeDetails),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Failed to create charge');
      }

      const { id } = await res.json();
      return id;
    } catch (error) {
      console.error('Error creating charge:', error);
      throw error;
    }
  }, []);

  return { createCharge };
};

export default useCreateCharge;
