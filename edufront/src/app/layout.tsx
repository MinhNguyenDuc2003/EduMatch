import { Loading } from '@/pattern/share/Loading';
import { ReactNode } from 'react';
import '../app/globals.css';
import { Toaster } from 'sonner';
import Providers from '@/provider/providers';

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale?: string }>;
}) {
  return (
    <html lang={'en'}>
      <body className="">
        <Providers>
          {children}
          <Toaster richColors closeButton />
          <Loading />
        </Providers>
      </body>
    </html>
  );
}
