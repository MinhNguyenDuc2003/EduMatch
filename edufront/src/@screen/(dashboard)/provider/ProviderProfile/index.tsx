'use client';

import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { Form } from '@/lib/cus/form';
import { providerProfileSchema, IProviderProfile } from '@/lib/schemas';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/lib/cus/button';
import { CustomFormField } from '@/lib/cus/CustomFormField';
import ProfileHeader from './components/ProfileHeader';
import { ProviderProfileSkeleton } from './components';
import { useGetProfileQuery, useUpdateProfileMutation } from '@/state/apiProvider';
import { COUNTRIES, ORGANIZATION_TYPES } from '@/constants/Common';
import { DEFAULT_PROVIDER_FORM_VALUES } from '@/constants/DefaultValues';
import { useTranslations } from 'next-intl';

export default function ProviderProfile() {
  const [bannerUrl, setBannerUrl] = useState<File | null>(null);
  const [profileUrl, setProfileUrl] = useState<File | null>(null);

  const t = useTranslations('providerProfile');

  const { data: profileData, isLoading: isLoadingProfile } = useGetProfileQuery();

  const [updateProfile, { isLoading: isLoadingUpdateProfile }] = useUpdateProfileMutation();

  // Form setup
  const methods = useForm<IProviderProfile>({
    reValidateMode: 'onSubmit',
    mode: 'onChange',
    resolver: zodResolver(providerProfileSchema),
    defaultValues: DEFAULT_PROVIDER_FORM_VALUES,
  });

  const { setValue, reset, control } = methods;

  // Watch only the contacts array to minimize re-renders for the contacts list
  const providerContactDtos = useWatch({
    control,
    name: 'providerProfile.providerContactDtos',
    defaultValue: [],
  });

  // Watch full profile data for ProfileHeader (only necessary fields)
  const profileForHeader = useWatch({
    control,
    name: 'providerProfile',
  });

  // Memoize current data to avoid unnecessary re-renders
  const currentData = useMemo(() => {
    return {
      providerContactDtos: providerContactDtos || [],
    };
  }, [providerContactDtos]);

  // Memoize profile data for header
  const headerData = useMemo(() => {
    return profileForHeader ? (profileForHeader as ProviderProfile) : undefined;
  }, [profileForHeader]);

  // Handle image uploads
  const handleBannerUpload = useCallback(async (file: File) => {
    setBannerUrl(file);
  }, []);

  const handleProfileUpload = useCallback(async (file: File) => {
    setProfileUrl(file);
  }, []);

  // Reset form when profile data is loaded
  useEffect(() => {
    if (profileData?.providerProfile) {
      const formData: IProviderProfile = {
        providerProfile: {
          ...DEFAULT_PROVIDER_FORM_VALUES.providerProfile,
          ...profileData.providerProfile,
        },
      };
      reset(formData);
    }
  }, [profileData, reset]);

  const onSubmit = useCallback(
    async (data: IProviderProfile) => {
      try {
        const formData = new FormData();
        formData.append('profile', JSON.stringify(data));
        if (bannerUrl) {
          formData.append('banner', bannerUrl);
        }
        if (profileUrl) {
          formData.append('logo', profileUrl);
        }

        await updateProfile(formData).unwrap();
      } catch (error) {
        console.error('Error updating organization info:', error);
        throw error;
      }
    },
    [bannerUrl, profileUrl, updateProfile]
  );

  const handleAddContact = useCallback(() => {
    const currentContacts = currentData.providerContactDtos;
    setValue('providerProfile.providerContactDtos', [
      ...currentContacts,
      {
        contactName: '',
        roleTitle: '',
        email: '',
        phone: '',
        linkedinUrl: '',
      },
    ]);
  }, [currentData.providerContactDtos, setValue]);

  const handleRemoveContact = useCallback(
    (index: number) => {
      const currentContacts = currentData.providerContactDtos;
      setValue(
        'providerProfile.providerContactDtos',
        currentContacts.filter((_: unknown, i: number) => i !== index)
      );
    },
    [currentData.providerContactDtos, setValue]
  );

  if (isLoadingProfile) {
    return <ProviderProfileSkeleton />;
  }

  return (
    <div className="p-6 lg:p-8 space-y-6 bg-white">
      {/* Header Section with Profile Info Display */}
      <ProfileHeader
        currentData={headerData}
        onBannerUpload={handleBannerUpload}
        onProfileUpload={handleProfileUpload}
        isEdit
      />

      {/* Form Section */}
      <div className="py-8">
        <Form {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <div className="space-y-8 grid grid-cols-1 lg:grid-cols-2 gap-6 auto-rows-fr">
              {/* Organization Information */}
              <div className="space-y-6 ">
                <h2 className="text-2xl font-semibold text-gray-900 flex items-center">
                  {t('organizationInformation')}
                </h2>

                {/* Organization Name */}
                <CustomFormField
                  name="providerProfile.organizationName"
                  label={`${t('organizationName')} *`}
                  type="text"
                  placeholder="Enter organization name"
                  isBorder={true}
                />

                {/* Organization Type & Country */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <CustomFormField
                    name="providerProfile.organizationType"
                    label={`${t('organizationType')} *`}
                    type="select"
                    placeholder="Select organization type"
                    options={ORGANIZATION_TYPES}
                    initialValue={profileData?.providerProfile?.organizationType}
                    isBorder={true}
                  />

                  <CustomFormField
                    name="providerProfile.country"
                    label={`${t('country')} *`}
                    type="select"
                    placeholder="Select country"
                    options={COUNTRIES}
                    initialValue={profileData?.providerProfile?.country}
                    isBorder={true}
                  />
                </div>

                {/* Year Established */}
                <CustomFormField
                  name="providerProfile.yearEstablished"
                  label={`${t('yearEstablished')} *`}
                  type="number"
                  placeholder="Enter year established"
                  isBorder={true}
                />

                {/* Address Summary */}
                <CustomFormField
                  name="providerProfile.addressSummary"
                  label={`${t('addressSummary')} *`}
                  type="text"
                  placeholder="Enter address"
                  isBorder={true}
                />

                {/* Description */}
                <CustomFormField
                  name="providerProfile.description"
                  label={`${t('description')} *`}
                  type="textarea"
                  placeholder="Enter organization description"
                  isBorder={true}
                />

                {/* Accreditation */}
                <CustomFormField
                  name="providerProfile.accreditation"
                  label={`${t('accreditation')} *`}
                  type="text"
                  placeholder="Enter accreditation details"
                  isBorder={true}
                />

                {/* Specialization */}
                <CustomFormField
                  name="providerProfile.specialization"
                  label={`${t('specialization')} *`}
                  type="text"
                  placeholder="Enter specialization areas"
                  isBorder={true}
                />

                <h2 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
                  <Mail className="w-6 h-6" />
                  {t('contactInformation')}
                </h2>

                {/* Email & Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <CustomFormField
                    name="providerProfile.email"
                    label={`${t('email')} *`}
                    type="email"
                    disabled
                    placeholder="Enter email address"
                    isBorder={true}
                  />

                  <CustomFormField
                    name="providerProfile.phone"
                    label={`${t('phone')} *`}
                    type="text"
                    placeholder="Enter phone number"
                    isBorder={true}
                  />
                </div>

                {/* Website */}
                <CustomFormField
                  name="providerProfile.website"
                  label={`${t('website')} *`}
                  type="text"
                  placeholder="https://example.com"
                  isBorder={true}
                />
              </div>

              {/* Contact Information */}
              <div className="space-y-6 ">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-semibold text-gray-900">{t('contactPersons')}</h2>
                  <Button
                    type="button"
                    onClick={handleAddContact}
                    className="bg-[#3D6CB9] hover:bg-[#2F5A9E] text-white"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    {t('addContact')}
                  </Button>
                </div>

                {currentData.providerContactDtos?.map((contact, index) => (
                  <div key={index} className="border-2 border-gray-200 rounded-lg p-6 space-y-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {t('contactPersons')} {index + 1}
                      </h3>

                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => handleRemoveContact(index)}
                        className="p-2 h-full w-fit text-red-500 hover:text-red-700 hover:bg-red-50 border-red-500"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Contact Name & Role Title */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <CustomFormField
                        name={`providerProfile.providerContactDtos.${index}.contactName`}
                        label={`${t('contactName')} *`}
                        type="text"
                        placeholder="Enter contact name"
                        isBorder={true}
                      />

                      <CustomFormField
                        name={`providerProfile.providerContactDtos.${index}.roleTitle`}
                        label={`${t('roleTitle')} *`}
                        type="text"
                        placeholder="Enter role title"
                        isBorder={true}
                      />
                    </div>

                    {/* Email & Phone */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <CustomFormField
                        name={`providerProfile.providerContactDtos.${index}.email`}
                        label={`${t('email')} *`}
                        type="email"
                        placeholder="Enter email"
                        isBorder={true}
                      />

                      <CustomFormField
                        name={`providerProfile.providerContactDtos.${index}.phone`}
                        label={`${t('phone')} *`}
                        type="text"
                        placeholder="Enter phone"
                        isBorder={true}
                      />
                    </div>

                    {/* LinkedIn URL */}
                    <CustomFormField
                      name={`providerProfile.providerContactDtos.${index}.linkedinUrl`}
                      label={`${t('linkedinUrl')} *`}
                      type="text"
                      placeholder="https://linkedin.com/in/username"
                      isBorder={true}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <Button
                type="submit"
                disabled={isLoadingUpdateProfile}
                className="w-full bg-[#3D6CB9] hover:bg-[#2F5A9E] text-white py-3 text-base font-semibold"
              >
                {isLoadingUpdateProfile ? t('saving') : t('submit')}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
