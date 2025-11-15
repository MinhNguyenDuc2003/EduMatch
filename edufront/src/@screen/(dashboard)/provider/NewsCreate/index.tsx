'use client';

import Header from '@/pattern/share/Header';
import Loading from '@/pattern/share/Loading';
import NewsForm from '@/pattern/share/NewsForm';
import { INews } from '@/lib/schemas';
import { useCreateNewsMutation, useGetProfileQuery } from '@/state/apiProvider';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const NewsCreatePage = () => {
  const router = useRouter();
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [createNews, { isLoading: isLoadingCreateNews }] = useCreateNewsMutation();

  const onSubmit = async (data: INews) => {
    try {
      const formData = new FormData();
      formData.append(
        'news',
        JSON.stringify({
          ...data,
          publishedAt: Date.now(),
        })
      );

      // Append images to FormData
      uploadedImages.forEach((image) => {
        formData.append('images', image);
      });

      await createNews(formData).unwrap();

      // Navigate back to news list after successful creation
      router.push('/provider/news');
    } catch (error) {
      console.error('Error creating news:', error);
      throw error;
    }
  };

  const handleImagesChange = (images: File[]) => {
    setUploadedImages(images);
  };

  return (
    <div className="p-6 lg:p-8 space-y-6 bg-white">
      <Header subtitle="Create a news for your scholarship" title="New News" />

      <NewsForm
        onSubmit={onSubmit}
        onImagesChange={handleImagesChange}
        isLoading={isLoadingCreateNews}
      />
    </div>
  );
};

export default NewsCreatePage;
