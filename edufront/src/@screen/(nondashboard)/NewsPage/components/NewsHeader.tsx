'use client';

import { useTranslations } from 'next-intl';

export default function NewsHeader() {
  const t = useTranslations('newsPage');

  return (
    <section className="flex justify-center items-center py-4">
      <span className="text-5xl font-light text-center text-[#3D6CB9] mx-auto">
        {t('title') || 'EduMatch News'}
      </span>
    </section>
  );
}
