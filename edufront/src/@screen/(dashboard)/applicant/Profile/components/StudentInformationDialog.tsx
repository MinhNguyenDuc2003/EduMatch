'use client';

import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/lib/cus/dialog';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from '@/lib/cus/drawer';
import { Button } from '@/lib/cus/button';
import { CustomFormField } from '@/lib/cus/CustomFormField';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import religions from '@/constants/religions.json';
import ethnicities from '@/constants/ethnicities.json';
import races from '@/constants/races.json';
import citizenshipStatus from '@/constants/citizenshipStatus.json';
import { IApplicantProfile } from '@/lib/schemas';
import { COUNTRIES } from '@/constants/Common';

interface StudentInformationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: IApplicantProfile) => void;
  onCancel: () => void;
}

const StudentInformationDialog: React.FC<StudentInformationDialogProps> = ({
  open,
  onOpenChange,
  onSubmit,
  onCancel,
}) => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const { handleSubmit } = useFormContext<IApplicantProfile>();
  const t = useTranslations('homepage.applicantProfile.studentInformationDialog');
  const tFields = useTranslations('homepage.applicantProfile.fields');
  const tCommon = useTranslations('homepage.applicantProfile.common');

  const handleFormSubmit = (data: IApplicantProfile) => {
    onSubmit(data);
    onOpenChange(false);
  };

  const handleCancel = () => {
    onCancel();
    onOpenChange(false);
  };

  const Content = () => (
    <div className="space-y-6">
      {/* Personal Section */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('title')}</h3>
          <p className="text-sm text-gray-600 mb-4">{t('description')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full Name */}
          <CustomFormField
            name="applicantProfile.firstName"
            label={tFields('firstName')}
            placeholder={tFields('firstName')}
            inlineLabel
            isBorder
          />

          <CustomFormField
            name="applicantProfile.lastName"
            label={tFields('lastName')}
            placeholder={tFields('lastName')}
            inlineLabel
            isBorder
          />

          <CustomFormField
            name="applicantProfile.contactName"
            label={tFields('contactName')}
            placeholder={tCommon('addInfo')}
            inlineLabel
            isBorder
          />

          <CustomFormField
            name="applicantProfile.phoneNumber"
            label={tFields('phoneNumber')}
            placeholder="+1 234 567 8900"
            inlineLabel
            isBorder
          />

          <CustomFormField
            name="applicantProfile.religion"
            label={tFields('religion')}
            type="select"
            placeholder={t('selectReligion')}
            options={religions}
            inlineLabel
            isBorder
          />

          <CustomFormField
            name="applicantProfile.overallGpa"
            label={tFields('overallGpa')}
            type="number"
            placeholder="3.8"
            inlineLabel
            isBorder
          />

          <CustomFormField
            name="applicantProfile.ethnicity"
            label={tFields('ethnicity')}
            type="select"
            placeholder={t('selectEthnicity')}
            options={ethnicities}
            inlineLabel
            isBorder
          />

          <CustomFormField
            name="applicantProfile.race"
            label={tFields('race')}
            type="select"
            placeholder={t('selectRace')}
            options={races}
            inlineLabel
            isBorder
          />

          <CustomFormField
            name="applicantProfile.hometown"
            label={tFields('hometown')}
            placeholder={tCommon('addInfo')}
            type="input-select"
            options={COUNTRIES}
            inlineLabel
            isBorder
          />

          <CustomFormField
            name="applicantProfile.citizenshipStatus"
            label={tFields('citizenshipStatus')}
            type="select"
            placeholder={t('selectCitizenshipStatus')}
            options={citizenshipStatus}
            inlineLabel
            isBorder
          />

          <CustomFormField
            name="applicantProfile.disabilities"
            label={tFields('disabilities')}
            placeholder={tCommon('addInfo')}
            inlineLabel
            isBorder
          />

          <CustomFormField
            name="applicantProfile.medicalConditions"
            label={tFields('medicalConditions')}
            placeholder={tCommon('addInfo')}
            inlineLabel
            isBorder
          />
          <CustomFormField
            name="applicantProfile.militaryFamilyHistory"
            label={tFields('militaryFamilyHistory')}
            type="switch"
            className="mb-4 "
            inlineLabel
            isBorder
          />
        </div>
      </div>

      {/* Footer */}
      <div className="border-t pt-6">
        <p className="text-sm text-gray-600 mb-4">{tCommon('confirmAccuracy')}</p>
      </div>
    </div>
  );

  const Footer = () => (
    <div className="flex flex-col sm:flex-row gap-2 sm:justify-end">
      <Button
        variant="outline"
        onClick={handleCancel}
        className="w-full sm:w-auto text-primary-brand px-10 py-2.5"
      >
        {tCommon('cancel')}
      </Button>
      <Button
        type="submit"
        className="w-full sm:w-auto px-10 py-2.5"
        onClick={handleSubmit(handleFormSubmit)}
      >
        {tCommon('save')}
      </Button>
    </div>
  );

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={handleCancel}>
        <DrawerContent className="min-h-[95vh]">
          <DrawerHeader className="border-b">
            <DrawerTitle className="text-xl font-semibold text-primary-brand">
              {t('title')}
            </DrawerTitle>
            <DrawerDescription className="sr-only" />
          </DrawerHeader>
          <div className="flex-1 overflow-y-auto p-6">
            <Content />
            <Footer />
          </div>
          {/* <DrawerFooter className="border-t"></DrawerFooter> */}
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={handleCancel}>
      <DialogContent className="lg:min-w-6xl md:min-w-4xl min-w-2xl max-h-[90vh] flex flex-col gap-2.5 overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-primary-brand">{t('title')}</DialogTitle>
          <DialogDescription className="sr-only" />
        </DialogHeader>
        <div className="flex-1 overflow-y-auto border-t p-2.5 border-[#828282]">
          <Content />
        </div>
        <DialogFooter>
          <Footer />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default StudentInformationDialog;
