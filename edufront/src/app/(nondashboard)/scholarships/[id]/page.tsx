import ScholarshipDetail from '@/@screen/ScholarshipDetail';
import React from 'react';

type PageProps = {
  params: {
    id: string;
  };
};

const page = async ({ params }: PageProps) => {
  const scholarshipId = parseInt(params.id, 10);

  return <ScholarshipDetail scholarshipId={scholarshipId} />;
};

export default page;
