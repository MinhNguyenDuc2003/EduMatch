'use client';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Context from '../seg/context';

export default function OrderDetail() {
  const { id } = useParams();
  
  return (
    <Context.Provider>
      <Context.Consumer>
        {({ meds }) => <OrderDetailInner meds={meds} id={id as string} />}
      </Context.Consumer>
    </Context.Provider>
  );
}

function OrderDetailInner({ meds, id }: { meds: any; id: string }) {
  const [data, setData] = useState<any>(null);
  const router = useRouter();
  useEffect(() => {
    if (id && meds?.onGetByID) {
      (async () => {
        const res = await meds.onGetByID(id);
        setData(res);
      })();
    }
  }, [id, meds]);

  if (!data)
    return (
      <div className="p-16 text-center text-gray-500 animate-pulse">
        Loading Order details...
      </div>
    );

  return (
    <div className="w-[95%]  mx-auto bg-white p-8 mt-10 rounded-2xl shadow-md border border-gray-100 space-y-6">
      
      <h1 className="text-2xl font-bold text-gray-800 border-b pb-3">
        Order Details
      </h1>

      <div className="grid grid-cols-2 gap-4">
        <InfoRow label="ID" value={data.id} />
        <InfoRow
                label="Subscription ID"
                value={
                  <span
                    className="text-blue-600 hover:underline cursor-pointer"
                    onClick={() =>
                      router.push(`/backoffice/subscriptions/${data.subscriptionId}`)
                    }
                  >
                    {data.subscriptionId}
                  </span>
                }
              />
        <InfoRow label="User ID" value={data.userId} />
        <InfoRow label="Amount" value={`${data.amount.toFixed(2)} ${data.currency}`} />
        <InfoRow label="Payment Method" value={data.paymentMethod} />
        <InfoRow label="Transaction ID" value={data.transactionId} />
        <InfoRow label="Status" value={data.status} status />
        <InfoRow
          label="Paid At"
          value={new Date(data.paidAt).toLocaleString('en-US', {
            dateStyle: 'medium',
            timeStyle: 'short',
          })}
        />
      </div>
    </div>
  );
}

// Small component for displaying label + value
function InfoRow({
  label,
  value,
  status,
}: {
  label: string;
  value: any;
  status?: boolean;
}) {
  const statusColor =
    status && value === 'PAID'
      ? 'text-green-600 bg-green-100'
      : status && value === 'PENDING'
      ? 'text-yellow-600 bg-yellow-100'
      : 'text-gray-700 bg-gray-100';

  return (
    <div className="flex flex-col">
      <span className="text-gray-500 text-sm">{label}</span>
      {status ? (
        <span
          className={`inline-block mt-1 px-3 py-1 rounded-full text-sm font-semibold ${statusColor} w-max`}
        >
          {value}
        </span>
      ) : (
        <span className="text-gray-900 font-medium mt-1">{value}</span>
      )}
    </div>
  );
}

