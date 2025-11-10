import { Input } from '@/lib/cus/input';
import { Search } from 'lucide-react';
import React from 'react';
import { ScholarshipCard } from '../../ProviderScholaship/components';
import { cn } from '@/lib/utils';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import ScholarshipCarousel from './ScholarshipCarousel';
import { ScholarshipCardSkeleton } from '../../ProviderScholaship/components/ScholarshipCard';

type ScholarshipListProps = {
  scholarships: Scholarship[];
  isLoading?: boolean;
  selectedScholarship: Scholarship | null;
  setSelectedScholarship: (scholarship: Scholarship | null) => void;
};
const ScholarshipList = ({
  scholarships,
  isLoading = false,
  selectedScholarship,
  setSelectedScholarship,
}: ScholarshipListProps) => {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <>
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Scholarships</h2>

      {isMobile ? (
        <ScholarshipCarousel
          scholarships={scholarships}
          value={selectedScholarship?.id}
          onSelectAction={setSelectedScholarship}
        />
      ) : (
        <div className="flex-1 overflow-y-auto space-y-3">
          {isLoading &&
            Array.from({ length: 3 }).map((_, index) => (
              <ScholarshipCardSkeleton variant="small" className="bg-white" key={index} />
            ))}

          {!isLoading && scholarships && scholarships.length > 0 && (
            <>
              {scholarships.map((scholarship) => (
                <button
                  key={scholarship.id}
                  onClick={() => setSelectedScholarship(scholarship)}
                  className="w-full"
                >
                  <ScholarshipCard
                    scholarship={scholarship}
                    variant="small"
                    className={cn(
                      'w-full text-left border-2 transition-all hover:shadow-md',
                      selectedScholarship?.id === scholarship.id
                        ? 'border-primary-brand bg-primary-light shadow-sm'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    )}
                  />
                </button>
              ))}
            </>
          )}

          {!isLoading && (!scholarships || scholarships.length === 0) && (
            <div className="text-center py-8 text-gray-500 text-sm">No scholarships found</div>
          )}
        </div>
      )}
    </>
  );
};

export default ScholarshipList;
