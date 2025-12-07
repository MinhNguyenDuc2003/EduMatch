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
    <div className="sticky top-20 rounded-lg shadow-md overflow-hidden max-h-[calc(100vh-6rem)] flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1B3053] to-[#3D6CB9] rounded-t-lg px-3 py-2 flex-shrink-0">
        <div className="flex items-center gap-2">
          <h2 className="text-base font-semibold text-white">{t('topViewed')}</h2>
        </div>
      </div>

      {/* Scholarships List */}
      <div className="flex-1 overflow-y-auto bg-white rounded-b-lg shadow-sm">
        {isLoading ? (
          <div>
            {[...Array(3)].map((_, i) => (
              <div key={i}>
                <div className="px-3 py-2.5 animate-pulse">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                  </div>
                  <div className="flex flex-col">
                    <div className="h-5 bg-gray-200 rounded w-3/4 mb-1.5"></div>
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                  </div>
                </div>
                {i < 2 && <div className="border-b border-gray-100 mx-3"></div>}
              </div>
            ))}
          </div>
        ) : scholarships && scholarships.length > 0 ? (
          <div>
            {scholarships.map((scholarship, index) => (
              <div key={scholarship.id}>
                <TopViewedScholarshipCard
                  scholarship={scholarship}
                  onViewDetails={() => onViewScholarship(scholarship.slug)}
                />
                {index < scholarships.length - 1 && (
                  <div className="border-b border-gray-100 mx-3"></div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="border border-gray-200 p-4 text-center">
            <Sparkles className="w-8 h-8 text-gray-300 mx-auto mb-2" />
            <p className="text-xs text-gray-500">{t('noTopScholarships')}</p>
          </div>
        )}
      </div>
    </div>
  );
}
