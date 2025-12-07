'use client';

import { useParams } from 'next/navigation';
import ViewProviderProfile from '@/@screen/(dashboard)/applicant/ViewProviderProfile';

export default function ProviderProfilePage() {
  const params = useParams();
  const providerId = Number(params.providerId);

  if (isNaN(providerId)) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Invalid Provider ID</h2>
          <p className="text-gray-600">Please provide a valid provider ID.</p>
        </div>
      </div>
    );
  }

  return <ViewProviderProfile providerId={providerId} />;
}
