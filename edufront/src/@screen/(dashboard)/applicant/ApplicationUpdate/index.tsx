'use client';

import { IApplication } from '@/lib/schemas';
import ApplicationsForm from '@/pattern/share/ApplicationsForm';
import { Loading } from '@/pattern/share/Loading';
import {
  useDeleteImagesMutation,
  useGetApplicationByIdQuery,
  useUpdateApplicationMutation,
  useUploadImagesMutation,
} from '@/state/apiApplicant';
import { useRouter } from 'next/navigation';
import React from 'react';

const ApplicationUpdate = ({ applicationId }: { applicationId: string }) => {
  const router = useRouter();
  const { data: application, isLoading: isLoadingApplication } =
    useGetApplicationByIdQuery(applicationId);
  const [updateApplication, { isLoading: isLoadingUpdateApplication }] =
    useUpdateApplicationMutation();
  const [uploadImages] = useUploadImagesMutation();
  const [deleteImage] = useDeleteImagesMutation();

  const onSubmit = async (data: IApplication) => {
    try {
      await updateApplication(data).unwrap();

      router.push('/applicant/applications');
    } catch (error) {
      console.log('Error updating application:', error);
    }
  };

  const handleImagesChange = async (images: File[]) => {
    const formData = new FormData();
    images.forEach((image) => {
      formData.append('mediaFiles', image);
    });
    await uploadImages({ applicationId, formData }).unwrap();
  };

  const handleDeleteImage = async (imageId: number) => {
    await deleteImage({ applicationId, imagesId: [imageId] }).unwrap();
  };

  if (isLoadingApplication)
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading />
      </div>
    );
  return (
    <div className="p-6 lg:p-8 space-y-6 bg-white">
      <ApplicationsForm
        application={application}
        onSubmit={onSubmit}
        onImagesChange={handleImagesChange}
        onDeleteImage={handleDeleteImage}
        isLoading={isLoadingUpdateApplication}
      />
    </div>
  );
};

export default ApplicationUpdate;
