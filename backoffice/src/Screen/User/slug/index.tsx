'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Context from '../seg/context';
import { onSetLoading } from 'src/utils/eventBus';

export default function UserDetail() {
  const { id, role } = useParams();
  const idStr = Array.isArray(id) ? id[0] : id;
  const roleStr = Array.isArray(role) ? role[0] : role;
  const idFormat = idStr?.replace(/^STU-/, '').replace(/^PRO-/, '') || '';

  return (
    <Context.Provider>
      <Context.Consumer>
        {({ meds }) => (
          <UserDetailInner meds={meds} idFormat={idFormat} role={roleStr} />
        )}
      </Context.Consumer>
    </Context.Provider>
  );
}

function UserDetailInner({
  meds,
  idFormat,
  role,
}: {
  meds: any;
  idFormat: string;
  role?: string;
}) {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (!idFormat || !meds) return;

    const fetchData = async () => {
      onSetLoading(true);
      try {
        let res;
        if (role === 'Applicant') {
          res = await meds.onGetApplicantByID(idFormat);
        } else if (role === 'Provider') {
          res = await meds.onGetProviderByID(idFormat);
        } else {
          // fallback
          res =
            (await meds.onGetProviderByID(idFormat).catch(() => undefined)) ||
            (await meds.onGetApplicantByID(idFormat).catch(() => undefined));
        }
        setData(res || {});
      } catch (error) {
        console.error(error);
      } finally {
        onSetLoading(false);
      }
    };

    fetchData();
  }, [idFormat, role, meds]);

  if (!data)
    return (
      <div className="p-16 text-center text-gray-500 animate-pulse">
        Loading User details...
      </div>
    );

  return (
    <div className="w-[95%] mx-auto bg-white p-8 mt-10 rounded-2xl shadow-md border border-gray-100 space-y-6">
      {role === 'Applicant' ? (
        <ApplicantView applicant={data} />
      ) : (
        <ProviderView meds={meds} provider={data} />
      )}
    </div>
  );
}

// Applicant UI
function ApplicantView({ applicant }: { applicant: any }) {
  return (
    <>
      <h1 className="text-2xl font-bold text-gray-800 border-b pb-3">
        Applicant Profile
      </h1>

      <Section title="Personal Info">
        <InfoRow label="Full Name" value={`${applicant.firstName} ${applicant.lastName}`} />
        <InfoRow label="Contact Name" value={applicant.contactName} />
        <InfoRow label="Phone" value={applicant.phoneNumber} />
        <InfoRow label="Hometown" value={applicant.hometown} />
        <InfoRow label="Citizenship" value={applicant.citizenshipStatus} />
        <InfoRow label="Ethnicity" value={applicant.ethnicity} />
        <InfoRow label="Race" value={applicant.race} />
        <InfoRow label="Overall GPA" value={applicant.overallGpa} />
      </Section>

      <Section title="Education History">
        {applicant.educationHistories?.map((e: any) => (
          <InfoRow
            key={e.id}
            label={e.institutionName}
            value={`${e.majorName} — GPA: ${e.gpa}`}
          />
        ))}
      </Section>

      <Section title="Certificates">
        {applicant.certificates?.map((c: any) => (
          <InfoRow
            key={c.id}
            label={c.certificateName}
            value={`Score: ${c.score} | Issued By: ${c.issuedBy}`}
          />
        ))}
      </Section>

      <Section title="Skills">
        {applicant.skills?.map((s: any) => (
          <InfoRow
            key={s.id}
            label={s.skillName}
            value={`${s.proficiencyLevel} (${s.yearsExperience} yrs)`}
          />
        ))}
      </Section>
    </>
  );
}

function ProviderView({ provider, meds }: { provider: any , meds : any}) {
  const [verified, setVerified] = useState(provider.verified);
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    if (verified) return; 
    setLoading(true);
    try {
        const res = await meds.onUpdateProviderVerifyByID(provider.id);
      if (res?.data) {
        setVerified(true); 
      }
    } catch (error) {
      console.error('Verify provider failed', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="mt-4 flex justify-end">
        <button
          onClick={handleVerify}
          disabled={verified || loading}
          className={`px-4 py-2 rounded-lg font-semibold text-white ${
            verified || loading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          {loading ? 'Verifying...' : verified ? 'Verified' : 'Verify Email'}
        </button>
      </div>
      <h1 className="text-2xl font-bold text-gray-800 border-b pb-3">
        Provider Profile
      </h1>

      <Section title="Organization Info">
        <InfoRow label="Organization Name" value={provider.organizationName} />
        <InfoRow label="Type" value={provider.organizationType} />
        <InfoRow label="Email" value={provider.email} />
        <InfoRow label="Phone" value={provider.phone} />
        <InfoRow label="Website" value={provider.website} />
        <InfoRow label="Country" value={provider.country} />
        <InfoRow label="Verified" value={verified ? 'Yes' : 'No'} status />
        <InfoRow label="Description" value={provider.description} />
        <InfoRow label="Specialization" value={provider.specialization} />
        <InfoRow label="Year Established" value={provider.yearEstablished} />
        <InfoRow label="Accreditation" value={provider.accreditation} />
      </Section>

      {provider.providerContactDtos?.length > 0 && (
        <Section title="Contacts">
          {provider.providerContactDtos.map((c: any) => (
            <InfoRow
              key={c.id}
              label={c.contactName}
              value={`${c.roleTitle} | ${c.email} | ${c.phone}`}
            />
          ))}
        </Section>
      )}

    
    </>
  );
}

function Section({ title, children }: { title: string; children: any }) {
  return (
    <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      <div className="grid grid-cols-2 gap-4">{children}</div>
    </div>
  );
}

function InfoRow({
  label,
  value,
  status,
}: {
  label: string;
  value: any;
  status?: boolean;
}) {
  const statusColor =
    status && value === 'Yes'
      ? 'text-green-600 bg-green-100'
      : status && value === 'No'
      ? 'text-red-600 bg-red-100'
      : 'text-gray-900';

  return (
    <div className="flex flex-col">
      <span className="text-gray-500 text-sm">{label}</span>
      {status ? (
        <span
          className={`inline-block mt-1 px-3 py-1 rounded-full text-sm font-semibold ${statusColor} w-max`}
        >
          {value}
        </span>
      ) : (
        <span className="text-gray-800 font-medium mt-1">{value || '—'}</span>
      )}
    </div>
  );
}
