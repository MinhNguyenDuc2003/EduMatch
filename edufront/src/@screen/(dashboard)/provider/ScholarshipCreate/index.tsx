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
      console.log('Submitting scholarship:', data);
      // await createScholarship(data).unwrap();
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
