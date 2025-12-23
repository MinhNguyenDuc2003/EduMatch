'use client';

import React, { useState } from 'react';
import { IScholarship } from '@/lib/schemas';
import Header from '@/pattern/share/Header';
import { useRouter } from 'next/navigation';
import ScholarshipForm from '@/pattern/share/ScholarshipForm';
import { useCreateScholarshipMutation } from '@/state/apiProvider';
import { useTranslations } from 'next-intl';

const ScholarshipCreatePage = () => {
  const router = useRouter();
  const t = useTranslations('providerScholaship');
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);

  const [createScholarship, { isLoading: isLoadingCreateScholarship }] =
    useCreateScholarshipMutation();

  const onSubmit = async (data: IScholarship) => {
    try {
      // TODO: Call API to create scholarship
      if (data.scholarshipPreferences && data.scholarshipPreferences.length === 0) {
        data.scholarshipPreferences = [
          {
            field: 'experience_w',
            weight: 0.5,
            type: 'PROFILE',
          },
          {
            field: 'career_w',
            weight: 0.5,
          },
          {
            field: 'education_w',
            weight: 0.5,
            type: 'PROFILE',
          },
          {
            field: 'intentions_w',
            weight: 0.5,
            type: 'PROFILE',
          },
          {
            field: 'major_w',
            weight: 0.5,
          },
          {
            field: 'skills_w',
            weight: 0.5,
          },
          { field: 'research_w', weight: 0.5 },
          { field: 'personal_statement_w', weight: 0.5, type: 'APPLICATION' },
          { field: 'motivation_w', weight: 0.5, type: 'APPLICATION' },
          { field: 'achievements_w', weight: 0.5, type: 'APPLICATION' },
          { field: 'extracurricular_w', weight: 0.5, type: 'APPLICATION' },
        ];
      }

      const formData = new FormData();
      formData.append('scholarship', JSON.stringify(data));

      // Append images to FormData
      uploadedImages.forEach((image) => {
        formData.append('images', image);
      });

      await createScholarship(formData).unwrap();

      // Navigate back to scholarships list after successful creation
      router.push('/provider/scholarships');
    } catch (error) {
      console.error('Error creating scholarship:', error);
      throw error;
    }
  };

  const handleImagesChange = (images: File[]) => {
    setUploadedImages(images);
  };

  return (
    <div className="p-6 lg:p-8 space-y-6 bg-white">
      <Header subtitle={t('subtitleCreateScholarship')} title={t('newScholarship')} />

      <ScholarshipForm
        onSubmit={onSubmit}
        onImagesChange={handleImagesChange}
        isLoading={isLoadingCreateScholarship}
      />
    </div>
  );
};

export default ScholarshipCreatePage;
