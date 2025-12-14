import React from 'react';
import PaymentHistory from '@/pattern/PaymentHistory';
import BreadcrumbHeader from '@/pattern/core/BreadcrumbHeader';
import { useTranslations } from 'next-intl';

export default function ProviderPaymentHistory() {
  const t = useTranslations('paymentHistory');

  return (
    <div className="p-6">
        <div className="flex items-center justify-between mb-6">
        <div className="border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900">
          {t('title')}
        </h2>
        <p className="mt-1 text-sm text-gray-500">{t('subtitle')}</p>
      </div>
      </div>

      <div className="bg-gray-50">
        <div className="w-full">
          <PaymentHistory userType="PROVIDER" />
        </div>
      </div>
    </div>
  );
}
