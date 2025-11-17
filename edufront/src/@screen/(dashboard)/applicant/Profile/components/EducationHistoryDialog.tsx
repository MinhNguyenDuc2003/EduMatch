'use client';

import React, { useState } from 'react';
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
import { Plus, Trash2, Calendar, GraduationCap } from 'lucide-react';
import { useFieldArray } from 'react-hook-form';
import { INSTITUTION_TYPES } from '../constants';
import { IApplicantProfile } from '@/lib/schemas';
import { MAJOR_CATEGORIES, MAJOR_NAMES, STUDY_LEVELS } from '@/constants/Common';

interface EducationHistoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: IApplicantProfile) => void;
  onCancel: () => void;
}

const EducationHistoryDialog = ({
  open,
  onOpenChange,
  onSubmit,
  onCancel,
}: EducationHistoryDialogProps) => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const { handleSubmit, control, watch } = useFormContext<IApplicantProfile>();
  const t = useTranslations('homepage.applicantProfile.educationHistoryDialog');
  const tCommon = useTranslations('homepage.applicantProfile.common');

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'applicantProfile.educationHistories',
  });

  const handleFormSubmit = (data: IApplicantProfile) => {
    onSubmit(data);
    onOpenChange(false);
  };

  const handleCancel = () => {
    onCancel();
    onOpenChange(false);
  };

  const handleAddEducation = () => {
    append({
      institutionName: '',
      institutionType: '',
      state: '',
      country: '',
      degreeType: '',
      majorCategory: '',
      majorName: '',
      gpa: 0,
      classRank: '',
      classSize: 0,
      enrollmentStartDate: '',
      enrollmentEndDate: '',
      graduationYear: 0,
      isDualEnrolled: false,
      isTransfer: false,
      isReturningStudent: false,
      notes: '',
    });
  };

  const Content = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-5">
        <div className="">
          <h3 className="text-lg font-semibold text-gray-900">{t('description')}</h3>
          <p className="text-sm text-gray-600">{t('subDescription')}</p>
        </div>
        <Button
          type="button"
          variant="outline"
          onClick={handleAddEducation}
          className="flex items-center gap-2 text-primary-brand border-primary-brand hover:bg-primary-brand hover:text-white"
        >
          <Plus className="h-4 w-4" />
          {t('addEducation')}
        </Button>
      </div>

      {/* Education History List */}
      <div className="space-y-6">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="border border-gray-200 rounded-lg p-6 space-y-6 bg-gray-50"
          >
            {/* Education Header */}
            <div className="flex items-center justify-between border-b pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary-brand/10 flex items-center justify-center">
                  <GraduationCap className="h-5 w-5 text-primary-brand" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">
                    {t('educationNumber', { number: index + 1 })}
                  </h4>
                  <p className="text-sm text-gray-600">{t('academicInstitution')}</p>
                </div>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => remove(index)}
                className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 border-red-500"
                title={t('deleteEducation')}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            {/* Institution Information */}
            <div className="space-y-4">
              <h5 className="font-medium text-gray-900 flex items-center gap-2">
                <GraduationCap className="h-4 w-4" />
                {t('institutionInformation')}
              </h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <CustomFormField
                  name={`applicantProfile.educationHistories.${index}.institutionName`}
                  label={t('institutionName')}
                  placeholder={t('enterInstitutionName')}
                  inlineLabel
                  isBorder
                />

                <CustomFormField
                  name={`applicantProfile.educationHistories.${index}.institutionType`}
                  label={t('institutionType')}
                  type="select"
                  placeholder={t('selectInstitutionType')}
                  options={INSTITUTION_TYPES}
                  inlineLabel
                  isBorder
                />

                <CustomFormField
                  name={`applicantProfile.educationHistories.${index}.state`}
                  label={t('stateProvince')}
                  placeholder={t('enterStateProvince')}
                  inlineLabel
                  isBorder
                />

                <CustomFormField
                  name={`applicantProfile.educationHistories.${index}.country`}
                  label={t('country')}
                  placeholder={t('enterCountry')}
                  inlineLabel
                  isBorder
                />
              </div>
            </div>

            {/* Academic Information */}
            <div className="space-y-4">
              <h5 className="font-medium text-gray-900 flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {t('academicInformation')}
              </h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <CustomFormField
                  name={`applicantProfile.educationHistories.${index}.degreeType`}
                  label={t('degreeType')}
                  type="select"
                  placeholder={t('selectDegreeType')}
                  options={STUDY_LEVELS}
                  inlineLabel
                  isBorder
                />

                <CustomFormField
                  name={`applicantProfile.educationHistories.${index}.majorCategory`}
                  label={t('majorCategory')}
                  type="input-select"
                  placeholder={t('selectMajorCategory')}
                  options={MAJOR_CATEGORIES}
                  inlineLabel
                  isBorder
                />

                <CustomFormField
                  name={`applicantProfile.educationHistories.${index}.majorName`}
                  label={t('majorName')}
                  type="input-select"
                  placeholder={t('selectMajorName')}
                  options={MAJOR_NAMES}
                  inlineLabel
                  isBorder
                />

                <CustomFormField
                  name={`applicantProfile.educationHistories.${index}.gpa`}
                  label={t('gpa')}
                  type="number"
                  placeholder="3.8"
                  inlineLabel
                  isBorder
                />

                <CustomFormField
                  name={`applicantProfile.educationHistories.${index}.classRank`}
                  label={t('classRank')}
                  placeholder={t('classRankPlaceholder')}
                  inlineLabel
                  isBorder
                />

                <CustomFormField
                  name={`applicantProfile.educationHistories.${index}.classSize`}
                  label={t('classSize')}
                  type="number"
                  placeholder="200"
                  inlineLabel
                  isBorder
                />
              </div>
            </div>

            {/* Dates */}
            <div className="space-y-4">
              <h5 className="font-medium text-gray-900 flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {t('enrollmentDates')}
              </h5>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <CustomFormField
                  name={`applicantProfile.educationHistories.${index}.enrollmentStartDate`}
                  label={t('startDate')}
                  type="date"
                  inlineLabel
                  isBorder
                />

                <CustomFormField
                  name={`applicantProfile.educationHistories.${index}.enrollmentEndDate`}
                  label={t('endDate')}
                  type="date"
                  inlineLabel
                  isBorder
                />

                <CustomFormField
                  name={`applicantProfile.educationHistories.${index}.graduationYear`}
                  label={t('graduationYear')}
                  type="number"
                  placeholder={t('enterGraduationYear')}
                  inlineLabel
                  isBorder
                />
              </div>
            </div>

            {/* Additional Information */}
            <div className="space-y-4">
              <h5 className="font-medium text-gray-900">{t('additionalInformation')}</h5>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <CustomFormField
                  name={`applicantProfile.educationHistories.${index}.isDualEnrolled`}
                  label={t('dualEnrolled')}
                  type="switch"
                  inlineLabel
                  isBorder
                />

                <CustomFormField
                  name={`applicantProfile.educationHistories.${index}.isTransfer`}
                  label={t('transferStudent')}
                  type="switch"
                  inlineLabel
                  isBorder
                />

                <CustomFormField
                  name={`applicantProfile.educationHistories.${index}.isReturningStudent`}
                  label={t('returningStudent')}
                  type="switch"
                  inlineLabel
                  isBorder
                />
              </div>

              <CustomFormField
                name={`applicantProfile.educationHistories.${index}.notes`}
                label={t('notes')}
                type="textarea"
                placeholder={t('notesPlaceholder')}
                inlineLabel
                isBorder
                className="md:col-span-2"
              />
            </div>
          </div>
        ))}

        {fields.length === 0 && (
          <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
            <GraduationCap className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <p className="text-lg font-medium mb-2">{t('noEducationHistoryAddedYet')}</p>
            <p className="text-sm mb-4">{t('clickAddEducation')}</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-t pt-6">
        <p className="text-sm text-gray-600 mb-4">{t('confirmEducationAccuracy')}</p>
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
            <DrawerTitle className="text-xl font-semibold text-primary-brand">{t('title')}</DrawerTitle>
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

export default EducationHistoryDialog;
