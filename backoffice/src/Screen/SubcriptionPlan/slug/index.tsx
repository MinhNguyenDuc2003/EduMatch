'use client';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Pencil, Check, X } from 'lucide-react';
import Context from '../seg/context';

export default function SubcriptionPlanDetail() {
  const { id } = useParams();

  return (
    <Context.Provider>
      <Context.Consumer>
        {({ meds }) => <SubcriptionPlanDetailInner meds={meds} id={id as string} />}
      </Context.Consumer>
    </Context.Provider>
  );
}

function SubcriptionPlanDetailInner({ meds, id }: { meds: any; id: string }) {
  const [data, setData] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState<any>({});
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
      alert('Failed to update plan.');
    } finally {
      setLoading(false);
    }
  };

  if (!data)
    return (
      <div className="p-16 text-center text-gray-500 animate-pulse">
        Loading plan details...
      </div>
    );

  const features = form.features?.split(',') || [];

  return (
    <div className="max-w-5xl mx-auto p-8 space-y-8 bg-white shadow-lg rounded-2xl border border-gray-100">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">
          {isEditing ? 'Edit Subscription Plan' : 'Subscription Plan Details'}
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

      {/* Editable fields */}
      <div className="grid md:grid-cols-2 gap-6">
        <InputField
          label="Name"
          value={form.name}
          onChange={(v) => handleChange('name', v)}
          editable={isEditing}
        />
        <InputField
          label="Price"
          value={form.price}
          onChange={(v) => handleChange('price', v)}
          editable={isEditing}
        />
        <InputField
          label="Currency"
          value={form.currency}
          onChange={(v) => handleChange('currency', v)}
          editable={isEditing}
        />
        <InputField
          label="Duration (Days)"
          value={form.durationDays}
          onChange={(v) => handleChange('durationDays', v)}
          editable={isEditing}
        />
        <InputField
          label="Target Type"
          value={form.targetType}
          onChange={(v) => handleChange('targetType', v)}
          editable={isEditing}
        />
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-1">Description</label>
        {isEditing ? (
          <textarea
            value={form.description || ''}
            onChange={(e) => handleChange('description', e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring focus:ring-blue-200 focus:border-blue-400"
            rows={4}
          />
        ) : (
          <p className="text-gray-700 whitespace-pre-line bg-gray-50 p-3 rounded-lg">
            {data.description}
          </p>
        )}
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-1">Features</label>
        {isEditing ? (
          <input
            value={form.features || ''}
            onChange={(e) => handleChange('features', e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring focus:ring-blue-200 focus:border-blue-400"
            placeholder="Comma-separated, e.g. AI_MATCHING,PROFILE_SCORING"
          />
        ) : (
          <ul className="list-disc list-inside text-gray-700 bg-gray-50 p-3 rounded-lg">
            {features.map((f: string) => (
              <li key={f}>{f.replaceAll('_', ' ')}</li>
            ))}
          </ul>
        )}
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
