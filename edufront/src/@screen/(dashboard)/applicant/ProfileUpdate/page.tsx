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
  PreferredPreferences,
  Skills,
  StudentInformation,
} from './components';
import { Separator } from '@/pattern/cus/separator';
import { Button } from '@/pattern/cus/button';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/pattern/cus/dialog';
import { Textarea } from '@/pattern/cus/textarea';
import { toast } from 'sonner';

const ProfileUpdatePage = () => {
  const t = useTranslations('applicantProfile');
  const [isImportOpen, setIsImportOpen] = React.useState(false);
  const [jsonInput, setJsonInput] = React.useState('');
  const [importError, setImportError] = React.useState<string | null>(null);
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
      if (
        data.applicantProfile.applicantPreferences &&
        data.applicantProfile.applicantPreferences.length === 0
      ) {
        data.applicantProfile.applicantPreferences = [
          {
            field: 'experience_w',
            weight: 0.8,
          },
          {
            field: 'career_w',
            weight: 0.3,
          },
          {
            field: 'education_w',
            weight: 0.8,
          },
          {
            field: 'intentions_w',
            weight: 0.4,
          },
          {
            field: 'major_w',
            weight: 0.4,
          },
          {
            field: 'skills_w',
            weight: 0.5,
          },
          {
            field: 'research_w',
            weight: 0.5,
          },
        ];
      }

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

  const handleImport = () => {
    try {
      if (!jsonInput.trim()) {
        setImportError('Please enter valid JSON');
        return;
      }

      const parsedData = JSON.parse(jsonInput);

      // Basic validation - check if it looks like an applicant profile
      // We rely on simple check to avoid strict schema validation issues on raw input,
      // but form validation will happen on submit anyway.

      // If the JSON is directly the profile object
      if (parsedData.applicantProfile) {
        methods.reset(parsedData);
      } else {
        // Attempt to wrap it if user pasted just the inner object
        methods.reset({ applicantProfile: parsedData });
      }

      setImportError(null);
      setIsImportOpen(false);
      setJsonInput('');
      toast('Profile data imported successfully', {
        description: 'Review the form fields before saving.',
      });
    } catch (e) {
      console.error('Invalid JSON', e);
      setImportError('Invalid JSON syntax: ' + (e as Error).message);
    }
  };

  if (isLoadingProfile) {
    return <Loading />;
  }

  return (
    <>
      <BreadcrumbHeader
        items={[
          { label: t('breadcrumb.profile'), href: '/applicant/profile' },
          { label: t('breadcrumb.update') },
        ]}
      />

      <div className="mx-auto px-4 lg:px-40 py-6 bg-white space-y-6">
        <div className="flex justify-end">
          <Dialog open={isImportOpen} onOpenChange={setIsImportOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full sm:w-auto text-primary-brand py-2.5">
                Import JSON
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-h-[60vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Import Profile Data</DialogTitle>
                <DialogDescription>
                  Paste your profile data JSON here to quickly populate the form.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <Textarea
                  placeholder="Paste JSON here..."
                  className="min-h-[300px] font-mono text-xs"
                  value={jsonInput}
                  onChange={(e) => setJsonInput(e.target.value)}
                />
                {importError && <p className="text-sm text-red-500">{importError}</p>}
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsImportOpen(false)}
                  className="w-full sm:w-auto text-primary-brand py-2.5"
                >
                  Cancel
                </Button>
                <Button onClick={handleImport}>Import</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <Form {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <div className="space-y-6">
              <StudentInformation profile={profileData?.applicantProfile} />
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
