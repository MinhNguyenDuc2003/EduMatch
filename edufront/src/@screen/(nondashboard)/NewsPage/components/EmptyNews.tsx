import { Newspaper } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function EmptyNews() {
  const t = useTranslations('newsPage');

  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-200 bg-white px-8 py-20 text-center shadow-sm">
      <div className="mb-6 rounded-full bg-slate-50 p-6">
        <Newspaper className="h-12 w-12 text-slate-400" />
      </div>
      <h2 className="mb-3 text-xl font-bold text-slate-800">
        {t('noNewsAvailable') || 'No news available'}
      </h2>
      <p className="max-w-md text-sm leading-relaxed text-slate-600">
        {t('noNewsDescription') ||
          'There are no news articles at the moment. Check back later for updates and new content.'}
      </p>
    </div>
  );
}
