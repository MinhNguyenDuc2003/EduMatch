'use client';

import React, { useState, useCallback, useMemo } from 'react';
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
} from '@/state/apiProvider';
import { useApplicationsData } from './hooks/useApplicationsData';
import { useScholarshipFilter } from './hooks/useScholarshipFilter';

const Applications = () => {
  const [selectedScholarship, setSelectedScholarship] = useState<Scholarship | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedScholarshipType, setSelectedScholarshipType] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedApplicationId, setSelectedApplicationId] = useState<number | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Fetch scholarships
  const { data: scholarships, isLoading: isLoadingScholarships } = useGetScholarshipsQuery();

  // Filter scholarships by type
  const filteredScholarships = useScholarshipFilter(
    scholarships,
    selectedScholarshipType,
    selectedScholarship,
    setSelectedScholarship
  );

  // Fetch applications for selected scholarship
  const { data: applicationsScholarships, isLoading: isLoadingApplications } =
    useGetApplicationsByScholarshipIdQuery(selectedScholarship?.id ?? 0, {
      skip: !selectedScholarship?.id,
    });

  // Transform and filter applications data
  const { applications, filteredApplications } = useApplicationsData(
    applicationsScholarships,
    searchQuery,
    statusFilter
  );

  // Find selected application and applicationScholarship
  // Note: DisplayApplication.id = appScholarship.id || application.id
  // So we need to check both ApplicationScholarship.id and Application.id
  const selectedApplicationData = useMemo(() => {
    if (!selectedApplicationId || !applicationsScholarships) {
      return { application: null, applicationScholarship: null };
    }

    // Find ApplicationScholarship by its id or by Application.id
    const appScholarship = applicationsScholarships.find(
      (app) => app.id === selectedApplicationId || app.applicationVo?.id === selectedApplicationId
    );

    return {
      application: appScholarship?.applicationVo || null,
      applicationScholarship: appScholarship || null,
    };
  }, [selectedApplicationId, applicationsScholarships]);

  // Handlers
  const handleViewApplication = useCallback((id: number) => {
    setSelectedApplicationId(id);
    setIsDialogOpen(true);
  }, []);

  const handleCloseDialog = useCallback(() => {
    setIsDialogOpen(false);
    setSelectedApplicationId(null);
  }, []);

  const handleApproveApplication = useCallback((id: number) => {
    // TODO: Implement approve application logic
    console.log('Approve application:', id);
  }, []);

  const handleRejectApplication = useCallback((id: number) => {
    // TODO: Implement reject application logic
    console.log('Reject application:', id);
  }, []);

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
                scholarshipTitle={selectedScholarship.title}
                filteredCount={filteredApplications.length}
                totalCount={applications.length}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                statusFilter={statusFilter}
                onStatusFilterChange={setStatusFilter}
              />

              {filteredApplications.length > 0 ? (
                <ApplicationsTable
                  applications={filteredApplications}
                  onView={handleViewApplication}
                  onApprove={handleApproveApplication}
                  onReject={handleRejectApplication}
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
        application={selectedApplicationData.application}
        applicationScholarship={selectedApplicationData.applicationScholarship}
        isLoading={false}
      />
    </div>
  );
};

export default Applications;
