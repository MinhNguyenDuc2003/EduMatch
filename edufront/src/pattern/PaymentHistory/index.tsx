'use client';

import React, { useState } from 'react';
import { useGetMyOrderQuery } from '@/state/apiAuth';
import { useTranslations } from 'next-intl';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/pattern/cus/sheet';
import { X } from 'lucide-react';

interface PaymentHistoryProps {
  userType: 'APPLICANT' | 'PROVIDER';
}

export default function PaymentHistory({ userType }: PaymentHistoryProps) {
  const t = useTranslations('paymentHistory');
  const { data: payments, isLoading, error } = useGetMyOrderQuery();
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [isDetailSheetOpen, setIsDetailSheetOpen] = useState(false);

  // Filter payments based on userType prop
  const filteredPayments =
    payments?.filter((payment) => payment.subscription?.userType === userType) || [];

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // Format currency
  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency || 'USD',
    }).format(amount);
  };

  // Handle row click to open detail sheet
  const handleRowClick = (payment: Payment) => {
    setSelectedPayment(payment);
    setIsDetailSheetOpen(true);
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-16 bg-gray-100 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="text-center py-12">
          <svg
            className="mx-auto h-12 w-12 text-red-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">{t('error.title')}</h3>
          <p className="mt-1 text-sm text-gray-500">{t('error.description')}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          {filteredPayments.length === 0 ? (
            <div className="text-center py-12">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">{t('empty.title')}</h3>
              <p className="mt-1 text-sm text-gray-500">{t('empty.description')}</p>
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('table.transactionId')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('table.planName')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('table.amount')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('table.paymentMethod')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('table.status')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('table.paymentDate')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('table.subscriptionPeriod')}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPayments.map((payment) => (
                  <tr
                    key={payment.id}
                    onClick={() => handleRowClick(payment)}
                    className="hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-sm font-medium text-gray-900">{payment.transactionId}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-sm text-gray-900">
                        {payment.subscription?.plan?.name || '-'}
                      </p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-sm font-semibold text-gray-900">
                        {formatCurrency(payment.amount, payment.currency)}
                      </p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-sm text-gray-900">{payment.paymentMethod}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-sm text-gray-900">{payment.status}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-sm text-gray-500">{formatDate(payment.paidAt)}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-sm text-gray-500">
                        {payment.subscription?.startDate && payment.subscription?.endDate
                          ? `${formatDate(new Date(payment.subscription.startDate).toISOString())} - ${formatDate(new Date(payment.subscription.endDate).toISOString())}`
                          : '-'}
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Invoice Detail Sheet */}
      <Sheet open={isDetailSheetOpen} onOpenChange={setIsDetailSheetOpen}>
        <SheetContent
          side="right"
          className="w-full p-0 sm:max-w-2xl max-h-[95vh] [&>button]:hidden rounded-xl !right-4 !top-1/2 !-translate-y-1/2 flex flex-col"
        >
          <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
            <SheetHeader className="!p-0 mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <SheetTitle className="text-2xl font-bold text-gray-900">
                    {t('detail.title')}
                  </SheetTitle>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600 mt-1">{t('detail.transactionId')}:</span>
                    <span className="text-sm text-gray-600 mt-1">
                      {selectedPayment?.transactionId}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setIsDetailSheetOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </SheetHeader>

            {selectedPayment && (
              <div className="space-y-6">
                {/* Transaction Information */}
                <section className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {t('detail.transactionInfo')}
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <span className="text-sm text-gray-600">{t('table.amount')}</span>
                      <span className="text-sm font-semibold text-gray-900">
                        {formatCurrency(selectedPayment.amount, selectedPayment.currency)}
                      </span>
                    </div>
                    <div className="flex justify-between items-start">
                      <span className="text-sm text-gray-600">{t('table.status')}</span>
                      <span className="text-sm font-medium text-gray-900">
                        {selectedPayment.status}
                      </span>
                    </div>
                    <div className="flex justify-between items-start">
                      <span className="text-sm text-gray-600">{t('table.paymentMethod')}</span>
                      <span className="text-sm font-medium text-gray-900">
                        {selectedPayment.paymentMethod}
                      </span>
                    </div>
                    <div className="flex justify-between items-start">
                      <span className="text-sm text-gray-600">{t('table.paymentDate')}</span>
                      <span className="text-sm font-medium text-gray-900">
                        {formatDate(selectedPayment.paidAt)}
                      </span>
                    </div>
                  </div>
                </section>

                {/* Subscription Information */}
                {selectedPayment.subscription && (
                  <section className="bg-gray-50 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      {t('detail.subscriptionInfo')}
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-start">
                        <span className="text-sm text-gray-600">{t('table.planName')}</span>
                        <span className="text-sm font-medium text-gray-900">
                          {selectedPayment.subscription.plan?.name || '-'}
                        </span>
                      </div>
                      <div className="flex justify-between items-start">
                        <span className="text-sm text-gray-600">{t('detail.userType')}</span>
                        <span className="text-sm font-medium text-gray-900">
                          {selectedPayment.subscription.userType}
                        </span>
                      </div>
                      <div className="flex justify-between items-start">
                        <span className="text-sm text-gray-600">
                          {t('table.subscriptionPeriod')}
                        </span>
                        <span className="text-sm font-medium text-gray-900 text-right">
                          {selectedPayment.subscription.startDate &&
                          selectedPayment.subscription.endDate
                            ? `${formatDate(new Date(selectedPayment.subscription.startDate).toISOString())} - ${formatDate(new Date(selectedPayment.subscription.endDate).toISOString())}`
                            : '-'}
                        </span>
                      </div>
                      {selectedPayment.subscription.plan?.description && (
                        <div className="flex flex-col gap-1 pt-2 border-t border-gray-200">
                          <span className="text-sm text-gray-600">{t('detail.planDetails')}</span>
                          <span className="text-sm text-gray-700">
                            {selectedPayment.subscription.plan.description}
                          </span>
                        </div>
                      )}
                    </div>
                  </section>
                )}

                {/* Customer Information */}
                {(selectedPayment.customer || selectedPayment.subscription?.customer) && (
                  <section className="bg-gray-50 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      {t('detail.customerInfo')}
                    </h3>
                    <div className="space-y-3">
                      {(selectedPayment.customer?.firstName ||
                        selectedPayment.subscription?.customer?.firstName) && (
                        <div className="flex justify-between items-start">
                          <span className="text-sm text-gray-600">Name</span>
                          <span className="text-sm font-medium text-gray-900">
                            {selectedPayment.customer?.firstName ||
                              selectedPayment.subscription?.customer?.firstName}{' '}
                            {selectedPayment.customer?.lastName ||
                              selectedPayment.subscription?.customer?.lastName}
                          </span>
                        </div>
                      )}
                      {(selectedPayment.customer?.email ||
                        selectedPayment.subscription?.customer?.email) && (
                        <div className="flex justify-between items-start">
                          <span className="text-sm text-gray-600">Email</span>
                          <span className="text-sm font-medium text-gray-900">
                            {selectedPayment.customer?.email ||
                              selectedPayment.subscription?.customer?.email}
                          </span>
                        </div>
                      )}
                    </div>
                  </section>
                )}
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
