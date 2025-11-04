import { Suspense } from 'react';
import Shortlist from '@/@screen/(dashboard)/Shortlist';

export default function ApplicantShortlistPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
          <div className="flex items-center justify-center h-screen">
            <div className="text-slate-600">Loading...</div>
          </div>
        </div>
      }
    >
      <Shortlist />
    </Suspense>
  );
}
