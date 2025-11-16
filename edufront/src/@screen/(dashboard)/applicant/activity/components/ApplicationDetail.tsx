'use client';

import { X, Phone, Mail } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from '@/lib/cus/sheet';
import { Avatar, AvatarFallback } from '@/lib/cus/avatar';
import { Badge } from '@/lib/cus/badge';
import Image from 'next/image';

type ApplicationDetailProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  application: Application | null;
  appliedScholarship?: ApplicationScholarship | null;
};

const formatDate = (date?: number | string) => {
  if (!date) return 'N/A';
  try {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return 'N/A';
  }
};

const formatDateTime = (date?: number) => {
  if (!date) return 'N/A';
  try {
    const dateObj = new Date(date > 1e12 ? date : date * 1000);
    return dateObj.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return 'N/A';
  }
};

const formatStatus = (status?: string): string => {
  if (!status) return 'Not reviewed yet';
  return status
    .replace(/_/g, ' ')
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

const getStatusColor = (status?: string): string => {
  if (!status) return 'bg-gray-100 text-gray-700';
  const statusLower = status.toLowerCase();
  switch (statusLower) {
    case 'approved':
      return 'bg-green-100 text-green-700';
    case 'pending':
      return 'bg-blue-100 text-blue-700';
    case 'rejected':
      return 'bg-red-100 text-red-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

const getTimelineDotColor = (status?: string): string => {
  if (!status) return 'bg-blue-500 text-blue-700';
  const statusLower = status.toLowerCase();
  switch (statusLower) {
    case 'approved':
      return 'bg-green-500 text-green-700';
    case 'pending':
      return 'bg-blue-500 text-blue-700';
    case 'rejected':
      return 'bg-red-500 text-red-700';
    default:
      return 'bg-blue-500 text-blue-700';
  }
};

export default function ApplicationDetail({
  open,
  onOpenChange,
  application,
  appliedScholarship,
}: ApplicationDetailProps) {
  if (!application) return null;

  const {
    status,
    reviewedAt,
    note,
    scholarshipVo: scholarship,
    applicationVo,
  } = appliedScholarship || {};
  const {
    organizationName,
    logoUrl,
    email: scholarshipEmail,
    phone: scholarshipPhone,
  } = scholarship?.providerProfileVo || {};
  const {
    fullName,
    gender,
    dateOfBirth,
    address,
    email: applicationEmail,
    phone: applicationPhone,
    nationality,
    applicationName,
    skills,
    achievements,
    extracurricular,
    motivation,
    gpa,
    graduationYear,
    schoolName,
    educationLevel,
    major,
  } = applicationVo || application || {};

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full p-4 sm:max-w-2xl max-h-[95vh] overflow-y-auto [&>button]:hidden rounded-xl !right-4 !top-1/2 !-translate-y-1/2 scrollbar-hide"
      >
        <SheetHeader className="!p-0 ">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <SheetTitle className="text-lg font-bold text-gray-900">
                {applicationName ? applicationName : 'Application Information'}
              </SheetTitle>
              {/* Status */}
              {status && (
                <Badge className={`${getStatusColor(status)} border`}>{formatStatus(status)}</Badge>
              )}
            </div>
            {/* Close button */}
            <SheetClose className="rounded-full bg-white p-2 shadow-lg ring-1 ring-gray-200 transition-opacity hover:opacity-70 focus:outline-none focus:ring-2 focus:ring-offset-2 flex-shrink-0">
              <X className="h-4 w-4 text-gray-700" />
              <span className="sr-only">Close</span>
            </SheetClose>
          </div>
        </SheetHeader>

        <div className="space-y-6">
          {/* Scholarship Section */}
          {scholarship && (
            <section>
              <h3 className="text-base font-bold text-gray-900 mb-2">Scholarship Information</h3>
              <div className="bg-white rounded-lg border-2 border-gray-200 p-3 mb-4 space-y-4">
                {/* Avatar */}
                <div className="flex items-center gap-4">
                  {logoUrl ? (
                    <div className="relative w-12 h-12">
                      <Image
                        src={logoUrl}
                        alt={organizationName || 'Organization Logo'}
                        fill
                        className="rounded-full w-12 h-12 object-cover"
                      />
                    </div>
                  ) : (
                    <div className="rounded-full w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 text-white flex items-center justify-center">
                      <span className="text-lg font-bold">
                        {organizationName?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                  <div className="flex-1 space-y-1">
                    <h4 className="font-semibold text-gray-900">{organizationName}</h4>
                    <div className="flex text-sm text-gray-500 items-center font-semibold gap-8">
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        <span>{scholarshipPhone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        <span>{scholarshipEmail}</span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Scholarship Information */}
                <div className="text-sm">
                  <div className="flex flex-col text-sm text-gray-500 items-start font-semibold gap-2 bg-gray-100 rounded-md p-3">
                    <div className="flex items-center gap-2">
                      <span>Scholarship</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-base font-bold text-gray-900">{scholarship.title}</span>
                    </div>
                    <div className="flex items-center gap-8">
                      <div className="flex items-center gap-2">
                        <span>Amount: {scholarship.fundingAmount}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>Status: </span>
                        <Badge className={`${getStatusColor(status)} border`}>
                          {formatStatus(status)}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Personal Detail Section */}
          <section>
            <h3 className="text-base font-bold text-gray-900 mb-2">Personal Detail</h3>
            <div className="bg-white rounded-lg border-2 border-gray-200 p-3 mb-4 space-y-4">
              {/* Avatar */}
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-blue-100 text-blue-700 text-lg font-semibold">
                    {fullName?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <h4 className="font-semibold text-gray-900">{fullName}</h4>
                  <div className="flex text-sm text-gray-500 items-center font-semibold gap-8">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      <span>{applicationPhone || 'N/A'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      <span>{applicationEmail || 'N/A'}</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Additional Information */}
              <div className="text-sm bg-gray-100 rounded-md p-3">
                <p className="text-sm font-semibold text-gray-600 mb-2">Additional Information</p>
                <div className="grid text-sm text-gray-500 items-center font-semibold grid-cols-2 gap-2">
                  <div className="flex items-center gap-2">
                    <span>Gender: {gender || 'N/A'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>Date of Birth: {formatDate(dateOfBirth) || 'N/A'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>Address: {address || 'N/A'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>Nationality: {nationality || 'N/A'}</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Education Background Section */}
          <section>
            <h3 className="text-base font-bold text-gray-900 mb-2">Education Background</h3>
            <div className="bg-white rounded-lg border-2 border-gray-200 p-3 mb-4">
              <div className="grid text-sm text-gray-700 items-start font-medium grid-cols-2 gap-2">
                <div className="col-span-2 flex items-center gap-2">
                  <span>School: {schoolName || 'N/A'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>Education Level: {educationLevel || 'N/A'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>Major: {major || 'N/A'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>GPA: {gpa !== undefined && gpa !== null ? gpa.toFixed(2) : 'N/A'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>Graduation Year: {graduationYear || 'N/A'}</span>
                </div>
              </div>
            </div>
          </section>

          {/* Skills & Achievements Section */}
          <section>
            <h3 className="text-base font-bold text-gray-900 mb-2">Skills & Achievements</h3>
            <div className="bg-white rounded-lg border-2 border-gray-200 p-3 mb-4 space-y-4">
              {/* Skills */}
              {skills && (
                <div>
                  <p className="text-sm font-semibold text-gray-500 mb-2">Skills</p>
                  <div className="flex flex-wrap gap-2">
                    {skills.split(',').map((skill, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="text-xs px-2 py-1 bg-gray-50 text-gray-700 border-gray-200"
                      >
                        {skill.trim()}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-2">
                {/* Achievements */}
                {achievements && (
                  <div className="text-sm font-semibold text-gray-500">
                    <p className="mb-2">Achievements</p>
                    <div className="space-y-1">
                      {achievements.split(',').map((achievement, index) => (
                        <div key={index} className="text-sm text-gray-700 font-semibold">
                          • {achievement.trim()}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Extracurricular Activities */}
                {extracurricular && (
                  <div className="text-sm font-semibold text-gray-500 ">
                    <p className="mb-2">Extracurricular Activities</p>
                    <div className="space-y-1">
                      {extracurricular.split(',').map((activity, index) => (
                        <div key={index} className="text-sm text-gray-700 font-semibold">
                          • {activity.trim()}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Reason Section */}
          <section>
            <h3 className="text-base font-bold text-gray-900 mb-2">Reason</h3>
            <div className="bg-white rounded-lg border-2 border-gray-200 p-3 mb-4">
              <p className="text-sm text-gray-600 bg-gray-50 rounded-md p-3 leading-relaxed">
                {motivation || 'No motivation provided'}
              </p>
            </div>
          </section>

          {/* Goals Section */}
          <section>
            <h3 className="text-base font-bold text-gray-900 mb-2">Goals</h3>
            <div className="bg-white rounded-lg border-2 border-gray-200 p-3 mb-4">
              <p className="text-sm text-gray-600 bg-gray-50 rounded-md p-3 leading-relaxed">
                {application.personalStatement || 'No personal statement provided'}
              </p>
            </div>
          </section>

          {/* Application History Section */}
          {reviewedAt && (
            <section>
              <h3 className="text-base font-bold text-gray-900 mb-2">Application History</h3>
              <div className="bg-white rounded-lg border-2 border-gray-200 p-3 mb-4">
                <div className="space-y-6 pl-2 border-l-2 border-blue-200">
                  {/* review status */}
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-4 h-4 rounded-full ${getTimelineDotColor(status)} border-2 mt-1 border-white`}
                    ></div>
                    <div className="flex flex-col gap-1">
                      <p className={`text-sm font-medium text-${getStatusColor(status)}`}>
                        {formatStatus(status)} Application
                      </p>
                      <p className="text-sm text-gray-500">{formatDateTime(reviewedAt)}</p>
                      {scholarship && <p className="text-sm text-gray-500">{scholarship.title}</p>}
                      {note && (
                        <div>
                          <span className="text-sm font-medium text-gray-900">Note: </span>
                          <span className="text-sm text-gray-600">{note}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* submission date */}
                </div>
              </div>
            </section>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
