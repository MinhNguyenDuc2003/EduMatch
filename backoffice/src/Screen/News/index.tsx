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

          // Map dữ liệu vào bảng
          const mappedNews =
            list?.map((item: any) => {
              const published = new Date(item.publishedAt);

              return {
                id: item.id,
                title: item.title,
                scholarship: item.scholarship?.title ?? '—',
                providerName:
                  item.scholarship?.providerProfileVo?.organizationName ?? '—',
                images: item.newsMedias?.length ?? 0,
                publishedAt: published.toLocaleDateString('en-US'),
              };
            }) || [];

          // --- Statistic ---
          const total = mappedNews.length;
          const withImages = mappedNews.filter((x : any) => x.images > 0).length;
          const noImages = mappedNews.filter((x : any) => x.images === 0).length;

          const stats = [
            {
              title: 'Total News',
              value: total,
              icon: <Newspaper />,
              color: 'text-blue-600',
              filterName: '',
            },
            {
              title: 'With Images',
              value: withImages,
              icon: <ImageIcon />,
              color: 'text-green-600',
              filterName: 'Yes',
            },
            {
              title: 'No Images',
              value: noImages,
              icon: <ImageOff />,
              color: 'text-red-600',
              filterName: 'No',
            },
          ];

          return (
            <div className="flex flex-col min-h-screen bg-gray-100 p-6">
              <StatisticGrid stats={stats} onFilterSelect={handleFilterSelect} />

              <CustomDataTable
                title="Provider News"
                data={mappedNews}
                detailPath="/backoffice/news"
                customTitles={[
                  'ID',
                  'Title',
                  'Scholarship',
                  'Provider Name',
                  'Images',
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
