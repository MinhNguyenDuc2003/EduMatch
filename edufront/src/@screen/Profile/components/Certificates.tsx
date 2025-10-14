import React from 'react';
import CertificateCard from './CertificateCard';
import type { Certificate } from '../types';
import { Plus } from 'lucide-react';
import { Button } from '@/lib/cus/button';

interface CertificatesProps {
  certificates: Certificate[];
}

const Certificates = ({ certificates }: { certificates: Certificate[] }) => {
  return (
    <div className="space-y-4">
      {/* Header with Add button */}
      <div className="flex gap-2">
        <h2 className="text-primary-brand text-xl font-semibold">Certificates</h2>

        <Button
          variant="custom"
          className="bg-green-500 text-white px-3 py-1 rounded-md text-xs font-medium flex items-center gap-1 hover:bg-green-600"
        >
          <Plus className="w-3 h-3" />
          Add
        </Button>
      </div>

      {/* Certificate cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificates.map((certificate) => (
          <CertificateCard key={certificate.id} certificate={certificate} />
        ))}
      </div>

      {/* Empty state */}
      {certificates.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No certificates added yet. Click the Add button to get started.
        </div>
      )}
    </div>
  );
};

export default Certificates;
