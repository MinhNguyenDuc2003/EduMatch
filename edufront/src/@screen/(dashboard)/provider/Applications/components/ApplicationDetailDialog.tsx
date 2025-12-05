'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/pattern/cus/dialog';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
} from '@/pattern/cus/drawer';
import { Skeleton } from '@/pattern/cus/skeleton';
import { getStatusColor } from '../utils/applicationUtils';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from '@/pattern/cus/avatar';
import { Badge } from '@/pattern/cus/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/pattern/cus/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/pattern/cus/tabs';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { Button } from '@/pattern/cus/button';
import { Textarea } from '@/pattern/cus/textarea';
import { CheckCircle, FileText, XCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

interface ApplicationDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAction?: (
    applicationScholarship: ApplicationScholarship,
    status: string,
    note?: string
  ) => void;
  applicationScholarship: ApplicationScholarship | null;
  isLoading?: boolean;
}

const ApplicationDetailDialog = React.memo(
  ({
    open,
    onOpenChange,
    onAction,
    applicationScholarship,
    isLoading = false,
  }: ApplicationDetailDialogProps) => {
    const isMobile = useMediaQuery('(max-width: 768px)');
    const [note, setNote] = useState('');
    const t = useTranslations('providerApplications');
    // Reset note when dialog closes
    useEffect(() => {
      if (!open) {
        setNote('');
      }
    }, [open]);

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
                  {t(applicationScholarship.status)}
                </Badge>
              </div>
              <div className="text-sm">
                <p className="text-muted-foreground">{t('appliedDate')}</p>
                <p className="font-semibold">{appliedDate}</p>
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
              {t('personal')}
            </TabsTrigger>
            <TabsTrigger value="education" className={isMobileView ? 'flex-shrink-0' : ''}>
              {t('education')}
            </TabsTrigger>
            <TabsTrigger value="experience" className={isMobileView ? 'flex-shrink-0' : ''}>
              {t('experience')}
            </TabsTrigger>
            <TabsTrigger value="statement" className={isMobileView ? 'flex-shrink-0' : ''}>
              {t('statement')}
            </TabsTrigger>
          </TabsList>

          {/* Personal Information Tab */}
          <TabsContent value="personal" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{t('personal')}</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-6 sm:grid-cols-2">
                <div>
                  <p className="text-sm text-muted-foreground">{t('fullName')}</p>
                  <p className="font-semibold">{application.fullName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t('gender')}</p>
                  <p className="font-semibold">{application.gender || '-'}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t('dateOfBirth')}</p>
                  <p className="font-semibold">{application.dateOfBirth || '-'}</p>
                </div>
                {application.age && (
                  <div>
                    <p className="text-sm text-muted-foreground">{t('age')}</p>
                    <p className="font-semibold">{application.age}</p>
                  </div>
                )}
                <div>
                  <p className="text-sm text-muted-foreground">{t('nationality')}</p>
                  <p className="font-semibold">{application.nationality || '-'}</p>
                </div>
                {application.citizenship && (
                  <div>
                    <p className="text-sm text-muted-foreground">{t('citizenship')}</p>
                    <p className="font-semibold">{application.citizenship}</p>
                  </div>
                )}
                <div>
                  <p className="text-sm text-muted-foreground">{t('email')}</p>
                  <p className="font-semibold">{application.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t('phone')}</p>
                  <p className="font-semibold">{application.phone || '-'}</p>
                </div>
                <div className="sm:col-span-2">
                  <p className="text-sm text-muted-foreground">{t('address')}</p>
                  <p className="font-semibold">{application.address || '-'}</p>
                </div>
                {application.languages && (
                  <div className="sm:col-span-2">
                    <p className="text-sm text-muted-foreground">{t('languages')}</p>
                    <p className="font-semibold">{application.languages}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Education Tab */}
          <TabsContent value="education" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{t('education')}</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-6 sm:grid-cols-2">
                <div>
                  <p className="text-sm text-muted-foreground">{t('educationLevel')}</p>
                  <p className="font-semibold">{application.educationLevel || '-'}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t('graduationYear')}</p>
                  <p className="font-semibold">{application.graduationYear || '-'}</p>
                </div>
                <div className="sm:col-span-2">
                  <p className="text-sm text-muted-foreground">{t('schoolName')}</p>
                  <p className="font-semibold">{application.schoolName || '-'}</p>
                </div>
                <div className="sm:col-span-2">
                  <p className="text-sm text-muted-foreground">{t('major')}</p>
                  <p className="font-semibold">{application.major || '-'}</p>
                </div>
                {application.gpa && (
                  <div>
                    <p className="text-sm text-muted-foreground">{t('gpa')}</p>
                    <p className="font-semibold">{application.gpa}/4.0</p>
                  </div>
                )}
                {application.classRank && (
                  <div>
                    <p className="text-sm text-muted-foreground">{t('classRank')}</p>
                    <p className="font-semibold">{application.classRank}</p>
                  </div>
                )}
                {application.classSize && (
                  <div>
                    <p className="text-sm text-muted-foreground">{t('classSize')}</p>
                    <p className="font-semibold">{application.classSize}</p>
                  </div>
                )}
                {application.classRankPercentile && (
                  <div>
                    <p className="text-sm text-muted-foreground">{t('classRankPercentile')}</p>
                    <p className="font-semibold">{application.classRankPercentile}%</p>
                  </div>
                )}
                {application.academicAwards && (
                  <div className="sm:col-span-2">
                    <p className="text-sm text-muted-foreground">{t('academicAwards')}</p>
                    <p className="font-semibold">{application.academicAwards}</p>
                  </div>
                )}
                {application.publicationCount !== undefined &&
                  application.publicationCount !== null && (
                    <div>
                      <p className="text-sm text-muted-foreground">{t('publicationCount')}</p>
                      <p className="font-semibold">{application.publicationCount}</p>
                    </div>
                  )}
              </CardContent>
            </Card>

            {/* Test Scores */}
            {(application.satScore ||
              application.actScore ||
              application.greScore ||
              application.gmatScore ||
              application.toeflScore ||
              application.ieltsScore) && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">{t('testScores')}</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-6 sm:grid-cols-2">
                  {application.satScore && (
                    <div>
                      <p className="text-sm text-muted-foreground">{t('satScore')}</p>
                      <p className="font-semibold">{application.satScore}/1600</p>
                    </div>
                  )}
                  {application.actScore && (
                    <div>
                      <p className="text-sm text-muted-foreground">{t('actScore')}</p>
                      <p className="font-semibold">{application.actScore}/36</p>
                    </div>
                  )}
                  {application.greScore && (
                    <div>
                      <p className="text-sm text-muted-foreground">{t('greScore')}</p>
                      <p className="font-semibold">{application.greScore}/340</p>
                    </div>
                  )}
                  {application.gmatScore && (
                    <div>
                      <p className="text-sm text-muted-foreground">{t('gmatScore')}</p>
                      <p className="font-semibold">{application.gmatScore}/800</p>
                    </div>
                  )}
                  {application.toeflScore && (
                    <div>
                      <p className="text-sm text-muted-foreground">{t('toeflScore')}</p>
                      <p className="font-semibold">{application.toeflScore}/120</p>
                    </div>
                  )}
                  {application.ieltsScore && (
                    <div>
                      <p className="text-sm text-muted-foreground">{t('ieltsScore')}</p>
                      <p className="font-semibold">{application.ieltsScore}/9.0</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Experience Tab */}
          <TabsContent value="experience" className="space-y-4">
            {/* Skills */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">{t('skills')}</CardTitle>
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
                  <p className="text-sm text-muted-foreground">{t('noSkillsListed')}</p>
                )}
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">{t('achievements')}</CardTitle>
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
                  <p className="text-sm text-muted-foreground">{t('noAchievementsListed')}</p>
                )}
              </CardContent>
            </Card>

            {/* Extracurricular */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">{t('extracurricularActivities')}</CardTitle>
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
                  <p className="text-sm text-muted-foreground">{t('noActivitiesListed')}</p>
                )}
              </CardContent>
            </Card>

            {/* Work Experience */}
            {application.workExperienceYears !== undefined &&
              application.workExperienceYears !== null && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">{t('workExperience')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">
                      <span className="font-semibold">{application.workExperienceYears}</span>{' '}
                      {t('years')}
                    </p>
                  </CardContent>
                </Card>
              )}

            {/* Athletic Information */}
            {application.isAthlete && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">{t('athleticInformation')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">{t('isAthlete')}</p>
                    <Badge variant="outline" className="mt-1">
                      {t('yes')}
                    </Badge>
                  </div>
                  {application.athleticAchievements && (
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {t('athleticAchievements')}
                      </p>
                      <p className="text-sm whitespace-pre-wrap">
                        {application.athleticAchievements}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Personal Statement Tab */}
          <TabsContent value="statement" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">{t('motivation')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-wrap text-sm leading-relaxed">
                  {application.motivation || 'No motivation statement provided'}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">{t('personalStatement')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-wrap text-sm leading-relaxed">
                  {application.personalStatement || 'No personal statement provided'}
                </p>
              </CardContent>
            </Card>

            {application.careerGoal && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">{t('careerGoal')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="whitespace-pre-wrap text-sm leading-relaxed">
                    {application.careerGoal}
                  </p>
                </CardContent>
              </Card>
            )}

            {application.researchInterest && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">{t('researchInterest')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="whitespace-pre-wrap text-sm leading-relaxed">
                    {application.researchInterest}
                  </p>
                </CardContent>
              </Card>
            )}

            {application.applicationAttributes && application.applicationAttributes.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">{t('additionalInformation')}</CardTitle>
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
              <CardTitle className="text-base">{t('attachments')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Images Section */}
              {application.applicationMedias.some((media) =>
                media.contentType.startsWith('image')
              ) && (
                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground mb-3">
                    {t('images')}
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {application.applicationMedias
                      .filter((media) => media.contentType.startsWith('image'))
                      .map((media, index) => (
                        <div
                          key={index}
                          className="relative group aspect-video rounded-lg overflow-hidden border-2 border-gray-200 hover:border-primary transition-colors"
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
                </div>
              )}

              {/* Documents Section */}
              {application.applicationMedias.some(
                (media) => media.contentType === 'application/pdf'
              ) && (
                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground mb-3">
                    {t('documents')}
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {application.applicationMedias
                      .filter((media) => media.contentType === 'application/pdf')
                      .map((media, index) => (
                        <Link
                          key={index}
                          href={media.url}
                          target="_blank"
                          className="relative group aspect-video rounded-lg overflow-hidden border-2 border-gray-200 hover:border-primary transition-colors flex items-center justify-center bg-gray-50 hover:bg-gray-100"
                        >
                          <div className="text-center">
                            <FileText className="w-12 h-12 mx-auto text-primary mb-2" />
                            <p className="text-xs text-muted-foreground">PDF {index + 1}</p>
                          </div>
                        </Link>
                      ))}
                  </div>
                </div>
              )}
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
                {t('applicationDetail')}
              </DrawerTitle>
              <DrawerDescription className="sr-only" />
            </DrawerHeader>
            <div className="flex-1 overflow-y-auto px-4">
              <Content isMobileView={isMobile} />
              <div className="border-t pt-4">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="mobile-note" className="text-sm font-medium mb-2 block">
                      {t('note')}
                    </label>
                    <Textarea
                      id="mobile-note"
                      placeholder={t('notePlaceholder')}
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      rows={3}
                      className="resize-none"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => {
                        onAction?.(applicationScholarship, 'Rejected', note || '');
                        onOpenChange(false);
                      }}
                      className="flex-1 bg-red-500 text-white py-3 text-base font-semibold hover:bg-red-600"
                    >
                      <XCircle className="mr-2 h-4 w-4" />
                      {t('reject')}
                    </Button>
                    <Button
                      onClick={() => {
                        onAction?.(applicationScholarship, 'Approved', note || '');
                        onOpenChange(false);
                      }}
                      className="flex-1 bg-[#3D6CB9] hover:bg-[#2F5A9E] text-white py-3 text-base font-semibold"
                    >
                      <CheckCircle className="mr-2 h-4 w-4" />
                      {t('approve')}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      );
    }

    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-h-[90vh] w-full min-w-4xl max-w-6xl overflow-y-auto">
          <DialogTitle className="text-2xl font-bold">{t('applicationDetail')}</DialogTitle>
          <Content isMobileView={false} />
          <DialogFooter className="flex flex-col gap-4 sm:flex-col">
            <div className="w-full space-y-2">
              <label htmlFor="desktop-note" className="text-sm font-medium">
                {t('note')}
              </label>
              <Textarea
                id="desktop-note"
                placeholder={t('notePlaceholder')}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={3}
                className="resize-none"
              />
            </div>
            <div className="flex gap-2 justify-end w-full sm:w-auto">
              <Button
                onClick={() => {
                  onAction?.(applicationScholarship, 'Rejected', note || '');
                  onOpenChange(false);
                }}
                className="flex-1 sm:flex-initial bg-red-500 text-white py-3 text-base font-semibold hover:bg-red-600"
              >
                <XCircle className="mr-2 h-4 w-4" />
                {t('reject')}
              </Button>
              <Button
                onClick={() => {
                  onAction?.(applicationScholarship, 'Approved', note || '');
                  onOpenChange(false);
                }}
                className="flex-1 sm:flex-initial bg-[#3D6CB9] hover:bg-[#2F5A9E] text-white py-3 text-base font-semibold"
              >
                <CheckCircle className="mr-2 h-4 w-4" />
                {t('approve')}
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
);

ApplicationDetailDialog.displayName = 'ApplicationDetailDialog';

export default ApplicationDetailDialog;
