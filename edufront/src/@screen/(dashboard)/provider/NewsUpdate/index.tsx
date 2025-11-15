'use client';

import { INews } from '@/lib/schemas';
import Header from '@/pattern/share/Header';
import Loading from '@/pattern/share/Loading';
import NewsForm from '@/pattern/share/NewsForm';
import {
  useDeleteNewsImageMutation,
  useGetNewsByIdQuery,
  useUpdateNewsMutation,
  useUploadNewsImagesMutation,
} from '@/state/apiProvider';
import { useRouter } from 'next/navigation';
import React from 'react';

const NewsUpdate = ({ newsId }: { newsId: string }) => {
  const router = useRouter();
  const { data: news, isLoading: isLoadingNews } = useGetNewsByIdQuery(newsId);
  const [updateNews, { isLoading: isLoadingUpdateNews }] = useUpdateNewsMutation();
  const [uploadImages, { isLoading: isLoadingUploadImages }] = useUploadNewsImagesMutation();
  const [deleteImage, { isLoading: isLoadingDeleteImage }] = useDeleteNewsImageMutation();

  const onSubmit = async (data: INews) => {
    try {
      await updateNews(data).unwrap();
      router.push('/provider/news');
    } catch (error) {
      console.log('Error updating news:', error);
    }
  };

  const handleImagesChange = async (images: File[]) => {
    const formData = new FormData();
    images.forEach((image) => {
      formData.append('mediaFiles', image);
    });
    await uploadImages({ newsId, formData }).unwrap();
  };

  const handleDeleteImage = async (imageId: number) => {
    await deleteImage({ newsId, imagesId: [imageId] }).unwrap();
  };

  if (isLoadingNews) {
    return <Loading />;
  }

  return (
    <div className="p-6 lg:p-8 space-y-6 bg-white">
      <Header subtitle="Update news" title="Update News" />
      <NewsForm
        onSubmit={onSubmit}
        onImagesChange={handleImagesChange}
        onDeleteImage={handleDeleteImage}
        news={news}
        isLoading={isLoadingUpdateNews}
      />
    </div>
  );
};

export default NewsUpdate;
