import React from 'react';
import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/lib/cus/dialog';
import { Skeleton } from '@/lib/cus/skeleton';
import { Separator } from '@/lib/cus/separator';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  GraduationCap,
  School,
  Award,
  BookOpen,
  Target,
  FileText,
  Image as ImageIcon,
  Mars,
} from 'lucide-react';
import { formatStatus, getStatusColor } from '../utils/applicationUtils';
import { cn } from '@/lib/utils';

interface ApplicationDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  application: Application | null;
  applicationScholarship: ApplicationScholarship | null;
  isLoading?: boolean;
}

const ApplicationDetailDialog = React.memo(
  ({
    open,
    onOpenChange,
    application,
    applicationScholarship,
    isLoading = false,
  }: ApplicationDetailDialogProps) => {
    if (isLoading) {
      return (
        <Dialog open={open} onOpenChange={onOpenChange}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <Skeleton className="h-8 w-64" />
              <Skeleton className="h-4 w-48 mt-2" />
            </DialogHeader>
            <div className="space-y-4">
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-32 w-full" />
            </div>
          </DialogContent>
        </Dialog>
      );
    }

    if (!application) {
      return null;
    }

    const status = applicationScholarship?.status || 'pending';
    const appliedDate = applicationScholarship?.appliedAt
      ? new Date(
          applicationScholarship.appliedAt > 1e12
            ? applicationScholarship.appliedAt
            : applicationScholarship.appliedAt * 1000
        ).toLocaleDateString()
      : 'N/A';

    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-900">
              Application Details
            </DialogTitle>
            <DialogDescription>
              View complete application information for {application.fullName}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Status Badge */}
            <div className="flex items-center justify-between">
              <span
                className={cn(
                  'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border',
                  getStatusColor(status)
                )}
              >
                {formatStatus(status)}
              </span>
              <span className="text-sm text-gray-500">Applied on: {appliedDate}</span>
            </div>

            <Separator />

            {/* Personal Information */}
            <section>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <User className="w-5 h-5" />
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DetailField label="Full Name" value={application.fullName} icon={User} />
                <DetailField label="Email" value={application.email} icon={Mail} />
                <DetailField label="Phone" value={application.phone} icon={Phone} />
                <DetailField label="Address" value={application.address} icon={MapPin} />
                <DetailField
                  label="Date of Birth"
                  value={application.dateOfBirth}
                  icon={Calendar}
                />
                <DetailField label="Gender" value={application.gender} icon={Mars} />
                <DetailField label="Nationality" value={application.nationality} icon={MapPin} />
              </div>
            </section>

            <Separator />

            {/* Educational Background */}
            <section>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <GraduationCap className="w-5 h-5" />
                Educational Background
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DetailField
                  label="Education Level"
                  value={application.educationLevel}
                  icon={School}
                />
                <DetailField label="School Name" value={application.schoolName} icon={School} />
                <DetailField label="Major" value={application.major} icon={BookOpen} />
                <DetailField
                  label="GPA"
                  value={application.gpa?.toString() || 'N/A'}
                  icon={GraduationCap}
                />
                <DetailField
                  label="Graduation Year"
                  value={application.graduationYear}
                  icon={Calendar}
                />
              </div>
            </section>

            <Separator />

            {/* Skills & Achievements */}
            <section>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Award className="w-5 h-5" />
                Skills & Achievements
              </h3>
              <div className="space-y-4">
                <DetailField label="Skills" value={application.skills} multiline />
                <DetailField label="Achievements" value={application.achievements} multiline />
                <DetailField
                  label="Extracurricular Activities"
                  value={application.extracurricular}
                  multiline
                />
              </div>
            </section>

            <Separator />

            {/* Motivation & Personal Statement */}
            <section>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Target className="w-5 h-5" />
                Motivation & Personal Statement
              </h3>
              <div className="space-y-4">
                <DetailField label="Motivation" value={application.motivation} multiline />
                <DetailField
                  label="Personal Statement"
                  value={application.personalStatement}
                  multiline
                />
              </div>
            </section>

            {/* Application Attributes */}
            {application.applicationAttributes && application.applicationAttributes.length > 0 && (
              <>
                <Separator />
                <section>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Additional Information
                  </h3>
                  <div className="space-y-3">
                    {application.applicationAttributes.map((attr, index) => (
                      <div
                        key={attr.id || index}
                        className="border border-gray-200 rounded-lg p-4 bg-gray-50"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">{attr.key}</p>
                            <p className="text-sm text-gray-700 mt-1">{attr.value}</p>
                            {attr.note && (
                              <p className="text-xs text-gray-500 mt-2 italic">{attr.note}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </>
            )}

            {/* Application Media */}
            {application.applicationMedias && application.applicationMedias.length > 0 && (
              <>
                <Separator />
                <section>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <ImageIcon className="w-5 h-5" />
                    Attached Images
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {application.applicationMedias.map((media) => (
                      <div
                        key={media.id}
                        className="relative aspect-video rounded-lg overflow-hidden border border-gray-200 group"
                      >
                        <Image
                          src={media.url || media.thumbnail || '/placeholder-image.jpg'}
                          alt={media.fileName || 'Application image'}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                      </div>
                    ))}
                  </div>
                </section>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    );
  }
);

ApplicationDetailDialog.displayName = 'ApplicationDetailDialog';

interface DetailFieldProps {
  label: string;
  value: string | undefined;
  icon?: React.ComponentType<{ className?: string }>;
  multiline?: boolean;
}

const DetailField = ({ label, value, icon: Icon, multiline = false }: DetailFieldProps) => {
  if (!value) return null;

  return (
    <div className={multiline ? 'col-span-full' : ''}>
      <div className="flex items-start gap-2">
        {Icon && <Icon className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />}
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-500 mb-1">{label}</p>
          {multiline ? (
            <p className="text-sm text-gray-900 whitespace-pre-wrap">{value}</p>
          ) : (
            <p className="text-sm text-gray-900">{value}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetailDialog;
