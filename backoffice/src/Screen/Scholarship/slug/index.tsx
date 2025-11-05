'use client';
import { useParams } from 'next/navigation';
import React, { useEffect, useMemo, useState } from 'react';
import Context from '../seg/context';
import Image from 'next/image';

function ScholarshipDetailInner({ meds, id }: { meds: any; id: string }) {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (id && meds?.onGetByID) {
      (async () => {
        const res = await meds.onGetByID(id);
        setData(res);
      })();
    }
  }, [id]);

  const startDate = useMemo(
    () => (data?.startDate ? new Date(Number(data.startDate)).toLocaleDateString() : 'N/A'),
    [data?.startDate]
  );
  const endDate = useMemo(
    () => (data?.endDate ? new Date(Number(data.endDate)).toLocaleDateString() : 'N/A'),
    [data?.endDate]
  );

  if (!data)
    return (
      <div className="p-16 text-center text-gray-500 animate-pulse">
        Loading scholarship details...
      </div>
    );

  const provider = data.providerProfileVo;
  const banner = data.scholarshipMedias?.[0]?.url;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-10">
      {/* Banner */}
      <div className="relative w-full h-80 rounded-2xl overflow-hidden shadow-lg">
        <Image
          width={1200}
          height={400}
          src={banner}
          alt={data.title}
          className="object-cover w-full h-full"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
          <h1 className="text-3xl md:text-4xl font-bold text-white">{data.title}</h1>
          <p className="text-gray-200 text-sm mt-2">{data.shortDescription}</p>
        </div>
      </div>

      {/* Meta info */}
      <div className="flex flex-wrap gap-3 mt-2">
        {data.country && (
          <span className="px-4 py-1.5 bg-blue-50 text-blue-700 border border-blue-200 rounded-full text-sm font-medium">
            {data.country}
          </span>
        )}
        {data.studyLevel && (
          <span className="px-4 py-1.5 bg-green-50 text-green-700 border border-green-200 rounded-full text-sm font-medium">
            {data.studyLevel}
          </span>
        )}
        {data.scholarshipType && (
          <span className="px-4 py-1.5 bg-purple-50 text-purple-700 border border-purple-200 rounded-full text-sm font-medium">
            {data.scholarshipType}
          </span>
        )}
      </div>

      {/* Description */}
      <section className="bg-white shadow-sm rounded-2xl p-6 border border-gray-100">
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">Overview</h2>
        <p className="text-gray-700 leading-relaxed">{data.description}</p>
      </section>

      {/* Requirements & Benefits */}
      <section className="grid md:grid-cols-2 gap-8">
        <div className="bg-white shadow-sm p-6 rounded-2xl border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Requirements</h2>
          <p className="text-gray-700 whitespace-pre-line">{data.requirements}</p>
        </div>
        <div className="bg-white shadow-sm p-6 rounded-2xl border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Benefits</h2>
          <p className="text-gray-700 whitespace-pre-line">{data.benefits}</p>
        </div>
      </section>

      {/* Additional Info */}
      <section className="bg-white shadow-sm p-6 rounded-2xl border border-gray-100 grid md:grid-cols-2 gap-8">
        <div className="space-y-3 text-gray-700">
          <Info label="University" value={data.university} />
          <Info label="Field(s)" value={data.fields} />
          <Info label="Funding Amount" value={data.fundingAmount} />
          <Info label="Available Slots" value={data.availableSlots} />
        </div>
        <div className="space-y-3 text-gray-700">
          <Info label="Start Date" value={startDate} />
          <Info label="End Date" value={endDate} />
          <Info label="Language Requirement" value={data.languageRequirement} />
          <Info label="GPA Requirement" value={data.gpaRequirement} />
        </div>
      </section>

      {/* Provider Info */}
      {provider && (
        <section className="bg-gray-50 border border-gray-200 p-6 rounded-2xl shadow-inner">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-5 mb-6">
            <img
              src={provider.logoUrl}
              alt={provider.organizationName}
              className="w-20 h-20 rounded-full object-cover shadow"
            />
            <div className="text-center md:text-left">
              <h3 className="text-lg font-semibold text-gray-900">{provider.organizationName}</h3>
              <p className="text-gray-600">{provider.organizationType}</p>
              {provider.website && (
                <a
                  href={provider.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline text-sm"
                >
                  {provider.website}
                </a>
              )}
            </div>
          </div>
          <p className="text-gray-700 mb-5 leading-relaxed">{provider.description}</p>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {provider.providerContactDtos?.map((c: any) => (
              <div
                key={c.id}
                className="border border-gray-200 bg-white rounded-xl p-4 hover:shadow-md transition-all"
              >
                <p className="font-medium text-gray-800">{c.contactName}</p>
                <p className="text-sm text-gray-600">{c.roleTitle}</p>
                <p className="text-sm">{c.email}</p>
                <p className="text-sm">{c.phone}</p>
                {c.linkedinUrl && (
                  <a
                    href={c.linkedinUrl}
                    target="_blank"
                    className="text-blue-600 text-sm hover:underline mt-1 inline-block"
                  >
                    LinkedIn
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function Info({ label, value }: { label: string; value: any }) {
  return (
    <p>
      <span className="font-medium text-gray-800">{label}:</span>{' '}
      <span className="text-gray-700">{value || 'N/A'}</span>
    </p>
  );
}

export default function ScholarshipDetail() {
  const { id } = useParams();

  return (
    <Context.Provider>
      <Context.Consumer>
        {({ meds }) => <ScholarshipDetailInner meds={meds} id={id as string} />}
      </Context.Consumer>
    </Context.Provider>
  );
}
