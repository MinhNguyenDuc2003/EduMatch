'use client';

import {
  X,
  Phone,
  Mail,
  Calendar,
  User,
  Building2,
  Stethoscope,
  BookOpen,
  Globe,
} from 'lucide-react';
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

const formatStatus = (status?: string): string => {
  if (!status) return 'Not reviewed yet';
  return status
    .replace(/_/g, ' ')
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
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
    scholarshipVo: scholarship,
    applicationVo,
  } = appliedScholarship || {};
  const { organizationName, logoUrl, email, phone } = scholarship?.providerProfileVo || {};
  const { fullName, gender, dateOfBirth, address, nationality, applicationName } =
    applicationVo || {};

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full p-4 sm:max-w-2xl overflow-y-auto [&>button]:hidden rounded-xl !right-12 scrollbar-hide"
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
                        <span>{phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        <span>{email}</span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Scholarship Information */}
                <div className="text-sm p-3">
                  <div className="grid text-sm text-gray-500 items-start font-semibold grid-cols-2 gap-2">
                    <div className="flex items-center gap-2">
                      <span>Scholarship: {scholarship.title}</span>
                    </div>
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
                    {application.fullName.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <h4 className="font-semibold text-gray-900">{application.fullName}</h4>
                  <div className="flex text-sm text-gray-500 items-center font-semibold gap-8">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      <span>{application.phone || 'N/A'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      <span>{application.email || 'N/A'}</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Additional Information */}
              <div className="text-sm bg-gray-100 rounded-md p-3">
                <p className="text-sm font-semibold text-gray-600 mb-2">Additional Information</p>
                <div className="grid text-sm text-gray-500 items-center font-semibold grid-cols-2 gap-2">
                  <div className="flex items-center gap-2">
                    <span>Gender: {application.gender || 'N/A'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>Date of Birth: {formatDate(application.dateOfBirth) || 'N/A'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>Address: {application.address || 'N/A'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>Nationality: {application.nationality || 'N/A'}</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Education Background Section */}
          <section>
            <h3 className="text-base font-bold text-gray-900 mb-2">Education Background</h3>
            <div className="bg-white rounded-lg border-2 border-gray-200 p-3 mb-4">
              <div className="text-sm bg-gray-100 rounded-md p-3">
                <div className="grid text-sm text-gray-500 items-center font-semibold grid-cols-2 gap-2">
                  <div className="flex items-center gap-2">
                    <span>Education Level: {application.educationLevel || 'N/A'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>School Name: {application.schoolName || 'N/A'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>Major: {application.major || 'N/A'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>
                      GPA:{' '}
                      {application.gpa !== undefined && application.gpa !== null
                        ? application.gpa.toFixed(2)
                        : 'N/A'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>Graduation Year: {application.graduationYear || 'N/A'}</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Skills & Achievements Section */}
          <section>
            <h3 className="text-base font-bold text-gray-900 mb-2">Skills & Achievements</h3>
            <div className="bg-white rounded-lg border-2 border-gray-200 p-3 mb-4 space-y-4">
              {/* Skills */}
              {application.skills && (
                <div>
                  <p className="text-sm font-semibold text-gray-600 mb-2">Skills</p>
                  <div className="flex flex-wrap gap-2">
                    {application.skills.split(',').map((skill, index) => (
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

              {/* Achievements */}
              {application.achievements && (
                <div className="text-sm bg-gray-100 rounded-md p-3">
                  <p className="text-sm font-semibold text-gray-600 mb-2">Achievements</p>
                  <div className="space-y-1">
                    {application.achievements.split(',').map((achievement, index) => (
                      <div key={index} className="text-sm text-gray-500 font-semibold">
                        • {achievement.trim()}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Extracurricular Activities */}
              {application.extracurricular && (
                <div className="text-sm bg-gray-100 rounded-md p-3">
                  <p className="text-sm font-semibold text-gray-600 mb-2">
                    Extracurricular Activities
                  </p>
                  <div className="space-y-1">
                    {application.extracurricular.split(',').map((activity, index) => (
                      <div key={index} className="text-sm text-gray-500 font-semibold">
                        • {activity.trim()}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Reason Section */}
          <section>
            <h3 className="text-base font-bold text-gray-900 mb-2">Reason</h3>
            <div className="bg-white rounded-lg border-2 border-gray-200 p-3 mb-4">
              <p className="text-sm text-gray-600 bg-gray-50 rounded-md p-3 leading-relaxed">
                {application.motivation || 'No motivation provided'}
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
          <section>
            <h3 className="text-base font-bold text-gray-900 mb-2">Application History</h3>
            <div className="bg-white rounded-lg border-2 border-gray-200 p-3 mb-4">
              <div className="relative">
                {/* Timeline */}
                <div className="space-y-6 pl-6 border-l-2 border-blue-200">
                  {reviewedAt && (
                    <div className="relative">
                      <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-500 border-2 border-white"></div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-900">
                          {formatDateTime(reviewedAt)}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          {status ? `${formatStatus(status)} Application` : 'Application Submitted'}
                        </p>
                        {scholarship && (
                          <p className="text-xs text-gray-500 mt-1">{scholarship.title}</p>
                        )}
                      </div>
                    </div>
                  )}

                  {application.graduationYear && (
                    <div className="relative">
                      <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-500 border-2 border-white"></div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-900">
                          Expected Graduation: {application.graduationYear}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">Graduation Year</p>
                        {application.schoolName && (
                          <p className="text-xs text-gray-500 mt-1">{application.schoolName}</p>
                        )}
                        {application.major && (
                          <p className="text-xs text-gray-500">{application.major}</p>
                        )}
                      </div>
                    </div>
                  )}

                  {appliedScholarship?.note && (
                    <div className="relative">
                      <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-500 border-2 border-white"></div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-900">Note</p>
                        <p className="text-sm text-gray-600 mt-1 whitespace-pre-wrap">
                          {appliedScholarship.note}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        </div>
      </SheetContent>
    </Sheet>
  );
}
