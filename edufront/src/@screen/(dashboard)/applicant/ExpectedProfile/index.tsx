'use client';

import { COUNTRIES } from '@/constants/Common';
import { useAuth } from '@/hooks/useAuth';
import { applicantProfileSchema, IApplicantProfile } from '@/lib/schemas';
import { Button } from '@/pattern/cus/button';
import { CustomFormField } from '@/pattern/cus/CustomFormField';
import { Form } from '@/pattern/cus/form';
import Loading from '@/pattern/share/Loading';
import {
  useCreateExpectedProfileMutation,
  useGetAllProfilesQuery,
  useUpdateExpectedProfileMutation,
} from '@/state/apiApplicant';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Separator } from '@/pattern/cus/separator';
import {
  Activities,
  Certificates,
  EducationHistory,
  Intentions,
  PreferredPreferences,
  Skills,
  StudentInformation,
} from '../ProfileUpdate/components';
import { useRouter } from 'next/navigation';

export default function ExpectedProfilePage() {
  const { data: profiles, isLoading: isLoadingProfiles } = useGetAllProfilesQuery();
  const [createProfile, { isLoading: isCreating }] = useCreateExpectedProfileMutation();
  const [updateProfile, { isLoading: isUpdating }] = useUpdateExpectedProfileMutation();
  const router = useRouter();

  const expectedProfile = profiles?.find((p) => p.type === 'Expected');
  const currentProfile = profiles?.find((p) => p.type === 'Current');
  const isEditing = !!expectedProfile;

  const methods = useForm<IApplicantProfile>({
    resolver: zodResolver(applicantProfileSchema),
    defaultValues: {
      applicantProfile: {
        firstName: '',
        lastName: '',
        contactName: '',
        citizenshipStatus: '',
        hometown: '',
        preferredCountry: '',
        preferredMajor: '',
        preferredScholarshipType: '',
        careerGoals: '',
        researchInterest: '',
        educationLevel: '',
        languages: '',
        intentions: [],
        skills: [],
        educationHistories: [],
      },
    },
  });

  const { handleSubmit, reset } = methods;

  useEffect(() => {
    if (expectedProfile) {
      reset({
        applicantProfile: expectedProfile,
      });
    } else {
      reset({
        applicantProfile: currentProfile,
      });
    }
  }, [expectedProfile, currentProfile, reset]);

  const onSubmit = async (data: IApplicantProfile) => {
    try {
      const payload = {
        ...data.applicantProfile,
        type: 'Expected' as const,
      };

      if (isEditing && expectedProfile?.id) {
        await updateProfile({ ...payload })
          .unwrap()
          .then(() => {
            toast.success('Expected profile updated successfully');
            router.push('/recommended-scholarships');
          });
      } else {
        await createProfile({ ...payload, id: undefined })
          .unwrap()
          .then(() => {
            toast.success('Expected profile created successfully');
            router.push('/recommended-scholarships');
          });
      }
    } catch (error: any) {
      console.error('Failed to save profile:', error);
      toast.error(error?.data?.message || 'Failed to save profile');
    }
  };

  if (isLoadingProfiles) {
    return <Loading />;
  }

  return (
    <div className="mx-auto px-4 lg:px-40 py-6 bg-white space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">
          {isEditing ? 'Update Expected Profile' : 'Create Expected Profile'}
        </h1>
      </div>

      <Form {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Basic Information */}
          <div className="space-y-6">
            <StudentInformation profile={expectedProfile ? expectedProfile : currentProfile} />
            <Separator />
            <PreferredPreferences />
            <Separator />
            <Activities />
            <Separator />
            <Intentions />
            <Separator />
            <EducationHistory />
            <Separator />
            <Skills />
            <Separator />
            <Certificates />
          </div>

          <div className="flex justify-end pt-6">
            <Button
              type="submit"
              disabled={isCreating || isUpdating}
              className="bg-[#3D6CB9] hover:bg-[#2F5A9E] text-white py-3 px-8 text-base font-semibold"
            >
              {isCreating || isUpdating ? 'Saving...' : 'Save Profile'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
