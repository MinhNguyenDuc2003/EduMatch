'use client';

import { Badge } from '@/pattern/cus/badge';
import { useTranslations } from 'next-intl';

type AggregationFiltersProps = {
  aggregations?: ScholarshipSearchAggregations;
  filters: FilterState;
  setFilters: (filters: FilterState) => void;
  keyword: string;
};

export default function AggregationFilters({
  aggregations,
  filters,
  setFilters,
  keyword,
}: AggregationFiltersProps) {
  const t = useTranslations('scholarshipsList.filters');

  // Only show when there's a search keyword
  if (!keyword || !aggregations) return null;

  // Check if aggregations have data
  const hasCountryData = aggregations.country && Object.keys(aggregations.country).length > 0;
  const hasStudyLevelData =
    aggregations.studyLevel && Object.keys(aggregations.studyLevel).length > 0;

  if (!hasCountryData && !hasStudyLevelData) return null;

  // Handle filter click - toggle on/off and clear other filters
  const handleFilterClick = (type: 'country' | 'studyLevel', value: string) => {
    const currentValue = type === 'country' ? filters.country : filters.studyLevel;

    // If clicking the same filter, toggle it off
    if (currentValue === value) {
      setFilters({
        ...filters,
        [type]: '',
        page: 0,
      });
    } else {
      // If clicking a new filter, clear the other type and set this one
      setFilters({
        ...filters,
        country: type === 'country' ? value : '',
        studyLevel: type === 'studyLevel' ? value : '',
        page: 0,
      });
    }
  };

  return (
    <div className=" rounded-lg border p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
          {t('availableFilters')}
        </h3>
      </div>

      {/* Country Aggregations */}
      {hasCountryData && (
        <div className="space-y-2">
          <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
            {t('country')}
          </p>
          <div className="flex flex-wrap gap-2">
            {Object.entries(aggregations.country!).map(([country, count]) => (
              <button
                key={country}
                onClick={() => handleFilterClick('country', country)}
                className={`group flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all hover:shadow-md ${
                  filters.country === country
                    ? 'bg-[#3d6cb9] text-white hover:bg-blue-800'
                    : 'bg-gray-100 hover:bg-blue-100 border-transparent'
                }`}
              >
                <span>{country}</span>
                <span className="text-xs p-1 rounded-full bg-white text-gray-700">{count}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Study Level Aggregations */}
      {hasStudyLevelData && (
        <div className="space-y-2">
          <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
            {t('studyLevel')}
          </p>
          <div className="flex flex-wrap gap-2">
            {Object.entries(aggregations.studyLevel!).map(([level, count]) => (
              <button
                key={level}
                onClick={() => handleFilterClick('studyLevel', level)}
                className={`group flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all hover:shadow-md ${
                  filters.studyLevel === level
                    ? 'bg-[#3d6cb9] hover:bg-blue-800'
                    : 'bg-gray-100 hover:bg-blue-100 border-transparent'
                }`}
              >
                <span>{level}</span>
                <span className="text-xs p-1 rounded-full bg-white text-gray-700">{count}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
