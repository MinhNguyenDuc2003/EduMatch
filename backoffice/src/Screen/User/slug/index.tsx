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
        if (id && meds?.onGetByID) {
            (async () => {
                const res = await meds.onGetByID(id);
                setData(res || {});
            })();
        }
    }, [id, meds]);

    if (!data)
        return (
            <div className="p-16 text-center text-gray-500 animate-pulse">
                Loading User details...
            </div>
        );

    const customer = data.customer;
    const applicant = data.applicantProfile;
    const provider = data.providerProfile;

    return (
        <div className="w-[95%] mx-auto bg-white p-8 mt-10 rounded-2xl shadow-md border border-gray-100 space-y-6">
            <h1 className="text-2xl font-bold text-gray-800 border-b pb-3">
                {applicant
                    ? 'Applicant Profile'
                    : provider
                        ? 'Provider Profile'
                        : 'User Details'}
            </h1>

            {applicant && (
                <ApplicantView customer={customer} applicant={applicant} />
            )}

            {provider && <ProviderView provider={provider} />}

            {!applicant && !provider && (
                <Section title="Customer Information Only">
                    <InfoRow label="User ID" value={customer?.id} />
                    <InfoRow label="Username" value={customer?.username} />
                    <InfoRow label="Email" value={customer?.email} />
                </Section>
            )}
        </div>
    );

}

function ApplicantView({ customer, applicant }: { customer: any; applicant: any }) {
    return (
        <div className="space-y-8">
            <Section title="Customer Information">
                <InfoRow label="User ID" value={customer.id} />
                <InfoRow label="Username" value={customer.username} />
                <InfoRow label="Email" value={customer.email} />
                <InfoRow
                    label="Full Name"
                    value={`${customer.firstName} ${customer.lastName}`}
                />
            </Section>

            <Section title="Applicant Profile">
                <InfoRow label="Contact Name" value={applicant?.contactName} />
                <InfoRow label="Phone Number" value={applicant?.phoneNumber} />
                <InfoRow label="Hometown" value={applicant?.hometown} />
                <InfoRow label="Citizenship" value={applicant?.citizenshipStatus} />
                <InfoRow label="Ethnicity" value={applicant?.ethnicity} />
                <InfoRow label="Race" value={applicant?.race} />
                <InfoRow label="Overall GPA" value={applicant?.overallGpa} />
            </Section>

            <Section title="Certificates">
                {applicant?.certificates?.map((c: any) => (
                    <InfoRow
                        key={c.id}
                        label={c.certificateName}
                        value={`Score: ${c.score} | By: ${c.issuedBy}`}
                    />
                ))}
            </Section>

            <Section title="Education History">
                {applicant?.educationHistories?.map((e: any) => (
                    <InfoRow
                        key={e.id}
                        label={e.institutionName}
                        value={`${e.majorName} — GPA: ${e.gpa}`}
                    />
                ))}
            </Section>

            <Section title="Skills">
                {applicant?.skills?.map((s: any) => (
                    <InfoRow
                        key={s.id}
                        label={s.skillName}
                        value={`${s.proficiencyLevel} (${s.yearsExperience} years)`}
                    />
                ))}
            </Section>
        </div>
    );
}

function ProviderView({ provider }: { provider: any }) {
    return (
        <div className="space-y-8">
            <Section title="Provider Information">
                <InfoRow label="Organization Name" value={provider.organizationName} />
                <InfoRow label="Type" value={provider.organizationType} />
                <InfoRow label="Email" value={provider.email} />
                <InfoRow label="Phone" value={provider.phone} />
                <InfoRow label="Website" value={provider.website} />
                <InfoRow label="Country" value={provider.country} />
                <InfoRow
                    label="Verified"
                    value={provider.verified ? 'Yes' : 'No'}
                    status
                />
            </Section>

            <Section title="Contacts">
                {provider.providerContactDtos?.map((c: any) => (
                    <InfoRow
                        key={c.id}
                        label={c.contactName}
                        value={`${c.roleTitle} | ${c.email}`}
                    />
                ))}
            </Section>
        </div>
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
                <span className="text-gray-800 font-medium mt-1">
                    {value || '—'}
                </span>
            )}
        </div>
    );
}
