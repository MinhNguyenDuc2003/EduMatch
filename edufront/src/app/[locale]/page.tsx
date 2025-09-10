import Header from '@/src/pattern/core/Header';
import LanguageSwitcher from '@/src/pattern/share/LanguageSwitcher';
import { setRequestLocale } from 'next-intl/server';
import { use } from 'react';
import { useTranslations } from 'next-intl';
import { Content, Core } from '../../lib/by/Div';
export default function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const t = useTranslations('home');
 
  return (
    <Core>
      <h1>{t('title')}</h1>;
     
      <Content>
        <Header />
        <LanguageSwitcher />
      </Content>
    </Core>
  );
}
