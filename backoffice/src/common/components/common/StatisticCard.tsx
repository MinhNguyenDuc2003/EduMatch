'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

interface StatisticCardProps {
  title?: string;
  value?: string | number;
  icon?: ReactNode;
  color?: string;
  onClick?: () => void; // ✅ thêm dòng này
}

export default function StatisticCard({ title, value, icon, color, onClick }: StatisticCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      onClick={onClick} // ✅ gán event click
      className={twMerge(
        'bg-white shadow rounded-2xl p-5 flex flex-col items-center justify-center text-center transition-all cursor-pointer hover:shadow-lg'
      )}
    >
      {icon && <div className="text-3xl mb-2">{icon}</div>}
      <h2 className="text-lg font-semibold text-gray-700">{title}</h2>
      <p className={twMerge('text-3xl font-bold mt-2', color || 'text-blue-600')}>{value}</p>
    </motion.div>
  );
}
