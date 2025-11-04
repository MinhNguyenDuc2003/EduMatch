'use client';

import React from 'react';
import { BarChart3, TrendingUp, PieChart, Activity } from 'lucide-react';

const AnalyticsPage = () => {
  const metrics = [
    { title: 'Total Views', value: '12,543', icon: Activity, color: 'from-blue-500 to-blue-600' },
    {
      title: 'Application Rate',
      value: '24.5%',
      icon: TrendingUp,
      color: 'from-[#38a696] to-[#52c0b0]',
    },
    {
      title: 'Approval Rate',
      value: '67.8%',
      icon: PieChart,
      color: 'from-purple-500 to-purple-600',
    },
    {
      title: 'Success Score',
      value: '8.9/10',
      icon: BarChart3,
      color: 'from-orange-500 to-orange-600',
    },
  ];

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-600 mt-1">Track your scholarship performance and insights</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">{metric.title}</p>
                <h3 className="text-3xl font-bold text-gray-900 mt-2">{metric.value}</h3>
              </div>
              <div
                className={`p-3 rounded-lg bg-gradient-to-br ${metric.color} text-white shadow-lg`}
              >
                <metric.icon className="w-6 h-6" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-8 text-center shadow-sm border border-gray-200">
          <BarChart3 className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Application Trends</h3>
          <p className="text-gray-600 mb-6">View application trends over time</p>
          <div className="text-sm text-gray-500">Charts coming soon...</div>
        </div>

        <div className="bg-white rounded-xl p-8 text-center shadow-sm border border-gray-200">
          <PieChart className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Demographics</h3>
          <p className="text-gray-600 mb-6">Student demographics breakdown</p>
          <div className="text-sm text-gray-500">Charts coming soon...</div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
