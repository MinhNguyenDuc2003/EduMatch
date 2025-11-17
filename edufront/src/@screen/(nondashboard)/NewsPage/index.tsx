'use client';

import { useRouter } from 'next/navigation';
import { NewsHeader, NewsCard } from './components';
import {
  useGetAllNewsQuery,
  useFollowProviderMutation,
  useUnfollowProviderMutation,
} from '@/state/apiProvider';
import {
  useFollowScholarshipMutation,
  useUnfollowScholarshipMutation,
} from '@/state/apiScholarship';
import { useAuth } from '@/hooks/useAuth';
import Loading from '@/pattern/share/Loading';
import { Newspaper } from 'lucide-react';

export default function NewsPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { data: newsData, isLoading, refetch } = useGetAllNewsQuery();
  const [followProvider] = useFollowProviderMutation();
  const [unfollowProvider] = useUnfollowProviderMutation();
  const [followScholarship] = useFollowScholarshipMutation();
  const [unfollowScholarship] = useUnfollowScholarshipMutation();

  const handleViewNews = (newsId: number) => {
    router.push(`/news/${newsId}`);
  };

  const handleViewProvider = (providerId: number) => {
    router.push(`/applicant/providers/${providerId}`);
  };

  const handleViewScholarship = (slug?: string) => {
    if (slug) {
      router.push(`/scholarships/${slug}`);
    }
  };

  const handleFollowProvider = async (providerId: number) => {
    const news = newsData?.find(
      (n) =>
        n.providerProfileVo?.id === providerId ||
        n.scholarship?.providerProfileVo?.id === providerId
    );
    if (!news) return;

    const providerProfileVo = news.providerProfileVo || news.scholarship?.providerProfileVo;
    const isFollowing = providerProfileVo?.isFollow === 1;

    try {
      if (isFollowing) {
        await unfollowProvider(providerId).unwrap();
      } else {
        await followProvider(providerId).unwrap();
      }
      refetch();
    } catch (error) {
      console.log('Failed to toggle follow provider:', error);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (!newsData || newsData.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
        <NewsHeader />
        <section className="py-8 px-4 md:px-10 lg:px-40">
          <div className="max-w-[800px] mx-auto">
            <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-200 bg-white px-8 py-20 text-center shadow-sm">
              <div className="mb-6 rounded-full bg-slate-50 p-6">
                <Newspaper className="h-12 w-12 text-slate-400" />
              </div>
              <h2 className="mb-3 text-xl font-bold text-slate-800">No news available</h2>
              <p className="max-w-md text-sm leading-relaxed text-slate-600">
                There are no news articles at the moment. Check back later for updates and new
                content.
              </p>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50/30">
      <NewsHeader />

      <section className="py-8 px-4 md:px-10 lg:px-40">
        <div className="max-w-[800px] mx-auto">
          <div className="space-y-4">
            {newsData.map((news) => (
              <NewsCard
                key={news.id}
                news={news}
                onViewNews={handleViewNews}
                onViewProvider={handleViewProvider}
                onFollowProvider={handleFollowProvider}
                onViewScholarship={handleViewScholarship}
                isAuthenticated={isAuthenticated}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
