import { useCallback } from 'react';
import type { ChargeDetails } from 'src/types';

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
