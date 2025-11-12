import { Loading } from '@/pattern/share/Loading';
import { ReactNode, Suspense } from 'react';
import '../app/globals.css';
import { Toaster } from 'sonner';
import Providers from '@/provider/providers';

export default async function LocaleLayout({ children }: { children: ReactNode }) {
  return (
    <html lang={'en'}>
      <body className="">
        <Providers>
          <Suspense
            fallback={
              <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
              </div>
            }
          >
            {children}
          </Suspense>
          <Toaster richColors closeButton />
          <Loading />
        </Providers>
      </body>
    </html>
  );
}
