'use client';

import { useAuth } from '@/hooks/useAuth';
import ProtectedRoute from '@/pattern/core/ProtectedRoute';
import React from 'react';
import WizardStepper from './component/WizardStepper';
import { useCheckoutNavigation } from '@/hooks/useCheckoutNavigation';
import CheckoutDetailsPage from '../CheckoutDetailsPage';

const CheckoutPage = () => {
  const { checkoutStep } = useCheckoutNavigation();

  const renderStep = () => {
    switch (checkoutStep) {
      case 1:
        return <CheckoutDetailsPage />;
      case 2:
        return <div>Step 2</div>;
      case 3:
        return <div>Step 3</div>;
    }
  };

  return (
    <ProtectedRoute>
      <div className="w-full px-4 h-full flex flex-col items-center lg:px-40 py-8">
        <WizardStepper currentStep={checkoutStep} />
        <div className="w-full max-w-screen-lg flex flex-col items-center mt-10">
          {renderStep()}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default CheckoutPage;
