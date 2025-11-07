import ApplicationUpdate from '@/@screen/(dashboard)/applicant/ApplicationUpdate';
import React from 'react';

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

const page = async ({ params }: PageProps) => {
  const { id } = await params;

  return <ApplicationUpdate applicationId={id} />;
};

export default page;
