'use client';
import { X } from 'lucide-react';
import { COUNTRIES, SCHOLARSHIP_TYPES, STUDY_LEVELS } from '@/constants/Common';
import { useTranslations } from 'next-intl';
import AggregationFilters from './AggregationFilters';
import { useGetUniversityQuery } from '@/state/apiScholarship';
import SearchBar from '@/pattern/share/SearchBar';
import { useState, useEffect } from 'react';
import { useDebounce } from '@/pattern/cus/multi-select';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/pattern/cus/select';

type FilterSidebarProps = {
  filters: FilterState;
  setFilters: (filters: FilterState) => void;
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
  aggregations,
  isMobile = false,
  onClose,
}: FilterSidebarProps) {
  const t = useTranslations('scholarshipsList.filters');
  const [universitySearch, setUniversitySearch] = useState('');
  const [fieldsSearch, setFieldsSearch] = useState('');
  const debouncedSearch = useDebounce(universitySearch, 500);
  const debouncedFieldsSearch = useDebounce(fieldsSearch, 500);

  const { data: universities, isLoading: isLoadingUniversities } = useGetUniversityQuery(
    debouncedSearch,
    {
      skip: !debouncedSearch || debouncedSearch.length < 2,
    }
  );

  useEffect(() => {
    if (universitySearch.length === 0 && filters.university) {
      setFilters({ ...filters, university: '', page: 0 });
    } else if (universities?.length === 1) {
      setFilters({ ...filters, university: universities[0].university, page: 0 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [universitySearch, universities]);

  useEffect(() => {
    setFilters({ ...filters, fields: debouncedFieldsSearch, page: 0 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedFieldsSearch]);

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
      university: '',
      fields: '',
      minGpa: 0,
      maxGpa: 4,
      page: 0,
      size: 100,
    });
    setUniversitySearch('');
    setFieldsSearch('');
  };

  const activeFiltersCount =
    (filters.keyword ? 1 : 0) +
    (filters.country ? 1 : 0) +
    (filters.studyLevel ? 1 : 0) +
    (filters.scholarshipType ? 1 : 0) +
    (filters.minGpa > 0 ? 1 : 0) +
    (filters.maxGpa < 4 ? 1 : 0) +
    (filters.fields ? 1 : 0);

  const showResults = universitySearch.length >= 2 && !isLoadingUniversities;
  const showLoading = universitySearch.length >= 2 && isLoadingUniversities;

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
              <span>
                {activeFiltersCount} {t('applied')}
              </span>
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
        {/* Aggregation Filters - Dynamic filters from search results (only shown when searching) */}
        <AggregationFilters
          aggregations={aggregations}
          filters={filters}
          setFilters={setFilters}
          keyword={filters.keyword}
        />

        {/* University Filter */}
        <div className="border border-gray-200 rounded-lg p-4 space-y-3">
          <h3 className="text-sm font-semibold text-gray-900">
            {t('university')} {filters.university && '(1)'}
          </h3>

          <SearchBar
            value={universitySearch}
            onChange={(value) => setUniversitySearch(value)}
            placeholder={t('university')}
          />

          {/* Loading indicator */}
          {showLoading && (
            <div className="flex items-center justify-center py-3">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
              <span className="ml-2 text-sm text-gray-500">{t('searching') || 'Searching...'}</span>
            </div>
          )}

          {/* University Search Results */}
          {showResults && universities && universities.length > 0 && (
            <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto">
              {universities.map((university) => {
                const isSelected = filters.university === university.university;
                return (
                  <button
                    key={university.id}
                    onClick={() => handleFilterChange('university', university.university)}
                    className={`rounded-full px-3 py-1 text-sm font-medium transition-colors border ${
                      isSelected
                        ? 'bg-[#3d6cb9] text-white hover:bg-blue-800'
                        : 'bg-gray-100 hover:bg-blue-100 border-transparent'
                    }`}
                  >
                    {university.university}
                  </button>
                );
              })}
            </div>
          )}

          {/* No results message */}
          {showResults && (!universities || universities.length === 0) && (
            <p className="text-sm text-gray-500 text-center py-2">
              {t('noUniversitiesFound') || 'No universities found'}
            </p>
          )}
        </div>

        {/* Fields Filter */}
        <div className="border border-gray-200 rounded-lg p-4 space-y-3">
          <h3 className="text-sm font-semibold text-gray-900">
            {t('fields')} {filters.fields && '(1)'}
          </h3>
          <SearchBar
            value={fieldsSearch}
            onChange={(value) => setFieldsSearch(value)}
            placeholder={t('fields')}
          />
        </div>

        {/* Study Level Filter */}
        <div className="border border-gray-200 rounded-lg p-4 space-y-3">
          <h3 className="text-sm font-semibold text-gray-900">
            {t('studyLevel')} {filters.studyLevel && '(1)'}
          </h3>
          <Select
            value={filters.studyLevel || 'all'}
            onValueChange={(value) =>
              handleFilterChange('studyLevel', value === 'all' ? '' : value)
            }
          >
            <SelectTrigger className="w-full text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white">
              <SelectValue placeholder={t('allLevels')} />
            </SelectTrigger>
            <SelectContent className="max-h-64 overflow-y-auto">
              <SelectItem value="all">{t('allLevels')}</SelectItem>
              {STUDY_LEVEL_OPTIONS.map((level) => (
                <SelectItem key={level} value={level}>
                  {level}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Country Filter */}
        <div className="border border-gray-200 rounded-lg p-4 space-y-3">
          <h3 className="text-sm font-semibold text-gray-900">
            {t('country')} {filters.country && '(1)'}
          </h3>
          <Select
            value={filters.country || 'all'}
            onValueChange={(value) => handleFilterChange('country', value === 'all' ? '' : value)}
          >
            <SelectTrigger className="w-full text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white">
              <SelectValue placeholder={t('allCountries')} />
            </SelectTrigger>
            <SelectContent className="max-h-64 overflow-y-auto">
              <SelectItem value="all">{t('allCountries')}</SelectItem>
              {COUNTRY_OPTIONS.map((country) => (
                <SelectItem key={country} value={country}>
                  {country}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Scholarship Type Filter */}
        <div className="border border-gray-200 rounded-lg p-4 space-y-3">
          <h3 className="text-sm font-semibold text-gray-900">{t('scholarshipType')}</h3>
          <Select
            value={filters.scholarshipType || 'all'}
            onValueChange={(value) =>
              handleFilterChange('scholarshipType', value === 'all' ? '' : value)
            }
          >
            <SelectTrigger className="w-full text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white">
              <SelectValue placeholder={t('allTypes')} />
            </SelectTrigger>
            <SelectContent className="max-h-64 overflow-y-auto">
              <SelectItem value="all">{t('allTypes')}</SelectItem>
              {SCHOLARSHIP_TYPE_OPTIONS.map((type) => (
                <SelectItem key={type} value={type}>
                  {SCHOLARSHIP_TYPES.find((item) => item.value === type)?.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* GPA Filter */}
        <div className="border border-gray-200 rounded-lg p-4 space-y-3">
          <h3 className="text-sm font-semibold text-gray-900">{t('gpaRequirement')}</h3>
          <div className="space-y-3">
            {/* GPA Quick Options - Dropdown */}
            <Select
              value={
                filters.minGpa === 0 && filters.maxGpa === 4
                  ? 'all'
                  : filters.minGpa === 1.0 && filters.maxGpa === 4
                    ? 'above1'
                    : filters.minGpa === 2.0 && filters.maxGpa === 4
                      ? 'above2'
                      : filters.minGpa === 3.0 && filters.maxGpa === 4
                        ? 'above3'
                        : 'custom'
              }
              onValueChange={(value) => {
                switch (value) {
                  case 'all':
                    setFilters({ ...filters, minGpa: 0, maxGpa: 4, page: 0 });
                    break;
                  case 'above1':
                    setFilters({ ...filters, minGpa: 1.0, maxGpa: 4, page: 0 });
                    break;
                  case 'above2':
                    setFilters({ ...filters, minGpa: 2.0, maxGpa: 4, page: 0 });
                    break;
                  case 'above3':
                    setFilters({ ...filters, minGpa: 3.0, maxGpa: 4, page: 0 });
                    break;
                }
              }}
            >
              <SelectTrigger className="w-full text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white">
                <SelectValue placeholder={t('allGpas')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('allGpas')}</SelectItem>
                <SelectItem value="above1">{t('above1')}</SelectItem>
                <SelectItem value="above2">{t('above2')}</SelectItem>
                <SelectItem value="above3">{t('above3')}</SelectItem>
              </SelectContent>
            </Select>

            {/* GPA Custom Sliders */}
            <div className="pt-2 border-t border-gray-200">
              <div className="space-y-2">
                <div>
                  <label className="text-xs text-gray-600">
                    {t('min')}: {filters.minGpa.toFixed(1)}
                  </label>
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
                  <label className="text-xs text-gray-600">
                    {t('max')}: {filters.maxGpa.toFixed(1)}
                  </label>
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
