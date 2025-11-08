'use client';

import React from 'react';
import { Users, GraduationCap, Award, TrendingUp } from 'lucide-react';

const StudentsPage = () => {
  const stats = [
    { title: 'Total Students', value: '234', icon: Users, color: 'from-blue-500 to-blue-600' },
    { title: 'Active Applicants', value: '89', icon: GraduationCap, color: 'from-[#38a696] to-[#52c0b0]' },
    { title: 'Scholarship Recipients', value: '67', icon: Award, color: 'from-purple-500 to-purple-600' },
    { title: 'Growth Rate', value: '+23%', icon: TrendingUp, color: 'from-orange-500 to-orange-600' },
  ];

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Students</h1>
        <p className="text-gray-600 mt-1">Manage and track student information</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">{stat.title}</p>
                <h3 className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</h3>
              </div>
              <div
                className={`p-3 rounded-lg bg-gradient-to-br ${stat.color} text-white shadow-lg`}
              >
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-gray-200">
        <Users className="w-16 h-16 mx-auto text-gray-400 mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Students Management</h3>
        <p className="text-gray-600 mb-6">View and manage all students who have applied for your scholarships</p>
        <div className="text-sm text-gray-500">Coming soon...</div>
      </div>
    </div>
  );
};

export default StudentsPage;

