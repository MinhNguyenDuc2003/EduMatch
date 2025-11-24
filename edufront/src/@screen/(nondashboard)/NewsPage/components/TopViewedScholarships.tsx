import { TrendingUp, Sparkles } from 'lucide-react';
import TopViewedScholarshipCard from './TopViewedScholarshipCard';
import { useTranslations } from 'next-intl';

interface TopViewedScholarshipsProps {
  scholarships: Scholarship[];
  isLoading: boolean;
  onViewScholarship: (slug?: string) => void;
}

export default function TopViewedScholarships({
  scholarships,
  isLoading,
  onViewScholarship,
}: TopViewedScholarshipsProps) {
  const t = useTranslations('newsPage');
  return (
    <div className="sticky top-20 overflow-y-auto rounded-lg shadow-md">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1B3053] to-[#3D6CB9] rounded-t-lg px-4 py-3">
        <div className="flex items-center gap-2">
          <h2 className="text-base font-semibold text-white">{t('topViewed')}</h2>
        </div>
      </div>

      {/* Scholarships List */}
      {isLoading ? (
        <div className="bg-white rounded-b-lg shadow-sm">
          {[...Array(3)].map((_, i) => (
            <div key={i}>
              <div className="px-4 py-3 animate-pulse">
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-9 h-9 bg-gray-200 rounded-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-24"></div>
                </div>
                <div className="flex flex-col">
                  <div className="h-5 bg-gray-200 rounded w-3/4 mb-1.5"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                </div>
              </div>
              {i < 2 && <div className="border-b border-gray-100 mx-4"></div>}
            </div>
          ))}
        </div>
      ) : scholarships && scholarships.length > 0 ? (
        <div className="bg-white rounded-b-lg shadow-sm">
          {scholarships.map((scholarship, index) => (
            <div key={scholarship.id}>
              <TopViewedScholarshipCard
                scholarship={scholarship}
                onViewDetails={() => onViewScholarship(scholarship.slug)}
              />
              {index < scholarships.length - 1 && (
                <div className="border-b border-gray-100 mx-4"></div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
          <Sparkles className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-sm text-gray-500">{t('noTopScholarships')}</p>
        </div>
      )}
    </div>
  );
}
