'use client';
import { MapPin, Mail, Phone, Globe, CheckCircle2 } from 'lucide-react';
import { Button } from '@/pattern/cus/button';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Card } from '@/pattern/cus/card';

type ScholarshipSidebarProps = {
  scholarship: Scholarship;
  isFollowing: boolean;
  onToggleFollow: () => void;
  onViewProvider: (providerId: number) => void;
};

export default function ScholarshipSidebar({
  onViewProvider,
  scholarship,
  isFollowing,
  onToggleFollow,
}: ScholarshipSidebarProps) {
  const provider = scholarship.providerProfileVo;
  const t = useTranslations('scholarshipDetail.sidebar');

  return (
    <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
      {/* University Header */}
      {scholarship.university && (
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            {/* University Icon with Verified Badge */}
            <Card
              className="flex-shrink-0 border border-gray-200 rounded-lg w-12 h-12 relative aspect-square cursor-pointer"
              onClick={() => onViewProvider(provider.id)}
            >
              {provider.logoUrl ? (
                <Image
                  src={provider.logoUrl}
                  alt={provider.organizationName || t('scholarshipLogo')}
                  fill
                  className="rounded-lg object-cover bg-white p-1"
                />
              ) : (
                <Card className="border border-gray-200 w-full h-full rounded-lg flex items-center justify-center relative">
                  <Image
                    src={
                      'https://es5urvh1np.ufs.sh/f/DHR6tEJ9PQoz85HjSO62tcmI7ElP8Ygn01Oa3ze6iFwADrsH'
                    }
                    alt={'logo'}
                    fill
                    className="rounded-lg object-contain bg-white p-2"
                  />
                </Card>
              )}
              {/* Verified Badge - absolute positioned, 3/4 outside */}
              {provider.verified && (
                <div className="absolute -top-1.5 -right-1.5 bg-white rounded-full p-0.5 shadow-md z-10">
                  <CheckCircle2 className="w-5 h-5 text-blue-600" />
                </div>
              )}
            </Card>
            {/* University Name */}
            <div className="flex-1 cursor-pointer" onClick={() => onViewProvider(provider.id)}>
              <h3 className="font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                {scholarship.university}
              </h3>
            </div>
            {/* Follow Button */}
            <Button
              value={isFollowing ? t('following') : t('follow')}
              variant="outline_active"
              size="sm"
              onClick={onToggleFollow}
              className="[&_.value]:text-sm"
            />
          </div>
        </div>
      )}

      {/* Provider Information */}
      <div className="space-y-4">
        {/* Email */}
        {provider.email && (
          <div className="flex items-start gap-3">
            <Mail className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
            <a
              href={`mailto:${provider.email}`}
              className="text-gray-700 text-sm hover:text-blue-600 transition-colors break-all"
            >
              {provider.email}
            </a>
          </div>
        )}

        {/* Phone */}
        {provider.phone && (
          <div className="flex items-start gap-3">
            <Phone className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
            <a
              href={`tel:${provider.phone}`}
              className="text-gray-700 text-sm hover:text-blue-600 transition-colors"
            >
              {provider.phone}
            </a>
          </div>
        )}

        {/* Website */}
        {provider.website && (
          <div className="flex items-start gap-3">
            <Globe className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
            <a
              href={
                provider.website.startsWith('http')
                  ? provider.website
                  : `https://${provider.website}`
              }
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 text-sm hover:text-blue-600 transition-colors break-all"
            >
              {provider.website}
            </a>
          </div>
        )}

        {/* Address Summary */}
        {provider.addressSummary && (
          <div className="flex items-start gap-3">
            <MapPin className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
            <span className="text-gray-700 text-sm">{provider.addressSummary}</span>
          </div>
        )}

        {/* Description */}
        {provider.description && (
          <div className="pt-2 border-t border-gray-200">
            <h4 className="font-semibold text-gray-900 text-sm mb-2">{t('about')}</h4>
            <p className="text-gray-700 text-sm leading-relaxed">{provider.description}</p>
          </div>
        )}
      </div>
    </div>
  );
}
