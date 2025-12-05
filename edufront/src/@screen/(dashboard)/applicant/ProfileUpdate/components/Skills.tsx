import { Button } from '@/pattern/cus/button';
import { CustomFormField } from '@/pattern/cus/CustomFormField';
import { IApplicantProfile } from '@/lib/schemas';
import Header from '@/pattern/share/Header';
import { Plus, Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

const Skills = () => {
  const { control } = useFormContext<IApplicantProfile>();
  const t = useTranslations('applicantProfile.skillsDialog');
  const tCommon = useTranslations('applicantProfile.common');

  const PROFICIENCY_LEVELS = [
    { value: 'Beginner', label: t('beginner') },
    { value: 'Intermediate', label: t('intermediate') },
    { value: 'Advanced', label: t('advanced') },
    { value: 'Expert', label: t('expert') },
  ];

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'applicantProfile.skills',
  });

  const handleAddSkill = () => {
    append({
      skillName: '',
      proficiencyLevel: '',
      yearsExperience: 0,
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
            onClick={handleAddSkill}
            className="flex items-center gap-2 text-primary-brand border-primary-brand hover:bg-primary-brand hover:text-white"
          >
            <Plus className="h-4 w-4" />
            {tCommon('add')}
          </Button>
        }
      />

      {/* Skills List */}
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
                name={`applicantProfile.skills.${index}.skillName`}
                label={t('skillName')}
                placeholder={t('enterSkillName')}
                className="md:col-span-10"
                inlineLabel
                isBorder
              />

              <CustomFormField
                name={`applicantProfile.skills.${index}.proficiencyLevel`}
                label={t('proficiencyLevel')}
                type="select"
                placeholder={t('selectLevel')}
                options={PROFICIENCY_LEVELS}
                inlineLabel
                isBorder
                className="md:col-span-5"
              />

              <CustomFormField
                name={`applicantProfile.skills.${index}.yearsExperience`}
                label={t('yearsExperience')}
                type="number"
                placeholder="0"
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
                  title={t('deleteSkill')}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}

        {fields.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p>{t('noSkillsAddedYet')}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Skills;
