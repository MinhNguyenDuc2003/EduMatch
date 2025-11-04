'use client';

import React, { useState } from 'react';
import { Search, Filter, Download, ChevronDown, Eye, Check, X } from 'lucide-react';
import { Button } from '@/lib/cus/button';
import { Input } from '@/lib/cus/input';
import { cn } from '@/lib/utils';

const ApplicationsPage = () => {
  const [selectedTab, setSelectedTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const tabs = [
    { id: 'all', label: 'All Applications', count: 156 },
    { id: 'pending', label: 'Pending Review', count: 8 },
    { id: 'under_review', label: 'Under Review', count: 12 },
    { id: 'approved', label: 'Approved', count: 89 },
    { id: 'rejected', label: 'Rejected', count: 47 },
  ];

  const applications = [
    {
      id: 1,
      studentName: 'John Doe',
      email: 'john.doe@email.com',
      scholarship: 'Computer Science Excellence Award',
      appliedDate: '2024-10-28',
      status: 'pending',
      gpa: 3.8,
      major: 'Computer Science',
    },
    {
      id: 2,
      studentName: 'Jane Smith',
      email: 'jane.smith@email.com',
      scholarship: 'Engineering Scholarship 2024',
      appliedDate: '2024-10-27',
      status: 'approved',
      gpa: 3.9,
      major: 'Engineering',
    },
    {
      id: 3,
      studentName: 'Mike Johnson',
      email: 'mike.j@email.com',
      scholarship: 'Mathematics Excellence Program',
      appliedDate: '2024-10-26',
      status: 'under_review',
      gpa: 3.7,
      major: 'Mathematics',
    },
    {
      id: 4,
      studentName: 'Sarah Williams',
      email: 'sarah.w@email.com',
      scholarship: 'Physics Research Grant',
      appliedDate: '2024-10-25',
      status: 'rejected',
      gpa: 3.5,
      major: 'Physics',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'under_review':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'rejected':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Applications</h1>
          <p className="text-gray-600 mt-1">Manage and review scholarship applications</p>
        </div>
        <Button className="bg-gradient-to-r from-[#38a696] to-[#52c0b0] hover:from-[#2d8579] hover:to-[#42a89a] text-white shadow-sm">
          <Download className="w-4 h-4 mr-2" />
          Export Data
        </Button>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 overflow-x-auto">
        <nav className="flex space-x-8 min-w-max">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
              className={cn(
                'py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors',
                selectedTab === tab.id
                  ? 'border-[#52c0b0] text-[#38a696]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              )}
            >
              {tab.label}
              <span
                className={cn(
                  'ml-2 py-0.5 px-2 rounded-full text-xs font-semibold',
                  selectedTab === tab.id
                    ? 'bg-[#52c0b0]/10 text-[#38a696]'
                    : 'bg-gray-100 text-gray-600'
                )}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </nav>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search by student name, email, or scholarship..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4"
          />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="w-4 h-4" />
          Filters
          <ChevronDown className="w-4 h-4" />
        </Button>
      </div>

      {/* Applications Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Student
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Scholarship
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Major
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  GPA
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Applied Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {applications.map((app) => (
                <tr key={app.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#38a696] to-[#52c0b0] flex items-center justify-center text-white font-semibold">
                        {app.studentName.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{app.studentName}</p>
                        <p className="text-sm text-gray-500">{app.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-900">{app.scholarship}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-900">{app.major}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-gray-900">{app.gpa}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-500">{app.appliedDate}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={cn(
                        'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border',
                        getStatusColor(app.status)
                      )}
                    >
                      {app.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                        <Eye className="w-4 h-4" />
                      </Button>
                      {app.status === 'pending' && (
                        <>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0 text-green-600 hover:text-green-700 hover:bg-green-50"
                          >
                            <Check className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">Showing 1 to 4 of 156 applications</p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm" className="bg-[#52c0b0] text-white border-[#52c0b0]">
            1
          </Button>
          <Button variant="outline" size="sm">
            2
          </Button>
          <Button variant="outline" size="sm">
            3
          </Button>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ApplicationsPage;
