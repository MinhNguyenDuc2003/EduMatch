'use client';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Context from '../seg/context';
import { onSetLoading } from 'src/utils/eventBus';

export default function ApplicationDetail() {
  const { id } = useParams();

  return (
    <Context.Provider>
      <Context.Consumer>
        {({ meds }) => <ApplicationDetailInner meds={meds} id={id as string} />}
      </Context.Consumer>
    </Context.Provider>
  );
}

function ApplicationDetailInner({ meds, id }: { meds: any; id: string }) {
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
        Loading application details...
      </div>
    );

  const application = data.applicationVo;
  const scholarship = data.scholarshipVo;
  const provider = scholarship.providerProfileVo;
  const banner = provider?.bannerUrl || scholarship?.bannerUrl;

  return (
    <div className="w-[95%] mx-auto bg-white p-8 mt-10 rounded-2xl shadow-md border border-gray-100 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 border-b pb-3">
        Application Details
      </h1>

      {banner && (
        <div className="relative w-full h-80 rounded-2xl overflow-hidden shadow-md mb-6">
          <Image
            width={1200}
            height={400}
            src={banner}
            alt={scholarship.title}
            className="object-cover w-full h-full"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
            <h2 className="text-3xl font-bold text-white">{scholarship.title}</h2>
            {scholarship.shortDescription && (
              <p className="text-gray-200 text-sm mt-2">{scholarship.shortDescription}</p>
            )}
          </div>
        </div>
      )}

      <Section title="Scholarship Information">
        <InfoRow label="Title" value={scholarship.title} />
        <InfoRow label="University" value={scholarship.university} />
        <InfoRow label="Country" value={scholarship.country} />
        <InfoRow label="Study Level" value={scholarship.studyLevel} />
        <InfoRow label="Scholarship Type" value={scholarship.scholarshipType} />
        <InfoRow label="Funding Amount" value={scholarship.fundingAmount} />
        <InfoRow label="Available Slots" value={scholarship.availableSlots} />
        <InfoRow label="Fields" value={scholarship.fields} />
        <InfoRow label="Language Requirement" value={scholarship.languageRequirement} />
        <InfoRow label="GPA Requirement" value={scholarship.gpaRequirement} />
        <InfoRow label="Start Date" value={scholarship.startDate ? new Date(scholarship.startDate).toLocaleDateString() : '—'} />
        <InfoRow label="End Date" value={scholarship.endDate ? new Date(scholarship.endDate).toLocaleDateString() : '—'} />
        <InfoRow label="Status" value={data.status} />
      </Section>

      <Section title="Scholarship Description">
        <TextAreaSection label="Description" value={scholarship.description} editable={false} onChange={() => { }} />
        <TextAreaSection label="Requirements" value={scholarship.requirements} editable={false} onChange={() => { }} />
        <TextAreaSection label="Benefits" value={scholarship.benefits} editable={false} onChange={() => { }} />
      </Section>

      <Section title="Applicant Information">
        <InfoRow label="Full Name"
          value={
            <span
              className="text-blue-600 hover:underline cursor-pointer"
              onClick={() =>
                router.push(`/backoffice/user/${application.id}/Applicant`)
              }
            >
              {application.fullName}
            </span>
          }
        />
        <InfoRow label="Gender" value={application.gender} />
        <InfoRow label="Date of Birth" value={application.dateOfBirth ? new Date(application.dateOfBirth).toLocaleDateString() : '—'} />
        <InfoRow label="Email" value={application.email} />
        <InfoRow label="Phone" value={application.phone} />
        <InfoRow label="Address" value={application.address} />
        <InfoRow label="Nationality" value={application.nationality} />
        <InfoRow label="Education Level" value={application.educationLevel} />
        <InfoRow label="School Name" value={application.schoolName} />
        <InfoRow label="Major" value={application.major} />
        <InfoRow label="GPA" value={application.gpa} />
        <InfoRow label="Graduation Year" value={application.graduationYear} />
        <InfoRow label="Skills" value={application.skills} />
        <InfoRow label="Achievements" value={application.achievements} />
        <InfoRow label="Extracurricular" value={application.extracurricular} />
        <TextAreaSection label="Motivation" value={application.motivation} editable={false} onChange={() => { }} />
        <TextAreaSection label="Personal Statement" value={application.personalStatement} editable={false} onChange={() => { }} />
      </Section>

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
              <InfoRow
                label="Organization Name"
                value={
                  <span
                    className="text-blue-600 hover:underline cursor-pointer"
                    onClick={() =>
                      router.push(`/backoffice/user/${provider.id}/Provider`)
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
                  <a href={provider.website} target="_blank" className="text-blue-600 hover:underline">
                    {provider.website}
                  </a>
                }
              />
            </div>
          </div>

          {provider.providerContactDtos?.length > 0 && (
            <div className="mt-4 grid md:grid-cols-2 gap-4">
              {provider.providerContactDtos.map((c: any) => (
                <div key={c.id} className="p-4 border rounded-xl bg-gray-50 hover:bg-gray-100 transition">
                  <p className="font-medium text-gray-800">{c.contactName}</p>
                  <p className="text-sm text-gray-600">{c.roleTitle}</p>
                  <p className="text-sm text-gray-600">{c.email}</p>
                  <p className="text-sm text-gray-600">{c.phone}</p>
                  {c.linkedinUrl && (
                    <a href={c.linkedinUrl} target="_blank" className="text-blue-600 hover:underline text-sm">
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

function TextAreaSection({
  label,
  value,
  editable,
  onChange,
}: {
  label: string;
  value: string;
  editable: boolean;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="block text-gray-700 font-medium mb-2">{label}</label>
      {editable ? (
        <textarea
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-3 focus:ring focus:ring-blue-200 focus:border-blue-400"
          rows={4}
        />
      ) : (
        <div className="bg-gray-50 border rounded-lg p-4 text-gray-700 leading-relaxed">
          {value || `No ${label.toLowerCase()} provided.`}
        </div>
      )}
    </div>
  );
}
