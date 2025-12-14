import ProviderScholarshipDetail from '@/@screen/(dashboard)/provider/ProviderScholarshipDetail';
import React from 'react';

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const page = async ({ params }: PageProps) => {
  const { slug } = await params;

  return <ProviderScholarshipDetail scholarshipSlug={slug} />;
};

export default page;
