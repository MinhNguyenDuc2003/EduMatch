'use client';
import { X } from 'lucide-react';
import { COUNTRIES, SCHOLARSHIP_TYPES, STUDY_LEVELS } from '@/constants/Common';
import { useTranslations } from 'next-intl';

type FilterSidebarProps = {
  filters: FilterState;
  setFilters: (filters: FilterState) => void;
  scholarships?: Scholarship[];
  aggregations?: ScholarshipSearchAggregations;
  isMobile?: boolean;
  onClose?: () => void;
};

const STUDY_LEVEL_OPTIONS = STUDY_LEVELS.map((item) => item.value);
const COUNTRY_OPTIONS = COUNTRIES.map((item) => item.label).sort();
const SCHOLARSHIP_TYPE_OPTIONS = SCHOLARSHIP_TYPES.map((item) => item.value);

export default function FilterSidebar({
  filters,
  setFilters,
  scholarships,
  aggregations,
  isMobile = false,
  onClose,
}: FilterSidebarProps) {
  const t = useTranslations('scholarshipsList.filters');
  
  const handleFilterChange = (field: keyof FilterState, value: string) => {
    setFilters({
      ...filters,
      [field]: value,
      page: 0,
    });
  };

  const clearAllFilters = () => {
    setFilters({
      keyword: '',
      country: '',
      studyLevel: '',
      scholarshipType: '',
      minGpa: 0,
      maxGpa: 4,
      page: 0,
      size: 100,
    });
  };

  const activeFiltersCount =
    (filters.keyword ? 1 : 0) +
    (filters.country ? 1 : 0) +
    (filters.studyLevel ? 1 : 0) +
    (filters.minGpa > 0 ? 1 : 0) +
    (filters.maxGpa < 4 ? 1 : 0);

  return (
    <div
      className={`bg-white rounded-lg shadow-sm border border-gray-200 p-4 ${!isMobile ? 'sticky top-20' : ''}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">{t('title')}</h2>
        <div className="flex items-center gap-2">
          {activeFiltersCount > 0 && (
            <button
              onClick={clearAllFilters}
              className="text-xs bg-blue-50 text-primary-brand hover:bg-blue-100 px-3 py-1.5 rounded-full font-medium flex items-center gap-1.5 transition-colors"
            >
              <span>{activeFiltersCount} {t('applied')}</span>
              <X className="w-3.5 h-3.5" />
            </button>
          )}
          {isMobile && onClose && (
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
              aria-label={t('closeFilters')}
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          )}
        </div>
      </div>

      <div className="space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto pr-2">
        {/* Study Level Filter */}
        <div className="border border-gray-200 rounded-lg p-4 space-y-3">
          <h3 className="text-sm font-semibold text-gray-900">
            {t('studyLevel')} {filters.studyLevel && '(1)'}
          </h3>
          <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="studyLevel"
                checked={filters.studyLevel === ''}
                onChange={() => handleFilterChange('studyLevel', '')}
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">{t('allLevels')}</span>
            </label>
            {STUDY_LEVEL_OPTIONS.map((level) => (
              <label key={level} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="studyLevel"
                  checked={filters.studyLevel === level}
                  onChange={() => handleFilterChange('studyLevel', level)}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{level}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Country Filter - Dropdown */}
        <div className="border border-gray-200 rounded-lg p-4 space-y-3">
          <h3 className="text-sm font-semibold text-gray-900">
            {t('country')} {filters.country && '(1)'}
          </h3>
          <select
            value={filters.country}
            onChange={(e) => handleFilterChange('country', e.target.value)}
            className="w-full text-sm py-2 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
          >
            <option value="">{t('allCountries')}</option>
            {COUNTRY_OPTIONS.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>

        {/* Scholarship Type Filter */}
        <div className="border border-gray-200 rounded-lg p-4 space-y-3">
          <h3 className="text-sm font-semibold text-gray-900">{t('scholarshipType')}</h3>
          <select
            value={filters.scholarshipType}
            onChange={(e) => handleFilterChange('scholarshipType', e.target.value)}
            className="w-full text-sm py-2 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
          >
            <option value="">{t('allTypes')}</option>
            {SCHOLARSHIP_TYPE_OPTIONS.map((type) => (
              <option key={type} value={type}>
                {SCHOLARSHIP_TYPES.find((item) => item.value === type)?.label}
              </option>
            ))}
          </select>
        </div>

        {/* GPA Filter */}
        <div className="border border-gray-200 rounded-lg p-4 space-y-3">
          <h3 className="text-sm font-semibold text-gray-900">{t('gpaRequirement')}</h3>
          <div className="space-y-3">
            {/* GPA Quick Options */}
            <div className="grid grid-cols-2 gap-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="gpa"
                  checked={filters.minGpa === 0 && filters.maxGpa === 4}
                  onChange={() => {
                    setFilters({ ...filters, minGpa: 0, maxGpa: 4, page: 0 });
                  }}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{t('allGpas')}</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="gpa"
                  checked={filters.minGpa === 1.0 && filters.maxGpa === 4}
                  onChange={() => {
                    setFilters({ ...filters, minGpa: 1.0, maxGpa: 4, page: 0 });
                  }}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{t('above1')}</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="gpa"
                  checked={filters.minGpa === 2.0 && filters.maxGpa === 4}
                  onChange={() => {
                    setFilters({ ...filters, minGpa: 2.0, maxGpa: 4, page: 0 });
                  }}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{t('above2')}</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="gpa"
                  checked={filters.minGpa === 3.0 && filters.maxGpa === 4}
                  onChange={() => {
                    setFilters({ ...filters, minGpa: 3.0, maxGpa: 4, page: 0 });
                  }}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{t('above3')}</span>
              </label>
            </div>

            {/* GPA Custom Sliders */}
            <div className="pt-2 border-t border-gray-200">
              <div className="space-y-2">
                <div>
                  <label className="text-xs text-gray-600">{t('min')}: {filters.minGpa.toFixed(1)}</label>
                  <input
                    type="range"
                    min="0"
                    max="4"
                    step="0.1"
                    value={filters.minGpa}
                    onChange={(e) =>
                      setFilters({ ...filters, minGpa: parseFloat(e.target.value), page: 0 })
                    }
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-600">{t('max')}: {filters.maxGpa.toFixed(1)}</label>
                  <input
                    type="range"
                    min="0"
                    max="4"
                    step="0.1"
                    value={filters.maxGpa}
                    onChange={(e) =>
                      setFilters({ ...filters, maxGpa: parseFloat(e.target.value), page: 0 })
                    }
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
