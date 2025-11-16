'use client';

import Header from '@/pattern/share/Header';
import Loading from '@/pattern/share/Loading';
import NewsForm from '@/pattern/share/NewsForm';
import { INews } from '@/lib/schemas';
import { useCreateNewsMutation, useGetProfileQuery } from '@/state/apiProvider';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useTranslations } from 'next-intl';

const NewsCreatePage = () => {
  const router = useRouter();
  const t = useTranslations('providerNews');
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
      console.error(t('errorCreatingNews'), error);
      throw error;
    }
  };

  const handleImagesChange = (images: File[]) => {
    setUploadedImages(images);
  };

  return (
    <div className="p-6 lg:p-8 space-y-6 bg-white">
      <Header subtitle={t('subtitleCreateNews')} title={t('newNews')} />

      <NewsForm
        onSubmit={onSubmit}
        onImagesChange={handleImagesChange}
        isLoading={isLoadingCreateNews}
      />
    </div>
  );
};

export default NewsCreatePage;
