'use client';

import { motion } from 'framer-motion';
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50/50 px-8 py-20 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        className="mb-6 rounded-full bg-white p-6 shadow-sm"
      >
        <Icon className="h-12 w-12 text-slate-400" />
      </motion.div>

      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mb-3 text-xl font-bold text-slate-800"
      >
        {config.title}
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="max-w-md text-sm leading-relaxed text-slate-600"
      >
        {config.description}
      </motion.p>
    </motion.div>
  );
}
