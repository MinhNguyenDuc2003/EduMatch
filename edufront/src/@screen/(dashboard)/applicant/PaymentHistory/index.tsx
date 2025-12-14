import React from 'react';
import PaymentHistory from '@/pattern/PaymentHistory';
import BreadcrumbHeader from '@/pattern/core/BreadcrumbHeader';
import { useTranslations } from 'next-intl';

export default function ApplicantPaymentHistory() {
  const t = useTranslations('paymentHistory');

  return (
    <>
      <BreadcrumbHeader
        items={[
          { label: t('breadcrumb.applicant'), href: '/applicant/profile' },
          { label: t('breadcrumb.paymentHistory') },
        ]}
      />
      <div className="min-h-screen flex flex-col gap-4 bg-gray-50 py-8 px-4 lg:px-40">
        <div className="">
          <h2 className="text-2xl font-bold text-gray-900">{t('title')}</h2>
          <p className="mt-1 text-sm text-gray-500">{t('subtitle')}</p>
        </div>

        <PaymentHistory userType="APPLICANT" />
      </div>
    </>
  );
}
