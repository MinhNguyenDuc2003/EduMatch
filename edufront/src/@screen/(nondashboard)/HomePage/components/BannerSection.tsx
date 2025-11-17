import { Button } from '@/lib/cus/button';
import Image from 'next/image';
import {
  GraduationCap,
  BookOpen,
  Award,
  TrendingUp,
  Globe,
  Sparkles,
  Star,
  Users,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

export default function BannerSection() {
  const router = useRouter();
  const t = useTranslations('homepage.banner');

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-200 via-indigo-200 to-purple-200">
      {/* Background Pattern */}

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Section - Banner Content */}
          <div className="space-y-8 z-10">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-blue-200 shadow-sm">
              <span className="text-sm font-medium text-blue-900">{t('badge')}</span>
            </div>

            {/* Heading */}
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight tracking-tight">
                {t('title')}{' '}
                <span className="relative inline-block">
                  <span className="relative z-10 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    {t('titleHighlight')}
                  </span>
                  <svg
                    className="absolute -bottom-2 left-0 w-full"
                    height="12"
                    viewBox="0 0 200 12"
                    fill="none"
                  >
                    <path
                      d="M2 10C50 5 100 5 198 10"
                      stroke="url(#gradient)"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#3B82F6" />
                        <stop offset="50%" stopColor="#6366F1" />
                        <stop offset="100%" stopColor="#8B5CF6" />
                      </linearGradient>
                    </defs>
                  </svg>
                </span>{' '}
                {t('titleEnd')}
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-xl">{t('description')}</p>
            </div>

            {/* CTA Button */}
            <div className="flex flex-wrap gap-4">
              <Button
                variant="custom"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all [&_.value]:text-white"
                value={t('exploreScholarships')}
                onClick={() => router.push('/scholarships')}
              />
              <Button
                variant="custom"
                className="bg-white/80 backdrop-blur-sm border-2 border-gray-200 hover:border-blue-300 text-gray-700 px-8 py-6 text-lg font-semibold rounded-xl shadow-sm hover:shadow-md transition-all [&_.value]:text-gray-700"
                value={t('howItWorks')}
              />
            </div>
          </div>

          {/* Right Section - Illustration */}
          <div className="relative lg:h-[600px] h-96 flex items-center justify-center">
            {/* Main Circle - Background */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[500px] h-[500px] rounded-full bg-gradient-to-br from-blue-400/20 via-indigo-400/20 to-purple-400/20 animate-pulse" />
            </div>

            {/* Image - Centered */}
            <div className="absolute bottom-0 -translate-y-1/3 left-1/2 -translate-x-1/2 z-20">
              <div className="relative w-96 h-96 rounded-2xl overflow-hidden">
                <Image
                  src="https://cl2h8yilb0.ufs.sh/f/9iOVh1BwOhmuTL4YymgyGNugpcXndArbzQ90R1wZqIk5B2Lt"
                  alt="Student Success"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
