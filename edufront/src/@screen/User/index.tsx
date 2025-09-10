"use client";
import React from 'react'
import useTranslate from '@/src/hooks/useTranslate';
import { sStore } from '@/src/stores';

export default function User() {
     const { translate, translated, loading, error } = useTranslate();
     const ss = sStore();
     const locale = ss.Auth?.Locale
  const Text =
    'Nepal’s prime minister has quit amid deadly Gen Z protests over a social media ban and corruption. Here’s what to know';
    return (
        <div>
        <p>{Text}</p>
        <button onClick={() => translate(Text, locale ?? 'ti')} disabled={loading}>
          {loading ? 'Đang dịch...' : 'Dịch sang Tiếng Việt'}
        </button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {translated && (
          <p>
            <strong>Bản dịch:</strong> {translated}
          </p>
        )}
      </div>
    )
}
