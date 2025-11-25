import { Skeleton } from '@/lib/cus/skeleton';
import { type LucideIcon } from 'lucide-react';
import React from 'react';

interface StatsCardProps {
  title: string;
  value: number;
  color: string;
  icon: LucideIcon;
}

export const StatsCard = ({ title, value, color, icon: Icon }: StatsCardProps) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <h3 className="text-3xl font-bold text-gray-900 mt-2">{value}</h3>
        </div>
        <div className={`p-3 rounded-lg bg-gradient-to-br ${color} text-white shadow-lg`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
