import { Button } from '@/lib/cus/button';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import router from 'next/router';

export default function CTASection() {
  const t = useTranslations('homepage.cta');

  return (
    <section className="py-12 bg-gradient-to-br from-blue-400 via-indigo-400 to-purple-400 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/[0.05] -z-0" />
      <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 text-white text-sm font-medium mb-6 backdrop-blur-sm">
          <span>{t('badge')}</span>
        </div>
        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">{t('title')}</h2>
        <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">{t('description')}</p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Button
            variant="custom"
            className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-6 text-lg font-semibold rounded-xl shadow-xl hover:shadow-2xl transition-all [&_.value]:text-blue-600"
            value={t('getStartedFree')}
            onClick={() => router.push('/scholarships')}
            iconRight={<ArrowRight className="w-5 h-5" />}
          />
          {/* <Button
            variant="outline"
            className="border-2 border-white text-white hover:bg-white/10 px-8 py-6 text-lg font-semibold rounded-xl backdrop-blur-sm transition-all"
            value={t('contactUs')}
          /> */}
        </div>
        <p className="text-blue-100 mt-6 text-sm">{t('footer')}</p>
      </div>
    </section>
  );
}
