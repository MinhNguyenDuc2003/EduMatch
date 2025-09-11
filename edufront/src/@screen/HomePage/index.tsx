'use client';

import { Container } from '@/lib/by/Div';
import Header from '@/pattern/core/Header';
import LanguageSwitcher from '@/pattern/share/LanguageSwitcher';
import { useTranslations } from 'next-intl';
import Context from './seg/context';

export default function HomePage() {
  const t = useTranslations('home');
  return (
    <Context.Provider>
      <Context.Consumer>
        {({ data }) => {
          return (
            <>
              <h1>{t('title')}</h1>
              <Header />
               <LanguageSwitcher />
            </>
          );
        }}
      </Context.Consumer>
    </Context.Provider>
  );
}
