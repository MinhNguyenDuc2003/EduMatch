import React from 'react';
import Link from 'next/link';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/lib/cus/breadcrumb';
import { cn } from '@/lib/utils';

export type BreadcrumbItemType = {
  label: string;
  href?: string;
};

type BreadcrumbHeaderProps = {
  items: BreadcrumbItemType[];
  className?: string;
};

export default function BreadcrumbHeader({ items, className = '' }: BreadcrumbHeaderProps) {
  return (
    <div className={cn(`bg-[#00D1FF] px-4 lg:px-40 py-2 border-b border-gray-200`, className)}>
      <Breadcrumb>
        <BreadcrumbList>
          {/* Breadcrumb Items */}
          {items.map((item, index) => {
            const isLast = index === items.length - 1;

            return (
              <React.Fragment key={index}>
                <BreadcrumbItem>
                  {isLast ? (
                    <BreadcrumbPage className="text-gray-900 font-semibold">
                      {item.label}
                    </BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Link
                        href={item.href || '#'}
                        className="text-gray-600 hover:text-blue-600 transition-colors"
                      >
                        {item.label}
                      </Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {!isLast && <BreadcrumbSeparator />}
              </React.Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
