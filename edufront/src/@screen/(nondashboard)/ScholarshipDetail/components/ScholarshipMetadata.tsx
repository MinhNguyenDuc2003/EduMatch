'use client';
import { Flag, Calendar, DollarSign, Eye } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useAuth } from '@/hooks/useAuth';

type ScholarshipMetadataProps = {
  formattedDate: string;
  amount: string;
  isTracked: boolean;
  onToggleTracking: () => void;
  view: number;
};

export default function ScholarshipMetadata({
  formattedDate,
  amount,
  isTracked,
  onToggleTracking,
  view,
}: ScholarshipMetadataProps) {
  const t = useTranslations('scholarshipDetail.metadata');
  const { isAuthenticated } = useAuth();

  return (
    <div className="flex flex-col gap-2">
      {/* Date */}
      <div className="flex items-center gap-1 text-gray-600">
        <span className="font-medium text-gray-400">{t('deadline')}:</span>
        <span className="font-medium">{formattedDate}</span>
      </div>

      {/* Amount */}
      <div className="flex items-center gap-1 text-gray-600">
        <span className="font-medium text-gray-400">{t('amount')}:</span>
        <span className="font-medium">{amount}</span>
      </div>

      {/* Track */}
      {isAuthenticated && (
        <button
          onClick={onToggleTracking}
          className="flex items-center p-2 gap-2 rounded-full text-gray-600 hover:bg-gray-100 transition-colors"
          aria-label={isTracked ? t('untrackScholarship') : t('trackScholarship')}
        >
          <Flag
            className={`w-5 h-5 transition-colors ${
              isTracked ? 'fill-blue-600 text-blue-600' : 'text-gray-400'
            }`}
          />
          <span className="font-medium">{isTracked ? t('tracked') : t('track')}</span>
        </button>
      )}

      {/* Reached Count */}
      <div className="flex items-center gap-1 text-gray-600">
        <span className="font-medium text-gray-400">{t('reachedCount')}:</span>
        <span className="font-medium">{view}</span>
      </div>
    </div>
  );
}
