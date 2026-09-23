import { createContext, useContext, useState, ReactNode } from 'react';

interface CurrencyContextType {
  currency: 'KSh' | 'USD' | 'EUR';
  setCurrency: (c: 'KSh' | 'USD' | 'EUR') => void;
  formatPrice: (priceKSh: number) => string;
  rates: Record<string, number>;
}

const rates: Record<string, number> = {
  KSh: 1,
  USD: 0.0077,
  EUR: 0.0071,
};

const symbols: Record<string, string> = {
  KSh: 'KSh',
  USD: '$',
  EUR: '€',
};

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = useState<'KSh' | 'USD' | 'EUR'>('KSh');

  const formatPrice = (priceKSh: number) => {
    const converted = priceKSh * rates[currency];
    if (currency === 'KSh') return `KSh ${Math.round(converted).toLocaleString()}`;
    return `${symbols[currency]}${converted.toFixed(2)}`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice, rates }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error('useCurrency must be used within CurrencyProvider');
  return ctx;
}
