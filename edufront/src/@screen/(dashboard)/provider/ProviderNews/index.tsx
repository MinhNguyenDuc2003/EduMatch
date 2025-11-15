'use client';

import { Button } from '@/lib/cus/button';
import Header from '@/pattern/share/Header';
import { useDeleteNewsMutation, useGetNewsQuery } from '@/state/apiProvider';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';
import NewsCard, { NewsCardSkeleton } from './components/NewsCard';
import { toast } from 'sonner';

const ProviderNews = () => {
  const router = useRouter();
  const { data: news, isLoading: isLoadingNews } = useGetNewsQuery();

  const [deleteNews, { isLoading: isDeletingNews }] = useDeleteNewsMutation();
  const handleDeleteNews = async (id: number) => {
    await deleteNews(id)
      .unwrap()
      .then(() => {
        toast.success('News deleted successfully');
      })
      .catch(() => {
        toast.error('Failed to delete news');
      });
  };

  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Header */}
      <Header
        subtitle="Manage your scholarship News"
        title="News"
        rightElement={
          <Button
            onClick={() => router.push('/provider/news/create')}
            className="bg-primary-brand text-white hover:bg-primary-brand/90 shadow-sm"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create a News
          </Button>
        }
      />

      {/* News List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {isLoadingNews &&
          Array.from({ length: 10 }).map((_, index) => <NewsCardSkeleton key={index} />)}
        {!isLoadingNews &&
          news &&
          news.length > 0 &&
          news.map((news) => <NewsCard key={news.id} news={news} onDelete={handleDeleteNews} />)}
      </div>
    </div>
  );
};

export default ProviderNews;
