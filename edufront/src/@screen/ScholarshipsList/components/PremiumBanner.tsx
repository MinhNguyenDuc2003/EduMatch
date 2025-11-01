import { useState } from 'react';
import { Zap } from 'lucide-react';

export default function PremiumBanner() {
  const [isUpgraded, setIsUpgraded] = useState(false);
  const recommendedCount = 12; // Hardcoded for now

  const handleUpgrade = () => {
    setIsUpgraded(true);
  };

  return (
    <div className="mb-6 relative overflow-hidden rounded-xl p-4 md:p-6 border-2 border-white/20">
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
        {!isUpgraded ? (
          <>
            {/* Mobile Layout: Stacked */}
            <div className="md:hidden space-y-3">
              <div className="inline-block px-2 py-1 bg-white/20 backdrop-blur-sm rounded-md">
                <span className="text-xs font-semibold text-white uppercase tracking-wide">
                  Premium
                </span>
              </div>
              <h3 className="text-white font-bold text-base leading-tight">
                Auto-Match Scholarships
              </h3>
              <p className="text-white/90 text-sm leading-relaxed">
                Upgrade to premium and let AI automatically find scholarships tailored to your
                profile
              </p>
              <button
                onClick={handleUpgrade}
                className="w-full bg-white text-blue-900 font-semibold py-2.5 px-4 rounded-lg hover:bg-gray-100 transition-all duration-200 shadow-lg"
              >
                Upgrade Now
              </button>
            </div>

            {/* Desktop Layout: Horizontal */}
            <div className="hidden md:flex items-center justify-between gap-4">
              <div className="flex items-center gap-4 flex-1">
                <div className="inline-block px-2 py-1 bg-white/20 backdrop-blur-sm rounded-md">
                  <span className="text-xs font-semibold text-white uppercase tracking-wide">
                    Premium
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-bold text-lg mb-1 leading-tight">
                    Auto-Match Scholarships
                  </h3>
                  <p className="text-white/90 text-sm leading-relaxed">
                    Upgrade to premium and let AI automatically find scholarships tailored to your
                    profile
                  </p>
                </div>
              </div>
              <button
                onClick={handleUpgrade}
                className="flex items-center gap-2 bg-white text-blue-900 font-semibold py-2.5 px-6 rounded-lg hover:bg-gray-100 transition-all duration-200 shadow-lg whitespace-nowrap"
              >
                Upgrade Now
              </button>
            </div>
          </>
        ) : (
          <>
            {/* After Upgrade - Mobile */}
            <div className="md:hidden text-center space-y-3">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full mx-auto">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-white font-bold text-xl">
                We Found {recommendedCount} Perfect Matches!
              </h3>
              <p className="text-white/90 text-sm">
                AI has matched you with scholarships tailored to your profile
              </p>
            </div>

            {/* After Upgrade - Desktop */}
            <div className="hidden md:flex items-center justify-center gap-4">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <div className="text-center">
                <h3 className="text-white font-bold text-xl mb-1">
                  We Found {recommendedCount} Perfect Matches!
                </h3>
                <p className="text-white/90 text-sm">
                  AI has matched you with scholarships tailored to your profile
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
