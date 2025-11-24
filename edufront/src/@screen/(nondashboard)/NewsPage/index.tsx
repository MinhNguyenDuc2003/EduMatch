'use client';

import { useRouter } from 'next/navigation';
import { NewsHeader, NewsCard, TopViewedScholarships } from './components';
import {
  useGetAllNewsQuery,
  useFollowProviderMutation,
  useUnfollowProviderMutation,
} from '@/state/apiProvider';
import { useGetScholarshipTopViewByMonthQuery } from '@/state/apiScholarship';
import { useAuth } from '@/hooks/useAuth';
import Loading from '@/pattern/share/Loading';
import { useTranslations } from 'next-intl';
import EmptyNews from './components/EmptyNews';

export default function NewsPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { data: newsData, isLoading, refetch } = useGetAllNewsQuery();
  const { data: scholarshipTopView, isLoading: isLoadingScholarshipTopView } =
    useGetScholarshipTopViewByMonthQuery();
  const [followProvider] = useFollowProviderMutation();
  const [unfollowProvider] = useUnfollowProviderMutation();

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50/30 px-4 md:px-10 lg:px-40">
      <NewsHeader />

      <section className="py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="space-y-4 lg:col-span-2">
            {!newsData || newsData.length === 0 ? (
              <EmptyNews />
            ) : (
              newsData?.map((news) => (
                <NewsCard
                  key={news.id}
                  news={news}
                  onViewNews={handleViewNews}
                  onViewProvider={handleViewProvider}
                  onFollowProvider={handleFollowProvider}
                  onViewScholarship={handleViewScholarship}
                  isAuthenticated={isAuthenticated}
                />
              ))
            )}
          </div>
          {/* Top Viewed Scholarships Sidebar */}
          <div className="lg:col-span-1 ">
            <TopViewedScholarships
              scholarships={scholarshipTopView || []}
              isLoading={isLoadingScholarshipTopView}
              onViewScholarship={handleViewScholarship}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
