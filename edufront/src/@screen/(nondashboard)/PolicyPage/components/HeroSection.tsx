'use client';

import { useTranslations } from 'next-intl';

export default function HeroSection() {
  const t = useTranslations('policyPage.hero');

  return (
    <section className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12">
      <div className="mx-auto px-6 lg:px-40">
        <div className="text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">{t('title')}</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">{t('subtitle')}</p>
        </div>
      </div>
    </section>
  );
}
