'use client';

import React from 'react';
import { Pencil } from 'lucide-react';
import { Button } from '@/pattern/cus/button';
import { useTranslations } from 'next-intl';

interface InfoField {
  label: string;
  value?: string;
}

interface InfoCardProps {
  title: string;
  fields: InfoField[];
  onEdit?: () => void;
  className?: string;
}

export default function InfoCard({ title, fields, onEdit, className }: InfoCardProps) {
  const t = useTranslations('applicantProfile.common');

  return (
    <div className={`bg-[#FAFAF6] rounded-lg border border-[#828282] p-6 relative ${className}`}>
      {/* Header with Edit Button */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
        {onEdit && (
          <Button
            variant="custom"
            className="bg-[#00B8D9] text-white px-3 py-1 rounded-md text-xs font-medium flex items-center gap-1 hover:bg-[#00A3C4]"
            onClick={onEdit}
          >
            <Pencil className="w-3 h-3" />
            {t('edit')}
          </Button>
        )}
      </div>

      {/* Fields */}
      <div className="space-y-3">
        {fields.map((field, index) => (
          <div key={index} className="flex flex-col">
            <span className="text-xs font-medium text-gray-600">{field.label}</span>
            <span
              className={`text-sm mt-1 ${field.value ? 'text-gray-900' : 'text-gray-400 italic'}`}
            >
              {field.value || t('addInfo')}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
