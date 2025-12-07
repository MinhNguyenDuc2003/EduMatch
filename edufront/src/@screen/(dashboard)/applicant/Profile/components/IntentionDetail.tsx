import React from 'react';
import { formatDate } from '../utils';
import {
  GraduationCap,
  Building2,
  MapPin,
  BookOpen,
  Calendar,
  CalendarCheck,
  User,
  ArrowRightLeft,
  RefreshCw,
  FileText,
} from 'lucide-react';

interface IntentionDetailProps {
  intention: Intention;
}

const IntentionDetail = ({ intention }: IntentionDetailProps) => {
  return (
    <div className="w-full p-1">
      {/* Header with Institution Name */}
      <div className="flex items-start gap-3 mb-4 pb-3 border-b border-gray-200">
        <div className="p-2 bg-blue-50 rounded-lg">
          <Building2 className="w-5 h-5 text-blue-600" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 text-base leading-tight">
            {intention.intendedInstitution}
          </h3>
          <p className="text-xs text-gray-500 mt-1">
            {intention.intendedState && intention.intendedCountry
              ? `${intention.intendedState}, ${intention.intendedCountry}`
              : intention.intendedCountry || intention.intendedState || ''}
          </p>
        </div>
      </div>

      {/* Academic Information */}
      <div className="space-y-3 mb-4">
        <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
          Academic Information
        </h4>

        {/* Degree Type */}
        <div className="flex items-center gap-3">
          <div className="w-8 flex justify-center">
            <GraduationCap className="w-4 h-4 text-gray-500" />
          </div>
          <div className="flex-1">
            <p className="text-xs text-gray-500 mb-0.5">Degree Type</p>
            <p className="text-sm font-medium text-gray-900">{intention.degreeType}</p>
          </div>
        </div>

        {/* Major Category */}
        <div className="flex items-center gap-3">
          <div className="w-8 flex justify-center">
            <BookOpen className="w-4 h-4 text-gray-500" />
          </div>
          <div className="flex-1">
            <p className="text-xs text-gray-500 mb-0.5">Major Category</p>
            <p className="text-sm font-medium text-gray-900">{intention.intendedMajorCategory}</p>
          </div>
        </div>

        {/* Major Name */}
        <div className="flex items-center gap-3">
          <div className="w-8 flex justify-center">
            <BookOpen className="w-4 h-4 text-gray-500" />
          </div>
          <div className="flex-1">
            <p className="text-xs text-gray-500 mb-0.5">Major Name</p>
            <p className="text-sm font-medium text-gray-900">{intention.intendedMajorName}</p>
          </div>
        </div>

        {/* Academic Classification */}
        {intention.academicClassification && (
          <div className="flex items-center gap-3">
            <div className="w-8 flex justify-center">
              <User className="w-4 h-4 text-gray-500" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-gray-500 mb-0.5">Academic Classification</p>
              <p className="text-sm font-medium text-gray-900">
                {intention.academicClassification}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Timeline Information */}
      <div className="space-y-3 mb-4 pt-3 border-t border-gray-200">
        <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Timeline</h4>

        {/* Expected Start Date */}
        <div className="flex items-center gap-3">
          <div className="w-8 flex justify-center">
            <Calendar className="w-4 h-4 text-gray-500" />
          </div>
          <div className="flex-1">
            <p className="text-xs text-gray-500 mb-0.5">Expected Start Date</p>
            <p className="text-sm font-medium text-gray-900">
              {intention.expectedStartDate
                ? formatDate(intention.expectedStartDate)
                : 'Not specified'}
            </p>
          </div>
        </div>

        {/* Expected Graduation Year */}
        <div className="flex items-center gap-3">
          <div className="w-8 flex justify-center">
            <CalendarCheck className="w-4 h-4 text-gray-500" />
          </div>
          <div className="flex-1">
            <p className="text-xs text-gray-500 mb-0.5">Expected Graduation Year</p>
            <p className="text-sm font-medium text-gray-900">{intention.expectedGraduationYear}</p>
          </div>
        </div>
      </div>

      {/* Student Status */}
      <div className="space-y-3 mb-4 pt-3 border-t border-gray-200">
        <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
          Student Status
        </h4>

        {/* Transfer Student */}
        <div className="flex items-center gap-3">
          <div className="w-8 flex justify-center">
            <ArrowRightLeft className="w-4 h-4 text-gray-500" />
          </div>
          <div className="flex-1">
            <p className="text-xs text-gray-500 mb-0.5">Transfer Student</p>
            <span
              className={`inline-block text-xs px-2 py-1 rounded-full font-medium ${
                intention.isTransferStudent
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {intention.isTransferStudent ? 'Yes' : 'No'}
            </span>
          </div>
        </div>

        {/* Returning Student */}
        <div className="flex items-center gap-3">
          <div className="w-8 flex justify-center">
            <RefreshCw className="w-4 h-4 text-gray-500" />
          </div>
          <div className="flex-1">
            <p className="text-xs text-gray-500 mb-0.5">Returning Student</p>
            <span
              className={`inline-block text-xs px-2 py-1 rounded-full font-medium ${
                intention.isReturningStudent
                  ? 'bg-green-100 text-green-700'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {intention.isReturningStudent ? 'Yes' : 'No'}
            </span>
          </div>
        </div>
      </div>

      {/* Notes */}
      {intention.notes && (
        <div className="pt-3 border-t border-gray-200">
          <div className="flex items-start gap-3">
            <div className="w-8 flex justify-center pt-0.5">
              <FileText className="w-4 h-4 text-gray-500" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-gray-500 mb-1">Notes</p>
              <p className="text-sm text-gray-900 leading-relaxed">{intention.notes}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IntentionDetail;
