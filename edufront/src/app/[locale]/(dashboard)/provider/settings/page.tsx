'use client';

import React from 'react';
import { Settings, User, Bell, Lock, CreditCard, HelpCircle } from 'lucide-react';
import { Button } from '@/pattern/cus/button';

const SettingsPage = () => {
  const settingsSections = [
    {
      title: 'Profile Settings',
      description: 'Manage your profile information and preferences',
      icon: User,
      color: 'from-blue-500 to-blue-600',
    },
    {
      title: 'Notifications',
      description: 'Configure notification preferences',
      icon: Bell,
      color: 'from-[#38a696] to-[#52c0b0]',
    },
    {
      title: 'Security',
      description: 'Password and security settings',
      icon: Lock,
      color: 'from-purple-500 to-purple-600',
    },
    {
      title: 'Billing',
      description: 'Manage billing and payment methods',
      icon: CreditCard,
      color: 'from-orange-500 to-orange-600',
    },
    {
      title: 'Help & Support',
      description: 'Get help and contact support',
      icon: HelpCircle,
      color: 'from-pink-500 to-pink-600',
    },
  ];

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-1">Manage your account settings and preferences</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {settingsSections.map((section, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="flex items-start gap-4">
              <div
                className={`p-3 rounded-lg bg-gradient-to-br ${section.color} text-white shadow-lg`}
              >
                <section.icon className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">{section.title}</h3>
                <p className="text-sm text-gray-600">{section.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
        <div className="max-w-2xl">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Settings</h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between py-4 border-b border-gray-200">
              <div>
                <p className="font-medium text-gray-900">Email Notifications</p>
                <p className="text-sm text-gray-600">Receive email updates about applications</p>
              </div>
              <Button variant="outline" size="sm">
                Configure
              </Button>
            </div>

            <div className="flex items-center justify-between py-4 border-b border-gray-200">
              <div>
                <p className="font-medium text-gray-900">Two-Factor Authentication</p>
                <p className="text-sm text-gray-600">Add an extra layer of security</p>
              </div>
              <Button variant="outline" size="sm">
                Enable
              </Button>
            </div>

            <div className="flex items-center justify-between py-4 border-b border-gray-200">
              <div>
                <p className="font-medium text-gray-900">Language</p>
                <p className="text-sm text-gray-600">Choose your preferred language</p>
              </div>
              <Button variant="outline" size="sm">
                English
              </Button>
            </div>

            <div className="flex items-center justify-between py-4">
              <div>
                <p className="font-medium text-gray-900">Timezone</p>
                <p className="text-sm text-gray-600">Set your local timezone</p>
              </div>
              <Button variant="outline" size="sm">
                UTC +7
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
