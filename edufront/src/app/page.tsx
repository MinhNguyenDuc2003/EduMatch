// import { setRequestLocale } from 'next-intl/server';
import { redirect } from 'next/navigation';

// import { use } from 'react';
export default function Home() {
  // const { locale } = use(params);
  // setRequestLocale(locale);

  return redirect('/home');
}
