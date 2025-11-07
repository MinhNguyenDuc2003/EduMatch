import ScholarshipDetail from '@/@screen/(nondashboard)/ScholarshipDetail';
import React from 'react';

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const page = async ({ params }: PageProps) => {
  const { slug } = await params;

  return <ScholarshipDetail slug={slug} />;
};

export default page;
