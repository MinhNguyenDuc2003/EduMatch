'use client';

import React from 'react';
import Image from 'next/image';
import { formatDate } from '../utils';

interface CertificateCardProps {
  certificate: Certificate;
}

const CertificateCard = ({ certificate }: CertificateCardProps) => {
  return (
    <div className="relative rounded-lg border border-[#828282] overflow-hidden bg-[#FAFAF6] shadow-sm hover:shadow-md transition-shadow ">
      {/* Blue gradient header with score */}
      <div className="h-10 relative">
        <Image
          src={'https://es5urvh1np.ufs.sh/f/DHR6tEJ9PQozNMvBTv3dbqnOiC9glzYQkty01LT7J5ecsEuv'}
          alt={'certificate'}
          fill={true}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Score badge */}
      <div className="absolute top-5 right-5 bg-white rounded px-2 py-2 border-2 border-cyan-400">
        <span className="text-md font-bold text-cyan-500">{certificate.score}</span>
      </div>

      {/* Certificate details */}
      <div className="p-4 space-y-3">
        <h3 className="text-md font-semibold text-gray-900">{certificate.certificateName}</h3>

        <div className="space-y-2 text-sm">
          <div className="flex">
            <span className="text-gray-500 font-medium w-24">Issued By</span>
            <span className="text-gray-900">{certificate.issuedBy}</span>
          </div>

          <div className="flex">
            <span className="text-gray-500 font-medium w-24">Issue Date</span>
            <span className="text-gray-900">{formatDate(certificate.issueDate)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateCard;
