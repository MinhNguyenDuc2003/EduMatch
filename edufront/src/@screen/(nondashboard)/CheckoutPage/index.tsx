'use client';

import ProtectedRoute from '@/pattern/core/ProtectedRoute';
import React from 'react';
import WizardStepper from './components/WizardStepper';
import { useCheckoutNavigation } from '@/hooks/useCheckoutNavigation';
import CheckoutPaymentPage from '../CheckoutPaymentPage';

const CheckoutPage = () => {
  const { checkoutStep } = useCheckoutNavigation();

  const renderStep = () => {
    switch (checkoutStep) {
      case 1:
        return <CheckoutPaymentPage />;
      case 2:
        return <div>Step 2</div>;
    }
  };

  return (
    <ProtectedRoute>
      <div className="w-full px-4 h-full flex flex-col items-center lg:px-40 py-8">
        <WizardStepper currentStep={checkoutStep} />
        <div className="w-full max-w-screen-lg flex flex-col items-center ">{renderStep()}</div>
      </div>
    </ProtectedRoute>
  );
};

export default CheckoutPage;
