'use client';

import { applicantProfileSchema, IApplicantProfile } from '@/lib/schemas';
import BreadcrumbHeader from '@/pattern/core/BreadcrumbHeader';
import Loading from '@/pattern/share/Loading';
import {
  useCreateProfileMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
} from '@/state/apiApplicant';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { DEFAULT_PROFILE_FORM_VALUES } from '../Profile/constants';
import { Form } from '@/pattern/cus/form';
import {
  Activities,
  Certificates,
  EducationHistory,
  Intentions,
  Preferences,
  PreferredPreferences,
  Skills,
  StudentInformation,
} from './components';
import { Separator } from '@/pattern/cus/separator';
import { Button } from '@/pattern/cus/button';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

const ProfileUpdatePage = () => {
  const t = useTranslations('applicantProfile');
  const { data: profileData, isLoading: isLoadingProfile } = useGetProfileQuery();
  const [createProfile, { isLoading: isLoadingCreateProfile }] = useCreateProfileMutation();
  const [updateProfile, { isLoading: isLoadingUpdateProfile }] = useUpdateProfileMutation();

  const router = useRouter();

  const methods = useForm<IApplicantProfile>({
    reValidateMode: 'onSubmit',
    mode: 'onChange',
    resolver: zodResolver(applicantProfileSchema),
    defaultValues: DEFAULT_PROFILE_FORM_VALUES,
  });

  useEffect(() => {
    if (profileData && profileData.applicantProfile) {
      const formData = {
        applicantProfile: {
          ...DEFAULT_PROFILE_FORM_VALUES.applicantProfile,
          ...profileData.applicantProfile,
        },
      };

      methods.reset(formData);
    }
  }, [profileData, methods]);

  const onSubmit = async (data: IApplicantProfile) => {
    try {
      // Call API to update or create student info
      if (profileData && profileData.applicantProfile) {
        await updateProfile(data)
          .unwrap()
          .then(() => {
            router.push('/applicant/profile');
          });
      } else {
        await createProfile(data)
          .unwrap()
          .then(() => {
            router.push('/applicant/profile');
          });
      }
    } catch (error) {
      console.log('Error updating student info:', error);
      throw error;
    }
  };

  const handleCancel = () => {
    router.push('/applicant/profile');
  };

  if (isLoadingProfile) {
    return <Loading />;
  }

  return (
    <>
      <BreadcrumbHeader
        items={[
          { label: t('breadcrumb.applicant'), href: '/applicant' },
          { label: t('breadcrumb.profile'), href: '/applicant/profile' },
          { label: t('breadcrumb.update') },
        ]}
      />

      <div className="mx-auto px-4 lg:px-40 py-6 bg-white space-y-6">
        <Form {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <div className="space-y-6">
              <StudentInformation />
              <Separator />
              <PreferredPreferences />
              <Separator />
              <Activities />
              <Separator />
              <Preferences />
              <Separator />
              <Intentions />
              <Separator />
              <EducationHistory />
              <Separator />
              <Skills />
              <Separator />
              <Certificates />
            </div>
            <div className="mt-6 flex flex-col sm:flex-row gap-2 sm:justify-end">
              <Button
                variant="outline"
                onClick={handleCancel}
                className="w-full sm:w-auto text-primary-brand px-10 py-2.5"
              >
                {t('common.cancel')}
              </Button>
              <Button
                type="submit"
                className="w-full sm:w-auto px-10 py-2.5"
                disabled={isLoadingCreateProfile || isLoadingUpdateProfile}
              >
                {isLoadingCreateProfile || isLoadingUpdateProfile ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  t('common.save')
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};

export default ProfileUpdatePage;
