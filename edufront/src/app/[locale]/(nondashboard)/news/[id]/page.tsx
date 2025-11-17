import NewsDetailPage from '@/@screen/(nondashboard)/NewsPage/NewsDetailPage';
import React from 'react';

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

const page = async ({ params }: PageProps) => {
  const { id } = await params;

  return <NewsDetailPage newsId={id} />;
};

export default page;
