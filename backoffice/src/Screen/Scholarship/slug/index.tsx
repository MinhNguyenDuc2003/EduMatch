'use client';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Pencil, Check, X } from 'lucide-react';
import Context from '../seg/context';
import Image from 'next/image';

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
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

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

  const handleSave = async () => {
    try {
      setLoading(true);
      await meds.onUpdate(id, form);
      setData(form);
      setIsEditing(false);
    } catch (error) {
      console.error('Update failed:', error);
      alert('Failed to update scholarship.');
    } finally {
      setLoading(false);
    }
  };

  if (!data)
    return (
      <div className="p-16 text-center text-gray-500 animate-pulse">
        Loading scholarship details...
      </div>
    );

  const banner = data.scholarshipMedias?.[0]?.url;

  return (
    <div className="max-w-6xl mx-auto p-8 space-y-8 bg-white shadow-lg rounded-2xl border border-gray-100">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">
          {isEditing ? 'Edit Scholarship' : 'Scholarship Details'}
        </h1>

        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
          >
            <Pencil size={18} /> Edit
          </button>
        ) : (
          <div className="flex gap-2">
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
          </div>
        )}
      </div>

      {/* Banner */}
      {banner && (
        <div className="relative w-full h-80 rounded-2xl overflow-hidden shadow-lg">
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

      {/* Editable fields */}
      <div className="grid md:grid-cols-2 gap-6">
        <InputField label="Title" value={form.title} editable={isEditing} onChange={(v) => handleChange('title', v)} />
        <InputField label="University" value={form.university} editable={isEditing} onChange={(v) => handleChange('university', v)} />
        <InputField label="Country" value={form.country} editable={isEditing} onChange={(v) => handleChange('country', v)} />
        <InputField label="Study Level" value={form.studyLevel} editable={isEditing} onChange={(v) => handleChange('studyLevel', v)} />
        <InputField label="Funding Amount" value={form.fundingAmount} editable={isEditing} onChange={(v) => handleChange('fundingAmount', v)} />
        <InputField label="Available Slots" value={form.availableSlots} editable={isEditing} onChange={(v) => handleChange('availableSlots', v)} />
      </div>

      {/* Description */}
      <div>
        <label className="block text-gray-700 font-medium mb-1">Description</label>
        {isEditing ? (
          <textarea
            value={form.description || ''}
            onChange={(e) => handleChange('description', e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring focus:ring-blue-200 focus:border-blue-400"
            rows={5}
          />
        ) : (
          <p className="text-gray-700 whitespace-pre-line bg-gray-50 p-3 rounded-lg">
            {form.description}
          </p>
        )}
      </div>

      {/* Requirements & Benefits */}
      <div className="grid md:grid-cols-2 gap-8">
        <TextAreaField
          label="Requirements"
          value={form.requirements}
          editable={isEditing}
          onChange={(v) => handleChange('requirements', v)}
        />
        <TextAreaField
          label="Benefits"
          value={form.benefits}
          editable={isEditing}
          onChange={(v) => handleChange('benefits', v)}
        />
      </div>

      {/* Other Info */}
      <div className="grid md:grid-cols-2 gap-8">
        <InputField label="Language Requirement" value={form.languageRequirement} editable={isEditing} onChange={(v) => handleChange('languageRequirement', v)} />
        <InputField label="GPA Requirement" value={form.gpaRequirement} editable={isEditing} onChange={(v) => handleChange('gpaRequirement', v)} />
        <InputField label="Start Date" value={form.startDate} editable={isEditing} onChange={(v) => handleChange('startDate', v)} />
        <InputField label="End Date" value={form.endDate} editable={isEditing} onChange={(v) => handleChange('endDate', v)} />
      </div>
    </div>
  );
}

function InputField({
  label,
  value,
  editable,
  onChange,
}: {
  label: string;
  value: any;
  editable: boolean;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="block text-gray-700 font-medium mb-1">{label}</label>
      {editable ? (
        <input
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-3 focus:ring focus:ring-blue-200 focus:border-blue-400"
        />
      ) : (
        <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">{value || 'N/A'}</p>
      )}
    </div>
  );
}

function TextAreaField({
  label,
  value,
  editable,
  onChange,
}: {
  label: string;
  value: any;
  editable: boolean;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="block text-gray-700 font-medium mb-1">{label}</label>
      {editable ? (
        <textarea
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          rows={4}
          className="w-full border border-gray-300 rounded-lg p-3 focus:ring focus:ring-blue-200 focus:border-blue-400"
        />
      ) : (
        <p className="text-gray-700 whitespace-pre-line bg-gray-50 p-3 rounded-lg">
          {value || 'N/A'}
        </p>
      )}
    </div>
  );
}
