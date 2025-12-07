'use client';

import CaseStudy from '@/@screen/(nondashboard)/Case-study';
import ProtectedRoute from '@/pattern/core/ProtectedRoute';
import { use } from 'react';

type PageProps = {
  params: Promise<{
    scholarshipId: string;
  }>;
};

const Page = ({ params }: PageProps) => {
  const { scholarshipId } = use(params);

  return (
    <ProtectedRoute requireApplicant={true}>
      <CaseStudy scholarshipId={scholarshipId} />
    </ProtectedRoute>
  );
};

export default Page;
