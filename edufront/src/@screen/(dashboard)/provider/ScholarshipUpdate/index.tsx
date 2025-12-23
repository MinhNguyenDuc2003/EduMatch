'use client';

import { IScholarship } from '@/lib/schemas';
import Header from '@/pattern/share/Header';
import Loading from '@/pattern/share/Loading';
import ScholarshipForm from '@/pattern/share/ScholarshipForm';
import {
  useDeleteImageMutation,
  useGetScholarshipsByIdQuery,
  useUpdateScholarshipMutation,
  useUploadImagesMutation,
} from '@/state/apiProvider';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import React from 'react';

const ScholarshipUpdate = ({ scholarshipId }: { scholarshipId: string }) => {
  const router = useRouter();
  const t = useTranslations('providerScholaship');
  const [updateScholarship, { isLoading: isLoadingUpdateScholarship }] =
    useUpdateScholarshipMutation();

  const { data: scholarship, isLoading: isLoadingScholarship } =
    useGetScholarshipsByIdQuery(scholarshipId);

  const [uploadImages, { isLoading: isLoadingUploadImages }] = useUploadImagesMutation();
  const [deleteImage, { isLoading: isLoadingDeleteImage }] = useDeleteImageMutation();

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

      await updateScholarship(data).unwrap();

      // Navigate back to scholarships list after successful creation
      router.push('/provider/scholarships');
    } catch (error) {
      console.log('Error creating scholarship:', error);
    }
  };

  const handleImagesChange = async (images: File[]) => {
    const formData = new FormData();
    images.forEach((image) => {
      formData.append('mediaFiles', image);
    });
    await uploadImages({ scholarshipId, formData }).unwrap();
  };

  const handleDeleteImage = async (imageId: number) => {
    await deleteImage({ scholarshipId, imagesId: [imageId] }).unwrap();
  };

  if (isLoadingScholarship) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading />
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8 space-y-6 bg-white">
      <Header subtitle={t('subtitleUpdateScholarship')} title={t('updateScholarship')} />

      <ScholarshipForm
        onSubmit={onSubmit}
        onImagesChange={handleImagesChange}
        onDeleteImage={handleDeleteImage}
        scholarship={scholarship}
        isLoading={isLoadingUpdateScholarship}
      />
    </div>
  );
};

export default ScholarshipUpdate;
