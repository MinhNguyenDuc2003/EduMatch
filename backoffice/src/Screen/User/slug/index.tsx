'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Context from '../seg/context';

export default function UserDetail() {
  const { id } = useParams();

  return (
    <Context.Provider>
      <Context.Consumer>
        {({ meds }) => <UserDetailInner meds={meds} id={id as string} />}
      </Context.Consumer>
    </Context.Provider>
  );
}

function UserDetailInner({ meds, id }: { meds: any; id: string }) {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (!id || !meds?.onGetByID) return;

    (async () => {
      const res = await meds.onGetByID(id);
          console.log('ff',res)
      
      setData(res);
    })();
  }, [id, meds]);

  if (!data)
    return <div className="p-16 text-center text-gray-500 animate-pulse">Loading...</div>;

  const customer = data.customer;
  const applicant = data.applicantProfile;
  const provider = data.providerProfile;

  return (
    <div className="w-[95%] mx-auto bg-white p-8 mt-10 rounded-2xl shadow-md border border-gray-200 space-y-8">
      <h1 className="text-3xl font-bold text-gray-800">
        {customer ? 'Applicant Profile' : provider ? 'Provider Profile' : 'User Detail'}
      </h1>

      {/* CASE 1 — APPLICANT */}
      {customer && applicant && <ApplicantUI customer={customer} applicant={applicant} />}

      {/* CASE 2 — PROVIDER */}
      {provider && <ProviderUI provider={provider} />}
    </div>
  );
}

/* ---------------------------------------------------
📌 UI — APPLICANT PROFILE
--------------------------------------------------- */
function ApplicantUI({ customer, applicant }: { customer: any; applicant: any }) {
  return (
    <div className="space-y-10">

      <Section title="Account Information">
        <Info label="User ID" value={customer.id} />
        <Info label="Username" value={customer.username} />
        <Info label="Email" value={customer.email} />
        <Info label="Full Name" value={`${customer.firstName} ${customer.lastName}`} />
      </Section>

      <Section title="Applicant Information">
        <Info label="Contact Name" value={applicant.contactName} />
        <Info label="Phone Number" value={applicant.phoneNumber} />
        <Info label="Hometown" value={applicant.hometown} />
        <Info label="Citizenship" value={applicant.citizenshipStatus} />
        <Info label="Ethnicity" value={applicant.ethnicity} />
        <Info label="Race" value={applicant.race} />
        <Info label="Overall GPA" value={applicant.overallGpa} />
      </Section>

      <Section title="Certificates">
        {applicant.certificates?.map((c: any) => (
          <Info
            key={c.id}
            label={c.certificateName}
            value={`Score: ${c.score} | By: ${c.issuedBy}`}
          />
        ))}
      </Section>

      <Section title="Education History">
        {applicant.educationHistories?.map((e: any) => (
          <Info
            key={e.id}
            label={e.institutionName}
            value={`${e.majorName} — GPA: ${e.gpa}`}
          />
        ))}
      </Section>

      <Section title="Skills">
        {applicant.skills?.map((s: any) => (
          <Info
            key={s.id}
            label={s.skillName}
            value={`${s.proficiencyLevel} (${s.yearsExperience} years)`}
          />
        ))}
      </Section>

      <Section title="Intentions">
        {applicant.intentions?.map((i: any) => (
          <Info
            key={i.id}
            label={i.intendedInstitution}
            value={`${i.degreeType} — ${i.intendedMajorName}`}
          />
        ))}
      </Section>

    </div>
  );
}

/* ---------------------------------------------------
📌 UI — PROVIDER
--------------------------------------------------- */
function ProviderUI({ provider }: { provider: any }) {
  return (
    <div className="space-y-10">
      <Section title="Organization Information">
        <Info label="Organization Name" value={provider.organizationName} />
        <Info label="Type" value={provider.organizationType} />
        <Info label="Email" value={provider.email} />
        <Info label="Phone" value={provider.phone} />
        <Info label="Website" value={provider.website} />
        <Info label="Country" value={provider.country} />
        <Info label="Verified" value={provider.verified ? 'Yes' : 'No'} highlight />
      </Section>

      <Section title="Provider Contacts">
        {provider.providerContactDtos?.map((c: any) => (
          <Info
            key={c.id}
            label={c.contactName}
            value={`${c.roleTitle} — ${c.email}`}
          />
        ))}
      </Section>
    </div>
  );
}

/* ---------------------------------------------------
📌 Shared Components
--------------------------------------------------- */
function Section({ title, children }: { title: string; children: any }) {
  return (
    <div className="bg-gray-50 border border-gray-300 rounded-xl p-6">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <div className="grid grid-cols-2 gap-4">{children}</div>
    </div>
  );
}

function Info({ label, value, highlight }: { label: string; value: any; highlight?: boolean }) {
  return (
    <div className="flex flex-col">
      <span className="text-gray-500 text-sm">{label}</span>
      <span
        className={`mt-1 font-medium ${
          highlight ? 'text-green-700 bg-green-100 px-2 py-1 rounded-md w-max' : 'text-gray-800'
        }`}
      >
        {value ?? '—'}
      </span>
    </div>
  );
}
