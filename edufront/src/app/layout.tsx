import Loading from '@/pattern/share/Loading';
import { ReactNode, Suspense } from 'react';
import '../app/globals.css';
import { Toaster } from 'sonner';
import Providers from '@/provider/providers';

export default async function LocaleLayout({ children }: { children: ReactNode }) {
  return (
    <html lang={'en'}>
      <body className="">
        <Providers>
          <Suspense fallback={<Loading />}>{children}</Suspense>
          <Toaster richColors closeButton />
        </Providers>
      </body>
    </html>
  );
}
