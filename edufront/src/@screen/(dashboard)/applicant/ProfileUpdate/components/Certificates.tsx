import { Button } from '@/lib/cus/button';
import { CustomFormField } from '@/lib/cus/CustomFormField';
import { IApplicantProfile } from '@/lib/schemas';
import Header from '@/pattern/share/Header';
import { Plus, Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

const Certificates = () => {
  const t = useTranslations('homepage.applicantProfile.certificatesDialog');
  const tCommon = useTranslations('homepage.applicantProfile.common');
  const { handleSubmit, control } = useFormContext<IApplicantProfile>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'applicantProfile.certificates',
  });

  const handleAddCertificate = () => {
    append({
      certificateName: '',
      issuedBy: '',
      issueDate: '',
      expiryDate: '',
      score: '',
    });
  };

  return (
    <div className="space-y-4">
      <Header
        subtitle={t('description')}
        title={t('title')}
        rightElement={
          <Button
            type="button"
            variant="outline"
            onClick={handleAddCertificate}
            className="flex items-center gap-2 text-primary-brand border-primary-brand hover:bg-primary-brand hover:text-white"
          >
            <Plus className="h-4 w-4" />
            {tCommon('add')}
          </Button>
        }
      />
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
    </div>
  );
};

export default Certificates;
