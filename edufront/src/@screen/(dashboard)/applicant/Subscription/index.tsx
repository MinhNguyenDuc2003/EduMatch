'use client';

import Subscription from '@/pattern/share/Subscription';
import { useGetSubscriptionByTargetTypeQuery } from '@/state/apiSubscription';

export default function SubscriptionPage() {
  const { data: subscriptionData, isLoading } = useGetSubscriptionByTargetTypeQuery({
    targetType: 'APPLICANT',
  });

  console.log(subscriptionData, 'subscriptionData');

  return (
    <div className="h-full bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50/30 py-8 px-40">
      <div className="w-full max-w-7xl mx-auto">
        <div className="flex justify-center items-stretch gap-6">
          {subscriptionData?.map((subscription) => (
            <Subscription key={subscription.id} subscription={subscription} />
          ))}
        </div>
      </div>
    </div>
  );
}
