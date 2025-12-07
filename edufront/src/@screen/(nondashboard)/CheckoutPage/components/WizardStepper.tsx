import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';
import React from 'react';

const WizardStepper = ({ currentStep }: { currentStep: number }) => {
  return (
    <div className="w-1/2 mb-4 flex flex-col items-center">
      <div className="w-full flex items-center justify-between mb-2">
        {[1, 2].map((step, index) => (
          <React.Fragment key={step}>
            <div className="flex flex-col items-center">
              <div
                className={cn('w-8 h-8 flex items-center justify-center rounded-full mb-2', {
                  'bg-green-500': currentStep > step || (currentStep === 2 && step === 2),
                  'bg-primary-brand text-white': currentStep === step && step !== 2,
                  'border border-gray-400 text-gray-400': currentStep < step,
                })}
              >
                {currentStep > step || (currentStep === 2 && step === 2) ? (
                  <Check className="w-5 h-5 text-white" />
                ) : (
                  <span>{step}</span>
                )}
              </div>
              <p
                className={cn('text-sm', {
                  'wizard-stepper__text--active': currentStep >= step,
                  'text-gray-400': currentStep < step,
                })}
              >
                {step === 1 && 'Payment'}
                {step === 2 && 'Completion'}
              </p>
            </div>
            {index < 1 && (
              <div
                className={cn('w-1/2 h-[1px] self-start mt-4', {
                  'bg-green-500': currentStep > step,
                  'bg-gray-400': currentStep <= step,
                })}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default WizardStepper;
