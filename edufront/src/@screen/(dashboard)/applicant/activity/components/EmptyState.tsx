'use client';

import { FileQuestion, CheckCircle2, Users } from 'lucide-react';
import { type ShortlistTab } from '../types';

type EmptyStateProps = {
  tab: ShortlistTab;
};

const emptyStateConfig: Record<
  ShortlistTab,
  {
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    description: string;
  }
> = {
  tracking: {
    icon: FileQuestion,
    title: 'No tracked scholarships yet',
    description:
      'Browse our scholarship catalog and tap the flag icon to save opportunities. They will appear here for quick access and planning.',
  },
  applied: {
    icon: CheckCircle2,
    title: 'No applications submitted',
    description:
      'Once you apply to a scholarship, it will show up here so you can monitor application status and next steps.',
  },
  following: {
    icon: Users,
    title: 'You are not following any providers',
    description:
      'Follow scholarship providers to stay updated on new opportunities. You will see them here when you start following.',
  },
};

export default function EmptyState({ tab }: EmptyStateProps) {
  const config = emptyStateConfig[tab];
  const Icon = config.icon;

  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50/50 px-8 py-20 text-center">
      <div className="mb-6 rounded-full bg-white p-6 shadow-sm">
        <Icon className="h-12 w-12 text-slate-400" />
      </div>

      <h2 className="mb-3 text-xl font-bold text-slate-800">{config.title}</h2>

      <p className="max-w-md text-sm leading-relaxed text-slate-600">{config.description}</p>
    </div>
  );
}
