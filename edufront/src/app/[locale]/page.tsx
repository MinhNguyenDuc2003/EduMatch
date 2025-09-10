import Header from '@/pattern/core/Header';
import LanguageSwitcher from '@/pattern/share/LanguageSwitcher';
import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { use } from 'react';
import { Content, Core } from '../../lib/by/Div';
import Context from '@/@screen/HomePage/seg/context';
export default function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const t = useTranslations('home');

  return (
    // <Context.Provider>
    //   <Context.Consumer>
    // {({data}) => {
    //   console.log('data', data)
    //   return <>
    <Core>
      <h1 className="text-red-800">{t('title')}</h1>

      <Content>
        <Header />
        <LanguageSwitcher />
      </Content>
    </Core>
    //   </>;
    // }}

    //   </Context.Consumer>

    // </Context.Provider>
  );
}
