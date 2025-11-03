'use client';

import React, { useState } from 'react';
import { IScholarship } from '@/lib/schemas';
import Header from '@/pattern/share/Header';
import { useRouter } from 'next/navigation';
import ScholarshipForm from '@/pattern/share/ScholarshipForm';

const ScholarshipCreatePage = () => {
  const router = useRouter();
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);

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
      <Header subtitle="Create a new scholarship program" title="New Scholarship" />

      <ScholarshipForm onSubmit={onSubmit} onImagesChange={handleImagesChange} />
    </div>
  );
};

export default ScholarshipCreatePage;
