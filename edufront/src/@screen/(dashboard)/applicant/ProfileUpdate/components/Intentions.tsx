import { MAJOR_CATEGORIES, MAJOR_NAMES, STUDY_LEVELS } from '@/constants/Common';
import { Button } from '@/lib/cus/button';
import { CustomFormField } from '@/lib/cus/CustomFormField';
import { IApplicantProfile } from '@/lib/schemas';
import Header from '@/pattern/share/Header';
import { Calendar, GraduationCap, MapPin, Plus, Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

const Intentions = () => {
  const { control } = useFormContext<IApplicantProfile>();
  const t = useTranslations('applicantProfile.intentionsDialog');
  const tCommon = useTranslations('applicantProfile.common');

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'applicantProfile.intentions',
  });

  const handleAddIntention = () => {
    append({
      intendedInstitution: '',
      intendedState: '',
      intendedCountry: '',
      degreeType: '',
      intendedMajorCategory: '',
      intendedMajorName: '',
      academicClassification: '',
      expectedStartDate: '',
      expectedGraduationYear: 0,
      isTransferStudent: false,
      isReturningStudent: false,
      notes: '',
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
            onClick={handleAddIntention}
            className="flex items-center gap-2 text-primary-brand border-primary-brand hover:bg-primary-brand hover:text-white"
          >
            <Plus className="h-4 w-4" />
            {tCommon('add')}
          </Button>
        }
      />
      <div className="space-y-6">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="border border-gray-200 rounded-lg p-6 space-y-6 bg-gray-50"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary-brand/10 flex items-center justify-center">
                  <GraduationCap className="h-5 w-5 text-primary-brand" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">
                    {t('intentionNumber', { number: index + 1 })}
                  </h4>
                  <p className="text-sm text-gray-600">{t('plannedInstitutionProgram')}</p>
                </div>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => remove(index)}
                className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 border-red-500"
                title={t('deleteIntention')}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            {/* Institution & Location */}
            <div className="space-y-4">
              <h5 className="font-medium text-gray-900 flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                {t('institutionLocation')}
              </h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <CustomFormField
                  name={`applicantProfile.intentions.${index}.intendedInstitution`}
                  label={t('intendedInstitution')}
                  placeholder={t('enterInstitutionName')}
                  inlineLabel
                  isBorder
                />

                <CustomFormField
                  name={`applicantProfile.intentions.${index}.degreeType`}
                  label={t('degreeType')}
                  type="select"
                  placeholder={t('selectDegreeType')}
                  options={STUDY_LEVELS}
                  inlineLabel
                  isBorder
                />

                <CustomFormField
                  name={`applicantProfile.intentions.${index}.intendedState`}
                  label={t('stateProvince')}
                  placeholder={t('enterStateProvince')}
                  inlineLabel
                  isBorder
                />

                <CustomFormField
                  name={`applicantProfile.intentions.${index}.intendedCountry`}
                  label={t('country')}
                  placeholder={t('enterCountry')}
                  inlineLabel
                  isBorder
                />
              </div>
            </div>

            {/* Academic Details */}
            <div className="space-y-4">
              <h5 className="font-medium text-gray-900 flex items-center gap-2">
                <GraduationCap className="h-4 w-4" />
                {t('academicDetails')}
              </h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <CustomFormField
                  name={`applicantProfile.intentions.${index}.intendedMajorCategory`}
                  label={t('majorCategory')}
                  type="input-select"
                  placeholder={t('selectMajorCategory')}
                  options={MAJOR_CATEGORIES}
                  inlineLabel
                  isBorder
                />

                <CustomFormField
                  name={`applicantProfile.intentions.${index}.intendedMajorName`}
                  label={t('majorName')}
                  placeholder={t('enterMajorName')}
                  type="input-select"
                  options={MAJOR_NAMES}
                  inlineLabel
                  isBorder
                />

                <CustomFormField
                  name={`applicantProfile.intentions.${index}.academicClassification`}
                  label={t('academicClassification')}
                  placeholder={t('academicClassificationPlaceholder')}
                  inlineLabel
                  isBorder
                />
              </div>
            </div>

            {/* Timeline */}
            <div className="space-y-4">
              <h5 className="font-medium text-gray-900 flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {t('timeline')}
              </h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <CustomFormField
                  name={`applicantProfile.intentions.${index}.expectedStartDate`}
                  label={t('expectedStartDate')}
                  type="date"
                  inlineLabel
                  isBorder
                />

                <CustomFormField
                  name={`applicantProfile.intentions.${index}.expectedGraduationYear`}
                  label={t('expectedGraduationYear')}
                  type="number"
                  placeholder={t('enterGraduationYear')}
                  inlineLabel
                  isBorder
                />
              </div>
            </div>

            {/* Additional */}
            <div className="space-y-4">
              <h5 className="font-medium text-gray-900">{t('additionalInformation')}</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <CustomFormField
                  name={`applicantProfile.intentions.${index}.isTransferStudent`}
                  label={t('transferStudent')}
                  type="switch"
                  inlineLabel
                  isBorder
                />

                <CustomFormField
                  name={`applicantProfile.intentions.${index}.isReturningStudent`}
                  label={t('returningStudent')}
                  type="switch"
                  inlineLabel
                  isBorder
                />
              </div>

              <CustomFormField
                name={`applicantProfile.intentions.${index}.notes`}
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
            <p className="text-lg font-medium mb-2">{t('noIntentionsAddedYet')}</p>
            <p className="text-sm mb-4">{t('clickAddToStart')}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Intentions;
