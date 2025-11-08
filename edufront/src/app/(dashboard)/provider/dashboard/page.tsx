'use client';

import React from 'react';
import {
  LayoutDashboard,
  BookText,
  Users,
  TrendingUp,
  DollarSign,
  Award,
  Clock,
  AlertCircle,
} from 'lucide-react';
import Header from '@/pattern/share/Header';

const DashboardPage = () => {
  // Mock data
  const stats = [
    {
      title: 'Total Scholarships',
      value: '24',
      change: '+12%',
      icon: BookText,
      color: 'from-blue-500 to-blue-600',
    },
    {
      title: 'Active Applications',
      value: '156',
      change: '+23%',
      icon: Users,
      color: 'from-[#38a696] to-[#52c0b0]',
    },
    {
      title: 'Total Funding',
      value: '$2.4M',
      change: '+8%',
      icon: DollarSign,
      color: 'from-purple-500 to-purple-600',
    },
    {
      title: 'Students Helped',
      value: '89',
      change: '+15%',
      icon: Award,
      color: 'from-orange-500 to-orange-600',
    },
  ];

  const recentApplications = [
    {
      id: 1,
      student: 'John Doe',
      scholarship: 'Computer Science Excellence Award',
      status: 'pending',
      date: '2 hours ago',
    },
    {
      id: 2,
      student: 'Jane Smith',
      scholarship: 'Engineering Scholarship 2024',
      status: 'approved',
      date: '5 hours ago',
    },
    {
      id: 3,
      student: 'Mike Johnson',
      scholarship: 'Mathematics Excellence Program',
      status: 'under_review',
      date: '1 day ago',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'under_review':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Header */}
      <Header
        subtitle="Welcome back! Here's what's happening today."
        title="Dashboard"
        rightElement={
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock className="w-4 h-4" />
            <span>Last updated: 2 minutes ago</span>
          </div>
        }
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">{stat.title}</p>
                <h3 className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</h3>
                <p className="text-green-600 text-sm mt-2 font-medium">
                  {stat.change} from last month
                </p>
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

      {/* Recent Applications */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Recent Applications</h2>
            <a
              href="/provider/applications"
              className="text-[#38a696] hover:text-[#2d8579] font-medium text-sm"
            >
              View all
            </a>
          </div>
        </div>
        <div className="divide-y divide-gray-200">
          {recentApplications.map((app) => (
            <div key={app.id} className="p-6 hover:bg-gray-50 transition-colors cursor-pointer">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#38a696] to-[#52c0b0] flex items-center justify-center text-white font-semibold">
                      {app.student.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{app.student}</p>
                      <p className="text-sm text-gray-600">{app.scholarship}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(app.status)}`}
                  >
                    {app.status.replace('_', ' ')}
                  </span>
                  <span className="text-sm text-gray-500">{app.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-[#38a696] to-[#52c0b0] rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
          <BookText className="w-8 h-8 mb-4" />
          <h3 className="text-lg font-semibold mb-2">Create New Scholarship</h3>
          <p className="text-white/80 text-sm">Start a new scholarship program for students</p>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
          <Users className="w-8 h-8 mb-4" />
          <h3 className="text-lg font-semibold mb-2">Review Applications</h3>
          <p className="text-white/80 text-sm">8 applications waiting for review</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
          <TrendingUp className="w-8 h-8 mb-4" />
          <h3 className="text-lg font-semibold mb-2">View Analytics</h3>
          <p className="text-white/80 text-sm">Track your scholarship performance</p>
        </div>
      </div>

      {/* Alerts */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-blue-900 mb-1">Action Required</h3>
            <p className="text-blue-800 text-sm">
              3 scholarship applications have been pending for more than 7 days. Please review them
              soon.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
