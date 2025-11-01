import { Camera, Globe, Mail, Phone } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { IProviderProfile } from '@/lib/schemas';
import { ProviderProfile } from '../types';

interface ProfileHeaderProps {
  currentData?: ProviderProfile;
  onBannerUpload?: (file: File) => void;
  onProfileUpload?: (file: File) => void;
  isEdit?: boolean;
}

const ProfileHeader = ({
  currentData,
  onBannerUpload,
  onProfileUpload,
  isEdit = false,
}: ProfileHeaderProps) => {
  const [bannerPreview, setBannerPreview] = useState<string | null>(currentData?.bannerUrl || null);
  const [profilePreview, setProfilePreview] = useState<string | null>(currentData?.logoUrl || null);
  const bannerInputRef = useRef<HTMLInputElement>(null);
  const profileInputRef = useRef<HTMLInputElement>(null);

  // Update previews when currentData changes
  useEffect(() => {
    if (currentData?.bannerUrl) {
      setBannerPreview(currentData.bannerUrl);
    }
    if (currentData?.logoUrl) {
      setProfilePreview(currentData.logoUrl);
    }
  }, [currentData?.bannerUrl, currentData?.logoUrl]);

  const handleBannerClick = () => {
    bannerInputRef.current?.click();
  };

  const handleProfileClick = () => {
    profileInputRef.current?.click();
  };

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBannerPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      onBannerUpload?.(file);
    }
  };

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      onProfileUpload?.(file);
    }
  };

  return (
    <div className="relative ">
      {/* Hidden file inputs */}
      <input
        ref={bannerInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleBannerChange}
      />
      <input
        ref={profileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleProfileChange}
      />

      {/* Banner background */}
      <div
        className={`h-32 w-full rounded-t-lg ${isEdit ? 'cursor-pointer' : ''} group relative overflow-hidden`}
        onClick={isEdit ? handleBannerClick : undefined}
        style={
          bannerPreview
            ? {
                backgroundImage: `url(${bannerPreview})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }
            : {
                background: `
                  repeating-conic-gradient(#8B8B8B 0% 25%, #A8A8A8 0% 50%) 
                  50% / 40px 40px
                `,
              }
        }
      >
        {/* Upload overlay */}
        {isEdit && (
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <div className="text-white flex flex-col items-center gap-2">
              <Camera className="w-8 h-8" />
              <span className="text-sm font-medium">Upload Banner</span>
            </div>
          </div>
        )}
      </div>

      {/* Profile image */}
      <div
        className={`w-32 h-32 bg-gray-300 rounded-lg flex-shrink-0 border-4 border-white absolute left-1/2 -translate-x-1/2 md:-translate-x-0 top-16 md:left-16 ${isEdit ? 'cursor-pointer' : ''} group overflow-hidden`}
        onClick={isEdit ? handleProfileClick : undefined}
        style={
          profilePreview
            ? {
                backgroundImage: `url(${profilePreview})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }
            : {}
        }
      >
        {/* Upload overlay */}
        {isEdit && (
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <div className="text-white flex flex-col items-center gap-1">
              <Camera className="w-6 h-6" />
              <span className="text-xs font-medium">Upload</span>
            </div>
          </div>
        )}
      </div>

      {/* Blue header section */}
      <div className="bg-gradient-to-r from-[#1B3053] to-[#3D6CB9] md:px-64 md:py-6 px-8 pb-6 pt-16 rounded-b-lg">
        <div className="flex items-center md:justify-start justify-center">
          {/* Profile Info */}
          <div className="text-white">
            <h1 className="text-2xl font-bold mb-3 line-clamp-1">
              {currentData?.organizationName || 'Organization Name'}
            </h1>
            <div className="space-y-2 grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span className="text-sm">{currentData?.email || 'N/A'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span className="text-sm">{currentData?.phone || 'N/A'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                <span className="text-sm">{currentData?.website || 'N/A'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
