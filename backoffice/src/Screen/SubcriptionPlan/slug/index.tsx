'use client';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Check, X, Pencil, Trash } from 'lucide-react';
import Context from '../seg/context';
import { CustomFormField } from 'src/common/components/common/CustomFormField';
import { FormProvider, useForm } from 'react-hook-form';

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
  const [loading, setLoading] = useState(false);

  const methods = useForm<any>({ defaultValues: {} });
  const { reset, handleSubmit } = methods;

  useEffect(() => {
    if (id && meds?.onGetByID) {
      (async () => {
        const res = await meds.onGetByID(id);
        setData(res);
        reset({
          fields: {
            SubcriptionPlan: res,
          },
          filters: {},
        });
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleSave = handleSubmit(async (formData) => {
    try {
      setLoading(true);
      const data = formData.fields.SubcriptionPlan;
      await meds.onUpdate(id, data);
      setData(formData);
      setIsEditing(false);
    } catch (error) {
      console.error(error);
      alert('Failed to update subscription.');
    } finally {
      setLoading(false);
    }
  });

  if (!data)
    return (
      <div className="p-16 text-center text-gray-500 animate-pulse">
        Loading subscription detail...
      </div>
    );

  // const featureList =
  //   typeof data?.features === 'string' ? data.features.split(',').map((f: string) => f.trim()) : [];

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSave}
        className="w-[95%] mx-auto bg-white p-10 mt-10 rounded-2xl shadow-lg border border-gray-100 space-y-10"
      >
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-4">
          <h1 className="text-2xl font-semibold text-gray-800">
            {isEditing ? 'Edit Subscription Plan' : 'Subscription Plan Details'}
          </h1>

          {!isEditing ? (
            <div className="flex gap-5">
              <button
                onClick={() => meds.onDelete(id)}
                className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-400 text-white rounded-lg transition"
              >
                <Trash size={18} /> Delete
              </button>
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
              >
                <Pencil size={18} /> Edit
              </button>
            </div>
          ) : (
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition"
              >
                <Check size={18} /> {loading ? 'Saving...' : 'Save'}
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg transition"
              >
                <X size={18} /> Cancel
              </button>
            </div>
          )}
        </div>

        {/* Basic Info */}
        <div className="grid md:grid-cols-2 gap-6">
          <CustomFormField
            name="fields.SubcriptionPlan.name"
            label="Plan Name"
            disabled={!isEditing}
            isBorder
          />
          <CustomFormField
            name="fields.SubcriptionPlan.price"
            label="Price (USD)"
            type="number"
            disabled={!isEditing}
            isBorder
          />
          <CustomFormField
            name="fields.SubcriptionPlan.currency"
            label="Currency"
            disabled={!isEditing}
            isBorder
          />
          <CustomFormField
            name="fields.SubcriptionPlan.durationDays"
            label="Duration (Days)"
            type="number"
            disabled={!isEditing}
            isBorder
          />
          <CustomFormField
            name="fields.SubcriptionPlan.targetType"
            label="Target Type"
            disabled={!isEditing}
            isBorder
          />
        </div>

        {/* Description */}
        <div>
          <CustomFormField
            label="Description"
            name="fields.SubcriptionPlan.description"
            type="textarea"
            disabled={!isEditing}
            isBorder
          />
        </div>

        {/* Features */}
        <div>
          <CustomFormField
            type="multi-input"
            label="Features"
            name="fields.SubcriptionPlan.features"
            placeholder="Comma-separated, e.g. AI_MATCHING,PROFILE_SCORING"
            disabled={!isEditing}
            isBorder
          />
        </div>
      </form>
    </FormProvider>
  );
}
