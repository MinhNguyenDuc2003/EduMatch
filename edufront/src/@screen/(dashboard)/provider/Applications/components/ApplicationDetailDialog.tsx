'use client';

import React from 'react';
import Image from 'next/image';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/lib/cus/dialog';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from '@/lib/cus/drawer';
import { Skeleton } from '@/lib/cus/skeleton';
import { getStatusColor } from '../utils/applicationUtils';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from '@/lib/cus/avatar';
import { Badge } from '@/lib/cus/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/lib/cus/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/lib/cus/tabs';
import { useMediaQuery } from '@/hooks/useMediaQuery';

interface ApplicationDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  applicationScholarship: ApplicationScholarship | null;
  isLoading?: boolean;
}

const ApplicationDetailDialog = React.memo(
  ({
    open,
    onOpenChange,
    applicationScholarship,
    isLoading = false,
  }: ApplicationDetailDialogProps) => {
    const isMobile = useMediaQuery('(max-width: 768px)');

    if (isLoading) {
      if (isMobile) {
        return (
          <Drawer open={open} onOpenChange={onOpenChange}>
            <DrawerContent className="max-h-[95vh]">
              <DrawerHeader>
                <Skeleton className="h-8 w-64" />
                <Skeleton className="h-4 w-48 mt-2" />
              </DrawerHeader>
              <div className="space-y-4 p-4">
                <Skeleton className="h-32 w-full" />
                <Skeleton className="h-32 w-full" />
                <Skeleton className="h-32 w-full" />
              </div>
            </DrawerContent>
          </Drawer>
        );
      }

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

    if (!applicationScholarship) {
      return null;
    }

    const application = applicationScholarship.applicationVo;
    const skillsList =
      application.skills
        ?.split(',')
        .map((s) => s.trim())
        .filter(Boolean) || [];
    const achievementsList =
      application.achievements
        ?.split(',')
        .map((s) => s.trim())
        .filter(Boolean) || [];
    const extracurricularList =
      application.extracurricular
        ?.split(',')
        .map((s) => s.trim())
        .filter(Boolean) || [];

    const initials = application.fullName
      ?.split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();

    const appliedDate = applicationScholarship.appliedAt
      ? new Date(applicationScholarship.appliedAt).toLocaleDateString('vi-VN', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })
      : 'Not specified';

    const Content = ({ isMobileView }: { isMobileView: boolean }) => (
      <>
        {/* Header Section */}
        <div className={cn('border-b bg-background py-4', isMobileView ? 'px-4' : '-mx-6 px-6')}>
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12 ">
                <AvatarFallback className="bg-primary-brand text-primary-foreground font-semibold">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1
                  className={cn(
                    'font-bold text-primary-brand',
                    isMobileView ? 'text-lg' : 'text-2xl'
                  )}
                >
                  {application.fullName}
                </h1>
                <p className="text-sm text-muted-foreground">{application.email}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="mb-2">
                <Badge className={`${getStatusColor(applicationScholarship.status)} border`}>
                  {applicationScholarship.status}
                </Badge>
              </div>
              <div className="text-sm">
                <p className="text-muted-foreground">Applied Date ID</p>
                <p className="font-semibold">#{appliedDate}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Content Tabs */}
        <Tabs defaultValue="personal" className="mt-6">
          <TabsList
            className={cn('w-full', isMobileView ? 'flex overflow-x-auto' : 'grid grid-cols-4')}
          >
            <TabsTrigger value="personal" className={isMobileView ? 'flex-shrink-0' : ''}>
              Personal
            </TabsTrigger>
            <TabsTrigger value="education" className={isMobileView ? 'flex-shrink-0' : ''}>
              Education
            </TabsTrigger>
            <TabsTrigger value="experience" className={isMobileView ? 'flex-shrink-0' : ''}>
              Experience
            </TabsTrigger>
            <TabsTrigger value="statement" className={isMobileView ? 'flex-shrink-0' : ''}>
              Statement
            </TabsTrigger>
          </TabsList>

          {/* Personal Information Tab */}
          <TabsContent value="personal" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-6 sm:grid-cols-2">
                <div>
                  <p className="text-sm text-muted-foreground">Full Name</p>
                  <p className="font-semibold">{application.fullName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Gender</p>
                  <p className="font-semibold">{application.gender || '-'}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Date of Birth</p>
                  <p className="font-semibold">{application.dateOfBirth || '-'}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Nationality</p>
                  <p className="font-semibold">{application.nationality || '-'}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-semibold">{application.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-semibold">{application.phone || '-'}</p>
                </div>
                <div className="sm:col-span-2">
                  <p className="text-sm text-muted-foreground">Address</p>
                  <p className="font-semibold">{application.address || '-'}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Education Tab */}
          <TabsContent value="education" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Education</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-6 sm:grid-cols-2">
                <div>
                  <p className="text-sm text-muted-foreground">Education Level</p>
                  <p className="font-semibold">{application.educationLevel || '-'}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Graduation Year</p>
                  <p className="font-semibold">{application.graduationYear || '-'}</p>
                </div>
                <div className="sm:col-span-2">
                  <p className="text-sm text-muted-foreground">School Name</p>
                  <p className="font-semibold">{application.schoolName || '-'}</p>
                </div>
                <div className="sm:col-span-2">
                  <p className="text-sm text-muted-foreground">Major</p>
                  <p className="font-semibold">{application.major || '-'}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">GPA</p>
                  <p className="font-semibold">{application.gpa || '-'}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Experience Tab */}
          <TabsContent value="experience" className="space-y-4">
            {/* Skills */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Skills</CardTitle>
              </CardHeader>
              <CardContent>
                {skillsList.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {skillsList.map((skill, i) => (
                      <Badge key={i} variant="outline" className="border-primary/30 bg-primary/5">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No skills listed</p>
                )}
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Achievements</CardTitle>
              </CardHeader>
              <CardContent>
                {achievementsList.length > 0 ? (
                  <ul className="space-y-2">
                    {achievementsList.map((achievement, i) => (
                      <li key={i} className="flex gap-2 text-sm">
                        <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-primary" />
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-muted-foreground">No achievements listed</p>
                )}
              </CardContent>
            </Card>

            {/* Extracurricular */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Extracurricular Activities</CardTitle>
              </CardHeader>
              <CardContent>
                {extracurricularList.length > 0 ? (
                  <ul className="space-y-2">
                    {extracurricularList.map((activity, i) => (
                      <li key={i} className="flex gap-2 text-sm">
                        <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-primary" />
                        <span>{activity}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-muted-foreground">No activities listed</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Personal Statement Tab */}
          <TabsContent value="statement" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Motivation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-wrap text-sm leading-relaxed">
                  {application.motivation || 'No motivation statement provided'}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Personal Statement</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-wrap text-sm leading-relaxed">
                  {application.personalStatement || 'No personal statement provided'}
                </p>
              </CardContent>
            </Card>

            {application.applicationAttributes && application.applicationAttributes.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Additional Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {application.applicationAttributes.map((attr) => (
                    <div key={attr.id} className="border-l-2 border-primary/30 pl-4">
                      <p className="text-xs font-semibold uppercase text-primary-brand">
                        {attr.key}
                      </p>
                      <p className="text-sm">{attr.value}</p>
                      {attr.note && (
                        <p className="mt-1 text-xs text-muted-foreground">{attr.note}</p>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>

        {/* Media Section */}
        {application.applicationMedias && application.applicationMedias.length > 0 && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-base">Attachments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {application.applicationMedias.map((media, index) => (
                  <div
                    key={index}
                    className="relative group aspect-video rounded-lg overflow-hidden border-2 border-gray-200"
                  >
                    <Image
                      src={media.url}
                      alt={`Scholarship image ${index + 1}`}
                      width={100}
                      height={100}
                      unoptimized
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </>
    );

    if (isMobile) {
      return (
        <Drawer open={open} onOpenChange={onOpenChange}>
          <DrawerContent className="max-h-[95vh]">
            <DrawerHeader className="border-b">
              <DrawerTitle className="text-xl font-semibold text-primary-brand">
                Application Detail
              </DrawerTitle>
              <DrawerDescription className="sr-only" />
            </DrawerHeader>
            <div className="flex-1 overflow-y-auto px-4">
              <Content isMobileView={isMobile} />
            </div>
          </DrawerContent>
        </Drawer>
      );
    }

    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-h-[90vh] w-full min-w-4xl max-w-6xl overflow-y-auto">
          <DialogTitle className="text-2xl font-bold">Application Detail</DialogTitle>
          <Content isMobileView={false} />
        </DialogContent>
      </Dialog>
    );
  }
);

export default ApplicationDetailDialog;
