'use client';

import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/lib/cus/select';
import Image from 'next/image';

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const locale = useLocale();
  const router = useRouter();

  const t = useTranslations('navbar.language');

  const switchLocale = (newLocale: string) => {
    if (newLocale !== locale) {
      router.replace(pathname, { locale: newLocale });
      router.refresh();
    }
  };
  return (
    <Select value={locale} onValueChange={(value) => switchLocale(value)}>
      <SelectTrigger>
        <SelectValue placeholder="Select a language" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="en">
          <Image
            src={'https://es5urvh1np.ufs.sh/f/DHR6tEJ9PQozY9ua45LhWAe0FLoHOstr7ib9IKxmcUqV1RP3'}
            alt="English"
            width={20}
            height={10}
            unoptimized
          />
          {t('en')}
        </SelectItem>
        <SelectItem value="vi">
          <Image
            src={'https://es5urvh1np.ufs.sh/f/DHR6tEJ9PQozScrbRczO6HTvWx5FfMuZn4tCw3VzG8NeJRsj'}
            alt="Vietnamese"
            width={20}
            height={10}
            unoptimized
          />
          {t('vi')}
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
