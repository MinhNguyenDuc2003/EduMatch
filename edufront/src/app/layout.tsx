import { Loading } from '@/pattern/share/Loading';
import { ReactNode } from 'react';
import '../app/globals.css';
import { NextIntlClientProvider } from 'next-intl';

// export function generateStacticParams() {
//   return map(routing.locales, (locale) => ({ locale }));
// }
export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale?: string }>;
}) {
  // const { locale } = await params;

  // if (!hasLocale(routing.locales, locale)) {
  //   notFound();
  // }

  let messages;
  try {
    messages = (await import(`../../messages/${'en'}.json`)).default;
  } catch (error) {
    messages = (await import(`../../messages/${'en'}.json`)).default;
  }

  // setRequestLocale(locale);

  return (
    <html lang={'en'}>
      <body className="p-[150px]">
        <NextIntlClientProvider locale={'en'} messages={messages}>
        {children}
        <Loading />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
