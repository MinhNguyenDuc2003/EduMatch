'use client';

import { Check } from 'lucide-react';
import { Button } from '@/lib/cus/button';
import { useRouter } from 'next/navigation';

type SubscriptionProps = {
  subscription?: SubscriptionPlan;
};

export default function Subscription({ subscription }: SubscriptionProps) {
  const router = useRouter();

  const { id, name, description, price, currency, durationDays, features } = subscription || {};
  console.log(subscription, 'subscription');

  return (
    <div className="relative max-w-sm rounded-lg border-2 flex flex-col transition-all bg-white border-gray-200 shadow-sm hover:shadow-md ">
      {/* Header */}
      <div className="relative bg-gradient-to-b from-blue-100 via-purple-100 to-blue-0 p-6 overflow-hidden">
        <div className="relative z-10">
          {/* SVG Dot Pattern Background */}
          <div className="absolute inset-0 opacity-15">
            <svg
              className="w-full h-full"
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="100%"
              preserveAspectRatio="none"
            >
              <defs>
                <pattern
                  id="dotPattern"
                  x="0"
                  y="0"
                  width="24"
                  height="24"
                  patternUnits="userSpaceOnUse"
                >
                  {/* Dots arranged in a grid */}
                  <circle
                    cx="12"
                    cy="12"
                    r="2"
                    fill="currentColor"
                    className="text-gray-700"
                    opacity="0.4"
                  />
                </pattern>
                {/* White gradient from center to bottom corners */}
                <radialGradient
                  id="whiteGradient"
                  cx="50%"
                  cy="20%"
                  r="100%"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0%" stopColor="white" stopOpacity="0" />
                  <stop offset="30%" stopColor="white" stopOpacity="0.1" />
                  <stop offset="60%" stopColor="white" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="white" stopOpacity="0.6" />
                </radialGradient>
                {/* Additional linear gradient for bottom corners emphasis */}
                <linearGradient
                  id="cornerGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0%" stopColor="white" stopOpacity="0" />
                  <stop offset="50%" stopColor="white" stopOpacity="0" />
                  <stop offset="100%" stopColor="white" stopOpacity="0.4" />
                </linearGradient>
              </defs>
              <rect width="100%" height="100%" fill="url(#dotPattern)" />
              <rect width="100%" height="100%" fill="url(#whiteGradient)" />
              <rect width="100%" height="100%" fill="url(#cornerGradient)" />
            </svg>
          </div>
          {/* Title */}
          <h3 className="text-lg font-normal mb-6 text-gray-900">{name}</h3>
          {/* Price */}
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-gray-600">Start at</p>
            <div className="flex items-center gap-2">
              <span className="text-3xl font-bold text-gray-900">
                {price?.toFixed(2)} {currency}
              </span>
              <span className="text-sm font-medium text-gray-600">/ month</span>
            </div>
          </div>
          <div className="mb-4 flex flex-col gap-2 items-start">
            <span className="text-sm block mt-1 text-gray-600">Valid for {durationDays} days</span>
          </div>

          {/* Description */}
          <p className="text-sm mb-6 leading-relaxed text-gray-600">{description}</p>
        </div>

        {/* Button */}
        <Button
          className="w-full py-4 rounded-lg font-semibold transition-all bg-primary-brand text-white"
          variant="custom"
          value={`Subscribe Now`}
          onClick={() => router.push(`/checkout?step=1&id=${id}`)}
        />
      </div>

      <div className="border-t border-gray-200 mx-6" />

      <div className="flex flex-col gap-2 p-6">
        <h4 className="text-sm font-normal text-gray-900 mb-3">{name} features:</h4>
        <div className="flex-1 space-y-3 mb-6">
          {features?.map((feature, index) => (
            <div key={index} className="flex items-start gap-2">
              <Check className="w-5 h-5 flex-shrink-0 mt-0.5 text-green-600" />
              <span className="text-sm text-gray-900">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
