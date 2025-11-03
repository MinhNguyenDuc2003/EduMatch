import BreadcrumbHeader from '@/pattern/core/BreadcrumbHeader';
import React from 'react';

const Scholarship = () => {
  return (
    <div>
      <BreadcrumbHeader
        items={[{ label: 'Provider', href: '/provider' }, { label: 'Scholarship' }]}
      />
      <div className="mx-auto px-4 lg:px-40 py-6 bg-white">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold">Scholarship</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scholarship;
