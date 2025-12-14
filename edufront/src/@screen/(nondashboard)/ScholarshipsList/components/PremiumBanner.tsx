'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Zap } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useGetRecommendedScholarshipsQuery } from '@/state/apiScholarship';
import { useAuth } from '@/hooks/useAuth';
import ProfileStrengthDialog from './ProfileStrengthDialog';
import Loading from '@/pattern/share/Loading';

export default function PremiumBanner() {
  const router = useRouter();
  const [isUpgraded, setIsUpgraded] = useState(false);
  const [showProfileDialog, setShowProfileDialog] = useState(false);
  const t = useTranslations('scholarshipsList.premiumBanner');
  const { isAuthenticated, subscriptions, isApplicant } = useAuth();
  const { data: scholarships, isLoading } = useGetRecommendedScholarshipsQuery(
    { topK: 10 },
    { skip: isUpgraded === false || !isApplicant }
  );

  useEffect(() => {
    if (subscriptions.some((subscription) => subscription.userType === 'APPLICANT')) {
      setIsUpgraded(true);
    }
  }, [subscriptions]);

  const handleUpdate = () => {
    if (!isAuthenticated) {
      window.location.href = 'http://159.89.200.244/oauth2/authorization/keycloak';
    } else {
      if (!isApplicant) {
        setShowProfileDialog(true);
      } else if (isUpgraded) {
        router.push('/recommended-scholarships');
      } else {
        router.push('/subscriptions?type=APPLICANT');
      }
    }
  };

  return (
    <div
      className={`mb-4 relative overflow-hidden rounded-xl p-4 md:p-6 border-2 border-white/20 ${
        isUpgraded
          ? 'transition-all duration-300 hover:shadow-xl hover:scale-[1.02] cursor-pointer'
          : ''
      }`}
    >
      {/* Static gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-800 via-blue-700 to-slate-800"></div>

      {/* Decorative curved lines overlay */}
      <svg
        className="absolute inset-0 w-full h-full opacity-20"
        viewBox="0 0 400 200"
        preserveAspectRatio="none"
      >
        <path
          d="M0,100 Q100,30 200,100 T400,100"
          stroke="white"
          strokeWidth="1"
          fill="none"
          className="animate-pulse"
        />
        <path
          d="M0,120 Q150,50 300,120 T400,120"
          stroke="white"
          strokeWidth="1"
          fill="none"
          className="animate-pulse"
          style={{ animationDelay: '1s' }}
        />
        <path
          d="M0,80 Q120,140 240,80 T400,80"
          stroke="white"
          strokeWidth="1"
          fill="none"
          className="animate-pulse"
          style={{ animationDelay: '2s' }}
        />
      </svg>

      {/* Content */}
      <div className="relative z-10">
        {isUpgraded ? (
          <>
            {/* After Upgrade - Mobile */}
            <div className="md:hidden text-center space-y-3" onClick={handleUpdate}>
              <h3 className="text-white font-bold text-xl">
                {t('foundMatches', { count: scholarships?.length ?? 0 })}
              </h3>
              <p className="text-white/90 text-sm">{t('matchedDescription')}</p>
              <p className="text-white/90 italic text-sm leading-relaxed mb-1">
                &#40;{t('clickHere')}&#41;
              </p>
            </div>

            {/* After Upgrade - Desktop */}
            <div className="hidden md:flex items-center gap-4" onClick={handleUpdate}>
              <div>
                <h3 className="text-white font-bold text-xl mb-1">
                  {isLoading
                    ? t('loadingMatches')
                    : t('foundMatches', { count: scholarships?.length ?? 0 })}
                </h3>
                <p className="text-white/90 text-sm mb-1">{t('matchedDescription')}</p>
                <p className="text-white/90 italic text-sm leading-relaxed">
                  &#40;{t('clickHere')}&#41;
                </p>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Mobile Layout: Stacked */}
            <div className="md:hidden space-y-3">
              <div className="inline-block px-2 py-1 bg-white/20 backdrop-blur-sm rounded-md">
                <span className="text-xs font-semibold text-white uppercase tracking-wide">
                  {t('badge')}
                </span>
              </div>
              <h3 className="text-white font-bold text-base leading-tight">{t('title')}</h3>
              <p className="text-white/90 text-sm leading-relaxed">{t('description')}</p>
              <button
                onClick={handleUpdate}
                className="w-full bg-white text-blue-900 font-semibold py-2.5 px-4 rounded-lg hover:bg-gray-100 transition-all duration-200 shadow-lg"
              >
                {t('updateNow')}
              </button>
            </div>

            {/* Desktop Layout: Horizontal */}
            <div className="hidden md:flex items-center justify-between gap-4">
              <div className="flex items-center gap-2 flex-1">
                <div className="px-2 py-1 w-fit bg-white/20 backdrop-blur-sm rounded-md">
                  <span className="text-xs font-semibold text-white uppercase tracking-wide">
                    {t('badge')}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-bold text-base mb-1 leading-tight">
                    {t('title')}
                  </h3>
                  <p className="text-white/90 text-sm leading-relaxed">{t('description')}</p>
                </div>
              </div>
              <button
                onClick={handleUpdate}
                className="flex items-center text-sm gap-2 bg-white text-blue-900 font-semibold py-2 px-4 rounded-lg hover:cursor-pointer hover:bg-gray-100 transition-all duration-200 shadow-lg whitespace-nowrap"
              >
                {t('updateNow')}
              </button>
            </div>
          </>
        )}
      </div>

      {/* Profile Strength Dialog */}
      <ProfileStrengthDialog open={showProfileDialog} onOpenChange={setShowProfileDialog} />
    </div>
  );
}
