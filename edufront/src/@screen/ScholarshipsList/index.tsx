'use client';

import { useState, useEffect } from 'react';
import Header from '@/pattern/core/Header';
import Footer from '@/pattern/core/Footer';
import { FilterSidebar, ScholarshipCard, RightSidebar } from './components';
import { mockScholarshipOpportunities } from '@/@screen/HomePage/mockData';

type ScholarshipData = {
  Id?: number;
  Provider_id?: number;
  Title?: string;
  Slug?: string;
  Short_description?: string;
  Description?: string;
  Requirements?: string;
  Benefits?: string;
  Fields?: string;
  Country?: string;
  University?: string;
  Study_level?: string;
  Scholarship_type?: string;
  Funding_amount?: number;
  Start_date?: string;
  End_date?: string;
  Available_slots?: number;
  Language_requirement?: string;
  Gpa_requirement?: number;
};

export type FilterState = {
  searchQuery: string;
  countries: string[];
  studyLevels: string[];
  scholarshipTypes: string[];
  minAmount: number;
  maxAmount: number;
  minGpa: number;
  maxGpa: number;
  fields: string[];
};

export default function ScholarshipsList() {
  const [activeTab, setActiveTab] = useState<'scholarships' | 'research'>('scholarships');
  const [scholarships, setScholarships] = useState<ScholarshipData[]>([]);
  const [filteredScholarships, setFilteredScholarships] = useState<ScholarshipData[]>([]);

  const [filters, setFilters] = useState<FilterState>({
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

  // Load scholarships from mockData
  useEffect(() => {
    setScholarships(mockScholarshipOpportunities);
    setFilteredScholarships(mockScholarshipOpportunities);
  }, []);

  // Apply filters
  useEffect(() => {
    let filtered = [...scholarships];

    // Search query
    if (filters.searchQuery) {
      filtered = filtered.filter(
        (item) =>
          item.Title?.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
          item.Short_description?.toLowerCase().includes(filters.searchQuery.toLowerCase())
      );
    }

    // Country filter
    if (filters.countries.length > 0) {
      filtered = filtered.filter((item) => filters.countries.includes(item.Country || ''));
    }

    // Study level filter
    if (filters.studyLevels.length > 0) {
      filtered = filtered.filter((item) => filters.studyLevels.includes(item.Study_level || ''));
    }

    // Scholarship type filter
    if (filters.scholarshipTypes.length > 0) {
      filtered = filtered.filter((item) =>
        filters.scholarshipTypes.includes(item.Scholarship_type || '')
      );
    }

    // Amount filter
    filtered = filtered.filter(
      (item) =>
        (item.Funding_amount || 0) >= filters.minAmount &&
        (item.Funding_amount || 0) <= filters.maxAmount
    );

    // GPA filter
    filtered = filtered.filter(
      (item) =>
        (item.Gpa_requirement || 0) >= filters.minGpa &&
        (item.Gpa_requirement || 0) <= filters.maxGpa
    );

    // Fields filter
    if (filters.fields.length > 0) {
      filtered = filtered.filter((item) =>
        filters.fields.some((field) => item.Fields?.toLowerCase().includes(field.toLowerCase()))
      );
    }

    setFilteredScholarships(filtered);
  }, [filters, scholarships]);

  const handleApply = (scholarship: ScholarshipData) => {
    console.log('Apply to:', scholarship.Title);
    // TODO: Implement apply logic
  };

  return (
    <>
      <Header />

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50/30 py-8">
        {/* Main Content - 3 Columns */}
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Sidebar - Filters (3 columns) */}
            <div className="lg:col-span-3">
              <FilterSidebar
                filters={filters}
                setFilters={setFilters}
                scholarships={scholarships}
              />
            </div>

            {/* Middle Content - Scholarship Cards (6 columns) */}
            <div className="lg:col-span-6">
              <div className="space-y-4">
                {filteredScholarships.length === 0 ? (
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                    <p className="text-gray-500 text-lg">
                      No scholarships found matching your criteria.
                    </p>
                  </div>
                ) : (
                  filteredScholarships.map((scholarship) => (
                    <ScholarshipCard
                      key={scholarship.Id}
                      scholarship={scholarship}
                      onApply={handleApply}
                    />
                  ))
                )}
              </div>
            </div>

            {/* Right Sidebar - Tabs & Stats (3 columns) */}
            <div className="lg:col-span-3">
              <RightSidebar
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                scholarshipsCount={filteredScholarships.length}
                researchCount={0}
              />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
