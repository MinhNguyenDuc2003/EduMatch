'use client';

import { IApplication } from '@/lib/schemas';
import ApplicationsForm, { ApplicationsFormRef } from '@/pattern/share/ApplicationsForm';
import { useCreateApplicationMutation, useGetProfileQuery } from '@/state/apiApplicant';
import React, { useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Button } from '@/lib/cus/button';
import { Download } from 'lucide-react';
import { mapProfileToApplication } from '@/lib/utils';
import Loading from '@/pattern/share/Loading';
import { useRouter } from 'next/navigation';

const ApplicationCreatePage = () => {
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const formRef = useRef<ApplicationsFormRef>(null);
  const router = useRouter();
  const { data: profileData, isLoading: isLoadingProfile } = useGetProfileQuery();

  const [createApplication, { isLoading }] = useCreateApplicationMutation();

  const onSubmit = async (data: IApplication) => {
    try {
      console.log('Submitting application:', data);

      const formData = new FormData();
      formData.append('application', JSON.stringify({ ...data, code: uuidv4() }));

      // Append images to FormData
      uploadedImages.forEach((image) => {
        formData.append('mediaFiles', image);
      });

      await createApplication(formData).unwrap();

      router.push('/applicant/activity');
    } catch (error) {
      console.log('Error creating application:', error);
      throw error;
    }
  };

  const handleImagesChange = (images: File[]) => {
    setUploadedImages(images);
  };

  const handleImportProfile = () => {
    if (!profileData || !formRef.current) {
      return;
    }

    const applicationData = mapProfileToApplication(profileData);
    formRef.current.setFormValues(applicationData);
  };

  if (isLoadingProfile) {
    return <Loading />;
  }

  return (
    <div className="p-6 lg:p-8 space-y-6 bg-white">
      <div className="flex justify-end mb-4">
        <Button
          type="button"
          onClick={handleImportProfile}
          variant="outline"
          className="border-[#3D6CB9] text-[#3D6CB9] hover:bg-[#3D6CB9]/10"
          disabled={!profileData?.applicantProfile}
        >
          <Download className="w-4 h-4 mr-2" />
          Import từ Profile
        </Button>
      </div>
      <ApplicationsForm
        ref={formRef}
        onSubmit={onSubmit}
        onImagesChange={handleImagesChange}
        isLoading={isLoading}
      />
    </div>
  );
};

export default ApplicationCreatePage;
