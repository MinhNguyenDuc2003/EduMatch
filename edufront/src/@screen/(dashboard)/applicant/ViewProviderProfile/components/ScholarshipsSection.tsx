'use client';
import { Skeleton } from '@/lib/cus/skeleton';
import { ScholarshipCard } from '@/@screen/(nondashboard)/ScholarshipsList/components';
import { useTranslations } from 'next-intl';

interface ScholarshipsSectionProps {
  scholarships: Scholarship[];
  isLoading: boolean;
  onApply: (scholarship: Scholarship) => void;
  onToggleTracking: (scholarshipId: number) => void;
  onFollowProvider: (providerId: number) => void;
  isAuthenticated: boolean;
}

export default function ScholarshipsSection({
  scholarships,
  isLoading,
  onApply,
  onToggleTracking,
  onFollowProvider,
  isAuthenticated,
}: ScholarshipsSectionProps) {
  const t = useTranslations('viewProviderProfile.scholarships');

  return (
    <div className="space-y-4">
      {/* Scholarships Title */}
      <h2 className="text-xl font-semibold text-gray-900 pl-2">{t('title')}</h2>

      {/* Scholarships List */}
      {isLoading ? (
        <div className="space-y-4">
          <Skeleton className="h-48 w-full rounded-lg" />
        </div>
      ) : scholarships.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">{t('noScholarships')}</p>
        </div>
      ) : (
        <div className="space-y-4">
          {scholarships.map((scholarship) => (
            <ScholarshipCard
              key={scholarship.id}
              scholarship={scholarship}
              onApply={onApply}
              onToggleTracking={() => onToggleTracking(scholarship.id)}
              onFollowProvider={() => onFollowProvider(scholarship.providerId)}
              isAuthenticated={isAuthenticated}
            />
          ))}
        </div>
      )}
    </div>
  );
}
