import NewsUpdate from '@/@screen/(dashboard)/provider/NewsUpdate';
import React from 'react';

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return <NewsUpdate newsId={id} />;
};

export default page;
