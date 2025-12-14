'use client';

import { ScholarshipContent } from '@/@screen/(nondashboard)/ScholarshipDetail/components';
import { Button } from '@/pattern/cus/button';
import AIApplicantSuggestionsDialog from '@/pattern/share/AIApplicantSuggestionsDialog';
import Header from '@/pattern/share/Header';
import Loading from '@/pattern/share/Loading';
import { useGetScholarshipBySlugQuery } from '@/state/apiScholarship';
import { Sparkles } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React, { useState } from 'react';

const ProviderScholarshipDetail = ({ scholarshipSlug }: { scholarshipSlug: string }) => {
  const t = useTranslations('scholarshipDetail');
  const [showAISuggestions, setShowAISuggestions] = useState(false);

  const {
    data: scholarship,
    isLoading,
    isError,
    refetch,
  } = useGetScholarshipBySlugQuery(scholarshipSlug, { skip: !scholarshipSlug });

  if (isLoading) {
    return <Loading />;
  }

  if (isError || !scholarship) {
    return (
      <div className="h-full bg-white flex items-center justify-center py-12">
        <div className="">
          <div className="relative w-96 h-96 rounded-2xl overflow-hidden">
            <Image
              src="https://cl2h8yilb0.ufs.sh/f/9iOVh1BwOhmurIeFvqCyKeRcQFZHL80wDt4PJ75ruqv1mxMG"
              alt="Scholarship Not Found"
              fill
              className="object-cover"
            />
          </div>
          <h1 className="text-2xl font-bold text-gray-600 mb-2">{t('notFound')}</h1>
          <p className="text-gray-500 mb-4">{t('notFoundDescription')}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="p-6 lg:p-8 space-y-6">
        <Header
          title={scholarship.title}
          subtitle={scholarship.shortDescription}
          rightElement={
            <Button
              onClick={(e) => {
                e.preventDefault();
                setShowAISuggestions?.(true);
              }}
              className="bg-primary-brand text-white hover:bg-primary-brand/90 w-full mt-2 shadow-sm"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              {t('generateSuggestions')}
            </Button>
          }
        />

        <ScholarshipContent scholarship={scholarship} />
      </div>

      <AIApplicantSuggestionsDialog
        isOpen={showAISuggestions}
        onClose={() => {
          setShowAISuggestions(false);
        }}
        scholarship={scholarship}
      />
    </>
  );
};

export default ProviderScholarshipDetail;
