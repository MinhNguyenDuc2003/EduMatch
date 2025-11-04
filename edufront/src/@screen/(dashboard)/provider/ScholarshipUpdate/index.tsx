'use client';

import { IScholarship } from '@/lib/schemas';
import Header from '@/pattern/share/Header';
import { Loading } from '@/pattern/share/Loading';
import ScholarshipForm from '@/pattern/share/ScholarshipForm';
import { useGetScholarshipsByIdQuery, useUpdateScholarshipMutation } from '@/state/apiProvider';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const ScholarshipUpdate = ({ scholarshipId }: { scholarshipId: string }) => {
  const router = useRouter();
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [updateScholarship, { isLoading: isLoadingUpdateScholarship }] =
    useUpdateScholarshipMutation();

  const { data: scholarship, isLoading: isLoadingScholarship } =
    useGetScholarshipsByIdQuery(scholarshipId);

  const onSubmit = async (data: IScholarship) => {
    try {
      // TODO: Call API to create scholarship
      console.log('Submitting scholarship:', data);
      // await createScholarship(data).unwrap();
      const formData = new FormData();
      formData.append('scholarship', JSON.stringify(data));

      console.log(uploadedImages);

      if (uploadedImages.length > 0) {
        // Append images to FormData
        uploadedImages.forEach((image) => {
          formData.append('images', image);
        });
      }

      await updateScholarship(formData).unwrap();

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

  if (isLoadingScholarship) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading />
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8 space-y-6 bg-white">
      <Header subtitle="Update scholarship program" title="Update Scholarship" />

      <ScholarshipForm
        onSubmit={onSubmit}
        onImagesChange={handleImagesChange}
        scholarship={scholarship}
        isLoading={isLoadingUpdateScholarship}
      />
    </div>
  );
};

export default ScholarshipUpdate;
