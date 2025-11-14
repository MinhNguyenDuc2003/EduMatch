'use client';

import { Button } from '@/lib/cus/button';
import Header from '@/pattern/share/Header';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

const ProviderNews = () => {
  const router = useRouter();
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
    </div>
  );
};

export default ProviderNews;
