'use client';

import { FileQuestion, CheckCircle2, Users } from 'lucide-react';
import { type ShortlistTab } from '../types';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

type EmptyStateProps = {
  tab: ShortlistTab;
};

const iconMap: Record<ShortlistTab, React.ComponentType<{ className?: string }>> = {
  tracking: FileQuestion,
  applied: CheckCircle2,
  following: Users,
  application: FileQuestion,
  report: FileQuestion,
};

export default function EmptyState({ tab }: EmptyStateProps) {
  const t = useTranslations(`activity.emptyState.${tab}`);
  const Icon = iconMap[tab];

  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50/50 px-8 py-20 text-center">
      <div className="mb-6 rounded-full bg-white p-6 shadow-sm">
        <Icon className="h-12 w-12 text-slate-400" />
      </div>

      <h2 className="mb-3 text-xl font-bold text-slate-800">{t('title')}</h2>

      <p className="max-w-md text-sm leading-relaxed text-slate-600">{t('description')}</p>
    </div>
  );
}
