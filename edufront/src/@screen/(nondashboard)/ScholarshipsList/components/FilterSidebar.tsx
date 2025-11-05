import { useState } from 'react';
import { X } from 'lucide-react';
import { FilterState } from '../index';
import SearchBar from '@/pattern/share/SearchBar';

type FilterSidebarProps = {
  filters: FilterState;
  setFilters: (filters: FilterState) => void;
  scholarships: Scholarship[];
  aggregations?: ScholarshipSearchAggregations;
  isMobile?: boolean;
  onClose?: () => void;
};

export default function FilterSidebar({
  filters,
  setFilters,
  scholarships,
  aggregations,
  isMobile = false,
  onClose,
}: FilterSidebarProps) {
  const [countrySearchQuery, setCountrySearchQuery] = useState('');
  const [studyLevelSearchQuery, setStudyLevelSearchQuery] = useState('');

  // Extract unique values from scholarships
  const countries = [
    'Vietnam',
    'Singapore',
    'Thailand',
    'Malaysia',
    'Indonesia',
    'Philippines',
    'Japan',
    'South Korea',
    'China',
    'India',
    'United States',
    'United Kingdom',
    'Canada',
    'Australia',
    'Germany',
    'France',
    'Netherlands',
    'Sweden',
    'Switzerland',
    'New Zealand',
  ];
  const uniqueCountries = Array.from(new Set(countries)).sort();
  const uniqueStudyLevels = Array.from(
    new Set(scholarships.map((s) => s.studyLevel).filter(Boolean))
  ).sort();

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
      university: '',
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
    (filters.university ? 1 : 0) +
    (filters.minGpa > 0 ? 1 : 0) +
    (filters.maxGpa < 4 ? 1 : 0);

  return (
    <div
      className={`bg-white rounded-lg shadow-sm border border-gray-200 p-4 ${!isMobile ? 'sticky top-20' : ''}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Filters</h2>
        <div className="flex items-center gap-2">
          {activeFiltersCount > 0 && (
            <button
              onClick={clearAllFilters}
              className="text-xs bg-blue-50 text-primary-brand hover:bg-blue-100 px-3 py-1.5 rounded-full font-medium flex items-center gap-1.5 transition-colors"
            >
              <span>{activeFiltersCount} applied</span>
              <X className="w-3.5 h-3.5" />
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

      <div className="space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto pr-2">
        {/* Study Level Filter */}
        <div className="border border-gray-200 rounded-lg p-4 space-y-3">
          <h3 className="text-sm font-semibold text-gray-900">
            Study Level {filters.studyLevel && '(1)'}
          </h3>
          <SearchBar
            placeholder="Search study level..."
            value={studyLevelSearchQuery}
            onChange={setStudyLevelSearchQuery}
            iconSize="w-4 h-4"
            inputClassName="text-sm py-2 pl-10 pr-4 border-gray-300 h-auto"
          />
          <div className="grid grid-cols-2 gap-2">
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
            {uniqueStudyLevels
              .filter(
                (level) =>
                  !studyLevelSearchQuery ||
                  level.toLowerCase().includes(studyLevelSearchQuery.toLowerCase())
              )
              .map((level) => (
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

        {/* University Filter - Search Only */}
        <div className="border border-gray-200 rounded-lg p-4 space-y-3">
          <h3 className="text-sm font-semibold text-gray-900">University</h3>
          <SearchBar
            placeholder="Search university..."
            value={filters.university}
            onChange={(value) => handleFilterChange('university', value)}
            iconSize="w-4 h-4"
            inputClassName="text-sm py-2 pl-10 pr-4 border-gray-300 h-auto"
          />
        </div>

        {/* GPA Filter */}
        <div className="border border-gray-200 rounded-lg p-4 space-y-3">
          <h3 className="text-sm font-semibold text-gray-900">GPA Requirement</h3>
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
                <span className="text-sm text-gray-700">All GPAs</span>
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
                <span className="text-sm text-gray-700">Above 1.0</span>
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
                <span className="text-sm text-gray-700">Above 2.0</span>
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
                <span className="text-sm text-gray-700">Above 3.0</span>
              </label>
            </div>

            {/* GPA Custom Sliders */}
            <div className="pt-2 border-t border-gray-200">
              <div className="space-y-2">
                <div>
                  <label className="text-xs text-gray-600">Min: {filters.minGpa.toFixed(1)}</label>
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
                  <label className="text-xs text-gray-600">Max: {filters.maxGpa.toFixed(1)}</label>
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

        {/* Country Filter - Moved to last */}
        <div className="border border-gray-200 rounded-lg p-4 space-y-3">
          <h3 className="text-sm font-semibold text-gray-900">
            Country {filters.country && '(1)'}
          </h3>
          <SearchBar
            placeholder="Search country..."
            value={countrySearchQuery}
            onChange={setCountrySearchQuery}
            iconSize="w-4 h-4"
            inputClassName="text-sm py-2 pl-10 pr-4 border-gray-300 h-auto"
          />
          <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
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
            {uniqueCountries
              .filter(
                (country) =>
                  !countrySearchQuery ||
                  country.toLowerCase().includes(countrySearchQuery.toLowerCase())
              )
              .map((country) => (
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
        </div>
      </div>
    </div>
  );
}
