import { Button } from '@/pattern/cus/button';
import { CustomFormField } from '@/pattern/cus/CustomFormField';
import { IApplicantProfile } from '@/lib/schemas';
import Header from '@/pattern/share/Header';
import { Plus, Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

const Preferences = () => {
  const t = useTranslations('applicantProfile.preferencesDialog');
  const tCommon = useTranslations('applicantProfile.common');

  const { control, watch } = useFormContext<IApplicantProfile>();

  const PREFERENCE_TYPES = [
    { value: 'Location', label: t('location') },
    { value: 'Institution Size', label: t('institutionSize') },
    { value: 'Major Focus', label: t('majorFocus') },
    { value: 'Campus Culture', label: t('campusCulture') },
    { value: 'Career Services', label: t('careerServices') },
    { value: 'Research Opportunities', label: t('researchOpportunities') },
    { value: 'Cost', label: t('cost') },
    { value: 'Financial Aid', label: t('financialAid') },
    { value: 'Diversity', label: t('diversity') },
    { value: 'Athletics', label: t('athletics') },
    { value: 'Other', label: t('other') },
  ];

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'applicantProfile.applicantPreferences',
  });

  const handleAddPreference = () => {
    append({
      type: '',
      field: '',
      weight: 0,
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
            onClick={handleAddPreference}
            className="flex items-center gap-2 text-primary-brand border-primary-brand hover:bg-primary-brand hover:text-white"
          >
            <Plus className="h-4 w-4" />
            {tCommon('add')}
          </Button>
        }
      />

      {/* Preferences List */}
      <div className="space-y-4">
        {fields.map((field, index) => {
          return (
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
                  name={`applicantProfile.applicantPreferences.${index}.type`}
                  label={t('preferenceType')}
                  type="select"
                  placeholder={t('selectType')}
                  options={PREFERENCE_TYPES}
                  inlineLabel
                  isBorder
                  className="md:col-span-5"
                />

                <CustomFormField
                  name={`applicantProfile.applicantPreferences.${index}.value`}
                  label={t('preferenceValue')}
                  placeholder={t('preferenceValuePlaceholder')}
                  inlineLabel
                  isBorder
                  className="md:col-span-4"
                />

                <div className="flex items-center gap-2 md:col-span-1">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => remove(index)}
                    className="p-2 h-full w-full text-red-500 hover:text-red-700 hover:bg-red-50 md:col-span-1 border-red-500"
                    title={t('deletePreference')}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                {/* Weight Slider */}
                <CustomFormField
                  name={`applicantProfile.applicantPreferences.${index}.weight`}
                  label={t('weight')}
                  type="range"
                  placeholder="Enter weight (0-1)"
                  min={0}
                  max={1}
                  step={0.1}
                  className="md:col-span-5 "
                />

                {/* Note */}
                <CustomFormField
                  name={`applicantProfile.applicantPreferences.${index}.note`}
                  label={t('noteOptional')}
                  type="textarea"
                  placeholder={t('notePlaceholder')}
                  inlineLabel
                  isBorder
                  className="md:col-span-5"
                />
              </div>
            </div>
          );
        })}

        {fields.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p>{t('noPreferencesAddedYet')}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Preferences;
