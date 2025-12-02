'use client';
import { useRouter } from 'next/navigation';
import { Zap } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function PremiumBanner() {
  const router = useRouter();
  const t = useTranslations('newsPage.premiumBanner');

  const handleUpgrade = () => {
    router.push('/subscriptions?type=APPLICANT');
  };

  return (
    <div className="sticky top-20 mb-4 overflow-hidden rounded-xl p-3 md:p-4 border-2 border-white/20">
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
        {/* Mobile Layout: Stacked */}
        <div className="md:hidden space-y-2">
          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-white/20 backdrop-blur-sm rounded-md">
            <Zap className="w-2.5 h-2.5 text-white" />
            <span className="text-[10px] font-semibold text-white uppercase tracking-wide">
              {t('badge') || 'PREMIUM'}
            </span>
          </div>
          <h3 className="text-white font-bold text-sm leading-tight">
            {t('title2') || 'Nâng cấp Premium để xem học bổng đề xuất'}
          </h3>
          <p className="text-white/90 text-xs leading-relaxed">
            {t('description2') || 'Nhận các đề xuất học bổng phù hợp với hồ sơ của bạn'}
          </p>
          <button
            onClick={handleUpgrade}
            className="w-full bg-white text-blue-900 font-semibold py-2 px-3 text-xs rounded-lg hover:bg-gray-100 transition-all duration-200 shadow-lg"
          >
            {t('upgradeNow') || 'Nâng cấp ngay'}
          </button>
        </div>

        {/* Desktop Layout: Vertical */}
        <div className="hidden md:flex flex-col space-y-3">
          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-white/20 backdrop-blur-sm rounded-md w-fit">
            <Zap className="w-2.5 h-2.5 text-white" />
            <span className="text-[10px] font-semibold text-white uppercase tracking-wide">
              {t('badge') || 'PREMIUM'}
            </span>
          </div>
          <div>
            <h3 className="text-white font-bold text-base mb-1.5 leading-tight">
              {t('title2') || 'Nâng cấp Premium để xem học bổng đề xuất'}
            </h3>
            <p className="text-white/90 text-sm leading-relaxed mb-3">
              {t('description2') || 'Nhận các đề xuất học bổng phù hợp với hồ sơ của bạn'}
            </p>
          </div>
          <button
            onClick={handleUpgrade}
            className="flex items-center justify-center gap-1.5 bg-white text-blue-900 font-semibold py-2 px-4 text-sm rounded-lg hover:cursor-pointer hover:bg-gray-100 transition-all duration-200 shadow-lg w-full"
          >
            {t('upgradeNow') || 'Nâng cấp ngay'}
          </button>
        </div>
      </div>
    </div>
  );
}
