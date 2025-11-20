'use client';
import { CheckCircle, Clock, GraduationCap, XCircle } from 'lucide-react';
import { useState } from 'react';
import CustomDataTable from 'src/common/components/common/CustomDataTable';
import StatisticGrid from 'src/common/components/common/StatisticGrid';
import Context from './seg/context';
import { useRouter } from 'next/navigation';

const SubscriptionPlanPage = () => {
  const [filterText, setFilterText] = useState('');
  const router = useRouter();
  const handleFilterSelect = (filterKey: string) => {
    setFilterText(filterKey);
  };

  return (
    <Context.Provider>
      <Context.Consumer>
        {({ ss }) => {
          const list = (ss?.Joint?.SubscriptionPlanList as any)?.data || [];
          console.log('list', list);

          const plans =
            list?.map((item: any) => ({
              id: item.id,
              name: item.name,
              description: item.description,
              price: `${item.price} ${item.currency}`,
              duration: `${item.durationDays} days`,
              target: item.targetType,
              features:
                typeof item?.features === 'string' ? item.features.split(',').join(', ') : '—',
            })) || [];

          const total = plans.length;
          const applicant = plans.filter((p: any) => p.target === 'APPLICANT').length;
          const provider = plans.filter((p: any) => p.target === 'PROVIDER').length;
          const user = plans.filter((p: any) => p.target === 'USER').length;

          const stats = [
            {
              title: 'Total Plans',
              value: total,
              icon: <GraduationCap />,
              color: 'text-blue-600',
              filterName: '',
            },
            {
              title: 'Applicant Plans',
              value: applicant,
              icon: <CheckCircle />,
              color: 'text-green-600',
              filterName: 'APPLICANT',
            },
            {
              title: 'Provider Plans',
              value: provider,
              icon: <Clock />,
              color: 'text-yellow-500',
              filterName: 'PROVIDER',
            },
            {
              title: 'User Plans',
              value: user,
              icon: <XCircle />,
              color: 'text-red-600',
              filterName: 'USER',
            },
          ];

          return (
            <div className="flex flex-col min-h-screen bg-gray-100 p-6">
              <StatisticGrid stats={stats} onFilterSelect={handleFilterSelect} />

              <CustomDataTable
                title="Subscription Plan List"
                data={plans as any}
                onCreate={() => router.push('/subscriptionPlan/create')}
                detailPath="/backoffice/subscriptionPlan"
                customTitles={[
                  'ID',
                  'Plan Name',
                  'Description',
                  'Price',
                  'Duration',
                  'Target Type',
                  'Features',
                ]}
                externalFilterText={filterText}
                isCreate
              />
            </div>
          );
        }}
      </Context.Consumer>
    </Context.Provider>
  );
};

export default SubscriptionPlanPage;
