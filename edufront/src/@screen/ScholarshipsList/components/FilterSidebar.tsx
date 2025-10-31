import { useState } from 'react';
import { Search, X, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/lib/cus/button';
import { FilterState } from '../index';

type FilterSidebarProps = {
  filters: FilterState;
  setFilters: (filters: FilterState) => void;
  scholarships: Scholarship[];
  isMobile?: boolean;
  onClose?: () => void;
};

export default function FilterSidebar({
  filters,
  setFilters,
  scholarships,
  isMobile = false,
  onClose,
}: FilterSidebarProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>(
    isMobile ? ['country', 'studyLevel', 'university'] : ['search', 'country', 'studyLevel', 'university']
  );
  const [universitySearchQuery, setUniversitySearchQuery] = useState('');

  const toggleSection = (section: string) => {
    if (expandedSections.includes(section)) {
      setExpandedSections(expandedSections.filter((s) => s !== section));
    } else {
      setExpandedSections([...expandedSections, section]);
    }
  };

  // Extract unique values from scholarships
  const uniqueCountries = Array.from(
    new Set(scholarships.map((s) => s.country).filter(Boolean))
  ).sort();
  const uniqueStudyLevels = Array.from(
    new Set(scholarships.map((s) => s.studyLevel).filter(Boolean))
  ).sort();

  const handleFilterChange = (field: keyof FilterState, value: string) => {
    setFilters({
      ...filters,
      [field]: value,
      page: 0, // Reset to first page when filter changes
    });
  };

  const clearAllFilters = () => {
    setFilters({
      keyword: '',
      country: '',
      studyLevel: '',
      university: '',
      minGpa: 0,
      maxGpa: 10,
      page: 0,
      size: 100,
    });
  };

  const activeFiltersCount =
    (filters.keyword ? 1 : 0) +
    (filters.country ? 1 : 0) +
    (filters.studyLevel ? 1 : 0) +
    (filters.university ? 1 : 0) +
    (filters.minGpa > 0 ? 1 : 0) +
    (filters.maxGpa < 10 ? 1 : 0);

  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 p-4 ${!isMobile ? 'sticky top-24' : ''}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Filters</h2>
        <div className="flex items-center gap-2">
          {activeFiltersCount > 0 && (
            <button
              onClick={clearAllFilters}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
            >
              <X className="w-4 h-4" />
              Clear All ({activeFiltersCount})
            </button>
          )}
          {isMobile && onClose && (
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
              aria-label="Close filters"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          )}
        </div>
      </div>

      <div className="space-y-6">
        {/* Search - Only show on Desktop */}
        {!isMobile && (
          <>
            <div className="space-y-3">
              <button
                onClick={() => toggleSection('search')}
                className="flex items-center justify-between w-full text-left"
              >
                <h3 className="text-sm font-semibold text-gray-900">Search</h3>
                {expandedSections.includes('search') ? (
                  <ChevronUp className="w-4 h-4 text-gray-500" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                )}
              </button>

              {expandedSections.includes('search') && (
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search scholarships..."
                    value={filters.keyword}
                    onChange={(e) => setFilters({ ...filters, keyword: e.target.value, page: 0 })}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              )}
            </div>

            <div className="border-t border-gray-200" />
          </>
        )}

        {/* Country Filter */}
        <div className="space-y-3">
          <button
            onClick={() => toggleSection('country')}
            className="flex items-center justify-between w-full text-left"
          >
            <h3 className="text-sm font-semibold text-gray-900">
              Country {filters.country && '(1)'}
            </h3>
            {expandedSections.includes('country') ? (
              <ChevronUp className="w-4 h-4 text-gray-500" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-500" />
            )}
          </button>

          {expandedSections.includes('country') && (
            <div className="space-y-2 max-h-48 overflow-y-auto">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="country"
                  checked={filters.country === ''}
                  onChange={() => handleFilterChange('country', '')}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">All Countries</span>
              </label>
              {uniqueCountries.map((country) => (
                <label key={country} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="country"
                    checked={filters.country === country}
                    onChange={() => handleFilterChange('country', country)}
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{country}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        <div className="border-t border-gray-200" />

        {/* Study Level Filter */}
        <div className="space-y-3">
          <button
            onClick={() => toggleSection('studyLevel')}
            className="flex items-center justify-between w-full text-left"
          >
            <h3 className="text-sm font-semibold text-gray-900">
              Study Level {filters.studyLevel && '(1)'}
            </h3>
            {expandedSections.includes('studyLevel') ? (
              <ChevronUp className="w-4 h-4 text-gray-500" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-500" />
            )}
          </button>

          {expandedSections.includes('studyLevel') && (
            <div className="space-y-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="studyLevel"
                  checked={filters.studyLevel === ''}
                  onChange={() => handleFilterChange('studyLevel', '')}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">All Levels</span>
              </label>
              {uniqueStudyLevels.map((level) => (
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
          )}
        </div>

        <div className="border-t border-gray-200" />

        {/* University Filter */}
        <div className="space-y-3">
          <button
            onClick={() => toggleSection('university')}
            className="flex items-center justify-between w-full text-left"
          >
            <h3 className="text-sm font-semibold text-gray-900">
              University {filters.university && '(1)'}
            </h3>
            {expandedSections.includes('university') ? (
              <ChevronUp className="w-4 h-4 text-gray-500" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-500" />
            )}
          </button>

          {expandedSections.includes('university') && (
            <div className="space-y-2 max-h-48 overflow-y-auto">
              <input
                type="text"
                placeholder="Search university..."
                value={universitySearchQuery}
                onChange={(e) => setUniversitySearchQuery(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
              <div className="space-y-1 max-h-40 overflow-y-auto">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="university"
                    checked={filters.university === ''}
                    onChange={() => {
                      handleFilterChange('university', '');
                      setUniversitySearchQuery('');
                    }}
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">All Universities</span>
                </label>
                {Array.from(new Set(scholarships.map((s) => s.university).filter(Boolean)))
                  .filter((uni) =>
                    !universitySearchQuery || uni?.toLowerCase().includes(universitySearchQuery.toLowerCase())
                  )
                  .sort()
                  .slice(0, 10)
                  .map((university) => (
                    <label key={university} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="university"
                        checked={filters.university === university}
                        onChange={() => {
                          handleFilterChange('university', university);
                          setUniversitySearchQuery('');
                        }}
                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">{university}</span>
                    </label>
                  ))}
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-gray-200" />

        {/* GPA Filter */}
        <div className="space-y-3">
          <button
            onClick={() => toggleSection('gpa')}
            className="flex items-center justify-between w-full text-left"
          >
            <h3 className="text-sm font-semibold text-gray-900">GPA Requirement</h3>
            {expandedSections.includes('gpa') ? (
              <ChevronUp className="w-4 h-4 text-gray-500" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-500" />
            )}
          </button>

          {expandedSections.includes('gpa') && (
            <div className="space-y-3">
              <div>
                <label className="text-xs text-gray-600">Min: {filters.minGpa.toFixed(1)}</label>
                <input
                  type="range"
                  min="0"
                  max="10"
                  step="0.1"
                  value={filters.minGpa}
                  onChange={(e) => setFilters({ ...filters, minGpa: parseFloat(e.target.value), page: 0 })}
                  className="w-full"
                />
              </div>
              <div>
                <label className="text-xs text-gray-600">Max: {filters.maxGpa.toFixed(1)}</label>
                <input
                  type="range"
                  min="0"
                  max="10"
                  step="0.1"
                  value={filters.maxGpa}
                  onChange={(e) => setFilters({ ...filters, maxGpa: parseFloat(e.target.value), page: 0 })}
                  className="w-full"
                />
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
