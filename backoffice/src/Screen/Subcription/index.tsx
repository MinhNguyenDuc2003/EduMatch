'use client';
import { CheckCircle, Clock, GraduationCap, XCircle } from 'lucide-react';
import { useState } from 'react';
import CustomDataTable from 'src/common/components/common/CustomDataTable';
import StatisticGrid from 'src/common/components/common/StatisticGrid';
import Context from './seg/context';

const Subcription = () => {
  const [filterText, setFilterText] = useState('');

  const handleFilterSelect = (filterKey: string) => {
    setFilterText(filterKey);
  };

  return (
    <Context.Provider>
      <Context.Consumer>
        {({ ss }) => {
          const list = (ss?.Joint?.SubcriptionList as any)?.data || [];
          console.log('list', list);

          // Map dữ liệu từ API vào định dạng cho bảng
          const Subcriptions =
            list?.map((item: any) => {
              const start = new Date(item.startDate * 1000);
              const end = new Date(item.endDate * 1000);

              // Xác định trạng thái thực tế dựa vào ngày
              let computedStatus = '';
              if (Date.now() < start.getTime()) computedStatus = 'Not Started';
              else if (Date.now() > end.getTime()) computedStatus = 'Expired';
              else computedStatus = 'Active';

              return {
                id: item.id,
                planName: item.plan?.name || '—',
                userType: item.userType || '—',
                price: `${item.plan?.price || 0} ${item.plan?.currency || ''}`,
                duration: `${item.plan?.durationDays || 0} days`,
                startDate: start.toLocaleDateString('en-US'),
                endDate: end.toLocaleDateString('en-US'),
                autoRenew: item.autoRenew ? 'Yes' : 'No',
                status: item.status || computedStatus,
              };
            }) || [];

          // Tính toán thống kê
          const total = Subcriptions.length;
          const active = Subcriptions.filter((s: any) => s.status === 'Active').length;
          const pending = Subcriptions.filter((s: any) => s.status === 'pending').length;
          const expired = Subcriptions.filter((s: any) => s.status === 'Expired').length;

          const stats = [
            {
              title: 'Total Subscriptions',
              value: total,
              icon: <GraduationCap />,
              color: 'text-blue-600',
              filterName: '',
            },
            {
              title: 'Active',
              value: active,
              icon: <CheckCircle />,
              color: 'text-green-600',
              filterName: 'Active',
            },
            {
              title: 'Pending',
              value: pending,
              icon: <Clock />,
              color: 'text-yellow-500',
              filterName: 'pending',
            },
            {
              title: 'Expired',
              value: expired,
              icon: <XCircle />,
              color: 'text-red-600',
              filterName: 'Expired',
            },
          ];

          return (
            <div className="flex flex-col min-h-screen bg-gray-100 p-6">
              <StatisticGrid stats={stats} onFilterSelect={handleFilterSelect} />

              <CustomDataTable
                title="Subscription List"
                data={Subcriptions as any}
                detailPath="/backoffice/subscriptions"
                customTitles={[
                  'ID',
                  'Plan Name',
                  'User Type',
                  'Price',
                  'Duration',
                  'Start Date',
                  'End Date',
                  'Auto Renew',
                  'Status',
                ]}
                externalFilterText={filterText}
              />
            </div>
          );
        }}
      </Context.Consumer>
    </Context.Provider>
  );
};

export default Subcription;
