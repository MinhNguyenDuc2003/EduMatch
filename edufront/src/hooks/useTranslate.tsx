'use client';

import { useState } from 'react';

function useTranslate() {
  const [translated, setTranslated] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const translate = async (text: string, target: string) => {
    if (!text) return;
    setLoading(true);
    setError('');
    setTranslated('');

    try {
      const res = await fetch('/api/gemini/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, target })
      });

      const data = await res.json();

      if (res.ok) {
        setTranslated(data.translated);
      } else {
        setError(data.error || 'Translation failed');
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Translation failed');
    } finally {
      setLoading(false);
    }
  };

  return { translated, translate, loading, error };
}

export default useTranslate;
