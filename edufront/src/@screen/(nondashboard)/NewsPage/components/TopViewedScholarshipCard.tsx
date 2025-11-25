import Image from 'next/image';

interface TopViewedScholarshipCardProps {
  scholarship: Scholarship;
  onViewDetails?: () => void;
}

export default function TopViewedScholarshipCard({
  scholarship,
  onViewDetails,
}: TopViewedScholarshipCardProps) {
  const { title, shortDescription } = scholarship;
  const { logoUrl, organizationName } = scholarship.providerProfileVo;

  return (
    <div
      className="px-4 py-3 hover:bg-blue-100/50 transition-colors cursor-pointer group"
      onClick={onViewDetails}
    >
      {/* Logo and Organization Name - Horizontal */}
      <div className="flex items-center gap-2.5 mb-2">
        {/* Logo */}
        <div className=" w-8 h-8 border border-gray-200 rounded-full relative">
          {logoUrl ? (
            <Image
              src={logoUrl}
              alt={organizationName || 'Organization logo'}
              fill
              className="rounded-full object-cover ring-1 ring-gray-100"
            />
          ) : (
            <div className="w-8 h-8 rounded-full flex items-center justify-center">
              <Image
                src="https://es5urvh1np.ufs.sh/f/DHR6tEJ9PQoz85HjSO62tcmI7ElP8Ygn01Oa3ze6iFwADrsH"
                alt="logo"
                fill
                className="rounded-full object-contain"
              />
            </div>
          )}
        </div>
        {/* Organization Name */}
        <p className="text-sm text-gray-600 line-clamp-1 font-medium">{organizationName || ''}</p>
      </div>

      <div className="flex flex-col">
        <h3 className="text-base font-semibold text-gray-900 leading-snug line-clamp-2 mb-1.5 group-hover:text-blue-600 transition-colors">
          {title || ''}
        </h3>
        {shortDescription && (
          <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">{shortDescription}</p>
        )}
      </div>
    </div>
  );
}
