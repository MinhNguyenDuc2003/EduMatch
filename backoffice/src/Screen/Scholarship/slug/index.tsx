'use client';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Context from '../seg/context';

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
  const [data, setData] = useState<any>(null);
  const [form, setForm] = useState<any>({});

  useEffect(() => {
    if (id && meds?.onGetByID) {
      (async () => {
        const res = await meds.onGetByID(id);
        setData(res);
        setForm(res);
      })();
    }
  }, [id]);

  const handleChange = (key: string, value: any) => {
    setForm((prev: any) => ({ ...prev, [key]: value }));
  };

  if (!data)
    return (
      <div className="p-16 text-center text-gray-500 animate-pulse">
        Loading scholarship details...
      </div>
    );

  const banner = data.scholarshipMedias?.[0]?.url;
  const provider = data.providerProfileVo;

  return (
    <div className="max-w-6xl mx-auto bg-white p-10 mt-10 rounded-2xl shadow-lg border border-gray-100 space-y-10">
      {/* Header */}
      <div className="flex justify-between items-center border-b pb-4">
        <h1 className="text-2xl font-semibold text-gray-800">
          Scholarship Details
        </h1>
      </div>

      {/* Banner */}
      {banner && (
        <div className="relative w-full h-80 rounded-2xl overflow-hidden shadow-md">
          <Image
            width={1200}
            height={400}
            src={banner}
            alt={form.title}
            className="object-cover w-full h-full"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
            <h1 className="text-3xl md:text-4xl font-bold text-white">{form.title}</h1>
            <p className="text-gray-200 text-sm mt-2">{form.shortDescription}</p>
          </div>
        </div>
      )}

      {/* Basic Info */}
      <div className="grid md:grid-cols-2 gap-6">
        <FieldView label="Title" value={form.title} />
        <FieldView label="University" value={form.university} />
        <FieldView label="Country" value={form.country} />
        <FieldView label="Study Level" value={form.studyLevel} />
        <FieldView label="Scholarship Type" value={form.scholarshipType} />
        <FieldView label="Funding Amount" value={form.fundingAmount} />
        <FieldView label="Available Slots" value={form.availableSlots} />
        <FieldView label="Fields" value={form.fields} />
      </div>

      {/* Description */}
      <TextAreaSection
        label="Description"
        value={form.description}
        editable={false}
        onChange={(v) => handleChange('description', v)}
      />

      {/* Requirements & Benefits */}
      <div className="grid md:grid-cols-2 gap-8">
        <TextAreaSection
          label="Requirements"
          value={form.requirements}
          editable={false}
          onChange={(v) => handleChange('requirements', v)}
        />
        <TextAreaSection
          label="Benefits"
          value={form.benefits}
          editable={false}
          onChange={(v) => handleChange('benefits', v)}
        />
      </div>

      {/* Other Info */}
      <div className="grid md:grid-cols-2 gap-8">
        <FieldView label="Language Requirement" value={form.languageRequirement} />
        <FieldView label="GPA Requirement" value={form.gpaRequirement} />
        <FieldView
          label="Start Date"
          value={new Date(form.startDate).toLocaleDateString()}
        />
        <FieldView
          label="End Date"
          value={new Date(form.endDate).toLocaleDateString()}
        />
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
              <a
                href={provider.website}
                target="_blank"
                className="text-blue-600 hover:underline text-sm"
              >
                {provider.website}
              </a>
            </div>
          </div>

          {/* Provider Contacts */}
          <div className="mt-6">
            <h4 className="font-semibold text-gray-700 mb-2">Contacts</h4>
            <div className="grid md:grid-cols-2 gap-4">
              {provider.providerContactDtos?.map((c: any) => (
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
          </div>
        </div>
      )}
    </div>
  );
}

/* --------------------------
   Helper Components
---------------------------*/

function FieldView({ label, value }: { label: string; value: any }) {
  return (
    <div className="space-y-1">
      <p className="text-gray-500 text-sm">{label}</p>
      <div className="w-full border border-gray-200 bg-gray-50 rounded-lg p-3 text-gray-800">
        {value ?? ''}
      </div>
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
