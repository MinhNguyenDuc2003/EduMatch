'use client';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { CustomFormField } from 'src/common/components/common/CustomFormField';
import Context from '../seg/context';

export default function AuditLogDetail() {
  const { id } = useParams();

  return (
    <Context.Provider>
      <Context.Consumer>
        {({ meds }) => <AuditLogDetailInner meds={meds} id={id as string} />}
      </Context.Consumer>
    </Context.Provider>
  );
}

function AuditLogDetailInner({ meds, id }: { meds: any; id: string }) {
  const [data, setData] = useState<any>(null);
  const [form, setForm] = useState<any>({});
  // const [isEditing, setIsEditing] = useState(false);
  // const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id && meds?.onGetByID) {
      (async () => {
        const res = await meds.onGetByID(id);
        setData(res);
        setForm(res);
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleChange = (key: string, value: any) => {
    setForm((prev: any) => ({ ...prev, [key]: value }));
  };

  // const handleSave = async () => {
  //   try {
  //     setLoading(true);
  //     await meds.onUpdate(id, form);
  //     setData(form);
  //     setIsEditing(false);
  //   } catch (error) {
  //     console.error('Update failed:', error);
  //     alert('Failed to update AuditLog.');
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  if (!data)
    return (
      <div className="p-16 text-center text-gray-500 animate-pulse">
        Loading AuditLog details...
      </div>
    );

  const banner = data.AuditLogMedias?.[0]?.url;
  const provider = data.providerProfileVo;

  return (
    <div className="max-w-6xl mx-auto bg-white p-10 mt-10 rounded-2xl shadow-lg border border-gray-100 space-y-10">
      {/* Header */}
      <div className="flex justify-between items-center border-b pb-4">
        <h1 className="text-2xl font-semibold text-gray-800">
          AuditLog Details
        </h1>

        {/* {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
          >
            <Pencil size={18} /> Edit
          </button>
        ) : ( */}
        {/* <div className="flex gap-3">
            <button
              onClick={handleSave}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition"
            >
              <Check size={18} /> {loading ? 'Saving...' : 'Save'}
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                setForm(data);
              }}
              className="flex items-center gap-2 px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg transition"
            >
              <X size={18} /> Cancel
            </button>
          </div> */}
        {/* )} */}
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
        <CustomFormField label="Title" initialValue={form.title} 
        // disabled={!isEditing} 
        isBorder />
        <CustomFormField
          label="University"
          initialValue={form.university}
          // disabled={!isEditing}
          isBorder
        />
        <CustomFormField
          label="Country"
          initialValue={form.country}
          // disabled={!isEditing}
          isBorder
        />
        <CustomFormField
          label="Study Level"
          initialValue={form.studyLevel}
          // disabled={!isEditing}
          isBorder
        />
        <CustomFormField
          label="AuditLog Type"
          initialValue={form.AuditLogType}
          // disabled={!isEditing}
          isBorder
        />
        <CustomFormField
          label="Funding Amount"
          initialValue={form.fundingAmount}
          // disabled={!isEditing}
          isBorder
        />
        <CustomFormField
          label="Available Slots"
          initialValue={form.availableSlots}
          // disabled={!isEditing}
          isBorder
        />
        <CustomFormField label="Fields" initialValue={form.fields} 
        // disabled={!isEditing} 
        isBorder />
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
        <CustomFormField
          label="Language Requirement"
          initialValue={form.languageRequirement}
          // disabled={!isEditing}
          isBorder
        />
        <CustomFormField
          label="GPA Requirement"
          initialValue={form.gpaRequirement}
          // disabled={!isEditing}
          isBorder
        />
        <CustomFormField
          label="Start Date"
          initialValue={new Date(form.startDate).toLocaleDateString()}
          disabled
          isBorder
        />
        <CustomFormField
          label="End Date"
          initialValue={new Date(form.endDate).toLocaleDateString()}
          disabled
          isBorder
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

// Small helper subcomponent
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
