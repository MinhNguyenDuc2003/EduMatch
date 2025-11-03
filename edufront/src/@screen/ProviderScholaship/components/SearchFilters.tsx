import { Button } from '@/lib/cus/button';
import { Input } from '@/lib/cus/input';
import { Search, Filter } from 'lucide-react';

interface SearchFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export const SearchFilters = ({ searchQuery, onSearchChange }: SearchFiltersProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input
          type="text"
          placeholder="Search scholarships by title, university, or country..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 pr-4"
        />
      </div>
      <Button variant="outline" className="gap-2">
        <Filter className="w-4 h-4" />
        Filters
      </Button>
    </div>
  );
};

