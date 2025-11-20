'use client';

import Subscription from '@/pattern/share/Subscription';
import { useSearchParams } from 'next/navigation';
import React from 'react';
import Loading from '@/pattern/share/Loading';
import BasicSubscriptionCard from '@/pattern/share/BasicSubscriptionCard';
import { useGetSubscriptionByTargetTypeQuery } from '@/state/apiAuth';

const SubscriptionPage = () => {
  const searchParams = useSearchParams();
  const type = (searchParams.get('type') as 'APPLICANT' | 'PROVIDER') || 'APPLICANT';

  const { data: subscriptionData, isLoading } = useGetSubscriptionByTargetTypeQuery({
    targetType: type,
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="h-full bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50/30 py-8 px-40">
      <div className="w-full max-w-7xl mx-auto">
        <div className="flex justify-center items-stretch gap-6">
          {type === 'APPLICANT' && <BasicSubscriptionCard />}
          {subscriptionData?.map((subscription) => (
            <Subscription key={subscription.id} subscription={subscription} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPage;
