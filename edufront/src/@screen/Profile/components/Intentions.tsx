import React from 'react';
import type { Intention } from '../types';
import { Plus } from 'lucide-react';
import { Button } from '@/lib/cus/button';
import IntentionCard from './IntentionCard';

interface IntentionsProps {
  intentions: Intention[];
}

const Intentions = ({ intentions }: IntentionsProps) => {
  return (
    <div className="space-y-4">
      {/* Header with Add button */}
      <div className="flex gap-2">
        <h2 className="text-primary-brand text-lg font-semibold">Edutional Intentions</h2>

        <Button
          variant="custom"
          className="bg-green-500 text-white px-3 py-1 rounded-md text-xs font-medium flex items-center gap-1 hover:bg-green-600"
        >
          <Plus className="w-3 h-3" />
          Add
        </Button>
      </div>

      {/* Certificate cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2  gap-6">
        {intentions.map((intention) => (
          <IntentionCard key={intention.id} intention={intention} />
        ))}
      </div>

      {/* Empty state */}
      {intentions.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No intentions added yet. Click the Add button to get started.
        </div>
      )}
    </div>
  );
};

export default Intentions;
