import ScholarshipUpdate from '@/@screen/(dashboard)/provider/ScholarshipUpdate';
import React from 'react';

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

const page = async ({ params }: PageProps) => {
  const { id } = await params;

  return <ScholarshipUpdate scholarshipId={id} />;
};

export default page;
