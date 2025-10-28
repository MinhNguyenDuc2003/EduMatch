import { Loading } from '@/pattern/share/Loading';
import { ReactNode } from 'react';
import '../app/globals.css';

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale?: string }>;
}) {
  return (
    <html lang={'en'}>
      <body>
        {children}
        <Loading />
      </body>
    </html>
  );
}
