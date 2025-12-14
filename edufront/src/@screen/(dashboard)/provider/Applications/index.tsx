'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import ScholarshipList from './components/ScholarshipList';
import ApplicationsHeader from './components/ApplicationsHeader';
import ScholarshipTypeFilter from './components/ScholarshipTypeFilter';
import ApplicationsSelectScholarship from './components/ApplicationsSelectScholarship';
import ApplicationsSkeleton from './components/ApplicationsSkeleton';
import ApplicationsContentHeader from './components/ApplicationsContentHeader';
import ApplicationsTable from './components/ApplicationsTable';
import ApplicationsEmptyState from './components/ApplicationsEmptyState';
import ApplicationDetailDialog from './components/ApplicationDetailDialog';
import {
  useGetApplicationsByScholarshipIdQuery,
  useGetScholarshipsQuery,
  useUpdateApplicationStatusMutation,
} from '@/state/apiProvider';
import { useApplicationsData } from './hooks/useApplicationsData';
import { useScholarshipFilter } from './hooks/useScholarshipFilter';

const Applications = () => {
  const t = useTranslations('providerApplications');
  const [selectedScholarship, setSelectedScholarship] = useState<Scholarship | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedScholarshipType, setSelectedScholarshipType] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedApplicationScholarship, setSelectedApplicationScholarship] =
    useState<ApplicationScholarship | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Fetch scholarships
  const { data: scholarships, isLoading: isLoadingScholarships } = useGetScholarshipsQuery();
  const [updateApplicationStatus] = useUpdateApplicationStatusMutation();

  // Filter scholarships by type
  const filteredScholarships = useScholarshipFilter(
    scholarships,
    selectedScholarshipType,
    selectedScholarship,
    setSelectedScholarship
  );

  // Fetch applications for selected scholarship
  const { data: applicationsScholarships, isLoading: isLoadingApplications } =
    useGetApplicationsByScholarshipIdQuery(
      { scholarshipId: selectedScholarship?.id ?? 0 },
      {
        skip: !selectedScholarship?.id,
      }
    );

  // Transform and filter applications data
  const { applications, filteredApplications } = useApplicationsData(
    applicationsScholarships,
    searchQuery,
    statusFilter
  );

  // Handlers
  const handleViewApplication = useCallback((applicationScholarship: ApplicationScholarship) => {
    setSelectedApplicationScholarship(applicationScholarship);
    setIsDialogOpen(true);
  }, []);

  const handleUpdateApplicationStatus = async (
    applicationScholarship: ApplicationScholarship,
    status: string,
    note?: string
  ) => {
    try {
      await updateApplicationStatus({
        id: applicationScholarship.id,
        applicationId: applicationScholarship.applicationId,
        scholarshipId: applicationScholarship.scholarshipId,
        note,
        reviewedAt: Date.now(), // Timestamp
        status,
      }).unwrap();
    } catch (error) {
      console.log(t('failedToUpdateApplication'), error);
    }
  };

  return (
    <div className="p-6 lg:p-8 h-[calc(100vh-4rem)] flex flex-col">
      <ApplicationsHeader selectedScholarship={selectedScholarship} />

      {/* Main Content: Two Column Layout */}
      <div className="flex-1 flex flex-col md:flex-row gap-6 md:overflow-hidden">
        {/* Left Sidebar: Scholarships List */}
        <div className="w-full md:w-64 flex-shrink-0 flex flex-col md:border-r border-gray-200 md:pr-6">
          <ScholarshipTypeFilter
            value={selectedScholarshipType}
            onChange={setSelectedScholarshipType}
          />
          <ScholarshipList
            scholarships={filteredScholarships}
            isLoading={isLoadingScholarships}
            selectedScholarship={selectedScholarship}
            setSelectedScholarship={setSelectedScholarship}
          />
        </div>

        {/* Right Side: Applications */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {!selectedScholarship ? (
            <ApplicationsSelectScholarship />
          ) : isLoadingApplications ? (
            <ApplicationsSkeleton
              scholarshipTitle={selectedScholarship.title}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              statusFilter={statusFilter}
              onStatusFilterChange={setStatusFilter}
            />
          ) : (
            <>
              <ApplicationsContentHeader
                scholarship={selectedScholarship}
                filteredCount={filteredApplications.length}
                totalCount={applications.length}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                statusFilter={statusFilter}
                onStatusFilterChange={setStatusFilter}
                onView={handleViewApplication}
              />

              {filteredApplications.length > 0 ? (
                <ApplicationsTable
                  applications={filteredApplications}
                  onView={handleViewApplication}
                />
              ) : (
                <ApplicationsEmptyState hasApplications={applications.length > 0} />
              )}
            </>
          )}
        </div>
      </div>

      {/* Application Detail Dialog */}
      <ApplicationDetailDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onAction={handleUpdateApplicationStatus}
        applicationScholarship={selectedApplicationScholarship}
        isLoading={false}
      />
    </div>
  );
};

export default Applications;
