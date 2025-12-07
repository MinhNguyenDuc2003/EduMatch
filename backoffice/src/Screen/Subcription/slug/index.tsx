'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Context from '../seg/context';

export default function SubscriptionPlanDetail() {
  const { id } = useParams();

  return (
    <Context.Provider>
      <Context.Consumer>
        {({ meds }) => <SubscriptionPlanDetailInner meds={meds} id={id as string} />}
      </Context.Consumer>
    </Context.Provider>
  );
}

function SubscriptionPlanDetailInner({ meds, id }: { meds: any; id: string }) {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (!id || !meds?.onGetByID) return;
    const fetchData = async () => {
      try {
        const res = await meds.onGetByID(id);
        setData(res);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [id, meds]);

  if (!data)
    return (
      <div className="p-16 text-center text-gray-500 animate-pulse">
        Loading subscription detail...
      </div>
    );

  const subscription = data;

  return (
    <div className="w-[95%] mx-auto bg-white p-8 mt-10 rounded-2xl shadow-md border border-gray-100 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 border-b pb-3">
        Subscription  Details
      </h1>

      {/* Basic Info */}
      <Section title="Subscription Information">
        <InfoRow label="Subscription ID" value={subscription.id} />
        <InfoRow label="User Type" value={subscription.userType} />
        <InfoRow label="Status" value={subscription.status === 'true' ? 'Active' : 'Inactive'} />
        <InfoRow label="Auto Renew" value={subscription.autoRenew ? 'Yes' : 'No'} />
        <InfoRow
          label="Start Date"
          value={subscription.startDate ? new Date(Number(subscription.startDate)).toLocaleDateString() : '—'}
        />
        <InfoRow
          label="End Date"
          value={subscription.endDate ? new Date(Number(subscription.endDate)).toLocaleDateString() : '—'}
        />
      </Section>

      {/* Plan Info */}
      {subscription.plan && (
        <Section title="Plan Information">
          <InfoRow label="Subscription Name" value={subscription.plan.name} />
          <InfoRow label="Price" value={`${subscription.plan.price} ${subscription.plan.currency}`} />
          <InfoRow label="Duration (Days)" value={subscription.plan.durationDays} />
          <InfoRow label="Target Type" value={subscription.plan.targetType} />
          <TextAreaSection label="Description" value={subscription.plan.description} />
          <TextAreaSection
            label="Features"
            value={subscription.plan.features?.length > 0 ? subscription.plan.features.join(', ') : 'No features provided'}
          />
        </Section>
      )}
    </div>
  );
}

/* -------------------------- Helper Components --------------------------- */

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-gray-50 rounded-xl p-5 border border-gray-200 space-y-4">
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      <div className="grid grid-cols-2 gap-4">{children}</div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: any }) {
  return (
    <div className="flex flex-col">
      <span className="text-gray-500 text-sm">{label}</span>
      <span className="text-gray-800 font-medium mt-1">{value ?? '—'}</span>
    </div>
  );
}

function TextAreaSection({ label, value }: { label: string; value: string }) {
  return (
    <div className="col-span-2">
      <label className="block text-gray-700 font-medium mb-2">{label}</label>
      <div className="bg-gray-50 border rounded-lg p-4 text-gray-700 leading-relaxed">
        {value || `No ${label.toLowerCase()} provided.`}
      </div>
    </div>
  );
}
