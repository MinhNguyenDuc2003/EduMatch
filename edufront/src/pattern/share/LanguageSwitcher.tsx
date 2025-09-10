'use client';


import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/src/i18n/navigation';
import { sStore } from '@/src/stores';

export default function LanguageSwitcher() {
  const pathname = usePathname();
const locale = useLocale();
const router = useRouter();
const ss = sStore();
const switchLocale = (newLocale: string) => {
  if (newLocale !== locale) {
    ss.setAuthData({Locale: newLocale});
    router.replace(pathname, { locale: newLocale });
    router.refresh();
  }
}
  return (
    <select value={locale} onChange={(e) => switchLocale(e.target.value)}>
      <option value="en">English</option>
      <option value="vi">Vietnamese</option>
      /</select>
  );
}
