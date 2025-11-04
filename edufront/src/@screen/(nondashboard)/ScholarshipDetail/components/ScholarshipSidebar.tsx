import { Mail, Phone, MapPin, Globe } from 'lucide-react';
import { Button } from '@/lib/cus/button';

type Organization = {
  name: string;
  email: string;
  phone: string;
  address: string;
  website: string;
};

type ScholarshipSidebarProps = {
  organization: Organization;
  isFollowing: boolean;
  onToggleFollow: () => void;
};

export default function ScholarshipSidebar({
  organization,
  isFollowing,
  onToggleFollow,
}: ScholarshipSidebarProps) {
  return (
    <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 sticky top-24">
      {/* Organization Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          {/* Organization Icon */}
          <div className="w-12 h-12 rounded-md bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-lg font-bold flex-shrink-0">
            {organization.name.charAt(0).toUpperCase()}
          </div>
          {/* Organization Name */}
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900">{organization.name}</h3>
          </div>
          {/* Follow Button */}
          <Button
            value={isFollowing ? 'Following' : 'Follow'}
            variant="outline_active"
            size="sm"
            onClick={onToggleFollow}
            className="[&_.value]:text-sm"
          />
        </div>
      </div>

      {/* Contact Information */}
      <div className="space-y-4 mb-6">
        {/* Email */}
        <div className="flex items-start gap-3">
          <Mail className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
          <a
            href={`mailto:${organization.email}`}
            className="text-gray-700 hover:text-blue-600 transition-colors break-all"
          >
            {organization.email}
          </a>
        </div>

        {/* Phone */}
        <div className="flex items-start gap-3">
          <Phone className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
          <a
            href={`tel:${organization.phone}`}
            className="text-gray-700 hover:text-blue-600 transition-colors"
          >
            {organization.phone}
          </a>
        </div>
      </div>

      {/* Location */}
      <div className="mb-6">
        <div className="flex items-start gap-3">
          <MapPin className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
          <span className="text-gray-700">{organization.address}</span>
        </div>
      </div>

      {/* Website */}
      <div>
        <div className="flex items-start gap-3">
          <Globe className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
          <a
            href={organization.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 hover:text-blue-600 transition-colors break-all"
          >
            {organization.website}
          </a>
        </div>
      </div>
    </div>
  );
}

