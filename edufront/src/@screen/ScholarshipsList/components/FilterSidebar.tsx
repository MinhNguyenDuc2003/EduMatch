import { useState } from 'react';
import { Search, X, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/lib/cus/button';
import { FilterState } from '../index';

type FilterSidebarProps = {
  filters: FilterState;
  setFilters: (filters: FilterState) => void;
  scholarships: any[];
};

export default function FilterSidebar({ filters, setFilters, scholarships }: FilterSidebarProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>([
    'search',
    'country',
    'studyLevel',
    'type',
  ]);

  const toggleSection = (section: string) => {
    if (expandedSections.includes(section)) {
      setExpandedSections(expandedSections.filter((s) => s !== section));
    } else {
      setExpandedSections([...expandedSections, section]);
    }
  };

  // Extract unique values from scholarships
  const uniqueCountries = Array.from(
    new Set(scholarships.map((s) => s.Country).filter(Boolean))
  ).sort();
  const uniqueStudyLevels = Array.from(
    new Set(scholarships.map((s) => s.Study_level).filter(Boolean))
  ).sort();
  const uniqueTypes = Array.from(
    new Set(scholarships.map((s) => s.Scholarship_type).filter(Boolean))
  ).sort();
  const uniqueFields = Array.from(
    new Set(
      scholarships.flatMap((s) => s.Fields?.split(',').map((f: string) => f.trim())).filter(Boolean)
    )
  ).sort();

  const handleCheckboxChange = (field: keyof FilterState, value: string) => {
    const currentValues = filters[field] as string[];
    if (currentValues.includes(value)) {
      setFilters({
        ...filters,
        [field]: currentValues.filter((v) => v !== value),
      });
    } else {
      setFilters({
        ...filters,
        [field]: [...currentValues, value],
      });
    }
  };

  const clearAllFilters = () => {
    setFilters({
      searchQuery: '',
      countries: [],
      studyLevels: [],
      scholarshipTypes: [],
      minAmount: 0,
      maxAmount: 100000,
      minGpa: 0,
      maxGpa: 4.0,
      fields: [],
    });
  };

  const activeFiltersCount =
    filters.countries.length +
    filters.studyLevels.length +
    filters.scholarshipTypes.length +
    filters.fields.length +
    (filters.searchQuery ? 1 : 0);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sticky top-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Filters</h2>
        {activeFiltersCount > 0 && (
          <button
            onClick={clearAllFilters}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
          >
            <X className="w-4 h-4" />
            Clear All ({activeFiltersCount})
          </button>
        )}
      </div>

      <div className="space-y-6">
        {/* Search */}
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
                value={filters.searchQuery}
                onChange={(e) => setFilters({ ...filters, searchQuery: e.target.value })}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          )}
        </div>

        <div className="border-t border-gray-200" />

        {/* Country Filter */}
        <div className="space-y-3">
          <button
            onClick={() => toggleSection('country')}
            className="flex items-center justify-between w-full text-left"
          >
            <h3 className="text-sm font-semibold text-gray-900">
              Country {filters.countries.length > 0 && `(${filters.countries.length})`}
            </h3>
            {expandedSections.includes('country') ? (
              <ChevronUp className="w-4 h-4 text-gray-500" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-500" />
            )}
          </button>

          {expandedSections.includes('country') && (
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {uniqueCountries.map((country) => (
                <label key={country} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.countries.includes(country)}
                    onChange={() => handleCheckboxChange('countries', country)}
                    className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
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
              Study Level {filters.studyLevels.length > 0 && `(${filters.studyLevels.length})`}
            </h3>
            {expandedSections.includes('studyLevel') ? (
              <ChevronUp className="w-4 h-4 text-gray-500" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-500" />
            )}
          </button>

          {expandedSections.includes('studyLevel') && (
            <div className="space-y-2">
              {uniqueStudyLevels.map((level) => (
                <label key={level} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.studyLevels.includes(level)}
                    onChange={() => handleCheckboxChange('studyLevels', level)}
                    className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{level}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        <div className="border-t border-gray-200" />

        {/* Scholarship Type Filter */}
        <div className="space-y-3">
          <button
            onClick={() => toggleSection('type')}
            className="flex items-center justify-between w-full text-left"
          >
            <h3 className="text-sm font-semibold text-gray-900">
              Type {filters.scholarshipTypes.length > 0 && `(${filters.scholarshipTypes.length})`}
            </h3>
            {expandedSections.includes('type') ? (
              <ChevronUp className="w-4 h-4 text-gray-500" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-500" />
            )}
          </button>

          {expandedSections.includes('type') && (
            <div className="space-y-2">
              {uniqueTypes.map((type) => (
                <label key={type} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.scholarshipTypes.includes(type)}
                    onChange={() => handleCheckboxChange('scholarshipTypes', type)}
                    className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{type}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        <div className="border-t border-gray-200" />

        {/* Funding Amount Filter */}
        <div className="space-y-3">
          <button
            onClick={() => toggleSection('amount')}
            className="flex items-center justify-between w-full text-left"
          >
            <h3 className="text-sm font-semibold text-gray-900">Funding Amount</h3>
            {expandedSections.includes('amount') ? (
              <ChevronUp className="w-4 h-4 text-gray-500" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-500" />
            )}
          </button>

          {expandedSections.includes('amount') && (
            <div className="space-y-3">
              <div>
                <label className="text-xs text-gray-600">
                  Min: ${filters.minAmount.toLocaleString()}
                </label>
                <input
                  type="range"
                  min="0"
                  max="100000"
                  step="1000"
                  value={filters.minAmount}
                  onChange={(e) => setFilters({ ...filters, minAmount: parseInt(e.target.value) })}
                  className="w-full"
                />
              </div>
              <div>
                <label className="text-xs text-gray-600">
                  Max: ${filters.maxAmount.toLocaleString()}
                </label>
                <input
                  type="range"
                  min="0"
                  max="100000"
                  step="1000"
                  value={filters.maxAmount}
                  onChange={(e) => setFilters({ ...filters, maxAmount: parseInt(e.target.value) })}
                  className="w-full"
                />
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
                  max="4"
                  step="0.1"
                  value={filters.minGpa}
                  onChange={(e) => setFilters({ ...filters, minGpa: parseFloat(e.target.value) })}
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
                  onChange={(e) => setFilters({ ...filters, maxGpa: parseFloat(e.target.value) })}
                  className="w-full"
                />
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-gray-200" />

        {/* Fields Filter */}
        <div className="space-y-3">
          <button
            onClick={() => toggleSection('fields')}
            className="flex items-center justify-between w-full text-left"
          >
            <h3 className="text-sm font-semibold text-gray-900">
              Fields of Study {filters.fields.length > 0 && `(${filters.fields.length})`}
            </h3>
            {expandedSections.includes('fields') ? (
              <ChevronUp className="w-4 h-4 text-gray-500" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-500" />
            )}
          </button>

          {expandedSections.includes('fields') && (
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {uniqueFields.map((field) => (
                <label key={field} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.fields.includes(field)}
                    onChange={() => handleCheckboxChange('fields', field)}
                    className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{field}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
