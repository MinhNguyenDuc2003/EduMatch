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
import {
  FAVORITE_ACTIVITIES,
  SPORTS_PARTICIPATED,
  STUDENT_ACTIVITIES,
  ORGANIZATIONS_JOINED,
  RESEARCH_EXPERIENCE,
  CAREER_GOALS,
} from '@/@screen/(dashboard)/applicant/Profile/constants';
import { IApplicantProfile } from '@/lib/schemas';

interface ActivitiesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: IApplicantProfile) => void;
  onCancel: () => void;
}

const ActivitiesDialog = ({ open, onOpenChange, onSubmit, onCancel }: ActivitiesDialogProps) => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const { handleSubmit } = useFormContext<IApplicantProfile>();
  const t = useTranslations('applicantProfile.activitiesDialog');
  const tCommon = useTranslations('applicantProfile.common');

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
      <div>
        <h3 className="text-lg font-semibold text-gray-900">{t('title')}</h3>
        <p className="text-sm text-gray-600">{t('description')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CustomFormField
          name="applicantProfile.favoriteActivities"
          label={t('favoriteActivities')}
          type="multi-select"
          placeholder={t('favoriteActivitiesPlaceholder')}
          options={FAVORITE_ACTIVITIES}
          labelClassName="w-40"
          inlineLabel
          isBorder
        />

        <CustomFormField
          name="applicantProfile.sportsParticipated"
          label={t('sportsParticipated')}
          type="multi-select"
          placeholder={t('sportsParticipatedPlaceholder')}
          options={SPORTS_PARTICIPATED}
          inlineLabel
          isBorder
        />

        <CustomFormField
          name="applicantProfile.studentActivities"
          label={t('studentActivities')}
          type="multi-select"
          placeholder={t('studentActivitiesPlaceholder')}
          options={STUDENT_ACTIVITIES}
          inlineLabel
          isBorder
        />

        <CustomFormField
          name="applicantProfile.organizationsJoined"
          label={t('organizationsJoined')}
          type="multi-select"
          placeholder={t('organizationsJoinedPlaceholder')}
          options={ORGANIZATIONS_JOINED}
          inlineLabel
          isBorder
        />

        <CustomFormField
          name="applicantProfile.researchExperience"
          label={t('researchExperience')}
          type="multi-select"
          placeholder={t('researchExperiencePlaceholder')}
          options={RESEARCH_EXPERIENCE}
          inlineLabel
          isBorder
        />

        <CustomFormField
          name="applicantProfile.careerGoals"
          label={t('careerGoals')}
          type="multi-select"
          placeholder={t('careerGoalsPlaceholder')}
          options={CAREER_GOALS}
          inlineLabel
          isBorder
        />
      </div>

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

export default ActivitiesDialog;
