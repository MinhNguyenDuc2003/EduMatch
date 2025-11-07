'use client';

import { Button } from '@/lib/cus/button';
import Header from '@/pattern/share/Header';
import { Plus } from 'lucide-react';
import React, { useState } from 'react';
import { SearchFilters, ScholarshipCard, EmptyState, Pagination } from './components';
import { useRouter } from 'next/navigation';
import { useGetScholarshipsQuery } from '@/state/apiProvider';
import { ScholarshipCardSkeleton } from './components/ScholarshipCard';

const ProviderScholaship = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const { data: scholarships, isLoading } = useGetScholarshipsQuery();

  const handleDeleteScholarship = (id: number) => {
    // TODO: Implement delete logic
    console.log('Delete scholarship:', id);
  };

  const handleCreateScholarship = () => {
    // TODO: Navigate to create page
    console.log('Create new scholarship');
  };

  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Header */}
      <Header
        subtitle="Manage your scholarship programs"
        title="Scholarships"
        rightElement={
          <Button
            onClick={() => router.push('/provider/scholarships/create')}
            className="bg-primary-brand text-white hover:bg-primary-brand/90 shadow-sm"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Scholarship
          </Button>
        }
      />

      {/* Search and Filters */}
      <SearchFilters searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      {/* Scholarships Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {isLoading &&
          Array.from({ length: 10 }).map((_, index) => (
            <ScholarshipCardSkeleton variant="medium" className="bg-white" key={index} />
          ))}

        {!isLoading &&
          scholarships &&
          scholarships.length > 0 &&
          scholarships.map((scholarship) => (
            <ScholarshipCard
              key={scholarship.id}
              scholarship={scholarship}
              onDelete={handleDeleteScholarship}
            />
          ))}
      </div>

      {!isLoading && (!scholarships || scholarships.length === 0) && <EmptyState />}
    </div>
  );
};

export default ProviderScholaship;
