'use client';
import { Flag, Calendar, DollarSign, Eye } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/pattern/cus/button';

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

  const remainingTime = Math.floor(
    (new Date(formattedDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-12">
        {/* Date */}
        <div className="flex flex-col gap-1 text-gray-900 text-sm">
          <span className=" text-gray-500">{t('deadline')}:</span>
          <div className="flex gap-2">
            <span className="font-medium">{formattedDate}</span>
            {remainingTime > 0 && (
              <span className="font-medium">
                ({t('remainingTimeDays', { time: remainingTime })})
              </span>
            )}
            {remainingTime === 0 && (
              <span className="font-medium">
                ({t('remainingTimeDay', { time: remainingTime })})
              </span>
            )}
            {remainingTime < 0 && <span className="font-medium">({t('expired')})</span>}
          </div>
        </div>

        {/* Amount */}
        <div className="flex flex-col  gap-1 text-gray-900 text-sm">
          <span className=" text-gray-500">{t('amount')}:</span>
          <span className="font-medium">{amount}</span>
        </div>

        {/* Reached Count */}
        <div className="flex flex-col gap-1 text-gray-900 text-sm">
          <span className=" text-gray-500">{t('reachedCount')}:</span>
          <span className="font-medium">{view}</span>
        </div>
      </div>

      {/* Track */}
      {isAuthenticated && (
        <Button
          variant="custom"
          onClick={onToggleTracking}
          className="flex items-center !gap-0 !p-0 border border-gray-200 rounded-md overflow-hidden"
          aria-label={isTracked ? t('untrackScholarship') : t('trackScholarship')}
        >
          <div className="flex items-center justify-center bg-blue-700 p-4">
            <Flag
              className={`w-4 h-4 transition-colors ${
                isTracked ? 'fill-white text-white' : 'text-white'
              }`}
            />
          </div>

          <span className=" text-md p-4">{isTracked ? t('tracked') : t('track')}</span>
        </Button>
      )}
    </div>
  );
}
