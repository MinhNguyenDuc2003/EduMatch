'use client';
import { useTranslations } from 'next-intl';

interface DescriptionSectionProps {
  description?: string;
}

export default function DescriptionSection({ description }: DescriptionSectionProps) {
  const t = useTranslations('homepage.viewProviderProfile.description');
  
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="bg-gradient-to-r from-[#1B3053] to-[#3D6CB9] px-6 py-1 rounded-t-lg">
        <h2 className="text-base font-semibold text-white">{t('title')}</h2>
      </div>
      <div className="px-6 py-4">
        <p className="text-gray-700 leading-relaxed">
          {description || t('noDescription')}
        </p>
      </div>
    </div>
  );
}
