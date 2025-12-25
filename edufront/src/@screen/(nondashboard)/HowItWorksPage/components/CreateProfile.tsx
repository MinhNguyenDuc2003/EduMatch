'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function CreateProfile() {
  const t = useTranslations('howItWorksPage.steps.step2');

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-slate-50 to-blue-50/30">
      <div className=" mx-auto px-6 lg:px-40">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Visual */}
          <div className="order-2 lg:order-1">
            <div className="relative h-64 lg:h-96 rounded-2xl overflow-hidden">
              <Image
                src="https://cl2h8yilb0.ufs.sh/f/9iOVh1BwOhmuoc5DHokVUqMx5uEh6vNmkpaAbsGtPJH7ZcTW"
                alt={t('title')}
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* Right - Content */}
          <div className="space-y-5 order-1 lg:order-2">
            <div className="inline-flex items-center gap-3 mb-2">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-white font-bold text-lg">
                02
              </div>
              <span className="text-sm font-semibold text-blue-600 uppercase tracking-wide">
                {t('badge')}
              </span>
            </div>

            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-4">
              {t('title')}
            </h2>

            <p className="text-base text-gray-600 leading-relaxed mb-6">{t('description')}</p>

            <ul className="space-y-3">
              {(t.raw('details') as string[]).map((detail: string, index: number) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center mt-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                  </div>
                  <span className="text-base text-gray-700 leading-relaxed">{detail}</span>
                </li>
              ))}
            </ul>

            {t('additionalInfo') && (
              <p className="text-sm text-gray-600 leading-relaxed mt-6">{t('additionalInfo')}</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
