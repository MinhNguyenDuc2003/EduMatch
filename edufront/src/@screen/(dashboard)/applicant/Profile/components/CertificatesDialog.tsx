'use client';

import React from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
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
import { Plus, Trash2, Award } from 'lucide-react';
import { IApplicantProfile } from '@/lib/schemas';

interface CertificatesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: IApplicantProfile) => void;
  onCancel: () => void;
}

const CertificatesDialog = ({
  open,
  onOpenChange,
  onSubmit,
  onCancel,
}: CertificatesDialogProps) => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const { handleSubmit, control, watch } = useFormContext<IApplicantProfile>();
  const t = useTranslations('homepage.applicantProfile.certificatesDialog');
  const tCommon = useTranslations('homepage.applicantProfile.common');

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'applicantProfile.certificates',
  });

  const handleFormSubmit = (data: IApplicantProfile) => {
    onSubmit(data);
    onOpenChange(false);
  };

  const handleCancel = () => {
    onCancel();
    onOpenChange(false);
  };

  const handleAddCertificate = () => {
    append({
      certificateName: '',
      issuedBy: '',
      issueDate: '',
      expiryDate: '',
      score: '',
    });
  };

  const Content = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-5">
        <div className="">
          <h3 className="text-lg font-semibold text-gray-900">{t('description')}</h3>
          <p className="text-sm text-gray-600">{t('subDescription')}</p>
        </div>
        <Button
          type="button"
          variant="outline"
          onClick={handleAddCertificate}
          className="flex items-center gap-2 text-primary-brand border-primary-brand hover:bg-primary-brand hover:text-white"
        >
          <Plus className="h-4 w-4" />
          {tCommon('add')}
        </Button>
      </div>

      <div className="space-y-4">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="flex justify-center items-center border border-gray-200 rounded-lg p-4 space-y-4 gap-5"
          >
            <div className="flex items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-sm font-medium text-gray-600 border border-gray-700">
                {index + 1}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-10 gap-4 flex-1">
              <CustomFormField
                name={`applicantProfile.certificates.${index}.certificateName`}
                label={t('certificateName')}
                placeholder={t('enterCertificateName')}
                inlineLabel
                isBorder
                className="md:col-span-6"
              />

              <CustomFormField
                name={`applicantProfile.certificates.${index}.issuedBy`}
                label={t('issuedBy')}
                placeholder={t('issuingOrganization')}
                inlineLabel
                isBorder
                className="md:col-span-4"
              />

              <CustomFormField
                name={`applicantProfile.certificates.${index}.issueDate`}
                label={t('issueDate')}
                type="date"
                inlineLabel
                isBorder
                className="md:col-span-3"
              />

              <CustomFormField
                name={`applicantProfile.certificates.${index}.expiryDate`}
                label={t('expiryDate')}
                type="date"
                inlineLabel
                isBorder
                className="md:col-span-3"
              />

              <CustomFormField
                name={`applicantProfile.certificates.${index}.score`}
                label={t('score')}
                placeholder={t('scorePlaceholder')}
                inlineLabel
                isBorder
                className="md:col-span-3"
              />

              <div className="flex items-center gap-2 md:col-span-1">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => remove(index)}
                  className="p-2 h-full w-full text-red-500 hover:text-red-700 hover:bg-red-50 md:col-span-1 border-red-500"
                  title={t('deleteCertificate')}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}

        {fields.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p>{t('noCertificatesAddedYet')}</p>
          </div>
        )}
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

export default CertificatesDialog;
