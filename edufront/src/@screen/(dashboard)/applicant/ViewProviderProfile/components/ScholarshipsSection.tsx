'use client';
import { Skeleton } from '@/lib/cus/skeleton';
import { ScholarshipCard } from '@/@screen/(nondashboard)/ScholarshipsList/components';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

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
  const router = useRouter();

  const handleViewScholarship = (slug: string) => {
    if (!isAuthenticated) {
      router.push('http://159.89.200.244/oauth2/authorization/keycloak');
    } else {
      router.push(`/scholarships/${slug}`);
    }
  };

  const handleViewProvider = (providerId: number) => {
    router.push(`/applicant/providers/${providerId}`);
  };

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
              onViewScholarship={handleViewScholarship}
              onViewProvider={handleViewProvider}
              onToggleTracking={() => onToggleTracking(scholarship.id)}
              onFollowProvider={() => onFollowProvider(scholarship.providerId)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
