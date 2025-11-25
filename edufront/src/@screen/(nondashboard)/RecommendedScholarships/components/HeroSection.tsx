'use client';

import { useTranslations } from 'next-intl';

export default function HeroSection() {
  const t = useTranslations('recommendedScholarships.heroSection');

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-200 via-indigo-200 to-purple-200">
      {/* Static gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-800 via-blue-900 to-slate-800"></div>
      {/* Decorative curved lines overlay */}
      <svg
        className="absolute inset-0 w-full h-full opacity-20"
        viewBox="0 0 400 200"
        preserveAspectRatio="none"
      >
        <path
          d="M0,100 Q100,30 200,100 T400,100"
          stroke="white"
          strokeWidth="1"
          fill="none"
          className="animate-pulse"
        />
        <path
          d="M0,120 Q150,50 300,120 T400,120"
          stroke="white"
          strokeWidth="1"
          fill="none"
          className="animate-pulse"
          style={{ animationDelay: '1s' }}
        />
        <path
          d="M0,80 Q120,140 240,80 T400,80"
          stroke="white"
          strokeWidth="1"
          fill="none"
          className="animate-pulse"
          style={{ animationDelay: '2s' }}
        />
      </svg>
      {/* Content */}
      <div className="relative mx-auto flex max-w-7xl flex-col items-center justify-center px-6 py-5 text-center sm:px-10 lg:px-40 lg:py-10">
        <div className="w-full flex flex-col items-center justify-center gap-3">
          <div className="flex flex-col items-center justify-center gap-2">
            <h1 className="text-3xl lg:text-5xl font-bold bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 bg-clip-text text-transparent inline-block">
              {t('title')}
            </h1>
            <h1 className="text-xl lg:text-3xl font-bold text-slate-50 leading-tight tracking-tight">
              {t('titleHighlight')}
            </h1>
          </div>
          <p className="max-w-3xl mx-auto text-base text-slate-50 leading-relaxed pb-15">
            {t('description')}
          </p>
        </div>
      </div>
    </section>
  );
}
