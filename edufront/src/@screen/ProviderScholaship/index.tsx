'use client';

import { Button } from '@/lib/cus/button';
import Header from '@/pattern/share/Header';
import { Plus } from 'lucide-react';
import React, { useState } from 'react';
import { ApiResponse } from './types';
import { SearchFilters, ScholarshipCard, EmptyState, Pagination } from './components';
import { useRouter } from 'next/navigation';

const ProviderScholaship = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data giống API response (có thể thay bằng API call thực)
  const mockData: ApiResponse = {
    content: [
      {
        id: 10,
        providerId: 2,
        title: 'Fullbright Scholarship 2025',
        slug: 'fullbright-scholarship-2025',
        shortDescription: 'Học bổng toàn phần cho sinh viên quốc tế năm 2025.',
        description:
          'Học bổng Fullbright 2025 hỗ trợ sinh viên có thành tích học tập xuất sắc theo học tại các trường đại học hàng đầu thế giới.',
        requirements: 'GPA từ 3.5 trở lên, IELTS 7.0, thư giới thiệu và bài luận cá nhân.',
        benefits: 'Toàn bộ học phí, sinh hoạt phí và vé máy bay khứ hồi.',
        fields: 'Khoa học máy tính, Kinh tế, Kỹ thuật',
        country: 'United States',
        university: 'Harvard University',
        studyLevel: 'Master',
        scholarshipType: 'Full',
        fundingAmount: '100000 USD',
        startDate: 1766960133891,
        endDate: 1769638533891,
        availableSlots: 10,
        languageRequirement: 'IELTS 7.0 hoặc TOEFL 95',
        gpaRequirement: 3.5,
        scholarshipMedias: [
          {
            id: 12,
            s3Key: 'public/scholarship/10/',
            size: 0,
            folderName: 'scholarship/10',
            fileName: '',
            isPublic: true,
            url: 'https://edumatch.s3.ap-southeast-1.amazonaws.com/public/scholarship/10/',
          },
        ],
      },
      {
        id: 9,
        title: 'FPT Scholarship 2025',
        slug: 'fpt-scholarship-2025',
        shortDescription: 'Học bổng toàn phần cho sinh viên quốc tế năm 2025.',
        description:
          'Học bổng FPT 2025 hỗ trợ sinh viên có thành tích học tập xuất sắc theo học tại các trường đại học hàng đầu thế giới.',
        requirements: 'GPA từ 3.5 trở lên, IELTS 7.0, thư giới thiệu và bài luận cá nhân.',
        benefits: 'Toàn bộ học phí, sinh hoạt phí và vé máy bay khứ hồi.',
        fields: 'Khoa học máy tính, Kinh tế, Kỹ thuật',
        country: 'United States',
        university: 'Harvard University',
        studyLevel: 'Master',
        scholarshipType: 'Full',
        fundingAmount: '100000 USD',
        startDate: 1766960133891,
        endDate: 1769638533891,
        availableSlots: 10,
        languageRequirement: 'IELTS 7.0 hoặc TOEFL 95',
        gpaRequirement: 3.5,
      },
    ],
    pageable: {
      pageNumber: 0,
      pageSize: 100,
      offset: 0,
    },
    totalPages: 1,
    totalElements: 6,
    size: 100,
    number: 0,
    first: true,
    last: true,
    empty: false,
  };

  const scholarships = mockData.content;

  const handleDeleteScholarship = (id: number) => {
    // TODO: Implement delete logic
    console.log('Delete scholarship:', id);
  };

  const handleCreateScholarship = () => {
    // TODO: Navigate to create page
    console.log('Create new scholarship');
  };

  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Header */}
      <Header
        subtitle="Manage your scholarship programs"
        title="Scholarships"
        rightElement={
          <Button
            onClick={() => router.push('/provider/scholarships/create')}
            className="bg-primary-brand text-white hover:bg-primary-brand/90 shadow-sm"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Scholarship
          </Button>
        }
      />

      {/* Search and Filters */}
      <SearchFilters searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      {/* Scholarships Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {scholarships.map((scholarship) => (
          <ScholarshipCard
            key={scholarship.id}
            scholarship={scholarship}
            onDelete={handleDeleteScholarship}
          />
        ))}
      </div>

      {/* Empty State */}
      {scholarships.length === 0 && <EmptyState onCreateClick={handleCreateScholarship} />}

      {/* Pagination */}
      <Pagination
        currentPage={mockData.number}
        totalPages={mockData.totalPages}
        pageSize={mockData.size}
        totalElements={mockData.totalElements}
        onPageChange={(page) => console.log('Go to page:', page)}
      />
    </div>
  );
};

export default ProviderScholaship;
