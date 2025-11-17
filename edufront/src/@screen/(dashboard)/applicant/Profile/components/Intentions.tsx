'use client';
import React from 'react';
import type { Intention } from '../types';
import { Pencil, Plus } from 'lucide-react';
import { Button } from '@/lib/cus/button';
import IntentionCard from './IntentionCard';
import { useTranslations } from 'next-intl';

interface IntentionsProps {
  intentions: Intention[];
  onEdit?: () => void;
}

const Intentions = ({ intentions, onEdit }: IntentionsProps) => {
  const t = useTranslations('homepage.applicantProfile');
  const tCommon = useTranslations('homepage.applicantProfile.common');

  return (
    <div className="space-y-4">
      {/* Header with Add button */}
      <div className="flex gap-2">
        <h2 className="text-primary-brand text-lg font-semibold">
          {t('sections.educationalIntentions')}
        </h2>

        {onEdit && (
          <Button
            variant="custom"
            className="bg-[#00B8D9] text-white px-3 py-1 rounded-md text-xs font-medium flex items-center gap-1 hover:bg-[#00A3C4]"
            onClick={onEdit}
          >
            <Pencil className="w-3 h-3" />
            {tCommon('edit')}
          </Button>
        )}
      </div>

      {/* Certificate cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2  gap-6">
        {intentions.map((intention) => (
          <IntentionCard key={intention.id} intention={intention} />
        ))}
      </div>

      {/* Empty state */}
      {intentions.length === 0 && (
        <div className="text-center py-8 text-gray-500">{tCommon('noIntentionsAdded')}</div>
      )}
    </div>
  );
};

export default Intentions;
