import ActivityManagement from '@/@screen/(dashboard)/applicant/activity';
import Loading from '@/pattern/share/Loading';
import { Suspense } from 'react';

export default function ApplicantShortlistPage() {
  return (
    <Suspense fallback={<Loading />}>
      <ActivityManagement />
    </Suspense>
  );
}
