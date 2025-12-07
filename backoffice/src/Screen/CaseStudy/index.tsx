'use client';

import { CheckCircle, XCircle, Users } from 'lucide-react';
import { useState } from 'react';
import CustomDataTable from 'src/common/components/common/CustomDataTable';
import StatisticGrid from 'src/common/components/common/StatisticGrid';
import Context from './seg/context';

const CaseStudyPage = () => {
  const [filterText, setFilterText] = useState('');

  const handleFilterSelect = (filterKey: string) => {
    setFilterText(filterKey);
  };

  return (
    <Context.Provider>
      <Context.Consumer>
        {({ ss }) => {
          const list = (ss?.Joint?.CaseStudy as any )?.data || [];

          const mappedCaseStudies = list.map((item :  any) => ({
            id: item.id,
            title: item.title,
            userName: item.profileVo?.contactName || 'Unknown',
            verified: item.verified ? 'Verified' : 'Unverified',
            mediaCount: item.medias?.length || 0,
          }));

          const total = mappedCaseStudies.length;
          const verified = mappedCaseStudies.filter((x :  any) => x.verified === 'Verified').length;
          const unverified = mappedCaseStudies.filter((x :  any) => x.verified === 'Unverified').length;

          const stats = [
            {
              title: 'Total Case Studies',
              value: total,
              icon: <Users />,
              color: 'text-blue-600',
              filterName: '',
            },
            {
              title: 'Verified',
              value: verified,
              icon: <CheckCircle />,
              color: 'text-green-600',
              filterName: 'Verified',
            },
            {
              title: 'Unverified',
              value: unverified,
              icon: <XCircle />,
              color: 'text-red-500',
              filterName: 'Unverified',
            },
          ];

          return (
            <div className="flex flex-col min-h-screen bg-gray-100 p-6 space-y-6">
              <StatisticGrid stats={stats} onFilterSelect={handleFilterSelect} />

              <CustomDataTable
                title="Case Studies"
                data={mappedCaseStudies}
                detailPath="/backoffice/caseStudy"
                customTitles={[
                  'ID',
                  'Title',
                  'User Name',
                  'Verified',
                  'Media Count'
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

export default CaseStudyPage;
