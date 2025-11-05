'use client';

import { useState } from 'react';
import CustomDataTable from 'src/common/components/common/CustomDataTable';
import StatisticGrid from 'src/common/components/common/StatisticGrid';
import { CreditCard, CheckCircle, Clock, XCircle } from 'lucide-react';


export default function Subcription() {
  const [filterText, setFilterText] = useState('');

  const transactions = [
    { id: 1, user: 'Nguyễn Đức Minh', amount: 500000, date: '10/28/2025', status: 'Thành công' },
    { id: 2, user: 'Đỗ Minh Hiếu', amount: 250000, date: '10/29/2025', status: 'Đang xử lý' },
    { id: 3, user: 'Võ Tấn Tài', amount: 800000, date: '10/30/2025', status: 'Thất bại' },
  ];

  // 📊 Thống kê
  const totalSubcriptions = transactions.length;
  const success = transactions.filter(t => t.status === 'Thành công').length;
  const pending = transactions.filter(t => t.status === 'Đang xử lý').length;
  const failed = transactions.filter(t => t.status === 'Thất bại').length;

  // 📈 Các ô thống kê
  const stats = [
    {
      title: 'Tổng giao dịch',
      value: totalSubcriptions,
      icon: <CreditCard />,
      color: 'text-blue-600',
      filterName: '', // hiển thị tất cả
    },
    {
      title: 'Thành công',
      value: success,
      icon: <CheckCircle />,
      color: 'text-green-600',
      filterName: 'Thành công',
    },
    {
      title: 'Đang xử lý',
      value: pending,
      icon: <Clock />,
      color: 'text-yellow-500',
      filterName: 'Đang xử lý',
    },
    {
      title: 'Thất bại',
      value: failed,
      icon: <XCircle />,
      color: 'text-red-600',
      filterName: 'Thất bại',
    },
  ];

  // 🧩 Khi click vào card thống kê
  const handleFilterSelect = (filterKey: string) => {
    setFilterText(filterKey);
    console.log('filterText:', filterKey);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 p-6">
      {/* Bộ thống kê */}
      <StatisticGrid stats={stats} onFilterSelect={handleFilterSelect} />

      {/* Bảng dữ liệu */}
      <CustomDataTable
        title="Danh sách giao dịch"
        data={transactions as any}
        customTitles={['ID', 'Người dùng', 'Số tiền (VNĐ)', 'Ngày giao dịch', 'Trạng thái']}
        externalFilterText={filterText} 
      />
    </div>
  );
}
