import ScholarshipDetail from '@/@screen/(nondashboard)/ScholarshipDetail';
import React from 'react';

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

const page = async ({ params }: PageProps) => {
  const { id } = await params;
  const scholarshipId = parseInt(id, 10);

  return <ScholarshipDetail scholarshipId={scholarshipId} />;
};

export default page;
