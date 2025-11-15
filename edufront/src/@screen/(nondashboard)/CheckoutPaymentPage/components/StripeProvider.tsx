import React, { useEffect, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { Appearance, loadStripe, StripeElementsOptions } from '@stripe/stripe-js';
import { useCurrentSubscription } from '@/hooks/useCurrentSubscription';
import { useAuth } from '@/hooks/useAuth';
import Loading from '@/pattern/share/Loading';
import apiClientService from '@/common/services/ApiClientService';

if (!process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY) {
  throw new Error('NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not set');
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

const appearance: Appearance = {
  theme: 'stripe',
  variables: {
    colorPrimary: '#3d6cb9',
    colorBackground: '#FAFAF6',
    colorText: '#333333',
    colorDanger: '#df1b41',
    colorTextPlaceholder: '#6e6e6e',
    fontFamily: 'Inter, system-ui, sans-serif',
    spacingUnit: '3px',
    borderRadius: '10px',
    fontSizeBase: '14px',
  },
};

const StripeProvider = ({ children }: { children: React.ReactNode }) => {
  const [clientSecret, setClientSecret] = useState<string | ''>('');
  const { subscriptionPlan } = useCurrentSubscription();
  const { user } = useAuth();

  const options: StripeElementsOptions = {
    clientSecret,
    appearance,
  };

  useEffect(() => {
    if (!subscriptionPlan || !user) return;
    const fetchPaymentIntent = async () => {
      const response = await fetch('http://localhost:8000/stripe/payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
          amount: subscriptionPlan.price,
          email: user.email,
        }),
      });

      const data = await response.json();

      console.log(data);

      setClientSecret(data.paymentIntent.client_secret);
    };
    fetchPaymentIntent();
  }, [subscriptionPlan, subscriptionPlan?.price, user]);

  if (!clientSecret) return <Loading />;

  return (
    <Elements stripe={stripePromise} options={options} key={clientSecret}>
      {children}
    </Elements>
  );
};

export default StripeProvider;
