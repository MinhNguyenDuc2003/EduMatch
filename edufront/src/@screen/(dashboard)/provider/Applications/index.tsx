'use client';

import React, { useState } from 'react';
import { Search, Download, Eye, Check, X, Calendar, DollarSign, Users } from 'lucide-react';
import { Button } from '@/lib/cus/button';
import { Input } from '@/lib/cus/input';
import { cn } from '@/lib/utils';
import ScholarshipList from './components/ScholarshipList';
import { useGetScholarshipsQuery } from '@/state/apiProvider';

type Application = {
  id: number;
  studentName: string;
  email: string;
  appliedDate: string;
  status: 'pending' | 'under_review' | 'approved' | 'rejected';
  gpa: number;
  major: string;
};

const Applications = () => {
  const [selectedScholarshipId, setSelectedScholarshipId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const { data: scholarships, isLoading: isLoadingScholarships } = useGetScholarshipsQuery();

  // Mock applications data - grouped by scholarship ID
  const applicationsByScholarship: Record<number, Application[]> = {
    1: [
      {
        id: 1,
        studentName: 'John Doe',
        email: 'john.doe@email.com',
        appliedDate: '2024-10-28',
        status: 'pending',
        gpa: 3.8,
        major: 'Computer Science',
      },
      {
        id: 2,
        studentName: 'Alice Johnson',
        email: 'alice.j@email.com',
        appliedDate: '2024-10-27',
        status: 'approved',
        gpa: 3.9,
        major: 'Computer Science',
      },
      {
        id: 3,
        studentName: 'Bob Smith',
        email: 'bob.smith@email.com',
        appliedDate: '2024-10-26',
        status: 'under_review',
        gpa: 3.7,
        major: 'Software Engineering',
      },
    ],
    2: [
      {
        id: 4,
        studentName: 'Jane Smith',
        email: 'jane.smith@email.com',
        appliedDate: '2024-10-27',
        status: 'approved',
        gpa: 3.9,
        major: 'Engineering',
      },
      {
        id: 5,
        studentName: 'Michael Chen',
        email: 'michael.c@email.com',
        appliedDate: '2024-10-25',
        status: 'pending',
        gpa: 3.6,
        major: 'Mechanical Engineering',
      },
    ],
    3: [
      {
        id: 6,
        studentName: 'Mike Johnson',
        email: 'mike.j@email.com',
        appliedDate: '2024-10-26',
        status: 'under_review',
        gpa: 3.7,
        major: 'Mathematics',
      },
    ],
    4: [
      {
        id: 7,
        studentName: 'Sarah Williams',
        email: 'sarah.w@email.com',
        appliedDate: '2024-10-25',
        status: 'rejected',
        gpa: 3.5,
        major: 'Physics',
      },
    ],
    5: [
      {
        id: 8,
        studentName: 'Emily Davis',
        email: 'emily.d@email.com',
        appliedDate: '2024-10-24',
        status: 'approved',
        gpa: 4.0,
        major: 'Computer Science',
      },
      {
        id: 9,
        studentName: 'David Wilson',
        email: 'david.w@email.com',
        appliedDate: '2024-10-23',
        status: 'pending',
        gpa: 3.8,
        major: 'Engineering',
      },
    ],
  };

  const currentApplications = selectedScholarshipId
    ? applicationsByScholarship[selectedScholarshipId] || []
    : [];

  // Filter applications by search query
  const filteredApplications = currentApplications.filter(
    (app) =>
      app.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.major.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
    <div className="p-6 lg:p-8 h-[calc(100vh-4rem)] flex flex-col">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Applications</h1>
          <p className="text-gray-600 mt-1">Manage and review scholarship applications</p>
        </div>
        {selectedScholarshipId && (
          <Button className="bg-gradient-to-r from-[#38a696] to-[#52c0b0] hover:from-[#2d8579] hover:to-[#42a89a] text-white shadow-sm">
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </Button>
        )}
      </div>

      {/* Main Content: Two Column Layout */}
      <div className="flex-1 flex flex-col md:flex-row gap-6 md:overflow-hidden">
        {/* Left Sidebar: Scholarships List */}
        <ScholarshipList
          scholarships={scholarships || []}
          isLoading={isLoadingScholarships}
          selectedScholarshipId={selectedScholarshipId}
          setSelectedScholarshipId={setSelectedScholarshipId}
        />

        {/* Right Side: Applications */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {selectedScholarshipId ? (
            <>
              {/* Applications Header */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                      {scholarships &&
                        scholarships.find((s) => s.id === selectedScholarshipId)?.title}
                    </h2>
                    <p className="text-sm text-gray-600 mt-1">
                      {filteredApplications.length} application(s) found
                    </p>
                  </div>
                </div>

                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search by student name, email, or major..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4"
                  />
                </div>
              </div>

              {/* Applications Table */}
              {filteredApplications.length > 0 ? (
                <div className="flex-1 overflow-hidden flex flex-col">
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex-1 flex flex-col">
                    <div className="overflow-y-auto flex-1">
                      <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200 sticky top-0">
                          <tr>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                              Student
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
                          {filteredApplications.map((app) => (
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
                </div>
              ) : (
                <div className="flex-1 flex items-center justify-center bg-white rounded-xl border border-gray-200">
                  <div className="text-center">
                    <p className="text-gray-500 text-lg">No applications found</p>
                    <p className="text-gray-400 text-sm mt-2">
                      {searchQuery
                        ? 'Try adjusting your search'
                        : 'No applications for this scholarship yet'}
                    </p>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center bg-white rounded-xl border border-gray-200">
              <div className="text-center">
                <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg font-medium">Select a Scholarship</p>
                <p className="text-gray-400 text-sm mt-2">
                  Choose a scholarship from the left to view its applications
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Applications;
