'use client';

import { Button } from '@/lib/cus/button';
import Header from '@/pattern/share/Header';
import { Plus } from 'lucide-react';
import React from 'react';
import { ScholarshipCard, EmptyState } from './components';
import { useRouter } from 'next/navigation';
import { useDeleteScholarshipMutation, useGetScholarshipsQuery } from '@/state/apiProvider';
import { ScholarshipCardSkeleton } from './components/ScholarshipCard';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';

const ProviderScholaship = () => {
  const router = useRouter();
  const t = useTranslations('providerScholaship');

  const { data: scholarships, isLoading } = useGetScholarshipsQuery();
  const [deleteScholarship, { isLoading: isDeleting }] = useDeleteScholarshipMutation();

  const handleDeleteScholarship = async (id: number) => {
    await deleteScholarship(id)
      .unwrap()
      .then(() => {
        toast.success('Scholarship deleted successfully');
      })
      .catch(() => {
        toast.error('Failed to delete scholarship');
      });
  };

  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Header */}
      <Header
        subtitle={t('subtitle')}
        title={t('title')}
        rightElement={
          <Button
            onClick={() => router.push('/provider/scholarships/create')}
            className="bg-primary-brand text-white hover:bg-primary-brand/90 shadow-sm"
          >
            <Plus className="w-4 h-4 mr-2" />
            {t('newScholarship')}
          </Button>
        }
      />

      {/* Scholarships Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
