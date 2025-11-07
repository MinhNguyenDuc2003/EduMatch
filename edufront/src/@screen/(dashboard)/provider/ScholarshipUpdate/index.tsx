'use client';

import { IScholarship } from '@/lib/schemas';
import Header from '@/pattern/share/Header';
import { Loading } from '@/pattern/share/Loading';
import ScholarshipForm from '@/pattern/share/ScholarshipForm';
import {
  useDeleteImageMutation,
  useGetScholarshipsByIdQuery,
  useUpdateScholarshipMutation,
  useUploadImagesMutation,
} from '@/state/apiProvider';
import { useRouter } from 'next/navigation';
import React from 'react';

const ScholarshipUpdate = ({ scholarshipId }: { scholarshipId: string }) => {
  const router = useRouter();
  const [updateScholarship, { isLoading: isLoadingUpdateScholarship }] =
    useUpdateScholarshipMutation();

  const { data: scholarship, isLoading: isLoadingScholarship } =
    useGetScholarshipsByIdQuery(scholarshipId);

  const [uploadImages, { isLoading: isLoadingUploadImages }] = useUploadImagesMutation();
  const [deleteImage, { isLoading: isLoadingDeleteImage }] = useDeleteImageMutation();

  const onSubmit = async (data: IScholarship) => {
    try {
      // TODO: Call API to create scholarship
      console.log('Submitting scholarship:', data);

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
      <Header subtitle="Update scholarship program" title="Update Scholarship" />

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
