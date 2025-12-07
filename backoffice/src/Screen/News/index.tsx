'use client';

import { ImageIcon, ImageOff, Newspaper } from 'lucide-react';
import { useState } from 'react';
import CustomDataTable from 'src/common/components/common/CustomDataTable';
import StatisticGrid from 'src/common/components/common/StatisticGrid';
import Context from './seg/context';

const News = () => {
  const [filterText, setFilterText] = useState('');

  const handleFilterSelect = (filterKey: string) => {
    setFilterText(filterKey);
  };

  return (
    <Context.Provider>
      <Context.Consumer>
        {({ ss }) => {
          const list = (ss?.Joint?.News as any)?.data || [];



          const mappedNews =
            list?.map((item: any) => {
              const published = new Date(item.publishedAt);

              const scholarshipStatus = item.scholarship?.title
                ? 'WithScholarship'
                : 'NoScholarship';

              return {
                id: item.id,
                title: item.title,
                scholarship: item.scholarship?.title ?? '—',
                providerName: item.providerProfileVo?.organizationName ?? '—',
                images: item.newsMedias?.length ?? 0,
                scholarshipStatus,
                publishedAt: published.toLocaleDateString('en-US'),
              };
            }) || [];





          const total = mappedNews.length;
          const withImages = mappedNews.filter((x: any) => x.images > 0).length;
          const noImages = mappedNews.filter((x: any) => x.images === 0).length;
          const withScholarship = mappedNews.filter((x: any) => x.scholarship !== '—').length;
          const noScholarship = mappedNews.filter((x: any) => x.scholarship === '—').length;

          const stats = [
            {
              title: 'Total News',
              value: total,
              icon: <Newspaper />,
              color: 'text-blue-600',
              filterName: '',
            },
            {
              title: 'With Scholarship',
              value: withScholarship,
              icon: <Newspaper />,
              color: 'text-purple-600',
              filterName: 'WithScholarship',
            },
            {
              title: 'No Scholarship',
              value: noScholarship,
              icon: <Newspaper />,
              color: 'text-gray-600',
              filterName: 'NoScholarship',
            },
          ];


          return (
            <div className="flex flex-col min-h-screen bg-gray-100 p-6">
              <StatisticGrid stats={stats} onFilterSelect={handleFilterSelect} />

              <CustomDataTable
                title="Provider News List"
                data={mappedNews}
                detailPath="/news"
                customTitles={[
                  'ID',
                  'Title',
                  'Scholarship',
                  'Provider Name',
                  'Images',
                  'Scholarship Status',
                  'Published At',
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

export default News;
