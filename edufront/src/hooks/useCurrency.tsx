'use client';

import { useState } from 'react';

function useCurrency() {
  const [currencyd, setCurrencyd] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const Currency = async ({ amount, target, locale }: { amount: number; target: string, locale: string }) => {
    if (!amount) return;
    setLoading(true);
    setError('');
    setCurrencyd('');

    try {
      const res = await fetch(
        `https://v6.exchangerate-api.com/v6/6f412e0c779451555f5346c6/latest/${locale}`
      );
      const data = await res.json();

      if (data.result === 'success') {
        const rate = data.conversion_rates[target];
        if (!rate) throw new Error(`Currency ${target} not supported`);
        const converted = amount * rate;
        setCurrencyd(`${converted.toLocaleString()} ${target}`);
      } else {
        setError('Currency API failed');
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Currency failed');
    } finally {
      setLoading(false);
    }
  };

  return { currencyd, Currency, loading, error };
}

export default useCurrency;
