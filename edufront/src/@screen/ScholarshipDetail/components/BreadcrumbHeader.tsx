import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

type BreadcrumbHeaderProps = {
  parentLabel: string;
  parentHref: string;
  currentTitle: string;
};

export default function BreadcrumbHeader({
  parentLabel,
  parentHref,
  currentTitle,
}: BreadcrumbHeaderProps) {
  return (
    <div className="bg-[#00D1FF] px-4 lg:px-40 py-3 border-b border-blue-100">
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <Link
          href={parentHref}
          className="hover:text-blue-600 transition-colors text-gray-700"
        >
          {parentLabel}
        </Link>
        <ChevronRight className="w-4 h-4 text-gray-400" />
        <span className="text-gray-900 font-medium">{currentTitle}</span>
      </div>
    </div>
  );
}

