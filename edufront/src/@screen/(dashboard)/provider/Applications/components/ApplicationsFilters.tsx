import React from 'react';
import { Search, Filter } from 'lucide-react';
import { Input } from '@/pattern/cus/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/pattern/cus/select';
import { useTranslations } from 'next-intl';

interface ApplicationsFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
}

const ApplicationsFilters = React.memo(
  ({
    searchQuery,
    onSearchChange,
    statusFilter,
    onStatusFilterChange,
  }: ApplicationsFiltersProps) => {
    const t = useTranslations('providerApplications');

    return (
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search Input */}
        <div className="relative flex-1 sm:min-w-[200px]">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder={t('searchApplications')}
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-500" />
          <Select value={statusFilter} onValueChange={onStatusFilterChange}>
            <SelectTrigger className="w-full sm:w-[160px]">
              <SelectValue placeholder={t('allStatuses')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('allStatuses')}</SelectItem>
              <SelectItem value="pending">{t('Pending')}</SelectItem>
              <SelectItem value="approved">{t('Approved')}</SelectItem>
              <SelectItem value="rejected">{t('Rejected')}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    );
  }
);

ApplicationsFilters.displayName = 'ApplicationsFilters';

export default ApplicationsFilters;
