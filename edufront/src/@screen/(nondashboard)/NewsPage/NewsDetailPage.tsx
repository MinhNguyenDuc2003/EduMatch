'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/pattern/cus/button';
import {
  useGetNewsByIdQuery,
  useFollowProviderMutation,
  useUnfollowProviderMutation,
} from '@/state/apiProvider';
import {
  useFollowScholarshipMutation,
  useUnfollowScholarshipMutation,
} from '@/state/apiScholarship';
import { NewsMetadata, NewsContent, NewsSidebar, NewsImages } from './components';
import BreadcrumbHeader from '@/pattern/core/BreadcrumbHeader';
import Loading from '@/pattern/share/Loading';
import { useAuth } from '@/hooks/useAuth';

type NewsDetailPageProps = {
  newsId: string;
};

export default function NewsDetailPage({ newsId }: NewsDetailPageProps) {
  const route = useRouter();
  const { isAuthenticated } = useAuth();

  const router = useRouter();
  const { data: news, isLoading, isError, refetch } = useGetNewsByIdQuery(newsId);
  const [followScholarship] = useFollowScholarshipMutation();
  const [unfollowScholarship] = useUnfollowScholarshipMutation();
  const [followProvider] = useFollowProviderMutation();
  const [unfollowProvider] = useUnfollowProviderMutation();

  const handleToggleTracking = async () => {
    if (!news?.scholarship) return;
    const isTracked = news.scholarship.isFollow === 1;
    try {
      if (isTracked) {
        await unfollowScholarship({
          scholarshipId: news.scholarship.id,
        }).unwrap();
      } else {
        await followScholarship({
          scholarshipId: news.scholarship.id,
        }).unwrap();
      }
      refetch();
    } catch (error) {
      console.log('Failed to toggle tracking:', error);
    }
  };

  const handleToggleFollow = async () => {
    const providerProfileVo = news?.providerProfileVo || news?.scholarship?.providerProfileVo;
    if (!providerProfileVo) return;

    const isFollowing = providerProfileVo.isFollow === 1;
    try {
      if (isFollowing) {
        await unfollowProvider(providerProfileVo.id).unwrap();
      } else {
        await followProvider(providerProfileVo.id).unwrap();
      }
      refetch();
    } catch (error) {
      console.log('Failed to toggle follow provider:', error);
    }
  };

  const handleViewProvider = (providerId: number) => {
    router.push(`/applicant/providers/${providerId}`);
  };

  const handleViewScholarship = (slug: string) => {
    if (isAuthenticated) {
      router.push(`/scholarships/${slug}`);
    } else {
      route.push(`http://159.89.200.244/oauth2/authorization/keycloak`);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (isError || !news) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">News not found</h1>
          <Button value="Back to News" onClick={() => router.push('/news')} variant="outline" />
        </div>
      </div>
    );
  }

  const providerProfileVo = news.providerProfileVo || news.scholarship?.providerProfileVo;
  const isFollowing = providerProfileVo?.isFollow === 1;
  const isTracked = news.scholarship?.isFollow === 1;

  // Format date from timestamp
  const formattedDate = news.publishedAt
    ? (() => {
        try {
          const date = new Date(
            news.publishedAt > 1e12 ? news.publishedAt : news.publishedAt * 1000
          );
          if (isNaN(date.getTime())) return 'N/A';
          return date.toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          });
        } catch {
          return 'N/A';
        }
      })()
    : 'N/A';

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumbs Header */}
      <BreadcrumbHeader items={[{ label: 'News', href: '/news' }, { label: news.title }]} />

      {/* Main Content */}
      <div className="mx-auto px-4 lg:px-40 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {/* Title */}
            <h1 className="text-4xl font-bold text-gray-900">{news.title}</h1>

            {/* Metadata Row */}
            <NewsMetadata formattedDate={formattedDate} isTracked={isTracked} />

            {/* Image */}
            <NewsImages news={news} />

            {/* Content Sections */}
            <NewsContent news={news} />
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 flex flex-col gap-4">
              <NewsSidebar
                news={news}
                isFollowing={isFollowing}
                onToggleFollow={handleToggleFollow}
                onViewProvider={handleViewProvider}
                onToggleTracking={news.scholarship ? handleToggleTracking : undefined}
                onViewScholarship={handleViewScholarship}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
