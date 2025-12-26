'use client';

import { ProfileHeader } from '@/@screen/(dashboard)/provider/ProviderProfile/components';
import { COUNTRIES, ORGANIZATION_TYPES } from '@/constants/Common';
import { DEFAULT_PROVIDER_FORM_VALUES } from '@/constants/DefaultValues';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/pattern/cus/button';
import { CustomFormField } from '@/pattern/cus/CustomFormField';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/pattern/cus/dialog';
import { Form } from '@/pattern/cus/form';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/pattern/cus/input-otp';
import { IProviderProfile, providerProfileSchema } from '@/lib/schemas';
import Loading from '@/pattern/share/Loading';
import {
  useCreateProfileMutation,
  useLazySendVerificationEmailQuery,
  useLazyVerifyProvidersEmailCodeQuery,
} from '@/state/apiProvider';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, Plus, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';

const CreateProviderProfilePage = () => {
  const { isAuthenticated, isProvider, isLoading, subscriptions, refetch: refetchAuth } = useAuth();
  const router = useRouter();
  const t = useTranslations('providerProfile');

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push('/home');
      }
      if (
        isProvider &&
        !subscriptions.some((subscription) => subscription.userType === 'PROVIDER')
      ) {
        router.push('/subscriptions?type=PROVIDER');
      }
      if (
        isProvider &&
        subscriptions.some((subscription) => subscription.userType === 'PROVIDER')
      ) {
        router.push('/provider/dashboard');
      }
    }
  }, [isLoading, isAuthenticated, isProvider, router, subscriptions]);

  // For now, use mock data. Replace with API call later
  const [bannerUrl, setBannerUrl] = useState<File | null>(null);
  const [profileUrl, setProfileUrl] = useState<File | null>(null);

  // Email verification states
  const [emailVerified, setEmailVerified] = useState(false);
  const [showVerificationDialog, setShowVerificationDialog] = useState(false);
  const [otpValue, setOtpValue] = useState('');
  const [verificationEmail, setVerificationEmail] = useState('');

  const [createProfile, { isLoading: isLoadingCreateProfile }] = useCreateProfileMutation();
  const [sendVerificationEmail, { isLoading: isLoadingSendVerificationEmail }] =
    useLazySendVerificationEmailQuery();
  const [verifyProvidersEmailCode, { isLoading: isLoadingVerifyProvidersEmailCode }] =
    useLazyVerifyProvidersEmailCodeQuery();

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
    methods.reset(DEFAULT_PROVIDER_FORM_VALUES);
  }, [methods]);

  // Reset email verification when email changes
  useEffect(() => {
    if (currentData.email && currentData.email !== verificationEmail) {
      setEmailVerified(false);
      setShowVerificationDialog(false);
      setOtpValue('');
    }
  }, [currentData.email, verificationEmail]);

  // Handle email verification
  const handleSendVerificationEmail = async () => {
    const email = currentData.email;
    if (!email) {
      toast.error(t('pleaseEnterEmailFirst'));
      return;
    }

    try {
      setVerificationEmail(email);
      await sendVerificationEmail({ email }).unwrap();
      setShowVerificationDialog(true);
      toast.success(t('otpSentSuccessfully'));
    } catch (error: any) {
      console.error('Error sending verification email:', error);
      toast.error(error?.data?.message || t('failedToSendOtp'));
    }
  };

  const handleVerifyOTP = async (code?: string) => {
    const otpCode = code || otpValue;
    if (otpCode.length !== 6) {
      toast.error(t('pleaseEnterSixDigits'));
      return;
    }

    try {
      await verifyProvidersEmailCode({ code: otpCode })
        .unwrap()
        .then((response) => {
          if (response) {
            setEmailVerified(true);
            setShowVerificationDialog(false);
            setOtpValue('');
            toast.success(t('emailVerifiedSuccessfully'));
          } else {
            toast.error(t('invalidOtp'));
            setOtpValue('');
          }
        });
    } catch (error: any) {
      console.error('Error verifying OTP:', error);
      toast.error(error?.data?.message || t('invalidOtp'));
      setOtpValue('');
    }
  };

  // Handle OTP input change
  const handleOTPChange = (value: string) => {
    setOtpValue(value);
    // Auto verify when 6 digits are entered
    if (value.length === 6 && showVerificationDialog && !isLoadingVerifyProvidersEmailCode) {
      setTimeout(() => {
        handleVerifyOTP(value);
      }, 100);
    }
  };

  const onSubmit = async (data: IProviderProfile) => {
    // Check if email is verified
    if (!emailVerified) {
      // Open verification dialog if email is filled
      handleSendVerificationEmail();
      return;
    }

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

      await createProfile(formData)
        .unwrap()
        .then(() => {
          router.push('/subscriptions?type=PROVIDER');
          refetchAuth();
        });
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

  if (isLoading) {
    return <Loading />;
  }

  if (!isAuthenticated || isProvider) {
    return <Loading />;
  }

  return (
    <div className="mx-auto px-4 lg:px-40 py-6 bg-white space-y-6">
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
                  {t('organizationInformation')}
                </h2>

                {/* Organization Name */}
                <CustomFormField
                  name="providerProfile.organizationName"
                  label={`${t('organizationName')} *`}
                  type="text"
                  placeholder={t('enterOrganizationName')}
                  isBorder={true}
                />

                {/* Organization Type & Country */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <CustomFormField
                    name="providerProfile.organizationType"
                    label={`${t('organizationType')} *`}
                    type="select"
                    placeholder={t('selectOrganizationType')}
                    options={ORGANIZATION_TYPES}
                    isBorder={true}
                  />

                  <CustomFormField
                    name="providerProfile.country"
                    label={`${t('country')} *`}
                    type="select"
                    placeholder={t('selectCountry')}
                    options={COUNTRIES}
                    isBorder={true}
                  />
                </div>

                {/* Year Established */}
                <CustomFormField
                  name="providerProfile.yearEstablished"
                  label={t('yearEstablished')}
                  type="number"
                  placeholder={t('enterYearEstablished')}
                  isBorder={true}
                />

                {/* Address Summary */}
                <CustomFormField
                  name="providerProfile.addressSummary"
                  label={t('addressSummary')}
                  type="text"
                  placeholder={t('enterAddress')}
                  isBorder={true}
                />

                {/* Description */}
                <CustomFormField
                  name="providerProfile.description"
                  label={t('description')}
                  type="textarea"
                  placeholder={t('enterOrganizationDescription')}
                  isBorder={true}
                />

                {/* Accreditation */}
                <CustomFormField
                  name="providerProfile.accreditation"
                  label={t('accreditation')}
                  type="text"
                  placeholder={t('enterAccreditationDetails')}
                  isBorder={true}
                />

                {/* Specialization */}
                <CustomFormField
                  name="providerProfile.specialization"
                  label={t('specialization')}
                  type="text"
                  placeholder={t('enterSpecializationAreas')}
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
                    placeholder={t('enterEmailAddress')}
                    isBorder={true}
                  />
                  <CustomFormField
                    name="providerProfile.phone"
                    label={`${t('phone')} *`}
                    type="text"
                    placeholder={t('enterPhoneNumber')}
                    isBorder={true}
                  />
                </div>

                {/* Website */}
                <CustomFormField
                  name="providerProfile.website"
                  label={t('website')}
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
                        {t('contactPerson')} {index + 1}
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
                        placeholder={t('enterContactName')}
                        isBorder={true}
                      />

                      <CustomFormField
                        name={`providerProfile.providerContactDtos.${index}.roleTitle`}
                        label={`${t('roleTitle')} *`}
                        type="text"
                        placeholder={t('enterRoleTitle')}
                        isBorder={true}
                      />
                    </div>

                    {/* Email & Phone */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <CustomFormField
                        name={`providerProfile.providerContactDtos.${index}.email`}
                        label={`${t('email')} *`}
                        type="email"
                        placeholder={t('enterEmail')}
                        isBorder={true}
                      />

                      <CustomFormField
                        name={`providerProfile.providerContactDtos.${index}.phone`}
                        label={`${t('phone')} *`}
                        type="text"
                        placeholder={t('enterPhone')}
                        isBorder={true}
                      />
                    </div>

                    {/* LinkedIn URL */}
                    <CustomFormField
                      name={`providerProfile.providerContactDtos.${index}.linkedinUrl`}
                      label={t('linkedinUrl')}
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
                disabled={
                  isLoadingCreateProfile ||
                  isLoadingSendVerificationEmail ||
                  isLoadingVerifyProvidersEmailCode
                }
                className="w-full bg-[#3D6CB9] hover:bg-[#2F5A9E] text-white py-3 text-base font-semibold disabled:opacity-50"
              >
                {isLoadingCreateProfile
                  ? t('saving')
                  : emailVerified
                    ? t('submit')
                    : t('pleaseVerifyEmailFirst')}
              </Button>
            </div>
          </form>
        </Form>
      </div>

      {/* Email Verification Dialog */}
      <Dialog open={showVerificationDialog} onOpenChange={setShowVerificationDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{t('emailVerification')}</DialogTitle>
            <DialogDescription>
              {t('otpInstructions')} <strong>{verificationEmail}</strong>
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex justify-center">
              <InputOTP maxLength={6} value={otpValue} onChange={handleOTPChange}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>
            <div className="flex gap-2 justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setShowVerificationDialog(false);
                  setOtpValue('');
                }}
                className="text-black"
              >
                {t('cancel')}
              </Button>
              <Button
                type="button"
                onClick={() => handleVerifyOTP()}
                disabled={otpValue.length !== 6 || isLoadingVerifyProvidersEmailCode}
                className="bg-[#3D6CB9] hover:bg-[#2F5A9E] text-white"
              >
                {isLoadingVerifyProvidersEmailCode ? t('verifying') : t('verify')}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateProviderProfilePage;
