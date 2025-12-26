'use client';

import { useRouter } from 'next/navigation';
import {
  NewsHeader,
  NewsCard,
  TopViewedScholarships,
  RecommendedScholarships,
  PremiumBanner,
} from './components';
import {
  useGetAllNewsQuery,
  useFollowProviderMutation,
  useUnfollowProviderMutation,
} from '@/state/apiProvider';
import {
  useGetRecommendedScholarshipsQuery,
  useGetScholarshipTopViewByMonthQuery,
} from '@/state/apiScholarship';
import { useAuth } from '@/hooks/useAuth';
import Loading from '@/pattern/share/Loading';
import EmptyNews from './components/EmptyNews';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { useGetProfileQuery } from '@/state/apiApplicant';

export default function NewsPage() {
  const router = useRouter();
  const tToast = useTranslations('toast');
  const { isAuthenticated, subscriptions } = useAuth();
  // const { data: profile, isLoading: isLoadingProfile } = useGetProfileQuery();
  const { data: newsData, isLoading, refetch } = useGetAllNewsQuery();
  const { data: scholarshipTopView, isLoading: isLoadingScholarshipTopView } =
    useGetScholarshipTopViewByMonthQuery();
  // const hasApplicantSubscription = subscriptions.some(
  //   (subscription) => subscription.userType === 'APPLICANT'
  // );
  // const { data: recommendedScholarships, isLoading: isLoadingRecommended } =
  //   useGetRecommendedScholarshipsQuery(
  //     { profileId: profile?.applicantProfile?.id ?? 0 },
  //     { skip: !hasApplicantSubscription || !profile?.applicantProfile?.id }
  //   );
  const [followProvider] = useFollowProviderMutation();
  const [unfollowProvider] = useUnfollowProviderMutation();

  const handleViewNews = (newsId: number) => {
    router.push(`/news/${newsId}`);
  };

  const handleViewProvider = (providerId: number) => {
    router.push(`/providers/${providerId}`);
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
        toast.success(tToast('followProvider.unfollow'));
      } else {
        await followProvider(providerId).unwrap();
        toast.success(tToast('followProvider.follow'));
      }
      refetch();
    } catch (error) {
      console.log('Failed to toggle follow provider:', error);
      toast.error(tToast('followProvider.followFailed'));
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="h-full bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50/30 px-4 md:px-10 lg:px-40">
      <NewsHeader />

      <section className="py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar - Recommended Scholarships or Premium Banner */}
          {/* <div className="lg:col-span-1 order-2 lg:order-1">
            {hasApplicantSubscription ? (
              <RecommendedScholarships
                scholarships={recommendedScholarships || []}
                isLoading={isLoadingRecommended}
                onViewScholarship={handleViewScholarship}
              />
            ) : (
              <PremiumBanner />
            )}
          </div> */}

          {/* Main Content - News */}
          <div className="space-y-4 lg:col-span-3 order-1 lg:order-2">
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

          {/* Right Sidebar - Top Viewed Scholarships */}
          <div className="lg:col-span-1 order-3">
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
