'use client';
import useTranslate from '@/hooks/useTranslate';
import { sStore } from '@/stores';
import { onSetLoading } from '@/utils/eventBus';
import Context from './context';

export default function User() {
  const { translate, translated, loading, error } = useTranslate();
  const ss = sStore();
  const locale = ss.Auth?.Locale;
  onSetLoading(loading);
  const Text =
    'Nepal’s prime minister has quit amid deadly Gen Z protests over a social media ban and corruption. Here’s what to know';
  return (
    <Context.Provider>
      <Context.Consumer>
        {({ data }) => {
          console.log('data', data)
          return (
            <>
              <div>
                <p className='text-2xl'>{Text}</p>
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
            </>
          );
        }}
      </Context.Consumer>
    </Context.Provider>
  );
}
