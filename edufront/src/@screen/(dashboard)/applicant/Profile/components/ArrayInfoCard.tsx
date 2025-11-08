'use client';

import React from 'react';
import { Pencil, Plus } from 'lucide-react';
import { Button } from '@/lib/cus/button';

interface ArrayItem {
  [key: string]: any;
}

interface ArrayInfoCardProps {
  title: string;
  items?: ArrayItem[];
  renderItem: (item: ArrayItem, index: number) => React.ReactNode;
  emptyMessage?: string;
  onEdit?: () => void;
  className?: string;
}

export default function ArrayInfoCard({
  title,
  items,
  renderItem,
  emptyMessage = 'No items added yet',
  onEdit,
  className,
}: ArrayInfoCardProps) {
  const hasItems = items && items.length > 0;

  return (
    <div className={`bg-[#FAFAF6] rounded-lg border border-[#828282] p-6 relative ${className}`}>
      {/* Header with Edit/Add Buttons */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
        <div className="flex items-center gap-2">
          {onEdit && (
            <Button
              variant="custom"
              className="bg-[#00B8D9] text-white px-3 py-1 rounded-md text-xs font-medium flex items-center gap-1 hover:bg-[#00A3C4]"
              onClick={onEdit}
            >
              <Pencil className="w-3 h-3" />
              Edit
            </Button>
          )}
        </div>
      </div>

      {/* Items List */}
      <div className="space-y-4 overflow-y-auto ">
        {hasItems ? (
          items.map((item, index) => (
            <div key={index} className="pb-3 border-b border-gray-200 last:border-0 last:pb-0">
              {renderItem(item, index)}
            </div>
          ))
        ) : (
          <div className="text-sm text-gray-400 italic py-2">{emptyMessage}</div>
        )}
      </div>
    </div>
  );
}
