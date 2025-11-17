import { CheckCircleIcon } from 'lucide-react';
import React from 'react';

function formatPrice(price: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
}

const SubscriptionPlanPreview = ({ subscriptionPlan }: { subscriptionPlan: SubscriptionPlan }) => {
  const price = formatPrice(subscriptionPlan.price);

  return (
    <div className="space-y-6">
      <div className="w-full px-6 flex flex-col gap-2 rounded-lg">
        <div>
          <h1 className="text-2xl font-bold mb-2">
            {subscriptionPlan.name} ({subscriptionPlan.durationDays} days)
          </h1>
          <p className="text-sm text-gray-400">{subscriptionPlan.description}</p>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Subscription Features</h4>
          <ul className=" text-sm">
            {subscriptionPlan.features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2">
                <CheckCircleIcon className="w-4 h-4 text-green-500" />
                <span className=" text-sm">{feature}</span>
              </div>
            ))}
          </ul>
        </div>
      </div>

      <div className="w-full px-6 flex flex-col gap-2 rounded-lg">
        <h3 className="text-lg font-semibold">Price Details (1 item)</h3>
        <div className="flex justify-between mb-2 text-gray-400 text-base">
          <span className="font-bold text-sm">1x {subscriptionPlan.name}</span>
          <span className="font-bold text-sm">{price}</span>
        </div>
        <div className="flex justify-between border-t border-customgreys-dirtyGrey pt-2">
          <span className="font-bold text-md">Total Amount</span>
          <span className="font-bold text-md">{price}</span>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPlanPreview;
