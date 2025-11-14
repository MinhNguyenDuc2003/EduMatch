'use client';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { CustomFormField } from 'src/common/components/common/CustomFormField';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Context from '../seg/context';

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
  const [data, setData] = useState<any>(null);
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    if (id && meds?.onGetByID) {
      (async () => {
        const res = await meds.onGetByID(id);
        setData(res);
      })();
    }
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

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <div className="max-w-6xl mx-auto bg-white p-10 mt-10 rounded-2xl shadow-lg border border-gray-100 space-y-10">

      {/* Scholarship Header */}
      <div className="flex justify-between items-center border-b pb-4">
        <h1 className="text-2xl font-semibold text-gray-800">{scholarship.title}</h1>
        <span className="px-3 py-1 text-sm font-medium text-yellow-800 bg-yellow-200 rounded-lg">
          {data.status}
        </span>
      </div>

      {/* Banner */}
      {banner && (
        <div className="relative w-full h-80 rounded-2xl overflow-hidden shadow-md">
          <Image
            width={1200}
            height={400}
            src={banner}
            alt={scholarship.title}
            className="object-cover w-full h-full"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
            <h1 className="text-3xl md:text-4xl font-bold text-white">{scholarship.title}</h1>
            <p className="text-gray-200 text-sm mt-2">{scholarship.shortDescription}</p>
          </div>
        </div>
      )}

      {/* Scholarship Details */}
      <div className="grid md:grid-cols-2 gap-6">
        <CustomFormField label="University" initialValue={scholarship.university} disabled isBorder />
        <CustomFormField label="Country" initialValue={scholarship.country} disabled isBorder />
        <CustomFormField label="Study Level" initialValue={scholarship.studyLevel} disabled isBorder />
        <CustomFormField label="Scholarship Type" initialValue={scholarship.scholarshipType} disabled isBorder />
        <CustomFormField label="Funding Amount" initialValue={scholarship.fundingAmount} disabled isBorder />
        <CustomFormField label="Available Slots" initialValue={scholarship.availableSlots} disabled isBorder />
        <CustomFormField label="Fields" initialValue={scholarship.fields} disabled isBorder />
        <CustomFormField label="Language Requirement" initialValue={scholarship.languageRequirement} disabled isBorder />
        <CustomFormField label="GPA Requirement" initialValue={scholarship.gpaRequirement} disabled isBorder />
        <CustomFormField
          label="Start Date"
          initialValue={new Date(scholarship.startDate).toLocaleDateString()}
          disabled
          isBorder
        />
        <CustomFormField
          label="End Date"
          initialValue={new Date(scholarship.endDate).toLocaleDateString()}
          disabled
          isBorder
        />
      </div>

      {/* Scholarship Description */}
      <TextAreaSection label="Description" value={scholarship.description} editable={false} onChange={() => {}} />
      <div className="grid md:grid-cols-2 gap-8">
        <TextAreaSection label="Requirements" value={scholarship.requirements} editable={false} onChange={() => {}} />
        <TextAreaSection label="Benefits" value={scholarship.benefits} editable={false} onChange={() => {}} />
      </div>

      {/* Applicant Info Accordion */}
      <div className="mt-10 border-t pt-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Applicant Information</h2>

        {/* Personal Info */}
        <AccordionSection
          title="Personal Information"
          isOpen={openSections.personal}
          onToggle={() => toggleSection('personal')}
        >
          <CustomFormField label="Full Name" initialValue={application.fullName} disabled isBorder />
          <CustomFormField label="Gender" initialValue={application.gender} disabled isBorder />
          <CustomFormField
            label="Date of Birth"
            initialValue={new Date(application.dateOfBirth).toLocaleDateString()}
            disabled
            isBorder
          />
          <CustomFormField label="Email" initialValue={application.email} disabled isBorder />
          <CustomFormField label="Phone" initialValue={application.phone} disabled isBorder />
          <CustomFormField label="Address" initialValue={application.address} disabled isBorder />
          <CustomFormField label="Nationality" initialValue={application.nationality} disabled isBorder />
        </AccordionSection>

        {/* Education Info */}
        <AccordionSection
          title="Education"
          isOpen={openSections.education}
          onToggle={() => toggleSection('education')}
        >
          <CustomFormField label="Education Level" initialValue={application.educationLevel} disabled isBorder />
          <CustomFormField label="School Name" initialValue={application.schoolName} disabled isBorder />
          <CustomFormField label="Major" initialValue={application.major} disabled isBorder />
          <CustomFormField label="GPA" initialValue={application.gpa} disabled isBorder />
          <CustomFormField label="Graduation Year" initialValue={application.graduationYear} disabled isBorder />
        </AccordionSection>

        {/* Skills & Achievements */}
        <AccordionSection
          title="Skills & Achievements"
          isOpen={openSections.skills}
          onToggle={() => toggleSection('skills')}
        >
          <CustomFormField label="Skills" initialValue={application.skills} disabled isBorder />
          <CustomFormField label="Achievements" initialValue={application.achievements} disabled isBorder />
          <CustomFormField label="Extracurricular" initialValue={application.extracurricular} disabled isBorder />
        </AccordionSection>

        {/* Motivation & Personal Statement */}
        <AccordionSection
          title="Motivation & Personal Statement"
          isOpen={openSections.motivation}
          onToggle={() => toggleSection('motivation')}
        >
          <TextAreaSection label="Motivation" value={application.motivation} editable={false} onChange={() => {}} />
          <TextAreaSection
            label="Personal Statement"
            value={application.personalStatement}
            editable={false}
            onChange={() => {}}
          />
        </AccordionSection>
      </div>

      {/* Provider Info */}
      {provider && (
        <div className="mt-10 border-t pt-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Provider Information</h2>
          <div className="flex gap-6">
            {provider.logoUrl && (
              <Image
                src={provider.logoUrl}
                alt={provider.organizationName}
                width={120}
                height={120}
                className="rounded-xl border object-contain bg-gray-50 p-2"
              />
            )}
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-gray-800">{provider.organizationName}</h3>
              <p className="text-gray-600 text-sm">{provider.organizationType}</p>
              <p className="text-gray-600 text-sm">{provider.addressSummary}</p>
              <a href={provider.website} target="_blank" className="text-blue-600 hover:underline text-sm">
                {provider.website}
              </a>
            </div>
          </div>

          {/* Provider Contacts */}
          <div className="mt-6">
            <h4 className="font-semibold text-gray-700 mb-2">Contacts</h4>
            <div className="grid md:grid-cols-2 gap-4">
              {provider.providerContactDtos?.map((c: any) => (
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
          </div>
        </div>
      )}

      {/* Scholarship Preferences */}
      {scholarship.scholarshipPreferences?.length > 0 && (
        <div className="mt-10 border-t pt-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Scholarship Preferences</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {scholarship.scholarshipPreferences.map((pref: any) => (
              <div key={pref.id} className="p-4 border rounded-xl bg-gray-50 hover:bg-gray-100 transition">
                <p className="font-medium text-gray-800">{pref.type}</p>
                <p className="text-sm text-gray-600">{pref.value}</p>
                <p className="text-sm text-gray-500">{pref.note}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function AccordionSection({ title, isOpen, onToggle, children }: any) {
  return (
    <div className="border rounded-xl mb-4 overflow-hidden">
      <button
        className="flex justify-between items-center w-full px-4 py-3 bg-gray-100 hover:bg-gray-200 text-left font-medium"
        onClick={onToggle}
      >
        <span>{title}</span>
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>
      {isOpen && <div className="p-4 bg-white space-y-4">{children}</div>}
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
