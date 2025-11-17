'use client';
import { Flag, Calendar, DollarSign } from 'lucide-react';
import { useTranslations } from 'next-intl';

type ScholarshipMetadataProps = {
  formattedDate: string;
  amount: string;
  isTracked: boolean;
  onToggleTracking: () => void;
};

export default function ScholarshipMetadata({
  formattedDate,
  amount,
  isTracked,
  onToggleTracking,
}: ScholarshipMetadataProps) {
  const t = useTranslations('homepage.scholarshipDetail.metadata');
  
  return (
    <div className="flex flex-wrap items-center gap-6">
      {/* Date */}
      <div className="flex items-center gap-2 text-gray-600">
        <Calendar className="size-5" />
        <span className="font-medium">{formattedDate}</span>
      </div>

      {/* Amount */}
      <div className="flex items-center gap-2 text-gray-600">
        <DollarSign className="size-5" />
        <span className="font-medium">{amount}</span>
      </div>

      {/* Track */}
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
    </div>
  );
}
