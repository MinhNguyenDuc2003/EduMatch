'use client';

import { useTranslations } from 'next-intl';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/pattern/cus/button';
import { useRouter } from 'next/navigation';

export default function GoodLuckSection() {
  const t = useTranslations('howItWorksPage.goodLuck');
  const router = useRouter();

  return (
    <section className="py-16 bg-gradient-to-br from-blue-400 via-indigo-400 to-purple-400">
      <div className=" mx-auto px-6 lg:px-40 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">{t('title')}</h2>
        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">
          {t('description')}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            variant="custom"
            onClick={() => router.push('/scholarships')}
            className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-6 text-lg font-semibold rounded-xl shadow-xl hover:shadow-2xl transition-all [&_.value]:text-blue-600"
            value={t('exploreScholarships')}
            iconRight={<ArrowRight className="w-5 h-5" />}
          />
          <Button
            variant="outline"
            onClick={() => router.push('/home')}
            className="border-2 border-white text-white hover:bg-white/10 px-8 py-6 text-lg font-semibold rounded-xl backdrop-blur-sm transition-all"
            value={t('backToHome')}
          />
        </div>
      </div>
    </section>
  );
}
