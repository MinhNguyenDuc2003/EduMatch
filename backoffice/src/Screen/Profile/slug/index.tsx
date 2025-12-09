'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Context from '../seg/context';
import { onSetLoading } from 'src/utils/eventBus';

export default function ProfileDetail() {
  const { id, role } = useParams();
  const idStr = Array.isArray(id) ? id[0] : id;
  const roleStr = Array.isArray(role) ? role[0] : role;
  const idFormat = idStr?.replace(/^STU-/, '').replace(/^PRO-/, '') || '';

  return (
    <Context.Provider>
      <Context.Consumer>
        {({ meds }) => (
          <ProfileDetailInner meds={meds} idFormat={idFormat} role={roleStr} />
        )}
      </Context.Consumer>
    </Context.Provider>
  );
}

function ProfileDetailInner({
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
        Loading Profile details...
      </div>
    );

  return (
    <div className="w-[90%] mx-auto py-10 space-y-8">
      <Header
        title={
          role === 'Applicant'
            ? 'Applicant Profidle'
            : 'Provider Profile'
        }
      />

      {role === 'Applicant' ? (
        <ApplicantView applicant={data} />
      ) : (
        <ProviderView meds={meds} provider={data} />
      )}
    </div>
  );
}

/* ----------------------------- HEADER ----------------------------- */
function Header({ title }: { title: string }) {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
    </div>
  );
}

/* --------------------------- APPLICANT VIEW --------------------------- */
function ApplicantView({ applicant }: { applicant: any }) {
  return (
    <div className="space-y-8">

      <Section title="Personal Information">
        <InfoRow label="Full Name" value={`${applicant.firstName} ${applicant.lastName}`} />
        <InfoRow label="Contact Name" value={applicant.contactName} />
        <InfoRow label="Phone Number" value={applicant.phoneNumber} />
        <InfoRow label="Hometown" value={applicant.hometown} />
        <InfoRow label="Citizenship Status" value={applicant.citizenshipStatus} />
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
    </div>
  );
}

/* --------------------------- PROVIDER VIEW --------------------------- */
function ProviderView({ provider, meds }: { provider: any; meds: any }) {
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
      console.error('Verify error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Verify Button */}
      <div className="flex justify-end">
        <button
          onClick={handleVerify}
          disabled={verified || loading}
          className={`px-5 py-2.5 rounded-lg font-semibold text-white transition ${
            verified || loading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          {loading ? 'Verifying...' : verified ? 'Verified' : 'Verify Email'}
        </button>
      </div>

      <Section title="Organization Information">
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
    </div>
  );
}

/* --------------------------- SECTION CARD --------------------------- */
function Section({ title, children }: { title: string; children: any }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">{children}</div>
    </div>
  );
}

/* --------------------------- INFO ROW --------------------------- */
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
      ? 'text-green-700 bg-green-100'
      : status && value === 'No'
      ? 'text-red-700 bg-red-100'
      : 'text-gray-900';

  return (
    <div className="flex flex-col">
      <span className="text-gray-500 text-sm">{label}</span>

      {status ? (
        <span
          className={`mt-1 px-3 py-1 w-max rounded-lg text-sm font-medium ${statusColor}`}
        >
          {value}
        </span>
      ) : (
        <span className="font-medium text-gray-800 mt-1">{value || '—'}</span>
      )}
    </div>
  );
}
