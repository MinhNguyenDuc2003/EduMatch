import { ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { hasLocale } from 'next-intl';
import { map } from 'lodash';
import { setRequestLocale } from 'next-intl/server';
import { Loading } from '@/pattern/share/Loading';
import './globals.css';

export function generateStacticParams() {
  return map(routing.locales, (locale) => ({ locale }));
}
export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale?: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  let messages;
  try {
    messages = (await import(`../../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html lang={locale}>
      <body className="antialiased">
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
          <Loading />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
