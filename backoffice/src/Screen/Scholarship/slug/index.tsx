'use client';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Context from '../seg/context';
import { onSetLoading } from 'src/utils/eventBus';

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

function ScholarshipDetailInner({ meds, id }: { meds: any; id: string }) {
  const router = useRouter();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (!id || !meds?.onGetByID) return;
    const fetchData = async () => {
      onSetLoading(true);
      try {
        const res = await meds.onGetByID(id);
        setData(res);
      } catch (error) {
        console.error(error);
      } finally {
        onSetLoading(false);
      }
    };
    fetchData();
  }, [id, meds]);

  if (!data)
    return (
      <div className="p-16 text-center text-gray-500 animate-pulse">
        Loading scholarship details...
      </div>
    );

  const banner = data.scholarshipMedias?.[0]?.url;
  const provider = data.providerProfileVo;

  return (
    <div className="w-[95%] mx-auto bg-white p-8 mt-10 rounded-2xl shadow-md border border-gray-100 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 border-b pb-3">
        Scholarship Details
      </h1>

      {banner && (
        <div className="relative w-full h-80 rounded-2xl overflow-hidden shadow-md mb-6">
          <Image
            width={1200}
            height={400}
            src={banner}
            alt={data.title}
            className="object-cover w-full h-full"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
            <h2 className="text-3xl font-bold text-white">{data.title}</h2>
            {data.shortDescription && (
              <p className="text-gray-200 text-sm mt-2">{data.shortDescription}</p>
            )}
          </div>
        </div>
      )}

      <Section title="Basic Information">
        <InfoRow label="Title" value={data.title} />
        <InfoRow label="University" value={data.university} />
        <InfoRow label="Country" value={data.country} />
        <InfoRow label="Study Level" value={data.studyLevel} />
        <InfoRow label="Scholarship Type" value={data.scholarshipType} />
        <InfoRow label="Funding Amount" value={data.fundingAmount} />
        <InfoRow label="Available Slots" value={data.availableSlots} />
        <InfoRow label="Fields" value={data.fields} />
      </Section>

      <Section title="Description & Requirements">
        <InfoRow label="Description" value={data.description} />
        <InfoRow label="Requirements" value={data.requirements} />
        <InfoRow label="Benefits" value={data.benefits} />
      </Section>

      <Section title="Other Details">
        <InfoRow
          label="Start Date"
          value={data.startDate ? new Date(data.startDate).toLocaleDateString() : '—'}
        />
        <InfoRow
          label="End Date"
          value={data.endDate ? new Date(data.endDate).toLocaleDateString() : '—'}
        />
        <InfoRow label="Language Requirement" value={data.languageRequirement} />
        <InfoRow label="GPA Requirement" value={data.gpaRequirement} />
      </Section>

      {/* Provider Information */}
      {provider && (
        <Section title="Provider Information">
          <div className="flex gap-6 items-center">
            {provider.logoUrl && (
              <Image
                src={provider.logoUrl}
                alt={provider.organizationName}
                width={120}
                height={120}
                className="rounded-xl border object-contain bg-gray-50 p-2"
              />
            )}
            <div className="space-y-1">
              {/* Click vào tên để chuyển trang ProviderDetail */}
              <InfoRow
                label="Organization Name"
                value={
                  <span
                    className="text-blue-600 hover:underline cursor-pointer"
                    onClick={() =>
                      router.push(`/profile/${provider.id}/Provider`)
                    }
                  >
                    {provider.organizationName}
                  </span>
                }
              />
              <InfoRow label="Type" value={provider.organizationType} />
              <InfoRow label="Address" value={provider.addressSummary} />
              <InfoRow
                label="Website"
                value={
                  <a
                    href={provider.website}
                    target="_blank"
                    className="text-blue-600 hover:underline"
                  >
                    {provider.website}
                  </a>
                }
              />
            </div>
          </div>

          {/* Provider Contacts */}
          {provider.providerContactDtos?.length > 0 && (
            <div className="mt-4 grid md:grid-cols-2 gap-4">
              {provider.providerContactDtos.map((c: any) => (
                <div
                  key={c.id}
                  className="p-4 border rounded-xl bg-gray-50 hover:bg-gray-100 transition"
                >
                  <p className="font-medium text-gray-800">{c.contactName}</p>
                  <p className="text-sm text-gray-600">{c.roleTitle}</p>
                  <p className="text-sm text-gray-600">{c.email}</p>
                  <p className="text-sm text-gray-600">{c.phone}</p>
                  {c.linkedinUrl && (
                    <a
                      href={c.linkedinUrl}
                      target="_blank"
                      className="text-blue-600 hover:underline text-sm"
                    >
                      LinkedIn
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}
        </Section>
      )}
    </div>
  );
}

/* -------------------------- Helper Components --------------------------- */

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-gray-50 rounded-xl p-5 border border-gray-200 space-y-4">
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      <div className="grid grid-cols-2 gap-4">{children}</div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: any }) {
  return (
    <div className="flex flex-col">
      <span className="text-gray-500 text-sm">{label}</span>
      <span className="text-gray-800 font-medium mt-1">{value ?? '—'}</span>
    </div>
  );
}
