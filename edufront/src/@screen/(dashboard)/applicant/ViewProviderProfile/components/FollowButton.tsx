'use client';
import { Plus, Minus } from 'lucide-react';
import { Button } from '@/lib/cus/button';
import { useTranslations } from 'next-intl';

interface FollowButtonProps {
  isFollowing: boolean;
  onToggle: () => void;
}

export default function FollowButton({ isFollowing, onToggle }: FollowButtonProps) {
  const t = useTranslations('homepage.viewProviderProfile.followButton');
  
  return (
    <Button
      onClick={onToggle}
      variant="custom"
      iconLeft={
        isFollowing ? (
          <Minus className="w-4 h-4 text-gray-800" />
        ) : (
          <Plus className="w-4 h-4 text-[#3D6CB9]" />
        )
      }
      value={isFollowing ? t('unfollow') : t('follow')}
      hover={false}
      className={`px-4 py-2 rounded-md border ${
        isFollowing
          ? 'bg-gray-200 border-gray-300 [&_.value]:text-gray-800'
          : 'bg-white border-[#3D6CB9] [&_.value]:text-[#3D6CB9]'
      }`}
    />
  );
}

