'use client';

import Image from 'next/image';
import { Mail, Phone, BadgeCheck } from 'lucide-react';
import { useGetProviderProfileByIdQuery } from '@/state/apiProvider';
import { Button } from '@/pattern/cus/button';
import { useTranslations } from 'next-intl';

type ProviderCardProps = {
  provider: ProviderProfile;
  onViewDetails?: () => void;
  onUnfollow?: () => void;
};

export default function ProviderCard({ provider, onViewDetails, onUnfollow }: ProviderCardProps) {
  const t = useTranslations('activity.providerCard');
  const { organizationName, email, phone, logoUrl, bannerUrl, verified } = provider;

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-lg">
      {/* Banner Section */}
      <div
        className="relative h-18 w-full overflow-hidden bg-slate-50 hover:cursor-pointer"
        onClick={onViewDetails}
      >
        {bannerUrl ? (
          <Image
            src={bannerUrl}
            alt={organizationName}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          // Checkered pattern placeholder
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(45deg, #f1f5f9 25%, transparent 25%),
                linear-gradient(-45deg, #f1f5f9 25%, transparent 25%),
                linear-gradient(45deg, transparent 75%, #f1f5f9 75%),
                linear-gradient(-45deg, transparent 75%, #f1f5f9 75%)
              `,
              backgroundSize: '20px 20px',
              backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
            }}
          />
        )}
      </div>

      <div
        className="absolute h-16 hover:cursor-pointer flex items-end gap-3 left-5 z-10"
        style={{ top: 'calc(0.5rem + 5rem - 2rem)' }}
        onClick={onViewDetails}
      >
        {logoUrl && (
          <div className="relative w-16 h-16 flex-shrink-0 rounded-lg border-4 border-white bg-white shadow-lg overflow-hidden">
            <Image
              src={logoUrl}
              alt={`${organizationName} logo`}
              fill
              className="object-cover"
              sizes="64px"
            />
          </div>
        )}
        <div className="flex items-center gap-2 min-w-0 pb-1">
          <h3
            className="text-lg font-bold text-slate-900 cursor-pointer hover:text-blue-600 transition-colors"
            onClick={onViewDetails}
          >
            {organizationName ? organizationName : `Provider #${provider.id}`}
          </h3>
          {verified && (
            <BadgeCheck className="h-5 w-5 text-blue-500 flex-shrink-0" aria-label={t('verified')} />
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className={`flex flex-1 flex-col p-5 pt-16`}>
        {/* Phone */}
        {phone && (
          <div className="mb-3 flex items-center gap-2">
            <Phone className="h-4 w-4 flex-shrink-0 text-slate-400" />
            <span className="text-sm text-slate-600">{phone}</span>
          </div>
        )}

        {/* Email */}
        {email && (
          <div className="mb-4 flex items-center gap-2">
            <Mail className="h-4 w-4 flex-shrink-0 text-slate-400" />
            <span className="text-sm text-slate-600">{email}</span>
          </div>
        )}
        {/* Unfollow Button */}
        {onUnfollow && (
          <div className="pt-2 border-t border-slate-300">
            <Button
              variant="outline_back"
              size="sm"
              full
              shadown={false}
              hover={false}
              className="text-slate-600"
              value={t('unfollow')}
              onClick={(e) => {
                e.stopPropagation();
                onUnfollow();
              }}
            />
          </div>
        )}
      </div>
    </article>
  );
}
