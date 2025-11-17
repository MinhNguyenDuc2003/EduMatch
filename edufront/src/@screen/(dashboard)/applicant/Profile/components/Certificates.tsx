import React from 'react';
import CertificateCard from './CertificateCard';
import { Pencil, Plus } from 'lucide-react';
import { Button } from '@/lib/cus/button';

interface CertificatesProps {
  certificates: Certificate[];
  onEdit?: () => void;
}

const Certificates = ({ certificates, onEdit }: CertificatesProps) => {
  return (
    <div className="space-y-4">
      {/* Header with Add button */}
      <div className="flex gap-2">
        <h2 className="text-primary-brand text-xl font-semibold">Certificates</h2>
        {onEdit && (
          <Button
            variant="custom"
            className="bg-[#00B8D9] text-white px-3 py-1 rounded-md text-xs font-medium flex items-center gap-1 hover:bg-[#00A3C4]"
            onClick={onEdit}
          >
            <Pencil className="w-3 h-3" />
            Edit
          </Button>
        )}
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
