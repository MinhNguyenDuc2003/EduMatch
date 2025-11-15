import Loading from '@/pattern/share/Loading';
import { ReactNode, Suspense } from 'react';
import '../globals.css';
import { Toaster } from 'sonner';
import Providers from '@/provider/providers';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { map } from 'lodash';
import { hasLocale, NextIntlClientProvider } from 'next-intl';

export function generateStacticParams() {
  return map(routing.locales, (locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  let messages;
  try {
    messages = (await import(`@/messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body className="">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Providers>
            <Suspense fallback={<Loading />}>{children}</Suspense>
            <Toaster richColors closeButton />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
