import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { products } from 'src/data/products';
import type { OnchainStoreContextType, Quantities } from '../types';

const CART_STORAGE_KEY = 'cart-quantities';

const emptyContext = {} as OnchainStoreContextType;

const OnchainStoreContext =
  createContext<OnchainStoreContextType>(emptyContext);

type OnchainStoreProviderReact = {
  children: ReactNode;
};

export function OnchainStoreProvider({ children }: OnchainStoreProviderReact) {
  const [quantities, setQuantities] = useState<Quantities>(() => {
    if (typeof window === 'undefined') {
      return {};
    }
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(quantities));
    } catch {}
  }, [quantities]);

  const value = useMemo(() => {
    return {
      quantities,
      setQuantities,
      products,
    };
  }, [quantities]);

  return (
    <OnchainStoreContext.Provider value={value}>
      {children}
    </OnchainStoreContext.Provider>
  );
}

export function useOnchainStoreContext() {
  return useContext(OnchainStoreContext);
}
