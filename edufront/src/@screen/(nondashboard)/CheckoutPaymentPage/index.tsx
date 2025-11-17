import { useCurrentSubscription } from '@/hooks/useCurrentSubscription';
import Loading from '@/pattern/share/Loading';
import SubscriptionPlanPreview from '@/@screen/(nondashboard)/CheckoutPaymentPage/components/SubscriptionPlanPreview';
import React from 'react';
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { toast } from 'sonner';
import { useCheckoutNavigation } from '@/hooks/useCheckoutNavigation';
import StripeProvider from './components/StripeProvider';
import { Button } from '@/lib/cus/button';
import { useConfirmPaymentMutation } from '@/state/apiSubscription';

const CheckoutPaymentPageContent = () => {
  const { subscriptionPlan, subscriptionPlanId, isLoading, isError } = useCurrentSubscription();
  const stripe = useStripe();
  const elements = useElements();
  const { navigateToStep } = useCheckoutNavigation();

  const [confirmPayment, { isLoading: isConfirmPaymentLoading }] = useConfirmPaymentMutation();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      toast.error('Stripe service is not available');
      return;
    }

    const baseUrl = process.env.NEXT_PUBLIC_LOCAL_URL
      ? `http://${process.env.NEXT_PUBLIC_LOCAL_URL}`
      : process.env.NEXT_PUBLIC_PRODUCTION_URL
        ? `${process.env.NEXT_PUBLIC_PRODUCTION_URL}`
        : undefined;

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${baseUrl}/checkout?step=2?id=${subscriptionPlanId}`,
      },
      redirect: 'if_required',
    });

    if (result.paymentIntent?.status === 'succeeded') {
      await confirmPayment({
        transactionId: result.paymentIntent.id,
        subscriptionPlanId: Number(subscriptionPlanId),
      });
      navigateToStep(2);
    }
  };

  if (isLoading) return <Loading />;
  if (isError)
    return (
      <div className="p-4 text-center text-sm text-red-500">Fetching notifications failed.</div>
    );
  if (!subscriptionPlan)
    return <div className="p-4 text-center text-sm text-red-500">Subscription plan not found.</div>;

  return (
    <div className="flex flex-col w-full">
      <div className="sm:flex gap-10 mb-6">
        <div className="basis-1/2 rounded-lg">
          <SubscriptionPlanPreview subscriptionPlan={subscriptionPlan} />
        </div>

        <div className="basis-1/2">
          <form id="payment-form" onSubmit={handleSubmit} className="basis-1/2">
            <div className="flex flex-col gap-2 bg-customgreys-secondarybg px-6  rounded-lg">
              <h1 className="text-2xl font-bold">Checkout</h1>
              <p className="text-sm text-gray-400">
                Fill out the payment details below to complete your purchase.
              </p>

              <div className="flex flex-col w-full ">
                <PaymentElement />
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className="flex justify-end items-center w-full">
        <Button
          className=" bg-[#3D6CB9] hover:bg-[#2F5A9E] text-white py-3 text-base font-semibold"
          type="submit"
          form="payment-form"
          disabled={!stripe || !elements || isConfirmPaymentLoading}
        >
          {isConfirmPaymentLoading ? 'Confirming payment...' : 'Pay with Credit Card'}
        </Button>
      </div>
    </div>
  );
};

const CheckoutPaymentPage = () => {
  return (
    <StripeProvider>
      <CheckoutPaymentPageContent />
    </StripeProvider>
  );
};

export default CheckoutPaymentPage;
