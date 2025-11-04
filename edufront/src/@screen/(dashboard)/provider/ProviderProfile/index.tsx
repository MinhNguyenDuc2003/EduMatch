'use client';

import React, { useEffect, useState } from 'react';
import { Form } from '@/lib/cus/form';
import { providerProfileSchema, IProviderProfile } from '@/lib/schemas';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { DEFAULT_PROVIDER_FORM_VALUES, ORGANIZATION_TYPES } from './constants';
import { Mail, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/lib/cus/button';
import { CustomFormField } from '@/lib/cus/CustomFormField';
import ProfileHeader from './components/ProfileHeader';
import { ProviderProfileSkeleton } from './components';
import {
  useCreateProfileMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
} from '@/state/apiProvider';
import { COUNTRIES } from '@/constants/Common';

export default function ProviderProfile() {
  // For now, use mock data. Replace with API call later
  const [bannerUrl, setBannerUrl] = useState<File | null>(null);
  const [profileUrl, setProfileUrl] = useState<File | null>(null);

  const { data: profileData, isLoading: isLoadingProfile } = useGetProfileQuery();

  const [createProfile, { isLoading: isLoadingCreateProfile }] = useCreateProfileMutation();
  const [updateProfile, { isLoading: isLoadingUpdateProfile }] = useUpdateProfileMutation();

  // Form setup
  const methods = useForm<IProviderProfile>({
    reValidateMode: 'onSubmit',
    mode: 'onChange',
    resolver: zodResolver(providerProfileSchema),
    defaultValues: DEFAULT_PROVIDER_FORM_VALUES,
  });

  const { watch, setValue } = methods;
  const currentData = watch('providerProfile');

  // Handle image uploads
  const handleBannerUpload = async (file: File) => {
    try {
      console.log('Uploading banner:', file);
      // TODO: Call API to upload banner image
      setBannerUrl(file);
    } catch (error) {
      console.error('Error uploading banner:', error);
    }
  };

  const handleProfileUpload = async (file: File) => {
    try {
      console.log('Uploading profile image:', file);
      // TODO: Call API to upload profile image
      setProfileUrl(file);
    } catch (error) {
      console.error('Error uploading profile image:', error);
    }
  };

  // Reset form when profile data is loaded
  useEffect(() => {
    if (profileData) {
      const formData = {
        providerProfile: {
          ...DEFAULT_PROVIDER_FORM_VALUES.providerProfile,
          ...profileData.providerProfile,
        },
      };

      methods.reset(formData);
    }
  }, [profileData, methods]);

  const onSubmit = async (data: IProviderProfile) => {
    try {
      // TODO: Call API to update or create provider profile
      console.log('Submitting provider profile:', data);
      // await updateProviderProfile(data).unwrap();

      const formData = new FormData();
      formData.append('profile', JSON.stringify(data));
      if (bannerUrl) {
        formData.append('banner', bannerUrl);
      }
      if (profileUrl) {
        formData.append('logo', profileUrl);
      }

      if (profileData?.providerProfile) {
        await updateProfile(formData).unwrap();
      } else {
        await createProfile(formData).unwrap();
      }
    } catch (error) {
      console.error('Error updating organization info:', error);
      throw error;
    }
  };

  const handleAddContact = () => {
    const currentContacts = currentData.providerContactDtos || [];
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
  };

  const handleRemoveContact = (index: number) => {
    const currentContacts = currentData.providerContactDtos || [];
    setValue(
      'providerProfile.providerContactDtos',
      currentContacts.filter((_, i) => i !== index)
    );
  };

  if (isLoadingProfile) {
    return <ProviderProfileSkeleton />;
  }

  return (
    <div className="p-6 lg:p-8 space-y-6 bg-white">
      {/* Header Section with Profile Info Display */}
      <ProfileHeader
        currentData={currentData as ProviderProfile}
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
                  Organization Information
                </h2>

                {/* Organization Name */}
                <CustomFormField
                  name="providerProfile.organizationName"
                  label="Organization Name *"
                  type="text"
                  placeholder="Enter organization name"
                  isBorder={true}
                />

                {/* Organization Type & Country */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <CustomFormField
                    name="providerProfile.organizationType"
                    label="Organization Type *"
                    type="select"
                    placeholder="Select organization type"
                    options={ORGANIZATION_TYPES}
                    initialValue={profileData?.providerProfile?.organizationType}
                    isBorder={true}
                  />

                  <CustomFormField
                    name="providerProfile.country"
                    label="Country *"
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
                  label="Year Established"
                  type="number"
                  placeholder="Enter year established"
                  isBorder={true}
                />

                {/* Address Summary */}
                <CustomFormField
                  name="providerProfile.addressSummary"
                  label="Address Summary"
                  type="text"
                  placeholder="Enter address"
                  isBorder={true}
                />

                {/* Description */}
                <CustomFormField
                  name="providerProfile.description"
                  label="Description"
                  type="textarea"
                  placeholder="Enter organization description"
                  isBorder={true}
                />

                {/* Accreditation */}
                <CustomFormField
                  name="providerProfile.accreditation"
                  label="Accreditation"
                  type="text"
                  placeholder="Enter accreditation details"
                  isBorder={true}
                />

                {/* Specialization */}
                <CustomFormField
                  name="providerProfile.specialization"
                  label="Specialization"
                  type="text"
                  placeholder="Enter specialization areas"
                  isBorder={true}
                />

                <h2 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
                  <Mail className="w-6 h-6" />
                  Contact Information
                </h2>

                {/* Email & Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <CustomFormField
                    name="providerProfile.email"
                    label="Email *"
                    type="email"
                    placeholder="Enter email address"
                    isBorder={true}
                  />

                  <CustomFormField
                    name="providerProfile.phone"
                    label="Phone *"
                    type="text"
                    placeholder="Enter phone number"
                    isBorder={true}
                  />
                </div>

                {/* Website */}
                <CustomFormField
                  name="providerProfile.website"
                  label="Website"
                  type="text"
                  placeholder="https://example.com"
                  isBorder={true}
                />
              </div>

              {/* Contact Information */}
              <div className="space-y-6 ">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-semibold text-gray-900">Contact Persons</h2>
                  <Button
                    type="button"
                    onClick={handleAddContact}
                    className="bg-[#3D6CB9] hover:bg-[#2F5A9E] text-white"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Contact
                  </Button>
                </div>

                {currentData.providerContactDtos?.map((contact, index) => (
                  <div key={index} className="border-2 border-gray-200 rounded-lg p-6 space-y-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">
                        Contact Person {index + 1}
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
                        label="Contact Name *"
                        type="text"
                        placeholder="Enter contact name"
                        isBorder={true}
                      />

                      <CustomFormField
                        name={`providerProfile.providerContactDtos.${index}.roleTitle`}
                        label="Role Title *"
                        type="text"
                        placeholder="Enter role title"
                        isBorder={true}
                      />
                    </div>

                    {/* Email & Phone */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <CustomFormField
                        name={`providerProfile.providerContactDtos.${index}.email`}
                        label="Email *"
                        type="email"
                        placeholder="Enter email"
                        isBorder={true}
                      />

                      <CustomFormField
                        name={`providerProfile.providerContactDtos.${index}.phone`}
                        label="Phone *"
                        type="text"
                        placeholder="Enter phone"
                        isBorder={true}
                      />
                    </div>

                    {/* LinkedIn URL */}
                    <CustomFormField
                      name={`providerProfile.providerContactDtos.${index}.linkedinUrl`}
                      label="LinkedIn URL"
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
                disabled={isLoadingCreateProfile || isLoadingUpdateProfile}
                className="w-full bg-[#3D6CB9] hover:bg-[#2F5A9E] text-white py-3 text-base font-semibold"
              >
                {isLoadingCreateProfile || isLoadingUpdateProfile ? 'Saving...' : 'Submit'}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
