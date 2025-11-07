'use client';

import { IApplication } from '@/lib/schemas';
import ApplicationsForm from '@/pattern/share/ApplicationsForm';
import { useCreateApplicationMutation } from '@/state/apiApplicant';
import React, { useState } from 'react';

const ApplicationsPage = () => {
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);

  const [createApplication, { isLoading }] = useCreateApplicationMutation();

  const onSubmit = async (data: IApplication) => {
    try {
      console.log('Submitting application:', data);

      const formData = new FormData();
      formData.append('application', JSON.stringify(data));

      // Append images to FormData
      uploadedImages.forEach((image) => {
        formData.append('mediaFiles', image);
      });

      await createApplication(formData).unwrap();
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
      <ApplicationsForm
        onSubmit={onSubmit}
        onImagesChange={handleImagesChange}
        isLoading={isLoading}
      />
    </div>
  );
};

export default ApplicationsPage;
